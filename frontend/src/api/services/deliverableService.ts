import { DeliverableApiResponse } from "@/api";
import api from "../api";

export const createDeliverable = async (data: any, projectId: string, milestoneId: string): Promise<DeliverableApiResponse> => {
    try {
        const res = await api.post<DeliverableApiResponse>(`/projects/${projectId}/milestones/${milestoneId}/deliverables`, data);
        data = res.data;
    } catch (err) {
        console.error('Error creating deliverable for milestone ' + milestoneId + ": " + err);
    }
    return data;
}

export const updateDeliverable = async (id: string, data: any, projectId: string, milestoneId: string): Promise<DeliverableApiResponse> => {
    try {
        const res = await api.patch<DeliverableApiResponse>(`/projects/${projectId}/milestones/${milestoneId}/deliverables/${id}`, data);
        data = res.data;
    } catch (err) {
        console.error('Error creating deliverable for milestone ' + milestoneId + ": " + err);
    }
    return data;
}