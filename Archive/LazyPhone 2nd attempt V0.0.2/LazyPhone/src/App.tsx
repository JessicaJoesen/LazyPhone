import React, { useEffect, useState } from "react";
import { PhoneFrame } from "./components/phone/PhoneFrame";
import { Onboarding } from "./components/onboarding/Onboarding";
import { HomeScreen } from "./components/home/HomeScreen";
import { getCurrentUser, setUserOnboarded } from "./services/userService";

export type LazyUser = {
  id: string;
  displayName: string;
  onboarded: boolean;
};

const App: React.FC = () => {
  const [user, setUser] = useState<LazyUser | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (!user || !user.onboarded) {
    return (
      <PhoneFrame>
        <Onboarding
          existingName={user?.displayName ?? ""}
          onComplete={handleOnboardingComplete}
        />
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <HomeScreen user={user} />
    </PhoneFrame>
  );
};

export default App;