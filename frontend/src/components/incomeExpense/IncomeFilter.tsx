import Slide from '@components/Slide';
import Input from '@components/Input';
import Select from '@components/Select';
import TextArea from '@components/TextArea';
import InfoRow from '@components/InfoRow';
import Loader from '@components/Loader';
import Success from '@components/Success';
import { FileChange, Trash, TransactionUploadSuccess } from '@assets/icons/index';
import { TransactionFormat, TransactionCategory, TransactionFilter } from '@api/types/transaction';

interface IncomeFilterSlideProps {
  slide: string;
  resetFilter: () => void;
  applyFilter: () => void;
  onClose: () => void;
  filterConditions: TransactionFilter;
  setFilterConditions: (conditions: TransactionFilter) => void;
  incomeTypes: string[];
}

export const IncomeFilterSlide = ({
  slide,
  resetFilter,
  applyFilter,
  onClose,
  filterConditions,
  setFilterConditions,
  incomeTypes,
}: IncomeFilterSlideProps) => {
  return (
    <Slide
      title="Income Filters"
      slide={slide}
      confirmText="Reset Filters"
      onConfirm={resetFilter}
      extralText={'Apply Filters'}
      onExtra={applyFilter}
      onClose={onClose}
    >
      <form className="flex flex-col gap-[2rem]">
        <div className="flex flex-col justify-between gap-[1.5rem] border-b-2 pb-[1rem] border-[var(--primitive-colors-gray-light-mode-200)]">
          <p className="text-[1.2rem]">Date Range</p>
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

        <div className="flex flex-col justify-between gap-[1.5rem] border-b-2 pb-[1rem] border-[var(--primitive-colors-gray-light-mode-200)]">
          <p className="text-[1.2rem]">Type of Income</p>
          <div className="flex flex-col gap-[1rem]">
            {incomeTypes.map((type,index) => (
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
                  ></input>
                  {type}
                </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-[1.5rem]">
          <p className="text-[1.2rem]">Amount Range</p>
          <div className="flex flex-row justify-between items-center gap-[1rem]">
            <Input
              type="number"
              label="From"
              color="bg-white"
              padding='pr-[3.5rem]'
              min={0}
              value={filterConditions.amountStart || ''}
              onChange={(e) =>
                setFilterConditions({ ...filterConditions, amountStart: Number(e.target.value)})
              }>
                <p className="absolute right-[1rem] top-4.5 text-[var(--primitive-colors-brand-primary-500-base)]">CAD</p>
            </Input>
            <Input
              type="number"
              label="To"
              color="bg-white"
              padding='pr-[3.5rem]'
              min={0}
              value={filterConditions.amountEnd || ''}
              onChange={(e) =>
                setFilterConditions({ ...filterConditions, amountEnd: Number(e.target.value)})
              }>
                <p className="absolute right-[1rem] top-4.5 text-[var(--primitive-colors-brand-primary-500-base)]">CAD</p>
            </Input>
          </div>
        </div>
      </form>
    </Slide>
  );
};
