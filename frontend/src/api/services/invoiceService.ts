import { InvoiceApiResponse, ListApi } from "@/api";
import api from "@api/api";

export const fetchInvoicesByProject = async (params: {
    projectId: string,
    page?: number,
}): Promise<ListApi<InvoiceApiResponse[]>> => {
    let data: ListApi<InvoiceApiResponse[]> = {
        data: [],
        meta: {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 1
        }
    };
    try {
        const res = await api.get<ListApi<InvoiceApiResponse[]>>("/invoices", { params });
        data = res.data;
    } catch (err) {
        console.log('Error fetching invoices: ' + err);
    }
    return data;
}