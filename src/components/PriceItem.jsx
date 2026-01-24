import { useState, useEffect } from 'react';

const PriceItem = ({ 
  id, 
  name, 
  description, 
  price, 
  unit = '', 
  hasQuantity = false, 
  minQuantity = 1,
  onSelect,
  onQuantityChange,
  isSelected = false,
  quantity = 1
}) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);

  // 부모의 quantity가 변경되면 동기화
  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(minQuantity, localQuantity + delta);
    setLocalQuantity(newQuantity);
    if (onQuantityChange) {
      onQuantityChange(id, newQuantity);
    }
  };

  const handleCheckboxClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSelect) {
      onSelect(id, !isSelected, localQuantity);
    }
  };

  const handleLabelClick = (e) => {
    e.preventDefault();
    if (onSelect) {
      onSelect(id, !isSelected, localQuantity);
    }
  };

  const displayPrice = () => {
    if (hasQuantity && isSelected) {
      const total = parsePrice(price) * localQuantity;
      return formatPrice(total);
    }
    return price;
  };

  const parsePrice = (priceStr) => {
    return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  };

  const formatPrice = (amount) => {
    return amount.toLocaleString('ko-KR') + (unit || '원');
  };

  return (
    <div className="price-item">
      <div className="price-item-checkbox">
        <div 
          className="price-checkbox-wrapper"
          onClick={handleCheckboxClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCheckboxClick(e);
            }
          }}
        >
          {isSelected ? (
            <img 
              src="https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/checkbox--item.svg"
              alt="체크됨"
              className="price-checkbox-checked"
            />
          ) : (
            <div className="price-checkbox-unchecked"></div>
          )}
        </div>
        <div 
          className="price-checkbox-label"
          onClick={handleLabelClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleLabelClick(e);
            }
          }}
        >
          <div className="price-item-info">
            <div className="price-item-name">{name}</div>
            <div className="price-item-description">{description}</div>
          </div>
        </div>
      </div>
      {hasQuantity ? (
        <div className="price-quantity-control">
          <button
            type="button"
            className="quantity-btn quantity-minus"
            onClick={() => handleQuantityChange(-1)}
            aria-label="수량 감소"
            disabled={!isSelected}
          >
            <img 
              src="https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/primary-shape.svg"
              alt="감소"
            />
          </button>
          <span className="quantity-value">{localQuantity}</span>
          <button
            type="button"
            className="quantity-btn quantity-plus"
            onClick={() => handleQuantityChange(1)}
            aria-label="수량 증가"
            disabled={!isSelected}
          >
            <img 
              src="https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/primary-shape-1.svg"
              alt="증가"
            />
          </button>
        </div>
      ) : (
        <div className="price-item-amount">{displayPrice()}</div>
      )}
    </div>
  );
};

export default PriceItem;
