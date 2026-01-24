import { useRef, useEffect, useState } from 'react';

const QuoteSummary = ({ selectedItems, totalAmount, onSubmit }) => {
  const spanRef = useRef(null);
  const [spanWidth, setSpanWidth] = useState(0);
  const summaryRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [topOffset, setTopOffset] = useState(0);

  useEffect(() => {
    if (spanRef.current) {
      setSpanWidth(spanRef.current.offsetWidth);
    }
  }, [totalAmount]);

  useEffect(() => {
    const handleScroll = () => {
      if (summaryRef.current) {
        const rect = summaryRef.current.getBoundingClientRect();
        const parentElement = summaryRef.current.parentElement;
        
        if (parentElement) {
          const parentRect = parentElement.getBoundingClientRect();
          const shouldSticky = rect.top <= 100 && parentRect.top <= 100;
          setIsSticky(shouldSticky);
          
          if (shouldSticky) {
            setTopOffset(100);
          }
        }
      }
    };

    const handleResize = () => {
      if (summaryRef.current) {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll(); // 초기 상태 확인

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={summaryRef}
      className="quote-summary"
      style={{
        position: isSticky ? 'fixed' : 'sticky',
        top: isSticky ? `${topOffset}px` : '100px',
        width: isSticky && summaryRef.current ? `${summaryRef.current.offsetWidth}px` : '480px',
        right: isSticky ? 'auto' : 'auto',
        left: isSticky && summaryRef.current ? `${summaryRef.current.getBoundingClientRect().left}px` : 'auto'
      }}
    >
      <div className="quote-summary-title">견적 금액</div>
      <div className="quote-summary-content">
        <div className="quote-total-section">
          <div className="quote-total-content">
            <div className="quote-total-label">총 금액</div>
            <div className="quote-total-amount-wrapper">
              <div className="quote-total-amount">
                <span ref={spanRef}>{totalAmount.toLocaleString('ko-KR')}원</span>
                <img 
                  className="quote-total-icon"
                  src="https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/vector-13.svg"
                  alt=""
                  style={{ width: spanWidth > 0 ? `${spanWidth}px` : 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="quote-items-list">
          {selectedItems.length === 0 ? (
            <div className="quote-empty">선택된 항목이 없습니다</div>
          ) : (
            selectedItems.map((item) => (
              <div key={item.id} className="quote-item">
                <div className="quote-item-name">
                  {item.name}
                  {item.hasQuantity && ` (${item.quantity}${item.unit || '개'})`}
                </div>
                <div className="quote-item-price">
                  {item.totalPrice.toLocaleString('ko-KR')}원
                </div>
              </div>
            ))
          )}
        </div>
        <div className="quote-divider"></div>
        <button 
          className="quote-submit-btn"
          onClick={onSubmit}
          disabled={selectedItems.length === 0}
        >
          견적 제출하기
        </button>
      </div>
    </div>
  );
};

export default QuoteSummary;
