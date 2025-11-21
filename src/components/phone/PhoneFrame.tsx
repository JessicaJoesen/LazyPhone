import React, { ReactNode } from "react";
import { StatusBar } from "./StatusBar";

interface PhoneFrameProps {
  children: ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="lp-root">
      <div className="lp-phone-shell">
        <div className="lp-phone-notch" />
        <div className="lp-phone-inner">
          <StatusBar />
          <div className="lp-phone-content">{children}</div>
        </div>
      </div>
    </div>
  );
};