import type { Quote, QuotesListProps } from '../types';

const QuotesList = ({
  quotes,
  isLoading,
  total,
  page,
  totalPages,
  searchQuery,
  onSearchChange,
  onPageChange,
  onEditQuote,
  onDeleteQuote
}: QuotesListProps) => {
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Список цитат</h1>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Пошук за автором..." 
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      
      {isLoading ? (
        <p>Завантаження...</p>
      ) : quotes.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {quotes.map((quote: Quote) => (
            <li 
              key={quote.id} 
              style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}
            >
              <p style={{ fontStyle: 'italic', margin: '0 0 10px 0' }}>"{quote.text}"</p>
              <strong style={{ display: 'block', textAlign: 'right' }}>© {quote.author}</strong>
              <div>
                <button onClick={() => onEditQuote(quote)} type='button'>Редагувати</button>
                <button onClick={() => onDeleteQuote(quote.id)} type='button'>Видалити</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Цитат не знайдено.</p>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <button 
          onClick={() => onPageChange(Math.max(0, page - 1))} 
          disabled={page === 0}
          style={{ padding: '8px 16px' }}
        >
          Попередня
        </button>
        <span>
          Сторінка {page + 1} з {totalPages || 1} (Всього цитат: {total})
        </span>
        <button 
          onClick={() => onPageChange(page + 1)}
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