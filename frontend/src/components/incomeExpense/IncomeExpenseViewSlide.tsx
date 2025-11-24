import Slide from '@components/Slide';
import InfoRow from '@components/InfoRow';
import Button from '@components/Button';
import { TransactionFormat, RecurrenceFormat } from '@api/types/transaction';
import Loader from '@components/Loader';
import Success from '@components/Success';
import { DeleteTransactionSuccess } from '@assets/icons';
import { formatDate } from '@utils/formatDate';

interface IncomeExpenseViewSlideProps {
  oneTransaction: TransactionFormat;
  transactionDetail: string;
  cancelOperation: () => void;
  activeRepeatableTransaction: RecurrenceFormat | null;
  deleteTransaction: () => void;
  editIncome: () => void;
  editExpense: () => void;
  loader: boolean;
  deleteSuccess: boolean;
}
export const IncomeExpenseViewSlide = ({
  oneTransaction,
  transactionDetail,
  cancelOperation,
  activeRepeatableTransaction,
  deleteTransaction,
  editIncome,
  editExpense,
  loader,
  deleteSuccess,
}: IncomeExpenseViewSlideProps) => {
  return (
    <Slide
      title={oneTransaction.type == 'income' ? 'Income' : 'Expense'}
      slide={transactionDetail}
      confirmText={deleteSuccess ? 'Close' : 'Delete'}
      onConfirm={deleteSuccess ? cancelOperation : deleteTransaction}
      extralText={deleteSuccess ? 'Done' : 'Edit'}
      onExtra={
        deleteSuccess ? cancelOperation : oneTransaction.type == 'income' ? editIncome : editExpense
      }
      onClose={cancelOperation}
    >
      {loader ? (
        <div className="flex flex-col h-full justify-center">
          <Loader />
        </div>
      ) : deleteSuccess ? (
        <Success title="Deleted Successfully!" p1="All set!" p2={`The item's been deleted.`}>
          <DeleteTransactionSuccess className="w-25 h-25" />
        </Success>
      ) : (
        <>
          <InfoRow label="Title" value={oneTransaction.title} />
          <InfoRow label="Date" value={formatDate(oneTransaction.date, { stringMonth: true })} />
          <InfoRow
            label={`Type of ${oneTransaction.type == 'income' ? 'Income' : 'Expense'}`}
            value={oneTransaction.category || 'Unknown'}
          />
          <InfoRow label="Invoice #" value={oneTransaction.origin} />
          {activeRepeatableTransaction && !activeRepeatableTransaction?.isArchived && (
            <InfoRow label="Repeat" value={activeRepeatableTransaction?.frequency || 'None'} />
          )}

          <div className="flex flex-col p-[1rem] border-[var(--background-alternate)] bg-[var(--background-alternate)] rounded-[1rem] my-[1rem] border">
            <p className='text-[var(--secondary-text)]'>Financial Breakdown</p>
            <InfoRow
              label="Base Amount"
              value={`$ ${String(oneTransaction.baseAmount.toLocaleString())}`}
              hideBorder={true}
            />
            {oneTransaction.type == 'income' && (
              <InfoRow
                label="Tax"
                value={`$ ${String(oneTransaction.taxAmount?.toLocaleString())}`}
                hideBorder={true}
              />
            )}
            <InfoRow
              label={`Total ${oneTransaction.type == 'income' ? 'Income' : 'Expense'}`}
              value={`$ ${String(oneTransaction.totalAmount?.toLocaleString())}`}
              hideBorder={true}
            />
          </div>

          <InfoRow label="Notes" value={oneTransaction.notes} vertical={true} />

          {oneTransaction.attachmentURL && (
            <InfoRow
              label="Attachment"
              // value={oneTransaction.attachmentURL}
              hideBorder={true}
            >
              <a
                href={oneTransaction.attachmentURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primitive-colors-brand-primary-500-base)] underline hover:opacity-80 transition"
              >
                {oneTransaction?.attachmentURL
                  ? oneTransaction.attachmentURL
                      .split('/')
                      .pop()
                      ?.split('?')[0]
                      .split('-')
                      .slice(-2)
                  : 'No attachment'}
              </a>
              {/* <a href={oneTransaction.attachmentURL}>view file</a> */}
              {/* <a href={oneTransaction.attachmentURL}>view file</a> */}
            </InfoRow>
          )}
        </>
      )}
      {/* <Button
          buttonColor='deleteButton'
          width="100%"
          textColor="white"
          onClick={deleteTransaction}
        >
          Delete
        </Button> */}
    </Slide>
  );
};
