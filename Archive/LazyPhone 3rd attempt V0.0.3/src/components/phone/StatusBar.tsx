import React from "react";

export const StatusBar: React.FC = () => {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="lp-status-bar">
      <span className="lp-status-time">{time}</span>
      <div className="lp-status-icons">
        <span className="lp-status-dot" />
        <span className="lp-status-dot" />
        <span className="lp-status-dot" />
      </div>
    </div>
  );
};