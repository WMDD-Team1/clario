import { User } from '@models/user';
import { UserApiResponse } from '@api/types/userApi';

export function mapUser(apiUser: UserApiResponse): User {
  return {
    id: apiUser.id,
    email: apiUser.email,
    name: apiUser.name,
    picture: apiUser.picture,
    address: {
      street: apiUser.address?.street,
      postalCode: apiUser.address?.postalCode,
      city: apiUser.address?.city,
      country: apiUser.address?.country,
    },
    currency: apiUser.currency,
    province: apiUser.province,
    userType: apiUser.userType as
      | 'Freelancer'
      | 'Contractor'
      | 'Developer'
      | 'Designer'
      | 'Consultant'
      | 'Other'
      | null,
    defaultFeeType: apiUser.defaultFeeType as
      | 'Fixed price'
      | 'Milestone based'
      | 'Hourly'
      | 'Retainer'
      | null,
    goal: apiUser.goal as
      | 'Keep finances stable'
      | 'Grow my business'
      | 'Save time'
      | 'Stay tax-ready'
      | null,
    onBoardingCompletedAt: apiUser.onBoardingCompletedAt,
    settings: apiUser.settings
      ? {
          general: {
            language: apiUser.settings.general?.language || 'en',
            theme: apiUser.settings.general?.theme || 'light',
          },
          finance: {
            province: apiUser.settings.finance?.province || 'British Columbia',
            incomeCategories: apiUser.settings.finance?.incomeCategories || [],
            expenseCategories: apiUser.settings.finance?.expenseCategories || [],
          },
        }
      : {
          general: { language: 'en', theme: 'light' },
          finance: {
            province: 'British Columbia',
            incomeCategories: [],
            expenseCategories: [],
          },
        },
    createdAt: apiUser.createdAt,
    updatedAt: apiUser.updatedAt,
  };
}
