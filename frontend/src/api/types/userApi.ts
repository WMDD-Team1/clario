import { Dispatch, SetStateAction } from 'react';

export interface UserApiResponse {
  id: string;
  email: string;
  name: string;
  picture: string;
  currency: string;
  province: string;
  address: {
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

export interface OnboardingForm {
  userType?: string;
  defaultFeeType?: string;
  goal?: string;
}

export const roleOptions: string[] = [
  'Freelancer',
  'Contractor',
  'Developer',
  'Designer',
  'Consultant',
  'Other',
];

export const feeOptions: string[] = ['Fixed price', 'Milestone Based', 'Hourly', 'Retainer'];

export const goalOptions: string[] = [
  'Keep finances stable',
  'Grow my business',
  'Save time',
  'Stay tax-ready',
];

export interface StepProps {
  next?: () => void;
  prev?: () => void;
  formData: OnboardingForm;
  setFormData: Dispatch<SetStateAction<OnboardingForm>>;
}
