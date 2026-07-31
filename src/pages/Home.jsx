import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSEO } from '../hooks/useSEO';
import { useReveal } from '../hooks/useReveal';
import './Home.css';

const products = [
  {
    code: '01',
    name: 'WMS',
    title: '창고관리시스템',
    desc: '입고·적치·피킹·출고·재고실사까지. 현장 운영 기준에 맞춘 전체 소스.',
  },
  {
    code: '02',
    name: 'OMS',
    title: '주문관리시스템',
    desc: '채널 주문 수집, 할당, 출고 연동. 물류 흐름의 전처리 레이어.',
  },
  {
    code: '03',
    name: 'INV',
    title: '재고·자재관리',
    desc: '로트/시리얼, 위치 재고, 안전재고. 정확도가 필요한 운영용 모듈.',
  },
];

const steps = [
  { n: '01', t: '요구 정리', d: '현장 프로세스와 필수 기능을 먼저 고정합니다.' },
  { n: '02', t: '소스 제공', d: '코어 모듈 전체 소스와 문서, 실행 환경을 전달합니다.' },
  { n: '03', t: '커스터마이징', d: '고객 환경에 맞게 화면·연동·권한을 조정합니다.' },
  { n: '04', t: '인수·이관', d: '배포, 인수 테스트, 내부 개발팀이 이어갈 수 있게 이관합니다.' },
];

function HeroSchematic() {
  return (
    <div className="hero-schematic" aria-hidden="true">
      <div className="hero-schematic__grid" />
      <svg className="hero-schematic__svg" viewBox="0 0 960 540" fill="none">
        <rect x="48" y="72" width="180" height="96" className="sch-box" />
        <text x="138" y="118" textAnchor="middle" className="sch-label">INBOUND</text>
        <text x="138" y="142" textAnchor="middle" className="sch-sub">ASN / 검수</text>

        <rect x="320" y="72" width="180" height="96" className="sch-box sch-box--accent" />
        <text x="410" y="118" textAnchor="middle" className="sch-label sch-label--on">PUTAWAY</text>
        <text x="410" y="142" textAnchor="middle" className="sch-sub sch-sub--on">Zone / Loc</text>

        <rect x="592" y="72" width="180" height="96" className="sch-box" />
        <text x="682" y="118" textAnchor="middle" className="sch-label">INVENTORY</text>
        <text x="682" y="142" textAnchor="middle" className="sch-sub">Lot / Qty</text>

        <rect x="184" y="280" width="180" height="96" className="sch-box" />
        <text x="274" y="326" textAnchor="middle" className="sch-label">PICK</text>
        <text x="274" y="350" textAnchor="middle" className="sch-sub">Wave / Task</text>

        <rect x="456" y="280" width="180" height="96" className="sch-box sch-box--accent" />
        <text x="546" y="326" textAnchor="middle" className="sch-label sch-label--on">OUTBOUND</text>
        <text x="546" y="350" textAnchor="middle" className="sch-sub sch-sub--on">Pack / Ship</text>

        <path d="M228 120H320" className="sch-line" />
        <path d="M500 120H592" className="sch-line" />
        <path d="M410 168V220H274V280" className="sch-line" />
        <path d="M410 220H546V280" className="sch-line" />
        <path d="M364 328H456" className="sch-line" />

        <circle cx="228" cy="120" r="3.5" className="sch-dot" />
        <circle cx="500" cy="120" r="3.5" className="sch-dot" />
        <circle cx="410" cy="220" r="3.5" className="sch-dot" />
        <circle cx="364" cy="328" r="3.5" className="sch-dot" />

        <g className="sch-pulse">
          <circle cx="138" cy="120" r="6" />
          <circle cx="410" cy="120" r="6" />
          <circle cx="546" cy="328" r="6" />
        </g>
      </svg>
    </div>
  );
}

export default function Home({ openModal }) {
  const rootRef = useReveal();

  useSEO({
    title: '매니커스 — WMS · 업무시스템 소스코드',
    description:
      '매니커스는 WMS(창고관리시스템) 및 업무용 프로그램의 전체 소스를 제작·판매합니다. 도입부터 커스터마이징까지 기술 기반으로 지원합니다.',
    keywords: '매니커스, WMS, 창고관리시스템, 소스코드 판매, 업무시스템, 재고관리, 물류시스템',
    ogUrl: 'https://manicus.co.kr/',
  });

  return (
    <div ref={rootRef}>
      <section className="hero">
        <HeroSchematic />
        <div className="hero__content">
          <p className="hero__brand">MANICUS</p>
          <h1 className="hero__title">
            운영 시스템의
            <br />
            전체 소스를 판다
          </h1>
          <p className="hero__lead">
            WMS를 중심으로 한 업무용 프로그램 소스코드를 제작·판매합니다.
            블랙박스가 아닌, 직접 소유하고 확장할 수 있는 기술 자산입니다.
          </p>
          <div className="hero__actions">
            <Button size="lg" onClick={openModal}>
              도입 문의
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/products">제품 보기</Link>
            </Button>
          </div>
          <div className="hero__meta mono">
            <span>SRC · FULL OWNERSHIP</span>
            <span>WMS / OMS / INV</span>
          </div>
        </div>
      </section>

      <section className="section about">
        <div className="container-page about__grid reveal">
          <div>
            <div className="section-label">Company</div>
            <h2 className="section-title">기술 회사의 방식으로<br />시스템을 판다</h2>
          </div>
          <div className="about__copy">
            <p>
              매니커스는 완성된 SaaS 구독이 아니라, 고객이 직접 보유하는
              <strong> 소스코드 단위</strong>의 시스템을 만듭니다.
            </p>
            <p>
              물류·재고·주문처럼 현장 로직이 중요한 영역일수록,
              수정 권한이 없는 패키지보다 읽을 수 있는 코드가 낫습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="section products-preview">
        <div className="container-page">
          <div className="reveal">
            <div className="section-label">Products</div>
            <h2 className="section-title">주요 제품 라인</h2>
            <p className="section-lead">현장 운영에 바로 붙는 코어 모듈부터 제공합니다.</p>
          </div>

          <ul className="product-list">
            {products.map((item, i) => (
              <li
                key={item.code}
                className="product-row reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="product-row__code mono">{item.code}</span>
                <div className="product-row__name">
                  <strong>{item.name}</strong>
                  <span>{item.title}</span>
                </div>
                <p className="product-row__desc">{item.desc}</p>
              </li>
            ))}
          </ul>

          <div className="reveal products-preview__more">
            <Button asChild variant="outline">
              <Link to="/products">전체 제품 스펙 →</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section process">
        <div className="container-page">
          <div className="reveal">
            <div className="section-label">Delivery</div>
            <h2 className="section-title">납품 방식</h2>
            <p className="section-lead">데모만 보여주는 회사와 달리, 코드와 이관을 기준으로 일합니다.</p>
          </div>

          <ol className="process-grid">
            {steps.map((step, i) => (
              <li
                key={step.n}
                className="process-card reveal"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="process-card__n mono">{step.n}</span>
                <h3>{step.t}</h3>
                <p>{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container-page cta-band__inner reveal">
          <div>
            <h2 className="section-title">필요한 시스템을<br />소스 단위로 검토하세요</h2>
            <p className="section-lead">요구사항과 운영 환경을 알려주시면 적합한 모듈과 라이선스 범위를 제안합니다.</p>
          </div>
          <div className="cta-band__actions">
            <Button
              size="lg"
              className="bg-brand text-brand-foreground hover:bg-brand/90"
              onClick={openModal}
            >
              상담 요청
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/license">라이선스 안내</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
