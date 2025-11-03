export interface Contract {
    id: string;
    contractUrl: string;
    fileType: string;
    size: number;
}

export interface DraftApiResponse {
    message: string;
    contract: Contract;
}