import Header from "./components/Header";
import QuotesList from "./components/QuotesList";
import { useState } from "react";
import Modal from "./components/Modal";
import QuoteForm from "./components/QuoteForm";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [quoteToEdit, setQuoteToEdit] = useState(null);
  
  function handleModalClose() {
    setShowModal(false);
    setQuoteToEdit(null);
  }

  return (
    <>
      <Modal isOpen={showModal} onClose={handleModalClose}>
        <QuoteForm quote={quoteToEdit} onSubmit={() => {}} onCancel={handleModalClose} />
      </Modal>
      <Header onOpenModal={() => setShowModal(true)}/>
      <QuotesList />
    </>
  )
}

export default App
