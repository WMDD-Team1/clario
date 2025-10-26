export interface ListApi<T> {
    data: T;
    meta: Metadata;
}

export interface Metadata {
    total: number;
    page: number;
    limit: number;
    totalPages: number
}