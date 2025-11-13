import React, { ReactNode } from 'react';
import Button from './Button';
import { fontSizeOptions } from './style/font';
import { Forward } from '@assets/icons/index';

interface SlideProps {
  title: string;
  children: ReactNode;
  slide: string;
  onClose: () => void;
  onConfirm?: () => void;
  onExtra?: () => void;
  // width?: string;
  confirmText?: string;
  extralText?: string;
  showFooter?: boolean;
  showExtral?: boolean;
  showConfirm?: boolean;
}

const Slide: React.FC<SlideProps> = ({
  title,
  children,
  slide,
  onClose,
  onConfirm,
  onExtra,
  // width = '450px',
  confirmText = 'Add',
  extralText = 'Cancel',
  showFooter = true,
  showExtral = true,
  showConfirm = true,
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 transition-opacity duration-300 z-1010 ${
          slide === '0px' ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      <div
        className="fixed top-0 right-0 h-full shadow-lg bg-[var(--general-alpha)] transition-transform duration-600 ease-out sm:rounded-tl-[50px] sm:rounded-bl-[50px] z-1020 flex flex-col sm:w-[450px]  w-full"
        style={{ transform: `translateX(${slide})` }}
      >
        <div
        className="absolute top-19 sm:left-[-1rem] left-[2rem] bg-[var(--primitive-colors-brand-primary-95)] w-12 h-12 rounded-[1rem] cursor-pointer flex items-center justify-center shadow-md z-60"
        onClick={onClose}
        >
          <Forward className="w-8 h-8" />
        </div>
        <h3
          className={`text-3xl font-semibold text-center bg-[var(--background-alternate)] p-[2rem] sticky top-0 z-10 sm:rounded-tl-[50px]`}
        >
          {title}
        </h3>
        <div className="flex flex-col gap-[1.5rem] p-[2rem] h-full overflow-y-auto pt-[2.5rem]">{children}</div>

        {showFooter && (
          <div className="flex flex-row justify-center gap-[1rem] sticky bottom-0 w-full p-[2rem] bg-[var(--background-alternate)] sm:rounded-bl-[50px]">
            {showConfirm && onConfirm && (
              <Button buttonColor="whiteButton" width="100%" textColor="gray" onClick={onConfirm}>
                {confirmText}
              </Button>
            )}

            {showExtral && onExtra && (
              <Button buttonColor="regularButton" onClick={onExtra} width="100%" textColor="white">
                {extralText}
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Slide;
