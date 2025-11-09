export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  currency: string;
  province: string;
  address?: {
    street?: string;
    postalCode?: string;
    city?: string;
    country?: string;
  };
  userType: 'Freelancer' | 'Contractor' | 'Developer' | 'Designer' | 'Consultant' | 'Other' | null;
  defaultFeeType: 'Fixed price' | 'Milestone based' | 'Hourly' | 'Retainer' | null;
  goal: 'Keep finances stable' | 'Grow my business' | 'Save time' | 'Stay tax-ready' | null;
  onBoardingCompletedAt: string;
  settings: {
    general: {
      language: 'en' | 'fr';
      theme: 'light' | 'dark';
    };
    finance: {
      province: 'British Columbia' | 'Quebec';
      incomeCategories: string[];
      expenseCategories: string[];
    };
  };
  createdAt: string;
  updatedAt: string;
}
