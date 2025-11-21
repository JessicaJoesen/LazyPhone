import React from "react";
import type { Theme, IconAssignments } from "../../App";
import { APPS } from "../../config/apps";

interface SettingsPanelProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  iconAssignments: IconAssignments;
  onIconAssignmentsChange: (next: IconAssignments) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  theme,
  onThemeChange,
  iconAssignments,
  onIconAssignmentsChange,
}) => {
  const handleIconChange = (appId: string, value: string) => {
    const next: IconAssignments = { ...iconAssignments };
    if (!value) {
      delete next[appId];
    } else {
      next[appId] = value;
    }
    onIconAssignmentsChange(next);
  };

  return (
    <div className="lp-settings">
      <section className="lp-settings-section">
        <h3>Appearance</h3>
        <div className="lp-settings-row">
          <span>Theme</span>
          <div className="lp-settings-theme-toggle">
            <button
              className={
                "lp-btn small" + (theme === "light" ? " lp-btn-active" : "")
              }
              onClick={() => onThemeChange("light")}
            >
              Light
            </button>
            <button
              className={
                "lp-btn small" + (theme === "dark" ? " lp-btn-active" : "")
              }
              onClick={() => onThemeChange("dark")}
            >
              Dark
            </button>
          </div>
        </div>
      </section>

      <section className="lp-settings-section">
        <h3>Icon Packs</h3>
        <p className="lp-settings-hint">
          Choose which icon each app should use. Icons are loaded from
          <code> public/icons/delta </code>.
        </p>
        <div className="lp-settings-icon-grid">
          {APPS.map((app) => (
            <div key={app.id} className="lp-settings-icon-row">
              <div className="lp-settings-icon-label">
                <strong>{app.label}</strong>
                <span className="lp-settings-icon-id">{app.id}</span>
              </div>
              <select
                className="lp-select"
                value={iconAssignments[app.id] ?? ""}
                onChange={(e) => handleIconChange(app.id, e.target.value)}
              >
                <option value="">Default</option>
                {(app.icons ?? []).map((iconPath) => (
                  <option key={iconPath} value={iconPath}>
                    {iconPath.split("/").slice(-1)[0]}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};