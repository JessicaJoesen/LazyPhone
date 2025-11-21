import React, { useEffect, useState } from "react";
import type { InstalledApp, StoreApp } from "../../services/appStoreService";
import {
  installApp,
  uninstallApp,
  isInstalled,
} from "../../services/appStoreService";

interface AppStoreScreenProps {
  installedApps: InstalledApp[];
  onInstalledAppsChange: (apps: InstalledApp[]) => void;
}

export const AppStoreScreen: React.FC<AppStoreScreenProps> = ({
  installedApps,
  onInstalledAppsChange,
}) => {
  const [apps, setApps] = useState<StoreApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [installingId, setInstallingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/apps/index.json");
        if (!res.ok) {
          throw new Error("Failed to load app index");
        }
        const data = (await res.json()) as StoreApp[];
        if (!cancelled) {
          setApps(Array.isArray(data) ? data : []);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load app index", err);
          setError("Could not load app store");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleInstall = (app: StoreApp) => {
    if (installingId) return;
    setInstallingId(app.id);
    setTimeout(() => {
      const next = installApp(installedApps, app);
      onInstalledAppsChange(next);
      setInstallingId(null);
    }, 500);
  };

  const handleUninstall = (app: StoreApp) => {
    const next = uninstallApp(installedApps, app.id);
    onInstalledAppsChange(next);
  };

  if (loading && !apps.length) {
    return <p className="lp-app-body">Loading App Store…</p>;
  }

  if (error && !apps.length) {
    return <p className="lp-app-body">{error}</p>;
  }

  return (
    <div className="lp-store">
      <div className="lp-store-header">
        <h3>Lazy Store</h3>
        <p>Install mini-apps that will appear on your home screen.</p>
      </div>
      <div className="lp-store-grid">
        {apps.map((app) => {
          const installed = isInstalled(installedApps, app.id);
          const installing = installingId === app.id;

          return (
            <div
              key={app.id}
              className={
                "lp-store-card" +
                (installing ? " lp-store-card-installing" : "")
              }
            >
              <div className="lp-store-icon-wrap">
                <div className="lp-app-icon-badge lp-store-icon-badge">
                  {app.icon ? (
                    <img
                      src={app.icon}
                      alt={app.label}
                      className="lp-app-icon-img"
                    />
                  ) : (
                    app.label.charAt(0)
                  )}
                </div>
              </div>
              <div className="lp-store-meta">
                <div className="lp-store-title-row">
                  <h4>{app.label}</h4>
                  {app.category && (
                    <span className="lp-store-tag">{app.category}</span>
                  )}
                </div>
                <p className="lp-store-description">{app.description}</p>
              </div>
              <div className="lp-store-actions">
                {!installed && (
                  <button
                    className="lp-btn primary lp-btn-small"
                    onClick={() => handleInstall(app)}
                    disabled={installing}
                  >
                    {installing ? "Installing…" : "Install"}
                  </button>
                )}
                {installed && (
                  <button
                    className="lp-btn ghost lp-btn-small"
                    onClick={() => handleUninstall(app)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="lp-store-footnote">
        App bundles live under <code>public/apps</code> as zip files. This UI
        just manages what is installed and visible on your home screen; later
        you can have the runtime actually read and execute those zips.
      </p>
    </div>
  );
};