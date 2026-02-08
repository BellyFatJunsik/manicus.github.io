import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import InquiryModal from './components/InquiryModal';
import Home from './pages/Home';
import Service from './pages/Service';
import Price from './pages/Price';
import './globals.css';
import './styleguide.css';
import './style.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Header의 상담 문의 버튼 클릭 이벤트를 전역으로 관리
  useEffect(() => {
    const handleInquiryClick = (e) => {
      if (e.target.closest('#inquiryBtn') || e.target.closest('#inquiryBtnHero')) {
        e.preventDefault();
        openModal();
      }
    };

    document.addEventListener('click', handleInquiryClick);
    return () => {
      document.removeEventListener('click', handleInquiryClick);
    };
  }, [openModal]);

  return (
    <BrowserRouter basename="/">
      <div className="KOR-MAIN" data-model-id="613:48310">


        <Header openModal={openModal} />
        <Routes>
          <Route path="/" element={<Home openModal={openModal} />} />
          <Route path="/service" element={<Service openModal={openModal} />} />
          <Route path="/price" element={<Price openModal={openModal} />} />
        </Routes>
        <InquiryModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </BrowserRouter>
  );
}

export default App;
