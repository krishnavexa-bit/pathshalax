import type { ReactNode } from "react";
import Icon from "../icons";

export type GameProps = {
  onXp: (points: number) => void;
  onBack: () => void;
};

export function GameShell({
  title,
  tag,
  intro,
  onBack,
  score,
  children,
}: {
  title: string;
  tag: string;
  intro: string;
  onBack: () => void;
  score?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="game">
      <div className="game-head">
        <button type="button" className="text-btn" onClick={onBack}>
          <Icon name="arrow" size={16} className="flip" />
          All games
        </button>
        {score}
      </div>
      <span className="lesson-badge">{tag}</span>
      <h1 className="game-title">{title}</h1>
      <p className="game-intro">{intro}</p>
      {children}
    </section>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit = "",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  unit?: string;
}) {
  return (
    <label className="g-slider">
      <span>
        {label} <b>{Number.isInteger(step) ? value : value.toFixed(step < 0.1 ? 2 : 1)}{unit}</b>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

export function ScoreChip({ label, value }: { label: string; value: number | string }) {
  return (
    <span className="g-score">
      <Icon name="trophy" size={15} />
      {label} <b>{value}</b>
    </span>
  );
}
