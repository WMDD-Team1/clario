import React from "react";

interface DashboardHeaderProps {
  name?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ name = "Arlette" }) => {
  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-4 mb-2 text-center sm:text-left">
        Hi {name}, Welcome Back
      </h1>
      <p className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
        Here’s your business overview and latest insights.
      </p>
    </div>
  );
};

export default DashboardHeader;
