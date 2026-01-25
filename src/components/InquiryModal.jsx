import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/InquiryModal.css';

const InquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    userName: '',
    phoneNumber: '',
    emailAddress: '',
    inquiryContent: '',
    privacyAgree: false
  });
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const modalRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && (e.target === modalRef.current || e.target.classList.contains('inquiry-modal-overlay'))) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'inquiryContent') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setShowLoadingModal(true);

    try {
      // 서버리스 함수를 통해 이메일 전송
      // Vercel: /api/send-email 자동 생성 (api/send-email.js 파일)
      // 로컬 개발: 백엔드 서버 사용
      const apiUrl = import.meta.env.PROD 
        ? '/api/send-email'  // Vercel 서버리스 함수 (프로덕션)
        : (import.meta.env.VITE_API_URL || 'http://localhost:3001/api/send-email');  // 로컬 개발
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          userName: formData.userName,
          phoneNumber: formData.phoneNumber,
          emailAddress: formData.emailAddress,
          inquiryContent: formData.inquiryContent || '(문의 내용 없음)',
        }),
      });

      if (!response.ok) {
        throw new Error('이메일 전송에 실패했습니다.');
      }

      const result = await response.json();
      
      // 로딩 모달 숨기고 완료 모달 표시
      setShowLoadingModal(false);
      setShowSuccessModal(true);
      
      // 폼 데이터 초기화
      setFormData({
        companyName: '',
        userName: '',
        phoneNumber: '',
        emailAddress: '',
        inquiryContent: '',
        privacyAgree: false
      });
      setCharCount(0);
    } catch (error) {
      console.error('이메일 전송 실패:', error);
      setShowLoadingModal(false);
      alert(`문의 접수 중 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}`);
      setIsSubmitting(false);
    }
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    setIsSubmitting(false);
    onClose();
  };

  const isFormValid = formData.companyName && 
                      formData.userName && 
                      formData.phoneNumber && 
                      formData.emailAddress && 
                      formData.privacyAgree;

  if (!isOpen) return null;

  return (
    <>
      {/* 로딩 모달 */}
      {showLoadingModal && (
        <div className="status-modal">
          <div className="status-modal-overlay"></div>
          <div className="status-modal-content">
            <button 
              className="status-modal-close" 
              onClick={() => {
                setShowLoadingModal(false);
                setIsSubmitting(false);
              }}
              aria-label="모달 닫기"
            >
              &times;
            </button>
            <div className="status-modal-body">
              <div className="status-spinner">
                <svg className="spinner" viewBox="0 0 50 50">
                  <circle
                    className="spinner-path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="4"
                  />
                </svg>
              </div>
              <div className="status-text">접수중</div>
              <button 
                className="status-confirm-btn"
                onClick={() => {
                  setShowLoadingModal(false);
                  setIsSubmitting(false);
                }}
                disabled
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 완료 모달 */}
      {showSuccessModal && (
        <div className="status-modal">
          <div className="status-modal-overlay"></div>
          <div className="status-modal-content">
            <button 
              className="status-modal-close" 
              onClick={handleSuccessConfirm}
              aria-label="모달 닫기"
            >
              &times;
            </button>
            <div className="status-modal-body">
              <div className="status-success-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#334BFF"/>
                  <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="status-text">접수 완료</div>
              <button 
                className="status-confirm-btn active"
                onClick={handleSuccessConfirm}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 문의 모달 */}
      <div className="inquiry-modal" ref={modalRef}>
        <div className="inquiry-modal-overlay"></div>
        <div className="inquiry-modal-content">
        <button 
          className="inquiry-modal-close" 
          onClick={onClose}
          aria-label="모달 닫기"
        >
          &times;
        </button>
        
        <div className="inquiry-banner">
          <div className="inquiry-banner-icon">i</div>
          <Link to="/price" className="inquiry-banner-link">
            <span>예상 견적 및 단가표</span>
          </Link>
        </div>

        <form id="inquiryForm" ref={formRef} className="inquiry-form" onSubmit={handleSubmit}>
          <div className="inquiry-field">
            <label htmlFor="companyName">회사명*</label>
            <input 
              type="text" 
              id="companyName" 
              name="companyName" 
              placeholder="입력" 
              value={formData.companyName}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="inquiry-field">
            <label htmlFor="userName">이름*</label>
            <input 
              type="text" 
              id="userName" 
              name="userName" 
              placeholder="입력" 
              value={formData.userName}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="inquiry-field">
            <label htmlFor="phoneNumber">휴대폰번호*</label>
            <input 
              type="tel" 
              id="phoneNumber" 
              name="phoneNumber" 
              placeholder="입력" 
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="inquiry-field">
            <label htmlFor="emailAddress">이메일주소*</label>
            <input 
              type="email" 
              id="emailAddress" 
              name="emailAddress" 
              placeholder="입력" 
              value={formData.emailAddress}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="inquiry-field">
            <label htmlFor="inquiryContent">문의 내용</label>
            <textarea 
              id="inquiryContent" 
              name="inquiryContent" 
              placeholder="프로젝트 개요, 일정, 참고사항 등 자유롭게 작성해주세요." 
              maxLength="700"
              value={formData.inquiryContent}
              onChange={handleInputChange}
            />
            <div className="inquiry-char-count">
              <span>{charCount}</span>/700
            </div>
          </div>

          <div className="inquiry-field">
            <label className="inquiry-required-label">개인정보 수집 및 이용 동의*</label>
            <div className="inquiry-privacy-box">
              <div className="inquiry-privacy-title">개인정보 수집 및 이용 안내</div>
              <p>매니커스 주식회사(이하 "회사")는 견적 산출 및 상담 문의 처리를 위해 아래와 같이 개인정보를 수집·이용합니다.</p>
              
              <div className="inquiry-privacy-section">
                <div className="inquiry-privacy-subtitle">1. 수집하는 개인정보 항목</div>
                <div className="inquiry-privacy-list">
                  <div className="inquiry-privacy-item">• 회사명</div>
                  <div className="inquiry-privacy-item">• 이름</div>
                  <div className="inquiry-privacy-item">• 휴대폰번호</div>
                  <div className="inquiry-privacy-item">• 이메일주소</div>
                  <div className="inquiry-privacy-item">• 문의내용</div>
                </div>
              </div>

              <div className="inquiry-privacy-section">
                <div className="inquiry-privacy-subtitle">2. 개인정보 수집 및 이용 목적</div>
                <div className="inquiry-privacy-list">
                  <div className="inquiry-privacy-item">• 홈페이지 제작 및 서비스에 대한 견적 산출</div>
                  <div className="inquiry-privacy-item">• 문의사항 확인 및 상담 응대</div>
                  <div className="inquiry-privacy-item">• 견적 결과 및 관련 안내 전달</div>
                </div>
              </div>

              <div className="inquiry-privacy-section">
                <div className="inquiry-privacy-subtitle">3. 개인정보 보유 및 이용 기간</div>
                <p className="inquiry-privacy-text">문의 처리 완료일로부터 1년간 보관 후 지체 없이 파기</p>
                <p className="inquiry-privacy-text">단, 관련 법령에 따라 보관이 필요한 경우 해당 기간 동안 보관할 수 있습니다.</p>
              </div>

              <div className="inquiry-privacy-section">
                <div className="inquiry-privacy-subtitle">4. 동의 거부에 대한 안내</div>
                <p className="inquiry-privacy-text">개인정보 수집 및 이용에 대한 동의를 거부할 수 있으며, 동의하지 않을 경우 견적 제출 및 상담 서비스 이용이 제한될 수 있습니다.</p>
              </div>

              <p className="inquiry-privacy-footer">회사는 수집된 개인정보를 본 안내에 명시된 목적 외의 용도로 이용하지 않으며, 개인정보 보호 관련 법령을 준수하여 안전하게 관리합니다.</p>
            </div>
            <label className="inquiry-checkbox-label">
              <input 
                type="checkbox" 
                id="privacyAgree" 
                name="privacyAgree" 
                checked={formData.privacyAgree}
                onChange={handleInputChange}
                required 
              />
              <span>견적 산출 및 상담 응대를 위해 개인정보를 수집·이용하는 것에 동의합니다.</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="inquiry-submit-btn" 
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? '전송 중...' : '제출하기'}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default InquiryModal;
