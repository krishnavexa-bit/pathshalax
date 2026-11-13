import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import Icon from "./icons";
import { burstFrom } from "./fx";
import { ncertLink, subjectsFor, findChapter, type Chapter } from "./curriculum";
import { getChapterLesson } from "./lessons.functions";
import { GAMES, relatedGame, type GameId } from "./games/catalog";
import type { StudentSettings } from "./cloud";

export type QuizSnapshot = { id: string; prompt: string; topic: string; chapterId: string };

type Props = {
  settings: StudentSettings;
  completed: string[];
  subjectName: string | null;
  chapterId: string | null;
  onOpen: (subjectName: string | null, chapterId: string | null) => void;
  onComplete: (chapterId: string, event: React.MouseEvent) => void;
  onAttempt: (q: QuizSnapshot, correct: boolean) => void;
  onOpenSample: () => void;
  onOpenGame: (id: GameId) => void;
};

export default function LearnHub(props: Props) {
  const { settings, completed, subjectName, chapterId, onOpen } = props;
  const all = subjectsFor(settings.classLevel);
  const mine = all.filter((s) => settings.subjects.includes(s.name));
  const list = mine.length ? mine : all;
  const subject = list.find((s) => s.name === subjectName) ?? list[0];

  if (chapterId) {
    const found = findChapter(chapterId);
    if (found) return <ChapterView {...props} chapter={found.chapter} subject={found.subject.name} classLevel={found.classLevel} />;
  }

  return (
    <>
      <header className="page-head">
        <div>
          <h1>Learn at your pace.</h1>
          <p>Class {settings.classLevel} · every chapter of your NCERT books, with short notes, worked examples and a quiz.</p>
        </div>
      </header>
      <div className="subject-tabs" role="tablist" aria-label="Subjects">
        {list.map((s) => {
          const done = s.chapters.filter((c) => completed.includes(c.id)).length;
          return (
            <button key={s.id} type="button" role="tab" aria-selected={subject?.id === s.id} className={`subject-tab rip ${subject?.id === s.id ? "on" : ""}`} onClick={() => onOpen(s.name, null)}>
              <span className="subject-icon" aria-hidden="true">{s.icon}</span>
              <span><strong>{s.name}</strong><small>{done}/{s.chapters.length} done</small></span>
            </button>
          );
        })}
      </div>
      {subject && (
        <section className="panel chapters-panel">
          <div className="panel-head">
            <h2>{subject.icon} {subject.name}</h2>
            <span className="count-chip">{subject.books.map((b) => b.title).join(" · ")}</span>
          </div>
          <div className="bar"><span style={{ width: `${Math.round((subject.chapters.filter((c) => completed.includes(c.id)).length / subject.chapters.length) * 100)}%` }} /></div>
          <div className="chapter-grid">
            {subject.chapters.map((c, i) => {
              const done = completed.includes(c.id);
              const sample = settings.classLevel === 10 && subject.name === "Mathematics" && /quadratic/i.test(c.title);
              const game = relatedGame(subject.name, c.title);
              return (
                <button key={c.id} type="button" className={`chapter-card tilt rip ${done ? "is-done" : ""}`} style={{ "--i": i } as React.CSSProperties} onClick={() => onOpen(subject.name, c.id)}>
                  <span className="node">{done ? <Icon name="check" size={16} strokeWidth={3} /> : i + 1}</span>
                  <span className="chapter-text">
                    <strong>{c.title}</strong>
                    <small>{c.book}</small>
                  </span>
                  <span className="chapter-tags">
                    {sample && <span className="tag good">Interactive</span>}
                    {game && <span className="tag game-tag" title="Has a matching game">🎮</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}

function ChapterView(props: Props & { chapter: Chapter; subject: string; classLevel: number }) {
  const { chapter, subject, classLevel, completed, onOpen, onComplete, onAttempt, onOpenSample, onOpenGame } = props;
  const fetchLesson = useServerFn(getChapterLesson);
  const query = useQuery({
    queryKey: ["chapter-lesson", chapter.id],
    queryFn: () => fetchLesson({ data: { chapterId: chapter.id } }),
    staleTime: Infinity,
    retry: false,
  });
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const done = completed.includes(chapter.id);
  const sample = classLevel === 10 && subject === "Mathematics" && /quadratic/i.test(chapter.title);
  const game = relatedGame(subject, chapter.title);
  const gameInfo = GAMES.find((g) => g.id === game);
  const lesson = query.data?.ok ? query.data.content : null;

  function answer(i: number, option: number, event: React.MouseEvent) {
    if (!lesson || answers[i] !== undefined) return;
    const q = lesson.quiz[i];
    if (!q) return;
    setAnswers((a) => ({ ...a, [i]: option }));
    const correct = option === q.answer;
    if (correct) burstFrom(event, { count: 26, power: 8 });
    onAttempt({ id: `${chapter.id}#${i}`, prompt: q.prompt, topic: chapter.title, chapterId: chapter.id }, correct);
  }

  return (
    <>
      <div className="chapter-crumbs">
        <button type="button" className="text-btn" onClick={() => onOpen(subject, null)}>
          <Icon name="arrow" size={16} className="flip" /> {subject} chapters
        </button>
      </div>
      <article className="notebook chapter-notebook">
        <div className="notebook-top">
          <span className="lesson-badge">Class {classLevel} · {subject} · {chapter.book}</span>
          <a className="text-btn" href={ncertLink(chapter)} target="_blank" rel="noreferrer">Free NCERT chapter ↗</a>
        </div>
        <h2>{chapter.title}</h2>

        {(sample || gameInfo) && (
          <div className="chapter-extras">
            {sample && (
              <button type="button" className="extra-card rip" onClick={onOpenSample}>
                <span aria-hidden="true">✍️</span>
                <span><strong>Interactive lessons</strong><small>5 step-by-step lessons with practice and a test</small></span>
              </button>
            )}
            {gameInfo && (
              <button type="button" className="extra-card rip" onClick={() => onOpenGame(gameInfo.id)}>
                <span aria-hidden="true">{gameInfo.icon}</span>
                <span><strong>Play: {gameInfo.title}</strong><small>{gameInfo.text}</small></span>
              </button>
            )}
          </div>
        )}

        {query.isPending && (
          <div className="lesson-loading">
            <p><strong>Preparing your lesson…</strong> The first time a chapter is opened, PathshalaX writes its notes and quiz. This can take up to a minute; after that it opens instantly for everyone.</p>
            <div className="loadbar"><span /></div>
          </div>
        )}
        {query.isError && <LessonError message="Could not load this lesson. Check your connection." onRetry={() => query.refetch()} />}
        {query.data && !query.data.ok && <LessonError message={query.data.message} onRetry={() => query.refetch()} />}

        {lesson && (
          <>
            <p className="goal"><strong>Learning goal</strong>{lesson.objective}</p>
            <p className="lead">{lesson.intro}</p>
            <h3 className="sub">Key things to remember</h3>
            <ul className="points">
              {lesson.keyPoints.map((p, i) => <li key={i} style={{ "--i": i } as React.CSSProperties}>{p}</li>)}
            </ul>
            <h3 className="sub">Learn through examples</h3>
            {lesson.examples.map((ex, i) => (
              <div className="chalkboard" key={i}>
                <div className="board-label">Worked example {i + 1}</div>
                <h4>{ex.prompt}</h4>
                <ol>{ex.steps.map((s, j) => <li key={j} style={{ "--i": j } as React.CSSProperties}>{String(s).replace(/^\s*(step\s*)?\d+[.):]\s*/i, "")}</li>)}</ol>
                <div className="board-answer"><span>Answer</span><strong>{ex.answer}</strong></div>
              </div>
            ))}
            <div className="sticky checkpoint">
              <Icon name="target" size={22} />
              <div><strong>Before you move on</strong><p>{lesson.checkpoint}</p></div>
            </div>
            {lesson.funFact && (
              <div className="fun-fact"><span aria-hidden="true">💡</span><p><strong>Did you know?</strong> {lesson.funFact}</p></div>
            )}

            <h3 className="sub">Chapter quiz</h3>
            <div className="chapter-quiz">
              {lesson.quiz.map((q, i) => {
                const picked = answers[i];
                return (
                  <section key={i} className="panel question mini-q">
                    <div className="q-top"><span className="q-count">Question {i + 1} of {lesson.quiz.length}</span></div>
                    <h4 className="q-prompt">{q.prompt}</h4>
                    <div className="options">
                      {q.options.map((o, j) => {
                        const state = picked === undefined ? "" : j === q.answer ? "correct-option" : j === picked ? "incorrect-option" : "";
                        return (
                          <button key={j} type="button" className={`opt rip ${state}`} disabled={picked !== undefined} onClick={(e) => answer(i, j, e)}>
                            <span className="opt-letter">{String.fromCharCode(65 + j)}</span>
                            <span className="opt-text">{o}</span>
                          </button>
                        );
                      })}
                    </div>
                    {picked !== undefined && (
                      <div className={`feedback ${picked === q.answer ? "feedback-correct" : "feedback-incorrect"}`}>
                        <strong>{picked === q.answer ? "Correct! +5 XP" : "Let’s understand the gap"}</strong>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
            <p className="muted small">Notes are written by AI to match the NCERT syllabus. Always check with your textbook and teacher.</p>
          </>
        )}

        <div className="notebook-actions">
          <button type="button" className={`btn magnetic ${done ? "btn-complete" : "btn-primary"}`} disabled={done} onClick={(e) => onComplete(chapter.id, e)}>
            {done ? <><Icon name="check" size={18} strokeWidth={3} />Chapter completed</> : "Mark chapter complete (+25 XP)"}
          </button>
          <a className="text-btn" href={`https://www.khanacademy.org/search?page_search_query=${encodeURIComponent(chapter.title)}`} target="_blank" rel="noreferrer">Free videos on Khan Academy ↗</a>
        </div>
      </article>
    </>
  );
}

function LessonError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="feedback feedback-incorrect">
      <strong>Lesson not ready</strong>
      <p>{message}</p>
      <button type="button" className="btn btn-soft" onClick={onRetry}>Try again</button>
    </div>
  );
}
