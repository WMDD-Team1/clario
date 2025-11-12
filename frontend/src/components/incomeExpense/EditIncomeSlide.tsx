import Slide from '@components/Slide';
import Input from '@components/Input';
import Select from '@components/Select';
import TextArea from '@components/TextArea';
import InfoRow from '@components/InfoRow';
import Loader from '@components/Loader';
import Success from '@components/Success';
import { FileChange, Trash, ClientUpdateSuccess } from '@assets/icons/index';
import { TransactionFormat, TransactionCategory, FormErrors } from '@api/types/transaction';

interface IncomeDetailSlideProps {
  slide: string;
  loader: boolean;
  updateSuccess: boolean;
  transaction: TransactionFormat;
  incomeType: string;
  file: File | null;
  fileName: string;
  incomeCategories: TransactionCategory;
  errors: FormErrors;
  setErrors: (errors: FormErrors) => void;
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
      title="Edit Income"
      slide={slide}
      confirmText={updateSuccess ? 'Close' : 'Cancel'}
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
          p1="Your Income has been updated"
          p2={`Changes saved in Income List`}
        >
          <ClientUpdateSuccess className="w-25 h-25" />
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
            label="Date"
            id="incomeDate"
            type="date"
            color="bg-white"
            value={transaction.date.split('T')[0]}
            onChange={(e) => {
              onTransactionChange({ ...transaction, date: e.target.value });
              setErrors({ ...errors, date: '' });
            }}
            required
          >
            {errors.date && <div style={{ color: 'red' }}>{errors.date}</div>}
          </Input>

          <Select
            label="Type of Income"
            id="incomeType"
            options={incomeCategories.categories}
            value={transaction.category}
            onChange={(value) => {
              onIncomeTypeChange(value);
              onTransactionChange({ ...transaction, category: value });
              setErrors({ ...errors, type: '' });
            }}
            color="bg-white"
            width="100%"
          >
            {errors.type && <div style={{ color: 'red' }}>{errors.type}</div>}
          </Select>

          <Input
            required
            label="Invoice No."
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
              }
              setErrors({ ...errors, baseAmount: '' });
            }}
          >
            <p className="absolute right-[1rem] top-4.5 text-[var(--primitive-colors-brand-primary-500-base)]">CAD</p>
            {errors.baseAmount && <div style={{ color: 'red' }}>{errors.baseAmount}</div>}
          </Input>

          <TextArea
            required
            label="Notes"
            id="incomeNotes"
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
                    ? transaction.attachmentURL.split('/').pop()?.split('?')[0].split('-').slice(-2)
                    : 'No attachment'}
                </a>
              </InfoRow>
            </div>
          )}
        </form>
      )}
    </Slide>
  );
};