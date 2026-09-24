export interface Quote {
    id: number;
    author: string;
    text: string;
  }
  
export interface QuotesResponse {
    total: number;
    items: Quote[];
}