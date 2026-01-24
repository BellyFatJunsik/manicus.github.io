import { useState, useEffect } from 'react';

const PriceAccordion = ({ title, children, defaultOpen = false, isOpen: controlledIsOpen, onToggle }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  
  // controlled mode (부모가 isOpen을 제어하는 경우)
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  useEffect(() => {
    if (isControlled) {
      // controlled mode에서는 부모의 상태를 따름
    } else {
      setInternalIsOpen(defaultOpen);
    }
  }, [defaultOpen, isControlled, controlledIsOpen]);

  const toggleAccordion = () => {
    if (isControlled) {
      // controlled mode에서는 항상 부모의 onToggle 호출
      if (onToggle) {
        onToggle();
      }
    } else {
      // uncontrolled mode에서는 내부 상태 토글
      setInternalIsOpen(prev => !prev);
    }
  };

  return (
    <div className="price-accordion">
      <div 
        className="price-accordion-header"
        onClick={toggleAccordion}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleAccordion();
          }
        }}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title}`}
      >
        <div className="price-accordion-title">{title}</div>
        <img 
          className={`price-accordion-icon ${isOpen ? 'open' : ''}`}
          src={isOpen 
            ? "https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/icon-arrow-top.svg"
            : "https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/icon-arrow-top-1.svg"
          }
          alt={isOpen ? "접기" : "펼치기"}
        />
      </div>
      <div 
        id={`accordion-content-${title}`}
        className={`price-accordion-content ${isOpen ? 'open' : 'closed'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PriceAccordion;
