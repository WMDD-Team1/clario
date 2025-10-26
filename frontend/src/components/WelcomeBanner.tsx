import React from "react";

interface WelcomeBannerProps {
  userName: string;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ userName }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold">
        Hi {userName}, Welcome Back,
      </h2>
      <p className="text-gray-600">
        Here’s your business overview and latest insights.
      </p>
    </div>
  );
};
