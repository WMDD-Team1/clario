import React from "react";

interface TabSwitcherProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex justify-center  border-gray-200 border-2  rounded-2xl overflow-hidden">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-10 py-4
            ${
              activeTab === tab
                ? "bg-blue-200 text-gray-600"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;