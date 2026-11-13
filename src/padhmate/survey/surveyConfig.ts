// @ts-nocheck -- ported as-is from the original PathshalaX JavaScript source.
// PathshalaX Student Personalization Survey: question model.
// Every question declares where its answer lives in the stored profile document (`path`),
// so the UI, validation, review screen and persistence all read from this one list.

export const SURVEY_VERSION = 1;
export const OTHER_SUBJECT = 'Other';
export const CONFIDENT_ALL = '__confident_all__';

export const PARTS = [
  { id: 'academic', number: 1, title: 'Your academic profile', blurb: 'Where you are in school right now.' },
  { id: 'preferences', number: 2, title: 'How you like to learn', blurb: 'Your study habits and the look you enjoy.' },
  {
    id: 'thinking',
    number: 3,
    title: 'Understanding how you think',
    blurb: 'There are no right or wrong answers here. This is how PathshalaX learns your natural problem-solving style.'
  }
];

export const CLASS_OPTIONS = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

export const SUBJECT_OPTIONS = [
  'Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 'Social Science',
  'History', 'Geography', 'Political Science', 'Economics', 'Computer Science', 'Accountancy',
  'Business Studies', OTHER_SUBJECT
];

export const THEME_OPTIONS = {
  dark: 'Dark, minimal and modern',
  light: 'Light, clean and simple',
  pastel: 'Soft pastel colours',
  colourful: 'Colourful and energetic',
  switch: 'Let me switch between themes'
};

// `key` is the answer key in the flat answers object. `path` is the location inside the stored profile document.
export const QUESTIONS = [
  {
    key: 'class', number: 1, part: 'academic', type: 'single', required: true,
    path: ['academicProfile', 'class'],
    title: 'Which class are you currently studying in?',
    options: CLASS_OPTIONS,
    layout: 'grid'
  },
  {
    key: 'subjects', number: 2, part: 'academic', type: 'multi', required: true,
    path: ['academicProfile', 'subjects'],
    title: 'Which subjects have you opted for?',
    hint: 'Select all that apply.',
    options: SUBJECT_OPTIONS,
    layout: 'grid'
  },
  {
    key: 'weakSubjects', number: 3, part: 'academic', type: 'multi', required: false,
    path: ['academicProfile', 'weakSubjects'],
    title: 'Which subjects do you find difficult or feel less confident in?',
    hint: 'Choose any that apply. If you feel confident in everything, pick that option. You can also skip this.',
    dynamicOptions: true,
    layout: 'grid'
  },
  {
    key: 'learningStyle', number: 4, part: 'preferences', type: 'single', required: true,
    path: ['learningPreferences', 'learningStyle'],
    title: 'How do you understand a new topic best?',
    options: [
      'Visuals, diagrams and examples',
      'Reading clear explanations',
      'Videos and interactive lessons',
      'Practice questions and quizzes',
      'Step-by-step teaching',
      'A mix of all these'
    ]
  },
  {
    key: 'sessionLength', number: 5, part: 'preferences', type: 'single', required: true,
    path: ['learningPreferences', 'studySessionLength'],
    title: 'What’s your ideal study session length?',
    options: ['10–15 minutes', '25–30 minutes', '45–60 minutes', '90 minutes or more', 'It depends on the subject']
  },
  {
    key: 'challenge', number: 6, part: 'preferences', type: 'single', required: true,
    path: ['learningPreferences', 'studyChallenge'],
    title: 'What makes studying difficult for you?',
    options: [
      'Staying consistent', 'Getting distracted', 'Understanding difficult topics', 'Remembering what I studied',
      'Managing time and planning', 'Exam stress', 'Getting started'
    ]
  },
  {
    key: 'theme', number: 7, part: 'preferences', type: 'single', required: true,
    path: ['learningPreferences', 'themePreference'],
    title: 'Which website appearance do you prefer?',
    hint: 'Pick one and the page will preview it right away.',
    options: Object.values(THEME_OPTIONS)
  },
  {
    key: 'firstApproach', number: 8, part: 'thinking', type: 'single', required: true,
    path: ['problemSolving', 'firstApproach'],
    title: 'When you see a difficult question for the first time, what do you usually do?',
    options: [
      'I try to understand what the question is asking first.',
      'I immediately look for a formula or familiar method.',
      'I break the question into smaller parts.',
      'I try solving it intuitively before using a method.',
      'I feel confused and need an example first.'
    ]
  },
  {
    key: 'whenStuck', number: 9, part: 'thinking', type: 'single', required: true,
    path: ['problemSolving', 'whenStuck'],
    title: 'What do you do when you’re stuck halfway through a problem?',
    options: [
      'I try another method or approach.',
      'I go back and review the concept.',
      'I look at a hint or example.',
      'I ask someone to explain it.',
      'I leave it and return later.'
    ]
  },
  {
    key: 'mistakeReaction', number: 10, part: 'thinking', type: 'single', required: true,
    path: ['problemSolving', 'mistakeReaction'],
    title: 'When you get an answer wrong, how do you usually react?',
    options: [
      'I find where I went wrong and try again.',
      'I check the correct solution and understand it.',
      'I memorise the correct method.',
      'I get frustrated and move on.',
      'I ask someone to explain my mistake.'
    ]
  },
  {
    key: 'helpPreference', number: 11, part: 'thinking', type: 'single', required: true,
    path: ['problemSolving', 'helpPreference'],
    title: 'What kind of help do you prefer when you can’t solve something?',
    options: [
      'A small hint, then I solve it myself.',
      'Step-by-step guidance.',
      'A complete worked-out solution.',
      'A similar example first.',
      'An explanation of the underlying concept.'
    ]
  },
  {
    key: 'confidence', number: 12, part: 'thinking', type: 'single', required: true,
    path: ['problemSolving', 'independentConfidence'],
    title: 'How confident are you when solving questions without help?',
    options: [
      'Very confident.',
      'Somewhat confident.',
      'Confident only in familiar topics.',
      'I often need guidance.',
      'It depends heavily on the subject.'
    ]
  },
  {
    key: 'retention', number: 13, part: 'thinking', type: 'single', required: true,
    path: ['retention', 'memoryStrategy'],
    title: 'What helps you remember a concept for a longer time?',
    options: [
      'Practice questions and applying concepts.',
      'Writing notes in my own words.',
      'Repeated revision.',
      'Teaching or explaining it to someone.',
      'Visualising it with diagrams and examples.'
    ]
  },
  {
    key: 'motivation', number: 14, part: 'thinking', type: 'single', required: true,
    path: ['motivation', 'primaryMotivation'],
    title: 'What motivates you to keep learning?',
    options: [
      'Seeing my progress and improvement.',
      'Achieving good marks.',
      'Completing goals and maintaining streaks.',
      'Understanding something I once found difficult.',
      'Friendly challenges and rewards.'
    ]
  },
  {
    key: 'notes', number: 15, part: 'thinking', type: 'text', required: false,
    path: ['additionalNotes'],
    title: 'Is there anything else PathshalaX should know about your learning habits?',
    hint: 'Optional.',
    placeholder: 'Tell us anything about how you study, what frustrates you, or what helps you learn...',
    maxLength: 600
  }
];

export const TOTAL_QUESTIONS = QUESTIONS.length;
export const questionByKey = Object.fromEntries(QUESTIONS.map((q) => [q.key, q]));

export const emptyAnswers = () => ({
  class: null,
  subjects: [],
  otherSubject: '',
  weakSubjects: [],
  confidentAll: false,
  learningStyle: null,
  sessionLength: null,
  challenge: null,
  theme: null,
  firstApproach: null,
  whenStuck: null,
  mistakeReaction: null,
  helpPreference: null,
  confidence: null,
  retention: null,
  motivation: null,
  notes: ''
});

/** Options for a question. Question 3 mirrors whatever the student picked in question 2. */
export function optionsFor(question, answers) {
  if (!question.dynamicOptions) return question.options;
  return (answers.subjects || []).filter(Boolean);
}

/** The label shown for a subject (so "Other" shows what the student typed). */
export function subjectLabel(subject, answers) {
  if (subject === OTHER_SUBJECT && answers.otherSubject?.trim()) return `Other: ${answers.otherSubject.trim()}`;
  return subject;
}

/** Returns an error message for an unanswered or invalid question, or '' when it is fine. */
export function validateQuestion(question, answers) {
  const value = answers[question.key];
  if (question.type === 'single' && question.required && !value) return 'Please choose one option to continue.';
  if (question.type === 'multi' && question.required && (!Array.isArray(value) || value.length === 0)) {
    return 'Please select at least one subject to continue.';
  }
  if (question.key === 'subjects' && value?.includes(OTHER_SUBJECT) && !answers.otherSubject?.trim()) {
    return 'You chose “Other”. Please type the subject name.';
  }
  if (question.type === 'text' && (value || '').length > question.maxLength) {
    return `Please keep this under ${question.maxLength} characters.`;
  }
  return '';
}

export const isAnswered = (question, answers) => {
  const value = answers[question.key];
  if (question.key === 'weakSubjects') return answers.confidentAll || (value || []).length > 0;
  if (question.type === 'multi') return Array.isArray(value) && value.length > 0;
  if (question.type === 'text') return Boolean((value || '').trim());
  return Boolean(value);
};

export const firstInvalidIndex = (answers) => QUESTIONS.findIndex((q) => validateQuestion(q, answers));

/** Keeps dependent answers consistent after a change (for example, dropping a weak subject that was deselected in Q2). */
export function normaliseAnswers(answers) {
  const next = { ...answers };
  next.weakSubjects = (next.weakSubjects || []).filter((s) => (next.subjects || []).includes(s));
  if (next.weakSubjects.length) next.confidentAll = false;
  if (!(next.subjects || []).includes(OTHER_SUBJECT)) next.otherSubject = '';
  return next;
}
