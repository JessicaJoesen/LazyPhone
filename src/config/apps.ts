export type AppId = string;

export type AppConfig = {
  id: AppId;
  label: string;
  emoji?: string;
  /**
   * Optional list of icon paths (PNG) in public/, e.g. /icons/delta/phone.png
   */
  icons?: string[];
};

// Core/system apps that ship with LazyPhone
export const APPS: AppConfig[] = [
  {
    id: "lazy-map",
    label: "Lazy Map",
    emoji: "🗺️",
    icons: ["/icons/delta/lazy-map.png", "/icons/delta/maps.png"],
  },
  {
    id: "prank-dialer",
    label: "Prank Dialer",
    emoji: "🎭",
    icons: ["/icons/delta/phone.png"],
  },
  {
    id: "notes",
    label: "Notes",
    emoji: "📝",
    icons: ["/icons/delta/notes.png"],
  },
  {
    id: "toto-cam",
    label: "Toto Cam",
    emoji: "🐈",
    icons: ["/icons/delta/camera.png"],
  },
  {
    id: "tasks",
    label: "Tasks",
    emoji: "✅",
    icons: ["/icons/delta/tasks.png", "/icons/delta/checklist.png"],
  },
  {
    id: "journal",
    label: "Journal",
    emoji: "📓",
    icons: ["/icons/delta/journal.png", "/icons/delta/book.png"],
  },
  {
    id: "hub",
    label: "Hub",
    emoji: "🌌",
    icons: ["/icons/delta/hub.png", "/icons/delta/apps.png"],
  },
  {
    id: "settings",
    label: "Settings",
    emoji: "⚙️",
    icons: ["/icons/delta/settings.png"],
  },
  {
    id: "calendar",
    label: "Calendar",
    emoji: "📅",
    icons: ["/icons/delta/calendar.png"],
  },
  {
    id: "photos",
    label: "Photos",
    emoji: "📷",
    icons: ["/icons/delta/photos.png"],
  },
  {
    id: "messages",
    label: "Messages",
    emoji: "💬",
    icons: ["/icons/delta/messages.png"],
  },
];

// Define which core apps appear on which home screen page.
// User-installed apps will be appended after these.
export const HOME_PAGES: AppId[][] = [
  ["lazy-map", "prank-dialer", "notes", "toto-cam"],
  ["tasks", "journal", "hub", "settings"],
  ["calendar", "photos", "messages"],
];

export function getAppById(id: AppId): AppConfig | undefined {
  return APPS.find((a) => a.id === id);
}