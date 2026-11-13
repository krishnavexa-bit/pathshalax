import { lazy, Suspense } from "react";
import { GAMES, type GameId } from "./games/catalog";

const LOADERS = {
  graph: lazy(() => import("./games/GraphPlayground")),
  scale: lazy(() => import("./games/ScaleExplorer")),
  timeline: lazy(() => import("./games/TimelineGame")),
  lens: lazy(() => import("./games/LensLab")),
  circuit: lazy(() => import("./games/CircuitLab")),
  solar: lazy(() => import("./games/SolarSystem")),
} satisfies Record<GameId, unknown>;

export default function PlayHub({ game, onOpen, onXp }: { game: GameId | null; onOpen: (id: GameId | null) => void; onXp: (n: number) => void }) {
  if (game) {
    const Game = LOADERS[game];
    return (
      <Suspense fallback={<div className="loadbar"><span /></div>}>
        <Game onXp={onXp} onBack={() => onOpen(null)} />
      </Suspense>
    );
  }
  return (
    <>
      <header className="page-head">
        <div>
          <h1>Learn by playing.</h1>
          <p>Interactive games and animations for maths, science, history and geography. Every game earns XP towards your daily goal.</p>
        </div>
      </header>
      <div className="game-grid">
        {GAMES.map((g, i) => (
          <button key={g.id} type="button" className="game-card tilt rip" style={{ "--i": i } as React.CSSProperties} onClick={() => onOpen(g.id)}>
            <span className="game-emoji" aria-hidden="true">{g.icon}</span>
            <span className="game-kind">{g.kind}</span>
            <strong>{g.title}</strong>
            <small>{g.text}</small>
            <span className="lesson-badge">{g.tag}</span>
          </button>
        ))}
      </div>
    </>
  );
}
