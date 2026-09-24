import Header from "./components/Header";
import QuotesList from "./components/QuotesList";
import { useState } from "react";
import Modal from "./components/Modal";
import QuoteForm from "./components/QuoteForm";
import type { Quote, QuoteFormValues } from "./types";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [quoteToEdit, setQuoteToEdit] = useState<Quote | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  function handleModalClose() {
    setShowModal(false);
    setQuoteToEdit(null);
  }

  async function handleQuoteSubmit(data: QuoteFormValues) {
    try {
      const url = quoteToEdit 
        ? `http://localhost:8080/quotes/${quoteToEdit.id}` 
        : `http://localhost:8080/quotes`;
        
      const method = quoteToEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        handleModalClose();
        setRefreshTrigger(prev => prev + 1);
      } else {
        console.error('Помилка при збереженні цитати');
        // TODO
      }
    } catch (error) {
      console.error('Помилка мережі:', error);
    }
  }

  return (
    <>
      <Modal isOpen={showModal} onClose={handleModalClose}>
        <QuoteForm quote={quoteToEdit} onSubmit={handleQuoteSubmit} onCancel={handleModalClose} />
      </Modal>
      <Header onOpenModal={() => setShowModal(true)}/>
      <QuotesList refreshTrigger={refreshTrigger} />
    </>
  )
}

export default App
