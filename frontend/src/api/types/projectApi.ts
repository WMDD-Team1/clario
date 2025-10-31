export interface ProjectApiResponse {
    userId: string;
    clientId: string | null | { id: string, name: string };
    name: string;
    description: string;
    type: string;
    totalBudget: number;
    status: 'Planning' | 'In-Progress' | 'Review' | 'Done';
    isActive: boolean;
    isArchived: boolean;
    startDate: string; // ISO date string
    dueDate: string;   // ISO date string
    milestones?: MilestoneApiResponse[]; // define below if needed
    createdAt: string;
    updatedAt: string;
    id: string;
    clientName: string | null;
    milestonesCount: number;
}

export interface MilestoneApiResponse {
    id: string;
    name: string;
    description: string;
    dueDate: string;
    amount: number;
    status: "Pending" | "In-Progress" | "Completed";
    generateInvoice: "on_completion" | "on_due_date";
    deliverables: DeliverableApiResponse[];
}

export interface DeliverableApiResponse {
    id: string;
    name: string;
    description: string;
    fileUrl: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}
