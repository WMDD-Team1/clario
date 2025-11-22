import { Search } from 'lucide-react'; // modern lightweight icons
import React from 'react';

interface Props {
  needCollapse?: boolean;
  isSearchOpen: boolean;
  placeholder?: string;
  searchValue?: string;
  onSearchOpen: (i: boolean) => void;
  onChange: (search: string) => void;
  children?: React.ReactNode;
}

export default function SearchBar({
  needCollapse = true,
  isSearchOpen,
  placeholder = 'Search...',
  searchValue = '',
  onSearchOpen,
  onChange,
  children,
}: Props) {
  return (
    <div
      className={
        !needCollapse
          ? ''
          : `flex items-center justify-center gap-5 transition-all duration-300 ${
              isSearchOpen ? 'flex-1' : ''
            }`
      }
    >
      {/* Search icon (mobile) */}
      <button
        onClick={() => onSearchOpen(!isSearchOpen)}
        className={`block  text-[var(--primitive-colors-brand-primary-500-base)] ${needCollapse ? 'md:hidden' : 'hidden'}`}
      >
        <Search size={22} />
      </button>

      {/* Search bar (hidden on mobile unless open) */}
      <div
        className={`${
          !needCollapse
            ? 'flex items-center bg-[var(--background-toggle2)] border border-[var(--sublight)] rounded-[20px] px-4 py-4 relative'
            : isSearchOpen
              ? 'flex absolute left-0 right-0 mx-6 bg-[var(--background-toggle2)] border border-[var(--sublight)] rounded-[15px] px-4 py-4 items-center z-10 md:relative md:left-auto md:right-auto md:mx-0'
              : 'hidden md:flex items-center bg-[var(--background-toggle2)] w-[300px] h-[46px] border border-[var(--sublight)] rounded-[20px] px-4 py-4 relative'
        }`}
      >
        <Search className="text-blue-500 w-5 h-5 mr-3" strokeWidth={2} />
        <input
          type="text"
          placeholder={placeholder}
          className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm"
          autoFocus={isSearchOpen}
          value={searchValue ?? ''}
          onChange={(event) => onChange(event.target.value)}
        />
        {/* Close button (only when expanded on mobile) */}
        {(isSearchOpen || searchValue) && (
          <button
            onClick={() => {
              onSearchOpen(false);
              onChange('');
            }}
            className="ml-3 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}

        {children && <div className="absolute top-full left-0 w-full mt-1">{children}</div>}
      </div>
    </div>
  );
}
