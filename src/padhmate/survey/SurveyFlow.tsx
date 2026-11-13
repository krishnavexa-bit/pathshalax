// @ts-nocheck -- ported as-is from the original PADHMATE JavaScript source.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../icons';
import { Backdrop, LogoMark } from '../ui';
import { burstFrom } from '../fx';
import {
  OTHER_SUBJECT, PARTS, QUESTIONS, TOTAL_QUESTIONS, emptyAnswers, firstInvalidIndex,
  isAnswered, normaliseAnswers, optionsFor, subjectLabel, validateQuestion
} from './surveyConfig';
import { THEMES, applyTheme, deriveProfile, profileHighlights } from './profile';

const THEME_BY_OPTION = ['dark', 'light', 'pastel', 'colourful', null];

/** Radio group with arrow-key navigation (roving tabindex). */
function SingleChoice({ question, value, onChange, labelledBy }) {
  const refs = useRef([]);
  const options = question.options;
  const focusIndex = value ? options.indexOf(value) : 0;

  function onKeyDown(event, index) {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = (index + keys[event.key] + options.length) % options.length;
    refs.current[next]?.focus();
    onChange(options[next]);
  }

  return (
    <div className={`options sv-options ${question.layout === 'grid' ? 'sv-grid' : ''}`} role="radiogroup" aria-labelledby={labelledBy}>
      {options.map((option, index) => {
        const chosen = value === option;
        return (
          <button
            key={option}
            ref={(el) => { refs.current[index] = el; }}
            type="button"
            role="radio"
            aria-checked={chosen}
            tabIndex={index === focusIndex ? 0 : -1}
            className={`opt rip sv-opt ${chosen ? 'chosen' : ''}`}
            onClick={() => onChange(option)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            <span className="opt-letter">{String.fromCharCode(65 + index)}</span>
            <span className="opt-text">{option}</span>
            <span className="opt-mark">{chosen && <Icon name="check" size={20} strokeWidth={3} />}</span>
          </button>
        );
      })}
    </div>
  );
}

function MultiChoice({ question, answers, onToggle, onSelectNone, labelledBy }) {
  const options = optionsFor(question, answers);
  const isWeak = question.key === 'weakSubjects';
  const selected = answers[question.key] || [];
  return (
    <div className="options sv-options sv-grid" role="group" aria-labelledby={labelledBy}>
      {isWeak && (
        <button
          type="button" role="checkbox" aria-checked={answers.confidentAll}
          className={`opt rip sv-opt sv-opt-wide ${answers.confidentAll ? 'chosen' : ''}`}
          onClick={onSelectNone}
        >
          <span className="opt-letter"><Icon name="sparkle" size={18} /></span>
          <span className="opt-text">I feel confident in all my subjects</span>
          <span className="opt-mark">{answers.confidentAll && <Icon name="check" size={20} strokeWidth={3} />}</span>
        </button>
      )}
      {options.map((option) => {
        const chosen = selected.includes(option);
        return (
          <button
            key={option} type="button" role="checkbox" aria-checked={chosen}
            className={`opt rip sv-opt ${chosen ? 'chosen' : ''}`}
            onClick={() => onToggle(option)}
          >
            <span className={`sv-box ${chosen ? 'on' : ''}`} aria-hidden="true">{chosen && <Icon name="check" size={16} strokeWidth={3.4} />}</span>
            <span className="opt-text">{isWeak ? subjectLabel(option, answers) : option}</span>
            <span />
          </button>
        );
      })}
    </div>
  );
}

function answerText(question, answers) {
  const value = answers[question.key];
  if (question.key === 'weakSubjects') {
    if (answers.confidentAll) return 'Confident in all subjects';
    return value?.length ? value.map((s) => subjectLabel(s, answers)).join(', ') : 'Not answered';
  }
  if (question.key === 'subjects') return (value || []).map((s) => subjectLabel(s, answers)).join(', ') || 'Not answered';
  if (question.type === 'text') return value?.trim() ? value.trim() : 'Nothing added';
  return value || 'Not answered';
}

function SurveyTopbar({ onLater, laterLabel, onSignOut }) {
  return (
    <header className="topbar">
      <div className="brand"><LogoMark /><div><b>PADHMATE</b><small>Your learning profile</small></div></div>
      <div className="topbar-right">
        {onLater && <button type="button" className="chip-btn rip" onClick={onLater}>{laterLabel}</button>}
        {onSignOut && <button type="button" className="chip-btn rip" onClick={onSignOut}><Icon name="logout" size={15} />Sign out</button>}
      </div>
    </header>
  );
}

/**
 * mode: 'first'  – new student: intro, questions, review, success
 *       'resume' – returning to a half-finished survey (skips the intro)
 *       'edit'   – changing answers later (skips the intro, nothing is saved until "Save changes")
 */
export default function SurveyFlow({ mode, initialRecord, syncError, onAutosave, onSkip, onPause, onSubmit, onClose, onSignOut }) {
  const editing = mode === 'edit';
  const startAnswers = useMemo(() => ({ ...emptyAnswers(), ...initialRecord.answers }), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [answers, setAnswers] = useState(startAnswers);
  const [screen, setScreen] = useState(mode === 'first' ? 'intro' : 'question');
  const [index, setIndex] = useState(mode === 'resume' ? Math.min(initialRecord.currentStep || 0, TOTAL_QUESTIONS - 1) : 0);
  const [direction, setDirection] = useState('forward');
  const [error, setError] = useState('');
  const [returnToReview, setReturnToReview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [savedFlash, setSavedFlash] = useState(false);
  const headingRef = useRef(null);
  const originalTheme = useRef(typeof document !== 'undefined' ? document.documentElement.dataset.theme : 'light');
  const finished = useRef(false);

  const question = QUESTIONS[index];
  const part = PARTS.find((p) => p.id === (screen === 'question' ? question.part : 'thinking'));
  const answeredCount = QUESTIONS.filter((q) => isAnswered(q, answers)).length;
  const percent = screen === 'success' ? 100 : screen === 'review' ? 100 : screen === 'intro' ? 0 : Math.round((index / TOTAL_QUESTIONS) * 100);

  // Move focus to the new heading so keyboard and screen-reader users land in the right place.
  useEffect(() => { headingRef.current?.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'smooth' }); }, [screen, index]);

  // In edit mode a cancelled change must not leave the previewed theme behind.
  useEffect(() => () => { if (editing && !finished.current && originalTheme.current) applyTheme(originalTheme.current); }, [editing]);

  function update(patch, step = index) {
    const next = normaliseAnswers({ ...answers, ...patch });
    setAnswers(next);
    setError('');
    if (!editing) {
      onAutosave(next, step);
      setSavedFlash(true);
    }
    return next;
  }
  useEffect(() => {
    if (!savedFlash) return undefined;
    const t = window.setTimeout(() => setSavedFlash(false), 1800);
    return () => window.clearTimeout(t);
  }, [savedFlash]);

  function choose(value) {
    const patch = { [question.key]: value };
    update(patch);
    if (question.key === 'theme') {
      const theme = THEME_BY_OPTION[question.options.indexOf(value)];
      if (theme) applyTheme(theme);
      else if (!THEMES.some((t) => t.id === document.documentElement.dataset.theme)) applyTheme('light');
    }
  }
  function toggle(option) {
    const current = answers[question.key] || [];
    const next = current.includes(option) ? current.filter((x) => x !== option) : [...current, option];
    update({ [question.key]: next, ...(question.key === 'weakSubjects' && next.length ? { confidentAll: false } : {}) });
  }
  function selectNone() {
    update({ weakSubjects: [], confidentAll: !answers.confidentAll });
  }

  function go(nextIndex, dir) {
    setDirection(dir);
    setError('');
    setIndex(nextIndex);
    if (!editing) onAutosave(answers, nextIndex);
  }
  function next() {
    const message = validateQuestion(question, answers);
    if (message) { setError(message); return; }
    if (returnToReview || index === TOTAL_QUESTIONS - 1) {
      setDirection('forward'); setScreen('review'); setReturnToReview(false);
      if (!editing) onAutosave(answers, TOTAL_QUESTIONS - 1);
      return;
    }
    go(index + 1, 'forward');
  }
  function back() {
    if (returnToReview) { setScreen('review'); setReturnToReview(false); setDirection('back'); return; }
    if (index === 0) { if (mode === 'first') { setScreen('intro'); setDirection('back'); } return; }
    go(index - 1, 'back');
  }
  function editFromReview(i) {
    setDirection('back'); setIndex(i); setScreen('question'); setReturnToReview(true);
  }

  async function submit(event) {
    const bad = firstInvalidIndex(answers);
    if (bad !== -1) { editFromReview(bad); setError(validateQuestion(QUESTIONS[bad], answers)); return; }
    setBusy(true); setSubmitError('');
    try {
      await onSubmit(answers);
      finished.current = true;
      burstFrom(event, { count: 60, power: 12 });
      setDirection('forward'); setScreen('success');
    } catch (err) {
      console.error('Could not submit the learning profile:', err);
      setSubmitError('We could not save your profile. Check your connection and try again. Your answers are safe on this device.');
    } finally { setBusy(false); }
  }

  const profile = useMemo(() => (screen === 'success' ? deriveProfile(answers) : null), [screen, answers]);
  const motionClass = `sv-screen sv-${direction}`;

  /* ---------- intro ---------- */
  if (screen === 'intro') {
    return (
      <div className="stage">
        <Backdrop />
        <SurveyTopbar onSignOut={onSignOut} />
        <main className="page sv-page">
          <section className={`panel sv-card sv-intro ${motionClass}`} key="intro" aria-labelledby="sv-title">
            <span className="pill sv-pill"><span className="live-dot" />Welcome to PADHMATE</span>
            <h1 id="sv-title" tabIndex={-1} ref={headingRef}>Let’s understand how you learn.</h1>
            <p className="sv-lead">Everyone learns differently. Answer a few questions so PADHMATE can create a learning experience that works for you.</p>
            <ul className="sv-facts">
              <li><Icon name="clock" size={20} /><span><b>About 7–10 minutes</b>{TOTAL_QUESTIONS} short questions in 3 parts</span></li>
              <li><Icon name="revision" size={20} /><span><b>Change it any time</b>Update your answers later from My Progress</span></li>
              <li><Icon name="check" size={20} strokeWidth={3} /><span><b>Saved as you go</b>Leave and come back without losing anything</span></li>
            </ul>
            <div className="actions-row">
              <button type="button" className="btn btn-primary magnetic" onClick={() => { setScreen('question'); setDirection('forward'); onAutosave(answers, 0); }}>
                Start survey<Icon name="arrow" size={18} className="arr" />
              </button>
              <button type="button" className="text-btn" onClick={onSkip}>I’ll do this later</button>
            </div>
            <p className="save-note">You can use PADHMATE right away. We’ll remind you gently to finish your learning profile.</p>
          </section>
        </main>
      </div>
    );
  }

  /* ---------- success ---------- */
  if (screen === 'success') {
    const highlights = profileHighlights(profile);
    return (
      <div className="stage">
        <Backdrop />
        <SurveyTopbar />
        <main className="page sv-page">
          <section className={`panel sv-card done-panel ${motionClass}`} key="success" aria-labelledby="sv-title">
            <div className="done-symbol"><Icon name="check" size={44} strokeWidth={3} /></div>
            <h2 id="sv-title" tabIndex={-1} ref={headingRef}>{editing ? 'Your profile is updated.' : 'Your learning profile is ready.'}</h2>
            <p className="muted">PADHMATE will now adapt your dashboard, hints, practice and revision to the way you learn.</p>
            {highlights.length > 0 && <ul className="sv-chips" aria-label="What PADHMATE learned about you">{highlights.map((h) => <li key={h}>{h}</li>)}</ul>}
            <div className="actions-row center">
              <button type="button" className="btn btn-primary magnetic" onClick={onClose}>{editing ? 'Back to my progress' : 'Go to my dashboard'}<Icon name="arrow" size={18} className="arr" /></button>
            </div>
            <p className="save-note">You can change any answer later from the My Progress page.</p>
          </section>
        </main>
      </div>
    );
  }

  /* ---------- review ---------- */
  if (screen === 'review') {
    return (
      <div className="stage">
        <Backdrop />
        <SurveyTopbar onLater={editing ? onClose : () => onPause(answers, TOTAL_QUESTIONS - 1)} laterLabel={editing ? 'Cancel' : 'Save & finish later'} onSignOut={editing ? null : onSignOut} />
        <main className="page sv-page">
          <section className={`panel sv-card ${motionClass}`} key="review" aria-labelledby="sv-title">
            <div className="q-top"><span className="lesson-badge">Review</span><span className="q-count">{answeredCount} of {TOTAL_QUESTIONS} answered</span></div>
            <div className="bar" role="progressbar" aria-label="Survey completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={100}><span style={{ width: '100%' }} /></div>
            <h2 className="q-prompt" id="sv-title" tabIndex={-1} ref={headingRef}>Check your answers.</h2>
            <p className="muted sv-sub">Everything look right? You can change any answer before you submit.</p>
            {PARTS.map((p) => (
              <div className="sv-review-part" key={p.id}>
                <h3>Part {p.number} · {p.title}</h3>
                <dl>
                  {QUESTIONS.filter((q) => q.part === p.id).map((q) => {
                    const i = QUESTIONS.indexOf(q);
                    const missing = validateQuestion(q, answers);
                    return (
                      <div className={`sv-review-row ${missing ? 'is-missing' : ''}`} key={q.key}>
                        <dt><span className="sv-qnum">{q.number}</span>{q.title}</dt>
                        <dd>{answerText(q, answers)}</dd>
                        <button type="button" className="text-btn" onClick={() => editFromReview(i)} aria-label={`Change answer to question ${q.number}`}>Change</button>
                      </div>
                    );
                  })}
                </dl>
              </div>
            ))}
            {(error || submitError) && <div className="auth-error" role="alert">{submitError || error}</div>}
            <div className="q-actions spread">
              <span className="save-note">{!editing && syncError ? syncError : 'Your answers are saved.'}</span>
              <div className="actions-row">
                <button type="button" className="btn btn-soft magnetic" onClick={() => { go(TOTAL_QUESTIONS - 1, 'back'); setScreen('question'); }}>Previous</button>
                <button type="button" className="btn btn-primary magnetic" onClick={submit} disabled={busy}>
                  {busy ? 'Saving…' : editing ? 'Save changes' : 'Submit my profile'}<Icon name="check" size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  /* ---------- question ---------- */
  const labelId = 'sv-question-title';
  const isLast = index === TOTAL_QUESTIONS - 1;
  const showPartIntro = question.part === 'thinking' && question.number === 8;
  return (
    <div className="stage">
      <Backdrop />
      <SurveyTopbar onLater={editing ? onClose : () => onPause(answers, index)} laterLabel={editing ? 'Cancel' : 'Save & finish later'} onSignOut={editing ? null : onSignOut} />
      <main className="page sv-page">
        <section className={`panel sv-card question ${motionClass}`} key={index} aria-labelledby={labelId}>
          <div className="q-top">
            <span className="lesson-badge">Part {part.number} of 3 · {part.title}</span>
            <span className="q-count" aria-live="polite">Question {question.number} of {TOTAL_QUESTIONS}</span>
          </div>
          <div className="bar" role="progressbar" aria-label="Survey completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><span style={{ width: `${Math.max(percent, 3)}%` }} /></div>
          <div className="sv-percent"><b>{percent}%</b> complete</div>
          {showPartIntro && <p className="sv-note"><Icon name="sparkle" size={18} />{part.blurb}</p>}
          <h2 className="q-prompt" id={labelId} tabIndex={-1} ref={headingRef}>
            <span className="sv-big-num" aria-hidden="true">{question.number}</span>{question.title}
          </h2>
          {question.hint && <p className="sv-hint">{question.hint}</p>}

          {question.type === 'single' && <SingleChoice question={question} value={answers[question.key]} onChange={choose} labelledBy={labelId} />}
          {question.type === 'multi' && (
            <>
              {question.key === 'weakSubjects' && answers.subjects.length === 0
                ? <p className="sv-note"><Icon name="sparkle" size={18} />Go back and choose your subjects first, or skip this question.</p>
                : <MultiChoice question={question} answers={answers} onToggle={toggle} onSelectNone={selectNone} labelledBy={labelId} />}
              {question.key === 'subjects' && answers.subjects.includes(OTHER_SUBJECT) && (
                <label className="sv-field">
                  <span>Which other subject?</span>
                  <input type="text" maxLength={60} value={answers.otherSubject} onChange={(e) => update({ otherSubject: e.target.value })} placeholder="For example, Sanskrit" />
                </label>
              )}
            </>
          )}
          {question.type === 'text' && (
            <label className="sv-field">
              <span className="sv-sr">Anything else PADHMATE should know (optional)</span>
              <textarea rows={6} maxLength={question.maxLength} value={answers.notes} placeholder={question.placeholder} onChange={(e) => update({ notes: e.target.value })} />
              <small>{answers.notes.length}/{question.maxLength}</small>
            </label>
          )}

          <div className="sv-error" role="alert" aria-live="assertive">{error}</div>

          <div className="q-actions spread sv-actions">
            <span className="save-note" aria-live="polite">
              {editing ? 'Changes are saved when you finish.' : syncError || (savedFlash ? 'Saved ✓' : 'Your answers are saved automatically.')}
            </span>
            <div className="actions-row">
              {(index > 0 || mode === 'first' || returnToReview) && (
                <button type="button" className="btn btn-soft magnetic" onClick={back}>{returnToReview ? 'Back to review' : 'Previous'}</button>
              )}
              <button type="button" className="btn btn-primary magnetic" onClick={next}>
                {returnToReview ? 'Done' : isLast ? 'Review answers' : 'Next'}<Icon name="arrow" size={18} className="arr" />
              </button>
            </div>
          </div>
          {!question.required && <button type="button" className="text-btn sv-skip" onClick={next}>Skip this question</button>}
        </section>
      </main>
    </div>
  );
}
