import { useState, useEffect } from 'react';

interface Quote {
  id: number;
  author: string;
  text: string;
}

interface QuotesResponse {
  total: number;
  items: Quote[];
}

const PAGE_SIZE = 10;

const QuotesList = () => {
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
  
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(() => {
    let ignore = false;

    const fetchQuotes = async () => {
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
          if (!ignore) {
            setQuotes(data.items);
            setTotal(data.total);
          }
        } else {
          console.error('Помилка сервера:', response.status);
        }
      } catch (error) {
        console.error('Помилка мережі при завантаженні цитат:', error);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchQuotes();

    return () => {
      ignore = true;
    };
  }, [page, debouncedSearchQuery]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Список цитат</h1>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Пошук за автором..." 
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(0);
          }}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      {isLoading ? (
        <p>Завантаження...</p>
      ) : quotes.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {quotes.map((quote) => (
            <li 
              key={quote.id} 
              style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}
            >
              <p style={{ fontStyle: 'italic', margin: '0 0 10px 0' }}>"{quote.text}"</p>
              <strong style={{ display: 'block', textAlign: 'right' }}>© {quote.author}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>Цитат не знайдено.</p>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <button 
          onClick={() => setPage((p) => Math.max(0, p - 1))} 
          disabled={page === 0}
          style={{ padding: '8px 16px' }}
        >
          Попередня
        </button>
        
        <span>
          Сторінка {page + 1} з {totalPages || 1} (Всього цитат: {total})
        </span>
        
        <button 
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages - 1 || totalPages === 0}
          style={{ padding: '8px 16px' }}
        >
          Наступна
        </button>
      </div>
    </div>
  );
};

export default QuotesList;