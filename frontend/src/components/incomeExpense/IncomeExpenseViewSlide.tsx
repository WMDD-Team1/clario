import Slide from "@components/Slide";
import InfoRow from "@components/InfoRow";
import Button from "@components/Button";
import { TransactionFormat, RecurrenceFormat } from "@api/types/transaction";


interface IncomeExpenseViewSlideProps {
  oneTransaction: TransactionFormat;
  transactionDetail: string;
  cancelOperation: () => void;
  activeRepeatableTransaction: RecurrenceFormat | null;
  deleteTransaction: () => void;
  editIncome: () => void;
  editExpense: () => void;
}
export const IncomeExpenseViewSlide = ({
    oneTransaction,
    transactionDetail,
    cancelOperation,
    activeRepeatableTransaction,
    deleteTransaction,
    editIncome,
    editExpense
}:IncomeExpenseViewSlideProps)=>{
    return(
        <Slide
        title={oneTransaction.type == 'income' ? 'Income' : 'Expense'}
        slide={transactionDetail}
        confirmText="Delete"
        onConfirm={deleteTransaction}
        extralText="Edit"
        onExtra={oneTransaction.type == 'income' ?editIncome: editExpense}
        onClose={cancelOperation}
      >
        <InfoRow label="Title" value={oneTransaction.title} />
        <InfoRow
          label="Date"
          value={new Date(oneTransaction.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          })}
        />
        <InfoRow
          label={`Type of ${oneTransaction.type == 'income' ? 'Income' : 'Expense'}`}
          value ={oneTransaction.category || 'Unknown'}
        />
        <InfoRow label="Invoice #" value={oneTransaction.origin} />
        {activeRepeatableTransaction && (
          <InfoRow label="Repeat" value={activeRepeatableTransaction.frequency} />
        )}

        <div className="flex flex-col p-[1rem] border-gray-200 bg-blue-50 rounded-[1rem] my-[1rem]">
          <p>Financial Breakdown</p>
          <InfoRow
            label="Base Amount"
            value={`$ ${String(oneTransaction.baseAmount.toLocaleString())}`}
            hideBorder={true}
          />
          <InfoRow
            label="Tax(5%)"
            value={`$ ${String(((Number(oneTransaction.baseAmount) * 5) / 100).toLocaleString())}`}
            hideBorder={true}
          />
          <InfoRow
            label="Total Income"
            value={`$ ${String(((Number(oneTransaction.baseAmount) * 105) / 100).toLocaleString())}`}
            hideBorder={true}
          />
        </div>

        <InfoRow
        label="Notes"
        value={oneTransaction.notes}
        vertical={true} />

        <InfoRow
        label="Attachment"
        value={oneTransaction.attachmentURL}
        hideBorder={true}
        />
        {/* <Button
          buttonColor='deleteButton'
          width="100%"
          textColor="white"
          onClick={deleteTransaction}
        >
          Delete
        </Button> */}
      </Slide>
    )
}