import React from "react";


interface WelcomeBannerProps {
  userName: string;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ userName }) => {
  return (
    <div className="mb-6">
      <h2 className="!font-['Libre_Baskerville'] text-[32px] text-[var(--primary-text)] leading-[40px]">
        Hi {userName} Welcome Back,
      </h2>
      <p className="font-['Montserrat'] text-[var(--page-subtitle)] text-xl">
        Here’s your business overview and latest insights.
      </p>
    </div>
  );
};
