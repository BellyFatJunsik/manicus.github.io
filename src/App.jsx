import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import InquiryModal from './components/InquiryModal';
import Home from './pages/Home';
import Products from './pages/Products';
import License from './pages/License';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <BrowserRouter basename="/">
      <div className="flex min-h-svh flex-col">
        <Header openModal={openModal} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home openModal={openModal} />} />
            <Route path="/products" element={<Products openModal={openModal} />} />
            <Route path="/license" element={<License openModal={openModal} />} />
            <Route path="/service" element={<Products openModal={openModal} />} />
            <Route path="/price" element={<License openModal={openModal} />} />
          </Routes>
        </main>
        <Footer openModal={openModal} />
        <InquiryModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </BrowserRouter>
  );
}
