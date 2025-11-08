import Slide from '@components/Slide';
import Input from '@components/Input';
import Select from '@components/Select';
import TextArea from '@components/TextArea';
import InfoRow from '@components/InfoRow';
import Loader from '@components/Loader';
import Success from '@components/Success';
import { FileChange, Trash, ClientUpdateSuccess } from '@assets/icons/index';
import { TransactionFormat, TransactionCategory } from '@api/types/transaction';

interface IncomeDetailSlideProps {
  slide: string;
  loader: boolean;
  updateSuccess: boolean;
  transaction: TransactionFormat;
  incomeType: string;
  file: File | null;
  fileName: string;
  incomeCategories: TransactionCategory;
  onTransactionChange: (transaction: TransactionFormat) => void;
  onIncomeTypeChange: (value: string) => void;
  onCancel: () => void;
  onAdd: () => void;
  onView: () => void;
  onClose: () => void;
  onFileRemove: () => void;
}

export const EditIncomeSlide = ({
  slide,
  loader,
  updateSuccess,
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
      title="Edit Income"
      slide={slide}
      confirmText={updateSuccess?"Close":"Cancel"}
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
          p1="Your Income has been recorded"
          p2={`It's saved in Income List`}
        >
          <ClientUpdateSuccess className="w-25 h-25" />
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
            value={new Date(transaction.date).toLocaleDateString('en-CA')}
            onChange={(e) => onTransactionChange({ ...transaction, date: e.target.value })}
          />
          <Select
            label="Type of Income"
            id="incomeType"
            options={incomeCategories.categories}
            value={transaction.category}
            onChange={(value) => {
              onIncomeTypeChange(value);
              onTransactionChange({ ...transaction, category:value });
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
            padding='pr-[3.5rem]'
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
          <TextArea
            label="Notes"
            id="incomeNotes"
            color="bg-white"
            rows={3}
            value={transaction.notes}
            onChange={(e) => onTransactionChange({ ...transaction, notes: e.target.value })}
          />

          {transaction.attachmentURL && (
            <div>
              <InfoRow
              label="Attachment"
              value={transaction.attachmentURL}
              hideBorder={true}
              />
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
