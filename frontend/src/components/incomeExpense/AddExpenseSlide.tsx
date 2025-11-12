import Slide from '@components/Slide';
import Input from '@components/Input';
import Select from '@components/Select';
import TextArea from '@components/TextArea';
import InfoRow from '@components/InfoRow';
import Loader from '@components/Loader';
import Success from '@components/Success';
import { FileChange, Trash, TransactionUploadSuccess } from '@assets/icons/index';
import {
  TransactionFormat,
  TransactionCategory,
  PostRecurrenceFormat,
  FormErrors,
} from '@api/types/transaction';

interface ExpenseDetailSlideProps {
  slide: string;
  loader: boolean;
  success: boolean;
  transaction: TransactionFormat;
  expenseType: string;
  repeat: boolean;
  repeatOption: string;
  recurrence: PostRecurrenceFormat;
  file: File | null;
  fileName: string;
  expenseCategories: TransactionCategory;
  errors: FormErrors;
  setErrors: (errors: FormErrors) => void;
  onTransactionChange: (transaction: TransactionFormat) => void;
  onExpenseTypeChange: (value: string) => void;
  onRepeatToggle: () => void;
  onRepeatOptionChange: (value: string) => void;
  onRecurrenceChange: (recurrence: PostRecurrenceFormat) => void;
  onCancel: () => void;
  onAdd: () => void;
  onView: () => void;
  onClose: () => void;
  onFileRemove: () => void;
}

export const AddExpenseSlide = ({
  slide,
  loader,
  success,
  transaction,
  expenseType,
  repeat,
  repeatOption,
  recurrence,
  file,
  fileName,
  expenseCategories,
  errors,
  setErrors,
  onTransactionChange,
  onExpenseTypeChange,
  onRepeatToggle,
  onRepeatOptionChange,
  onRecurrenceChange,
  onCancel,
  onAdd,
  onView,
  onClose,
  onFileRemove,
}: ExpenseDetailSlideProps) => {
  const handleBrowseClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <Slide
      title="Add Expense"
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
          p1="Your Expense has been recorded"
          p2={`It's saved in Expense List`}
        >
          <TransactionUploadSuccess className="w-25 h-25" />
        </Success>
      ) : (
        <form className="flex flex-col gap-[1.5rem]">
          {/* Title */}
          <Input
            required
            label="Expense Title"
            id="expenseTitle"
            color="bg-white"
            value={transaction.title}
            onChange={(e) => {
              onTransactionChange({ ...transaction, title: e.target.value });
              setErrors({ ...errors, title: '' });
            }}
          >
            {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}
          </Input>

          {/* Date */}
          <Input
            required
            label="Date"
            id="expenseDate"
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

          {/* Type */}
          <Select
            label="Type of Expense"
            id="expenseType"
            options={expenseCategories.categories}
            value={expenseType}
            onChange={(value) => {
              onExpenseTypeChange(value);
              onTransactionChange({ ...transaction, category: value });
              setErrors({ ...errors, type: '' });
            }}
            color="bg-white"
            width="100%"
          >
            {errors.type && <div style={{ color: 'red' }}>{errors.type}</div>}
          </Select>

          {/* Invoice No */}
          <Input
            required
            label="Invoice No."
            id="expenseInvoice"
            color="bg-white"
            value={transaction.origin}
            onChange={(e) => {
              onTransactionChange({ ...transaction, origin: e.target.value });
              setErrors({ ...errors, origin: '' });
            }}
          >
            {errors.origin && <div style={{ color: 'red' }}>{errors.origin}</div>}
          </Input>

          {/* Amount */}
          <Input
            required
            label="Amount"
            id="expenseAmount"
            type="number"
            padding="pr-[3.5rem]"
            color="bg-white"
            value={transaction.baseAmount}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || Number(val) >= 0) {
                onTransactionChange({
                  ...transaction,
                  baseAmount: val === '' ? '' : Number(val),
                });
                setErrors({ ...errors, baseAmount: '' });
              }
            }}
          >
            <p className="absolute right-[1rem] top-4.5 text-[var(--primitive-colors-brand-primary-500-base)]">
              CAD
            </p>
            {errors.baseAmount && <div style={{ color: 'red' }}>{errors.baseAmount}</div>}
          </Input>

          {/* Recurring Expense */}
          <div className="flex flex-col gap-[1rem]">
            <div className="flex justify-between items-center">
              <p>Make this recurring expense</p>
              <div className="flex items-center gap-2">
                Off
                <div
                  className="w-[45px] h-[20px] border-2 rounded-full flex items-center p-[2px] cursor-pointer border-[var(--primitive-colors-brand-primary-500-base)]"
                  onClick={onRepeatToggle}
                >
                  <div
                    className={`w-[10px] h-[10px] bg-[var(--primitive-colors-brand-primary-500-base)] rounded-full transition-transform ${
                      repeat ? 'translate-x-[26px]' : ''
                    }`}
                  ></div>
                </div>
                On
              </div>
            </div>

            <div
              className={`${repeat ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'} transition-all`}
            >
              <Select
                label="Recurrence Type"
                id="repeatExpenses"
                options={['Weekly', 'Monthly']}
                value={repeatOption}
                onChange={(value) => {
                  if (repeat) {
                    onRepeatOptionChange(value);
                    onRecurrenceChange({ ...recurrence, frequency: value.toLowerCase() });
                    setErrors({ ...errors, recurrence: '' });
                  } else {
                    onRecurrenceChange({ ...recurrence, frequency: '' });
                  }
                }}
                color="bg-white"
                width="100%"
              >
                {errors.recurrence && <div style={{ color: 'red' }}>{errors.recurrence}</div>}
              </Select>
            </div>
          </div>

          {/* Notes */}
          <TextArea
            required
            label="Notes"
            id="expenseNotes"
            color="bg-white"
            rows={3}
            value={transaction.notes}
            onChange={(e) => {
              onTransactionChange({ ...transaction, notes: e.target.value });
              setErrors({ ...errors, notes: '' });
            }}
          >
            {errors.notes && <div style={{ color: 'red' }}>{errors.notes}</div>}
          </TextArea>

          {/* File */}
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
