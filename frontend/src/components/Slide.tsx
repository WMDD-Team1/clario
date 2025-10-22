import React, { ReactNode } from 'react';
import Button from './Button';
import { fontSizeOptions } from './style/font';

interface SlideProps {
  title: string;
  children: ReactNode;
  slide: string;
  onClose: () => void;
  onConfirm?: () => void;
  width?: string;
  confirmText?: string;
  cancelText?: string;
  showFooter?: boolean;
}

const Slide: React.FC<SlideProps> = ({
  title,
  children,
  slide,
  onClose,
  onConfirm,
  width = '450px',
  confirmText = 'Add',
  cancelText = 'Cancel',
  showFooter = true,
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
          slide === '0px' ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      <div
        className="fixed top-0 right-0 h-full shadow-lg bg-white transition-transform duration-300 overflow-y-auto rounded-tl-[20px] rounded-bl-[20px] z-50 flex flex-col"
        style={{ transform: `translateX(${slide})`, width }}
      >
        <h2
          className={`text-[${fontSizeOptions.h2}] text-center bg-blue-50 p-[1rem] sticky top-0 z-10`}
        >
          {title}
        </h2>
        <div className="flex flex-col gap-[1.5rem] p-[2rem]">{children}</div>

        {showFooter && (
          <div className="flex flex-row justify-center gap-[1rem] sticky bottom-0 w-full p-[2rem] bg-blue-50">
            {onConfirm && (
              <Button
                buttonColor="regularButton"
                width="100%"
                textColor="white"
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            )}
            <Button buttonColor="regularButton" onClick={onClose} width="100%" textColor="white">
              {cancelText}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Slide;
