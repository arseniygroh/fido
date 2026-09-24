import Header from "./components/Header";
import QuotesList from "./components/QuotesList";
import { useState } from "react";
import Modal from "./components/Modal";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div>Hello World</div>
      </Modal>
      <Header onOpenModal={() => setShowModal(true)}/>
      <QuotesList />
    </>
  )
}

export default App
