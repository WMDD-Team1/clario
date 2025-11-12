import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Table from '@components/Table';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import ToggleButton from '@components/ToggleButton';
import { IncomeExpenseViewSlide } from '@components/incomeExpense/IncomeExpenseViewSlide';
import { IncomeUploadSlide } from '@components/incomeExpense/IncomeUploadSlide';
import { ExpenseUploadSlide } from '@components/incomeExpense/ExpenseUploadSlide';
import { AddIncomeSlide } from '@components/incomeExpense/AddIncomeSlide';
import { AddExpenseSlide } from '@components/incomeExpense/AddExpenseSlide';
import { EditIncomeSlide } from '@components/incomeExpense/EditIncomeSlide';
import {
  PostRecurrenceFormat,
  Meta,
  TransactionCategory,
  TransactionFormat,
  RecurrenceFormat,
  TransactionFilter,
} from '@api/types/transaction';
import EmptyState from '@components/EmptyState';
import { MenuScale, Plus } from '@assets/icons';
import { EditExpenseSlide } from '@components/incomeExpense/EditExpenseSlide';
import { IncomeFilterSlide } from '@components/incomeExpense/IncomeFilter';
import { ExpenseFilterSlide } from '@components/incomeExpense/ExpenseFilter';
import { formatDate } from '@utils/formatDate';

export const IncomeExpenses = () => {
  const [incomeSlide, setIncomeSlide] = useState('110%');
  const [expenseSlide, setExpenseSlide] = useState('110%');
  const [inDetailSlide, setIndetailSlide] = useState('110%');
  const [exDetailSlide, setExdetailSlide] = useState('110%');
  const [editIncome, setEditIncome] = useState('110%');
  const [editExpense, setEditExpense] = useState('110%');
  const [incomeType, setIncomeType] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [repeatOption, setRepeatOption] = useState('');
  const [transactionDetail, setTransactionDetail] = useState('110%');
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deletetSuccess, setDeleteSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [incomeFilterSlide, setIncomeFilterSlide] = useState('110%');
  const [expenseFilterSlide, setExpenseFilterSlide] = useState('110%');
  const [incomeFilterConditions, setIncomeFilterConditions] = useState<TransactionFilter>({
    dateStart: '',
    dateEnd: '',
    type: [],
    amountStart: 0,
    amountEnd: 0,
  });

  const [expenseFilterConditions, setExpenseFilterConditions] = useState<TransactionFilter>({
    dateStart: '',
    dateEnd: '',
    type: [],
    amountStart: 0,
    amountEnd: 0,
  });

  let initialRecurrence = {
    templateTransactionId: '',
    frequency: '',
    endDate: '',
  };
  const [recurrence, setRecurrence] = useState<PostRecurrenceFormat>(initialRecurrence);

  const [incomeCategories, setIncomeCategories] = useState<TransactionCategory>({
    categories: [],
  });

  const [expenseCategories, setExpenseCategories] = useState<TransactionCategory>({
    categories: [],
  });

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

  const [errors, setErrors] = useState({
    title: '',
    date: '',
    type: '',
    baseAmount: '',
    origin: '',
    notes: '',
    recurrence: '',
  });

  const handleSubmitValidation = () => {
    const newErrors = {
      title: '',
      date: '',
      type: '',
      baseAmount: '',
      origin: '',
      notes: '',
      recurrence: '',
    };

    if (!oneTransaction.origin) newErrors.origin = 'Invoice No. is required!';
    if (!oneTransaction.baseAmount) newErrors.baseAmount = 'Amount is required!';
    if (!oneTransaction.date) newErrors.date = 'Date is required!';
    if (!oneTransaction.title) newErrors.title = 'Title is required!';
    if (!oneTransaction.category) newErrors.type = 'Type is required!';
    if (repeat) {
      if (!recurrence.frequency) newErrors.recurrence = 'Recurrence is required!';
    }

    const hasError = Object.values(newErrors).some((error) => error !== '');

    setErrors(newErrors);
    return hasError;
  };

  const reset = () => {
    setIncomeSlide('110%');
    setExpenseSlide('110%');
    setIndetailSlide('110%');
    setExdetailSlide('110%');
    setTransactionDetail('110%');
    setEditExpense('110%');
    setEditIncome('110%');
    setRepeat(false);
    setFile(null);
    setFileName('');
    setLoader(false);
    setSuccess(false);
    setDeleteSuccess(false);
    setExpenseType('');
    setIncomeType('');
    setRepeat(false);
    setRecurrence(initialRecurrence);
    setUpdateSuccess(false);
    setIncomeFilterSlide('110%');
    setExpenseFilterSlide('110%');
    setErrors({
      title: '',
      date: '',
      type: '',
      baseAmount: '',
      origin: '',
      notes: '',
      recurrence: '',
    });
  };

  const addIncome = () => {
    reset();
    setIncomeSlide('0px');
  };

  const addExpenses = () => {
    reset();
    setExpenseSlide('0px');
  };

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

      setAllTransactions(transactionResponse);
      console.log(allTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }

  useEffect(() => {
    getTransactionData();
  }, []);

  const [oneTransaction, setOneTransaction] = useState<TransactionFormat>({
    id: '',
    projectId: '',
    type: 'income',
    title: '',
    date: '',
    category: '',
    baseAmount: '',
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
      category: '',
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

  //Fetch Categories-------
  const getCategories = async (transactionType: string) => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        },
      });

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/settings/categories/${transactionType}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const categoriesResponse = response.data;
      console.log('Categories response:', categoriesResponse);

      transactionType == 'incomes'
        ? setIncomeCategories(categoriesResponse)
        : setExpenseCategories(categoriesResponse);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getCategories('incomes');
    getCategories('expenses');
  }, []);

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
      recurrence.templateTransactionId == oneTransaction.id,
  );

  console.log(activeRepeatableTransaction);

  // ------upload Transaction-------------

  let newTransaction = {
    //------confirm-project-id-------
    // projectId: '670a12b4d9e4fa1234abcd99',
    type: oneTransaction.type,
    title: oneTransaction.title,
    date: oneTransaction.date,
    category: oneTransaction.category,
    baseAmount: oneTransaction.baseAmount,
    origin: oneTransaction.origin,
    paymentMethod: 'Credit Card',
    notes: oneTransaction.notes,
    ...(oneTransaction.attachmentURL && { attachmentURL: oneTransaction.attachmentURL }),
  };

  const scanReceipt = async () => {
    if (file) {
      // setLoader(true);
      // setSuccess(false);
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        },
      });

      const formData = new FormData();
      formData.append('file', file);

      try {
        setLoader(true);
        const scanResponse = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/transactions/scan`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const scanInfo = scanResponse.data;

        console.log(scanInfo);
        setOneTransaction({
          ...oneTransaction,
          title: scanInfo.transaction.title,
          date: scanInfo.transaction.date,
          origin: scanInfo.transaction.origin,
          baseAmount: Number(scanInfo.transaction.baseAmount),
          notes: scanInfo.transaction.notes,
          attachmentURL: scanInfo.fileUrl,
        });
        setLoader(false);
        // setSuccess(true);
      } catch (error) {
        setLoader(false);
        console.error('Error scanning transaction:', error);
      }
    }
  };

  const addTransaction = async (payload: TransactionFormat) => {
    const hasError = handleSubmitValidation();

    if (hasError) {
      return;
    }
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

  const updateTransaction = async () => {
    const hasError = handleSubmitValidation();

    if (hasError) {
      return;
    }

    setLoader(true);
    setUpdateSuccess(false);
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      },
    });

    const payload = {
      // projectId: '670a12b4d9e4fa1234abcd99',
      type: oneTransaction.type,
      title: oneTransaction.title,
      date: oneTransaction.date,
      category: oneTransaction.category,
      baseAmount: oneTransaction.baseAmount,
      origin: oneTransaction.origin,
      paymentMethod: 'Credit Card',
      notes: oneTransaction.notes,
      attachmentURL: oneTransaction.attachmentURL,
    };

    try {
      const updateResponse = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/${oneTransaction.id}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(updateResponse.data);
      if (activeRepeatableTransaction) {
        if (repeat) {
          const payload = {
            frequency: recurrence.frequency,
          };
          const archivePayLoad = { isArchived: false };
          const recurrenceUrl = `${import.meta.env.VITE_API_BASE_URL}/recurrences/${activeRepeatableTransaction.id}`;
          const archiveUrl = `${import.meta.env.VITE_API_BASE_URL}/recurrences/${activeRepeatableTransaction.id}/archive`;
          await axios.patch(recurrenceUrl, payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
          await axios.patch(archiveUrl, archivePayLoad, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          const payload = { isArchived: true };
          const recurrenceUrl = `${import.meta.env.VITE_API_BASE_URL}/recurrences/${activeRepeatableTransaction.id}/archive`;
          await axios.patch(recurrenceUrl, payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      } else if (repeat) {
        const payload = {
          templateTransactionId: oneTransaction.id,
          frequency: recurrence.frequency,
          endDate: '2025-10-05',
        };
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/recurrences`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      await getAllRecurrences();
      await getTransactionData();
      setLoader(false);
      setUpdateSuccess(true);
    } catch (error) {
      setLoader(false);
      console.error('Error updating transaction:', error);
    }
  };

  //---delete transaction-------------------
  const deleteTransaction = async () => {
    setLoader(true);
    setDeleteSuccess(false);
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      },
    });

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/${oneTransaction.id}/archive`,
        {
          isArchived: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.data;
      console.log(data);
      await getTransactionData();
      // setTransactionDetail('110%');
      setLoader(false);
      setDeleteSuccess(true);
    } catch (error) {
      setLoader(false);
      console.error('Error deleting transaction', error);
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
    { key: 'title', value: 'Title' },
    { key: 'category', value: 'Category' },
    { key: 'date', value: 'Date' },
    { key: 'amount', value: 'Amount (CAD)' },
    { key: 'details', value: 'Details' },
  ];

  // console.log(allTransactions.data);
  // fake data

  //Add filter logic-------

  // ----------------------------
  // Applied Filter Conditions
  const [appliedIncomeFilter, setAppliedIncomeFilter] = useState<TransactionFilter>({
    dateStart: '',
    dateEnd: '',
    type: [],
    amountStart: 0,
    amountEnd: 0,
  });
  const [appliedExpenseFilter, setAppliedExpenseFilter] = useState<TransactionFilter>({
    dateStart: '',
    dateEnd: '',
    type: [],
    amountStart: 0,
    amountEnd: 0,
  });

  // ----------------------------
  // Types
  let incomeTypes: string[] = [];
  let expenseTypes: string[] = [];

  allTransactions?.data.forEach((transaction) => {
    const category = transaction.category || 'Unknown';
    if (
      transaction.type === 'income' &&
      !transaction.isArchived &&
      !incomeTypes.includes(category)
    ) {
      incomeTypes.push(category);
    }
    if (
      transaction.type === 'expense' &&
      !transaction.isArchived &&
      !expenseTypes.includes(category)
    ) {
      expenseTypes.push(category);
    }
  });

  // ----------------------------
  // Filtered Income Data
  const getFilteredIncomeData = () => {
    return allTransactions?.data
      .filter((t) => t.type === 'income' && !t.isArchived)
      .filter((t) => {
        const date = new Date(t.date);
        const startDate = appliedIncomeFilter.dateStart
          ? new Date(appliedIncomeFilter.dateStart)
          : null;
        const endDate = appliedIncomeFilter.dateEnd ? new Date(appliedIncomeFilter.dateEnd) : null;
        if (startDate && date < startDate) return false;
        if (endDate && date > endDate) return false;
        return true;
      })
      .filter((t) => {
        if (!appliedIncomeFilter.type || appliedIncomeFilter.type.length === 0) return true;
        return appliedIncomeFilter.type.includes(t.category);
      })
      .filter((t) => {
        const amount = Number(t.baseAmount);
        if (amount < appliedIncomeFilter.amountStart) return false;
        if (appliedIncomeFilter.amountEnd && amount > appliedIncomeFilter.amountEnd) return false;
        return true;
      })
      .map((t) => ({
        id: t.id,
        title: t.title,
        date: t.date,
        amount: Number(t.baseAmount),
        category: t.category || 'Unknown',
        details: 'View',
      }));
  };

  const filteredIncomeData = getFilteredIncomeData();

  const PAGE_SIZE = 10;

  const incomeFilteredData = filteredIncomeData.slice(
    (incomePage - 1) * PAGE_SIZE,
    incomePage * PAGE_SIZE,
  );

  // ----------------------------
  // Filtered Expense Data
  const getFilteredExpenseData = () => {
    return allTransactions?.data
      .filter((t) => t.type === 'expense' && !t.isArchived)
      .filter((t) => {
        const date = new Date(t.date);
        const startDate = appliedExpenseFilter.dateStart
          ? new Date(appliedExpenseFilter.dateStart)
          : null;
        const endDate = appliedExpenseFilter.dateEnd
          ? new Date(appliedExpenseFilter.dateEnd)
          : null;
        if (startDate && date < startDate) return false;
        if (endDate && date > endDate) return false;
        return true;
      })
      .filter((t) => {
        if (!appliedExpenseFilter.type || appliedExpenseFilter.type.length === 0) return true;
        return appliedExpenseFilter.type.includes(t.category);
      })
      .filter((t) => {
        const amount = Number(t.baseAmount);
        if (amount < appliedExpenseFilter.amountStart) return false;
        if (appliedExpenseFilter.amountEnd && amount > appliedExpenseFilter.amountEnd) return false;
        return true;
      })
      .map((t) => ({
        id: t.id,
        title: t.title,
        date: t.date,
        amount: Number(t.baseAmount),
        category: t.category || 'Unknown',
        details: 'View',
      }));
  };

  const filteredExpenseData = getFilteredExpenseData();

  const expenseFilteredData = filteredExpenseData.slice(
    (incomePage - 1) * PAGE_SIZE,
    incomePage * PAGE_SIZE,
  );

  // ----------------------------
  // Apply & Reset Filters
  const applyIncomeFilter = () => {
    setAppliedIncomeFilter({ ...incomeFilterConditions });
    setIncomePage(1);
    setIncomeFilterSlide('110%');
  };
  const resetIncomeFilter = () => {
    setIncomeFilterConditions({
      dateStart: '',
      dateEnd: '',
      type: [],
      amountStart: 0,
      amountEnd: 0,
    });
    setAppliedIncomeFilter({
      dateStart: '',
      dateEnd: '',
      type: [],
      amountStart: 0,
      amountEnd: 0,
    });
    setIncomePage(1);
    setIncomeFilterSlide('110%');
  };

  const applyExpenseFilter = () => {
    setAppliedExpenseFilter({ ...expenseFilterConditions });
    setExpensePage(1);
    setExpenseFilterSlide('110%');
  };
  const resetExpenseFilter = () => {
    setExpenseFilterConditions({
      dateStart: '',
      dateEnd: '',
      type: [],
      amountStart: 0,
      amountEnd: 0,
    });
    setAppliedExpenseFilter({
      dateStart: '',
      dateEnd: '',
      type: [],
      amountStart: 0,
      amountEnd: 0,
    });
    setExpensePage(1);
    setExpenseFilterSlide('110%');
  };

  const options = [
    { key: 'income', label: 'Income' },
    { key: 'expense', label: 'Expense' },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

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
      <div>
        <div className="md:hidden flex justify-center mb-[1rem]">
          <ToggleButton options={options} option={selectedOption} onClick={handleToggle} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
          {/* Income Section */}
          <div
            className={`flex flex-col ${
              selectedOption.key === 'expense' ? 'hidden md:flex' : 'flex'
            }`}
          >
            <div className="flex flex-row flex-wrap justify-between items-center p-[1rem] bg-[var(--general-alpha)] border-[var(--primitive-colors-gray-light-mode-200)] border rounded-tl-2xl rounded-tr-2xl">
              <h3 className="text-2xl">Incomes</h3>
              <div className="md:flex hidden flex-row flex-nowrap justify-end items-center gap-[1rem]">
                <div
                  className="p-[1rem] bg-[var(--background)] rounded-[1rem] flex flex-row justify-between items-center gap-[3rem] cursor-pointer"
                  onClick={() => setIncomeFilterSlide('0px')}
                >
                  <MenuScale />
                  <p>Filter</p>
                </div>

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
              <div className="md:hidden flex flex-row flex-nowrap justify-between items-center gap-[2rem]">
                <MenuScale
                  className="h-7 w-7 cursor-pointer"
                  onClick={() => setIncomeFilterSlide('0px')}
                />
                <p
                  className="p-[.7rem] bg-[var(--primitive-colors-brand-primary-95)] rounded-[1rem] flex flex-row justify-between items-center gap-[1rem] text-[var(--primitive-colors-brand-primary-925)]"
                  onClick={() => {
                    addIncome();
                    resetForm();
                  }}
                >
                  <Plus />
                  Add Income
                </p>
              </div>
            </div>

            {incomeFilteredData.length === 0 ? (
              <EmptyState
                description="You haven't added any income yet. Add your first one to start tracking your finances"
                buttonText="Add Income"
                onAction={() => {
                  addIncome();
                  resetForm();
                }}
              />
            ) : (
              <Table
                onClickChildren={handleTransactionDetail}
                headers={headers}
                data={incomeFilteredData}
                total={filteredIncomeData.length}
                page={incomePage}
                pageSize={10}
                onPageChange={handleIncomePageChange}
                topRemoveRounded={true}
              />
            )}
          </div>

          {/* Expense Section */}
          <div
            className={`flex flex-col ${
              selectedOption.key === 'income' ? 'hidden md:flex' : 'flex'
            }`}
          >
            <div className="flex flex-row flex-wrap justify-between items-center p-[1rem] bg-[var(--general-alpha)] border-[var(--primitive-colors-gray-light-mode-200)] border rounded-tl-2xl rounded-tr-2xl">
              <h3 className="text-2xl">Expenses</h3>

              <div className="md:flex hidden flex-row flex-nowrap justify-end items-center gap-[1rem]">
                <div
                  className="p-[1rem] bg-[var(--background)] rounded-[1rem] flex flex-row justify-between items-center gap-[3rem] cursor-pointer"
                  onClick={() => setExpenseFilterSlide('0px')}
                >
                  <MenuScale />
                  <p>Filter</p>
                </div>

                <Button
                  buttonColor="regularButton"
                  onClick={() => {
                    addExpenses();
                    resetForm();
                  }}
                  textColor="white"
                >
                  Add Expense
                </Button>
              </div>

              <div className="md:hidden flex flex-row flex-nowrap justify-between items-center gap-[2rem]">
                <MenuScale
                  className="h-7 w-7 cursor-pointer"
                  onClick={() => setExpenseFilterSlide('0px')}
                />
                <p
                  className="p-[.7rem] bg-[var(--primitive-colors-brand-primary-95)] rounded-[1rem] flex flex-row justify-between items-center gap-[1rem] text-[var(--primitive-colors-brand-primary-925)]"
                  onClick={() => {
                    addExpenses();
                    resetForm();
                  }}
                >
                  <Plus />
                  Add Expense
                </p>
              </div>
            </div>

            {expenseFilteredData.length === 0 ? (
              <EmptyState
                description="You haven't added any expense yet. Add your first one to start tracking your finances"
                buttonText="Add Expense"
                onAction={() => {
                  addExpenses();
                  resetForm();
                }}
              />
            ) : (
              <Table
                onClickChildren={handleTransactionDetail}
                headers={headers}
                data={expenseFilteredData}
                total={filteredExpenseData.length}
                page={expensePage}
                pageSize={10}
                onPageChange={handleExpensePageChange}
                topRemoveRounded={true}
              />
            )}
          </div>
        </div>
      </div>

      {/* Income Slide------------- */}
      <IncomeUploadSlide
        slide={incomeSlide}
        file={file}
        fileName={fileName}
        onFileChange={handleFileChange}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onNext={async () => {
          setIncomeSlide('110%');
          setIndetailSlide('0px');
          await scanReceipt();
        }}
        onClose={cancelOperation}
        onFileRemove={() => {
          setFile(null);
          setFileName('');
        }}
      />

      {/* Income Detail Form---------------*/}
      <AddIncomeSlide
        errors={errors}
        setErrors={setErrors}
        slide={inDetailSlide}
        loader={loader}
        success={success}
        transaction={oneTransaction}
        incomeType={incomeType}
        file={file}
        fileName={fileName}
        incomeCategories={incomeCategories}
        onTransactionChange={setOneTransaction}
        onIncomeTypeChange={(value) => setIncomeType(value)}
        onCancel={cancelOperation}
        onAdd={() => {
          newTransaction = { ...newTransaction, type: 'income' };
          setOneTransaction(newTransaction);
          addTransaction(newTransaction);
        }}
        onView={() => setTransactionDetail('0px')}
        onClose={cancelOperation}
        onFileRemove={() => {
          const { attachmentURL, ...rest } = oneTransaction;
          setOneTransaction(rest);
          setFile(null);
          setFileName('');
        }}
      />

      {/* Expense Slide---------------- */}
      <ExpenseUploadSlide
        slide={expenseSlide}
        file={file}
        fileName={fileName}
        onFileChange={handleFileChange}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onNext={async () => {
          setExpenseSlide('110%');
          setExdetailSlide('0px');
          await scanReceipt();
        }}
        onClose={cancelOperation}
        onFileRemove={() => {
          setFile(null);
          setFileName('');
        }}
      />

      {/* Expense Detail Form-------------- */}
      <AddExpenseSlide
        errors={errors}
        setErrors={setErrors}
        repeat={repeat}
        repeatOption={repeatOption}
        recurrence={recurrence}
        slide={exDetailSlide}
        loader={loader}
        success={success}
        transaction={oneTransaction}
        expenseType={expenseType}
        file={file}
        fileName={fileName}
        expenseCategories={expenseCategories}
        onTransactionChange={setOneTransaction}
        onExpenseTypeChange={(value) => setExpenseType(value)}
        onRepeatToggle={() => setRepeat(!repeat)}
        onRepeatOptionChange={(value) => setRepeatOption(value)}
        onRecurrenceChange={setRecurrence}
        onCancel={cancelOperation}
        onAdd={() => {
          newTransaction = { ...newTransaction, type: 'expense' };
          setOneTransaction(newTransaction);
          addTransaction(newTransaction);
        }}
        onView={() => setTransactionDetail('0px')}
        onClose={cancelOperation}
        onFileRemove={() => {
          const { attachmentURL, ...rest } = oneTransaction;
          setOneTransaction(rest);
          setFile(null);
          setFileName('');
        }}
      />

      <IncomeExpenseViewSlide
        deleteSuccess={deletetSuccess}
        loader={loader}
        editIncome={() => {
          setEditIncome('0px');
          setUpdateSuccess(false);
          setTransactionDetail('110%');
        }}
        editExpense={() => {
          if (activeRepeatableTransaction?.isArchived == false) {
            const formattedFrequency =
              activeRepeatableTransaction.frequency.charAt(0).toUpperCase() +
              activeRepeatableTransaction.frequency.slice(1).toLowerCase();

            setRepeatOption(formattedFrequency);
            setRecurrence({
              ...recurrence,
              frequency: activeRepeatableTransaction.frequency.toLowerCase(),
              templateTransactionId: activeRepeatableTransaction.templateTransactionId,
              endDate: activeRepeatableTransaction.endDate || '',
            });
            setRepeat(true);
          } else {
            setRepeatOption('');
            setRecurrence(initialRecurrence);
            setRepeat(false);
          }
          setEditExpense('0px');
          setUpdateSuccess(false);
          setTransactionDetail('110%');
        }}
        oneTransaction={oneTransaction}
        transactionDetail={transactionDetail}
        cancelOperation={cancelOperation}
        activeRepeatableTransaction={activeRepeatableTransaction || null}
        deleteTransaction={deleteTransaction}
      />

      <EditIncomeSlide
        // onRepeatToggle={() => setRepeat(!repeat)}
        // onRepeatOptionChange={(value) => setRepeatOption(value)}
        // onRecurrenceChange={setRecurrence}
        // repeat={repeat}
        // repeatOption={repeatOption}
        // recurrence={recurrence}
        errors={errors}
        setErrors={setErrors}
        slide={editIncome}
        loader={loader}
        updateSuccess={updateSuccess}
        transaction={oneTransaction}
        incomeType={incomeType}
        file={file}
        fileName={fileName}
        incomeCategories={incomeCategories}
        onTransactionChange={setOneTransaction}
        onIncomeTypeChange={(value) => setIncomeType(value)}
        onCancel={cancelOperation}
        onAdd={() => updateTransaction()}
        onView={() => {
          setEditIncome('110%');
          setTransactionDetail('0px');
        }}
        onClose={cancelOperation}
        onFileRemove={() => {
          setFile(null);
          setFileName('');
        }}
      />

      <EditExpenseSlide
        errors={errors}
        setErrors={setErrors}
        activeRepeatableTransaction={activeRepeatableTransaction}
        repeat={repeat}
        repeatOption={repeatOption}
        recurrence={recurrence}
        slide={editExpense}
        loader={loader}
        updateSuccess={updateSuccess}
        transaction={oneTransaction}
        expenseType={expenseType}
        file={file}
        fileName={fileName}
        expenseCategories={expenseCategories}
        onTransactionChange={setOneTransaction}
        onExpenseTypeChange={(value) => setExpenseType(value)}
        onRepeatToggle={() => setRepeat(!repeat)}
        onRepeatOptionChange={(value) => setRepeatOption(value)}
        onRecurrenceChange={setRecurrence}
        onCancel={cancelOperation}
        onAdd={() => updateTransaction()}
        onView={() => {
          setEditExpense('110%');
          setTransactionDetail('0px');
        }}
        onClose={cancelOperation}
        onFileRemove={() => {
          setFile(null);
          setFileName('');
        }}
      />

      <IncomeFilterSlide
        slide={incomeFilterSlide}
        applyFilter={applyIncomeFilter}
        resetFilter={resetIncomeFilter}
        onClose={cancelOperation}
        filterConditions={incomeFilterConditions}
        setFilterConditions={setIncomeFilterConditions}
        incomeTypes={incomeTypes}
      />

      <ExpenseFilterSlide
        slide={expenseFilterSlide}
        applyFilter={applyExpenseFilter}
        resetFilter={resetExpenseFilter}
        onClose={cancelOperation}
        filterConditions={expenseFilterConditions}
        setFilterConditions={setExpenseFilterConditions}
        expenseTypes={expenseTypes}
      />
    </div>
  );
};
