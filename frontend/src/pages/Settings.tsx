import React, { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import Button from "@/components/Button";
import ToggleButton from "@/components/ToggleButton";

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState({
    key: "general",
    label: "General",
  });

  // Placeholder data
  const [profile, setProfile] = useState({
    name: "Yosimar Yotún",
    email: "bebexito@emoxito.com",
  });

  const [preferences, setPreferences] = useState({
    language: "English",
    mode: "Bright Mode",
  });

  const [finance, setFinance] = useState({
    expenseCategories: [
      "Software & Tools",
      "Equipment & Hardware",
      "Subscriptions",
      "Professional Services",
    ],
    incomeCategories: ["Project Income", "Recurring Income", "Consulting"],
    taxRegime: "British Columbia",
  });

  const handleEdit = (section: string) => {};
  const handleExportData = () => {};

  // === Reusable Renderers for Mobile ===
  const renderGeneral = () => (
    <div className="flex flex-col gap-8 mt-4">
      {/* Profile Section */}
      <section className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Profile</h3>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 text-sm">Name</span>
            <span className="text-gray-500 text-sm">{profile.name}</span>
            <Button
              textColor="white"
              buttonColor="regularButton"
              onClick={() => handleEdit("profile-name")}
            >
              Edit
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700 text-sm">Email</span>
            <span className="text-gray-500 text-sm">{profile.email}</span>
            <Button
              textColor="white"
              buttonColor="regularButton"
              onClick={() => handleEdit("profile-email")}
            >
              Edit
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700 text-sm">Password</span>
            <span className="text-gray-500 text-sm">••••••••••••••</span>
            <Button
              textColor="white"
              buttonColor="regularButton"
              onClick={() => handleEdit("password")}
            >
              Change
            </Button>
          </div>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Preferences</h3>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 text-sm">Language</span>
            <span className="text-gray-500 text-sm">
              {preferences.language}
            </span>
            <Button
              textColor="white"
              buttonColor="regularButton"
              onClick={() => handleEdit("language")}
            >
              Change
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700 text-sm">Mode</span>
            <span className="text-gray-500 text-sm">{preferences.mode}</span>
            <Button
              textColor="white"
              buttonColor="regularButton"
              onClick={() => handleEdit("mode")}
            >
              Change
            </Button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderFinance = () => (
    <div className="flex flex-col gap-6 mt-4">
      {/* Expenses */}
      <section className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800 text-base">
            Expenses Categories
          </h3>
          <Button
            textColor="white"
            buttonColor="regularButton"
            onClick={() => handleEdit("expenseCategories")}
          >
            Add/Edit
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {finance.expenseCategories.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Income */}
      <section className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800 text-base">
            Income Categories
          </h3>
          <Button
            textColor="white"
            buttonColor="regularButton"
            onClick={() => handleEdit("incomeCategories")}
          >
            Add/Edit
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {finance.incomeCategories.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Tax Regime */}
      <section className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800 text-base">Tax Regime</h3>
          <Button
            textColor="white"
            buttonColor="regularButton"
            onClick={() => handleEdit("taxRegime")}
          >
            Edit
          </Button>
        </div>
        <p className="text-gray-600 text-sm">{finance.taxRegime}</p>
      </section>

      {/* Export */}
      <section className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-800 text-base">Export Data</h3>
          <Button
            textColor="white"
            buttonColor="regularButton"
            onClick={handleExportData}
          >
            Export
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Export your financial records and reports for bookkeeping or analysis.
        </p>
      </section>
    </div>
  );

  return (
    <>
      {/* === DESKTOP VIEW (Unchanged Original) === */}
      <div className="hidden sm:block">
        <DashboardShell>
          <div className="flex flex-col gap-8 p-6 md:p-10 max-w mx-auto">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Settings
            </h1>

            <ToggleButton
              options={[
                { key: "general", label: "General" },
                { key: "finance", label: "Finance" },
              ]}
              option={activeSection}
              onClick={setActiveSection}
            />

            {activeSection.key === "general" && renderGeneral()}
            {activeSection.key === "finance" && renderFinance()}
          </div>
        </DashboardShell>
      </div>

      {/* === MOBILE VIEW (≤580px) === */}
      <div className="block sm:hidden px-4 pb-20">
        {/* Placeholder for mobile header */}
        <div className="h-10"></div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Settings
        </h2>

        {/* Toggle */}
        <div className="flex justify-center mb-4">
          <div className="flex bg-gray-200 rounded-full p-1 w-full max-w-xs">
            {["general", "finance"].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveSection({
                    key: tab,
                    label: tab === "general" ? "General" : "Finance",
                  })
                }
                className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection.key === tab
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Section Content */}
        {activeSection.key === "general" && renderGeneral()}
        {activeSection.key === "finance" && renderFinance()}
      </div>
    </>
  );
};

export default Settings;
