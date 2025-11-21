export type AppConfig = {
  id: string;
  label: string;
  emoji?: string;
  /**
   * Optional icon path, e.g. from a Delta-style icon pack.
   * Put PNGs into public/icons/delta and reference them as:
   *   /icons/delta/your-icon-name.png
   */
  icon?: string;
};

// Two pages of apps for the home screen
export const HOME_PAGES: AppConfig[][] = [
  [
    { id: "lazy-map", label: "Lazy Map", emoji: "🗺️", icon: "/icons/delta/lazy-map.png" },
    { id: "prank-dialer", label: "Prank Dialer", emoji: "🎭", icon: "/icons/delta/phone.png" },
    { id: "notes", label: "Notes", emoji: "📝", icon: "/icons/delta/notes.png" },
    { id: "toto-cam", label: "Toto Cam", emoji: "🐈", icon: "/icons/delta/camera.png" },
  ],
  [
    { id: "tasks", label: "Tasks", emoji: "✅", icon: "/icons/delta/tasks.png" },
    { id: "journal", label: "Journal", emoji: "📓", icon: "/icons/delta/journal.png" },
    { id: "hub", label: "Hub", emoji: "🌌", icon: "/icons/delta/hub.png" },
    { id: "settings", label: "Settings", emoji: "⚙️", icon: "/icons/delta/settings.png" },
  ],
];