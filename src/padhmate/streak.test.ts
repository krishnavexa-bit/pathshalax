import { describe, expect, it } from "vitest";
import { addDailyXp, streakDays, todayXp } from "./streak";

const day = (s: string) => new Date(`${s}T12:00:00`);

describe("daily goal and streaks", () => {
  it("adds points to today's total", () => {
    const log = addDailyXp(addDailyXp({}, 10, day("2026-11-13")), 5, day("2026-11-13"));
    expect(todayXp(log, day("2026-11-13"))).toBe(15);
  });
  it("counts consecutive days where the daily goal was met", () => {
    const log = { "2026-11-11": 40, "2026-11-12": 35, "2026-11-13": 30 };
    expect(streakDays(log, 30, day("2026-11-13"))).toBe(3);
  });
  it("does not break the streak while today's goal is still in progress", () => {
    const log = { "2026-11-11": 40, "2026-11-12": 35, "2026-11-13": 5 };
    expect(streakDays(log, 30, day("2026-11-13"))).toBe(2);
  });
  it("resets after a day below the goal", () => {
    const log = { "2026-11-10": 50, "2026-11-11": 10, "2026-11-12": 35 };
    expect(streakDays(log, 30, day("2026-11-13"))).toBe(1);
  });
});
