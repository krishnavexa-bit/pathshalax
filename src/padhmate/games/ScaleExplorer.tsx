import { useEffect, useMemo, useRef, useState } from "react";
import { GameShell, ScoreChip, type GameProps } from "./GameShell";

// Sizes in metres (approximate, rounded).
const THINGS = [
  { name: "Proton", size: 1.7e-15, icon: "⚛️", fact: "Protons sit in the nucleus of every atom. About 600 billion of them side by side would span 1 mm." },
  { name: "Hydrogen atom", size: 1.1e-10, icon: "🔵", fact: "The smallest atom. Almost all of it is empty space around a single proton." },
  { name: "DNA strand (width)", size: 2e-9, icon: "🧬", fact: "Only 2 nanometres wide, yet the DNA in one of your cells would stretch about 2 metres if unwound." },
  { name: "Flu virus", size: 1e-7, icon: "🦠", fact: "Viruses are far smaller than bacteria and can only multiply inside living cells." },
  { name: "Bacterium (E. coli)", size: 2e-6, icon: "🧫", fact: "A single-celled organism. Many bacteria in your gut help you digest food." },
  { name: "Red blood cell", size: 7.5e-6, icon: "🩸", fact: "It has no nucleus, which leaves more room for haemoglobin to carry oxygen." },
  { name: "Width of a human hair", size: 7e-5, icon: "〰️", fact: "About 70 micrometres — roughly ten red blood cells across." },
  { name: "Grain of salt", size: 3e-4, icon: "🧂", fact: "A tiny cube of sodium chloride crystals." },
  { name: "Ant", size: 4e-3, icon: "🐜", fact: "Some ants can carry 50 times their own body weight." },
  { name: "₹1 coin", size: 2.2e-2, icon: "🪙", fact: "About 2 centimetres across." },
  { name: "Cricket ball", size: 7.2e-2, icon: "🏏", fact: "About 7 cm in diameter and weighs around 160 g." },
  { name: "A student", size: 1.6, icon: "🧑‍🎓", fact: "About 1.6 metres tall — right in the middle of the scale of everything." },
  { name: "Blue whale", size: 30, icon: "🐋", fact: "The largest animal that has ever lived, even bigger than the dinosaurs." },
  { name: "Qutub Minar", size: 72.5, icon: "🗼", fact: "This minaret in Delhi is about 72.5 metres tall." },
  { name: "Burj Khalifa", size: 828, icon: "🏙️", fact: "The world's tallest building, in Dubai." },
  { name: "Mount Everest", size: 8849, icon: "🏔️", fact: "8,849 metres above sea level — the highest point on Earth." },
  { name: "Delhi to Mumbai", size: 1.15e6, icon: "🛣️", fact: "About 1,150 km in a straight line." },
  { name: "Length of India", size: 3.2e6, icon: "🇮🇳", fact: "About 3,200 km from north to south." },
  { name: "Earth", size: 1.27e7, icon: "🌍", fact: "Earth is about 12,742 km across." },
  { name: "Jupiter", size: 1.4e8, icon: "🪐", fact: "About 11 Earths would fit across Jupiter." },
  { name: "Earth to Moon", size: 3.84e8, icon: "🌕", fact: "Light takes just over 1 second to travel from the Moon to Earth." },
  { name: "Sun", size: 1.39e9, icon: "☀️", fact: "About 109 Earths would fit across the Sun." },
  { name: "Earth to Sun (1 AU)", size: 1.5e11, icon: "🔆", fact: "Sunlight takes about 8 minutes 20 seconds to reach us." },
  { name: "Solar System (Neptune's orbit)", size: 9e12, icon: "🌌", fact: "Neptune is about 30 times farther from the Sun than Earth." },
  { name: "One light-year", size: 9.46e15, icon: "💫", fact: "The distance light travels in one year." },
  { name: "Nearest star (Proxima Centauri)", size: 4e16, icon: "⭐", fact: "About 4.2 light-years away." },
  { name: "Milky Way galaxy", size: 1e21, icon: "🌀", fact: "Our galaxy is roughly 100,000 light-years across and holds hundreds of billions of stars." },
  { name: "Distance to Andromeda", size: 2.4e22, icon: "🌠", fact: "The nearest large galaxy, about 2.5 million light-years away." },
  { name: "Observable universe", size: 8.8e26, icon: "✨", fact: "About 93 billion light-years across — everything we can possibly see." },
];

const MIN_E = -15.5;
const MAX_E = 27;

function formatSize(m: number) {
  const units: [number, string][] = [
    [9.46e15, "light-years"],
    [1e3, "km"],
    [1, "m"],
    [1e-2, "cm"],
    [1e-3, "mm"],
    [1e-6, "µm"],
    [1e-9, "nm"],
    [1e-12, "pm"],
    [1e-15, "fm"],
  ];
  const [base, unit] = units.find(([b]) => m >= b) ?? units[units.length - 1]!;
  const v = m / base;
  return `${v >= 100 ? Math.round(v).toLocaleString("en-IN") : v.toPrecision(3).replace(/\.?0+$/, "")} ${unit}`;
}

function pickPair() {
  for (;;) {
    const a = THINGS[Math.floor(Math.random() * THINGS.length)]!;
    const b = THINGS[Math.floor(Math.random() * THINGS.length)]!;
    const ratio = Math.max(a.size, b.size) / Math.min(a.size, b.size);
    if (a !== b && ratio > 3 && ratio < 1e5) return [a, b] as const;
  }
}

export default function ScaleExplorer({ onXp, onBack }: GameProps) {
  const [mode, setMode] = useState<"explore" | "quiz">("explore");
  const [exp, setExp] = useState(0.2);
  const [focus, setFocus] = useState<(typeof THINGS)[number] | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(800);
  const [pair, setPair] = useState(() => pickPair());
  const [picked, setPicked] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setExp((v) => Math.min(MAX_E, Math.max(MIN_E, v + e.deltaY * 0.0025)));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      ro.disconnect();
      el.removeEventListener("wheel", onWheel);
    };
  }, [mode]);

  const visible = useMemo(() => {
    const view = Math.pow(10, exp);
    return THINGS.map((t, i) => ({ ...t, i, px: (t.size / view) * width * 0.6 })).filter((t) => t.px > 6 && t.px < width * 3);
  }, [exp, width]);

  const nearest = useMemo(
    () => THINGS.reduce((best, t) => (Math.abs(Math.log10(t.size) - exp) < Math.abs(Math.log10(best.size) - exp) ? t : best), THINGS[0]!),
    [exp],
  );
  const shown = focus ?? nearest;

  function answer(name: string) {
    if (picked) return;
    setPicked(name);
    const bigger = pair[0].size > pair[1].size ? pair[0] : pair[1];
    if (name === bigger.name) {
      onXp(3);
      setStreak((s) => {
        const n = s + 1;
        setBest((b) => Math.max(b, n));
        return n;
      });
    } else setStreak(0);
  }

  return (
    <GameShell
      title="Scale of everything"
      tag="Science · Geography · Classes 6–12"
      intro="Scroll or drag the slider to zoom from a proton to the whole observable universe. Then test your sense of size in Bigger or smaller."
      onBack={onBack}
      score={<ScoreChip label="Best streak" value={best} />}
    >
      <div className="g-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={mode === "explore"} onClick={() => setMode("explore")}>Explore</button>
        <button type="button" role="tab" aria-selected={mode === "quiz"} onClick={() => { setMode("quiz"); setPair(pickPair()); setPicked(null); }}>Bigger or smaller?</button>
      </div>
      {mode === "explore" ? (
        <>
          <div className="scale-stage" ref={stageRef}>
            {visible.map((t) => (
              <button
                key={t.name}
                type="button"
                className={`scale-thing ${shown.name === t.name ? "on" : ""}`}
                style={{ width: t.px, height: t.px, left: `${8 + ((t.i * 37) % 80)}%`, fontSize: Math.max(12, Math.min(t.px * 0.5, 260)) }}
                onClick={() => setFocus(t)}
                aria-label={t.name}
              >
                <span aria-hidden="true">{t.icon}</span>
              </button>
            ))}
            <div className="scale-ruler">
              <span>Width of view ≈ {formatSize(Math.pow(10, exp) / 0.6)}</span>
            </div>
          </div>
          <input className="scale-range" type="range" min={MIN_E} max={MAX_E} step={0.01} value={exp} onChange={(e) => { setExp(Number(e.target.value)); setFocus(null); }} aria-label="Zoom level" />
          <div className="scale-ends"><span>Proton</span><span>Observable universe</span></div>
          <div className="scale-card panel">
            <span className="scale-icon" aria-hidden="true">{shown.icon}</span>
            <div>
              <strong>{shown.name}</strong>
              <b className="scale-size">{formatSize(shown.size)}</b>
              <p>{shown.fact}</p>
              <small className="muted">10<sup>{Math.round(Math.log10(shown.size))}</sup> metres</small>
            </div>
          </div>
        </>
      ) : (
        <div className="quiz-pair">
          <p className="quiz-q">Which is bigger?</p>
          <div className="pair-row">
            {pair.map((t) => {
              const bigger = pair[0].size > pair[1].size ? pair[0] : pair[1];
              const state = picked ? (t.name === bigger.name ? "right" : t.name === picked ? "wrong" : "") : "";
              return (
                <button key={t.name} type="button" className={`pair-card rip ${state}`} onClick={() => answer(t.name)}>
                  <span className="pair-icon" aria-hidden="true">{t.icon}</span>
                  <strong>{t.name}</strong>
                  {picked && <small>{formatSize(t.size)}</small>}
                </button>
              );
            })}
          </div>
          <p className="muted">Streak: <b>{streak}</b> · +3 XP for each correct answer</p>
          {picked && (
            <button type="button" className="btn btn-primary" onClick={() => { setPair(pickPair()); setPicked(null); }}>Next pair</button>
          )}
        </div>
      )}
    </GameShell>
  );
}
