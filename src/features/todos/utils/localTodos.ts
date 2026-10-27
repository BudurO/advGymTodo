import type { Todo } from "../types";

// Legacy localStorage persistence. Only used to migrate previously saved
// tasks into the database the first time a user signs in on this device.

const STORAGE_KEY = "todos";

export function loadLocalTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearLocalTodos(): void {
  localStorage.removeItem(STORAGE_KEY);
}
