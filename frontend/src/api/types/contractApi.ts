export interface ContractApiResponse {
    contractName: string;
    contractUrl: string;
    createdAt: string;
    updatedAt: string;
    fileType: "pdf";
    id: string;
    size: number;
}

export interface DraftApiResponse {
    message: string;
    contract: ContractApiResponse;
}