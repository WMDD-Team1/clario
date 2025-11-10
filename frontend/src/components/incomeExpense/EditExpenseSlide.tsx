import Slide from '@components/Slide';
import Input from '@components/Input';
import Select from '@components/Select';
import TextArea from '@components/TextArea';
import InfoRow from '@components/InfoRow';
import Loader from '@components/Loader';
import Success from '@components/Success';
import {
  FileChange,
  Trash,
  TransactionUploadSuccess,
  ClientUpdateSuccess,
} from '@assets/icons/index';
import {
  TransactionFormat,
  TransactionCategory,
  PostRecurrenceFormat,
} from '@api/types/transaction';

interface ExpenseDetailSlideProps {
  slide: string;
  loader: boolean;
  updateSuccess: boolean;
  transaction: TransactionFormat;
  expenseType: string;
  repeat: boolean;
  repeatOption: string;
  activeRepeatableTransaction: PostRecurrenceFormat | undefined;
  recurrence: PostRecurrenceFormat;
  file: File | null;
  fileName: string;
  expenseCategories: TransactionCategory;
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

export const EditExpenseSlide = ({
  slide,
  loader,
  updateSuccess,
  transaction,
  expenseType,
  repeat,
  repeatOption,
  recurrence,
  file,
  fileName,
  expenseCategories,
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
  activeRepeatableTransaction,
}: ExpenseDetailSlideProps) => {
  const handleBrowseClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <Slide
      title="Edit Expense"
      slide={slide}
      confirmText="Cancel"
      onConfirm={onCancel}
      extralText={updateSuccess ? 'view' : 'Save'}
      onExtra={updateSuccess ? onView : onAdd}
      onClose={onClose}
    >
      {loader ? (
        <div className="flex flex-col h-full justify-center">
          <Loader />
        </div>
      ) : updateSuccess ? (
        <Success
          title="Successful!"
          p1="Your Expense has been recorded"
          p2={`It's saved in Expense List`}
        >
          <ClientUpdateSuccess className="w-25 h-25" />
        </Success>
      ) : (
        <form className="flex flex-col gap-4">
          <Input
            label="Expense Title"
            id="expenseTitle"
            color="bg-white"
            value={transaction.title}
            onChange={(e) => onTransactionChange({ ...transaction, title: e.target.value })}
          />
          <Input
            label="Date"
            id="expenseDate"
            type="date"
            color="bg-white"
            value={transaction.date}
            onChange={(e) => onTransactionChange({ ...transaction, date: e.target.value })}
          />
          <Select
            label="Type of Expense"
            id="expenseType"
            options={expenseCategories.categories}
            value={transaction.type}
            onChange={(value) => {
              onExpenseTypeChange(value);
              onTransactionChange({ ...transaction, category: value });
            }}
            color="bg-white"
            width="100%"
          />
          <Input
            label="Invoice No."
            id="expenseInvoice"
            color="bg-white"
            value={transaction.origin}
            onChange={(e) => onTransactionChange({ ...transaction, origin: e.target.value })}
          />
          <Input
            label="Amount"
            id="expenseAmount"
            type="number"
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
            }}
          >
            <p className="absolute right-[1rem] top-4.5 text-blue-500">CAD</p>
          </Input>

          {/* Recurring Expense */}
          <div className="flex flex-col gap-[1rem]">
            <div className="flex justify-between items-center">
              <p>Make this recurring expense</p>
              <div className="flex items-center gap-2">
                Off
                <div
                  className="w-[45px] h-[20px] border-2 rounded-full flex items-center p-[2px] cursor-pointer border-blue-500"
                  onClick={onRepeatToggle}
                >
                  <div
                    className={`w-[10px] h-[10px] bg-blue-500 rounded-full transition-transform ${
                      repeat ? 'translate-x-[26px]' : ''
                    }`}
                  ></div>
                </div>
                On
              </div>
            </div>

            {repeat && (
              <Select
                label="Recurrence Type"
                id="repeatExpenses"
                options={['Weekly', 'Monthly']}
                value={repeatOption}
                onChange={(value) => {
                  if (repeat) {
                    onRepeatOptionChange(value);
                    onRecurrenceChange({ ...recurrence, frequency: value.toLowerCase() });
                  } else {
                    onRecurrenceChange({ ...recurrence, frequency: '' });
                  }
                }}
                color="bg-white"
                width="100%"
              />
            )}
          </div>

          <TextArea
            label="Notes"
            id="expenseNotes"
            color="bg-white"
            rows={3}
            value={transaction.notes}
            onChange={(e) => onTransactionChange({ ...transaction, notes: e.target.value })}
          />

          {transaction.attachmentURL && (
            <div>
              <InfoRow label="Attachment" hideBorder={true}>
                <a
                  href={transaction.attachmentURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primitive-colors-brand-primary-500-base)] underline hover:opacity-80 transition"
                >
                  {transaction?.attachmentURL
                    ? transaction.attachmentURL
                        .split('/')
                        .pop()
                        ?.split('?')[0]
                        .split('-')
                        .slice(-2)
                    : 'No attachment'}
                </a>
              </InfoRow>
              {/* <div className="flex gap-[.5rem] items-center justify-end mt-[.1rem] text-gray-400">
                <FileChange className="cursor-pointer" onClick={handleBrowseClick} />
                |
                <Trash className="cursor-pointer" onClick={onFileRemove} />
              </div> */}
            </div>
          )}
        </form>
      )}
    </Slide>
  );
};
