import { useRef, useState } from "react";
import { GameShell, ScoreChip, Slider, type GameProps } from "./GameShell";

const W = 760;
const H = 380;
const SCALE = 5; // px per cm
const OX = W / 2;
const OY = H / 2;
const OBJ_H = 6; // cm

function image(u: number, f: number) {
  const denom = u + f;
  if (Math.abs(denom) < 1e-6) return null; // object at focus: image at infinity
  const v = (u * f) / denom;
  const m = v / u;
  return { v, m, hi: m * OBJ_H };
}

function describe(u: number, f: number) {
  const img = image(u, f);
  if (!img) return { place: "at infinity", nature: "No clear image — the rays come out parallel", real: false };
  const real = img.v > 0;
  const size = Math.abs(img.m) > 1.05 ? "magnified" : Math.abs(img.m) < 0.95 ? "diminished" : "same size";
  return {
    place: `${Math.abs(img.v).toFixed(1)} cm ${real ? "behind" : "in front of"} the lens`,
    nature: `${real ? "Real and inverted" : "Virtual and erect"}, ${size}`,
    real,
  };
}

const CASES = [
  { label: "beyond 2F", u: (f: number) => -2.6 * f },
  { label: "at 2F", u: (f: number) => -2 * f },
  { label: "between F and 2F", u: (f: number) => -1.5 * f },
  { label: "between F and the lens", u: (f: number) => -0.6 * f },
];
const NATURES = ["Real and inverted, diminished", "Real and inverted, same size", "Real and inverted, magnified", "Virtual and erect, magnified"];

function line(x1: number, y1: number, x2: number, y2: number) {
  return { x1: OX + x1 * SCALE, y1: OY - y1 * SCALE, x2: OX + x2 * SCALE, y2: OY - y2 * SCALE };
}
// Extend a ray from (x,y) along (dx,dy) to the right edge of the board.
function toEdge(x: number, y: number, dx: number, dy: number) {
  const xEnd = (W - OX) / SCALE + 5;
  const t = (xEnd - x) / dx;
  return { x: xEnd, y: y + dy * t };
}

export default function LensLab({ onXp, onBack }: GameProps) {
  const [type, setType] = useState<"convex" | "concave">("convex");
  const [focal, setFocal] = useState(15);
  const [u, setU] = useState(-40);
  const [challenge, setChallenge] = useState<{ caseIndex: number; picked: number | null } | null>(null);
  const [score, setScore] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const f = type === "convex" ? focal : -focal;
  const img = image(u, f);
  const info = describe(u, f);

  function drag(e: React.PointerEvent<SVGSVGElement>) {
    if (e.buttons !== 1 || challenge) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const cm = Math.round((x - OX) / SCALE);
    setU(Math.max(-70, Math.min(-3, cm)));
  }

  function startChallenge() {
    setType("convex");
    const caseIndex = Math.floor(Math.random() * CASES.length);
    setU(Math.round(CASES[caseIndex]!.u(focal)));
    setChallenge({ caseIndex, picked: null });
  }
  function pick(i: number) {
    if (!challenge || challenge.picked !== null) return;
    setChallenge({ ...challenge, picked: i });
    if (i === challenge.caseIndex) {
      onXp(5);
      setScore((s) => s + 1);
    }
  }
  const reveal = !challenge || challenge.picked !== null;

  // Ray 1: parallel to axis, then through (or away from) the focus.
  const r1a = line(u, OBJ_H, 0, OBJ_H);
  const d1 = { dx: Math.abs(f), dy: -OBJ_H * Math.sign(f) };
  const e1 = toEdge(0, OBJ_H, d1.dx, d1.dy);
  const r1b = line(0, OBJ_H, e1.x, e1.y);
  // Ray 2: straight through the optical centre.
  const e2 = toEdge(u, OBJ_H, -u, -OBJ_H);
  const r2 = line(u, OBJ_H, e2.x, e2.y);

  return (
    <GameShell
      title="Lens lab"
      tag="Science · Light · Classes 8, 10, 12"
      intro="Drag the candle along the axis and watch the rays bend. Then try Predict the image: say what the image will look like before the rays appear."
      onBack={onBack}
      score={<ScoreChip label="Correct predictions" value={score} />}
    >
      <div className="g-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={!challenge && type === "convex"} onClick={() => { setChallenge(null); setType("convex"); }}>Convex lens</button>
        <button type="button" role="tab" aria-selected={!challenge && type === "concave"} onClick={() => { setChallenge(null); setType("concave"); }}>Concave lens</button>
        <button type="button" role="tab" aria-selected={Boolean(challenge)} onClick={startChallenge}>Predict the image</button>
      </div>
      <div className="g-board dark-board">
        <svg ref={svgRef} className="g-plot lens-svg" viewBox={`0 0 ${W} ${H}`} onPointerDown={drag} onPointerMove={drag} role="img" aria-label="Ray diagram">
          <line x1={0} y1={OY} x2={W} y2={OY} className="lens-axis" />
          {[-2, -1, 1, 2].map((k) => (
            <g key={k}>
              <circle cx={OX + k * focal * SCALE} cy={OY} r={4} className="lens-focus" />
              <text x={OX + k * focal * SCALE - 8} y={OY + 20} className="lens-label">{Math.abs(k) === 2 ? "2F" : "F"}</text>
            </g>
          ))}
          {type === "convex" ? (
            <path d={`M${OX},${OY - 130} Q${OX + 22},${OY} ${OX},${OY + 130} Q${OX - 22},${OY} ${OX},${OY - 130}`} className="lens-glass" />
          ) : (
            <path d={`M${OX - 14},${OY - 130} L${OX + 14},${OY - 130} Q${OX + 2},${OY} ${OX + 14},${OY + 130} L${OX - 14},${OY + 130} Q${OX - 2},${OY} ${OX - 14},${OY - 130}`} className="lens-glass" />
          )}
          {/* object */}
          <line {...line(u, 0, u, OBJ_H)} className="lens-object" />
          <text x={OX + u * SCALE - 9} y={OY - OBJ_H * SCALE - 8} className="lens-flame">🕯️</text>
          {reveal && (
            <>
              <line {...r1a} className="ray ray-1" />
              <line {...r1b} className="ray ray-1" />
              <line {...r2} className="ray ray-2" />
              {img && img.v < 0 && (
                <>
                  <line {...line(0, OBJ_H, img.v, img.hi)} className="ray ray-1 virtual" />
                  <line {...line(u, OBJ_H, img.v, img.hi)} className="ray ray-2 virtual" />
                </>
              )}
              {img && Math.abs(img.v) < 140 && (
                <line {...line(img.v, 0, img.v, img.hi)} className={`lens-image ${img.v < 0 ? "virtual" : ""}`} />
              )}
            </>
          )}
        </svg>
      </div>
      <div className="g-layout">
        <div className="panel g-side">
          {challenge ? (
            <>
              <h3>The candle is {CASES[challenge.caseIndex]!.label}. What image forms?</h3>
              <div className="options">
                {NATURES.map((n, i) => {
                  const state = challenge.picked === null ? "" : i === challenge.caseIndex ? "correct-option" : i === challenge.picked ? "incorrect-option" : "";
                  return (
                    <button key={n} type="button" className={`opt rip ${state}`} onClick={() => pick(i)} disabled={challenge.picked !== null}>
                      <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                      <span className="opt-text">{n}</span>
                    </button>
                  );
                })}
              </div>
              {challenge.picked !== null && (
                <button type="button" className="btn btn-primary" onClick={startChallenge}>Next challenge</button>
              )}
            </>
          ) : (
            <>
              <Slider label="Focal length" value={focal} min={8} max={30} step={1} unit=" cm" onChange={setFocal} />
              <Slider label="Object distance" value={-u} min={3} max={70} step={1} unit=" cm" onChange={(v) => setU(-v)} />
            </>
          )}
        </div>
        <div className="panel g-side">
          <h3>What you see</h3>
          {reveal ? (
            <>
              <p><b>Image:</b> {info.place}</p>
              <p><b>Nature:</b> {info.nature}</p>
              {img && <p><b>Magnification:</b> {img.m.toFixed(2)}</p>}
              <p className="muted small">Lens formula: 1/v − 1/u = 1/f, with u = {u} cm, f = {f > 0 ? "+" : ""}{f} cm.</p>
            </>
          ) : (
            <p className="muted">Make your prediction to reveal the rays.</p>
          )}
        </div>
      </div>
    </GameShell>
  );
}
