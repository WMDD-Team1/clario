import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  buttonName?: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, description, buttonName, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded shadow">
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        {description && <p className="mt-2">{description}</p>}
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded">
            {buttonName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
