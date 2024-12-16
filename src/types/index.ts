export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  position: number;
  cached_page_url?: string;
}

export interface CachedResults {
  keyword: string;
  city: string;
  results: SearchResult[];
  timestamp: Date;
}

export interface SearchParams {
  keyword: string;
  city: string;
  page?: number;
}
