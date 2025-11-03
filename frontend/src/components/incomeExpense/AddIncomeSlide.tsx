import Slide from '@components/Slide';
import Input from '@components/Input';
import Select from '@components/Select';
import TextArea from '@components/TextArea';
import InfoRow from '@components/InfoRow';
import Loader from '@components/Loader';
import Success from '@components/Success';
import { FileChange, Trash, TransactionUploadSuccess } from '@assets/icons/index';
import { TransactionFormat, Category } from '@api/types/transaction';

interface IncomeDetailSlideProps {
  slide: string;
  loader: boolean;
  success: boolean;
  transaction: TransactionFormat;
  incomeType: string;
  file: File | null;
  fileName: string;
  incomeCategories: Category[];
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
      confirmText="cancel"
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
        <form className="flex flex-col gap-4">
          <Input
            label="Income Title"
            id="incomeTitle"
            color="bg-white"
            value={transaction.title}
            onChange={(e) => onTransactionChange({ ...transaction, title: e.target.value })}
          />
          <Input
            label="Date"
            id="incomeDate"
            type="date"
            color="bg-white"
            value={transaction.date}
            onChange={(e) => onTransactionChange({ ...transaction, date: e.target.value })}
          />
          <Select
            label="Type of Income"
            id="incomeType"
            options={[
              'Project Payment',
              'Milestone Payment',
              'Consultation Fee',
              'Product Sale',
              'Bonus / Incentive',
            ]}
            value={incomeType}
            onChange={(value) => {
              onIncomeTypeChange(value);
              const categoryId =
                incomeCategories.find((category) => category.name === value)?.id || '';
              onTransactionChange({ ...transaction, categoryId });
            }}
            color="bg-white"
            width="100%"
          />
          <Input
            label="Invoice No."
            id="incomeInvoice"
            color="bg-white"
            value={transaction.origin}
            onChange={(e) => onTransactionChange({ ...transaction, origin: e.target.value })}
          />
          <Input
            label="Amount"
            id="incomeAmount"
            type="number"
            min={0}
            color="bg-white"
            value={transaction.baseAmount}
            onChange={(e) =>
              onTransactionChange({ ...transaction, baseAmount: Number(e.target.value) })
            }
          />
          <TextArea
            label="Notes"
            id="incomeNotes"
            color="bg-white"
            rows={3}
            value={transaction.notes}
            onChange={(e) => onTransactionChange({ ...transaction, notes: e.target.value })}
          />

          {file && (
            <div>
              <InfoRow label="Attachment" value={fileName} />
              <div className="flex gap-[.5rem] items-center justify-end mt-[.1rem]">
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