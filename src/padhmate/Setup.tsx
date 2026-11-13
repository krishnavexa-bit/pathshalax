import { useState } from "react";
import Icon from "./icons";
import { Backdrop, LogoMark } from "./ui";
import { CLASS_LEVELS, subjectsFor } from "./curriculum";
import type { StudentSettings } from "./cloud";

export const AVATARS = ["🦉", "🐯", "🦊", "🐼", "🐬", "🦚", "🚀", "🧪", "📐", "🌍", "🎨", "⚽"];
export const GOALS = [
  { xp: 20, label: "Easy", note: "About 10 minutes" },
  { xp: 40, label: "Steady", note: "About 20 minutes" },
  { xp: 60, label: "Serious", note: "About 30 minutes" },
  { xp: 100, label: "Champion", note: "About 45 minutes" },
];
export const THEME_CHOICES = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "pastel", label: "Pastel" },
  { id: "colourful", label: "Colourful" },
];

export function defaultSettings(name: string): StudentSettings {
  return { displayName: name, avatar: "🦉", classLevel: 10, subjects: subjectsFor(10).map((s) => s.name), dailyGoal: 40, theme: null };
}

export default function Setup({
  initial,
  mode,
  onSave,
  onCancel,
  onPreviewTheme,
}: {
  initial: StudentSettings;
  mode: "first" | "edit";
  onSave: (s: StudentSettings) => Promise<void>;
  onCancel?: () => void;
  onPreviewTheme: (theme: string | null) => void;
}) {
  const [s, setS] = useState<StudentSettings>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const subjects = subjectsFor(s.classLevel);

  function setClass(level: number) {
    const names = subjectsFor(level).map((x) => x.name);
    const kept = s.subjects.filter((n) => names.includes(n));
    setS({ ...s, classLevel: level, subjects: kept.length ? kept : names.slice(0, level >= 11 ? 5 : names.length) });
  }
  function toggleSubject(name: string) {
    setS({ ...s, subjects: s.subjects.includes(name) ? s.subjects.filter((n) => n !== name) : [...s.subjects, name] });
  }
  async function save() {
    if (!s.subjects.length) {
      setError("Pick at least one subject.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await onSave(s);
    } catch (e) {
      console.error(e);
      setError("Could not save your choices. Check your connection and try again.");
      setBusy(false);
    }
  }

  return (
    <div className="stage">
      <Backdrop />
      <main className="setup">
        <div className="card-brand"><LogoMark /><span>PathshalaX</span></div>
        <h1>{mode === "first" ? "Let’s set up your study space." : "Your profile and preferences"}</h1>
        <p className="muted">You can change any of this later from My Progress.</p>

        <section className="setup-block">
          <h2>What should we call you?</h2>
          <input className="setup-input" value={s.displayName} maxLength={40} placeholder="Your first name" onChange={(e) => setS({ ...s, displayName: e.target.value })} aria-label="Your name" />
        </section>

        <section className="setup-block">
          <h2>Pick an avatar</h2>
          <div className="avatar-grid" role="radiogroup" aria-label="Avatar">
            {AVATARS.map((a) => (
              <button key={a} type="button" role="radio" aria-checked={s.avatar === a} className={`avatar-pick ${s.avatar === a ? "on" : ""}`} onClick={() => setS({ ...s, avatar: a })}>
                {a}
              </button>
            ))}
          </div>
        </section>

        <section className="setup-block">
          <h2>Which class are you in?</h2>
          <div className="chip-row" role="radiogroup" aria-label="Class">
            {CLASS_LEVELS.map((c) => (
              <button key={c} type="button" role="radio" aria-checked={s.classLevel === c} className={`choice-chip ${s.classLevel === c ? "on" : ""}`} onClick={() => setClass(c)}>
                Class {c}
              </button>
            ))}
          </div>
        </section>

        <section className="setup-block">
          <h2>Your subjects</h2>
          <div className="chip-row">
            {subjects.map((sub) => (
              <button key={sub.id} type="button" aria-pressed={s.subjects.includes(sub.name)} className={`choice-chip ${s.subjects.includes(sub.name) ? "on" : ""}`} onClick={() => toggleSubject(sub.name)}>
                <span aria-hidden="true">{sub.icon}</span> {sub.name}
              </button>
            ))}
          </div>
        </section>

        <section className="setup-block">
          <h2>Daily goal</h2>
          <div className="goal-grid" role="radiogroup" aria-label="Daily goal">
            {GOALS.map((g) => (
              <button key={g.xp} type="button" role="radio" aria-checked={s.dailyGoal === g.xp} className={`goal-pick ${s.dailyGoal === g.xp ? "on" : ""}`} onClick={() => setS({ ...s, dailyGoal: g.xp })}>
                <strong>{g.label}</strong>
                <span>{g.xp} XP a day</span>
                <small>{g.note}</small>
              </button>
            ))}
          </div>
          <p className="muted small">Meet your goal every day to grow your streak 🔥</p>
        </section>

        <section className="setup-block">
          <h2>Colour theme</h2>
          <div className="chip-row" role="radiogroup" aria-label="Colour theme">
            <button type="button" role="radio" aria-checked={s.theme === null} className={`choice-chip ${s.theme === null ? "on" : ""}`} onClick={() => { setS({ ...s, theme: null }); onPreviewTheme(null); }}>
              Match my learning profile
            </button>
            {THEME_CHOICES.map((t) => (
              <button key={t.id} type="button" role="radio" aria-checked={s.theme === t.id} className={`choice-chip theme-chip theme-${t.id} ${s.theme === t.id ? "on" : ""}`} onClick={() => { setS({ ...s, theme: t.id }); onPreviewTheme(t.id); }}>
                {t.label}
              </button>
            ))}
          </div>
        </section>

        {error && <div className="auth-error" role="alert">{error}</div>}
        <div className="actions-row">
          <button type="button" className="btn btn-primary magnetic" onClick={save} disabled={busy}>
            {busy ? "Saving…" : mode === "first" ? "Start learning" : "Save changes"}
            <Icon name="arrow" size={18} className="arr" />
          </button>
          {onCancel && <button type="button" className="text-btn" onClick={onCancel}>Cancel</button>}
        </div>
      </main>
    </div>
  );
}
