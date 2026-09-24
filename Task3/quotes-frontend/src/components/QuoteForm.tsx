import type { QuoteFormProps } from "../types";
import { useState } from "react";

export default function QuoteForm({quote, onSubmit, onCancel}: QuoteFormProps) {
    const [author, setAuthor] = useState(quote ? quote.author : '');
    const [text, setText] = useState(quote ? quote.text : '');
    const [errors, setErrors] = useState<{ author?: string; text?: string }>({});
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validateForm()) return;
        onSubmit({ author, text });
    }

    function validateForm() {
        const newErrors: { author?: string; text?: string } = {};
        let isValid = true;

        if (!author.trim()) {
            newErrors.author = 'Автор обов\'язковий';
            isValid = false;
        } else if (author.length > 200) {
            newErrors.author = 'Автор не може бути довшим за 200 символів';
            isValid = false;
        }
        
        if (!text.trim()) {
            newErrors.text = 'Цитата обов\'язкова';
            isValid = false;
        } else if (text.length > 1000) {
            newErrors.text = 'Цитата не може бути довшою за 1000 символів';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="author">Автор:</label>
                <input 
                    required 
                    type="text" 
                    id="author" 
                    name="author" 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)} 
                    style={{ borderColor: errors.author ? 'red' : 'initial' }}
                />
                {errors.author && <div style={{ color: 'red', fontSize: '12px' }}>{errors.author}</div>}
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="text">Цитата:</label>
                <textarea 
                    required 
                    rows={5} 
                    cols={25} 
                    id="text" 
                    name="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                    style={{ borderColor: errors.text ? 'red' : 'initial' }}
                />
                {errors.text && <div style={{ color: 'red', fontSize: '12px' }}>{errors.text}</div>}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit">{quote ? "Внести зміни" : "Додати цитату"}</button>
                <button type="button" onClick={onCancel}>Скасувати</button>
            </div>
        </form>
    );
}