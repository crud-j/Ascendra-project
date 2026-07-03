from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.course import (
    CourseOut, LessonOut, PaginatedCourses,
    EnrollResponse, CompleteLessonResponse,
)
from app.services import learning as svc

router = APIRouter(prefix="/learning", tags=["learning"])

# ---------------------------------------------------------------------------
# Auth dependency (minimal — replace with proper JWT validation)
# ---------------------------------------------------------------------------

def get_current_user_id() -> str:
    """
    In production, validate the JWT from Authorization header and return user_id.
    This stub returns a fixed ID for development without an auth service running.
    """
    return "00000000-0000-0000-0000-000000000001"


# ---------------------------------------------------------------------------
# Courses
# ---------------------------------------------------------------------------

@router.get("/courses", response_model=PaginatedCourses)
async def list_courses(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    difficulty: str | None = Query(None),
    search: str | None = Query(None),
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    return await svc.list_courses(db, user_id, page, page_size, difficulty, search)


@router.get("/courses/{course_id}", response_model=CourseOut)
async def get_course(
    course_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    course = await svc.get_course(db, course_id, user_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@router.post("/courses/{course_id}/enroll", response_model=EnrollResponse)
async def enroll(
    course_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    enrolled = await svc.enroll_user(db, course_id, user_id)
    if not enrolled:
        return {"message": "Already enrolled"}
    return {"message": "Enrolled successfully"}


# ---------------------------------------------------------------------------
# Lessons
# ---------------------------------------------------------------------------

@router.get("/courses/{course_id}/lessons", response_model=list[LessonOut])
async def get_lessons(
    course_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    return await svc.get_lessons(db, course_id, user_id)


@router.post("/lessons/{lesson_id}/complete", response_model=CompleteLessonResponse)
async def complete_lesson(
    lesson_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    result = await svc.complete_lesson(db, lesson_id, user_id)
    return result
