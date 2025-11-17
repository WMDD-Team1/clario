import { ListApi, ClientApiResponse } from "@/api";
import api from "../api";

export const fetchAllClients = async (params?: {
    sortBy?: string,
    page?: number,
    viewType?: string ,
    search?: string,
}): Promise<ListApi<ClientApiResponse[]>> => {
    let data: ListApi<ClientApiResponse[]> = {
        data: [],
        meta: {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 1
        }
    };
    try {
        const res = await api.get<ListApi<ClientApiResponse[]>>("/clients?limit=1000", {params});
        data = res.data;
    } catch (err) {
        console.log('Error fetching clients: ' + err);
    }
    return data;
}