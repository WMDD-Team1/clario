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

interface Address {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

interface Project {
  id: string;
  name: string;
}

export interface Client {
  id: string;
  name: string;
  type: 'Individual' | 'Company';
  email: string;
  phone: string;
  address: Address;
  notes: string;
  isArchived: boolean;
  projectCount: number;
  invoiceCount: number;
  projects: Project[];
  createdAt: string;
  updatedAt: string;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ClientResponse {
  data: Client[];
  meta: Meta;
}