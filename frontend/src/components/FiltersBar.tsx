import SearchBar from './SearchBar';
import SelectionFilter from './SelectionFilter';
import SwitchTab from './SwitchTab';

interface Props {
    currentFilter: string;
    filters: string[];
    onFilter: (filter: string) => void;
    sortOptions: { id: string, label: string }[];
    onSortChange: (option: { id: string, label: string }) => void;
    stageOptions: { id: string, label: string }[];
    onStageChange: (option: { id: string, label: string }) => void;
}

const FiltersBar = ({
    currentFilter,
    filters,
    onFilter,
    sortOptions,
    onSortChange,
    stageOptions,
    onStageChange,
}: Props) => {
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
                    onSearchOpen={() => console.log()} />

                {/* Sort By */}
                <SelectionFilter
                    className="hidden md:block"
                    options={sortOptions}
                    onSelect={onSortChange} />

                {/* Stages */}
                <SelectionFilter
                    className="hidden md:block"
                    options={stageOptions}
                    onSelect={onStageChange} />
            </div>
        </div>
    )
}

export default FiltersBar