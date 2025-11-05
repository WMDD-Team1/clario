import { DeliverableApiResponse } from "./projectApi";

export interface InvoiceApiResponse {
    id: string;
    invoiceNumber: number;
    projectId: string;
    milestoneId: string;
    clientName: string;
    clientId: string;
    dueDate: string; // ISO date string
    milestoneName: string;
    amount: number;
    taxAmount: number;
    totalAmount: number;
    status: "Pending" | "Paid" | "Overdue" | string; // you can restrict or extend as needed
    fileUrl: string;
    createdAt: string;
    updatedAt: string;
    sendAt: string;
    deliverables?: DeliverableApiResponse[];
}