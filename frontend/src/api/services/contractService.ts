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