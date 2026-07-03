import { NextRequest } from "next/server";

export const runtime = "edge";

const SYSTEM_PROMPT = `You are an expert coding tutor for Ascendra, a skill-building platform.
You are helping a student learn HTML & CSS.

Your teaching style:
- Use the Socratic method — ask guiding questions rather than just providing answers
- Give incremental hints, not complete solutions
- Explain WHY things work, not just how
- Be encouraging and positive
- Keep responses concise (2-4 short paragraphs max)
- Use markdown formatting for code snippets
- If the student's code has a bug, point them toward it without fixing it for them
- Only show a complete solution if the student has been stuck for a long time and explicitly asks for it

You have access to:
- The current lesson's content and exercise instructions
- The student's current HTML and CSS code

Remember: Your goal is to help them LEARN, not just to give them the answer.`;

export async function POST(req: NextRequest) {
  const { lessonTitle, lessonContext, code, messages } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(
      "OPENAI_API_KEY is not configured. Add it to apps/web/.env.local to enable the AI tutor.",
      { status: 200 }
    );
  }

  const contextMessage = `
Current lesson: "${lessonTitle}"

Lesson content summary:
${lessonContext?.slice(0, 800) ?? ""}

Student's current code:
HTML:
\`\`\`html
${code?.html ?? ""}
\`\`\`

CSS:
\`\`\`css
${code?.css ?? ""}
\`\`\`
`.trim();

  const openaiMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: contextMessage },
    // Actual conversation
    ...(messages ?? []).map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content,
    })),
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: openaiMessages,
      stream: true,
      max_tokens: 600,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return new Response(`OpenAI error: ${err}`, { status: 500 });
  }

  // Stream the SSE response as plain text chunks
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

        for (const line of lines) {
          const data = line.replace("data: ", "").trim();
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices?.[0]?.delta?.content ?? "";
            if (text) controller.enqueue(encoder.encode(text));
          } catch {
            // skip malformed chunks
          }
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
