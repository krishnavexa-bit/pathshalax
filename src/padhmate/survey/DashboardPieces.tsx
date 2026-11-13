// @ts-nocheck -- ported as-is from the original PathshalaX JavaScript source.
import React from 'react';
import Icon from '../icons';
import { QUESTIONS, TOTAL_QUESTIONS, isAnswered } from './surveyConfig';
import { THEMES, planChips, profileHighlights } from './profile';

/** Subtle reminder shown on the dashboard until the learning profile is complete. */
export function ProfileNudge({ status, answers, onOpen, onDismiss }) {
  const answered = QUESTIONS.filter((q) => isAnswered(q, answers)).length;
  const started = status === 'in_progress' && answered > 0;
  return (
    <aside className="sv-nudge" aria-label="Learning profile reminder">
      <Icon name="sparkle" size={22} />
      <p>{started ? `Your learning profile is ${answered} of ${TOTAL_QUESTIONS} answered.` : 'Finish your learning profile so PathshalaX can adapt to how you learn.'}</p>
      <div className="nudge-actions">
        <button type="button" className="chip-btn rip" onClick={onOpen}>{started ? 'Continue' : 'Complete profile'}</button>
        <button type="button" className="text-btn" onClick={onDismiss}>Not now</button>
      </div>
    </aside>
  );
}

/** Lets students who chose "Let me switch between themes" change theme from the top bar. */
export function ThemeSwitch({ value, onChange }) {
  return (
    <div className="theme-switch" role="group" aria-label="Website theme">
      {THEMES.map((t) => (
        <button key={t.id} type="button" aria-pressed={value === t.id} onClick={() => onChange(t.id)}>{t.label}</button>
      ))}
    </div>
  );
}

export function ProfilePlan({ profile }) {
  const chips = planChips(profile);
  if (!chips.length) return null;
  return <div className="sv-plan">{chips.map((c) => <span key={c.label}>{c.label}: {c.value}</span>)}</div>;
}

/** Shown on My Progress: what PathshalaX knows, plus a way to change it. */
export function ProfileCard({ status, profile, onOpen }) {
  const highlights = profileHighlights(profile);
  return (
    <section className="panel sv-profile">
      <div className="panel-head">
        <h2>Your learning profile</h2>
        <button type="button" className="chip-btn rip" onClick={onOpen}>
          <Icon name="practice" size={15} />{status === 'completed' ? 'Update my answers' : status === 'in_progress' ? 'Continue survey' : 'Take the survey'}
        </button>
      </div>
      {status === 'completed' && highlights.length > 0
        ? <ul className="sv-chips">{highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        : <p className="muted">Answer a few questions about how you learn and PathshalaX will adapt hints, practice and revision to you.</p>}
      {status === 'completed' && <p className="sv-tip">Your preferences are never locked. Change them whenever your way of studying changes.</p>}
    </section>
  );
}
