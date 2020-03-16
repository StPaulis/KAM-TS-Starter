export interface Searcher {
  start?: number;
  length?: number;
  filters: SearchFilter[];
  order?: SearchOrder[];
}

export interface SearchFilter {
  name: string;
  value: any;
}

export interface SearchOrder {
  name: string;
  value: 'asc' | 'desc';
}

export interface SearcherResponse<T> {
  total: number;
  filtered: number;
  data: T[];
}
