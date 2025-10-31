import { use, useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '@components/Input';
import Select from '@components/Select';
import TextArea from '@components/TextArea';
import Slide from '@components/Slide';
// import { fontSizeOptions } from '@components/style/font';
import Table from '@components/Table';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import ToggleButton from '@components/ToggleButton';
import {
  Camera,
  CloudUpload,
  FileChange,
  Trash,
  TransactionUploadSuccess,
} from '@assets/icons/index';
import InfoRow from '@components/InfoRow';
import Loader from '@components/Loader';
import Success from '@components/Success';
import { set } from 'react-hook-form';

export const IncomeExpenses = () => {
  const [incomeSlide, setIncomeSlide] = useState('110%');
  const [expenseSlide, setExpenseSlide] = useState('110%');
  const [inDetailSlide, setIndetailSlide] = useState('110%');
  const [exDetailSlide, setExdetailSlide] = useState('110%');
  const [incomeType, setIncomeType] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [repeatOption, setRepeatOption] = useState('');
  const [transactionDetail, setTransactionDetail] = useState('110%');
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);

  interface PostRecurrenceFormat {
    templateTransactionId: string;
    frequency: string;
    endDate: string;
  }

  let initialRecurrence = {
    templateTransactionId: '',
    frequency: '',
    endDate: '',
  };
  const [recurrence, setRecurrence] = useState<PostRecurrenceFormat>(initialRecurrence);

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

  interface Category {
    id: string;
    name: string;
    type: string;
  }

  interface categoriesResonse {
    income: Category[];
    expense: Category[];
  }

  const [allCategories, setAllCategories] = useState<categoriesResonse>({
    income: [],
    expense: [],
  });

  const reset = () => {
    setIncomeSlide('110%');
    setExpenseSlide('110%');
    setIndetailSlide('110%');
    setExdetailSlide('110%');
    setTransactionDetail('110%');
    setRepeat(false);
    setFile(null);
    setFileName('');
    setLoader(false);
    setSuccess(false);
    setExpenseType('');
    setIncomeType('');
    setRepeat(false);
    setRecurrence(initialRecurrence);
  };

  const addIncome = () => {
    reset();
    setIncomeSlide('0px');
  };

  const addExpenses = () => {
    reset();
    setExpenseSlide('0px');
  };

  // const incomeDetail = () => setIndetailSlide('0px');
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
    id?: string;
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
    isArchived?: boolean;
    createdAt?: string;
    updatedAt?: string;
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

  const postCategories = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        },
      });

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/settings/categories`,

        {
          name: 'Software & Tools',
          type: 'expense',
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const postCategoryResponse = response.data;
      console.log('Categories post successfully:', postCategoryResponse);
    } catch (error) {
      console.error('Error posting categories:', error);
    }
  };

  // useEffect(() => {
  //   postCategories();
  // }, []);

  //Fetch Categories-------
  const getCategories = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        },
      });

      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/settings/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const categoriesResponse = response.data;
      console.log('Categories response:', categoriesResponse);

      setAllCategories(categoriesResponse);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  interface RecurrenceFormat {
    id: string;
    templateTransactionId: string;
    frequency: string;
    endDate: string;
    lastRun: string;
    nextRun: string;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
  }

  interface AllRecurrences {
    data: RecurrenceFormat[];
    meta: Meta;
  }

  const [allRecurrences, setAllRecurrences] = useState<AllRecurrences>({
    data: [],
    meta: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    },
  });
  //Fetch recurrences-------
  const getAllRecurrences = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        },
      });

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/recurrences?limit=1000`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const recurrencesResponse = response.data;
      console.log('Categories response:', recurrencesResponse);

      setAllRecurrences(recurrencesResponse);
    } catch (error) {
      console.error('Error fetching all recucrrences:', error);
    }
  };

  useEffect(() => {
    getAllRecurrences();
  }, []);

  console.log(allRecurrences);

  const activeRepeatableTransaction = allRecurrences.data.find(
    (recurrence) =>
      //------initial isArchive should be false
      recurrence.templateTransactionId == oneTransaction.id && recurrence.isArchived,
  );

  console.log(activeRepeatableTransaction);
  const deleteCategory = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        },
      });

      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/settings/categories/69029ef9fa164996629c5e2b`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const categoryDeletedResponse = response.data;
      console.log('Categories response:', categoryDeletedResponse);

      // setAllCategories(categoriesResponse);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // useEffect(() => {
  //   deleteCategory();
  // }, []);

  // ------upload Transaction-------------

  let newTransaction = {
    projectId: '670a12b4d9e4fa1234abcd99',
    type: oneTransaction.type,
    title: oneTransaction.title,
    date: oneTransaction.date,
    categoryId: oneTransaction.categoryId,
    baseAmount: oneTransaction.baseAmount,
    origin: oneTransaction.origin,
    paymentMethod: 'Credit Card',
    notes: oneTransaction.notes,
    attachmentURL: 'https://example.com/attachment.pdf',
  };

  const addTransaction = async (payload: TransactionFormat) => {
    setLoader(true);
    setSuccess(false);
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      },
    });

    try {
      const transactionResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/transactions`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(transactionResponse.data);
      if (repeat) {
        const payload = {
          templateTransactionId: transactionResponse.data.id,
          frequency: recurrence.frequency,
          //--------confirm if endate is needed?------
          endDate: '2025-10-05',
        };

        console.log(payload);
        try {
          const recurrenceResponse = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/recurrences`,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
          );
        } catch (error) {
          console.error('Error saving recurrence:', error);
        }
      }
      // resetForm();
      setOneTransaction(transactionResponse.data);
      getTransactionData();
      getAllRecurrences();
      setLoader(false);
      setSuccess(true);
    } catch (error) {
      setLoader(false);
      console.error('Error saving transaction:', error);
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

  // console.log(allTransactions.data);
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
        id: transaction.id,
        date: formattedDate,
        amount: Number(transaction.baseAmount),
        category:
          allCategories.income.find((incomeCategory) => transaction.categoryId == incomeCategory.id)
            ?.name || 'Unknown',
        details: 'View',
      };
    })
    .slice((incomePage - 1) * 10, (incomePage - 1) * 10 + 10);

  //Add filter logic-----------------
  const expenseData = allTransactions?.data?.filter((transaction) => transaction.type == 'expense');

  const expenseFilteredData = expenseData
    .map((transaction) => {
      const dateObj = new Date(transaction.date);
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
      });

      return {
        id: transaction.id,
        date: formattedDate,
        amount: Number(transaction.baseAmount),
        category:
          allCategories.expense.find(
            (expenseCategory) => transaction.categoryId == expenseCategory.id,
          )?.name || 'Unknown',
        details: 'View',
      };
    })
    .slice((expensePage - 1) * 10, (expensePage - 1) * 10 + 10);

  // console.log(expenseFilteredData);

  const options = [
    { key: 'income', label: 'Income' },
    { key: 'expense', label: 'Expense' },
  ];

  const [selectedOption, setSelectedOption] = useState(options[1]);

  const handleToggle = (option: { key: string; label: string }) => {
    setSelectedOption(option);
  };

  //--------handle Income Details------
  const handleTransactionDetail = async (id: string) => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        },
      });

      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOneTransaction(response.data);
      setTransactionDetail('0px');
    } catch (error) {
      console.error(error);
    }
    console.log(oneTransaction);
  };

  //-------handle file uploading------
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  useEffect(() => {
    console.log(fileName);
  }, [fileName]);
  //------------------------------------------------

  return (
    <div>
      <div className="md:hidden flex justify-center mb-[1rem]">
        <ToggleButton options={options} option={selectedOption} onClick={handleToggle} />
      </div>
      <div className="flex flex-row flex-wrap gap-[1rem]">
        <div className="flex-1 flex flex-col flex-nowrap gap-[1rem]">
          <div className="md:flex flex-row flex-nowrap justify-between items-center hidden">
            <h2 className="text-2xl">Income</h2>
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
              // --------------------------------------
              onClickChildren={handleTransactionDetail}
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
            <h2 className="text-2xl">Expense</h2>
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
              // ----------------------------------------
              onClickChildren={handleTransactionDetail}
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
        onConfirm={() => {
          document.getElementById('fileInput')?.click();
        }}
        extralText={file ? 'Next' : 'Skip'}
        onExtra={() => setIndetailSlide('0px')}
        onClose={cancelOperation}
      >
        <div className="flex flex-col flex-nowrap items-center justify-center gap-[1rem] h-full">
          <p>Add your Income Receipt here</p>
          <div
            className="flex flex-col flex-nowrap items-center gap-[1rem] p-[3rem] border-2 border-dashed border-blue-100 bg-blue-50 rounded-[20px] cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => {
              document.getElementById('fileInput')?.click();
            }}
          >
            <CloudUpload className="w-25 h-25 hidden sm:block" />
            <Camera className="w-25 h-25 sm:hidden" />
            <p className="font-bold hidden sm:block">Choose a file or drag & drop it here</p>
            <p className="font-bold sm:hidden">Take a Picture and Upload</p>
            <p className="text-gray-400 hidden sm:block">JPG, PNG or PDF formats up to 5MB</p>
          </div>

          <Input
            id="fileInput"
            hidden={true}
            type="file"
            onChange={handleFileChange}
            accept="image/*, application/pdf"
            capture="environment"
          />
        </div>
        {file && (
          <div>
            <InfoRow label="Attachment" value={fileName} />
            <div className="flex gap-[.5rem] items-center justify-end mt-[.1rem]">
              <FileChange
                className="cursor-pointer"
                onClick={() => {
                  document.getElementById('fileInput')?.click();
                }}
              />
              |
              <Trash
                className="cursor-pointer"
                onClick={() => {
                  setFile(null);
                  setFileName('');
                }}
              />
            </div>
          </div>
        )}
      </Slide>

      {/* Income Detail Form---------------*/}
      <Slide
        title="Add Income"
        slide={inDetailSlide}
        confirmText="cancel"
        onConfirm={cancelOperation}
        extralText={success ? 'view' : 'Add'}
        onExtra={() => {
          if (success) {
            setTransactionDetail('0px');
          } else {
            newTransaction = { ...newTransaction, type: 'income' };
            setOneTransaction(newTransaction);
            addTransaction(newTransaction);
          }
        }}
        onClose={cancelOperation}
      >
        {loader ? (
          <div className="flex flex-col h-full justify-center">
            <Loader />
          </div>
        ) : success ? (
          <Success
            title="Successful!"
            p1="Your Income has been recorded"
            p2={`It's saved in Income List`}
          >
            <TransactionUploadSuccess className="w-25 h-25" />
          </Success>
        ) : (
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
              options={[
                'Project Payment',
                'Milestone Payment',
                'Consultation Fee',
                'Product Sale',
                'Bonus / Incentive',
              ]}
              value={incomeType}
              onChange={(value) => {
                setIncomeType(value);
                setOneTransaction({
                  ...oneTransaction,
                  categoryId:
                    allCategories.income.find((incomeCategory) => incomeCategory.name == value)
                      ?.id || '',
                });
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
              label="Amount"
              id="incomeAmount"
              type="number"
              min={0}
              color="bg-white"
              value={oneTransaction.baseAmount}
              onChange={(e) =>
                setOneTransaction({ ...oneTransaction, baseAmount: Number(e.target.value) })
              }
            >
              {/* <div className='absolute top-[1rem] right-[1rem]'>CAD</div> */}
            </Input>
            <TextArea
              label="Notes"
              id="incomeNotes"
              color="bg-white"
              rows={3}
              value={oneTransaction.notes}
              onChange={(e) => setOneTransaction({ ...oneTransaction, notes: e.target.value })}
            />

            {file && (
              <div>
                <InfoRow label="Attachment" value={fileName} />
                <div className="flex gap-[.5rem] items-center justify-end mt-[.1rem]">
                  <FileChange
                    className="cursor-pointer"
                    onClick={() => {
                      document.getElementById('fileInput')?.click();
                    }}
                  />
                  |
                  <Trash
                    className="cursor-pointer"
                    onClick={() => {
                      setFile(null);
                      setFileName('');
                    }}
                  />
                </div>
              </div>
            )}
          </form>
        )}
      </Slide>

      {/* Expense Slide---------------- */}
      <Slide
        title="Add Expenses"
        slide={expenseSlide}
        confirmText="Browse"
        onConfirm={() => {
          document.getElementById('fileInput')?.click();
        }}
        extralText={file ? 'Next' : 'Skip'}
        onExtra={expenseDetail}
        onClose={cancelOperation}
      >
        <div className="flex flex-col flex-nowrap items-center justify-center gap-[1rem] h-full">
          <p>Add your Expenses Receipt here</p>

          <div
            className="flex flex-col flex-nowrap items-center gap-[1rem] p-[3rem] border-2 border-dashed border-blue-100 bg-blue-50 rounded-[20px] cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => {
              document.getElementById('fileInput')?.click();
            }}
          >
            <CloudUpload className="w-25 h-25 hidden sm:block" />
            <Camera className="w-25 h-25 sm:hidden" />
            <p className="font-bold hidden sm:block">Choose a file or drag & drop it here</p>
            <p className="font-bold sm:hidden">Take a Picture and Upload</p>
            <p className="text-gray-400">JPG, PNG or PDF formats up to 5MB</p>
          </div>

          <Input
            id="fileInput"
            hidden={true}
            type="file"
            onChange={handleFileChange}
            accept="image/*, application/pdf"
            capture="environment"
          />
        </div>
        {file && (
          <div>
            <InfoRow label="Attachment" value={fileName} />
            <div className="flex gap-[.5rem] items-center justify-end mt-[.1rem]">
              <FileChange
                className="cursor-pointer"
                onClick={() => {
                  document.getElementById('fileInput')?.click();
                }}
              />
              |
              <Trash
                className="cursor-pointer"
                onClick={() => {
                  setFile(null);
                  setFileName('');
                }}
              />
            </div>
          </div>
        )}
      </Slide>

      {/* Expense Detail Form-------------- */}
      <Slide
        title="Add Expense"
        slide={exDetailSlide}
        confirmText="cancel"
        onConfirm={cancelOperation}
        extralText={success ? 'view' : 'Add'}
        onExtra={() => {
          if (success) {
            setTransactionDetail('0px');
          } else {
            newTransaction = { ...newTransaction, type: 'expense' };
            setOneTransaction(newTransaction);
            addTransaction(newTransaction);
          }
        }}
        onClose={cancelOperation}
      >
        {loader ? (
          <div className="flex flex-col h-full justify-center">
            <Loader />
          </div>
        ) : success ? (
          <Success
            title="Successful!"
            p1="Your Expense has been recorded"
            p2={`It's saved in Expense List`}
          >
            <TransactionUploadSuccess className="w-25 h-25" />
          </Success>
        ) : (
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
              options={[
                'Software & Tools',
                'Equipment / Hardware',
                'Internet & Utilities',
                'Marketing & Advertising',
                'Subscription Fees',
                'Travel & Transportation',
                'Other Expenses',
              ]}
              value={expenseType}
              onChange={(value) => {
                setExpenseType(value);
                setOneTransaction({
                  ...oneTransaction,
                  categoryId:
                    allCategories.expense.find((expenseCategory) => expenseCategory.name == value)
                      ?.id || '',
                });
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
              label="Amount"
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
            <div className="flex flex-col gap-[1rem]">
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
                  label="Recurrence Type"
                  id="repeatExpenses"
                  options={['Weekly', 'Monthly']}
                  value={repeatOption}
                  onChange={(value) => {
                    setRepeatOption(value);
                    setRecurrence({ ...recurrence, frequency: value.toLowerCase() });
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

            {file && (
              <div>
                <InfoRow label="Attachment" value={fileName} />
                <div className="flex gap-[.5rem] items-center justify-end mt-[.1rem]">
                  <FileChange
                    className="cursor-pointer"
                    onClick={() => {
                      document.getElementById('fileInput')?.click();
                    }}
                  />
                  |
                  <Trash
                    className="cursor-pointer"
                    onClick={() => {
                      setFile(null);
                      setFileName('');
                    }}
                  />
                </div>
              </div>
            )}
          </form>
        )}
      </Slide>

      <Slide
        title={oneTransaction.type == 'income' ? 'Income' : 'Expense'}
        slide={transactionDetail}
        confirmText="Close"
        onConfirm={cancelOperation}
        extralText="Edit"
        onExtra={() => {}}
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
            value={`$ ${String(((oneTransaction.baseAmount * 5) / 100).toLocaleString())}`}
          />
          <InfoRow
            label="Total Income"
            value={`$ ${String(((oneTransaction.baseAmount * 105) / 100).toLocaleString())}`}
          />
        </div>

        <InfoRow label="Notes" value={oneTransaction.notes} vertical={true} />
        <InfoRow label="Attachment" value={oneTransaction.attachmentURL} />
      </Slide>
    </div>
  );
};
