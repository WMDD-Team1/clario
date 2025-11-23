import Slide from '@components/Slide';
import Input from '@components/Input';
import { TransactionFilter } from '@api/types/transaction';

interface ExpenseFilterSlideProps {
  slide: string;
  resetFilter: () => void;
  applyFilter: () => void;
  onClose: () => void;
  filterConditions: TransactionFilter;
  setFilterConditions: (conditions: TransactionFilter) => void;
  expenseTypes: string[];
}

export const ExpenseFilterSlide = ({
  slide,
  resetFilter,
  applyFilter,
  onClose,
  filterConditions,
  setFilterConditions,
  expenseTypes,
}: ExpenseFilterSlideProps) => {
  return (
    <Slide
      title="Expense Filters"
      slide={slide}
      confirmText="Reset Filters"
      onConfirm={resetFilter}
      extralText="Apply Filters"
      onExtra={applyFilter}
      onClose={onClose}
    >
      <form className="flex flex-col gap-[2rem]">
        {/* Date Range */}
        <div className="flex flex-col justify-between gap-[1.5rem] border-b-2 pb-[1rem] border-[var(--background-alternate)]">
          <p className="text-[1.2rem] text-[var(--secondary-text)]">Date Range</p>
          <div className="flex flex-row gap-[1rem] justify-between items-center">
            <Input
              type="date"
              label="From"
              color="bg-white"
              value={filterConditions.dateStart}
              onChange={(e) =>
                setFilterConditions({ ...filterConditions, dateStart: e.target.value })
              }
            />
            <Input
              type="date"
              label="To"
              color="bg-white"
              value={filterConditions.dateEnd}
              onChange={(e) =>
                setFilterConditions({ ...filterConditions, dateEnd: e.target.value })
              }
            />
          </div>
        </div>

        {/* Expense Type */}

        {expenseTypes.length !== 0 && <div className="flex flex-col justify-between gap-[1.5rem] border-b-2 pb-[1rem] border-[var(--background-alternate)]">
          <p className="text-[1.2rem] text-[var(--secondary-text)]">Type of Expense</p>
          <div className="flex flex-col gap-[1rem] text-[var(--sub-text)]">
            {expenseTypes.map((type) => (
              <label key={type} className="flex flex-row gap-[1rem]">
                <input
                  type="checkbox"
                  checked={filterConditions.type.includes(type)}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...filterConditions.type, type]
                      : filterConditions.type.filter((item) => item !== type);
                    setFilterConditions({ ...filterConditions, type: newTypes });
                  }}
                />
                {type}
              </label>
            ))}
          </div>
        </div>}

        {/* Amount Range */}
        <div className="flex flex-col justify-between gap-[1.5rem]">
          <p className="text-[1.2rem] text-[var(--secondary-text)]">Amount Range</p>
          <div className="flex flex-row justify-between items-center gap-[1rem]">
            <Input
              type="number"
              label="From"
              color="bg-white"
              padding='pr-[3.5rem]'
              min={0}
              value={filterConditions.amountStart || ''}
              onChange={(e) =>
                setFilterConditions({ ...filterConditions, amountStart: Number(e.target.value) })
              }
            >
              <p className="absolute right-[1rem] top-4.5 text-[var(--primitive-colors-brand-primary-500-base)]">
                CAD
              </p>
            </Input>
            <Input
              type="number"
              label="To"
              color="bg-white"
              padding='pr-[3.5rem]'
              min={0}
              value={filterConditions.amountEnd || ''}
              onChange={(e) =>
                setFilterConditions({ ...filterConditions, amountEnd: Number(e.target.value) })
              }
            >
              <p className="absolute right-[1rem] top-4.5 text-[var(--primitive-colors-brand-primary-500-base)]">
                CAD
              </p>
            </Input>
          </div>
        </div>
      </form>
    </Slide>
  );
};
