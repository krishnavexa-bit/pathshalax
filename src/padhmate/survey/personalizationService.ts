// @ts-nocheck -- ported from the original PADHMATE JavaScript source.
// Reads and writes the student's learning profile in Lovable Cloud (learning_profiles, owner-only).
// A per-account copy is kept in localStorage so a flaky connection never loses a student's answers.
import { loadLearningProfile, saveLearningProfile } from '../cloud';
import { answersToDocument, documentToAnswers } from './profile';
import { emptyAnswers } from './surveyConfig';

const cacheKey = (uid) => `padhmate-personalization-v1:${uid}`;
// Survey answers of a guest who is moving to a Google account in this browser.
const CARRY_KEY = 'padhmate-personalization-carry';
const STATUSES = ['completed', 'skipped', 'in_progress'];

export const emptyRecord = () => ({ status: 'none', currentStep: 0, answers: emptyAnswers() });

function parseRecord(raw) {
  try {
    const saved = JSON.parse(raw || 'null');
    if (saved && STATUSES.includes(saved.status)) {
      return { status: saved.status, currentStep: saved.currentStep || 0, answers: { ...emptyAnswers(), ...saved.answers } };
    }
  } catch { /* ignore a corrupt cache */ }
  return null;
}
function readCache(uid) {
  try { return parseRecord(localStorage.getItem(cacheKey(uid))); } catch { return null; }
}
function writeCache(uid, record) {
  try { localStorage.setItem(cacheKey(uid), JSON.stringify(record)); } catch { /* storage full or blocked */ }
}
function takeCarry() {
  try {
    const record = parseRecord(localStorage.getItem(CARRY_KEY));
    localStorage.removeItem(CARRY_KEY);
    return record;
  } catch { return null; }
}

export function clearCachedPersonalization(uid) {
  try { localStorage.removeItem(cacheKey(uid)); } catch { /* ignore */ }
}

/** Keeps a guest's survey answers so they follow the student into the Google account they sign in with next. */
export function stashGuestPersonalization(uid) {
  try {
    const raw = localStorage.getItem(cacheKey(uid));
    if (raw) localStorage.setItem(CARRY_KEY, raw);
  } catch { /* ignore */ }
}

/** Resolves to { record, source: 'cloud' | 'cache' | 'none', error? }. Never throws. */
export async function loadPersonalization(uid) {
  const cached = readCache(uid);
  try {
    const row = await loadLearningProfile(uid);
    if (row) {
      takeCarry();
      const status = STATUSES.includes(row.status) ? row.status : 'in_progress';
      const record = { status, currentStep: Number(row.current_step) || 0, answers: documentToAnswers(row.document) };
      writeCache(uid, record);
      return { record, source: 'cloud' };
    }
    // Nothing in the cloud. If this browser holds unsynced answers (or a guest's answers), use them.
    const local = cached || takeCarry();
    return local ? { record: local, source: 'cache', unsynced: true } : { record: emptyRecord(), source: 'none' };
  } catch (error) {
    console.error('Could not load the PADHMATE learning profile:', error);
    return { record: cached || emptyRecord(), source: cached ? 'cache' : 'none', error };
  }
}

/** Saves a record. The local copy is written first; the promise rejects if the cloud write fails. */
export async function savePersonalization(uid, record) {
  writeCache(uid, record);
  const document = answersToDocument(record.answers, { status: record.status, currentStep: record.currentStep });
  await saveLearningProfile(uid, { status: record.status, current_step: record.currentStep || 0, document });
}
