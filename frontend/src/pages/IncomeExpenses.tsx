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
          <Button buttonColor='darkButton' onClick={addIncome}>Add Income</Button>
          <Button buttonColor='darkButton' onClick={addExpenses}>Add Expenses</Button>
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
            <Button buttonColor='darkButton'>Browse</Button>
            <Button buttonColor='darkButton' onClick={() => setEvent('incomeDetails')}>Skip</Button>
          </div>
        </>
      )}

      {event == 'incomeDetails' && (
        <>
          <form action="">
            <h2 className='font-bold'>Income Title</h2>
            <Input color="bg-white" label="Income Title" id="incomeTitle" type="input"></Input>
            <Input color="bg-white" label="Date" id="incomeDate" type="Date"></Input>
            <Select
              label="Type of Income"
              id="incomeType"
              options={['Salary', 'Investment', 'Gift', 'Freelance']}
              value={incomeType}
              onChange={setIncomeType}
              color='bg-white'
            />
            {/* <h2>{incomeType}</h2> */}
            <Input color="bg-white" label="Invoice No." id="incomeInvoice" type="input"></Input>
            <Input color="bg-white" label="Base Amount" id="incomeAmount" type="number"></Input>
            <Input color="bg-white" label="Notes" id="incomeNotes" type="input"></Input>
            <div>
              <Button buttonColor='darkButton' type="submit">Add</Button>
              <Button buttonColor='darkButton' onClick={addIncome}>Cancel</Button>
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
            <Button buttonColor='darkButton'>Browse</Button>
            <Button buttonColor='darkButton' onClick={() => setEvent('expensesDetails')}>Skip</Button>
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
              color='bg-white'
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
                    color='bg-white'
                  />
                  {/* <h2>{repeatOption}</h2> */}
                </>
              )}
            </div>
            <Input label="Notes" id="expenseNotes" type="input" />
            <div>
              <Button buttonColor='darkButton' type="submit">Add</Button>
              <Button buttonColor='darkButton' onClick={addExpenses}>Cancel</Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};
