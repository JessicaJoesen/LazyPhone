import React, { useState } from "react";
import type { LazyUser, Theme, IconAssignments } from "../../App";
import { AppIcon } from "./AppIcon";
import { Dock } from "./Dock";
import { StatusBar } from "../phone/StatusBar";
import { HOME_PAGES, getAppById, AppId } from "../../config/apps";
import { SettingsPanel } from "../settings/SettingsPanel";
import { AppStoreScreen } from "../store/AppStoreScreen";
import type { InstalledApp } from "../../services/appStoreService";

type HomeView = "home" | "phone" | "store" | "settings";

interface HomeScreenProps {
  user: LazyUser;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  iconAssignments: IconAssignments;
  onIconAssignmentsChange: (next: IconAssignments) => void;
  installedApps: InstalledApp[];
  onInstalledAppsChange: (apps: InstalledApp[]) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  theme,
  onThemeChange,
  iconAssignments,
  onIconAssignmentsChange,
  installedApps,
  onInstalledAppsChange,
}) => {
  const [view, setView] = useState<HomeView>("home");
  const [page, setPage] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);

  // Build pages dynamically: core pages + installed apps split in rows of 4
  const corePages: AppId[][] = HOME_PAGES;
  const installedIds: AppId[] = installedApps.map((a) => a.id);
  const installedPages: AppId[][] = [];

  if (installedIds.length) {
    const chunkSize = 4;
    for (let i = 0; i < installedIds.length; i += chunkSize) {
      installedPages.push(installedIds.slice(i, i + chunkSize));
    }
  }

  const allPages: AppId[][] = [...corePages, ...installedPages];
  const maxPage = allPages.length - 1;

  const openPhone = () => setView("phone");
  const openStore = () => setView("store");
  const openSettings = () => setView("settings");
  const goHome = () => setView("home");

  const handleDotClick = (index: number) => {
    setPage(index);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta > 50 && page > 0) {
      setPage(page - 1);
    } else if (delta < -50 && page < maxPage) {
      setPage(page + 1);
    }
    setTouchStartX(null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseStartX == null) return;
    const delta = e.clientX - mouseStartX;
    if (delta > 60 && page > 0) {
      setPage(page - 1);
    } else if (delta < -60 && page < maxPage) {
      setPage(page + 1);
    }
    setMouseStartX(null);
  };

  const renderHome = () => (
    <>
      <StatusBar />
      <div className="lp-home-greeting">
        <span>{user.displayName || "Lazy Human"}</span>
      </div>

      <div
        className="lp-home-grid-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div
          className="lp-home-grid-strip"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {allPages.map((appIds, idx) => (
            <div key={idx} className="lp-home-grid">
              {appIds.map((appId) => {
                const coreApp = getAppById(appId);
                const installedApp = installedApps.find((a) => a.id === appId);

                const label = coreApp?.label ?? installedApp?.label ?? appId;
                const emoji = coreApp?.emoji;
                const assignedIcon = iconAssignments[appId];
                const iconSrc =
                  assignedIcon || coreApp?.icons?.[0] || installedApp?.icon;

                const handleAppClick = () => {
                  if (appId === "prank-dialer") openPhone();
                  else if (appId === "settings") openSettings();
                  else if (appId === "hub") openStore();
                  // User apps can later open custom runtimes
                };

                return (
                  <AppIcon
                    key={appId}
                    label={label}
                    emoji={emoji}
                    iconSrc={iconSrc}
                    onClick={handleAppClick}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="lp-home-page-dots">
        {allPages.map((_, i) => (
          <button
            key={i}
            className={
              "lp-home-page-dot" + (page === i ? " lp-home-page-dot-active" : "")
            }
            onClick={() => handleDotClick(i)}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      <Dock
        onOpenPhone={openPhone}
        onOpenStore={openStore}
        onOpenSettings={openSettings}
      />
    </>
  );

  return (
    <div className="lp-home">
      {view === "home" && renderHome()}

      {view === "phone" && (
        <div className="lp-app-screen">
          <div className="lp-app-header">
            <button className="lp-btn ghost small" onClick={goHome}>
              ⬅ Home
            </button>
            <span>Phone</span>
            <span className="lp-app-header-spacer" />
          </div>
          <p className="lp-app-body">
            Placeholder Phone app. Later this will talk to your Flask / 3CX /
            VOIP stack.
          </p>
        </div>
      )}

      {view === "store" && (
        <div className="lp-app-screen">
          <div className="lp-app-header">
            <button className="lp-btn ghost small" onClick={goHome}>
              ⬅ Home
            </button>
            <span>Lazy Store</span>
            <span className="lp-app-header-spacer" />
          </div>
          <AppStoreScreen
            installedApps={installedApps}
            onInstalledAppsChange={onInstalledAppsChange}
          />
        </div>
      )}

      {view === "settings" && (
        <div className="lp-app-screen">
          <div className="lp-app-header">
            <button className="lp-btn ghost small" onClick={goHome}>
              ⬅ Home
            </button>
            <span>Settings</span>
            <span className="lp-app-header-spacer" />
          </div>
          <SettingsPanel
            theme={theme}
            onThemeChange={onThemeChange}
            iconAssignments={iconAssignments}
            onIconAssignmentsChange={onIconAssignmentsChange}
          />
        </div>
      )}
    </div>
  );
};