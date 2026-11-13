import { lazy, Suspense } from "react";
import { ClientOnly, createFileRoute } from "@tanstack/react-router";

// PADHMATE is a browser-only study app (sign-in session, local progress, cursor effects),
// so it loads after hydration.
const PadhmateApp = lazy(() => import("@/padhmate/App"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PADHMATE — Your Learning Companion" },
      {
        name: "description",
        content:
          "PADHMATE — Your Learning Companion. Class 10 maths, one step at a time: quadratic equations lessons, practice and revision.",
      },
      { property: "og:title", content: "PADHMATE — Your Learning Companion" },
      {
        property: "og:description",
        content:
          "Short lessons, practice that explains your mistakes, and a revision list that remembers for you.",
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
