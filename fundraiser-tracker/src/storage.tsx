import { Entry } from "./types";

const STORAGE_KEY = "fundraiser_entries";

export function loadEntries(): Entry[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveEntries(entries: Entry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}
