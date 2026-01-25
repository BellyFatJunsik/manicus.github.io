import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ openModal }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleInquiryClick = (e) => {
    e.preventDefault();
    closeMenu();
    if (openModal) {
      openModal();
    }
  };

  return (
    <>
      <div className="PC-GNB" role="banner">
        <div className="header-container">
          <div className="header-left">
            <Link to="/" aria-label="MNCS 홈페이지" onClick={closeMenu}>
              <img
                className="frame"
                src="https://c.animaapp.com/DaKYKUSd/img/frame-22.svg"
                alt="MNCS 로고"
              />
            </Link>
            <nav className="div desktop-nav" role="navigation" aria-label="주요 메뉴">
              <Link
                to="/"
                className="text-wrapper"
                aria-current={location.pathname === '/' ? 'page' : undefined}
              >
                Service
              </Link>
              <Link
                to="/price"
                className="text-wrapper"
                aria-current={location.pathname === '/price' ? 'page' : undefined}
              >
                Price
              </Link>
            </nav>
          </div>
          <div className="header-right">
            <div className="frame-2 desktop-actions">
              <div className="text-wrapper-2">한국어</div>
              <div className="div-wrapper" id="inquiryBtn" style={{ cursor: 'pointer' }}>
                <div className="text-wrapper">상담 문의</div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="hamburger-menu"
          onClick={toggleMenu}
          aria-label="메뉴 열기"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* 모바일 메뉴 오버레이 */}
      <div
        className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
      >
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          <button
            className="mobile-menu-close"
            onClick={closeMenu}
            aria-label="메뉴 닫기"
          >
            ✕
          </button>
          <Link
            to="/"
            className="mobile-menu-logo"
            onClick={closeMenu}
            aria-label="MNCS 홈페이지"
          >
            MNCS
          </Link>
          <nav className="mobile-menu-nav">
            <Link
              to="/"
              className="mobile-menu-item"
              onClick={closeMenu}
              aria-current={location.pathname === '/' ? 'page' : undefined}
            >
              Service
            </Link>
            <Link
              to="/price"
              className="mobile-menu-item"
              onClick={closeMenu}
              aria-current={location.pathname === '/price' ? 'page' : undefined}
            >
              Prices
            </Link>
          </nav>
          <div
            className="mobile-menu-cta"
            onClick={handleInquiryClick}
          >
            <span>Get in Touch</span>
            <span className="arrow">→</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
