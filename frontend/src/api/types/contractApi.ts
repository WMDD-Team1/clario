export interface ContractApiResponse {
    contractName: string;
    contractUrl: string;
    createdAt: string;
    updatedAt: string;
    fileType: "pdf";
    id: string;
    size: number;
    aiAnalysis?: { riskyClauses: RiskAnalysisApiResponse[] };
}

export interface RiskWithId extends RiskAnalysisApiResponse {
    id: string;
}

export interface RiskAnalysisApiResponse {
    category: string;
    paragraph: string;
    reason: string;
    riskLevel: "Low" | "Medium" | "High";
}

export interface DraftApiResponse {
    message: string;
    contract: ContractApiResponse;
}