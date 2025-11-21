import React from "react";

interface AppIconProps {
  label: string;
  emoji?: string;
  iconSrc?: string;
  onClick?: () => void;
}

export const AppIcon: React.FC<AppIconProps> = ({
  label,
  emoji = "📱",
  iconSrc,
  onClick,
}) => {
  return (
    <button className="lp-app-icon" onClick={onClick}>
      <div className="lp-app-icon-badge">
        {iconSrc ? (
          <img src={iconSrc} alt={label} className="lp-app-icon-img" />
        ) : (
          emoji
        )}
      </div>
      <span className="lp-app-icon-label">{label}</span>
    </button>
  );
};