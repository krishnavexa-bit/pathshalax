// @ts-nocheck -- ported as-is from the original PADHMATE JavaScript source.
// Turns survey answers into (1) the stored profile document and (2) a derived learner profile
// that the rest of PADHMATE reads to adapt itself.
import { QUESTIONS, SURVEY_VERSION, emptyAnswers, normaliseAnswers, questionByKey } from './surveyConfig';

/* ---------- answers <-> stored profile document ---------- */

function setPath(target, path, value) {
  let node = target;
  path.slice(0, -1).forEach((part) => { node[part] = node[part] || {}; node = node[part]; });
  node[path[path.length - 1]] = value;
}
function getPath(source, path) {
  return path.reduce((node, part) => (node == null ? undefined : node[part]), source);
}

/** Structured, human-readable document: learning_profiles.document. */
export function answersToDocument(answers, { status, currentStep = 0 } = {}) {
  const clean = normaliseAnswers(answers);
  const doc = { version: SURVEY_VERSION, status, currentStep };
  QUESTIONS.forEach((q) => {
    const value = clean[q.key];
    setPath(doc, q.path, q.type === 'multi' ? [...(value || [])] : (value ?? (q.type === 'text' ? '' : null)));
  });
  doc.academicProfile.otherSubject = clean.otherSubject || '';
  doc.academicProfile.confidentInAllSubjects = Boolean(clean.confidentAll);
  doc.derivedProfile = deriveProfile(clean);
  return doc;
}

/** Rebuilds the flat answers object from a stored document. Missing fields fall back to empty answers. */
export function documentToAnswers(doc) {
  const answers = emptyAnswers();
  if (!doc || typeof doc !== 'object') return answers;
  QUESTIONS.forEach((q) => {
    const value = getPath(doc, q.path);
    if (q.type === 'multi') answers[q.key] = Array.isArray(value) ? value.filter((v) => typeof v === 'string') : [];
    else if (q.type === 'text') answers[q.key] = typeof value === 'string' ? value : '';
    else answers[q.key] = typeof value === 'string' && q.options.includes(value) ? value : null;
  });
  answers.otherSubject = typeof doc.academicProfile?.otherSubject === 'string' ? doc.academicProfile.otherSubject : '';
  answers.confidentAll = Boolean(doc.academicProfile?.confidentInAllSubjects);
  return normaliseAnswers(answers);
}

/* ---------- derived learner profile ---------- */

// Codes are listed in the same order as the options in surveyConfig.js.
const CODES = {
  learningStyle: ['visual', 'reading', 'interactive', 'practice', 'stepwise', 'mixed'],
  sessionLength: [15, 25, 45, 90, null],
  challenge: ['consistency', 'distraction', 'understanding', 'memory', 'planning', 'exam-stress', 'getting-started'],
  theme: ['dark', 'light', 'pastel', 'colourful', 'switch'],
  firstApproach: ['understand-first', 'formula-first', 'break-down', 'intuitive', 'example-first'],
  whenStuck: ['try-another', 'review-concept', 'hint-or-example', 'ask-someone', 'return-later'],
  mistakeReaction: ['self-correct', 'study-solution', 'memorise', 'frustrated', 'ask-someone'],
  helpPreference: ['hint', 'steps', 'worked', 'example', 'concept'],
  confidence: ['very-high', 'moderate', 'familiar-only', 'needs-guidance', 'varies'],
  retention: ['practice', 'notes', 'revision', 'teach-back', 'visual'],
  motivation: ['progress', 'marks', 'streaks', 'mastery', 'challenges']
};

function code(key, answers) {
  const index = questionByKey[key].options.indexOf(answers[key]);
  return index === -1 ? null : CODES[key][index];
}

export function deriveProfile(rawAnswers) {
  const a = normaliseAnswers(rawAnswers);
  const themeChoice = code('theme', a);
  const minutes = code('sessionLength', a);
  const helpStyle = code('helpPreference', a);
  const confidence = code('confidence', a);
  const reaction = code('mistakeReaction', a);
  const challenge = code('challenge', a);
  const learningStyle = code('learningStyle', a);

  const needsEncouragement = reaction === 'frustrated' || challenge === 'exam-stress' || confidence === 'needs-guidance';
  let supportLevel = 'medium';
  if (confidence === 'needs-guidance' || reaction === 'frustrated') supportLevel = 'high';
  else if (confidence === 'very-high' && reaction !== 'memorise') supportLevel = 'low';

  return {
    class: a.class,
    subjects: a.subjects,
    weakSubjects: a.weakSubjects,
    confidentInAllSubjects: a.confidentAll,
    theme: themeChoice === 'switch' ? 'light' : (themeChoice || 'light'),
    themeSwitchable: themeChoice === 'switch',
    learningStyle,
    sessionMinutes: minutes || 25,
    sessionLengthFlexible: minutes === null && Boolean(a.sessionLength),
    challenge,
    firstApproach: code('firstApproach', a),
    stuckStrategy: code('whenStuck', a),
    mistakeReaction: reaction,
    helpStyle,
    explanationMode: helpStyle === 'hint' ? 'hint-first' : 'full',
    independentConfidence: confidence,
    retentionStrategy: code('retention', a),
    motivation: code('motivation', a),
    needsEncouragement,
    supportLevel,
    mathsIsWeak: a.weakSubjects.includes('Mathematics'),
    startWith: learningStyle === 'practice' ? 'practice' : 'learn'
  };
}

/* ---------- themes ---------- */

export const THEMES = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'pastel', label: 'Pastel' },
  { id: 'colourful', label: 'Colourful' }
];
const THEME_KEY = 'padhmate-theme';
const THEME_OVERRIDE_KEY = 'padhmate-theme-override';

export function applyTheme(theme) {
  const id = THEMES.some((t) => t.id === theme) ? theme : 'light';
  if (typeof document !== 'undefined') document.documentElement.dataset.theme = id;
  try { localStorage.setItem(THEME_KEY, id); } catch { /* storage unavailable */ }
}
export function applyStoredTheme() {
  try { applyTheme(localStorage.getItem(THEME_KEY) || 'light'); } catch { applyTheme('light'); }
}
export function readThemeOverride(uid) {
  try { return JSON.parse(localStorage.getItem(THEME_OVERRIDE_KEY) || '{}')[uid] || null; } catch { return null; }
}
export function writeThemeOverride(uid, theme) {
  try {
    const all = JSON.parse(localStorage.getItem(THEME_OVERRIDE_KEY) || '{}');
    all[uid] = theme;
    localStorage.setItem(THEME_OVERRIDE_KEY, JSON.stringify(all));
  } catch { /* storage unavailable */ }
}
/** The theme a student should see: their survey choice, or their own pick when they chose "let me switch". */
export function resolveTheme(derived, override) {
  if (!derived) return 'light';
  if (derived.themeSwitchable) return THEMES.some((t) => t.id === override) ? override : derived.theme;
  return derived.theme;
}

/* ---------- personalised wording used across the dashboard ---------- */

const STYLE_START = {
  visual: 'Open the first lesson and study the worked example on the chalkboard. Seeing the steps drawn out will anchor the idea.',
  reading: 'Start with the first lesson. Read the explanation slowly, then restate the key points in your own words.',
  interactive: 'Start with the first lesson, then play with the live parabola on this page to see how the curve reacts.',
  practice: 'Jump straight into a few practice questions. Each wrong answer shows you exactly which idea to revisit.',
  stepwise: 'Start with the first lesson and follow each numbered step in order. Finish one step before the next.',
  mixed: 'Start with the first lesson, then try a few practice questions. PADHMATE will use your answers to suggest what to revise.'
};

export function coachMessage(profile, { hasAttempts, weakestTopic, fallback }) {
  if (!profile) return fallback;
  if (!hasAttempts) return STYLE_START[profile.learningStyle] || fallback;
  if (!weakestTopic) {
    if (profile.motivation === 'marks') return 'Good foundation so far. Try the chapter assessment to see how this would look as a score.';
    if (profile.motivation === 'challenges') return 'Strong start. Raise the stakes with the chapter assessment and try to beat your best score.';
    return fallback;
  }
  const topic = weakestTopic.toLowerCase();
  switch (profile.helpStyle) {
    case 'hint': return `${topic[0].toUpperCase()}${topic.slice(1)} is slipping a little. Try one fresh question first, using only the small hint you get after a miss.`;
    case 'example': return `${topic[0].toUpperCase()}${topic.slice(1)} needs another look. Study the worked example in the lesson first, then try a similar question.`;
    case 'concept': return `${topic[0].toUpperCase()}${topic.slice(1)} shows more errors. Revisit the idea behind it before trying more questions.`;
    default: return `Your attempts show more errors in ${topic}. Revisit the linked concept, then try a fresh question.`;
  }
}

export function planChips(profile) {
  if (!profile) return [];
  const help = { hint: 'Small hints', steps: 'Step-by-step help', worked: 'Full worked solutions', example: 'Similar examples first', concept: 'Concept explanations' };
  const chips = [{ label: 'Study sessions', value: profile.sessionLengthFlexible ? 'Flexible' : `${profile.sessionMinutes} min` }];
  if (help[profile.helpStyle]) chips.push({ label: 'When stuck', value: help[profile.helpStyle] });
  return chips;
}

export function practiceTip(profile) {
  if (!profile) return null;
  if (profile.explanationMode === 'hint-first') return { title: 'Hints first, then the full answer.', text: 'After a miss you will see a small hint. Try again on your own, and open the full explanation only when you want it.' };
  if (profile.helpStyle === 'example') return { title: 'Learn from the worked example.', text: 'If a question stumps you, open the lesson’s worked example, then come back. Seeing one done makes the next one easier.' };
  if (profile.retentionStrategy === 'teach-back') return { title: 'Teach it back.', text: 'After each question, explain the idea out loud in two sentences. If you can teach it, you own it.' };
  if (profile.retentionStrategy === 'notes') return { title: 'Make a note of it.', text: 'After each question, write the key idea in your own words. Your notes will make revision much faster.' };
  return null;
}

export const feedbackEncouragement = (profile) =>
  profile?.needsEncouragement ? 'A wrong answer is useful information, not a verdict. Take a breath and try the next step.' : '';

export function revisionTip(profile) {
  if (!profile) return '';
  switch (profile.retentionStrategy) {
    case 'teach-back': return 'Your tip: explain each concept aloud to someone before retrying the question.';
    case 'notes': return 'Your tip: write the concept in your own words before you retry.';
    case 'visual': return 'Your tip: sketch a quick diagram or graph of the concept before you retry.';
    case 'revision': return 'Your tip: come back to these concepts a few times this week. Repetition is what makes it stick for you.';
    case 'practice': return 'Your tip: retry with a fresh question straight away. You learn best by applying it.';
    default: return '';
  }
}

export function sessionNudge(profile) {
  if (!profile) return '';
  if (profile.sessionLengthFlexible) return '';
  return `Your sessions work best at about ${profile.sessionMinutes} minutes. Take a short break when you reach that.`;
}

/** Plain-language summary used on the success screen and the profile card. */
export function profileHighlights(profile) {
  if (!profile) return [];
  const styleLabel = {
    visual: 'Visual learner', reading: 'Learns by reading', interactive: 'Learns by doing and watching',
    practice: 'Learns through practice', stepwise: 'Prefers step-by-step teaching', mixed: 'Learns from a mix of methods'
  };
  const approachLabel = {
    'understand-first': 'Understands the question first', 'formula-first': 'Reaches for a method quickly',
    'break-down': 'Breaks problems into parts', intuitive: 'Tries an intuitive attempt first', 'example-first': 'Likes to see an example first'
  };
  const motivationLabel = {
    progress: 'Motivated by progress', marks: 'Motivated by marks', streaks: 'Motivated by goals and streaks',
    mastery: 'Motivated by mastering hard ideas', challenges: 'Motivated by challenges and rewards'
  };
  return [
    styleLabel[profile.learningStyle],
    approachLabel[profile.firstApproach],
    ...planChips(profile).map((c) => `${c.label}: ${c.value}`),
    motivationLabel[profile.motivation]
  ].filter(Boolean);
}
