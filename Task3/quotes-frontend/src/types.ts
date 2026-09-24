export interface Quote {
    id: number;
    author: string;
    text: string;
  }
  
export interface QuotesResponse {
    total: number;
    items: Quote[];
}

export interface QuoteFormValues {
    author: string;
    text: string;
}

export interface QuoteFormProps {
    quote?: Quote;
    onSubmit: (data: QuoteFormValues) => void;
    onCancel: () => void;
}

export interface QuotesListProps {
    quotes: Quote[];
    isLoading: boolean;
    total: number;
    page: number;
    totalPages: number;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onPageChange: (newPage: number) => void;
    onEditQuote: (quote: Quote) => void;
    onDeleteQuote: (id: number) => void;
}