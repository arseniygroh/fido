import type { QuoteFormProps } from "../types";
import { useState, useEffect } from "react";

export default function QuoteForm({quote, onSubmit, onCancel}: QuoteFormProps) {
    const [author, setAuthor] = useState(quote ? quote.author : '');
    const [text, setText] = useState(quote ? quote.text : '');
    const [errors, setErrors] = useState<{ author?: string; text?: string }>({});
    
    useEffect(() => {
        if (quote) {
            setAuthor(quote.author);
            setText(quote.text);
        } else {
            setAuthor('');
            setText('');
        }
    }, [quote]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validateForm()) return;
        onSubmit({ author, text });
    }

    function validateForm() {
        const newErrors: { author?: string; text?: string } = {};
        let isValid = true;

        if (!author.trim()) {
            newErrors.author = "Автор обов'язковий";
            isValid = false;
        } else if (author.length > 200) {
            newErrors.author = 'Автор не може бути довшим за 200 символів';
            isValid = false;
        }
        
        if (!text.trim()) {
            newErrors.text = "Цитата обов'язкова";
            isValid = false;
        } else if (text.length > 1000) {
            newErrors.text = 'Цитата не може бути довшою за 1000 символів';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5">
            <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                    Автор:
                </label>
                <input 
                    required 
                    type="text" 
                    id="author" 
                    name="author" 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)} 
                    className={`w-full px-4 py-2 border rounded-lg outline-none transition-all duration-200 ${
                        errors.author 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }`}
                />
                {errors.author && <div className="text-red-500 text-sm mt-1">{errors.author}</div>}
            </div>

            <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                    Цитата:
                </label>
                <textarea 
                    required 
                    rows={5} 
                    id="text" 
                    name="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg outline-none transition-all duration-200 resize-none ${
                        errors.text 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }`}
                />
                {errors.text && <div className="text-red-500 text-sm mt-1">{errors.text}</div>}
            </div>

            <div className="flex justify-end gap-3 mt-2">
                <button 
                    type="button" 
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                    Скасувати
                </button>
                <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                    {quote ? "Внести зміни" : "Додати цитату"}
                </button>
            </div>
        </form>
    );
}