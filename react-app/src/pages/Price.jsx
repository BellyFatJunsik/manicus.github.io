import { useState, useMemo, useRef } from 'react';
import { useSEO } from '../hooks/useSEO';
import PriceAccordion from '../components/PriceAccordion';
import PriceItem from '../components/PriceItem';
import QuoteSummary from '../components/QuoteSummary';
import '../styles/Price.css';

const Price = ({ openModal }) => {
  useSEO({
    title: '견적 및 가격 - 매니커스',
    description: '프로젝트 유형과 범위에 따라 비용을 미리 확인해보세요. 웹사이트 제작, 기능 개발, 시스템 구축, 운영 및 유지보수 서비스의 예상 견적을 제공합니다.',
    keywords: '웹사이트 견적, 홈페이지 가격, 시스템 구축 비용, 웹 개발 견적, 매니커스',
    ogImage: 'https://c.animaapp.com/DaKYKUSd/img/frame-22.svg',
    ogUrl: window.location.href
  });

  const [selectedItems, setSelectedItems] = useState({});
  const [quantities, setQuantities] = useState({});
  const [openAccordions, setOpenAccordions] = useState(['website']); // 여러 아코디언을 동시에 열 수 있도록 배열로 변경
  const [activeCategory, setActiveCategory] = useState('website'); // 카테고리 하이라이트용
  
  const websiteRef = useRef(null);
  const developmentRef = useRef(null);
  const infrastructureRef = useRef(null);

  // 가격 데이터
  const priceData = {
    website: {
      basic: [
        { id: 'website-1', name: '원페이지형', description: '메인 1페이지 (스크롤형 랜딩)', price: '350,000원 ~' },
        { id: 'website-2', name: '기본형 홈페이지', description: '5페이지 내외 (메인+서브4)', price: '900,000원 ~' },
        { id: 'website-3', name: '중형 홈페이지', description: '10페이지 내외 (서브다수포함)', price: '1,500,000원 ~' },
        { id: 'website-4', name: '대형 홈페이지', description: '20페이지 이상 (맞춤개발 포함)', price: '4,500,000원 ~' },
        { id: 'website-5', name: '쇼핑몰형', description: '상품관리 + 결제기능 포함', price: '4,000,000원 ~' },
        { id: 'website-6', name: '[옵션] 커스텀 반응형', description: 'PC/ Tablet / Mobile 별도 대응', price: '500,000원 ~' },
      ],
      design: [
        { id: 'design-1', name: '페이지 디자인', description: '100,000원/페이지', price: '100,000원/페이지', hasQuantity: true, unit: '페이지' },
        { id: 'design-2', name: '배너, 아이콘 제작', description: '건당 30,000원 ~', price: '30,000원/건당', hasQuantity: true, unit: '건' },
        { id: 'design-3', name: '로고 디자인', description: '', price: '300,000원 ~' },
      ],
      content: [
        { id: 'content-1', name: '카피라이팅 (메인/서브)', description: '50,000원/페이지', price: '50,000원/페이지', hasQuantity: true, unit: '페이지' },
        { id: 'content-2', name: '번역', description: '120 ~ 200원/자', price: '200원/자', hasQuantity: true, unit: '자' },
        { id: 'content-3', name: '이미지 구매', description: '10,000~30,000원/컷', price: '30,000원/컷', hasQuantity: true, unit: '컷' },
        { id: 'content-4', name: '이미지 AI 생성 (기본)', description: '30,000원/컷', price: '30,000원/컷', hasQuantity: true, unit: '컷' },
        { id: 'content-5', name: '이미지 AI 생성 (고급)', description: '50,000원/컷 (후보 3개 제공)', price: '50,000원/컷', hasQuantity: true, unit: '컷' },
        { id: 'content-6', name: '고객 제공 이미지 리터칭', description: '30,000원 ~ /컷', price: '30,000원/컷', hasQuantity: true, unit: '컷' },
      ],
    },
    development: {
      ia: [
        { id: 'ia-1', name: '상위 기획', description: 'IA, 메뉴구조도, 사용자 Flow', price: '150,000원 ~' },
        { id: 'ia-2', name: '화면 설계', description: '100,000원~ / 페이지', price: '100,000원/페이지', hasQuantity: true, unit: '페이지' },
      ],
      features: [
        { id: 'feature-1', name: '파일 첨부형 문의폼', description: '견적서 / 자료 첨부 기능', price: '50,000원' },
        { id: 'feature-2', name: '게시판 추가 (뉴스, 블로그)', description: '건당 30,000 ~ 50,000원', price: '50,000원/건당', hasQuantity: true, unit: '건' },
        { id: 'feature-3', name: '갤러리형 게시판', description: '썸네일 이미지 게시판', price: '200,000원' },
        { id: 'feature-4', name: '회원가입 / 로그인', description: '기본 회원 이메일 인증 시스템', price: '250,000원' },
        { id: 'feature-5', name: 'SNS 로그인 (카카오)', description: '', price: '150,000원' },
        { id: 'feature-6', name: 'SNS 로그인 (네이버)', description: '', price: '150,000원' },
        { id: 'feature-7', name: 'SNS 로그인 (구글)', description: '', price: '150,000원' },
        { id: 'feature-8', name: '관리자 페이지 (CMS)', description: '콘텐츠 수정 관리', price: '800,000원 ~' },
        { id: 'feature-9', name: '지도 연동', description: '구글 , 네이버 맵 중 택 1', price: '80,000원' },
        { id: 'feature-10', name: '다국어 기능', description: '다국어 전환 구조', price: '150,000원 ~' },
        { id: 'feature-11', name: '언어 추가', description: '100,000원 / 언어', price: '100,000원/언어', hasQuantity: true, unit: '언어' },
        { id: 'feature-12', name: 'SEO 고급 설정', description: '검색 엔진 최적화', price: '200,000원 ~' },
        { id: 'feature-13', name: '예약 / 결제 기능', description: 'API 연동 난이도별', price: '500,000원 ~' },
        { id: 'feature-14', name: '관리자 통계 페이지', description: '접속자, 게시물 통계 등', price: '300,000원 ~' },
      ],
      additional: [
        { id: 'additional-1', name: 'Google Analytics 연동', description: '트래킹 코드 삽입', price: '50,000원' },
        { id: 'additional-2', name: '네이버 서치콘솔 등록', description: '사이트맵 제출', price: '30,000원' },
        { id: 'additional-3', name: '오픈그래프 / 메타태그', description: 'SNS 썸네일 설정', price: '30,000원' },
      ],
    },
    infrastructure: {
      hosting: [
        { id: 'hosting-1', name: '도메인 등록', description: '.com / .co.kr / .ai 등', price: '22,000원~ /년' },
        { id: 'hosting-2', name: '웹 호스팅', description: '기본형', price: '100,000원~ /년' },
        { id: 'hosting-3', name: '고급형 호스팅', description: '트래픽 5만 이상', price: '250,000원~ /년' },
        { id: 'hosting-4', name: 'SSL 보안서버', description: 'https 적용', price: '50,000원~ /년' },
      ],
      maintenance: [
        { id: 'maintenance-1', name: '월 정기 유지보수 (베이직)', description: '텍스트, 이미지 교체 / 월 2회', price: '100,000원/월' },
        { id: 'maintenance-2', name: '월 정기 유지보수 (스탠다드)', description: '기능 수정 포함 / 월 5회', price: '200,000원/월' },
        { id: 'maintenance-3', name: '월 정기 유지보수 (프리미엄)', description: '콘텐츠 수정 무제한', price: '300,000원/월' },
        { id: 'maintenance-4', name: '단발성 수정', description: '간단한 텍스트, 이미지 교체', price: '30,000원~' },
        { id: 'maintenance-5', name: '기능 추가', description: '소규모 기능 1건 개발', price: '100,000원~' },
        { id: 'maintenance-6', name: '긴급 복구 서비스', description: '사이트 다운 시 복구 등', price: '50,000원/건' },
      ],
    },
  };

  const parsePrice = (priceStr) => {
    const match = priceStr.match(/(\d{1,3}(?:,\d{3})*)/);
    if (match) {
      return parseInt(match[1].replace(/,/g, '')) || 0;
    }
    return 0;
  };

  const handleItemSelect = (id, isSelected, quantity = 1) => {
    setSelectedItems(prev => {
      const newSelected = { ...prev };
      if (isSelected) {
        newSelected[id] = true;
        setQuantities(prevQty => ({ ...prevQty, [id]: quantity }));
      } else {
        delete newSelected[id];
        setQuantities(prevQty => {
          const newQty = { ...prevQty };
          delete newQty[id];
          return newQty;
        });
      }
      return newSelected;
    });
  };

  const handleQuantityChange = (id, quantity) => {
    if (selectedItems[id]) {
      setQuantities(prev => ({ ...prev, [id]: quantity }));
    }
  };

  const quoteItems = useMemo(() => {
    const items = [];
    const allItems = [
      ...priceData.website.basic,
      ...priceData.website.design,
      ...priceData.website.content,
      ...priceData.development.ia,
      ...priceData.development.features,
      ...priceData.development.additional,
      ...priceData.infrastructure.hosting,
      ...priceData.infrastructure.maintenance,
    ];

    allItems.forEach(item => {
      if (selectedItems[item.id]) {
        const quantity = quantities[item.id] || 1;
        const basePrice = parsePrice(item.price);
        const totalPrice = basePrice * quantity;
        items.push({
          id: item.id,
          name: item.name,
          quantity,
          unit: item.unit || '',
          hasQuantity: item.hasQuantity || false,
          totalPrice,
        });
      }
    });

    return items;
  }, [selectedItems, quantities]);

  const totalAmount = useMemo(() => {
    return quoteItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [quoteItems]);

  const handleSubmit = () => {
    if (quoteItems.length === 0) return;
    alert(`견적이 제출되었습니다.\n총 금액: ${totalAmount.toLocaleString('ko-KR')}원`);
  };

  const handleCategoryClick = (category) => {
    // 카테고리 클릭 시 해당 섹션으로 스크롤 이동만 수행 (아코디언 열기/닫기는 하지 않음)
    setActiveCategory(category); // 하이라이트만 업데이트
    
    // 해당 아코디언으로 스크롤 이동
    const refs = {
      website: websiteRef,
      development: developmentRef,
      infrastructure: infrastructureRef,
    };
    
    const targetRef = refs[category];
    
    // 약간의 지연을 주어 상태 업데이트 후 스크롤
    setTimeout(() => {
      if (targetRef?.current) {
        const element = targetRef.current;
        const headerHeight = 100; // 헤더 높이 고려
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;
        
        console.log(offsetPosition);

        if (targetRef?.current) {
          targetRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // CSS의 scroll-margin-top을 인식해서 멈춥니다.
          });
        }
      }
    }, 150);
  };

  const handleAccordionToggle = (category) => {
    // 아코디언 헤더 클릭 시 토글 (여러 개 동시에 열 수 있음)
    setOpenAccordions(prev => {
      if (prev.includes(category)) {
        // 이미 열려있으면 닫기
        return prev.filter(cat => cat !== category);
      } else {
        // 닫혀있으면 열기
        return [...prev, category];
      }
    });
    
    // 아코디언을 열 때 해당 카테고리 하이라이트
    setActiveCategory(category);
  };

  return (
    <div className="price-page">
      {/* 헤더 섹션 */}
      <div className="price-header">
        <div className="price-header-content">
          <div className="price-header-top">
            <h1 className="price-title">예상 견적</h1>
            <div className="price-description">
              <p>프로젝트 유형과 범위에 따라 비용을 미리 확인해보세요</p>
              <p>옵션을 선택하면 예상 비용이 자동으로 계산됩니다</p>
              <p className="price-note">단, 실제 진행 내용에 따라 금액은 증감될 수 있습니다.</p>
            </div>
          </div>
          <div className="price-categories">
            <div 
              className={`price-category ${activeCategory === 'website' ? 'price-category-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCategoryClick('website');
              }}
              style={{ cursor: 'pointer' }}
            >
              웹사이트 · 홈페이지 제작
              {activeCategory === 'website' && (
                <div className="price-category-lines">
                  <img src="https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/line-3.svg" alt="" />
                  <img src="https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/line-4.svg" alt="" />
                </div>
              )}
            </div>
            <div 
              className={`price-category ${activeCategory === 'development' ? 'price-category-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCategoryClick('development');
              }}
              style={{ cursor: 'pointer' }}
            >
              기능개발 · 시스템 구축
              {activeCategory === 'development' && (
                <div className="price-category-lines">
                  <img src="https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/line-3.svg" alt="" />
                  <img src="https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/line-4.svg" alt="" />
                </div>
              )}
            </div>
            <div 
              className={`price-category ${activeCategory === 'infrastructure' ? 'price-category-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('infrastructure');
                handleCategoryClick('infrastructure');
              }}
              style={{ cursor: 'pointer' }}
            >
              인프라 지원 · 운영/유지보수
              {activeCategory === 'infrastructure' && (
                <div className="price-category-lines">
                  <img src="https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/line-3.svg" alt="" />
                  <img src="https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/line-4.svg" alt="" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="price-main">
        <div className="price-main-content">
          {/* 왼쪽: 서비스 선택 폼 */}
          <div className="price-form-section">
            {/* 웹사이트 · 홈페이지 제작 */}
            <div ref={websiteRef}>
              <PriceAccordion 
                title="웹사이트 · 홈페이지 제작" 
                defaultOpen={openAccordions.includes('website')}
                isOpen={openAccordions.includes('website')}
                onToggle={() => handleAccordionToggle('website')}
              >
              <div className="price-section">
                <div className="price-section-title">기본 패키지</div>
                <div className="price-items-list">
                  {priceData.website.basic.map(item => (
                    <PriceItem
                      key={item.id}
                      {...item}
                      isSelected={selectedItems[item.id] || false}
                      quantity={quantities[item.id] || 1}
                      onSelect={handleItemSelect}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </div>
              </div>
              <img className="price-divider" src="https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/line-5.svg" alt="" />
              <div className="price-section">
                <div className="price-section-title">디자인</div>
                <div className="price-items-list">
                  {priceData.website.design.map(item => (
                    <PriceItem
                      key={item.id}
                      {...item}
                      isSelected={selectedItems[item.id] || false}
                      quantity={quantities[item.id] || 1}
                      onSelect={handleItemSelect}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </div>
              </div>
              <img className="price-divider" src="https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/line-5.svg" alt="" />
              <div className="price-section">
                <div className="price-section-title">콘텐츠 · 카피라이팅</div>
                <div className="price-items-list">
                  {priceData.website.content.map(item => (
                    <PriceItem
                      key={item.id}
                      {...item}
                      isSelected={selectedItems[item.id] || false}
                      quantity={quantities[item.id] || 1}
                      onSelect={handleItemSelect}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </div>
              </div>
              </PriceAccordion>
            </div>

            {/* 기능 개발 · 시스템 구축 */}
            <div ref={developmentRef}>
              <PriceAccordion 
                title="기능 개발 · 시스템 구축"
                defaultOpen={openAccordions.includes('development')}
                isOpen={openAccordions.includes('development')}
                onToggle={() => handleAccordionToggle('development')}
              >
              <div className="price-section">
                <div className="price-section-title">IA / 화면 설계</div>
                <div className="price-items-list">
                  {priceData.development.ia.map(item => (
                    <PriceItem
                      key={item.id}
                      {...item}
                      isSelected={selectedItems[item.id] || false}
                      quantity={quantities[item.id] || 1}
                      onSelect={handleItemSelect}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </div>
              </div>
              <img className="price-divider" src="https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/line-5.svg" alt="" />
              <div className="price-section">
                <div className="price-section-title">기능 / 개발 옵션</div>
                <div className="price-items-list">
                  {priceData.development.features.map(item => (
                    <PriceItem
                      key={item.id}
                      {...item}
                      isSelected={selectedItems[item.id] || false}
                      quantity={quantities[item.id] || 1}
                      onSelect={handleItemSelect}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </div>
              </div>
              <img className="price-divider" src="https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/line-5.svg" alt="" />
              <div className="price-section">
                <div className="price-section-title">추가 서비스</div>
                <div className="price-items-list">
                  {priceData.development.additional.map(item => (
                    <PriceItem
                      key={item.id}
                      {...item}
                      isSelected={selectedItems[item.id] || false}
                      quantity={quantities[item.id] || 1}
                      onSelect={handleItemSelect}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </div>
              </div>
              </PriceAccordion>
            </div>

            {/* 인프라 지원 · 운영/유지보수 */}
            <div ref={infrastructureRef}>
              <PriceAccordion 
                title="인프라 지원 · 운영/유지보수"
                defaultOpen={openAccordions.includes('infrastructure')}
                isOpen={openAccordions.includes('infrastructure')}
                onToggle={() => handleAccordionToggle('infrastructure')}
              >
              <div className="price-section">
                <div className="price-section-title">호스팅 / 도메인 / SSL</div>
                <div className="price-items-list">
                  {priceData.infrastructure.hosting.map(item => (
                    <PriceItem
                      key={item.id}
                      {...item}
                      isSelected={selectedItems[item.id] || false}
                      quantity={quantities[item.id] || 1}
                      onSelect={handleItemSelect}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </div>
              </div>
              <img className="price-divider" src="https://cdn.animaapp.com/projects/69725d7ec482ffc013924174/releases/6972ce3cc482ffc0139241f0/img/line-5.svg" alt="" />
              <div className="price-section">
                <div className="price-section-title">운영 / 유지보수</div>
                <div className="price-items-list">
                  {priceData.infrastructure.maintenance.map(item => (
                    <PriceItem
                      key={item.id}
                      {...item}
                      isSelected={selectedItems[item.id] || false}
                      quantity={quantities[item.id] || 1}
                      onSelect={handleItemSelect}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </div>
              </div>
              </PriceAccordion>
            </div>
          </div>

          {/* 오른쪽: 견적 요약 */}
          <div className="price-summary-section">
            <QuoteSummary
              selectedItems={quoteItems}
              totalAmount={totalAmount}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
