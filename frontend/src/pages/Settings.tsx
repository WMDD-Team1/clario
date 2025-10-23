import React, { useState } from "react";
import { DashboardLayout } from "../components/dashboard/dashboard-layout";

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<"profile" | "finance">("profile");

  const sectionButton =
    "px-5 py-2 rounded-xl font-medium transition-colors focus:outline-none";

  const fieldRow =
    "flex justify-between items-center py-3 border-b border-gray-300 text-sm";

  const label = "text-gray-700 font-medium";
  const value = "text-gray-600";

  const smallButton =
    "text-gray-700 bg-gray-200 text-sm font-medium px-4 py-1.5 rounded-full hover:bg-gray-300 transition";

  return (
    <DashboardLayout>
      <div className="p-10">
        {/* Header */}
        <h1 className="text-3xl font-serif font-semibold mb-8">Settings</h1>

        {/* Section Tabs */}
        <div className="flex mb-10 bg-black rounded-xl w-fit p-1">
        <button
            onClick={() => setActiveSection("profile")}
            className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeSection === "profile"
                ? "bg-white text-black shadow-sm"
                : "bg-transparent text-white"
            }`}
        >
            Section 1
        </button>
        <button
            onClick={() => setActiveSection("finance")}
            className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeSection === "finance"
                ? "bg-white text-black shadow-sm"
                : "bg-transparent text-white"
            }`}
        >
            Section 2
        </button>
        </div>

        {/* Profile & Preferences */}
        {activeSection === "profile" && (
          <div className="space-y-10">
            {/* Profile */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Profile</h2>
              <div className="border-t border-gray-300 space-between">
                <div className={fieldRow}>
                  <span className={label}>Name</span>
                <div className="">
                    <span className={value}>Yosimar Yotún</span>
                </div>
                  <div className="flex items-center gap-4">
                    <button className={smallButton}>Edit</button>
                  </div>
                </div>
                <div className={fieldRow}>
                  <span className={label}>Email</span>
                  <div className="flex items-center gap-4">
                    <span className={value}>bebexito@emoxito.com</span>
                    <button className={smallButton}>Edit</button>
                  </div>
                </div>
                <div className={fieldRow}>
                  <span className={label}>Password</span>
                  <div className="flex items-center gap-4">
                    <span className={value}>****************************</span>
                    <button className={smallButton}>Change Password</button>
                  </div>
                </div>
              </div>
            </section>

            {/* Preferences */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Preferences</h2>
              <div className="border-t border-gray-300">
                <div className={fieldRow}>
                  <span className={label}>Language</span>
                  <div className="flex items-center gap-4">
                    <span className={value}>English</span>
                    <button className={smallButton}>Change</button>
                  </div>
                </div>
                <div className={fieldRow}>
                  <span className={label}>Mode</span>
                  <div className="flex items-center gap-4">
                    <span className={value}>Bright Mode</span>
                    <button className={smallButton}>Change</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Finances */}
        {activeSection === "finance" && (
          <div className="space-y-10">
            <section>
              <div className={fieldRow}>
                <span className={label}>Expenses Categories</span>
                <div className="flex-start space-between">
                                      {[
                    "Software & Tools",
                    "Equipment & Hardware",
                    "Subscriptions",
                    "Professional Services",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="border border-gray-400 text-gray-700 rounded-full px-3 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap justify-end items-center gap-2 max-w-[70%]">
                  <button className={smallButton}>Add/Edit</button>
                </div>
              </div>

              <div className={fieldRow}>
                <span className={label}>Income Categories</span>
                <div className="flex flex-wrap justify-end items-center gap-2 max-w-[70%]">
                  {["Project Income", "Recurring Income", "Consulting"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="border border-gray-400 text-gray-700 rounded-full px-3 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    )
                  )}
                  <button className={smallButton}>Add/Edit</button>
                </div>
              </div>

              <div className={fieldRow}>
                <span className={label}>Tax Regime</span>
                <div className="flex items-center gap-4">
                  <span className={value}>British Columbia</span>
                  <button className={smallButton}>Edit</button>
                </div>
              </div>

              <div className={fieldRow}>
                <span className={label}>Export Data</span>
                <button
                  className="bg-gray-200 text-gray-500 text-sm font-medium px-4 py-1.5 rounded-full cursor-not-allowed"
                  disabled
                >
                  Export
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Settings;
