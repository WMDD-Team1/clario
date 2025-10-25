import React, { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import Button from "@/components/Button";
import ToggleButton from "@/components/ToggleButton";

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState({
    key: "general",
    label: "General",
  });

  // Backend-ready placeholders
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

  // Empty handlers for backend integration
  const handleEdit = (section: string) => {};
  const handleExportData = () => {};

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 p-6 md:p-10 max-w mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Settings
        </h1>
        {/* Tabs */}
        <ToggleButton
          options={[
            { key: "general", label: "General" },
            { key: "finance", label: "Finance" },
          ]}
          option={activeSection}
          onClick={setActiveSection}
        />

        {/* ========== GENERAL SECTION ========== */}
        {activeSection.key === "general" && (
          <div className="flex flex-col gap-10">
            {/* Profile Section */}
            <section>
              <div className="divide-y divide-gray-200 border-b border-gray-200">
                {/* Name */}
                <div className="flex items-center py-4">
                  <span className="flex-1 text-gray-700">Name</span>
                  <span className="flex-1 text-center text-gray-500">
                    {profile.name}
                  </span>
                  <div className="flex-1 flex justify-end">
                    <Button
                      textColor="white"
                      buttonColor="regularButton"
                      onClick={() => handleEdit("profile-name")}
                    >
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center py-4">
                  <span className="flex-1 text-gray-700">Email</span>
                  <span className="flex-1 text-center text-gray-500">
                    {profile.email}
                  </span>
                  <div className="flex-1 flex justify-end">
                    <Button
                      textColor="white"
                      buttonColor="regularButton"
                      onClick={() => handleEdit("profile-email")}
                    >
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Password */}
                <div className="flex items-center py-4">
                  <span className="flex-1 text-gray-700">Password</span>
                  <span className="flex-1 text-center text-gray-500">
                    ••••••••••••••••••••••••••••
                  </span>
                  <div className="flex-1 flex justify-end">
                    <Button
                      textColor="white"
                      buttonColor="regularButton"
                      onClick={() => handleEdit("password")}
                    >
                      Change password
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Preferences Section */}
            <section>
              <div className="divide-y divide-gray-200 border-b border-gray-200">
                {/* Language */}
                <div className="flex items-center py-4">
                  <span className="flex-1 text-gray-700">Language</span>
                  <span className="flex-1 text-center text-gray-500">
                    {preferences.language}
                  </span>
                  <div className="flex-1 flex justify-end">
                    <Button
                      textColor="white"
                      buttonColor="regularButton"
                      onClick={() => handleEdit("language")}
                    >
                      Change
                    </Button>
                  </div>
                </div>

                {/* Mode */}
                <div className="flex items-center py-4">
                  <span className="flex-1 text-gray-700">Mode</span>
                  <span className="flex-1 text-center text-gray-500">
                    {preferences.mode}
                  </span>
                  <div className="flex-1 flex justify-end">
                    <Button
                      textColor="white"
                      buttonColor="regularButton"
                      onClick={() => handleEdit("mode")}
                    >
                      Change
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========== FINANCE SECTION ========== */}
        {activeSection.key === "finance" && (
          <div className="flex flex-col gap-10">
            {/* Expense Categories */}
            <section>
              <div className="flex items-center py-4 border-b border-gray-200">
                <span className="flex-1 text-gray-700">Expense Categories</span>
                <div className="flex-1 justify-center flex flex-wrap gap-2 text-center">
                  {finance.expenseCategories.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <div className="flex-1 flex justify-end">
                  <Button
                    textColor="white"
                    buttonColor="regularButton"
                    onClick={() => handleEdit("expenseCategories")}
                  >
                    Add / Edit
                  </Button>
                </div>
              </div>
            </section>

            {/* Income Categories */}
            <section>
              <div className="flex items-center py-4 border-b border-gray-200">
                <span className="flex-1 text-gray-700">Income Categories</span>
                <div className="flex-1 justify-center flex flex-wrap gap-2 text-center">
                  {finance.incomeCategories.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <div className="flex-1 flex justify-end">
                  <Button
                    textColor="white"
                    buttonColor="regularButton"
                    onClick={() => handleEdit("incomeCategories")}
                  >
                    Add / Edit
                  </Button>
                </div>
              </div>
            </section>

            {/* Tax Regime */}
            <section>
              <div className="flex items-center py-4 border-b border-gray-200">
                <span className="flex-1 text-gray-700">Tax Regime</span>
                <span className="flex-1 text-center text-gray-500">
                  {finance.taxRegime}
                </span>
                <div className="flex-1 flex justify-end">
                  <Button
                    textColor="white"
                    buttonColor="regularButton"
                    onClick={() => handleEdit("taxRegime")}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </section>

            {/* Export Data */}
            <section>
              <div className="flex items-center py-4 border-b border-gray-200">
                <span className="flex-1 text-gray-700">Export Data</span>
                <p className="flex-1 text-center text-gray-500 text-sm">
                  You can export your financial records and reports for
                  bookkeeping or analysis.
                </p>
                <div className="flex-1 flex justify-end">
                  <Button
                    textColor="white"
                    buttonColor="regularButton"
                    onClick={handleExportData}
                  >
                    Export
                  </Button>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </DashboardShell>
  );
};

export default Settings;
