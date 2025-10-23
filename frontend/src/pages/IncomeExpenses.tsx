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
import ToggleButton from '@components/ToggleButton';

export const IncomeExpenses = () => {
  const [incomeSlide, setIncomeSlide] = useState('110%');
  const [expenseSlide, setExpenseSlide] = useState('110%');
  const [inDetailSlide, setIndetailSlide] = useState('110%');
  const [exDetailSlide, setExdetailSlide] = useState('110%');
  const [incomeType, setIncomeType] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [repeatOption, setRepeatOption] = useState('');

  const reset = () => {
    setIncomeSlide('110%');
    setExpenseSlide('110%');
    setIndetailSlide('110%');
    setExdetailSlide('110%');
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

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStage, setSelectedStage] = useState({
    id: 'none',
    label: 'Stages',
  });

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

  const headers = [
    { key: 'date', value: 'Date' },
    { key: 'amount', value: 'Amount ($)' },
    { key: 'category', value: 'Category' },
    { key: 'details', value: 'Details' },
  ];

  // fake data
  const data = [
    { date: 'Oct 22', amount: 1200, category: 'Sales', details: 'View' },
    { date: 'Oct 21', amount: 850, category: 'Marketing', details: 'View' },
    { date: 'Oct 20', amount: 430, category: 'Development', details: 'View' },
    { date: 'Oct 19', amount: 2200, category: 'Sales', details: 'View' },
    { date: 'Oct 18', amount: 150, category: 'Support', details: 'View' },
    { date: 'Oct 17', amount: 760, category: 'Development', details: 'View' },
    { date: 'Oct 16', amount: 340, category: 'Marketing', details: 'View' },
    { date: 'Oct 15', amount: 980, category: 'Sales', details: 'View' },
    { date: 'Oct 14', amount: 420, category: 'Support', details: 'View' },
    { date: 'Oct 13', amount: 1300, category: 'Development', details: 'View' },
  ];

  const options = [
        {key: 'income', label:'Income'},
        {key: 'expense', label:'Expense'},
      ]

  const [selectedOption, setSelectedOption] = useState(options[1]);

  const handleToggle = (option: { key: string; label: string }) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className='md:hidden flex justify-center mb-[1rem]'>
      <ToggleButton
      options={options}

      option={selectedOption}
      onClick={handleToggle}
      />
      </div>
      <div className="flex flex-row flex-wrap gap-[1rem]">
        <div className="flex-1 flex flex-col flex-nowrap gap-[1rem]">
          <div className="md:flex flex-row flex-nowrap justify-between items-center hidden">
            Income
            <Button buttonColor="regularButton" onClick={addIncome} textColor="white">
              Add Income
            </Button>
          </div>

          <div>
            <Table
              headers={headers}
              data={data}
              total={30}
              page={currentPage}
              pageSize={10}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col flex-nowrap gap-[1rem]">
          <div className="md:flex flex-row flex-nowrap justify-between items-center hidden">
            Expense
            <Button buttonColor="regularButton" onClick={addExpenses} textColor="white">
              Add Expenses
            </Button>
          </div>
          <div>
            <Table
              headers={headers}
              data={data}
              total={30}
              page={currentPage}
              pageSize={10}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* Income Slide------------- */}
      <Slide
        title="Add Income"
        slide={incomeSlide}
        confirmText="Browse"
        onConfirm={cancelOperation}
        extralText="Skip"
        onExtra={incomeDetail}
        onClose={cancelOperation}
      >
        <div className="flex flex-col flex-nowrap items-center justify-center gap-[1rem] h-full">
          <p>Add your Income Receipt here</p>
          <div className="flex flex-col flex-nowrap items-center gap-[1rem] p-[3rem] border-2 border-dashed border-blue-100 bg-blue-50 rounded-[20px]">
            <img src="/cloud-upload.svg" alt="" className="w-25 h-25 hidden sm:block" />
            <img src="/Camera.svg" alt="" className="w-25 h-25 sm:hidden" />
            <p className="sm:hidden">Take a Picture and Upload</p>
            <p className="font-bold hidden sm:block">Choose a file or drag & drop it here</p>
            <p className="text-gray-400 hidden sm:block">JPG, PNG or PDF formats up to 5MB</p>
          </div>
        </div>
      </Slide>

      {/* Income Detail Form---------------*/}
      <Slide
      title="Add Income"
      slide={inDetailSlide}
      confirmText="cancel"
      onConfirm={cancelOperation}
      extralText="Add"
      onExtra={incomeDetail}
      onClose={cancelOperation}>
        <form className="flex flex-col gap-4">
          <Input label="Income Title" id="incomeTitle" color="bg-white" />
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
      <Slide
        title="Add Expenses"
        slide={expenseSlide}
        confirmText="Browse"
        onConfirm={cancelOperation}
        extralText="Skip"
        onExtra={expenseDetail}
        onClose={cancelOperation}
      >
        <div className="flex flex-col flex-nowrap items-center justify-center gap-[1rem] h-full">
          <p>Add your Expenses Receipt here</p>

          <div className="flex flex-col flex-nowrap items-center gap-[1rem] p-[3rem] border-2 border-dashed border-blue-100 bg-blue-50 rounded-[20px]">
            <img src="/cloud-upload.svg" alt="upload" className="w-25 h-25" />
            <p className="font-bold">Choose a file or drag & drop it here</p>
            <p className="text-gray-400">JPG, PNG or PDF formats up to 5MB</p>
          </div>
        </div>
      </Slide>

      {/* Expense Detail Form-------------- */}
      <Slide
      title="Add Expense"
      slide={exDetailSlide}
      confirmText="cancel"
      onConfirm={cancelOperation}
      extralText="Add"
      onExtra={incomeDetail}
      onClose={cancelOperation}>
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
