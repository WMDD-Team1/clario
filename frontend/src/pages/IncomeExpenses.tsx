import { use, useEffect, useState } from 'react';
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
import { Camera, CloudUpload } from '@assets/icons/index';
import { da } from 'zod/v4/locales';

export const IncomeExpenses = () => {
  const [incomeSlide, setIncomeSlide] = useState('110%');
  const [expenseSlide, setExpenseSlide] = useState('110%');
  const [inDetailSlide, setIndetailSlide] = useState('110%');
  const [exDetailSlide, setExdetailSlide] = useState('110%');
  const [incomeType, setIncomeType] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [repeatOption, setRepeatOption] = useState('');

  interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }

  interface TransactionResponse {
    data: TransactionFormat[];
    meta: Meta;
  }
  const [allTransactions, setAllTransactions] = useState<TransactionResponse>({
    data: [],
    meta: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    },
  });

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

  const { getAccessTokenSilently } = useAuth0();

  // ------fetch all transactions-------------

  async function getTransactionData() {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        },
      });

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/transactions?limit=1000`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const transactionResponse = response.data;
      // console.log('Transaction response:', transactionResponse);

      setAllTransactions(transactionResponse);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }

  useEffect(() => {
    getTransactionData();
  }, []);

  // ------fetch one transaction-------------
  const getOneTransaction = async () => {};

  interface TransactionFormat {
    id: string;
    projectId: string;
    type: 'expense' | 'income';
    title: string;
    date: string;
    categoryId: string;
    baseAmount: number;
    origin: string;
    paymentMethod: string;
    notes: string;
    recurrence?: string;
    attachmentURL?: string;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
  }

  const [oneTransaction, setOneTransaction] = useState<TransactionFormat>({
    id: '',
    projectId: '',
    type: 'income',
    title: '',
    date: '',
    categoryId: '',
    baseAmount: 0,
    origin: '',
    paymentMethod: '',
    notes: '',
    recurrence: '',
    attachmentURL: '',
    isArchived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const resetForm = () => {
    setOneTransaction({
      id: '',
      projectId: '',
      type: 'income',
      title: '',
      date: '',
      categoryId: '',
      baseAmount: 0,
      origin: '',
      paymentMethod: '',
      notes: '',
      recurrence: '',
      attachmentURL: '',
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    setRepeatOption('');
  };

  //Fetch CategoryID
  const getCategoryId = async () => {};

  // ------upload Transaction-------------
  const addTransaction = async () => {
    const payload = {
      projectId: '670a12b4d9e4fa1234abcd99',
      type: oneTransaction.type,
      title: oneTransaction.title,
      date: oneTransaction.date,
      categoryId: '670a12b4d9e4fa1234abcd99',
      // Tell Daniel to change amout to baseAmount
      baseAmount: oneTransaction.baseAmount,
      origin: oneTransaction.origin,
      paymentMethod: 'Credit Card',
      notes: oneTransaction.notes,
      attachmentURL: 'https://example.com/attachment.pdf',
      //// Tell Daniel to add recurrence
      // recurrence: oneTransaction.recurrence || ''
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
      resetForm();
      getTransactionData();
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const [incomePage, setIncomePage] = useState(1);
  const [expensePage, setExpensePage] = useState(1);

  const handleIncomePageChange = (newPage: number) => {
    setIncomePage(newPage);
  };
  const handleExpensePageChange = (newPage: number) => {
    setExpensePage(newPage);
  };

  const headers = [
    { key: 'date', value: 'Date' },
    { key: 'amount', value: 'Amount ($)' },
    { key: 'category', value: 'Category' },
    { key: 'details', value: 'Details' },
  ];

  console.log(allTransactions.data);
  // fake data


  //Add filter logic-------
  const incomeData = allTransactions?.data?.filter((transaction) => transaction.type == 'income');
  const incomeFilteredData = incomeData
    .map((transaction) => {
      const dateObj = new Date(transaction.date);
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
      });

      return {
        date: formattedDate,
        amount: Number(transaction.baseAmount),
        category: transaction.categoryId,
        details: 'View',
      };
    })
    .slice((incomePage - 1) * 10, (incomePage - 1) * 10 + 10);


  //Add filter logic-----------------
  const expenseData = allTransactions?.data?.filter((transaction) => transaction.type == 'expense');

  const expenseFilteredData = expenseData.map((transaction) => {
        const dateObj = new Date(transaction.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
        });

        return {
          date: formattedDate,
          amount: Number(transaction.baseAmount),
          category: transaction.categoryId,
          details: 'View',
        };
      }).slice((expensePage - 1) * 10, (expensePage - 1) * 10 + 10);

  console.log(expenseFilteredData);

  const options = [
    { key: 'income', label: 'Income' },
    { key: 'expense', label: 'Expense' },
  ];

  const [selectedOption, setSelectedOption] = useState(options[1]);

  const handleToggle = (option: { key: string; label: string }) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="md:hidden flex justify-center mb-[1rem]">
        <ToggleButton options={options} option={selectedOption} onClick={handleToggle} />
      </div>
      <div className="flex flex-row flex-wrap gap-[1rem]">
        <div className="flex-1 flex flex-col flex-nowrap gap-[1rem]">
          <div className="md:flex flex-row flex-nowrap justify-between items-center hidden">
            <h2 className='text-2xl'>Income</h2>
            <Button
              buttonColor="regularButton"
              onClick={() => {
                addIncome();
                resetForm();
              }}
              textColor="white"
            >
              Add Income
            </Button>
          </div>

          <div>
            <Table
              headers={headers}
              data={incomeFilteredData}
              total={incomeData.length}
              page={incomePage}
              pageSize={10}
              onPageChange={handleIncomePageChange}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col flex-nowrap gap-[1rem]">
          <div className="md:flex flex-row flex-nowrap justify-between items-center hidden">
            <h2 className='text-2xl'>Expense</h2>
            <Button
              buttonColor="regularButton"
              onClick={() => {
                addExpenses();
                resetForm();
              }}
              textColor="white"
            >
              Add Expenses
            </Button>
          </div>
          <div>
            <Table
              headers={headers}
              data={expenseFilteredData}
              total={expenseData.length}
              page={expensePage}
              pageSize={10}
              onPageChange={handleExpensePageChange}
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
            <CloudUpload className="w-25 h-25 hidden sm:block" />
            <Camera className="w-25 h-25 sm:hidden" />
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
        onExtra={async () => {
          setOneTransaction({ ...oneTransaction, type: 'income' });
          addTransaction();
        }}
        onClose={cancelOperation}
      >
        <form className="flex flex-col gap-4">
          <Input
            label="Income Title"
            id="incomeTitle"
            color="bg-white"
            value={oneTransaction.title}
            onChange={(e) => setOneTransaction({ ...oneTransaction, title: e.target.value })}
          />
          <Input
            label="Date"
            id="incomeDate"
            type="date"
            color="bg-white"
            value={oneTransaction.date}
            onChange={(e) => setOneTransaction({ ...oneTransaction, date: e.target.value })}
          />
          <Select
            label="Type of Income"
            id="incomeType"
            options={['Salary', 'Investment', 'Gift', 'Freelance']}
            value={oneTransaction.categoryId}
            onChange={(value) => {
              setIncomeType(value);
              setOneTransaction({ ...oneTransaction, categoryId: value });
            }}
            color="bg-white"
            width="100%"
          />
          <Input
            label="Invoice No."
            id="incomeInvoice"
            color="bg-white"
            value={oneTransaction.origin}
            onChange={(e) => setOneTransaction({ ...oneTransaction, origin: e.target.value })}
          />
          <Input
            label="Base Amount"
            id="incomeAmount"
            type="number"
            min={0}
            color="bg-white"
            value={oneTransaction.baseAmount}
            onChange={(e) =>
              setOneTransaction({ ...oneTransaction, baseAmount: Number(e.target.value) })
            }
          />
          <TextArea
            label="Notes"
            id="incomeNotes"
            color="bg-white"
            rows={3}
            value={oneTransaction.notes}
            onChange={(e) => setOneTransaction({ ...oneTransaction, notes: e.target.value })}
          />
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
            <CloudUpload className="w-25 h-25 hidden sm:block" />
            <Camera className="w-25 h-25 sm:hidden" />
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
        onExtra={() => {
          setOneTransaction({ ...oneTransaction, type: 'expense' });
          addTransaction();
        }}
        onClose={cancelOperation}
      >
        <form className="flex flex-col gap-4">
          <Input
            label="Expense Title"
            id="expenseTitle"
            color="bg-white"
            value={oneTransaction.title}
            onChange={(e) => setOneTransaction({ ...oneTransaction, title: e.target.value })}
          />
          <Input
            label="Date"
            id="expenseDate"
            type="date"
            color="bg-white"
            value={oneTransaction.date}
            onChange={(e) => setOneTransaction({ ...oneTransaction, date: e.target.value })}
          />
          <Select
            label="Type of Expense"
            id="expenseType"
            options={['Food', 'Rent', 'Transportation', 'Entertainment', 'Others']}
            value={oneTransaction.categoryId}
            onChange={(value) => {
              setExpenseType(value);
              setOneTransaction({ ...oneTransaction, categoryId: value });
            }}
            color="bg-white"
            width="100%"
          />
          <Input
            label="Invoice No."
            id="expenseInvoice"
            color="bg-white"
            value={oneTransaction.origin}
            onChange={(e) => setOneTransaction({ ...oneTransaction, origin: e.target.value })}
          />
          <Input
            label="Base Amount"
            id="expenseAmount"
            type="number"
            min={0}
            color="bg-white"
            value={oneTransaction.baseAmount}
            onChange={(e) =>
              setOneTransaction({ ...oneTransaction, baseAmount: Number(e.target.value) })
            }
          />

          {/* Recurring Expense */}
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
                onChange={(value) => {
                  setRepeatOption(value);
                  setOneTransaction({ ...oneTransaction, recurrence: value });
                }}
                color="bg-white"
                width="100%"
              />
            )}
          </div>

          <TextArea
            label="Notes"
            id="expenseNotes"
            color="bg-white"
            rows={3}
            value={oneTransaction.notes}
            onChange={(e) => setOneTransaction({ ...oneTransaction, notes: e.target.value })}
          />
        </form>
      </Slide>
    </div>
  );
};
