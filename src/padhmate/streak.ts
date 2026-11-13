// Daily goal and streak rules for PathshalaX.
// A day counts towards the streak when the student earns at least their daily goal in XP that day.
// Today only extends the streak once the goal is met; an unfinished today never breaks it.
export type DailyXp = Record<string, number>;

export function dayKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDailyXp(daily: DailyXp | undefined, points: number, now = new Date()): DailyXp {
  const key = dayKey(now);
  const next = { ...(daily ?? {}) };
  next[key] = (next[key] ?? 0) + points;
  // Keep the last ~120 days only.
  const keys = Object.keys(next).sort();
  for (const k of keys.slice(0, Math.max(0, keys.length - 120))) delete next[k];
  return next;
}

export function streakDays(daily: DailyXp | undefined, goal: number, now = new Date()): number {
  const log = daily ?? {};
  let count = 0;
  const cursor = new Date(now);
  if ((log[dayKey(cursor)] ?? 0) >= goal) count = 1;
  cursor.setDate(cursor.getDate() - 1);
  while ((log[dayKey(cursor)] ?? 0) >= goal) {
    count++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

export function todayXp(daily: DailyXp | undefined, now = new Date()) {
  return (daily ?? {})[dayKey(now)] ?? 0;
}
