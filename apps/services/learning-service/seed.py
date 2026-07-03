"""
Seed the learning service database with Web Development courses.

Usage (from inside the learning-service container or with the venv active):
    python seed.py

Requires DATABASE_URL env var or falls back to the dev default.
"""

import asyncio
import os
import uuid
from datetime import datetime, timezone

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from app.models.course import Course, Lesson

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://ascendra:ascendra@localhost:5433/learning",
)

SYSTEM_INSTRUCTOR_ID = "00000000-0000-0000-0000-000000000001"

# ---------------------------------------------------------------------------
# Course definitions
# ---------------------------------------------------------------------------

WEB_DEV_COURSES = [
    {
        "slug": "html-css",
        "title": "HTML & CSS",
        "description": "Build the web from the ground up. Learn HTML structure and CSS styling to create beautiful, responsive pages.",
        "difficulty": "beginner",
        "estimated_hours": 12.0,
        "lessons": [
            ("Document structure", "easy", 1, 100),
            ("Semantic elements", "easy", 2, 100),
            ("Forms & inputs", "easy", 3, 120),
            ("Tables & lists", "easy", 4, 100),
            ("Selectors & specificity", "easy", 5, 120),
            ("Box model", "easy", 6, 130),
            ("Typography", "easy", 7, 110),
            ("Colors & backgrounds", "easy", 8, 100),
            ("Flexbox deep dive", "medium", 9, 150),
            ("CSS Grid", "medium", 10, 150),
            ("Positioning", "medium", 11, 140),
            ("Responsive design & media queries", "medium", 12, 160),
            ("CSS variables", "medium", 13, 130),
            ("Animations & transitions", "medium", 14, 140),
            ("Pseudo-classes", "easy", 15, 110),
            ("Project: Portfolio page", "hard", 16, 200),
        ],
    },
    {
        "slug": "javascript",
        "title": "JavaScript",
        "description": "Master the language of the web. From variables to async/await, learn JavaScript the right way.",
        "difficulty": "beginner",
        "estimated_hours": 18.0,
        "lessons": [
            ("Variables & types", "easy", 1, 100),
            ("Functions", "easy", 2, 110),
            ("Arrays & objects", "easy", 3, 120),
            ("Control flow", "easy", 4, 100),
            ("Arrow functions", "easy", 5, 110),
            ("Destructuring", "medium", 6, 130),
            ("Spread/rest", "medium", 7, 130),
            ("Modules", "medium", 8, 140),
            ("DOM API", "medium", 9, 150),
            ("Events", "medium", 10, 150),
            ("Forms", "medium", 11, 140),
            ("LocalStorage", "easy", 12, 110),
            ("Callbacks", "medium", 13, 140),
            ("Promises", "medium", 14, 150),
            ("Async/await", "medium", 15, 150),
            ("Fetch & REST APIs", "medium", 16, 160),
            ("Build a weather app", "hard", 17, 200),
            ("Deploy to Netlify", "easy", 18, 120),
        ],
    },
    {
        "slug": "typescript",
        "title": "TypeScript",
        "description": "Add static types to JavaScript and catch bugs before they happen. Essential for modern frontend teams.",
        "difficulty": "intermediate",
        "estimated_hours": 14.0,
        "lessons": [
            ("Why TypeScript", "easy", 1, 100),
            ("Setup & tsconfig", "easy", 2, 110),
            ("Basic types", "easy", 3, 120),
            ("Type inference", "medium", 4, 130),
            ("Interfaces vs types", "medium", 5, 140),
            ("Union & intersection", "medium", 6, 140),
            ("Generics", "hard", 7, 170),
            ("Utility types", "medium", 8, 150),
            ("Classes", "medium", 9, 140),
            ("Access modifiers", "medium", 10, 130),
            ("Abstract classes", "hard", 11, 160),
            ("Decorators", "hard", 12, 170),
            ("TS + React", "medium", 13, 150),
            ("TS + Node.js", "medium", 14, 150),
            ("Type-safe APIs", "hard", 15, 170),
            ("Migration guide", "medium", 16, 140),
        ],
    },
    {
        "slug": "react-architecture",
        "title": "React Architecture",
        "description": "Go beyond tutorials. Learn the patterns, state management strategies, and architecture decisions that scale.",
        "difficulty": "intermediate",
        "estimated_hours": 22.0,
        "lessons": [
            ("JSX deep dive", "medium", 1, 140),
            ("Props & children", "easy", 2, 120),
            ("Component patterns", "medium", 3, 150),
            ("Compound components", "hard", 4, 170),
            ("useState & useReducer", "medium", 5, 150),
            ("useEffect lifecycle", "medium", 6, 150),
            ("Custom hooks", "hard", 7, 170),
            ("useContext", "medium", 8, 140),
            ("Server state with React Query", "hard", 9, 180),
            ("Client state with Zustand", "medium", 10, 160),
            ("Form state", "medium", 11, 150),
            ("URL state", "medium", 12, 140),
            ("Memoisation", "hard", 13, 170),
            ("Code splitting", "hard", 14, 170),
            ("Virtualization", "hard", 15, 170),
            ("Profiling", "medium", 16, 150),
            ("Feature folder structure", "medium", 17, 140),
            ("Shared component library", "hard", 18, 170),
            ("Testing strategy", "hard", 19, 170),
            ("Capstone project", "hard", 20, 250),
        ],
    },
    {
        "slug": "nodejs-backend",
        "title": "Node.js Backend",
        "description": "Build production-grade REST APIs with Node.js, Express, and PostgreSQL.",
        "difficulty": "intermediate",
        "estimated_hours": 20.0,
        "lessons": [
            ("Event loop", "medium", 1, 140),
            ("Modules", "easy", 2, 110),
            ("File system", "easy", 3, 110),
            ("HTTP module", "medium", 4, 130),
            ("Routing", "medium", 5, 140),
            ("Middleware", "medium", 6, 150),
            ("Error handling", "medium", 7, 150),
            ("Validation with Zod", "medium", 8, 150),
            ("PostgreSQL basics", "medium", 9, 150),
            ("Prisma ORM", "medium", 10, 160),
            ("Migrations", "medium", 11, 140),
            ("Query optimisation", "hard", 12, 170),
            ("JWT auth", "hard", 13, 180),
            ("Refresh tokens", "hard", 14, 170),
            ("RBAC", "hard", 15, 170),
            ("Rate limiting", "medium", 16, 150),
            ("Environment config", "easy", 17, 110),
            ("Logging", "medium", 18, 130),
            ("Docker", "medium", 19, 150),
            ("Deploy", "medium", 20, 150),
        ],
    },
    {
        "slug": "fullstack-nextjs",
        "title": "Full-Stack Next.js",
        "description": "Ship full-stack applications with Next.js App Router, Server Components, and edge deployments.",
        "difficulty": "advanced",
        "estimated_hours": 28.0,
        "lessons": [
            ("File-based routing", "medium", 1, 150),
            ("Layouts & templates", "medium", 2, 150),
            ("Loading & error UI", "medium", 3, 150),
            ("Parallel routes", "hard", 4, 170),
            ("RSC mental model", "hard", 5, 180),
            ("Data fetching patterns", "hard", 6, 180),
            ("Streaming", "hard", 7, 180),
            ("Suspense", "hard", 8, 170),
            ("Route Handlers", "medium", 9, 150),
            ("Server Actions", "hard", 10, 180),
            ("Middleware", "hard", 11, 170),
            ("Edge runtime", "hard", 12, 170),
            ("Session management", "hard", 13, 180),
            ("NextAuth.js", "hard", 14, 180),
            ("Protected routes", "medium", 15, 150),
            ("Role-based access", "hard", 16, 180),
            ("Image optimisation", "medium", 17, 140),
            ("Caching strategies", "hard", 18, 180),
            ("ISR & SSG", "hard", 19, 180),
            ("Vercel deploy", "medium", 20, 150),
            ("Monitoring", "medium", 21, 150),
        ],
    },
]


async def seed():
    engine = create_async_engine(DATABASE_URL, echo=False)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)  # type: ignore[call-overload]

    async with async_session() as session:
        for course_data in WEB_DEV_COURSES:
            lessons_data = course_data.pop("lessons")
            course_id = str(uuid.uuid4())

            course = Course(
                id=course_id,
                title=course_data["title"],
                description=course_data["description"],
                difficulty=course_data["difficulty"],
                estimated_hours=course_data["estimated_hours"],
                is_published=True,
                instructor_id=SYSTEM_INSTRUCTOR_ID,
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc),
            )
            session.add(course)

            for title, difficulty, order, xp in lessons_data:
                lesson = Lesson(
                    id=str(uuid.uuid4()),
                    course_id=course_id,
                    title=title,
                    content=f"# {title}\n\nLesson content coming soon.",
                    difficulty=difficulty,
                    order=order,
                    xp_eligible=xp,
                    created_at=datetime.now(timezone.utc),
                )
                session.add(lesson)

            print(f"  ✓ {course_data['title']} ({len(lessons_data)} lessons)")

        await session.commit()
        print(f"\nSeeded {len(WEB_DEV_COURSES)} Web Development courses.")

    await engine.dispose()


if __name__ == "__main__":
    print("Seeding learning service...\n")
    asyncio.run(seed())
