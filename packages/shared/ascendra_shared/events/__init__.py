"""Ascendra event definitions — the contract between all services."""

from .base import BaseEvent
from .learning import LessonCompletedEvent, CourseCompletedEvent, QuestCompletedEvent
from .contribution import (
    AnswerAcceptedEvent,
    ReviewApprovedEvent,
    MentorshipSessionCompletedEvent,
    ArticlePublishedEvent,
)
from .economy import (
    XPAwardedEvent,
    ReputationChangedEvent,
    SkillCoinMintedEvent,
    LevelChangedEvent,
)
from .community import SpamReportValidatedEvent, ContentFlaggedEvent

__all__ = [
    "BaseEvent",
    "LessonCompletedEvent",
    "CourseCompletedEvent",
    "QuestCompletedEvent",
    "AnswerAcceptedEvent",
    "ReviewApprovedEvent",
    "MentorshipSessionCompletedEvent",
    "ArticlePublishedEvent",
    "XPAwardedEvent",
    "ReputationChangedEvent",
    "SkillCoinMintedEvent",
    "LevelChangedEvent",
    "SpamReportValidatedEvent",
    "ContentFlaggedEvent",
]
