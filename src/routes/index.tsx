import { lazy, Suspense } from "react";
import { ClientOnly, createFileRoute } from "@tanstack/react-router";

// PathshalaX is a browser-only study app (sign-in session, local progress, cursor effects),
// so it loads after hydration.
const PadhmateApp = lazy(() => import("@/padhmate/App"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PathshalaX — Your Learning Companion" },
      {
        name: "description",
        content:
          "PathshalaX — NCERT notes, quizzes and study games for Classes 6–12: maths, science, social science, English and more.",
      },
      { property: "og:title", content: "PathshalaX — Your Learning Companion" },
      {
        property: "og:description",
        content:
          "Every NCERT chapter for Classes 6–12 with notes and quizzes, plus graph, science and history games that make learning fun.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const fallback = <div className="stage" aria-busy="true" />;
  return (
    <ClientOnly fallback={fallback}>
      <Suspense fallback={fallback}>
        <PadhmateApp />
      </Suspense>
    </ClientOnly>
  );
}
