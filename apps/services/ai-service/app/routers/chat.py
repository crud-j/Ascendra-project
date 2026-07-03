from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from app.config import settings
import httpx

router = APIRouter(prefix="/ai", tags=["ai"])


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    lesson_title: str
    lesson_context: str
    code: dict  # { "html": str, "css": str }
    messages: list[ChatMessage]


SYSTEM_PROMPT = """You are an expert coding tutor for Ascendra, a skill-building platform.
You are helping a student learn HTML & CSS.

Your teaching style:
- Use the Socratic method — ask guiding questions rather than just providing answers
- Give incremental hints, not complete solutions
- Explain WHY things work, not just how
- Be encouraging and positive
- Keep responses concise (2-4 short paragraphs max)
- Use markdown formatting for code snippets
- If the student's code has a bug, point them toward it without fixing it for them
- Only show a complete solution if the student has been stuck for a long time and explicitly asks

Remember: Your goal is to help them LEARN, not just to give them the answer."""


@router.post("/chat")
async def chat(req: ChatRequest):
    api_key = getattr(settings, "OPENAI_API_KEY", None)
    if not api_key:
        raise HTTPException(status_code=503, detail="OPENAI_API_KEY not configured")

    context = f"""Current lesson: "{req.lesson_title}"
Lesson summary: {req.lesson_context[:600]}
Student's HTML: {req.code.get("html", "")[:500]}
Student's CSS: {req.code.get("css", "")[:500]}"""

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": context},
        *[{"role": m.role, "content": m.content} for m in req.messages],
    ]

    async def stream_openai():
        async with httpx.AsyncClient(timeout=60) as client:
            async with client.stream(
                "POST",
                "https://api.openai.com/v1/chat/completions",
                headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
                json={"model": "gpt-4o-mini", "messages": messages, "stream": True, "max_tokens": 600},
            ) as resp:
                async for line in resp.aiter_lines():
                    if line.startswith("data: "):
                        data = line[6:]
                        if data == "[DONE]":
                            break
                        try:
                            import json
                            chunk = json.loads(data)
                            text = chunk["choices"][0]["delta"].get("content", "")
                            if text:
                                yield text
                        except Exception:
                            pass

    return StreamingResponse(stream_openai(), media_type="text/plain")
