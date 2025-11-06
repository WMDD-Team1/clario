import React, { useState } from "react";
import Button from "@/components/Button";
import ToggleButton from "@/components/ToggleButton";
import { useAuth0 } from "@auth0/auth0-react";

const Settings: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const [activeSection, setActiveSection] = useState({
    key: "general",
    label: "General",
  });

  const [profile] = useState({
    name: "Yosimar Yotún",
    email: "bebexito@emoxito.com",
    address: "5 - 312 3rd Ave, Vancouver British Columbia, v6z-1y9",
  });

  const [preferences] = useState({
    language: "English",
    mode: "Bright Mode",
  });

  const [finance] = useState({
    expenseCategories: [
      "Software & Tools",
      "Equipment & Hardware",
      "Subscriptions",
      "Professional Services",
    ],
    incomeCategories: ["Project Income", "Recurring Income", "Consulting"],
    taxRegime: "British Columbia",
  });

  const handleEdit = (section: string) => {
    console.log("Edit:", section);
  };

  const handleExportData = () => {
    console.log("Export data clicked");
  };

  const renderGeneral = () => (
    <div className="flex flex-col gap-8 mt-4">
      {/* Profile */}
      <section>
        <h3 className="font-semibold text-gray-900 text-lg mb-3">Profile</h3>
        <div className="divide-y divide-gray-300 border-b border-gray-300">
          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 w-1/3">Name</span>
            <span className="text-gray-800 flex-1">{profile.name}</span>
            <Button
              className="bg-blue-600 text-white rounded-xl px-5 py-1"
              buttonColor="regularButton"
              textColor="white"
              onClick={() => handleEdit("name")}
            >
              Edit
            </Button>
          </div>

          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 w-1/3">Email</span>
            <span className="text-gray-800 flex-1">{profile.email}</span>
            <Button
              className="bg-blue-600 text-white rounded-xl px-5 py-1"
              buttonColor="regularButton"
              textColor="white"
              onClick={() => handleEdit("email")}
            >
              Edit
            </Button>
          </div>

          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 w-1/3">Address</span>
            <span className="text-gray-800 flex-1">{profile.address}</span>
            <Button
              className="bg-blue-600 text-white rounded-xl px-5 py-1"
              buttonColor="regularButton"
              textColor="white"
              onClick={() => handleEdit("address")}
            >
              Edit
            </Button>
          </div>

          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 w-1/3">Password</span>
            <span className="text-gray-800 flex-1">
              ************************
            </span>
            <Button
              className="bg-blue-600 text-white rounded-xl px-5 py-1"
              buttonColor="regularButton"
              textColor="white"
              onClick={() => handleEdit("password")}
            >
              Change password
            </Button>
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section>
        <h3 className="font-semibold text-gray-900 text-lg mb-3">
          Preferences
        </h3>
        <div className="divide-y divide-gray-300 border-b border-gray-300">
          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 w-1/3">Language</span>
            <span className="text-gray-800 flex-1">
              {preferences.language}
            </span>
            <Button
              className="bg-blue-600 text-white rounded-xl px-5 py-1"
              buttonColor="regularButton"
              textColor="white"
              onClick={() => handleEdit("language")}
            >
              Change
            </Button>
          </div>

          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 w-1/3">Mode</span>
            <span className="text-gray-800 flex-1">{preferences.mode}</span>
            <Button
              className="bg-blue-600 text-white rounded-xl px-5 py-1"
              buttonColor="regularButton"
              textColor="white"
              onClick={() => handleEdit("mode")}
            >
              Change
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
  
  // === Finance Section ===
const renderFinance = () => (
  <div className="flex flex-col gap-6 mt-4">
    {/* Expense Categories */}
    <section>
      <div className="flex items-center mb-3">
        <h3 className="font-semibold text-gray-900 text-base flex-shrink-0">
          Expense Categories
        </h3>

        {/* Categories scrollable */}
        <div className="flex gap-2 overflow-x-auto mx-4 flex-1">
          {finance.expenseCategories.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 flex-shrink-0 whitespace-nowrap"
            >
              {cat}
            </span>
          ))}
        </div>

        <Button
          className="bg-blue-600 text-white rounded-xl px-5 py-1 flex-shrink-0"
          buttonColor="regularButton"
          textColor="white"
          onClick={() => handleEdit("expenseCategories")}
        >
          Add/Edit
        </Button>
      </div>
    </section>

    {/* Income Categories */}
    <section>
      <div className="flex items-center mb-3">
        <h3 className="font-semibold text-gray-900 text-base flex-shrink-0">
          Income Categories
        </h3>

        {/* Categories scrollable */}
        <div className="flex gap-2 overflow-x-auto mx-4 flex-1">
          {finance.incomeCategories.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 flex-shrink-0 whitespace-nowrap"
            >
              {cat}
            </span>
          ))}
        </div>

        <Button
          className="bg-blue-600 text-white rounded-xl px-5 py-1 flex-shrink-0"
          buttonColor="regularButton"
          textColor="white"
          onClick={() => handleEdit("incomeCategories")}
        >
          Add/Edit
        </Button>
      </div>
    </section>

    {/* Tax Regime */}
    <section>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-900 text-base flex-shrink-0">
          Tax Regime
        </h3>
        <p className="text-gray-600 text-sm">{finance.taxRegime}</p>
        <Button
          className="bg-blue-600 text-white rounded-xl px-5 py-1 flex-shrink-0"
          buttonColor="regularButton"
          textColor="white"
          onClick={() => handleEdit("taxRegime")}
        >
          Edit
        </Button>
      </div>
      
    </section>

    {/* Export Data */}
    <section>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-900 text-base flex-shrink-0">
          Export Data
        </h3>
        <Button
          className="bg-blue-600 text-white rounded-xl px-5 py-1 flex-shrink-0"
          buttonColor="regularButton"
          textColor="white"
          onClick={handleExportData}
        >
          Export
        </Button>
      </div>
      
    </section>
  </div>
);


  
  if (isLoading) return <div className="p-10 text-gray-600">Loading...</div>;
  if (!isAuthenticated)
    return <div className="p-10 text-gray-600">Please log in to view settings.</div>;


  return (
    <div className="flex flex-col gap-8 w-full px-10 md:px-14 pr-16">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Settings
      </h1>

      <div className="max-w-[1200px]">
        <ToggleButton
          options={[
            { key: "general", label: "General" },
            { key: "finance", label: "Finance" },
          ]}
          option={activeSection}
          onClick={setActiveSection}
        />

        <div className="mt-2">
          {activeSection.key === "general" && renderGeneral()}
          {activeSection.key === "finance" && renderFinance()}
        </div>
      </div>
    </div>
  );
};

export default Settings;