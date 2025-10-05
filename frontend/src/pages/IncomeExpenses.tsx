import { use, useState } from 'react';
import Button from '../components/Button';
import Input from '@components/Input';
import Select from '@components/Select';

export const IncomeExpenses = () => {
  const [event, setEvent] = useState('');
  const [incomeType, setIncomeType] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [repeatOption, setRepeatOption] = useState('');
  const [repeat, setRepeat] = useState(false);
  const addIncome = () => setEvent('addIncome');
  const addExpenses = () => setEvent('addExpenses');

  return (
    <>
      {event == '' && (
        <>
          <Button onClick={addIncome}>Add Income</Button>
          <Button onClick={addExpenses}>Add Expenses</Button>
        </>
      )}
      {event == 'addIncome' && (
        <>
          <h2 className='font-bold'>Add Income</h2>
          <p>Add your Income Receipt here</p>
          <div>
            <i></i>
            <p>Choose a file or drag & drop it here</p>
            <p>JPG, PNG or PDF formats up to 5MB</p>
          </div>
          <div>
            <Button>Browse</Button>
            <Button onClick={() => setEvent('incomeDetails')}>Skip</Button>
          </div>
        </>
      )}

      {event == 'incomeDetails' && (
        <>
          <form action="">
            <h2 className='font-bold'>Income Title</h2>
            <Input label="Income Title" id="incomeTitle" type="input"></Input>
            <Input label="Date" id="incomeDate" type="Date"></Input>
            <Select
              label="Type of Income"
              id="incomeType"
              options={['Salary', 'Investment', 'Gift', 'Freelance']}
              value={incomeType}
              onChange={setIncomeType}
            />
            {/* <h2>{incomeType}</h2> */}
            <Input label="Invoice No." id="incomeInvoice" type="input"></Input>
            <Input label="Base Amount" id="incomeAmount" type="number"></Input>
            <Input label="Notes" id="incomeNotes" type="input"></Input>
            <div>
              <Button type="submit">Add</Button>
              <Button onClick={addIncome}>Cancel</Button>
            </div>
          </form>
        </>
      )}

      {event == 'addExpenses' && (
        <>
          <h2 className='font-bold'>Add Expenses</h2>
          <p>Add your Expenses Receipt here</p>
          <div>
            <i></i>
            <p>Choose a file or drag & drop it here</p>
            <p>JPG, PNG or PDF formats up to 5MB</p>
          </div>
          <div>
            <Button>Browse</Button>
            <Button onClick={() => setEvent('expensesDetails')}>Skip</Button>
          </div>
        </>
      )}

      {event === 'expensesDetails' && (
        <>
          <form action="">
            <h2 className='font-bold'>Expense Title</h2>
            <Input label="Expense Title" id="expenseTitle" type="input" />
            <Input label="Date" id="expenseDate" type="Date" />
            <Select
              label="Type of Expense"
              id="expenseType"
              options={['Food', 'Rent', 'Transportation', 'Entertainment', 'Others']}
              value={expenseType}
              onChange={setExpenseType}
            />
            {/* <h2>{expenseType}</h2> */}
            <Input label="Invoice No." id="expenseInvoice" type="input" />
            <Input label="Base Amount" id="expenseAmount" type="number" />
            <div>
              <p>Make this recurring expense</p>
              <div>
                Off <i onClick={() => setRepeat(repeat ? false : true)}>[]</i>On
              </div>
              {repeat && (
                <>
                  <Select
                    label="Repeat Options"
                    id="repeatExpenses"
                    options={['Daily', 'Weekly', 'Monthly', 'Yearly']}
                    value={repeatOption}
                    onChange={setRepeatOption}
                  />
                  {/* <h2>{repeatOption}</h2> */}
                </>
              )}
            </div>
            <Input label="Notes" id="expenseNotes" type="input" />
            <div>
              <Button type="submit">Add</Button>
              <Button onClick={addExpenses}>Cancel</Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};
