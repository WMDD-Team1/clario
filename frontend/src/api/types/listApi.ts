export interface ListApi<T, M extends Metadata = Metadata> {
  data: T;
  meta: M;
}

export interface Metadata {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
