import { ListApi, ProjectApiResponse } from "@/api";
import api from "../api";

export const fetchAllProjects = async (params?: {
    status?: string,
    sortBy?: string,
    page?: number,
    viewType?: string ,
    search?: string,
}): Promise<ListApi<ProjectApiResponse[]>> => {
    console.log(params);
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
        const res = await api.get<ListApi<ProjectApiResponse[]>>("/projects", {params});
        data = res.data;
    } catch (err) {
        console.log('Error fetching projects: ' + err);
    }
    return data;
}