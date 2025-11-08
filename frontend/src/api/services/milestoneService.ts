import { MilestoneApiResponse } from "@/api";
import api from "../api";

export const createMilestone = async (data: any, projectId: string): Promise<{milestone: MilestoneApiResponse}> => {
    try {
        const res = await api.post<MilestoneApiResponse>(`/projects/${projectId}/milestones`, data);
        data = res.data;
    } catch (err) {
        console.error('Error creating milestone for project ' + projectId + ": " + err);
    }
    return data;
}

export const updateMilestone = async (id: string, data: any, projectId: string): Promise<{milestone: MilestoneApiResponse}> => {
    try {
        const res = await api.patch<MilestoneApiResponse>(`/projects/${projectId}/milestones/${id}`, data);
        data = res.data;
    } catch (err) {
        console.error('Error creating milestone for project ' + projectId + ": " + err);
    }
    return data;
}