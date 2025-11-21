import React, { ReactNode } from "react";
import { StatusBar } from "./StatusBar";

interface PhoneFrameProps {
  children: ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="lp-root">
      <div className="lp-phone-shell">
        {/* Outer reflection */}
        <div className="lp-phone-shell-glow" />
        <div className="lp-phone-notch" />
        <div className="lp-phone-inner">
          {/* Wallpaper */}
          <div className="lp-phone-wallpaper" />
          {/* Glass layer with content */}
          <div className="lp-phone-glass">
            <StatusBar />
            <div className="lp-phone-content">{children}</div>
            <div className="lp-home-indicator" />
          </div>
        </div>
      </div>
    </div>
  );
};