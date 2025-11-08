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

export const updateInvoice = async (id: string, status: string): Promise<boolean> => {
    try {
        await api.patch<InvoiceApiResponse>(`/invoices/${id}/status`, {status});
        return true;
    } catch (err) {
        console.log('Error updating invoice: ' + err);
        return false;
    }
}

export const sendInvoice = async (id: string): Promise<boolean> => {
    try {
        const res = await api.post<{success: boolean}>(`/invoices/${id}/send`);
        return res.data.success ?? false;
    } catch (err) {
        console.log('Error updating invoice: ' + err);
        return false;
    }
}