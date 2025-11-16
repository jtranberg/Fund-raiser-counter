import { Entry } from "./types";

const ENTRIES_KEY = "fundraiser_entries";
const GOAL_KEY = "fundraiser_goal";

/* -----------------------------
   🔵 Load & Save Entries
------------------------------*/
export function loadEntries(): Entry[] {
  const raw = localStorage.getItem(ENTRIES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveEntries(entries: Entry[]) {
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

/* -----------------------------
   🔵 Load & Save Fundraising Goal
------------------------------*/
export function loadGoal(defaultGoal: number = 5000): number {
  const raw = localStorage.getItem(GOAL_KEY);
  if (!raw) return defaultGoal;

  const parsed = parseFloat(raw);
  if (isNaN(parsed) || parsed <= 0) return defaultGoal;

  return parsed;
}

export function saveGoal(goal: number) {
  localStorage.setItem(GOAL_KEY, String(goal));
}
