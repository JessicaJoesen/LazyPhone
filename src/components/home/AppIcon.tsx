import React from "react";

interface AppIconProps {
  label: string;
  emoji?: string;
  onClick?: () => void;
}

export const AppIcon: React.FC<AppIconProps> = ({
  label,
  emoji = "📱",
  onClick,
}) => {
  return (
    <button className="lp-app-icon" onClick={onClick}>
      <div className="lp-app-icon-badge">{emoji}</div>
      <span className="lp-app-icon-label">{label}</span>
    </button>
  );
};