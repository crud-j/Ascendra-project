from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CourseOut(BaseModel):
    id: str
    title: str
    description: str
    difficulty: str
    thumbnail_url: Optional[str]
    estimated_hours: float
    is_published: bool
    lesson_count: int = 0
    is_enrolled: bool = False
    progress_percent: int = 0

    model_config = {"from_attributes": True}


class LessonOut(BaseModel):
    id: str
    course_id: str
    title: str
    content: str
    difficulty: str
    order: int
    xp_eligible: int
    is_completed: bool = False

    model_config = {"from_attributes": True}


class EnrollResponse(BaseModel):
    message: str


class CompleteLessonResponse(BaseModel):
    xp_awarded: int
    message: str


class PaginatedCourses(BaseModel):
    items: list[CourseOut]
    total: int
    page: int
    page_size: int
    has_next: bool
