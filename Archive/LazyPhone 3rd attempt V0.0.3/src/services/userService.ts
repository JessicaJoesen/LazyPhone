import { v4 as uuidv4 } from "uuid";
import type { LazyUser } from "../App";

const STORAGE_KEY = "lazyphone_current_user";

function readFromStorage(): LazyUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as LazyUser;
  } catch {
    return null;
  }
}

function writeToStorage(user: LazyUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function getCurrentUser(): LazyUser {
  let user = readFromStorage();
  if (!user) {
    user = {
      id: uuidv4(),
      displayName: "",
      onboarded: false,
    };
    writeToStorage(user);
  }
  return user;
}

export function setUserOnboarded(user: LazyUser) {
  writeToStorage(user);
}