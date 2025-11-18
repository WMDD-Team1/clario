import React, { useEffect, useState } from "react";

interface WelcomeBannerProps {
  userName: string;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ userName }) => {
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    if (!userName || userName === 'User') return;

    const storageKey = `has_visited_${userName}`;
    const hasVisited = localStorage.getItem(storageKey);

    if (!hasVisited) {
      setIsFirstTime(true);
      localStorage.setItem(storageKey, 'true');
    } else {
      setIsFirstTime(false);
    }
  }, [userName]);

  return (
    <div className="mb-6">
      <h2 className="!font-['Libre_Baskerville'] text-[clamp(1.75rem,calc(1.536rem+1.071vw),2.5rem)] text-[var(--primary-text)] leading-[40px]">
        {isFirstTime ? (
          <>Welcome, {userName}</>
        ) : (
          <>Hi {userName} Welcome Back,</>
        )}
      </h2>
      <p className="font-['Montserrat'] text-[var(--page-subtitle)] text-[1.25rem]">
        Here’s your business overview and latest insights.
      </p>
    </div>
  );
};