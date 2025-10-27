import SearchBar from './SearchBar';
import SelectionFilter from './SelectionFilter';
import SwitchTab from './SwitchTab';

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
    stageOptions: Option[];
    selectedStage: Option;
    onStageChange: (option: Option) => void;

    // Search
    searchValue?: string;
    onSearchChange: (value: string) => void;
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
}: FiltersBarProps) => {
    return (
        <div className="flex flex-col items-center mb-6 md:flex-row md:justify-between">
            {/* Left Filter Group */}
            <SwitchTab
                currentFilter={currentFilter}
                filters={filters}
                onFilter={onFilter} />

            {/* Right Controls */}
            <div className="w-full gap-3 mt-4 md:mt-0 md:flex md:w-auto md:items-center">
                {/* Search */}
                <SearchBar
                    needCollapse={false}
                    isSearchOpen={false}
                    placeholder="Search by project name or client..."
                    onSearchOpen={() => console.log()}
                    onChange={onSearchChange}
                    searchValue={searchValue} />

                {/* Sort By */}
                <SelectionFilter
                    className="hidden md:block"
                    selectedValue={selectedSort}
                    options={sortOptions}
                    onSelect={onSortChange} />

                {/* Stages */}
                <SelectionFilter
                    className="hidden md:block"
                    selectedValue={selectedStage}
                    options={stageOptions}
                    onSelect={onStageChange} />
            </div>
        </div>
    )
}

export default FiltersBar