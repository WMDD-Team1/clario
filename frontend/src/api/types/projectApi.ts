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
}

export interface MilestoneApiResponse {
    id: string;
    name: string;
    description: string;
    dueDate: string;
    amount: number;
    isCompleted: boolean;
    isArchived: boolean;
    generateInvoice: "on_completion" | "on_due_date";
    deliverables: DeliverableApiResponse[];
}

export interface DeliverableApiResponse {
    id: string;
    name: string;
    description: string;
    fileUrls: string[];
    status: "Pending" | "Completed";
    dueDate: string;
}
export interface OverviewItem {
    key: string;
    title: string;
    value: string;
}
export interface ProjectOverview {
    total: number;
    active: number;
    inactive: number;
    archived: number;
    clients: number;
}