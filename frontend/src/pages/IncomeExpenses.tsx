import { use, useState } from 'react';
import Button from '../components/Button';
import Input from '@components/Input';
import Select from '@components/Select';
import { fontSizeOptions } from '@components/style/font';

export const IncomeExpenses = () => {
  const [event, setEvent] = useState('');
  const [incomeType, setIncomeType] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [repeatOption, setRepeatOption] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [incomeSlide, setIncomeSlide] = useState('100%');
  const [expenseSlide, setExpenseSlide] = useState('100%');
  const [inDetailSlide, setIndetailSlide] = useState('100%');
  const [exDetailSlide, setExdetailSlide] = useState('100%');

  // const [rollBall, setRollBall] = useState('');

  const addIncome = () => {
    reset();
    setIncomeSlide('0px');
    // setExpenseSlide('100%');
    // setExdetailSlide('100%');
  };
  const addExpenses = () => {
    reset();
    setExpenseSlide('0px');
    // setIncomeSlide('100%');
    // setIndetailSlide('100%');
  };
  const incomeDetail = () => {
    // setIncomeSlide('100%');
    setIndetailSlide('0px');
  };
  const expenseDetail = () => {
    // setExpenseSlide('100%');
    setExdetailSlide('0px');
  };

  const cancelOperation = () => {
    reset();
  };

  // -Reset-form---------------------------
  const reset = () => {
    setIndetailSlide('100%');
    setExdetailSlide('100%');
    setIncomeSlide('100%');
    setExpenseSlide('100%');
    setRepeat(false);
    // setRollBall('');
  };

  const viewLists = () => setEvent('viewLists');

  return (
    <div>
      <>
        <Button buttonColor="regularButton" onClick={addIncome}>
          Add Income
        </Button>
        <Button buttonColor="regularButton" onClick={addExpenses}>
          Add Expenses
        </Button>
        <Button buttonColor="regularButton" onClick={viewLists}>
          View All
        </Button>
      </>

      <div
        className={`fixed top-0 right-0 h-full shadow-lg bg-white transition-transform duration-300 rounded-tl-[20px] rounded-bl-[20px] p-[1rem]`}
        style={{ transform: `translateX(${incomeSlide})`, width: '400px' }}
      >
        <h2 className={`text-[${fontSizeOptions.h2}] text-center bg-white`}>Add Income</h2>
        <p>Add your Income Receipt here</p>
        <div>
          <i></i>
          <p>Choose a file or drag & drop it here</p>
          <p>JPG, PNG or PDF formats up to 5MB</p>
        </div>
        <div className="flex flex-row justify-center gap-[1rem] mt-[2rem]">
          <Button buttonColor="regularButton" width="100%">
            Browse
          </Button>
          <Button buttonColor="regularButton" width="100%" onClick={incomeDetail}>
            Skip
          </Button>
        </div>
      </div>

      {/* Income form-------------------- */}
      <div
        className={`fixed top-0 right-0 h-full shadow-lg bg-white transition-transform duration-300 rounded-tl-[20px] rounded-bl-[20px] p-[1rem]`}
        style={{ transform: `translateX(${inDetailSlide})`, width: '400px' }}
      >
        <form action="" className="flex flex-col gap-4">
          <h2 className={`text-[${fontSizeOptions.h2}] text-center bg-white`}>Income Title</h2>
          <Input color="bg-white" label="Income Title" id="incomeTitle" type="input"></Input>
          <Input color="bg-white" label="Date" id="incomeDate" type="Date"></Input>
          <Select
            label="Type of Income"
            id="incomeType"
            options={['Salary', 'Investment', 'Gift', 'Freelance']}
            value={incomeType}
            onChange={setIncomeType}
            color="bg-white"
            width="100%"
          />
          {/* <h2>{incomeType}</h2> */}
          <Input color="bg-white" label="Invoice No." id="incomeInvoice" type="input"></Input>
          <Input
            color="bg-white"
            label="Base Amount"
            id="incomeAmount"
            type="number"
            min={0}
          ></Input>
          <Input color="bg-white" label="Notes" id="incomeNotes" type="input"></Input>
          <div className="flex flex-row justify-center gap-[1rem] mt-[2rem]">
            <Button buttonColor="regularButton" type="submit" width="100%">
              Add
            </Button>
            <Button buttonColor="regularButton" onClick={cancelOperation} width="100%">
              Cancel
            </Button>
          </div>
        </form>
      </div>

      <div
        className={`fixed top-0 right-0 h-full shadow-lg bg-white transition-transform duration-300 rounded-tl-[20px] rounded-bl-[20px] p-[1rem]`}
        style={{ transform: `translateX(${expenseSlide})`, width: '400px' }}
      >
        <h2 className={`text-[${fontSizeOptions.h2}] text-center bg-white`}>Add Expenses</h2>
        <p>Add your Expenses Receipt here</p>
        <div>
          <i></i>
          <p>Choose a file or drag & drop it here</p>
          <p>JPG, PNG or PDF formats up to 5MB</p>
        </div>
        <div className="flex flex-row justify-center gap-[1rem] mt-[2rem]">
          <Button buttonColor="regularButton" width="100%">
            Browse
          </Button>
          <Button buttonColor="regularButton" onClick={expenseDetail} width="100%">
            Skip
          </Button>
        </div>
      </div>

      {/* Expenses Form----------- */}
      <div
        className={`fixed top-0 right-0 h-full shadow-lg bg-white transition-transform duration-300 rounded-tl-[20px] rounded-bl-[20px] p-[1rem]`}
        style={{ transform: `translateX(${exDetailSlide})`, width: '400px' }}
      >
        <form action="" className="flex flex-col gap-4">
          <h2 className={`text-[${fontSizeOptions.h2}] text-center bg-white`}>Expense Title</h2>
          <Input color="bg-white" label="Expense Title" id="expenseTitle" type="input" />
          <Input color="bg-white" label="Date" id="expenseDate" type="Date" />
          <Select
            label="Type of Expense"
            id="expenseType"
            options={['Food', 'Rent', 'Transportation', 'Entertainment', 'Others']}
            value={expenseType}
            onChange={setExpenseType}
            color="bg-white"
            width="100%"
          />
          {/* <h2>{expenseType}</h2> */}
          <Input color="bg-white" label="Invoice No." id="expenseInvoice" type="input" />
          <Input color="bg-white" label="Base Amount" id="expenseAmount" type="number" min={0} />
          <div className="flex flex-col gap-4">
            <div className='flex flex-row justify-between overflow-y-hidden'>
              <p>Make this recurring expense</p>
              <div className='flex flex-row flex-nowrap items-center justify-center gap-[1rem]'>
                Off <i onClick={() => {setRepeat(repeat ? false : true);
              }}
                className='cursor-pointer'
                  
                  >
                  <div className='border-[2px] w-[45px] h-[20px] rounded-[20px] flex flex-row items-center p-[.2rem]'>
                    <div className={`w-[10px] h-[10px] bg-black rounded-[20px] transition-transform translate-x-[${repeat? '25px': ''}]`}></div>
                  </div>
                  </i>On
              </div>
            </div>
            <div className={`${repeat ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'} transition-all duration-300`}>
                <Select
                  label="Repeat Options"
                  id="repeatExpenses"
                  options={['Daily', 'Weekly', 'Monthly', 'Yearly']}
                  value={repeatOption}
                  onChange={setRepeatOption}
                  color="bg-white"
                  width="100%"
                />
                {/* <h2>{repeatOption}</h2> */}
              </div>
          
          </div>
          <Input color="bg-white" label="Notes" id="expenseNotes" type="input" />
          <div className="flex flex-row justify-center gap-[1rem] mt-[2rem]">
            <Button buttonColor="regularButton" type="submit" width="100%">
              Add
            </Button>
            <Button buttonColor="regularButton" onClick={cancelOperation} width="100%">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
