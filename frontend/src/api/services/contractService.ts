import api from "@api/api"
import { DraftApiResponse } from "@api/types/contractApi";

export const generateContractDraft = async (projectId: string): Promise<string> => {
    try {
        const { data } = await api.post<DraftApiResponse>(`/contracts/draft/${projectId}`);
        return data.contract.contractUrl;
    } catch (err) {
        console.error("Error generating the contract: " + err);
        return "";
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