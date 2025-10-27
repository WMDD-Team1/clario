export interface OverviewResponse {
  totalProjects: number;
  activeProjects: number;
  inactiveProjects: number;
  archivedProjects: number;
  totalClients: number;
  totalBudget: number;
  activeBudget: number;
}

export interface ReminderResponse {
  projectId: string;
  milestoneId: string;
  deliverableId: string;
  deliverableName: string;
  milestoneName: string;
  clientName: string;
  dueDate: string;
}

export interface InsightItem {
  title: string;
  text: string;
  month: string;
}

export interface InsightListResponse {
  data: InsightItem[];
  meta: {
    total: number;
  };
}
