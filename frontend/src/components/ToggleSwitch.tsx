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
            ? "bg-[var(--general-alpha0)] border-[var(--sublight)] text-[var(--tertiary-text)]" // Dark Mode Styles
            : " border-[var(--sublight)] bg-[var(--general-alpha0)] text-[var(--tertiary-text)]" // Light Mode Styles
        }
      `}
    >
      {/* Sun Icon - Blue when Light Mode is active */}
      <Sun
        size={20}
        className={`transition-colors duration-300 ${
          !checked ? "text-[var(--brand-alpha)]" : "text-[var(--brand-alpha)]"
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
            w-12 h-7 rounded-full peer-focus:outline-none  
            transition-colors duration-300 ease-in-out
            ${checked ? "bg-[var(--sublight)]" : "bg-[var(--sublight)]"}
          `}
        >
          {/* The Knob */}
          <div
            className={`
              absolute top-[4px] left-[4px] bg-[var(--primitive-colors-brand-primary-500-base)]  
              rounded-full h-5 w-5 transition-transform duration-300 ease-in-out shadow-sm
              ${checked ? "translate-x-5 " : "translate-x-0"}
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