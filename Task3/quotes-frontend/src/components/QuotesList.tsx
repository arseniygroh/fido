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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Список цитат</h1>
        <div className="w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Пошук за автором" 
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <p className="text-gray-500 font-medium animate-pulse">Завантаження...</p>
        </div>
      ) : quotes.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {quotes.map((quote: Quote) => (
            <li 
              key={quote.id} 
              className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <p className="text-xl italic text-gray-800 mb-4">"{quote.text}"</p>
              <strong className="block text-right text-gray-500 text-sm font-semibold">
                {quote.author}
              </strong>
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => onEditQuote(quote)} 
                  type="button"
                  className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium rounded-lg transition-colors"
                >
                  Редагувати
                </button>
                <button 
                  onClick={() => onDeleteQuote(quote.id)} 
                  type="button"
                  className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg transition-colors"
                >
                  Видалити
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
          <p className="text-gray-500">За вашим запитом цитат не знайдено.</p>
        </div>
      )}
      <div className="flex justify-between items-center mt-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <button 
          onClick={() => onPageChange(Math.max(0, page - 1))} 
          disabled={page === 0}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Попередня
        </button>
        <span className="text-gray-600 font-medium text-sm text-center px-4">
          Сторінка {page + 1} з {totalPages || 1} 
          <span className="hidden sm:inline"> (Всього цитат: {total})</span>
        </span>
        <button 
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1 || totalPages === 0}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Наступна
        </button>
      </div>
    </div>
  );
};

export default QuotesList;