import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import QuotesList from "./components/QuotesList";
import Modal from "./components/Modal";
import QuoteForm from "./components/QuoteForm";
import type { Quote, QuoteFormValues, QuotesResponse } from "./types";

const PAGE_SIZE = 10;

function App() {
  const [showModal, setShowModal] = useState(false);
  const [quoteToEdit, setQuoteToEdit] = useState<Quote | null>(null);

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    
  const totalPages = Math.ceil(total / PAGE_SIZE);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: PAGE_SIZE.toString(),
      });

      if (debouncedSearchQuery.trim()) {
        params.append('author', debouncedSearchQuery.trim());
      }

      const response = await fetch(`http://localhost:8080/quotes?${params.toString()}`);
      if (response.ok) {
        const data: QuotesResponse = await response.json();
        setQuotes(data.items);
        setTotal(data.total);
      }
    } catch (error) {
      console.error('Помилка мережі при завантаженні цитат:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedSearchQuery]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  function handleModalClose() {
    setShowModal(false);
    setQuoteToEdit(null);
  }

  function handleSearchChange(query: string) {
    setSearchQuery(query);
    setPage(0);
  }

  async function handleQuoteSubmit(data: QuoteFormValues) {
    try {
      const url = quoteToEdit 
        ? `http://localhost:8080/quotes/${quoteToEdit.id}` 
        : `http://localhost:8080/quotes`;
        
      const method = quoteToEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        handleModalClose(); 
        fetchQuotes();
      }
    } catch (error) {
      console.error('Помилка мережі:', error);
    }
  }

  return (
    <>
      <Modal isOpen={showModal} onClose={handleModalClose}>
        <h2>{quoteToEdit ? "Редагування цитати" : "Створення нової цитати"}</h2>
        <QuoteForm 
          quote={quoteToEdit} 
          onSubmit={handleQuoteSubmit} 
          onCancel={handleModalClose} 
        />
      </Modal>
      <Header onOpenModal={() => setShowModal(true)} />
      <QuotesList 
        quotes={quotes}
        isLoading={isLoading}
        total={total}
        page={page}
        totalPages={totalPages}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onPageChange={setPage}
      />
    </>
  );
}

export default App;
