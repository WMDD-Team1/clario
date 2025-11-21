import React from "react";
import { Sun, Moon } from "lucide-react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <div
      className={`
        flex items-center gap-4 px-6 py-3 rounded-full border transition-colors duration-300
        ${
          checked
            ? "bg-slate-900 border-slate-700 text-white" // Dark Mode Styles
            : "bg-white border-gray-200 text-slate-600" // Light Mode Styles
        }
      `}
    >
      {/* Sun Icon - Blue when Light Mode is active */}
      <Sun
        size={20}
        className={`transition-colors duration-300 ${
          !checked ? "text-blue-500" : "text-slate-500"
        }`}
      />

      {/* The Switch Track & Knob */}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`
            w-12 h-7 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 
            transition-colors duration-300 ease-in-out
            ${checked ? "bg-slate-600" : "bg-gray-200"}
          `}
        >
          {/* The Knob */}
          <div
            className={`
              absolute top-[4px] left-[4px] bg-blue-600 border border-gray-300 
              rounded-full h-5 w-5 transition-transform duration-300 ease-in-out shadow-sm
              ${checked ? "translate-x-5 border-white" : "translate-x-0"}
            `}
          ></div>
        </div>
      </label>

      {/* Moon Icon - Blue when Dark Mode is active */}
      <Moon
        size={20}
        className={`transition-colors duration-300 ${
          checked ? "text-blue-500" : "text-slate-400"
        }`}
      />

      {/* Text Label */}
      <span className="font-medium text-lg select-none w-12 text-center">
        {checked ? "Dark" : "Light"}
      </span>
    </div>
  );
};

export default ToggleSwitch;