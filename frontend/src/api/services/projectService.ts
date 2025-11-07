import { ListApi, OverviewItem, ProjectApiResponse, ProjectOverview } from "@/api";
import api from "../api";
import { formatCurrency } from "@utils/formatCurrency";

export const fetchAllProjects = async (params?: {
    status?: string,
    sortBy?: string,
    page?: number,
    viewType?: string,
    search?: string,
}): Promise<ListApi<ProjectApiResponse[]>> => {
    let data: ListApi<ProjectApiResponse[]> = {
        data: [],
        meta: {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 1
        }
    };
    try {
        const res = await api.get<ListApi<ProjectApiResponse[]>>("/projects", { params });
        data = res.data;
    } catch (err) {
        console.log('Error fetching projects: ' + err);
    }
    return data;
}

export const fetchProjectById = async (id: string): Promise<ProjectApiResponse> => {
    const res = await api.get<ProjectApiResponse>(`/projects/${id}`);
    return res.data;
}

export const createProject = async (data: any): Promise<ProjectApiResponse> => {
    try {
        const res = await api.post<ProjectApiResponse>("/projects", data);
        data = res.data;
    } catch (err) {
        console.log('Error creating project: ' + err);
    }
    return data;
}

export const updateProject = async (id: string, data: any): Promise<ProjectApiResponse> => {
    try {
        const res = await api.patch<ProjectApiResponse>(`/projects/${id}`, data);
        data = res.data;
    } catch (err) {
        console.log('Error creating project: ' + err);
    }
    return data;
}

export const toggleArchiveProject = async (id: string, isArchived: boolean): Promise<boolean> => {
    try {
        const res = await api.patch<ProjectApiResponse>(`/projects/${id}/archive`, { isArchived });
        return true;
    } catch (err) {
        console.log('Error creating project: ' + err);
        return false;
    }
}

export const fetchProjectsOverview = async (): Promise<OverviewItem[]> => {
    const overview: OverviewItem[] = [
        { key: "totalBudget", title: "Total", value: "$0" },
        { key: "activeBudget", title: "Active", value: "$0" },
        { key: "inactiveProjects", title: "Inactive", value: "0" },
        { key: "archivedProjects", title: "Archived", value: "0" },
        { key: "totalClients", title: "Clients", value: "0" },
    ];

    try {
        const { data } = await api.get<ProjectOverview>("/projects/overview");

        return overview.map(item => {
            switch (item.key) {
                case "totalBudget": return { ...item, value: `$${formatCurrency(data.total ?? 0)}` };
                case "activeBudget": return { ...item, value: `$${formatCurrency(data.active ?? 0)}` };
                case "inactiveProjects": return { ...item, value: String(data.inactive ?? 0) };
                case "archivedProjects": return { ...item, value: String(data.archived ?? 0) };
                case "totalClients": return { ...item, value: String(data.clients ?? 0) };
                default: return item;
            }
        });
    } catch (err) {
        console.error("Failed to fetch project overview", err);
        return overview;
    }
};

