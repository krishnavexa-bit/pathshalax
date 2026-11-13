// Server-only: writes an original study lesson (notes + quiz) for one NCERT chapter with Lovable AI.
import { createOpenAI } from "@ai-sdk/openai";
import { APICallError, NoObjectGeneratedError, Output, jsonSchema, streamText } from "ai";
import { createLovableAiGatewayRunIdFetch } from "./run-id.server";

export type LessonContent = {
  objective: string;
  intro: string;
  keyPoints: string[];
  examples: { prompt: string; steps: string[]; answer: string }[];
  checkpoint: string;
  funFact: string;
  quiz: { prompt: string; options: string[]; answer: number; explanation: string }[];
};

const LESSON_SCHEMA = jsonSchema<LessonContent>({
  type: "object",
  additionalProperties: false,
  required: ["objective", "intro", "keyPoints", "examples", "checkpoint", "funFact", "quiz"],
  properties: {
    objective: { type: "string" },
    intro: { type: "string" },
    keyPoints: { type: "array", items: { type: "string" } },
    examples: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["prompt", "steps", "answer"],
        properties: {
          prompt: { type: "string" },
          steps: { type: "array", items: { type: "string" } },
          answer: { type: "string" },
        },
      },
    },
    checkpoint: { type: "string" },
    funFact: { type: "string" },
    quiz: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["prompt", "options", "answer", "explanation"],
        properties: {
          prompt: { type: "string" },
          options: { type: "array", items: { type: "string" } },
          answer: { type: "integer" },
          explanation: { type: "string" },
        },
      },
    },
  },
});

const INSTRUCTIONS = `You are an experienced CBSE teacher writing a short, original study lesson for Indian school students on PathshalaX.
Rules:
- Follow the NCERT syllabus for the given class, subject and chapter, but write everything in your own words. Never copy textbook passages, exercises or answers.
- Match the reading level of the class. Use simple, warm, encouraging English and Indian everyday examples (cricket, markets, trains, festivals, farms).
- objective: one sentence starting "By the end of this lesson you will".
- intro: 3-5 sentences explaining why the chapter matters and the big idea.
- keyPoints: exactly 6 crisp points a student must remember (definitions, formulas, dates, rules).
- examples: exactly 2 worked examples. For maths/science/accounts use problems with numbered reasoning steps; for languages/humanities use a question with step-by-step reasoning. 3-6 steps each, and a short final answer.
- checkpoint: one question the student should be able to answer in their own words.
- funFact: one surprising, true and relevant fact.
- quiz: exactly 5 multiple-choice questions testing understanding, not trivia, each with exactly 4 options, "answer" is the 0-based index of the correct option, and a 1-2 sentence explanation.
- For English literature chapters, cover the story or poem's themes, characters and message; do not reproduce the text.
- Be factually accurate. Use plain text; write powers like x² and fractions like 3/4.`;

export type LessonResult = { ok: true; content: LessonContent } | { ok: false; status: number; message: string };

function clampLesson(c: LessonContent): LessonContent {
  const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  return {
    objective: text(c.objective),
    intro: text(c.intro),
    keyPoints: (c.keyPoints ?? []).map(text).filter(Boolean).slice(0, 8),
    examples: (c.examples ?? []).slice(0, 3).map((e) => ({ prompt: text(e.prompt), steps: (e.steps ?? []).map(text).filter(Boolean).slice(0, 8), answer: text(e.answer) })),
    checkpoint: text(c.checkpoint),
    funFact: text(c.funFact),
    quiz: (c.quiz ?? [])
      .filter((q) => Array.isArray(q.options) && q.options.length >= 2 && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length)
      .slice(0, 6)
      .map((q) => ({ prompt: text(q.prompt), options: q.options.map(text), answer: q.answer, explanation: text(q.explanation) })),
  };
}

export async function writeLesson(
  apiKey: string,
  info: { classLevel: number; subject: string; book: string; chapter: string; number: number },
): Promise<LessonResult> {
  const runIdFetch = createLovableAiGatewayRunIdFetch();
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });
  try {
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      instructions: INSTRUCTIONS,
      messages: [
        {
          role: "user",
          content: `Class ${info.classLevel} · ${info.subject} · NCERT book "${info.book}" · Chapter ${info.number}: "${info.chapter}". Write the lesson.`,
        },
      ],
      output: Output.object({ schema: LESSON_SCHEMA }),
      maxRetries: 0,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });
    const output = await result.output;
    const content = clampLesson(output);
    if (!content.intro || content.keyPoints.length < 3 || content.quiz.length < 3) {
      return { ok: false, status: 502, message: "The lesson came back incomplete. Please try again." };
    }
    return { ok: true, content };
  } catch (error) {
    if (NoObjectGeneratedError.isInstance(error)) {
      console.error("Lesson output did not match the schema", error.text?.slice(0, 300));
      return { ok: false, status: 502, message: "The lesson came back in the wrong shape. Please try again." };
    }
    if (APICallError.isInstance(error)) {
      const status = error.statusCode ?? 500;
      console.error("AI gateway error", status, error.message);
      if (status === 429) return { ok: false, status, message: "Lots of students are studying right now. Please try again in a minute." };
      if (status === 402) return { ok: false, status, message: "The AI lesson writer is out of credits for now. Ask the app owner to add credits." };
      if (status === 403) return { ok: false, status, message: "The AI lesson writer isn't available for this app right now." };
      return { ok: false, status, message: "Could not write this lesson right now. Please try again." };
    }
    console.error("Lesson generation failed", error);
    return { ok: false, status: 500, message: "Could not write this lesson right now. Please try again." };
  }
}
