import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <div className="PC-GNB" role="banner">
      <Link to="/" aria-label="MNCS 홈페이지">
        <img 
          className="frame" 
          src="https://c.animaapp.com/DaKYKUSd/img/frame-22.svg" 
          alt="MNCS 로고" 
        /> 
      </Link>
      <nav className="div" role="navigation" aria-label="주요 메뉴">
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
      <div className="frame-2">
        <div className="text-wrapper-2">한국어</div>
        <div className="div-wrapper" id="inquiryBtn" style={{cursor: 'pointer'}}>
          <div className="text-wrapper">상담 문의</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
