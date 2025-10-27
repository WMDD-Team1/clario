export interface ApiResponse {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface ClientApiResponse {
  id: string;
  type: 'Individual' | 'Company'; // assuming only these two
  name: string;
  email: string;
  phone: string;
  notes: string;
  isArchived: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  address: ApiResponse;
  projects: any[]; // you can replace `any` with your Project type if defined
  invoices: number;
  projectCount: number;
  invoiceCount: number;
}