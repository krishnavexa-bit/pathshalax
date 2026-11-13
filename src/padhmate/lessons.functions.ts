import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { findChapter } from "./curriculum";
import { writeLesson, type LessonContent } from "./ai/lessons.server";

export type LessonResponse =
  | { ok: true; content: LessonContent; cached: boolean }
  | { ok: false; message: string };

// Returns the shared lesson for a chapter, writing it with AI the first time any student opens it.
export const getChapterLesson = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { chapterId: string }) => {
    if (!input || typeof input.chapterId !== "string" || input.chapterId.length > 60) throw new Error("Invalid chapter");
    return { chapterId: input.chapterId };
  })
  .handler(async ({ data, context }): Promise<LessonResponse> => {
    const found = findChapter(data.chapterId);
    if (!found) return { ok: false, message: "That chapter isn't in the PathshalaX syllabus." };

    const { data: existing, error: readError } = await context.supabase
      .from("chapter_lessons")
      .select("content")
      .eq("chapter_key", data.chapterId)
      .maybeSingle();
    if (readError) console.error("Could not read cached lesson", readError);
    if (existing?.content) return { ok: true, content: existing.content as unknown as LessonContent, cached: true };

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { ok: false, message: "The AI lesson writer isn't set up yet." };

    const { classLevel, subject, chapter } = found;
    const result = await writeLesson(apiKey, {
      classLevel,
      subject: subject.name,
      book: chapter.book,
      chapter: chapter.title,
      number: chapter.n,
    });
    if (!result.ok) return { ok: false, message: result.message };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: writeError } = await supabaseAdmin.from("chapter_lessons").upsert(
      {
        chapter_key: data.chapterId,
        class_level: classLevel,
        subject: subject.name,
        chapter_title: chapter.title,
        content: result.content as never,
      },
      { onConflict: "chapter_key", ignoreDuplicates: true },
    );
    if (writeError) console.error("Could not save lesson", writeError);
    return { ok: true, content: result.content, cached: false };
  });
