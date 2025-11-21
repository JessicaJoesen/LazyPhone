import React, { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  theme: "light" | "dark";
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, theme }) => {
  return (
    <div className={`lp-root lp-theme-${theme}`}>
      <div className="lp-phone-shell">
        <div className="lp-phone-shell-glow" />
        <div className="lp-phone-notch" />
        <div className="lp-phone-inner">
          <div className="lp-phone-wallpaper" />
          <div className="lp-phone-glass">
            {/* StatusBar is rendered inside content (HomeScreen) so it can adapt if needed */}
            <div className="lp-phone-content">{children}</div>
            <div className="lp-home-indicator" />
          </div>
        </div>
      </div>
    </div>
  );
};