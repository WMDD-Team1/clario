import Slide from "@components/Slide";
import InfoRow from "@components/InfoRow";
import Button from "@components/Button";
import { TransactionFormat, categoriesResonse, RecurrenceFormat } from "@api/types/transaction";


interface IncomeExpenseViewSlideProps {
  oneTransaction: TransactionFormat;
  transactionDetail: string;
  cancelOperation: () => void;
  allCategories: categoriesResonse;
  activeRepeatableTransaction: RecurrenceFormat | null;
  deleteTransaction: () => void;
  editIncome: () => void;
  editExpense: () => void;
}
export const IncomeExpenseViewSlide = ({
    oneTransaction,
    transactionDetail,
    cancelOperation,
    allCategories,
    activeRepeatableTransaction,
    deleteTransaction,
    editIncome,
    editExpense
}:IncomeExpenseViewSlideProps)=>{
    return(
        <Slide
        title={oneTransaction.type == 'income' ? 'Income' : 'Expense'}
        slide={transactionDetail}
        confirmText="Close"
        onConfirm={cancelOperation}
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
          value={
            oneTransaction.type == 'income'
              ? allCategories.income.find(
                  (incomeCategory) => oneTransaction.categoryId == incomeCategory.id,
                )?.name || 'Unknown'
              : allCategories.expense.find(
                  (expenseCategory) => oneTransaction.categoryId == expenseCategory.id,
                )?.name || 'Unknown'
          }
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
          />
          <InfoRow
            label="Tax(5%)"
            value={`$ ${String(((Number(oneTransaction.baseAmount) * 5) / 100).toLocaleString())}`}
          />
          <InfoRow
            label="Total Income"
            value={`$ ${String(((Number(oneTransaction.baseAmount) * 105) / 100).toLocaleString())}`}
          />
        </div>

        <InfoRow label="Notes" value={oneTransaction.notes} vertical={true} />
        <InfoRow label="Attachment" value={oneTransaction.attachmentURL} />
        <Button
          buttonColor='deleteButton'
          width="100%"
          textColor="white"
          onClick={deleteTransaction}
        >
          Delete
        </Button>
      </Slide>
    )
}