import { useMemo, useState } from "react";
import { compile, type Expr } from "./mathExpr";
import { GameShell, ScoreChip, Slider, type GameProps } from "./GameShell";

const W = 640;
const H = 440;
const COLORS = ["var(--coral)", "var(--mint)", "var(--sky-ink)"];

type Family = "linear" | "quadratic" | "sine" | "exponential";
const FAMILIES: Record<Family, { label: string; params: { key: string; label: string; min: number; max: number; step: number }[]; f: (p: Record<string, number>) => Expr; show: (p: Record<string, number>) => string }> = {
  linear: {
    label: "Straight line",
    params: [
      { key: "m", label: "Slope m", min: -5, max: 5, step: 0.5 },
      { key: "c", label: "Intercept c", min: -8, max: 8, step: 1 },
    ],
    f: (p) => (x) => (p["m"] ?? 0) * x + (p["c"] ?? 0),
    show: (p) => `y = ${p["m"]}x ${sign(p["c"])}`,
  },
  quadratic: {
    label: "Parabola",
    params: [
      { key: "a", label: "Stretch a", min: -3, max: 3, step: 0.5 },
      { key: "h", label: "Shift h", min: -6, max: 6, step: 1 },
      { key: "k", label: "Lift k", min: -8, max: 8, step: 1 },
    ],
    f: (p) => (x) => (p["a"] ?? 1) * (x - (p["h"] ?? 0)) ** 2 + (p["k"] ?? 0),
    show: (p) => `y = ${p["a"]}(x ${sign(-(p["h"] ?? 0))})² ${sign(p["k"])}`,
  },
  sine: {
    label: "Wave",
    params: [
      { key: "A", label: "Height A", min: -5, max: 5, step: 0.5 },
      { key: "B", label: "Squeeze B", min: 0.5, max: 3, step: 0.5 },
      { key: "D", label: "Lift D", min: -5, max: 5, step: 1 },
    ],
    f: (p) => (x) => (p["A"] ?? 1) * Math.sin((p["B"] ?? 1) * x) + (p["D"] ?? 0),
    show: (p) => `y = ${p["A"]} sin(${p["B"]}x) ${sign(p["D"])}`,
  },
  exponential: {
    label: "Growth curve",
    params: [
      { key: "a", label: "Start a", min: 0.5, max: 4, step: 0.5 },
      { key: "b", label: "Growth b", min: 0.5, max: 3, step: 0.5 },
    ],
    f: (p) => (x) => (p["a"] ?? 1) * Math.pow(p["b"] ?? 2, x),
    show: (p) => `y = ${p["a"]} · ${p["b"]}ˣ`,
  },
};

function sign(v: number | undefined) {
  const n = v ?? 0;
  return n < 0 ? `− ${Math.abs(n)}` : `+ ${n}`;
}

function randomParams(family: Family) {
  const out: Record<string, number> = {};
  for (const p of FAMILIES[family].params) {
    const steps = Math.round((p.max - p.min) / p.step);
    let v = p.min + Math.floor(Math.random() * (steps + 1)) * p.step;
    if ((p.key === "a" || p.key === "A" || p.key === "m") && v === 0) v = p.step * 2;
    out[p.key] = Math.round(v * 100) / 100;
  }
  return out;
}
function defaults(family: Family) {
  const out: Record<string, number> = {};
  for (const p of FAMILIES[family].params) out[p.key] = p.key === "b" ? 2 : p.key === "B" || p.key === "a" || p.key === "A" ? 1 : p.key === "m" ? 1 : 0;
  return out;
}

function pathFor(f: Expr, range: number) {
  const sx = W / (2 * range);
  const yRange = (range * H) / W;
  const sy = H / (2 * yRange);
  let d = "";
  let pen = false;
  let prevY = 0;
  for (let i = 0; i <= 600; i++) {
    const x = -range + (2 * range * i) / 600;
    const y = f(x);
    if (!Number.isFinite(y) || Math.abs(y) > yRange * 6 || (pen && Math.abs(y - prevY) > yRange * 2)) {
      pen = false;
      continue;
    }
    const px = (x + range) * sx;
    const py = H / 2 - y * sy;
    d += `${pen ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`;
    pen = true;
    prevY = y;
  }
  return d;
}

function Plot({ curves, range }: { curves: { f: Expr; color: string; dashed?: boolean; width?: number }[]; range: number }) {
  const yRange = (range * H) / W;
  const sx = W / (2 * range);
  const sy = H / (2 * yRange);
  const step = range > 15 ? 5 : range > 6 ? 1 : 0.5;
  const lines = [];
  for (let x = Math.ceil(-range / step) * step; x <= range; x += step) {
    const px = (x + range) * sx;
    lines.push(<line key={`x${x}`} x1={px} x2={px} y1={0} y2={H} className={Math.abs(x) < 1e-9 ? "g-axis" : "g-grid"} />);
    if (Math.abs(x) > 1e-9 && Math.abs(x % (step * 2)) < 1e-9) lines.push(<text key={`tx${x}`} x={px + 3} y={H / 2 + 14} className="g-tick">{x}</text>);
  }
  for (let y = Math.ceil(-yRange / step) * step; y <= yRange; y += step) {
    const py = H / 2 - y * sy;
    lines.push(<line key={`y${y}`} y1={py} y2={py} x1={0} x2={W} className={Math.abs(y) < 1e-9 ? "g-axis" : "g-grid"} />);
    if (Math.abs(y) > 1e-9 && Math.abs(y % (step * 2)) < 1e-9) lines.push(<text key={`ty${y}`} x={W / 2 + 5} y={py - 3} className="g-tick">{y}</text>);
  }
  return (
    <svg className="g-plot" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Graph">
      {lines}
      {curves.map((c, i) => (
        <path key={i} d={pathFor(c.f, range)} fill="none" stroke={c.color} strokeWidth={c.width ?? 3.5} strokeDasharray={c.dashed ? "10 8" : undefined} strokeLinecap="round" />
      ))}
    </svg>
  );
}

export default function GraphPlayground({ onXp, onBack }: GameProps) {
  const [mode, setMode] = useState<"free" | "match">("free");
  const [range, setRange] = useState(10);
  const [formulas, setFormulas] = useState(["x^2 - 4", "2sin(x)", ""]);
  const [family, setFamily] = useState<Family>("quadratic");
  const [params, setParams] = useState<Record<string, number>>(() => defaults("quadratic"));
  const [target, setTarget] = useState<Record<string, number>>(() => randomParams("quadratic"));
  const [matched, setMatched] = useState(0);
  const [won, setWon] = useState(false);

  const compiled = useMemo(
    () =>
      formulas.map((src) => {
        if (!src.trim()) return { f: null as Expr | null, error: "" };
        try {
          const f = compile(src);
          f(1);
          return { f, error: "" };
        } catch (e) {
          return { f: null, error: e instanceof Error ? e.message : "Could not read" };
        }
      }),
    [formulas],
  );

  const fam = FAMILIES[family];
  const isMatch = fam.params.every((p) => Math.abs((params[p.key] ?? 0) - (target[p.key] ?? 0)) < 1e-9);

  function setParam(key: string, v: number) {
    const next = { ...params, [key]: v };
    setParams(next);
    if (!won && FAMILIES[family].params.every((p) => Math.abs((next[p.key] ?? 0) - (target[p.key] ?? 0)) < 1e-9)) {
      setWon(true);
      setMatched((n) => n + 1);
      onXp(10);
    }
  }
  function newRound(nextFamily: Family = family) {
    setFamily(nextFamily);
    setParams(defaults(nextFamily));
    setTarget(randomParams(nextFamily));
    setWon(false);
  }

  return (
    <GameShell
      title="Graph playground"
      tag="Maths · Classes 9–12"
      intro="Type any formula and watch it draw itself, or play Match the graph: move the sliders until your curve sits exactly on the dashed one."
      onBack={onBack}
      score={<ScoreChip label="Graphs matched" value={matched} />}
    >
      <div className="g-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={mode === "free"} onClick={() => setMode("free")}>Free plot</button>
        <button type="button" role="tab" aria-selected={mode === "match"} onClick={() => setMode("match")}>Match the graph</button>
      </div>
      <div className="g-layout">
        <div className="g-board">
          {mode === "free" ? (
            <Plot range={range} curves={compiled.flatMap((c, i) => (c.f ? [{ f: c.f, color: COLORS[i] ?? "var(--ink)" }] : []))} />
          ) : (
            <Plot
              range={range}
              curves={[
                { f: fam.f(target), color: "var(--ink-3)", dashed: true, width: 3 },
                { f: fam.f(params), color: isMatch ? "var(--mint)" : "var(--coral)" },
              ]}
            />
          )}
          <div className="g-zoom">
            <button type="button" className="chip-btn" onClick={() => setRange((r) => Math.max(2, r / 1.5))} aria-label="Zoom in">＋</button>
            <button type="button" className="chip-btn" onClick={() => setRange((r) => Math.min(60, r * 1.5))} aria-label="Zoom out">−</button>
            <button type="button" className="chip-btn" onClick={() => setRange(10)}>Reset</button>
          </div>
        </div>
        <aside className="g-side panel">
          {mode === "free" ? (
            <>
              <h3>Your formulas</h3>
              {formulas.map((src, i) => (
                <label key={i} className="g-formula">
                  <span className="g-dot" style={{ background: COLORS[i] }} />
                  <span className="g-y">y =</span>
                  <input
                    value={src}
                    placeholder="e.g. 2x + 1"
                    onChange={(e) => setFormulas((list) => list.map((v, j) => (j === i ? e.target.value : v)))}
                    aria-label={`Formula ${i + 1}`}
                  />
                  {compiled[i]?.error && <small className="g-err">{compiled[i]?.error}</small>}
                </label>
              ))}
              <p className="muted small">Try: <code>x^3 - 3x</code>, <code>abs(x) - 2</code>, <code>sqrt(16 - x^2)</code>, <code>1/x</code>, <code>2^x</code></p>
            </>
          ) : (
            <>
              <h3>Pick a curve</h3>
              <div className="g-chips">
                {(Object.keys(FAMILIES) as Family[]).map((k) => (
                  <button key={k} type="button" className={`chip-btn ${family === k ? "on" : ""}`} onClick={() => newRound(k)}>{FAMILIES[k].label}</button>
                ))}
              </div>
              {fam.params.map((p) => (
                <Slider key={p.key} label={p.label} value={params[p.key] ?? 0} min={p.min} max={p.max} step={p.step} onChange={(v) => setParam(p.key, v)} />
              ))}
              <p className="g-eq">{fam.show(params)}</p>
              {won ? (
                <div className="feedback feedback-correct">
                  <strong>Matched! +10 XP</strong>
                  <p>The target was {fam.show(target)}. Notice which slider moved the curve which way.</p>
                  <button type="button" className="btn btn-primary" onClick={() => newRound()}>Next graph</button>
                </div>
              ) : (
                <p className="muted small">Tip: line up the turning point or crossing points first, then fix the steepness.</p>
              )}
            </>
          )}
        </aside>
      </div>
    </GameShell>
  );
}
