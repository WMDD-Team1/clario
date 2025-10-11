import React, {useState} from 'react';
import { colorOptions } from './style/color';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  buttonName?: string;
  onClose: () => void;
  buttonStyle: 'lightButton' | 'darkButton' | 'regularButton' | 'blueButton';
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, description, buttonName, onClose, buttonStyle='blueButton'}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded shadow">
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        {description && <p className="mt-2">{description}</p>}
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className={`px-4 py-2 ${colorOptions[buttonStyle]} text-white rounded`}>
            {buttonName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
