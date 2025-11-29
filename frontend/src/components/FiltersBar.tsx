import SearchBar from './SearchBar';
import SelectionFilter from './SelectionFilter';
import SwitchTab from './SwitchTab';
import { MenuScale } from '@assets/icons';
import { useState } from 'react';

// 💡 Reusable type for dropdown options
interface Option {
  id: string;
  label: string;
}

interface FiltersBarProps {
  // Tabs (All / Active / Archived)
  currentFilter: string;
  filters: string[];
  onFilter: (filter: string) => void;

  // Sorting
  sortOptions: Option[];
  selectedSort: Option;
  onSortChange: (option: Option) => void;

  // Stages
  stageOptions?: Option[];
  selectedStage?: Option;
  onStageChange?: (option: Option) => void;

  // Search
  searchValue?: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
}

const FiltersBar = ({
  currentFilter,
  filters,
  onFilter,
  sortOptions,
  selectedSort,
  onSortChange,
  stageOptions,
  selectedStage,
  onStageChange,
  searchValue,
  onSearchChange,
  searchPlaceholder,
}: FiltersBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState('');

  return (
    <div className="flex flex-col items-center mb-6 md:flex-row md:justify-between md:flex-wrap gap-[1rem]">
      {/* Left Filter Group */}
      <SwitchTab currentFilter={currentFilter} filters={filters} onFilter={onFilter} />

      {/* Right Controls */}
      <div className="w-full gap-3 mt-4 md:mt-0 md:flex md:w-auto md:items-center relative">
        {/* Search */}
        <SearchBar
          needCollapse={false}
          isSearchOpen={false}
          placeholder={searchPlaceholder || 'Search by project name or client...'}
          onSearchOpen={() => console.log()}
          onChange={onSearchChange}
          searchValue={searchValue}
        ></SearchBar>

        {/* Sort By */}
        <SelectionFilter
          className="hidden md:block"
          value={selectedSort}
          options={sortOptions}
          onChange={onSortChange}
        />

        <MenuScale
          className="absolute right-3 md:hidden block bottom-2 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        {isMenuOpen && (
            <>
            <div
            className='fixed inset-0'
            onClick={()=>setIsMenuOpen(false)}
            ></div>
            <div className="absolute right-0 mt-2 w-48 bg-[var(--background-toggle2)] shadow-lg z-20 rounded-[1rem] md:hidden block cursor-pointer overflow-hidden text-[var(--tertiary-text)]">
            {sortOptions.map((option) => (
              <div
                key={option.id}
                className={`cursor-pointer px-4 py-2 ${selectedOptionId == option.id ?'bg-[var(--background-alternate)]' : 'hover:bg-blue-100'}`}
                onClick={() => {
                  onSortChange(option);
                  setIsMenuOpen(false);
                  setSelectedOptionId(option.id)
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
            </>

        )}

        {/* Stages */}
        {stageOptions && selectedStage && onStageChange && (
          <SelectionFilter
            className="hidden md:block"
            value={selectedStage}
            options={stageOptions}
            onChange={onStageChange}
          />
        )}
      </div>
    </div>
  );
};

export default FiltersBar;
