import React, { useState } from "react";
import type { LazyUser } from "../../App";
import { AppIcon } from "./AppIcon";
import { Dock } from "./Dock";
import { HOME_PAGES } from "../../config/apps";

type HomeView = "home" | "phone" | "store";

interface HomeScreenProps {
  user: LazyUser;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ user }) => {
  const [view, setView] = useState<HomeView>("home");
  const [page, setPage] = useState(0); // springboard pages

  const openPhone = () => setView("phone");
  const openStore = () => setView("store");
  const goHome = () => setView("home");

  const handleDotClick = (index: number) => {
    setPage(index);
  };

  const isHome = view === "home";

  return (
    <div className="lp-home">
      {isHome && (
        <>
          <div className="lp-home-greeting">
            <span>{user.displayName || "Lazy Human"}</span>
          </div>

          <div className="lp-home-grid-wrapper">
            <div
              className="lp-home-grid-strip"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {HOME_PAGES.map((apps, idx) => (
                <div key={idx} className="lp-home-grid">
                  {apps.map((app) => (
                    <AppIcon
                      key={app.id}
                      label={app.label}
                      emoji={app.emoji}
                      iconSrc={app.icon}
                      onClick={
                        app.id === "prank-dialer"
                          ? openPhone
                          : app.id === "settings"
                          ? () => setView("store") // placeholder
                          : undefined
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="lp-home-page-dots">
            {HOME_PAGES.map((_, i) => (
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

          <Dock onOpenPhone={openPhone} onOpenStore={openStore} />
        </>
      )}

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
          <p className="lp-app-body">
            Future: upload custom apps, install/uninstall, app permissions, app
            versions. Right now it's just here to vibe.
          </p>
        </div>
      )}
    </div>
  );
};