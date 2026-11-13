import { useEffect, useRef, useState } from "react";
import { GameShell, ScoreChip, Slider, type GameProps } from "./GameShell";

type Mode = "series" | "parallel";

function solve(v: number, r1: number, r2: number, mode: Mode) {
  const req = mode === "series" ? r1 + r2 : (r1 * r2) / (r1 + r2);
  const i = v / req;
  const i1 = mode === "series" ? i : v / r1;
  const i2 = mode === "series" ? i : v / r2;
  const v1 = i1 * r1;
  const v2 = i2 * r2;
  return { req, i, i1, i2, v1, v2, p1: v1 * i1, p2: v2 * i2 };
}

const LOOP = "M90,70 H610 V290 H90 Z";

export default function CircuitLab({ onXp, onBack }: GameProps) {
  const [v, setV] = useState(6);
  const [r1, setR1] = useState(4);
  const [r2, setR2] = useState(8);
  const [mode, setMode] = useState<Mode>("series");
  const [quiz, setQuiz] = useState<{ v: number; r1: number; r2: number; mode: Mode; answer: string; checked: boolean } | null>(null);
  const [score, setScore] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const [offset, setOffset] = useState(0);

  const live = quiz ? solve(quiz.v, quiz.r1, quiz.r2, quiz.mode) : solve(v, r1, r2, mode);
  const current = live.i;

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setOffset((o) => (o + dt * Math.min(current, 6) * 60) % 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current]);

  const total = 1480; // perimeter of LOOP
  const dots = Array.from({ length: 22 }, (_, k) => {
    const d = (k * (total / 22) + offset * 1.48) % total;
    const p = pathRef.current?.getPointAtLength(d);
    return p ? { x: p.x, y: p.y } : null;
  });
  const glow1 = Math.min(1, live.p1 / 20);
  const glow2 = Math.min(1, live.p2 / 20);
  const shown = quiz ?? { v, r1, r2, mode };

  function newQuiz() {
    const m: Mode = Math.random() < 0.5 ? "series" : "parallel";
    const pick = (list: number[]) => list[Math.floor(Math.random() * list.length)]!;
    setQuiz({ v: pick([3, 6, 9, 12]), r1: pick([2, 3, 4, 6]), r2: pick([3, 4, 6, 12]), mode: m, answer: "", checked: false });
  }
  const correct = quiz ? Math.abs(Number(quiz.answer) - live.i) <= Math.max(0.05, live.i * 0.02) : false;

  return (
    <GameShell
      title="Circuit lab"
      tag="Science · Electricity · Classes 7, 10, 12"
      intro="Turn up the battery, change the resistors and watch the charges flow. Bulbs glow brighter when more power goes through them. Then solve live circuit puzzles with Ohm's law."
      onBack={onBack}
      score={<ScoreChip label="Circuits solved" value={score} />}
    >
      <div className="g-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={!quiz && mode === "series"} onClick={() => { setQuiz(null); setMode("series"); }}>Series</button>
        <button type="button" role="tab" aria-selected={!quiz && mode === "parallel"} onClick={() => { setQuiz(null); setMode("parallel"); }}>Parallel</button>
        <button type="button" role="tab" aria-selected={Boolean(quiz)} onClick={newQuiz}>Solve the circuit</button>
      </div>
      <div className="g-board dark-board">
        <svg className="g-plot" viewBox="0 0 700 360" role="img" aria-label={`${shown.mode} circuit`}>
          <path ref={pathRef} d={LOOP} className="wire" fill="none" />
          {shown.mode === "parallel" && <path d="M230,70 V180 H470 V70" className="wire" fill="none" />}
          {/* battery on the left side */}
          <rect x={70} y={150} width={40} height={60} rx={6} className="battery" />
          <text x={56} y={140} className="lens-label">+</text>
          <text x={118} y={238} className="lens-label">{shown.v} V</text>
          {/* bulb 1 on top wire */}
          <circle cx={350} cy={70} r={30 + glow1 * 30} className="bulb-glow" style={{ opacity: glow1 }} />
          <circle cx={350} cy={70} r={22} className="bulb" />
          <text x={330} y={40} className="lens-label">R₁ = {shown.r1} Ω</text>
          {/* bulb 2: right wire in series, middle branch in parallel */}
          {shown.mode === "series" ? (
            <>
              <circle cx={610} cy={180} r={30 + glow2 * 30} className="bulb-glow" style={{ opacity: glow2 }} />
              <circle cx={610} cy={180} r={22} className="bulb" />
              <text x={520} y={230} className="lens-label">R₂ = {shown.r2} Ω</text>
            </>
          ) : (
            <>
              <circle cx={350} cy={180} r={30 + glow2 * 30} className="bulb-glow" style={{ opacity: glow2 }} />
              <circle cx={350} cy={180} r={22} className="bulb" />
              <text x={330} y={225} className="lens-label">R₂ = {shown.r2} Ω</text>
            </>
          )}
          {dots.map((p, k) => (p ? <circle key={k} cx={p.x} cy={p.y} r={4} className="charge" /> : null))}
          <g transform="translate(560,300)">
            <rect width={120} height={44} rx={10} className="meter" />
            <text x={14} y={28} className="meter-text">{quiz && !quiz.checked ? "? A" : `${live.i.toFixed(2)} A`}</text>
          </g>
        </svg>
      </div>
      <div className="g-layout">
        <div className="panel g-side">
          {quiz ? (
            <>
              <h3>A {quiz.v} V battery drives R₁ = {quiz.r1} Ω and R₂ = {quiz.r2} Ω in {quiz.mode}. What current leaves the battery?</h3>
              <label className="g-formula">
                <input inputMode="decimal" value={quiz.answer} placeholder="Current in amperes" onChange={(e) => setQuiz({ ...quiz, answer: e.target.value })} disabled={quiz.checked} aria-label="Your answer in amperes" />
                <span className="g-y">A</span>
              </label>
              {!quiz.checked ? (
                <button type="button" className="btn btn-primary" disabled={!quiz.answer} onClick={() => { setQuiz({ ...quiz, checked: true }); if (correct) { onXp(5); setScore((s) => s + 1); } }}>Check</button>
              ) : (
                <div className={`feedback ${correct ? "feedback-correct" : "feedback-incorrect"}`}>
                  <strong>{correct ? "Correct! +5 XP" : "Not quite"}</strong>
                  <p>
                    {quiz.mode === "series" ? `R = ${quiz.r1} + ${quiz.r2} = ${live.req.toFixed(2)} Ω` : `1/R = 1/${quiz.r1} + 1/${quiz.r2}, so R = ${live.req.toFixed(2)} Ω`}. Then I = V / R = {quiz.v} / {live.req.toFixed(2)} = {live.i.toFixed(2)} A.
                  </p>
                  <button type="button" className="btn btn-primary" onClick={newQuiz}>Next circuit</button>
                </div>
              )}
            </>
          ) : (
            <>
              <Slider label="Battery" value={v} min={1} max={12} step={1} unit=" V" onChange={setV} />
              <Slider label="Bulb R₁" value={r1} min={1} max={20} step={1} unit=" Ω" onChange={setR1} />
              <Slider label="Bulb R₂" value={r2} min={1} max={20} step={1} unit=" Ω" onChange={setR2} />
            </>
          )}
        </div>
        <div className="panel g-side">
          <h3>Meter readings</h3>
          {quiz && !quiz.checked ? (
            <p className="muted">Solve it first — the meters switch on after you check.</p>
          ) : (
            <ul className="readings">
              <li><span>Total resistance</span><b>{live.req.toFixed(2)} Ω</b></li>
              <li><span>Current from battery</span><b>{live.i.toFixed(2)} A</b></li>
              <li><span>Bulb R₁</span><b>{live.v1.toFixed(2)} V · {live.i1.toFixed(2)} A · {live.p1.toFixed(1)} W</b></li>
              <li><span>Bulb R₂</span><b>{live.v2.toFixed(2)} V · {live.i2.toFixed(2)} A · {live.p2.toFixed(1)} W</b></li>
            </ul>
          )}
          <p className="muted small">Ohm's law: V = I × R. In series the current is shared; in parallel the voltage is shared.</p>
        </div>
      </div>
    </GameShell>
  );
}
