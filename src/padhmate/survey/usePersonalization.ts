// @ts-nocheck -- ported as-is from the original PADHMATE JavaScript source.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { clearCachedPersonalization, emptyRecord, loadPersonalization, savePersonalization } from './personalizationService';
import { deriveProfile } from './profile';

const AUTOSAVE_DELAY = 700;

/**
 * Owns the student's personalization record.
 * `enabled` should flip to true once the account's cloud progress has loaded.
 */
export function usePersonalization(user, enabled) {
  const uid = user?.uid || null;
  const [state, setState] = useState({ loaded: false, record: emptyRecord(), syncError: '' });
  const recordRef = useRef(state.record);
  const timer = useRef(null);
  const dirty = useRef(false);
  const uidRef = useRef(uid);
  uidRef.current = uid;
  recordRef.current = state.record;

  const writeNow = useCallback(async (record, targetUid = uidRef.current) => {
    if (!targetUid) return;
    await savePersonalization(targetUid, record);
  }, []);

  const flushDraft = useCallback(async () => {
    window.clearTimeout(timer.current);
    if (!dirty.current) return;
    dirty.current = false;
    try {
      await writeNow(recordRef.current);
      setState((s) => ({ ...s, syncError: '' }));
    } catch (error) {
      console.error('Could not autosave the learning profile:', error);
      dirty.current = true;
      setState((s) => ({ ...s, syncError: 'Not synced yet. Your answers are saved on this device.' }));
    }
  }, [writeNow]);

  // Load when the account (or its readiness) changes.
  useEffect(() => {
    window.clearTimeout(timer.current);
    dirty.current = false;
    if (!uid) {
      setState({ loaded: false, record: emptyRecord(), syncError: '' });
      return undefined;
    }
    if (!enabled) { setState({ loaded: false, record: emptyRecord(), syncError: '' }); return undefined; }
    let active = true;
    loadPersonalization(uid).then((result) => {
      if (!active) return;
      setState({
        loaded: true,
        record: result.record,
        syncError: result.error ? 'Could not reach the cloud. Showing what is saved on this device.' : ''
      });
      if (result.unsynced) savePersonalization(uid, result.record).catch(() => {});
    });
    return () => { active = false; };
  }, [uid, enabled]);

  // Do not lose the last few keystrokes when the tab closes or the component unmounts.
  useEffect(() => {
    const onHide = () => { if (dirty.current && uidRef.current) savePersonalization(uidRef.current, recordRef.current).catch(() => {}); };
    window.addEventListener('pagehide', onHide);
    return () => { window.removeEventListener('pagehide', onHide); onHide(); window.clearTimeout(timer.current); };
  }, []);

  /** Autosave for a first-time or resumed survey: updates state at once, writes to the cloud after a short pause. */
  const saveDraft = useCallback((answers, currentStep) => {
    const record = { status: 'in_progress', currentStep, answers };
    recordRef.current = record;
    setState((s) => ({ ...s, record }));
    dirty.current = true;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(flushDraft, AUTOSAVE_DELAY);
  }, [flushDraft]);

  const commit = useCallback(async (record) => {
    window.clearTimeout(timer.current);
    dirty.current = false;
    await writeNow(record);
    recordRef.current = record;
    setState((s) => ({ ...s, record, syncError: '' }));
  }, [writeNow]);

  /** Final submission. Rejects if it could not be saved so the survey can offer a retry. */
  const complete = useCallback((answers) => commit({ status: 'completed', currentStep: 0, answers }), [commit]);

  /** "Do it later" before starting, or "save and finish later" part-way through. */
  const skip = useCallback(async () => {
    try { await commit({ ...recordRef.current, status: 'skipped' }); } catch (error) {
      // Skipping must never trap a student. Keep going locally and retry on the next change.
      console.error('Could not save the skipped state:', error);
      const record = { ...recordRef.current, status: 'skipped' };
      recordRef.current = record;
      setState((s) => ({ ...s, record, syncError: 'Not synced yet. Your choice is saved on this device.' }));
    }
  }, [commit]);

  const pauseDraft = useCallback(async (answers, currentStep) => {
    const record = { status: 'in_progress', currentStep, answers };
    try { await commit(record); } catch (error) {
      console.error('Could not save progress:', error);
      recordRef.current = record;
      setState((s) => ({ ...s, record, syncError: 'Not synced yet. Your answers are saved on this device.' }));
    }
  }, [commit]);

  const reset = useCallback(() => {
    if (uidRef.current) clearCachedPersonalization(uidRef.current);
    setState({ loaded: false, record: emptyRecord(), syncError: '' });
  }, []);

  const { record } = state;
  const profile = useMemo(() => (record.status === 'completed' ? deriveProfile(record.answers) : null), [record]);
  // While a survey is part-way done, the theme choice (question 7) can still be honoured.
  const themeProfile = useMemo(
    () => profile || (record.answers.theme ? deriveProfile(record.answers) : null),
    [profile, record]
  );

  return {
    loaded: state.loaded,
    status: record.status,
    record,
    profile,
    themeProfile,
    syncError: state.syncError,
    saveDraft, flushDraft, pauseDraft, complete, skip, reset
  };
}
