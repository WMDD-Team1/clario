import { useEffect, useRef, ReactNode } from "react";
import FormDrawer from "@components/forms/FormDrawer";

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string; 
  children: ReactNode; 
}

const SettingsDrawer = ({ isOpen, onClose, title, children }: SettingsDrawerProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!divRef.current?.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <FormDrawer title={title} isOpen={isOpen} onClose={onClose} divRef={divRef}>
      {children}
    </FormDrawer>
  );
};

export default SettingsDrawer;
