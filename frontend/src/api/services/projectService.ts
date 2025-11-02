import { ListApi, ProjectApiResponse } from "@/api";
import api from "../api";

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