import React, { useState } from "react";

interface OnboardingProps {
  existingName?: string;
  onComplete: (displayName: string) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({
  existingName = "",
  onComplete,
}) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState(existingName);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleFinish = () => {
    const finalName = name.trim() || "Lazy Human";
    onComplete(finalName);
  };

  return (
    <div className="lp-onboarding">
      {step === 0 && (
        <div className="lp-onboarding-slide">
          <h1>Welcome to LazyPhone 📱</h1>
          <p>
            Your tiny OS for chaos, apps, prank calls, maps and whatever we
            bolt on next.
          </p>
          <button className="lp-btn primary" onClick={next}>
            Get Started
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="lp-onboarding-slide">
          <h2>What should I call you?</h2>
          <input
            className="lp-input"
            placeholder="Display name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="lp-onboarding-actions">
            <button className="lp-btn ghost" onClick={back}>
              Back
            </button>
            <button className="lp-btn primary" onClick={next}>
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="lp-onboarding-slide">
          <h2>Permissions & vibes</h2>
          <p>
            LazyPhone will later talk to your backends, Minecraft, call
            systems, maps and more. For now, it just lives in your browser.
          </p>
          <div className="lp-onboarding-actions">
            <button className="lp-btn ghost" onClick={back}>
              Back
            </button>
            <button className="lp-btn primary" onClick={handleFinish}>
              Enter LazyPhone
            </button>
          </div>
        </div>
      )}
    </div>
  );
};