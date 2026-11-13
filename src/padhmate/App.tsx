// @ts-nocheck -- ported as-is from the original PathshalaX JavaScript source.
import React, { useEffect, useMemo, useState } from 'react';
import { assessmentQuestionIds, lessons, questions } from './data';
import { supabase } from '@/integrations/supabase/client';
import {
  claimImportedAccount, loadProgress, saveProgress, sameUser, signInAsGuest,
  signInWithGoogle, signOutUser, toAppUser
} from './cloud';
import { stashGuestPersonalization } from './survey/personalizationService';
import { loadSettings, saveSettings } from './cloud';
import Setup, { defaultSettings } from './Setup';
import LearnHub from './LearnHub';
import PlayHub from './PlayHub';
import { subjectsFor } from './curriculum';
import { addDailyXp, streakDays, todayXp } from './streak';
import Icon from './icons';
import Parabola from './Parabola';
import { Backdrop, Count, Dock, GoogleG, LogoMark, XpChip } from './ui';
import { burstFrom, initFx, rain } from './fx';
import SurveyFlow from './survey/SurveyFlow';
import { ProfileCard, ProfileNudge, ProfilePlan, ThemeSwitch } from './survey/DashboardPieces';
import { usePersonalization } from './survey/usePersonalization';
import {
  applyStoredTheme, applyTheme, coachMessage as personalCoachMessage, feedbackEncouragement,
  practiceTip, readThemeOverride, resolveTheme, revisionTip, sessionNudge, writeThemeOverride
} from './survey/profile';

applyStoredTheme();

const STORAGE_KEY = 'padhmate-clean-progress-v1';
const initialProgress = {
  completedLessons: [],
  attempts: [],
  revisionItems: [],
  xp: 0,
  assessmentCount: 0,
  bestAssessment: null,
  completedChapters: [],
  dailyXp: {}
};

// Adds learning points and records them against today's daily goal.
function xpPatch(previous, points) {
  return { xp: (previous.xp || 0) + points, dailyXp: addDailyXp(previous.dailyXp, points) };
}

function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!saved || typeof saved !== 'object') return initialProgress;
    return {
      ...initialProgress,
      ...saved,
      completedLessons: Array.isArray(saved.completedLessons) ? saved.completedLessons : [],
      attempts: Array.isArray(saved.attempts) ? saved.attempts : [],
      revisionItems: Array.isArray(saved.revisionItems) ? saved.revisionItems : [],
      completedChapters: Array.isArray(saved.completedChapters) ? saved.completedChapters : [],
      dailyXp: saved.dailyXp && typeof saved.dailyXp === 'object' ? saved.dailyXp : {}
    };
  } catch {
    return initialProgress;
  }
}


function authMessage(error) {
  const text = String(error?.message || '');
  if (/anonymous sign-ins are disabled/i.test(text)) return 'Guest sign-in is not available right now. Please continue with Google.';
  if (/popup/i.test(text)) return 'Your browser blocked the Google sign-in window. Allow popups and try again.';
  if (/network|fetch/i.test(text)) return 'Network connection failed. Check your internet and try again.';
  return text || 'Sign-in failed. Please try again.';
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

function getLessonForQuestion(questionId) {
  const q = questions.find((item) => item.id === questionId);
  return lessons.find((lesson) => lesson.id === q?.lessonId) || lessons[0];
}

function updateRevisionQueue(queue, questionId, correct, snapshot = null) {
  const existing = queue.find((item) => item.questionId === questionId);
  if (correct) {
    return queue.filter((item) => item.questionId !== questionId);
  }
  if (existing) {
    return queue.map((item) => item.questionId === questionId
      ? { ...item, mistakes: existing.mistakes + 1, dueAt: Date.now(), reviewedAt: null }
      : item);
  }
  return [...queue, { questionId, mistakes: 1, dueAt: Date.now(), reviewedAt: null, ...(snapshot ? { snapshot } : {}) }];
}

function recordOneAttempt(previous, question, selected, source = 'practice') {
  const correct = selected === question.answer;
  const attempt = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    questionId: question.id,
    topic: question.topic,
    selected,
    correct,
    source,
    createdAt: Date.now()
  };
  return {
    ...previous,
    attempts: [...previous.attempts, attempt],
    revisionItems: updateRevisionQueue(previous.revisionItems, question.id, correct),
    ...xpPatch(previous, correct ? 5 : 1)
  };
}

// Records an answer from an AI chapter quiz; the question text travels with it so Revision can show it.
function recordChapterAttempt(previous, snapshot, correct) {
  const attempt = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    questionId: snapshot.id,
    topic: snapshot.topic,
    correct,
    source: 'chapter',
    createdAt: Date.now()
  };
  return {
    ...previous,
    attempts: [...previous.attempts, attempt],
    revisionItems: updateRevisionQueue(previous.revisionItems, snapshot.id, correct, snapshot),
    ...xpPatch(previous, correct ? 5 : 1)
  };
}

function PageHead({ title, description, action }) {
  return (
    <header className="page-head">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </header>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  // Tracks which account's cloud progress has loaded, so a switch between accounts never saves
  // one account's progress into another before the new account has loaded.
  const [cloudReadyFor, setCloudReadyFor] = useState(null);
  const cloudReady = Boolean(user) && cloudReadyFor === user.uid;
  const [authError, setAuthError] = useState('');
  const [authBusy, setAuthBusy] = useState(false);
  const [progress, setProgress] = useState(readProgress);

  useEffect(() => initFx(), []);

  useEffect(() => {
    let active = true;
    const apply = (session) => {
      if (!active) return;
      const next = toAppUser(session?.user);
      setUser((previous) => (sameUser(previous, next) ? previous : next));
      setAuthLoading(false);
    };
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED' || event === 'INITIAL_SESSION') {
        apply(session);
        if (event !== 'INITIAL_SESSION') setAuthError('');
      }
    });
    supabase.auth.getSession()
      .then(({ data: { session } }) => apply(session))
      .catch((error) => {
        console.error('Could not restore the PathshalaX session:', error);
        if (active) { setAuthError(authMessage(error)); setAuthLoading(false); }
      });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let active = true;
    async function loadCloudProgress() {
      if (!user) { setCloudReadyFor(null); return; }
      try {
        // Google accounts from the previous PathshalaX app pick up their imported progress here.
        if (!user.isAnonymous) await claimImportedAccount();
        if (!active) return;
        const saved = await loadProgress(user.uid);
        if (!active) return;
        if (saved && Object.keys(saved).length) {
          setProgress({ ...initialProgress, ...saved, completedChapters: saved.completedChapters || [], dailyXp: saved.dailyXp || {} });
        } else {
          // First sign-in: migrate this browser's existing progress (including a guest's) to the account.
          const local = readProgress();
          await saveProgress(user.uid, local);
          if (active) setProgress(local);
        }
        if (active) setCloudReadyFor(user.uid);
      } catch (error) {
        console.error('Could not load PathshalaX cloud progress:', error);
        if (active) {
          setAuthError('Could not load cloud progress. Check your connection, then refresh.');
          setCloudReadyFor(user.uid);
        }
      }
    }
    loadCloudProgress();
    return () => { active = false; };
  }, [user]);

  useEffect(() => {
    if (!user || !cloudReady) return;
    const save = async () => {
      try {
        await saveProgress(user.uid, progress);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error('Could not save PathshalaX cloud progress:', error);
        setAuthError('Cloud save failed. Your current session is still active; check your connection.');
      }
    };
    save();
  }, [progress, user, cloudReady]);

  async function continueAsGuest() {
    setAuthBusy(true); setAuthError('');
    try { await signInAsGuest(); }
    catch (error) { setAuthError(authMessage(error)); }
    finally { setAuthBusy(false); }
  }

  async function continueWithGoogle() {
    setAuthBusy(true); setAuthError('');
    try {
      // A guest's progress and survey answers in this browser carry over to the Google account
      // when that account has nothing saved yet.
      if (user?.isAnonymous) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        stashGuestPersonalization(user.uid);
      }
      await signInWithGoogle();
    } catch (error) { setAuthError(authMessage(error)); }
    finally { setAuthBusy(false); }
  }

  async function logOut() {
    try { await signOutUser(); setProgress(readProgress()); applyTheme('light'); }
    catch (error) { setAuthError(authMessage(error)); }
  }

  const pz = usePersonalization(user, cloudReady);
  const [surveyMode, setSurveyMode] = useState(null); // null | 'first' | 'resume' | 'edit'
  const [nudgeHidden, setNudgeHidden] = useState(false);
  const [themeOverride, setThemeOverride] = useState(null);
  const [showFullExplanation, setShowFullExplanation] = useState(false);
  const profile = pz.profile;

  // Student preferences (name, avatar, class, subjects, daily goal, theme).
  const [settings, setSettings] = useState(null);
  const [settingsFor, setSettingsFor] = useState(null);
  const [editingSettings, setEditingSettings] = useState(false);
  const [themePreview, setThemePreview] = useState(undefined);
  useEffect(() => {
    let active = true;
    if (!user || !cloudReady) return undefined;
    loadSettings(user.uid)
      .then((loaded) => { if (active) { setSettings(loaded); setSettingsFor(user.uid); } })
      .catch((error) => {
        console.error('Could not load preferences:', error);
        if (active) { setSettings(null); setSettingsFor(user.uid); setAuthError('Could not load your preferences. Check your connection.'); }
      });
    return () => { active = false; };
  }, [user?.uid, cloudReady]); // eslint-disable-line react-hooks/exhaustive-deps
  async function storeSettings(next) {
    await saveSettings(user.uid, next);
    setSettings(next);
    setEditingSettings(false);
    setThemePreview(undefined);
  }

  useEffect(() => { setThemeOverride(user ? readThemeOverride(user.uid) : null); setNudgeHidden(false); setSurveyMode(null); }, [user?.uid]); // eslint-disable-line react-hooks/exhaustive-deps
  // Keep the survey on screen once it has started, even though autosave changes the stored status.
  useEffect(() => { if (user && pz.loaded && pz.status === 'none' && !surveyMode) setSurveyMode('first'); }, [user, pz.loaded, pz.status, surveyMode]);
  const chosenTheme = themePreview !== undefined ? themePreview : settings?.theme;
  const activeTheme = user ? (chosenTheme || resolveTheme(pz.themeProfile, themeOverride)) : 'light';
  useEffect(() => { applyTheme(activeTheme); }, [activeTheme]);
  function chooseTheme(theme) { setThemeOverride(theme); if (user) writeThemeOverride(user.uid, theme); }

  const [page, setPage] = useState('Overview');
  const [learnSubject, setLearnSubject] = useState(null);
  const [learnChapter, setLearnChapter] = useState(null);
  const [gameId, setGameId] = useState(null);
  function openChapter(subjectName, chapterId) { setLearnSubject(subjectName); setLearnChapter(chapterId); setPage('Learn'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function openGame(id) { setGameId(id); setPage('Play'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function earnXp(points) { setProgress((previous) => ({ ...previous, ...xpPatch(previous, points) })); }
  function completeChapter(chapterId, event) {
    if (event && !progress.completedChapters.includes(chapterId)) burstFrom(event, { count: 48, power: 11 });
    setProgress((previous) => previous.completedChapters.includes(chapterId)
      ? previous
      : { ...previous, completedChapters: [...previous.completedChapters, chapterId], ...xpPatch(previous, 25) });
  }
  function chapterAttempt(snapshot, correct) { setProgress((previous) => recordChapterAttempt(previous, snapshot, correct)); }
  const [activeLessonId, setActiveLessonId] = useState('foundations');
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceSelected, setPracticeSelected] = useState(null);
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);
  const [practiceFinished, setPracticeFinished] = useState(false);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentIndex, setAssessmentIndex] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [assessmentFinished, setAssessmentFinished] = useState(false);

  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId) || lessons[0];
  const assessmentQuestions = useMemo(
    () => assessmentQuestionIds.map((id) => questions.find((question) => question.id === id)).filter(Boolean),
    []
  );
  const totalAttempts = progress.attempts.length;
  const correctAttempts = progress.attempts.filter((attempt) => attempt.correct).length;
  const accuracy = totalAttempts ? Math.round((correctAttempts / totalAttempts) * 100) : 0;
  const dueRevisionItems = progress.revisionItems.filter((item) => item.dueAt <= Date.now());

  const topicSummary = useMemo(() => {
    const summary = {};
    progress.attempts.forEach((attempt) => {
      if (!summary[attempt.topic]) summary[attempt.topic] = { attempted: 0, incorrect: 0 };
      summary[attempt.topic].attempted += 1;
      if (!attempt.correct) summary[attempt.topic].incorrect += 1;
    });
    return Object.entries(summary).sort((a, b) => b[1].incorrect - a[1].incorrect);
  }, [progress.attempts]);

  const weakestTopic = topicSummary.find(([, data]) => data.incorrect > 0)?.[0];
  const baseCoachMessage = totalAttempts === 0
    ? 'Start with the first lesson, then try a few practice questions. PathshalaX will use your answers to suggest what to revise.'
    : weakestTopic
      ? `Your attempts show more errors in ${weakestTopic.toLowerCase()}. Revisit the linked concept, then try a fresh question.`
      : 'Good foundation so far. Keep practising across different skills so your understanding stays balanced.';
  const coachMessage = personalCoachMessage(profile, { hasAttempts: totalAttempts > 0, weakestTopic, fallback: baseCoachMessage });

  function navigate(nextPage) {
    setPage(nextPage);
    if (nextPage === 'Learn') { setLearnChapter(null); }
    if (nextPage === 'Play') setGameId(null);
    if (nextPage === 'Practice') {
      setPracticeIndex(0);
      setPracticeSelected(null);
      setPracticeSubmitted(false);
      setPracticeFinished(false);
    }
    if (nextPage === 'Assessment') {
      setAssessmentStarted(false);
      setAssessmentIndex(0);
      setAssessmentAnswers({});
      setAssessmentFinished(false);
    }
  }

  function completeLesson(lessonId, event) {
    if (event && !progress.completedLessons.includes(lessonId)) burstFrom(event, { count: 48, power: 11 });
    setProgress((previous) => {
      if (previous.completedLessons.includes(lessonId)) return previous;
      return {
        ...previous,
        completedLessons: [...previous.completedLessons, lessonId],
        ...xpPatch(previous, 25)
      };
    });
  }

  function submitPracticeAnswer(event) {
    if (practiceSelected === null || practiceSubmitted) return;
    const question = questions[practiceIndex];
    if (practiceSelected === question.answer) burstFrom(event, { count: 34, power: 9 });
    setProgress((previous) => recordOneAttempt(previous, question, practiceSelected, 'practice'));
    setShowFullExplanation(false);
    setPracticeSubmitted(true);
  }

  function goToNextPracticeQuestion() {
    if (practiceIndex === questions.length - 1) {
      setPracticeFinished(true);
      return;
    }
    setPracticeIndex((index) => index + 1);
    setPracticeSelected(null);
    setPracticeSubmitted(false);
  }

  function finishAssessment() {
    if (assessmentQuestions.some((question) => !Number.isInteger(assessmentAnswers[question.id]))) return;
    const answers = assessmentQuestions.map((question) => ({ question, selected: assessmentAnswers[question.id] }));
    const answered = answers.filter((item) => Number.isInteger(item.selected));
    const score = answered.filter((item) => item.selected === item.question.answer).length;
    if (Math.round((score / assessmentQuestions.length) * 100) >= 60) rain();
    setProgress((previous) => {
      let updated = { ...previous, assessmentCount: previous.assessmentCount + 1 };
      answered.forEach(({ question, selected }) => {
        updated = recordOneAttempt(updated, question, selected, 'assessment');
      });
      return {
        ...updated,
        ...xpPatch(updated, score * 3),
        bestAssessment: Math.max(previous.bestAssessment ?? 0, Math.round((score / assessmentQuestions.length) * 100))
      };
    });
    setAssessmentFinished(true);
  }

  function markRevisionReviewed(questionId) {
    setProgress((previous) => ({
      ...previous,
      revisionItems: previous.revisionItems.map((item) => item.questionId === questionId
        ? { ...item, dueAt: Date.now() + 24 * 60 * 60 * 1000, reviewedAt: Date.now() }
        : item)
    }));
  }

  function resetProgress() {
    const confirmed = window.confirm('Reset all your PathshalaX progress? This cannot be undone.');
    if (!confirmed) return;
    setProgress({ ...initialProgress, completedLessons: [], attempts: [], revisionItems: [], completedChapters: [], dailyXp: {} });
    setPage('Overview');
  }

  const navItems = [
    { name: 'Overview', icon: 'home' },
    { name: 'Learn', icon: 'learn' },
    { name: 'Play', icon: 'play' },
    { name: 'Practice', icon: 'practice' },
    { name: 'Revision', icon: 'revision' },
    { name: 'Assessment', icon: 'assess' },
    { name: 'My Progress', icon: 'progress' }
  ];

  const lessonPct = Math.round((progress.completedLessons.length / lessons.length) * 100);
  const nextLessonIndex = lessons.findIndex((lesson) => lesson.id === activeLesson.id) + 1;
  const assessmentScore = assessmentQuestions.filter((q) => assessmentAnswers[q.id] === q.answer).length;
  const assessmentPct = assessmentQuestions.length ? Math.round((assessmentScore / assessmentQuestions.length) * 100) : 0;
  const RING = 339.29;

  const authLayout = (content) => (
    <div className="stage">
      <Backdrop />
      <div className="auth">
        <section className="auth-main">
          <div className="auth-card">{content}</div>
          <p className="auth-foot">A little progress every day adds up.</p>
        </section>
        <section className="auth-show">
          <h1>Classes 6–12, one step at a time.</h1>
          <p>Every NCERT chapter with short notes and quizzes, study games that make ideas click, and a revision list that remembers for you.</p>
          <div className="plot-frame tilt"><Parabola tone="light" /></div>
        </section>
      </div>
    </div>
  );

  if (authLoading) {
    return authLayout(
      <>
        <div className="card-brand"><LogoMark /><span>PathshalaX</span></div>
        <h2>Opening your study space</h2>
        <p>Checking your sign-in. This only takes a moment.</p>
        <div className="loadbar"><span /></div>
      </>
    );
  }

  if (!user) {
    return authLayout(
      <>
        <div className="card-brand"><LogoMark /><span>PathshalaX</span></div>
        <h2>Welcome back.</h2>
        <p>Sign in to pick up where you left off. Your progress stays connected to your account.</p>
        <button className="btn btn-google magnetic" onClick={continueWithGoogle} disabled={authBusy}>
          <GoogleG />{authBusy ? 'Connecting…' : 'Continue with Google'}<Icon name="arrow" size={18} className="arr" />
        </button>
        <div className="or"><span>or</span></div>
        <button className="btn btn-primary magnetic" onClick={continueAsGuest} disabled={authBusy}>
          {authBusy ? 'Please wait…' : 'Continue as guest'}
        </button>
        <p className="note">New here? Continue as guest to start learning right away. Guest progress is saved to an anonymous account on this device, and you can link Google later to keep it on every device.</p>
        {authError && <div className="auth-error" role="alert">{authError}</div>}
      </>
    );
  }

  if (!pz.loaded) {
    return authLayout(
      <>
        <div className="card-brand"><LogoMark /><span>PathshalaX</span></div>
        <h2>Setting up your study space</h2>
        <p>Loading your learning profile.</p>
        <div className="loadbar"><span /></div>
        {authError && <div className="auth-error" role="alert">{authError}</div>}
      </>
    );
  }

  if (settingsFor !== user.uid) {
    return authLayout(
      <>
        <div className="card-brand"><LogoMark /><span>PathshalaX</span></div>
        <h2>Setting up your study space</h2>
        <p>Loading your preferences.</p>
        <div className="loadbar"><span /></div>
      </>
    );
  }
  if (!settings || editingSettings) {
    return (
      <Setup
        key={editingSettings ? 'edit' : 'first'}
        mode={settings ? 'edit' : 'first'}
        initial={settings || defaultSettings(user.isAnonymous ? '' : (user.displayName || '').split(' ')[0])}
        onSave={storeSettings}
        onCancel={settings ? () => { setEditingSettings(false); setThemePreview(undefined); } : undefined}
        onPreviewTheme={setThemePreview}
      />
    );
  }
  const studentName = settings.displayName || (user.isAnonymous ? 'Guest' : (user.displayName || 'Student'));
  const mySubjects = subjectsFor(settings.classLevel).filter((s) => settings.subjects.includes(s.name));
  const streak = streakDays(progress.dailyXp, settings.dailyGoal);
  const today = todayXp(progress.dailyXp);
  const goalPct = Math.min(100, Math.round((today / settings.dailyGoal) * 100));

  const activeSurvey = surveyMode || (pz.status === 'none' ? 'first' : null);
  if (activeSurvey) {
    const closeSurvey = () => { setSurveyMode(null); if (activeSurvey === 'edit') setPage('My Progress'); };
    return (
      <SurveyFlow
        key={activeSurvey}
        mode={activeSurvey}
        initialRecord={pz.record}
        syncError={pz.syncError}
        onAutosave={pz.saveDraft}
        onSkip={async () => { await pz.skip(); setSurveyMode(null); }}
        onPause={async (answers, step) => { await pz.pauseDraft(answers, step); setSurveyMode(null); }}
        onSubmit={pz.complete}
        onClose={closeSurvey}
        onSignOut={logOut}
      />
    );
  }

  const surveyIncomplete = pz.status === 'skipped' || pz.status === 'in_progress';

  return (
    <div className="stage">
      <Backdrop />

      <header className="topbar">
        <div className="brand">
          <LogoMark />
          <div><b>PathshalaX</b><small>Class {settings.classLevel} · {mySubjects.length} {mySubjects.length === 1 ? 'subject' : 'subjects'}</small></div>
        </div>
        <div className="topbar-right">
          {profile?.themeSwitchable && <ThemeSwitch value={activeTheme} onChange={chooseTheme} />}
          <span className={`streak-chip ${today >= settings.dailyGoal ? 'lit' : ''}`} title={`Daily goal: ${today}/${settings.dailyGoal} XP today`}>🔥 <b>{streak}</b></span>
          <XpChip xp={progress.xp} />
          <span className="account-label">{studentName}{user.isAnonymous ? ' · Guest' : ''}</span>
          {user.isAnonymous && <button className="chip-btn rip" onClick={continueWithGoogle}><Icon name="link" size={15} />Link Google</button>}
          <button className="chip-btn rip" onClick={logOut}><Icon name="logout" size={15} />Sign out</button>
          <button type="button" className="avatar avatar-btn" onClick={() => setEditingSettings(true)} aria-label="Edit your profile and preferences">{settings.avatar}</button>
        </div>
      </header>

      {authError && (
        <div className="toast" role="alert">
          <span>{authError}</span>
          <button onClick={() => setAuthError('')} aria-label="Dismiss message"><Icon name="close" size={16} /></button>
        </div>
      )}

      <main className="page" key={page}>
        {page === 'Overview' && (
          <>
            {surveyIncomplete && !nudgeHidden && (
              <ProfileNudge status={pz.status} answers={pz.record.answers} onOpen={() => setSurveyMode(pz.status === 'in_progress' ? 'resume' : 'first')} onDismiss={() => setNudgeHidden(true)} />
            )}
            <section className="hero on-board">
              <div className="hero-copy">
                <span className="pill"><span className="live-dot" />{settings.avatar} Hi {studentName} · Class {settings.classLevel}</span>
                <h1>Learning that feels like play.</h1>
                <p>Every chapter of your NCERT books with short notes, worked examples and quizzes — plus games and animations that make ideas click.</p>
                <div className="hero-actions">
                  <button className="btn btn-primary magnetic" onClick={() => navigate('Learn')}>Continue learning<Icon name="arrow" size={18} className="arr" /></button>
                  <button className="btn btn-ghost magnetic" onClick={() => navigate('Play')}>Play a study game</button>
                </div>
              </div>
              <Parabola tone="dark" />
            </section>

            <section className="scoreboard" aria-label="Your numbers">
              <div className="score"><Icon name="bolt" size={22} /><b><Count value={progress.xp} /></b><span>Learning points</span></div>
              <div className="score"><span className="score-emoji" aria-hidden="true">🔥</span><b><Count value={streak} /></b><span>{streak === 1 ? 'Day streak' : 'Days streak'}</span></div>
              <div className="score goal-score"><Icon name="target" size={22} /><b><Count value={today} />/{settings.dailyGoal}</b><span>Today’s goal (XP)</span><div className="bar"><span style={{ width: `${goalPct}%` }} /></div></div>
              <div className="score"><Icon name="revision" size={22} /><b><Count value={dueRevisionItems.length} /></b><span>Revision to do</span></div>
            </section>

            <div className="overview-grid">
              <section className="panel journey-panel">
                <div className="panel-head">
                  <h2>Your subjects</h2>
                  <button className="text-btn" onClick={() => setEditingSettings(true)}>Change subjects<Icon name="arrow" size={16} className="arr" /></button>
                </div>
                <div className="journey">
                  {mySubjects.map((subject) => {
                    const done = subject.chapters.filter((c) => progress.completedChapters.includes(c.id)).length;
                    const next = subject.chapters.find((c) => !progress.completedChapters.includes(c.id));
                    return (
                      <button key={subject.id} className={`journey-row rip ${done === subject.chapters.length ? 'is-done' : ''}`} onClick={() => openChapter(subject.name, null)}>
                        <span className="node subject-node" aria-hidden="true">{subject.icon}</span>
                        <span className="journey-text"><strong>{subject.name}</strong><small>{next ? `Next: ${next.title}` : 'All chapters done'}</small></span>
                        <span className="status">{done}/{subject.chapters.length}</span>
                        <Icon name="arrow" size={18} className="arr" />
                      </button>
                    );
                  })}
                </div>
              </section>

              <aside className="sticky coach tilt">
                <span className="sticky-icon"><Icon name="sparkle" size={22} /></span>
                <h2>Your next step</h2>
                <p>{coachMessage}</p>
                <button className="btn btn-dark magnetic" onClick={() => { if (weakestTopic) { const q = questions.find((item) => item.topic === weakestTopic); if (q) { setActiveLessonId(q.lessonId); navigate('Quadratics'); } else { const item = progress.revisionItems.find((r) => r.snapshot?.topic === weakestTopic); if (item) openChapter(null, item.snapshot.chapterId); else navigate('Learn'); } } else navigate(profile?.startWith === 'practice' ? 'Play' : 'Learn'); }}>
                  {weakestTopic ? `Revisit ${weakestTopic}` : profile?.startWith === 'practice' ? 'Play a study game' : 'Open my chapters'}<Icon name="arrow" size={18} className="arr" />
                </button>
                <ProfilePlan profile={profile} />
                {sessionNudge(profile) && <small>{sessionNudge(profile)}</small>}
                <small>Suggestions are based on your activity and learning profile.</small>
              </aside>
            </div>

            <section className="jump">
              <h2>Jump to</h2>
              <div className="jump-grid">
                {[
                  { icon: 'play', title: 'Study games', text: 'Graphs, lenses, circuits, planets and history.', target: 'Play' },
                  { icon: 'sparkle', title: 'Every chapter', text: 'Notes, examples and quizzes for each subject.', target: 'Learn' },
                  { icon: 'progress', title: 'Smart study insights', text: 'Get guidance from your learning activity.', target: 'My Progress' },
                  { icon: 'revision', title: 'Smart revision', text: 'Bring difficult concepts back into focus.', target: 'Revision' },
                  { icon: 'practice', title: 'Quadratics practice', text: 'A full Class 10 practice set with feedback.', target: 'Practice' }
                ].map((tile) => (
                  <button className="tile tilt rip" key={tile.title} onClick={() => navigate(tile.target)}>
                    <span className="tile-icon"><Icon name={tile.icon} size={24} /></span>
                    <strong>{tile.title}</strong>
                    <small>{tile.text}</small>
                    <Icon name="arrow" size={18} className="arr" />
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {page === 'Learn' && (
          <LearnHub
            settings={settings}
            completed={progress.completedChapters}
            subjectName={learnSubject}
            chapterId={learnChapter}
            onOpen={openChapter}
            onComplete={completeChapter}
            onAttempt={chapterAttempt}
            onOpenSample={() => navigate('Quadratics')}
            onOpenGame={openGame}
          />
        )}

        {page === 'Play' && <PlayHub game={gameId} onOpen={(id) => { setGameId(id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} onXp={earnXp} />}

        {page === 'Quadratics' && (
          <>
            <PageHead title="Quadratic equations, step by step." description="Class 10 Mathematics · five interactive lessons. Complete a lesson when you understand it, not just when you have opened it." action={<button className="chip-btn rip" onClick={() => openChapter('Mathematics', null)}><Icon name="learn" size={15} />All Maths chapters</button>} />
            <div className="learn">
              <aside className="toc panel">
                <div className="toc-head"><strong>Chapter content</strong><span className="count-chip">{progress.completedLessons.length}/{lessons.length} done</span></div>
                <div className="bar"><span style={{ width: `${lessonPct}%` }} /></div>
                {lessons.map((lesson) => {
                  const done = progress.completedLessons.includes(lesson.id);
                  return (
                    <button key={lesson.id} className={`toc-item rip ${activeLessonId === lesson.id ? 'selected' : ''} ${done ? 'is-done' : ''}`} onClick={() => setActiveLessonId(lesson.id)}>
                      <span className="node">{done ? <Icon name="check" size={16} strokeWidth={3} /> : lesson.number}</span>
                      <span className="toc-text"><strong>{lesson.title}</strong><small>{lesson.duration} · {lesson.level}</small></span>
                    </button>
                  );
                })}
                <p className="toc-tip">Read the example, try the checkpoint in your own words, then mark the lesson complete.</p>
              </aside>

              <article className="notebook" key={activeLesson.id}>
                <div className="notebook-top">
                  <span className="lesson-badge">Lesson {activeLesson.number}</span>
                  <span className="lesson-time"><Icon name="clock" size={16} />{activeLesson.duration}</span>
                </div>
                <h2>{activeLesson.title}</h2>
                <p className="goal"><strong>Learning goal</strong>{activeLesson.objective}</p>
                <p className="lead">{activeLesson.intro}</p>

                <h3 className="sub">Key things to remember</h3>
                <ul className="points">
                  {activeLesson.points.map((point, index) => <li key={point} style={{ '--i': index }}>{point}</li>)}
                </ul>

                <h3 className="sub">Learn through an example</h3>
                {activeLesson.examples.map((example, index) => (
                  <div className="chalkboard" key={example.prompt}>
                    <div className="board-label">Worked example {index + 1}</div>
                    <h4>{example.prompt}</h4>
                    <ol>{example.steps.map((step, stepIndex) => <li key={step} style={{ '--i': stepIndex }}>{step}</li>)}</ol>
                    <div className="board-answer"><span>Final answer</span><strong>{example.answer}</strong></div>
                  </div>
                ))}

                <div className="sticky checkpoint">
                  <Icon name="target" size={22} />
                  <div><strong>Before you move on</strong><p>{activeLesson.checkpoint}</p></div>
                </div>

                <div className="notebook-actions">
                  <button className={`btn magnetic ${progress.completedLessons.includes(activeLesson.id) ? 'btn-complete' : 'btn-primary'}`} onClick={(event) => completeLesson(activeLesson.id, event)} disabled={progress.completedLessons.includes(activeLesson.id)}>
                    {progress.completedLessons.includes(activeLesson.id) ? <><Icon name="check" size={18} strokeWidth={3} />Lesson completed</> : 'Mark lesson complete'}
                  </button>
                  {nextLessonIndex < lessons.length && <button className="text-btn" onClick={() => setActiveLessonId(lessons[nextLessonIndex].id)}>Next lesson<Icon name="arrow" size={16} className="arr" /></button>}
                  <button className="text-btn" onClick={() => navigate('Practice')}>Practise this chapter<Icon name="arrow" size={16} className="arr" /></button>
                </div>
              </article>
            </div>
          </>
        )}

        {page === 'Practice' && (
          <>
            <PageHead title="Learn by doing." description="Class 10 Maths · Quadratic equations practice set. Choose an answer, submit it and understand the thinking behind the result. Every chapter in Learn also has its own quiz." />
            {practiceFinished ? (
              <section className="panel done-panel">
                <div className="done-symbol"><Icon name="check" size={44} strokeWidth={3} /></div>
                <h2>Good work. Keep the momentum.</h2>
                <p className="muted">You have reached the end of this practice set. Your attempts and concept-level feedback are saved to your account.</p>
                <div className="actions-row">
                  <button className="btn btn-primary magnetic" onClick={() => { setPracticeIndex(0); setPracticeSelected(null); setPracticeSubmitted(false); setPracticeFinished(false); }}>Practise again</button>
                  <button className="btn btn-soft magnetic" onClick={() => navigate('Revision')}>Review mistakes</button>
                </div>
              </section>
            ) : (
              <div className="practice">
                <section className="panel question" key={practiceIndex}>
                  <div className="q-top"><span className="lesson-badge">{questions[practiceIndex].topic}</span><span className="q-count">Question {practiceIndex + 1} of {questions.length}</span></div>
                  <div className="bar"><span style={{ width: `${((practiceIndex + 1) / questions.length) * 100}%` }} /></div>
                  <h2 className="q-prompt">{questions[practiceIndex].prompt}</h2>
                  <div className="options">
                    {questions[practiceIndex].options.map((option, index) => {
                      let stateClass = practiceSelected === index ? 'chosen' : '';
                      if (practiceSubmitted && index === questions[practiceIndex].answer) stateClass = 'correct-option';
                      else if (practiceSubmitted && practiceSelected === index) stateClass = 'incorrect-option';
                      return (
                        <button key={option} className={`opt rip ${stateClass}`} onClick={() => !practiceSubmitted && setPracticeSelected(index)} disabled={practiceSubmitted}>
                          <span className="opt-letter">{String.fromCharCode(65 + index)}</span>
                          <span className="opt-text">{option}</span>
                          <span className="opt-mark">
                            {practiceSubmitted && index === questions[practiceIndex].answer && <Icon name="check" size={20} strokeWidth={3} />}
                            {practiceSubmitted && practiceSelected === index && index !== questions[practiceIndex].answer && <Icon name="close" size={20} strokeWidth={3} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {practiceSubmitted && (
                    <div className={`feedback ${practiceSelected === questions[practiceIndex].answer ? 'feedback-correct' : 'feedback-incorrect'}`}>
                      <strong>{practiceSelected === questions[practiceIndex].answer ? 'Correct answer' : 'Let’s understand the gap'}</strong>
                      {practiceSelected !== questions[practiceIndex].answer && <p className="diagnosis">{questions[practiceIndex].feedback[practiceSelected] || 'Review the key concept and check each step carefully.'}</p>}
                      {feedbackEncouragement(profile) && practiceSelected !== questions[practiceIndex].answer && <p className="sv-tip">{feedbackEncouragement(profile)}</p>}
                      {profile?.explanationMode === 'hint-first' && practiceSelected !== questions[practiceIndex].answer && !showFullExplanation
                        ? <button type="button" className="text-btn hint-toggle" onClick={() => setShowFullExplanation(true)}>Show the full explanation</button>
                        : <p>{questions[practiceIndex].explanation}</p>}
                    </div>
                  )}
                  <div className="q-actions">
                    {!practiceSubmitted
                      ? <button className="btn btn-primary magnetic" disabled={practiceSelected === null} onClick={submitPracticeAnswer}>Submit answer<Icon name="arrow" size={18} className="arr" /></button>
                      : practiceSelected !== questions[practiceIndex].answer
                        ? <button className="btn btn-primary magnetic" onClick={() => { setPracticeSelected(null); setPracticeSubmitted(false); }}><Icon name="revision" size={18} />Retry this concept</button>
                        : <button className="btn btn-primary magnetic" onClick={goToNextPracticeQuestion}>{practiceIndex === questions.length - 1 ? 'Finish practice' : 'Next question'}<Icon name="arrow" size={18} className="arr" /></button>}
                    <span className="save-note">Your activity is saved automatically.</span>
                  </div>
                </section>
                <aside className="practice-side">
                  <div className="sticky tip tilt">
                    <Icon name="sparkle" size={22} />
                    <h3>{practiceTip(profile)?.title || 'Understand the why.'}</h3>
                    <p>{practiceTip(profile)?.text || 'When an answer is incorrect, PathshalaX shows a possible concept gap and a short explanation. One response is a clue, not a final judgement of your ability.'}</p>
                  </div>
                  <div className="panel side-stats">
                    <h3>Your chapter activity</h3>
                    <div className="side-metric"><b><Count value={totalAttempts} /></b><span>Total attempts</span></div>
                    <div className="side-metric"><b><Count value={accuracy} suffix="%" /></b><span>Overall accuracy</span></div>
                    <button className="text-btn" onClick={() => navigate('My Progress')}>See learning insights<Icon name="arrow" size={16} className="arr" /></button>
                  </div>
                </aside>
              </div>
            )}
          </>
        )}

        {page === 'Revision' && (
          <>
            <PageHead title="Bring it back into focus." description="Questions you miss are collected here, so you can revisit the concept and try again with a clearer understanding." />
            <div className="banner">
              <span className="banner-icon"><Icon name="revision" size={26} /></span>
              <div><strong>{dueRevisionItems.length} {dueRevisionItems.length === 1 ? 'concept' : 'concepts'} ready to revisit</strong><p>When you answer a practice question incorrectly, it appears here. {revisionTip(profile)}</p></div>
            </div>
            {progress.revisionItems.length === 0 ? (
              <section className="panel empty">
                <div className="empty-art"><Icon name="sparkle" size={40} /></div>
                <h2>Your revision list is clear.</h2>
                <p className="muted">Complete a few practice questions. Any concept that needs another look will be collected here automatically.</p>
                <button className="btn btn-primary magnetic" onClick={() => navigate('Practice')}>Start practising<Icon name="arrow" size={18} className="arr" /></button>
              </section>
            ) : (
              <div className="rev-list">
                {progress.revisionItems.map((item, index) => {
                  const question = questions.find((q) => q.id === item.questionId) || (item.snapshot ? { prompt: item.snapshot.prompt, topic: item.snapshot.topic } : null);
                  const lesson = getLessonForQuestion(item.questionId);
                  const isDue = item.dueAt <= Date.now();
                  if (!question) return null;
                  return (
                    <section className="rev-card tilt" key={item.questionId} style={{ '--i': index }}>
                      <div className="rev-top"><span className="lesson-badge">{question.topic}</span><span className={`due ${isDue ? 'is-due' : ''}`}>{isDue ? 'Ready to review' : `Next review ${formatDate(item.dueAt)}`}</span></div>
                      <h3>{question.prompt}</h3>
                      <p className="muted">Added after {item.mistakes} incorrect {item.mistakes === 1 ? 'attempt' : 'attempts'}. Revisit the lesson before trying the question again.</p>
                      <div className="actions-row">
                        <button className="btn btn-soft magnetic" onClick={() => { if (item.snapshot) openChapter(null, item.snapshot.chapterId); else { setActiveLessonId(lesson.id); navigate('Quadratics'); } }}>Revisit lesson<Icon name="arrow" size={18} className="arr" /></button>
                        <button className="text-btn" disabled={!isDue} onClick={() => markRevisionReviewed(item.questionId)}><Icon name="check" size={16} strokeWidth={3} />Mark reviewed for today</button>
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </>
        )}

        {page === 'Assessment' && (
          <>
            <PageHead title="Check what you know." description="Class 10 Maths · Quadratic equations chapter test with no hints during the attempt. Your result is saved to your learning record." />
            {!assessmentStarted ? (
              <section className="panel exam-intro">
                <div className="sheet-stack tilt" aria-hidden="true">
                  <div className="sheet s3" /><div className="sheet s2" />
                  <div className="sheet s1"><small>PathshalaX</small><strong>Chapter<br />assessment</strong><em>{assessmentQuestions.length} questions</em><Icon name="check" size={34} strokeWidth={3} /></div>
                </div>
                <div className="exam-copy">
                  <h2>Ready to check your understanding?</h2>
                  <p className="muted">This assessment contains {assessmentQuestions.length} multiple-choice questions from the full chapter. Your answers are evaluated at the end, and incorrect concepts are added to your revision list.</p>
                  <div className="facts">
                    <span><b>{assessmentQuestions.length}</b>Questions</span>
                    <span><b>MCQ</b>Format</span>
                    <span><b>{progress.bestAssessment === null ? '—' : `${progress.bestAssessment}%`}</b>Best score</span>
                  </div>
                  <button className="btn btn-primary magnetic" onClick={() => { setAssessmentStarted(true); setAssessmentIndex(0); setAssessmentAnswers({}); setAssessmentFinished(false); }}>Start assessment<Icon name="arrow" size={18} className="arr" /></button>
                </div>
              </section>
            ) : assessmentFinished ? (
              <section className="panel result">
                <div className="ring">
                  <svg viewBox="0 0 120 120" aria-hidden="true">
                    <circle className="track" cx="60" cy="60" r="54" />
                    <circle className="val" cx="60" cy="60" r="54" style={{ strokeDashoffset: RING * (1 - assessmentPct / 100) }} />
                  </svg>
                  <div className="ring-label"><b><Count value={assessmentScore} duration={1100} /></b><span>of {assessmentQuestions.length}</span></div>
                </div>
                <h2>{assessmentPct}% chapter score</h2>
                <p className="muted">Your result has been saved. Review the questions below to see which concepts need more attention.</p>
                <div className="review">
                  {assessmentQuestions.map((question, index) => {
                    const selected = assessmentAnswers[question.id];
                    const correct = selected === question.answer;
                    return (
                      <div className="review-row" key={question.id} style={{ '--i': index }}>
                        <span className={`mark ${correct ? 'right' : 'wrong'}`}><Icon name={correct ? 'check' : 'close'} size={16} strokeWidth={3} /></span>
                        <div><strong>Question {index + 1}: {question.topic}</strong><small>{correct ? 'Correct' : `Correct answer: ${question.options[question.answer]}`}</small></div>
                      </div>
                    );
                  })}
                </div>
                <div className="actions-row center">
                  <button className="btn btn-primary magnetic" onClick={() => { setAssessmentStarted(false); setAssessmentFinished(false); setAssessmentAnswers({}); setAssessmentIndex(0); }}>Retake assessment</button>
                  <button className="btn btn-soft magnetic" onClick={() => navigate('Revision')}>Open revision list</button>
                </div>
              </section>
            ) : (
              <section className="panel question" key={assessmentIndex}>
                <div className="q-top"><span className="lesson-badge">Chapter assessment</span><span className="q-count">Question {assessmentIndex + 1} of {assessmentQuestions.length}</span></div>
                <div className="bar"><span style={{ width: `${((assessmentIndex + 1) / assessmentQuestions.length) * 100}%` }} /></div>
                <h2 className="q-prompt">{assessmentQuestions[assessmentIndex].prompt}</h2>
                <div className="options">
                  {assessmentQuestions[assessmentIndex].options.map((option, index) => {
                    const chosen = assessmentAnswers[assessmentQuestions[assessmentIndex].id] === index;
                    return (
                      <button key={option} className={`opt rip ${chosen ? 'chosen' : ''}`} onClick={() => setAssessmentAnswers((previous) => ({ ...previous, [assessmentQuestions[assessmentIndex].id]: index }))}>
                        <span className="opt-letter">{String.fromCharCode(65 + index)}</span>
                        <span className="opt-text">{option}</span>
                        <span className="opt-mark">{chosen && <Icon name="check" size={20} strokeWidth={3} />}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="q-actions spread">
                  <span className="save-note">{Object.keys(assessmentAnswers).length} of {assessmentQuestions.length} answered</span>
                  <div className="actions-row">
                    {assessmentIndex > 0 && <button className="btn btn-soft magnetic" onClick={() => setAssessmentIndex((index) => index - 1)}>Previous</button>}
                    {assessmentIndex < assessmentQuestions.length - 1
                      ? <button className="btn btn-primary magnetic" onClick={() => setAssessmentIndex((index) => index + 1)}>Next question<Icon name="arrow" size={18} className="arr" /></button>
                      : <button className="btn btn-primary magnetic" onClick={finishAssessment} disabled={Object.keys(assessmentAnswers).length !== assessmentQuestions.length}>Submit assessment<Icon name="check" size={18} strokeWidth={3} /></button>}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {page === 'My Progress' && (
          <>
            <PageHead title="Progress, not pressure." description="Your activity is calculated from lesson completions and question attempts saved to your account." action={<button className="chip-btn rip" onClick={resetProgress}><Icon name="trash" size={15} />Reset progress</button>} />
            <section className="scoreboard" aria-label="Your numbers">
              <div className="score"><Icon name="bolt" size={22} /><b><Count value={progress.xp} /></b><span>Learning points</span></div>
              <div className="score"><Icon name="check" size={22} strokeWidth={3} /><b><Count value={correctAttempts} /></b><span>Correct answers</span></div>
              <div className="score"><Icon name="target" size={22} /><b><Count value={accuracy} suffix="%" /></b><span>Accuracy</span></div>
              <div className="score"><Icon name="trophy" size={22} /><b><Count value={progress.assessmentCount} /></b><span>Assessments taken</span></div>
            </section>
            <div className="progress-grid">
              <section className="panel">
                <div className="panel-head"><h2>Quadratics skill map</h2><span className="count-chip">{progress.completedLessons.length}/{lessons.length} lessons</span></div>
                {lessons.map((lesson, index) => {
                  const related = progress.attempts.filter((attempt) => questions.find((q) => q.id === attempt.questionId)?.lessonId === lesson.id);
                  const right = related.filter((attempt) => attempt.correct).length;
                  const pct = related.length ? Math.round((right / related.length) * 100) : 0;
                  const completed = progress.completedLessons.includes(lesson.id);
                  return (
                    <div className="skill" key={lesson.id}>
                      <div className="skill-top"><div><strong>{lesson.shortTitle}</strong><small>{completed ? 'Lesson completed' : 'Lesson not yet completed'} · {related.length} question attempts</small></div><b>{related.length ? `${pct}%` : '—'}</b></div>
                      <div className="bar"><span style={{ width: `${pct}%`, '--d': `${index * 110}ms` }} /></div>
                    </div>
                  );
                })}
              </section>
              <section className="panel insights">
                <h2>What your activity says.</h2>
                <p>{coachMessage}</p>
                {topicSummary.length === 0
                  ? <div className="insight-empty">Complete practice questions to see topic-level insights here.</div>
                  : <div className="topics">{topicSummary.map(([topic, data]) => (
                    <div className="topic-row" key={topic}>
                      <div><strong>{topic}</strong><small>{data.attempted} attempts · {data.incorrect} incorrect</small></div>
                      <span className={data.incorrect > 0 ? 'tag warn' : 'tag good'}>{data.incorrect > 0 ? 'Revisit' : 'On track'}</span>
                    </div>
                  ))}</div>}
                <div className="best"><span>Best assessment score</span><b>{progress.bestAssessment === null ? '—' : <Count value={progress.bestAssessment} suffix="%" />}</b></div>
              </section>
            </div>
            <section className="panel prefs-card">
              <div className="panel-head">
                <h2>{settings.avatar} {studentName}</h2>
                <button type="button" className="chip-btn rip" onClick={() => setEditingSettings(true)}><Icon name="practice" size={15} />Edit profile and preferences</button>
              </div>
              <ul className="sv-chips">
                <li>Class {settings.classLevel}</li>
                <li>Daily goal: {settings.dailyGoal} XP</li>
                <li>Theme: {settings.theme ? settings.theme[0].toUpperCase() + settings.theme.slice(1) : 'From learning profile'}</li>
                <li>🔥 {streak}-day streak</li>
              </ul>
              <div className="subject-progress">
                {mySubjects.map((subject) => {
                  const done = subject.chapters.filter((c) => progress.completedChapters.includes(c.id)).length;
                  const pct = Math.round((done / subject.chapters.length) * 100);
                  return (
                    <button type="button" key={subject.id} className="skill subject-skill" onClick={() => openChapter(subject.name, null)}>
                      <div className="skill-top"><div><strong>{subject.icon} {subject.name}</strong><small>{done} of {subject.chapters.length} chapters completed</small></div><b>{pct}%</b></div>
                      <div className="bar"><span style={{ width: `${pct}%` }} /></div>
                    </button>
                  );
                })}
              </div>
            </section>
            <ProfileCard status={pz.status} profile={profile} onOpen={() => setSurveyMode(pz.status === 'completed' ? 'edit' : pz.status === 'in_progress' ? 'resume' : 'first')} />
            <section className="panel history">
              <div className="panel-head"><h2>Your learning history</h2></div>
              {progress.attempts.length === 0
                ? <p className="muted">Your question attempts will appear here after you start practising.</p>
                : [...progress.attempts].slice(-8).reverse().map((attempt, index) => {
                  const question = questions.find((q) => q.id === attempt.questionId);
                  return (
                    <div className="history-row" key={attempt.id} style={{ '--i': index }}>
                      <span className={`mark ${attempt.correct ? 'right' : 'wrong'}`}><Icon name={attempt.correct ? 'check' : 'close'} size={16} strokeWidth={3} /></span>
                      <div><strong>{question?.topic || attempt.topic}</strong><small>{attempt.source === 'assessment' ? 'Assessment' : attempt.source === 'chapter' ? 'Chapter quiz' : 'Practice'} · {formatDate(attempt.createdAt)}</small></div>
                      <span className={`tag ${attempt.correct ? 'good' : 'warn'}`}>{attempt.correct ? 'Correct' : 'Review needed'}</span>
                    </div>
                  );
                })}
            </section>
          </>
        )}
      </main>

      <Dock items={navItems} page={page === 'Quadratics' ? 'Learn' : page} onNavigate={navigate} dueCount={dueRevisionItems.length} />
    </div>
  );
}

export default App;
