"""Business logic for the learning service."""

import uuid
import json
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from app.models.course import Course, Lesson, Enrollment, LessonCompletion, OutboxEvent


async def list_courses(
    db: AsyncSession,
    user_id: str,
    page: int = 1,
    page_size: int = 20,
    difficulty: str | None = None,
    search: str | None = None,
) -> dict:
    query = select(Course).where(Course.is_published == True)

    if difficulty:
        query = query.where(Course.difficulty == difficulty)
    if search:
        query = query.where(Course.title.ilike(f"%{search}%"))

    total_result = await db.execute(select(func.count()).select_from(query.subquery()))
    total = total_result.scalar_one()

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    courses = result.scalars().all()

    # Fetch enrollment states for this user
    enrollment_result = await db.execute(
        select(Enrollment.course_id).where(Enrollment.user_id == user_id)
    )
    enrolled_ids = {r for r in enrollment_result.scalars()}

    # Fetch lesson counts per course
    lesson_count_result = await db.execute(
        select(Lesson.course_id, func.count(Lesson.id).label("cnt"))
        .group_by(Lesson.course_id)
    )
    lesson_counts = {row.course_id: row.cnt for row in lesson_count_result}

    # Fetch completion counts per course for this user
    completed_result = await db.execute(
        select(Lesson.course_id, func.count(LessonCompletion.id).label("cnt"))
        .join(LessonCompletion, LessonCompletion.lesson_id == Lesson.id)
        .where(LessonCompletion.user_id == user_id)
        .group_by(Lesson.course_id)
    )
    completed_counts = {row.course_id: row.cnt for row in completed_result}

    items = []
    for c in courses:
        lesson_count = lesson_counts.get(c.id, 0)
        completed = completed_counts.get(c.id, 0)
        progress = round((completed / lesson_count) * 100) if lesson_count else 0
        items.append({
            "id": c.id,
            "title": c.title,
            "description": c.description,
            "difficulty": c.difficulty,
            "thumbnail_url": c.thumbnail_url,
            "estimated_hours": c.estimated_hours,
            "is_published": c.is_published,
            "lesson_count": lesson_count,
            "is_enrolled": c.id in enrolled_ids,
            "progress_percent": progress,
        })

    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": page_size,
        "has_next": (page * page_size) < total,
    }


async def get_course(db: AsyncSession, course_id: str, user_id: str) -> dict | None:
    result = await db.execute(select(Course).where(Course.id == course_id))
    course = result.scalar_one_or_none()
    if not course:
        return None

    lesson_count_result = await db.execute(
        select(func.count(Lesson.id)).where(Lesson.course_id == course_id)
    )
    lesson_count = lesson_count_result.scalar_one()

    enrollment_result = await db.execute(
        select(Enrollment).where(
            and_(Enrollment.user_id == user_id, Enrollment.course_id == course_id)
        )
    )
    enrollment = enrollment_result.scalar_one_or_none()

    completed_result = await db.execute(
        select(func.count(LessonCompletion.id))
        .join(Lesson, Lesson.id == LessonCompletion.lesson_id)
        .where(
            and_(Lesson.course_id == course_id, LessonCompletion.user_id == user_id)
        )
    )
    completed = completed_result.scalar_one()
    progress = round((completed / lesson_count) * 100) if lesson_count else 0

    return {
        "id": course.id,
        "title": course.title,
        "description": course.description,
        "difficulty": course.difficulty,
        "thumbnail_url": course.thumbnail_url,
        "estimated_hours": course.estimated_hours,
        "is_published": course.is_published,
        "lesson_count": lesson_count,
        "is_enrolled": enrollment is not None,
        "progress_percent": progress,
    }


async def get_lessons(db: AsyncSession, course_id: str, user_id: str) -> list[dict]:
    result = await db.execute(
        select(Lesson).where(Lesson.course_id == course_id).order_by(Lesson.order)
    )
    lessons = result.scalars().all()

    completed_result = await db.execute(
        select(LessonCompletion.lesson_id).where(LessonCompletion.user_id == user_id)
    )
    completed_ids = {r for r in completed_result.scalars()}

    return [
        {
            "id": l.id,
            "course_id": l.course_id,
            "title": l.title,
            "content": l.content,
            "difficulty": l.difficulty,
            "order": l.order,
            "xp_eligible": l.xp_eligible,
            "is_completed": l.id in completed_ids,
        }
        for l in lessons
    ]


async def enroll_user(db: AsyncSession, course_id: str, user_id: str) -> bool:
    """Enroll user; returns False if already enrolled."""
    existing = await db.execute(
        select(Enrollment).where(
            and_(Enrollment.user_id == user_id, Enrollment.course_id == course_id)
        )
    )
    if existing.scalar_one_or_none():
        return False

    enrollment = Enrollment(
        id=str(uuid.uuid4()),
        user_id=user_id,
        course_id=course_id,
    )
    db.add(enrollment)
    await db.commit()
    return True


async def complete_lesson(
    db: AsyncSession, lesson_id: str, user_id: str
) -> dict:
    """Mark lesson complete; idempotent. Returns xp_awarded."""
    idempotency_key = f"{user_id}:{lesson_id}"

    existing = await db.execute(
        select(LessonCompletion).where(
            LessonCompletion.idempotency_key == idempotency_key
        )
    )
    if existing.scalar_one_or_none():
        return {"xp_awarded": 0, "message": "Already completed"}

    lesson_result = await db.execute(select(Lesson).where(Lesson.id == lesson_id))
    lesson = lesson_result.scalar_one_or_none()
    if not lesson:
        return {"xp_awarded": 0, "message": "Lesson not found"}

    completion = LessonCompletion(
        id=str(uuid.uuid4()),
        user_id=user_id,
        lesson_id=lesson_id,
        idempotency_key=idempotency_key,
    )
    db.add(completion)

    # Write to outbox for economy-core to pick up
    event = OutboxEvent(
        id=str(uuid.uuid4()),
        event_type="lesson.completed",
        aggregate_id=lesson_id,
        payload=json.dumps({
            "user_id": user_id,
            "lesson_id": lesson_id,
            "course_id": lesson.course_id,
            "xp_eligible": lesson.xp_eligible,
            "idempotency_key": idempotency_key,
        }),
    )
    db.add(event)
    await db.commit()

    return {"xp_awarded": lesson.xp_eligible, "message": "Lesson completed"}
