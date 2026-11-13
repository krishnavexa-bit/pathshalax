import { useState } from "react";
import { GameShell, ScoreChip, type GameProps } from "./GameShell";

// Years are negative for BCE. "approx" marks events dated by historians to around that year.
const EVENTS = [
  { title: "Kalinga War fought by Ashoka", year: -261, icon: "⚔️", approx: true },
  { title: "Aryabhata writes the Aryabhatiya", year: 499, icon: "🔢", approx: true },
  { title: "Christopher Columbus reaches the Americas", year: 1492, icon: "⛵" },
  { title: "Vasco da Gama reaches Calicut", year: 1498, icon: "🧭" },
  { title: "First Battle of Panipat", year: 1526, icon: "🏹" },
  { title: "Akbar becomes Mughal emperor", year: 1556, icon: "👑" },
  { title: "Construction of the Taj Mahal begins", year: 1632, icon: "🕌" },
  { title: "Shivaji is crowned Chhatrapati", year: 1674, icon: "🚩" },
  { title: "Newton publishes his laws of motion (Principia)", year: 1687, icon: "🍎" },
  { title: "Battle of Plassey", year: 1757, icon: "🛡️" },
  { title: "Third Battle of Panipat", year: 1761, icon: "🐎" },
  { title: "Battle of Buxar", year: 1764, icon: "🗡️" },
  { title: "American Declaration of Independence", year: 1776, icon: "📜" },
  { title: "French Revolution begins", year: 1789, icon: "🇫🇷" },
  { title: "Faraday discovers electromagnetic induction", year: 1831, icon: "🧲" },
  { title: "First passenger train in India (Bombay–Thane)", year: 1853, icon: "🚂" },
  { title: "Revolt of 1857", year: 1857, icon: "🔥" },
  { title: "Darwin publishes On the Origin of Species", year: 1859, icon: "🐢" },
  { title: "Mendeleev publishes his periodic table", year: 1869, icon: "⚗️" },
  { title: "Unification of Germany", year: 1871, icon: "🇩🇪" },
  { title: "Indian National Congress is founded", year: 1885, icon: "🏛️" },
  { title: "Partition of Bengal", year: 1905, icon: "🗺️" },
  { title: "First World War begins", year: 1914, icon: "🪖" },
  { title: "Gandhi returns to India from South Africa", year: 1915, icon: "🧳" },
  { title: "Russian Revolution", year: 1917, icon: "🇷🇺" },
  { title: "Jallianwala Bagh massacre", year: 1919, icon: "🕯️" },
  { title: "Non-Cooperation Movement launched", year: 1920, icon: "✊" },
  { title: "C. V. Raman discovers the Raman effect", year: 1928, icon: "🔬" },
  { title: "Dandi Salt March", year: 1930, icon: "🧂" },
  { title: "Quit India Movement", year: 1942, icon: "📢" },
  { title: "Second World War ends", year: 1945, icon: "🕊️" },
  { title: "India becomes independent", year: 1947, icon: "🇮🇳" },
  { title: "Constitution of India comes into force", year: 1950, icon: "📘" },
  { title: "Structure of DNA described", year: 1953, icon: "🧬" },
  { title: "First human lands on the Moon", year: 1969, icon: "👨‍🚀" },
  { title: "India launches its first satellite, Aryabhata", year: 1975, icon: "🛰️" },
  { title: "Fall of the Berlin Wall", year: 1989, icon: "🧱" },
  { title: "Mangalyaan enters orbit around Mars", year: 2014, icon: "🔴" },
  { title: "Chandrayaan-3 lands near the Moon's south pole", year: 2023, icon: "🌙" },
];

type Ev = (typeof EVENTS)[number];

function yearLabel(e: Ev) {
  const y = e.year < 0 ? `${-e.year} BCE` : `${e.year}`;
  return "approx" in e && e.approx ? `c. ${y}` : y;
}
function pickPair(): [Ev, Ev] {
  for (;;) {
    const a = EVENTS[Math.floor(Math.random() * EVENTS.length)]!;
    const b = EVENTS[Math.floor(Math.random() * EVENTS.length)]!;
    if (a.year !== b.year) return [a, b];
  }
}

export default function TimelineGame({ onXp, onBack }: GameProps) {
  const [pair, setPair] = useState<[Ev, Ev]>(() => pickPair());
  const [picked, setPicked] = useState<Ev | null>(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [placed, setPlaced] = useState<Ev[]>([]);

  const earlier = pair[0].year < pair[1].year ? pair[0] : pair[1];

  function answer(e: Ev) {
    if (picked) return;
    setPicked(e);
    setPlaced((list) => [...new Set([...list, pair[0], pair[1]])]);
    if (e === earlier) {
      onXp(3);
      setStreak((s) => {
        setBest((b) => Math.max(b, s + 1));
        return s + 1;
      });
    } else setStreak(0);
  }

  const minY = -300;
  const maxY = 2030;
  const pos = (y: number) => {
    // Squash the distant past so modern events have room.
    const t = (Math.sign(y - 1400) * Math.pow(Math.abs(y - 1400), 0.6) - Math.sign(minY - 1400) * Math.pow(Math.abs(minY - 1400), 0.6)) /
      (Math.pow(Math.abs(maxY - 1400), 0.6) + Math.pow(Math.abs(minY - 1400), 0.6));
    return Math.min(100, Math.max(0, t * 100));
  };

  return (
    <GameShell
      title="Which came first?"
      tag="History · Science · Classes 6–12"
      intro="Two moments from history. Tap the one that happened earlier. Every answer pins both events on your timeline."
      onBack={onBack}
      score={<ScoreChip label="Best streak" value={best} />}
    >
      <div className="pair-row">
        {pair.map((e) => {
          const state = picked ? (e === earlier ? "right" : e === picked ? "wrong" : "") : "";
          return (
            <button key={e.title} type="button" className={`pair-card rip ${state}`} onClick={() => answer(e)}>
              <span className="pair-icon" aria-hidden="true">{e.icon}</span>
              <strong>{e.title}</strong>
              {picked && <small className="pair-year">{yearLabel(e)}</small>}
            </button>
          );
        })}
      </div>
      <p className="muted center-text">Streak: <b>{streak}</b> · +3 XP for each correct answer</p>
      {picked && (
        <div className="center-text">
          <button type="button" className="btn btn-primary" onClick={() => { setPair(pickPair()); setPicked(null); }}>Next pair</button>
        </div>
      )}
      <div className="timeline panel" aria-label="Your timeline">
        <div className="tl-line" />
        {[0, 1000, 1500, 1800, 1900, 2000].map((y) => (
          <span key={y} className="tl-tick" style={{ left: `${pos(y)}%` }}>{y === 0 ? "0 CE" : y}</span>
        ))}
        {placed.map((e, i) => (
          <span key={e.title} className={`tl-pin ${i % 2 ? "down" : ""}`} style={{ left: `${pos(e.year)}%` }} title={`${e.title} (${yearLabel(e)})`}>
            {e.icon}
          </span>
        ))}
        {placed.length === 0 && <p className="muted tl-empty">Answer a pair to start your timeline.</p>}
      </div>
    </GameShell>
  );
}
