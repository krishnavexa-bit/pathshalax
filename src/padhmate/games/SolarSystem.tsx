import { useEffect, useState } from "react";
import { GameShell, ScoreChip, Slider, type GameProps } from "./GameShell";

const PLANETS = [
  { name: "Mercury", au: 0.39, years: 0.241, size: 0.38, day: "59 Earth days", fact: "The smallest planet and the closest to the Sun, yet not the hottest.", color: "var(--planet-mercury)" },
  { name: "Venus", au: 0.72, years: 0.615, size: 0.95, day: "243 Earth days (it spins backwards)", fact: "The hottest planet: its thick carbon dioxide clouds trap heat.", color: "var(--planet-venus)" },
  { name: "Earth", au: 1, years: 1, size: 1, day: "24 hours", fact: "The only planet known to have liquid water on its surface and life.", color: "var(--planet-earth)" },
  { name: "Mars", au: 1.52, years: 1.88, size: 0.53, day: "24 hours 37 minutes", fact: "Iron oxide dust makes it red. ISRO's Mangalyaan reached it in 2014.", color: "var(--planet-mars)" },
  { name: "Jupiter", au: 5.2, years: 11.86, size: 11.2, day: "about 10 hours", fact: "The largest planet. Its Great Red Spot is a storm bigger than Earth.", color: "var(--planet-jupiter)" },
  { name: "Saturn", au: 9.58, years: 29.46, size: 9.45, day: "about 10.7 hours", fact: "Its bright rings are made of ice and rock.", color: "var(--planet-saturn)" },
  { name: "Uranus", au: 19.2, years: 84.0, size: 4.0, day: "about 17 hours", fact: "It is tilted on its side, so it rolls around the Sun.", color: "var(--planet-uranus)" },
  { name: "Neptune", au: 30.1, years: 164.8, size: 3.88, day: "about 16 hours", fact: "The windiest planet, with winds faster than 2,000 km/h.", color: "var(--planet-neptune)" },
];
type Planet = (typeof PLANETS)[number];

const QUESTIONS: { q: string; answer: string }[] = [
  { q: "Which planet takes about 12 Earth years to go once around the Sun?", answer: "Jupiter" },
  { q: "Which planet is the hottest?", answer: "Venus" },
  { q: "Which planet is closest to the Sun?", answer: "Mercury" },
  { q: "Which planet rolls around the Sun on its side?", answer: "Uranus" },
  { q: "Which planet did ISRO's Mangalyaan orbit?", answer: "Mars" },
  { q: "Which planet takes about 165 Earth years to orbit the Sun?", answer: "Neptune" },
  { q: "Which is the largest planet?", answer: "Jupiter" },
  { q: "Which planet's year lasts about 88 Earth days?", answer: "Mercury" },
  { q: "Which planet has the brightest rings?", answer: "Saturn" },
  { q: "Which planet has a day of 24 hours 37 minutes?", answer: "Mars" },
];

function newQuestion() {
  const item = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]!;
  const others = PLANETS.map((p) => p.name).filter((n) => n !== item.answer).sort(() => Math.random() - 0.5).slice(0, 3);
  return { ...item, options: [...others, item.answer].sort(() => Math.random() - 0.5), picked: null as string | null };
}

export default function SolarSystem({ onXp, onBack }: GameProps) {
  const [speed, setSpeed] = useState(60); // Earth days per second
  const [days, setDays] = useState(0);
  const [focus, setFocus] = useState<Planet>(PLANETS[2]!);
  const [quiz, setQuiz] = useState(() => newQuestion());
  const [score, setScore] = useState(0);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      setDays((d) => d + dt * speed);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  const cx = 380;
  const cy = 300;
  const radius = (au: number) => 46 + Math.sqrt(au) * 46;

  function pick(name: string) {
    if (quiz.picked) return;
    setQuiz({ ...quiz, picked: name });
    if (name === quiz.answer) {
      onXp(3);
      setScore((s) => s + 1);
    }
  }

  return (
    <GameShell
      title="Solar system in motion"
      tag="Science · Geography · Classes 6–9"
      intro="Speed up time and watch the planets race around the Sun. Inner planets zip round; outer planets take decades. Tap a planet to learn about it."
      onBack={onBack}
      score={<ScoreChip label="Space quiz" value={score} />}
    >
      <div className="g-board dark-board">
        <svg className="g-plot" viewBox="0 0 760 600" role="img" aria-label="Planets orbiting the Sun">
          <circle cx={cx} cy={cy} r={28} className="sun" />
          {PLANETS.map((p) => {
            const r = radius(p.au);
            const angle = ((days / 365.25) / p.years) * Math.PI * 2;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle) * 0.92;
            const size = 4 + Math.sqrt(p.size) * 3.4;
            return (
              <g key={p.name}>
                <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.92} className="orbit" />
                <g className="planet" onClick={() => setFocus(p)} role="button" aria-label={p.name} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setFocus(p)}>
                  {p.name === "Saturn" && <ellipse cx={x} cy={y} rx={size * 1.9} ry={size * 0.6} className="ring" />}
                  <circle cx={x} cy={y} r={size} fill={p.color} className={focus.name === p.name ? "on" : ""} />
                  <text x={x + size + 4} y={y + 4} className="planet-label">{p.name}</text>
                </g>
              </g>
            );
          })}
          <text x={20} y={30} className="planet-label big">Earth years passed: {(days / 365.25).toFixed(1)}</text>
        </svg>
      </div>
      <div className="g-layout">
        <div className="panel g-side">
          <Slider label="Time speed" value={speed} min={1} max={2000} step={1} unit=" days / sec" onChange={setSpeed} />
          <h3>{focus.name}</h3>
          <ul className="readings">
            <li><span>Distance from Sun</span><b>{focus.au} AU</b></li>
            <li><span>One year (orbit)</span><b>{focus.years < 1 ? `${Math.round(focus.years * 365.25)} Earth days` : `${focus.years} Earth years`}</b></li>
            <li><span>One day (spin)</span><b>{focus.day}</b></li>
            <li><span>Size (Earth = 1)</span><b>{focus.size}×</b></li>
          </ul>
          <p>{focus.fact}</p>
        </div>
        <div className="panel g-side">
          <h3>{quiz.q}</h3>
          <div className="options">
            {quiz.options.map((o, i) => {
              const state = !quiz.picked ? "" : o === quiz.answer ? "correct-option" : o === quiz.picked ? "incorrect-option" : "";
              return (
                <button key={o} type="button" className={`opt rip ${state}`} onClick={() => pick(o)} disabled={Boolean(quiz.picked)}>
                  <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                  <span className="opt-text">{o}</span>
                </button>
              );
            })}
          </div>
          {quiz.picked && <button type="button" className="btn btn-primary" onClick={() => setQuiz(newQuestion())}>Next question</button>}
        </div>
      </div>
    </GameShell>
  );
}
