import api from "@api/api"
import { DraftApiResponse } from "@api/types/contractApi";
import { ProjectApiResponse } from "@api/types/projectApi";

export const generateContractDraft = async (projectId: string): Promise<string> => {
    try {
        const { data } = await api.post<DraftApiResponse>(`/contracts/draft/${projectId}`);
        return data.contract.contractUrl;
    } catch (err) {
        console.error("Error generating the contract: " + err);
        return "";
    }
}

export const extractContract = async (file: File): Promise<ProjectApiResponse | null> => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const { data } = await api.post<{ message: string; projectInput: ProjectApiResponse | null }>("/contracts/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (!data.message.includes("successfully")) return null;
        return data.projectInput!;
    } catch (err) {
        console.error("Error generating the contract: " + err);
        return null;
    }
}

export const postAnalyzeContract = async (projectId: string, file: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("projectId", projectId);

        const { data } = await api.post<DraftApiResponse>("/contracts/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (!data.message.includes("successfully")) return "";
        await api.post(`/contracts/analyze/${projectId}`);
        return data.contract.contractUrl;
    } catch (err) {
        console.error("Error generating the contract: " + err);
        return "";
    }
}