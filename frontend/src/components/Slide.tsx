import React, { ReactNode, useEffect } from 'react';
import Button from './Button';
import { fontSizeOptions } from './style/font';
import { Forward } from '@assets/icons/index';
import { ChevronRight } from 'lucide-react';

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

  useEffect(()=>{
    const handleEscKey = (event:KeyboardEvent)=>{
      if (event.key === 'Escape' && slide ==='0px') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscKey)
    return ()=>{
      document.removeEventListener('keydown', handleEscKey)
    }
  },[onClose,slide])
  return (
    <>
      <div
        className={`fixed inset-0 bg-[var(--blur-background)]/80 backdrop-blur-sm transition-opacity duration-500 z-1010 ${
          slide === '0px' ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      <div
        className="fixed top-0 right-0 h-full shadow-lg bg-[var(--background)] transition-transform duration-600 ease-out sm:rounded-tl-[50px] sm:rounded-bl-[50px] z-1020 flex flex-col sm:w-[450px]  w-full"
        style={{ transform: `translateX(${slide})` }}
      >
        <div
          className="absolute w-12 h-12 top-19 cursor-pointer left-[30px] md:left-[-20px] rounded-[10px] bg-[var(--general-alpha)] flex items-center justify-center z-50"
          onClick={onClose}
        >
          <button className="text-[var(--page-title)] hover:text-gray-700 transition-colors rounded-2xl cursor-pointer">
            <ChevronRight size={30} />
          </button>
        </div>
        <h3
          className={`text-3xl font-semibold text-center bg-[var(--background-alternate)] p-[2rem] sticky top-0 z-10 sm:rounded-tl-[50px]`}
        >
          {title}
        </h3>
        <div className="flex flex-col gap-[1.5rem] p-[2rem] h-full overflow-y-auto pt-[2.5rem]">
          {children}
        </div>

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
