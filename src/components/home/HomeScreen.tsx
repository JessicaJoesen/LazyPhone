import React, { useState } from "react";
import type { LazyUser } from "../../App";
import { AppIcon } from "./AppIcon";
import { Dock } from "./Dock";

type HomeView = "home" | "phone" | "store";

interface HomeScreenProps {
  user: LazyUser;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ user }) => {
  const [view, setView] = useState<HomeView>("home");

  const openPhone = () => setView("phone");
  const openStore = () => setView("store");
  const goHome = () => setView("home");

  return (
    <div className="lp-home">
      {view === "home" && (
        <>
          <div className="lp-home-greeting">
            <span>Hey, {user.displayName}</span>
          </div>
          <div className="lp-home-grid">
            <AppIcon label="Lazy Map" emoji="🗺️" />
            <AppIcon label="Prank Dialer" emoji="🎭" onClick={openPhone} />
            <AppIcon label="Notes" emoji="📝" />
            <AppIcon label="Toto Cam" emoji="🐈" />
          </div>
          <Dock onOpenPhone={openPhone} onOpenStore={openStore} />
        </>
      )}

      {view === "phone" && (
        <div className="lp-app-screen">
          <div className="lp-app-header">
            <button className="lp-btn ghost small" onClick={goHome}>
              ⬅ Home
            </button>
            <span>Phone (placeholder)</span>
          </div>
          <p className="lp-app-body">
            This is where we’ll later hook into your Flask / 3CX / VOIP stuff.
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
          </div>
          <p className="lp-app-body">
            Future idea: upload apps (Lua/JS/etc), install/uninstall, manage
            permissions. For now, this is just a placeholder.
          </p>
        </div>
      )}
    </div>
  );
};