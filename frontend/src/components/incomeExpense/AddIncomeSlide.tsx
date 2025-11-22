import Slide from '@components/Slide';
import Input from '@components/Input';
import Select from '@components/Select';
import TextArea from '@components/TextArea';
import InfoRow from '@components/InfoRow';
import Loader from '@components/Loader';
import Success from '@components/Success';
import { FileChange, Trash, TransactionUploadSuccess } from '@assets/icons/index';
import { TransactionFormat, TransactionCategory, FormErrors } from '@api/types/transaction';

interface IncomeDetailSlideProps {
  slide: string;
  loader: boolean;
  success: boolean;
  transaction: TransactionFormat;
  incomeType: string;
  file: File | null;
  fileName: string;
  errors: FormErrors;
  incomeCategories: TransactionCategory;
  setErrors: (errors: FormErrors) => void;
  onTransactionChange: (transaction: TransactionFormat) => void;
  onIncomeTypeChange: (value: string) => void;
  onCancel: () => void;
  onAdd: () => void;
  onView: () => void;
  onClose: () => void;
  onFileRemove: () => void;
}

export const AddIncomeSlide = ({
  slide,
  loader,
  success,
  transaction,
  incomeType,
  file,
  fileName,
  incomeCategories,
  errors,
  setErrors,
  onTransactionChange,
  onIncomeTypeChange,
  onCancel,
  onAdd,
  onView,
  onClose,
  onFileRemove,
}: IncomeDetailSlideProps) => {
  const handleBrowseClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <Slide
      title="Add Income"
      slide={slide}
      confirmText="Cancel"
      onConfirm={onCancel}
      extralText={success ? 'view' : 'Add'}
      onExtra={success ? onView : onAdd}
      onClose={onClose}
    >
      {loader ? (
        <div className="flex flex-col h-full justify-center">
          <Loader />
        </div>
      ) : success ? (
        <Success
          title="Successful!"
          p1="Your Income has been recorded"
          p2={`It's saved in Income List`}
        >
          <TransactionUploadSuccess className="w-25 h-25" />
        </Success>
      ) : (
        <form className="flex flex-col gap-[1.5rem]">
          <Input
            label="Income Title"
            id="incomeTitle"
            color="bg-white"
            value={transaction.title}
            onChange={(e) => {
              onTransactionChange({ ...transaction, title: e.target.value });
              setErrors({ ...errors, title: '' });
            }}
            required
          >
            {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}
          </Input>
          <Input
            required
            label="Date"
            id="incomeDate"
            type="date"
            color="bg-white"
            value={transaction.date.split('T')[0]}
            onChange={(e) => {
              onTransactionChange({ ...transaction, date: e.target.value });
              setErrors({ ...errors, date: '' });
            }}
          >
            {errors.date && <div style={{ color: 'red' }}>{errors.date}</div>}
          </Input>
          <Select
            label="Type of Income"
            id="incomeType"
            options={incomeCategories.categories}
            value={incomeType}
            onChange={(value) => {
              onIncomeTypeChange(value);
              onTransactionChange({ ...transaction, category: value });
              setErrors({ ...errors, date: '' });
            }}
            color="bg-white"
            width="100%"
          >
            {errors.type && <div style={{ color: 'red' }}>{errors.type}</div>}
          </Select>
          <Input
            required
            label="Invoice No."
            type='number'
            min={0}
            onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
            id="incomeInvoice"
            color="bg-white"
            value={transaction.origin}
            onChange={(e) => {
              onTransactionChange({ ...transaction, origin: e.target.value });
              setErrors({ ...errors, origin: '' });
            }}
          >
            {errors.origin && <div style={{ color: 'red' }}>{errors.origin}</div>}
          </Input>
          <Input
            required
            label="Amount"
            id="incomeAmount"
            type="number"
            inputMode="decimal"
            onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
            padding="pr-[3.5rem]"
            // min={0}
            color="bg-white"
            value={transaction.baseAmount}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || Number(val) >= 0) {
                onTransactionChange({
                  ...transaction,
                  baseAmount: val === '' ? '' : Number(val),
                });
              }
              setErrors({ ...errors, baseAmount: '' });
            }}
          >
            <p className="absolute right-[1rem] top-4.5 text-[var(--primitive-colors-brand-primary-500-base)]">
              CAD
            </p>
            {errors.baseAmount && <div style={{ color: 'red' }}>{errors.baseAmount}</div>}
          </Input>
          <TextArea
            required
            label="Notes"
            id="incomeNotes"
            color="bg-white"
            rows={3}
            value={transaction.notes}
            onChange={(e) => onTransactionChange({ ...transaction, notes: e.target.value })}
          >
            {errors.notes && <div style={{ color: 'red' }}>{errors.notes}</div>}
          </TextArea>

          {file && (
            <div>
              <InfoRow label="Attachment" value={fileName} hideBorder={true} />
              <div className="flex gap-[.5rem] items-center justify-end mt-[.1rem] text-[var(--primitive-colors-gray-light-mode-400)]">
                <FileChange className="cursor-pointer" onClick={handleBrowseClick} />
                |
                <Trash className="cursor-pointer" onClick={onFileRemove} />
              </div>
            </div>
          )}
        </form>
      )}
    </Slide>
  );
};
