import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '@components/Input';
import Select from '@components/Select';
import TextArea from '@components/TextArea';
import Slide from '@components/Slide';
import { fontSizeOptions } from '@components/style/font';
import Table from '@components/Table';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export const IncomeExpenses = () => {
  const [incomeSlide, setIncomeSlide] = useState('100%');
  const [expenseSlide, setExpenseSlide] = useState('100%');
  const [inDetailSlide, setIndetailSlide] = useState('100%');
  const [exDetailSlide, setExdetailSlide] = useState('100%');
  const [incomeType, setIncomeType] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [repeatOption, setRepeatOption] = useState('');

  const reset = () => {
    setIncomeSlide('100%');
    setExpenseSlide('100%');
    setIndetailSlide('100%');
    setExdetailSlide('100%');
    setRepeat(false);
  };

  const addIncome = () => {
    reset();
    setIncomeSlide('0px');
  };

  const addExpenses = () => {
    reset();
    setExpenseSlide('0px');
  };

  const incomeDetail = () => setIndetailSlide('0px');
  const expenseDetail = () => setExdetailSlide('0px');
  const cancelOperation = () => reset();

  const headers = [
    { key: 'Date', value: 'Date' },
    { key: 'Amount', value: 'Amount' },
    { key: 'Category', value: 'Category' },
    { key: 'Details', value: 'Details' },
  ];

  const data = [
    { Date: 'Sep 12', Amount: 100, Category: 'Salary', Details: 'view' },
    { Date: 'Sep 12', Amount: 50, Category: 'Food', Details: 'view' },
    { Date: 'Sep 12', Amount: 200, Category: 'Freelance', Details: 'view' },
  ];

  const { getAccessTokenSilently } = useAuth0();

  interface TransactionFormat {
    projectId: string;
    type: 'expense' | 'income';
    date: string;
    categoryId: string;
    amount: number;
    origin: string;
    paymentMethod: string;
    notes: string;
    status: string;
    paymentDate: string;
    attachmentURL: string;
    isArchived: boolean;
  }

  const [oneTransaction, setOneTransaction] = useState<TransactionFormat>({
    projectId: '',
    type: 'income',
    date: '',
    categoryId: '',
    amount: 0,
    origin: '',
    paymentMethod: '',
    notes: '',
    status: '',
    paymentDate: '',
    attachmentURL: '',
    isArchived: false,
  });

  // ------fetch all transactions-------------

  async function getTransactionData() {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      },
    });

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    console.log(data);
  }

  // ------fetch one transaction-------------
  const getOneTransaction = async () => {};

  // ------upload Transaction-------------
  const addTransaction = async () => {
    const payload = {
      projectId: '670a12b4d9e4fa1234abcd99',
      type: 'expense',
      date: '2025-10-05',
      categoryId: '670a12b4d9e4fa1234abcd99',
      amount: 200,
      origin: 'Freelancer payment',
      paymentMethod: 'Credit Card',
      notes: 'Payment for October (max 200 characters)',
      status: 'paid',
      paymentDate: '2025-10-05',
      attachmentURL: 'https://example.com/attachment.pdf',
      isArchived: false,
    };

    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      },
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/transactions`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  return (
    <div>
      <div className="flex gap-[1rem] mb-4">
        <div className="w-full flex flex-col flex-nowrap gap-[1rem]">
          <div className="flex flex-row flex-nowrap justify-between items-center">
            Income
            <Button buttonColor="regularButton" onClick={addIncome} textColor="white">
              Add Income
            </Button>
          </div>

          <div>
            <Table headers={headers} data={data} />
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-row flex-nowrap justify-between items-center">
            Expense
            <Button buttonColor="regularButton" onClick={addExpenses} textColor="white">
              Add Expenses
            </Button>
          </div>
        </div>
      </div>

      {/* Income Slide------------- */}
      <Slide title="Add Income" slide={incomeSlide} onClose={cancelOperation}>
        <p>Add your Income Receipt here</p>
        <div>
          <p>Choose a file or drag & drop it here</p>
          <p>JPG, PNG or PDF formats up to 5MB</p>
        </div>
        <div className="flex gap-4 mt-4">
          <Button buttonColor="regularButton" width="100%">
            Browse
          </Button>
          <Button buttonColor="regularButton" width="100%" onClick={incomeDetail}>
            Skip
          </Button>
        </div>
      </Slide>

      {/* Income Detail Form---------------*/}
      <Slide title="Add Income" slide={inDetailSlide} onClose={cancelOperation}>
        <form className="flex flex-col gap-4">
          <Input
            label="Income Title"
            id="incomeTitle"
            color="bg-white"
            value={oneTransaction.name}
            onChange={(e) => setOneTransaction({ ...oneTransaction, name: e.target.value })}
          />
          <Input label="Date" id="incomeDate" type="date" color="bg-white" />
          <Select
            label="Type of Income"
            id="incomeType"
            options={['Salary', 'Investment', 'Gift', 'Freelance']}
            value={incomeType}
            onChange={setIncomeType}
            color="bg-white"
            width="100%"
          />
          <Input label="Invoice No." id="incomeInvoice" color="bg-white" />
          <Input label="Base Amount" id="incomeAmount" type="number" min={0} color="bg-white" />
          <TextArea label="Notes" id="incomeNotes" color="bg-white" rows={3} />
        </form>
      </Slide>

      {/* Expense Slide---------------- */}
      <Slide title="Add Expenses" slide={expenseSlide} onClose={cancelOperation}>
        <p>Add your Expenses Receipt here</p>
        <div>
          <p>Choose a file or drag & drop it here</p>
          <p>JPG, PNG or PDF formats up to 5MB</p>
        </div>
        <div className="flex gap-4 mt-4">
          <Button buttonColor="regularButton" width="100%">
            Browse
          </Button>
          <Button buttonColor="regularButton" width="100%" onClick={expenseDetail}>
            Skip
          </Button>
        </div>
      </Slide>

      {/* Expense Detail Form-------------- */}
      <Slide title="Add Expense" slide={exDetailSlide} onClose={cancelOperation}>
        <form className="flex flex-col gap-4">
          <Input label="Expense Title" id="expenseTitle" color="bg-white" />
          <Input label="Date" id="expenseDate" type="date" color="bg-white" />
          <Select
            label="Type of Expense"
            id="expenseType"
            options={['Food', 'Rent', 'Transportation', 'Entertainment', 'Others']}
            value={expenseType}
            onChange={setExpenseType}
            color="bg-white"
            width="100%"
          />
          <Input label="Invoice No." id="expenseInvoice" color="bg-white" />
          <Input label="Base Amount" id="expenseAmount" type="number" min={0} color="bg-white" />

          {/* Recurring Expense -------------- */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p>Make this recurring expense</p>
              <div className="flex items-center gap-2">
                Off
                <div
                  className="w-[45px] h-[20px] border-2 rounded-full flex items-center p-[2px] cursor-pointer"
                  onClick={() => setRepeat(!repeat)}
                >
                  <div
                    className={`w-[10px] h-[10px] bg-black rounded-full transition-transform ${
                      repeat ? 'translate-x-[25px]' : ''
                    }`}
                  ></div>
                </div>
                On
              </div>
            </div>

            {repeat && (
              <Select
                label="Repeat Options"
                id="repeatExpenses"
                options={['Daily', 'Weekly', 'Monthly', 'Yearly']}
                value={repeatOption}
                onChange={setRepeatOption}
                color="bg-white"
                width="100%"
              />
            )}
          </div>

          <TextArea label="Notes" id="expenseNotes" color="bg-white" rows={3} />
        </form>
      </Slide>
    </div>
  );
};
