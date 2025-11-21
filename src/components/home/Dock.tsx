import React from "react";
import { AppIcon } from "./AppIcon";
import { getAppById } from "../../config/apps";
import type { IconAssignments } from "../../App";

interface DockProps {
  iconAssignments: IconAssignments;
  onOpenPhone: () => void;
  onOpenMessages: () => void;
  onOpenStore: () => void;
  onOpenSettings: () => void;
}

export const Dock: React.FC<DockProps> = ({
  iconAssignments,
  onOpenPhone,
  onOpenMessages,
  onOpenStore,
  onOpenSettings,
}) => {
  const phone = getAppById("prank-dialer");
  const messages = getAppById("messages");
  const store = getAppById("hub");
  const settings = getAppById("settings");

  const phoneIcon = iconAssignments[phone.id] ?? phone.icons?.[0];
  const messagesIcon = iconAssignments[messages.id] ?? messages.icons?.[0];
  const storeIcon = iconAssignments[store.id] ?? store.icons?.[0];
  const settingsIcon = iconAssignments[settings.id] ?? settings.icons?.[0];

  return (
    <div className="lp-dock">
      <AppIcon
        label={phone.label}
        emoji={phone.emoji}
        iconSrc={phoneIcon}
        onClick={onOpenPhone}
      />
      <AppIcon
        label={messages.label}
        emoji={messages.emoji}
        iconSrc={messagesIcon}
        onClick={onOpenMessages}
      />
      <AppIcon
        label={store.label}
        emoji={store.emoji}
        iconSrc={storeIcon}
        onClick={onOpenStore}
      />
      <AppIcon
        label={settings.label}
        emoji={settings.emoji}
        iconSrc={settingsIcon}
        onClick={onOpenSettings}
      />
    </div>
  );
};