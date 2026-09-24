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