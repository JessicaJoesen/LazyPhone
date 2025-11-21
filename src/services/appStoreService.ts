import type { AppId } from "../config/apps";

export type StoreApp = {
  id: AppId;
  label: string;
  description: string;
  icon?: string;
  zipPath: string;
  category?: string;
};

export type InstalledApp = {
  id: AppId;
  label: string;
  icon?: string;
  sourceZip?: string;
};

const STORAGE_KEY = "lazyphone_installed_apps_v1";

export function loadInstalledApps(): InstalledApp[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as InstalledApp[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveInstalledApps(apps: InstalledApp[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

export function isInstalled(apps: InstalledApp[], id: AppId): boolean {
  return apps.some((a) => a.id === id);
}

export function installApp(
  current: InstalledApp[],
  app: StoreApp
): InstalledApp[] {
  if (current.some((a) => a.id === app.id)) return current;
  return [
    ...current,
    {
      id: app.id,
      label: app.label,
      icon: app.icon,
      sourceZip: app.zipPath,
    },
  ];
}

export function uninstallApp(current: InstalledApp[], id: AppId): InstalledApp[] {
  return current.filter((a) => a.id !== id);
}