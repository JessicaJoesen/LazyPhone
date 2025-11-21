import React, { useEffect, useState } from "react";
import { PhoneFrame } from "./components/phone/PhoneFrame";
import { Onboarding } from "./components/onboarding/Onboarding";
import { HomeScreen } from "./components/home/HomeScreen";
import { getCurrentUser, setUserOnboarded } from "./services/userService";
import { usePersistentState } from "./hooks/usePersistentState";

export type LazyUser = {
  id: string;
  displayName: string;
  onboarded: boolean;
};

export type Theme = "light" | "dark";

export type IconAssignments = Record<string, string>;

const App: React.FC = () => {
  const [user, setUser] = useState<LazyUser | null>(null);
  const [loading, setLoading] = useState(true);

  const [theme, setTheme] = usePersistentState<Theme>("lazyphone_theme", "dark");
  const [iconAssignments, setIconAssignments] =
    usePersistentState<IconAssignments>("lazyphone_icon_assignments", {});

  useEffect(() => {
    const existing = getCurrentUser();
    setUser(existing);
    setLoading(false);
  }, []);

  const handleOnboardingComplete = (displayName: string) => {
    if (!user) return;
    const updated: LazyUser = { ...user, displayName, onboarded: true };
    setUserOnboarded(updated);
    setUser(updated);
  };

  if (loading) {
    return (
      <div className="boot-screen">
        <div className="boot-logo">LazyPhone</div>
      </div>
    );
  }

  const content =
    !user || !user.onboarded ? (
      <Onboarding
        existingName={user?.displayName ?? ""}
        onComplete={handleOnboardingComplete}
      />
    ) : (
      <HomeScreen
        user={user}
        theme={theme}
        onThemeChange={setTheme}
        iconAssignments={iconAssignments}
        onIconAssignmentsChange={setIconAssignments}
      />
    );

  return <PhoneFrame theme={theme}>{content}</PhoneFrame>;
};

export default App;