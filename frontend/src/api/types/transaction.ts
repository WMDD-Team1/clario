export interface TransactionFormat {
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
  };


  export interface Category {
    id: string;
    name: string;
    type: string;
  }

  export interface categoriesResonse {
    income: Category[];
    expense: Category[];
  }

  export interface RecurrenceFormat {
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


  export interface PostRecurrenceFormat {
    templateTransactionId: string;
    frequency: string;
    endDate: string;
  }

  export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }