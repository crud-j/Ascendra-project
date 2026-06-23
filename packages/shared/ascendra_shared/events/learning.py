"""Learning domain events emitted by the Learning Service."""

from typing import Literal
from pydantic import Field
from .base import BaseEvent


class LessonCompletedEvent(BaseEvent):
    """
    Emitted when a learner completes a lesson.
    Consumed by Economy Core to award XP.
    XP = difficulty_multiplier * 10 (Easy=10, Medium=25, Hard=50).
    """

    event_type: Literal["lesson.completed"] = "lesson.completed"
    producer: str = "learning-service"

    # Typed data fields surfaced at top level for safe consumer access
    lesson_id: str
    course_id: str
    user_id: str
    difficulty: Literal["easy", "medium", "hard"]
    xp_eligible: int  # pre-computed by Learning Service based on difficulty

    model_config = {"frozen": True}

    def model_post_init(self, __context) -> None:  # type: ignore[override]
        # Keep subject aligned with user_id for routing
        object.__setattr__(self, "subject", self.user_id)
        object.__setattr__(
            self,
            "data",
            {
                "lesson_id": self.lesson_id,
                "course_id": self.course_id,
                "difficulty": self.difficulty,
                "xp_eligible": self.xp_eligible,
            },
        )


class CourseCompletedEvent(BaseEvent):
    """Emitted when a learner finishes all lessons in a course."""

    event_type: Literal["course.completed"] = "course.completed"
    producer: str = "learning-service"

    course_id: str
    user_id: str
    difficulty: Literal["beginner", "intermediate", "advanced"]
    xp_eligible: int  # Beginner=100, Intermediate=300, Advanced=1000

    model_config = {"frozen": True}

    def model_post_init(self, __context) -> None:  # type: ignore[override]
        object.__setattr__(self, "subject", self.user_id)
        object.__setattr__(
            self,
            "data",
            {
                "course_id": self.course_id,
                "difficulty": self.difficulty,
                "xp_eligible": self.xp_eligible,
            },
        )


class QuestCompletedEvent(BaseEvent):
    """
    Emitted when a learner completes a daily/weekly/monthly quest.
    XP: Daily=50, Weekly=250, Monthly=1000.
    """

    event_type: Literal["quest.completed"] = "quest.completed"
    producer: str = "learning-service"

    quest_id: str
    user_id: str
    quest_type: Literal["daily", "weekly", "monthly"]
    xp_eligible: int

    model_config = {"frozen": True}

    def model_post_init(self, __context) -> None:  # type: ignore[override]
        object.__setattr__(self, "subject", self.user_id)
        object.__setattr__(
            self,
            "data",
            {
                "quest_id": self.quest_id,
                "quest_type": self.quest_type,
                "xp_eligible": self.xp_eligible,
            },
        )
