import React, { useEffect, useRef, useState } from 'react';

interface WelcomeBannerProps {
  userName: string;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ userName }) => {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (!userName || userName === 'User') return;

    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    if (typeof window === 'undefined') {
      setIsFirstTime(false);
      return;
    }

    const storageKey = `has_visited_${userName}`;
    const hasVisited = window.localStorage.getItem(storageKey);

    if (!hasVisited) {
      setIsFirstTime(true);
      window.localStorage.setItem(storageKey, 'true');
    } else {
      setIsFirstTime(false);
    }
  }, [userName]);
  if (isFirstTime === null) return null;

  return (
    <div className="pb-1 mb-3">
      <h2 className="!font-['merriweather'] font-bold text-[var(--primary-text)] leading-[40px]">
        {isFirstTime ? (
        <>Welcome {userName}, </>
         ) : (
         <>Hi {userName} Welcome Back,</>
        )}
      </h2>
      <p className="hidden md:block font-['Montserrat'] text-[var(--page-subtitle)] text-[1.25rem]">
        Here’s your business overview and latest insights.
      </p>
    </div>
  );
};
