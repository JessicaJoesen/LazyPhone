import React from "react";
import { AppIcon } from "./AppIcon";

interface DockProps {
  onOpenPhone: () => void;
  onOpenStore: () => void;
  onOpenSettings: () => void;
}

export const Dock: React.FC<DockProps> = ({
  onOpenPhone,
  onOpenStore,
  onOpenSettings,
}) => {
  return (
    <div className="lp-dock">
      <AppIcon label="Phone" emoji="📞" onClick={onOpenPhone} />
      <AppIcon label="Messages" emoji="💬" />
      <AppIcon label="App Store" emoji="🛒" onClick={onOpenStore} />
      <AppIcon label="Settings" emoji="⚙️" onClick={onOpenSettings} />
    </div>
  );
};