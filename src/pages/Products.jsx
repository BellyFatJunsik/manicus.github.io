import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSEO } from '../hooks/useSEO';
import { useReveal } from '../hooks/useReveal';
import './Products.css';

const catalog = [
  {
    id: 'wms',
    tag: 'CORE',
    name: 'WMS',
    title: 'Warehouse Management System',
    summary: '창고 운영의 전 구간을 커버하는 코어 소스. 현장 단말·관리자 화면·배치 작업을 포함합니다.',
    features: [
      '입고 / ASN / 검수 / 적치',
      '피킹 웨이브 · 작업 지시',
      '출고 · 패킹 · 배차 연동 포인트',
      '로케이션 · 로트 · 시리얼',
      '재고실사 · 이동 · 조정',
      '권한 · 감사로그 · 마스터',
    ],
  },
  {
    id: 'oms',
    tag: 'FLOW',
    name: 'OMS',
    title: 'Order Management System',
    summary: '채널 주문을 수집·검증하고 WMS로 넘기기 전 할당·취소·부분출고 규칙을 처리합니다.',
    features: [
      '주문 수집 API 어댑터',
      '재고 예약 · 할당 규칙',
      '취소 / 부분출고',
      '출고 상태 회신',
      '클레임 · 반품 연계',
    ],
  },
  {
    id: 'inv',
    tag: 'STOCK',
    name: 'INV',
    title: 'Inventory Control',
    summary: '창고형·점포형 모두에 쓸 수 있는 재고·자재 관리 코어입니다.',
    features: [
      '다창고 · 다위치 재고',
      '안전재고 · 발주점',
      '입출고 이력',
      'BOM / 자재 소요(옵션)',
    ],
  },
  {
    id: 'custom',
    tag: 'BUILD',
    name: 'CUSTOM',
    title: '맞춤 업무시스템',
    summary: '기존 제품 위에 붙이거나, 아예 새 업무 플로우용 소스를 설계·제작합니다.',
    features: [
      '현장 PDA / 키오스크 UI',
      'ERP · 쇼핑몰 · 택배사 연동',
      '리포팅 · 대시보드',
      '온프레미스 / 프라이빗 클라우드',
    ],
  },
];

export default function Products({ openModal }) {
  const rootRef = useReveal();

  useSEO({
    title: '제품 — 매니커스 WMS · 업무시스템',
    description: 'WMS, OMS, 재고관리 및 맞춤 업무시스템의 소스코드 제품 라인업.',
    keywords: 'WMS 소스, OMS, 재고관리 시스템, 맞춤 개발, 매니커스',
    ogUrl: 'https://manicus.co.kr/products',
  });

  return (
    <div ref={rootRef} className="products-page">
      <section className="page-hero">
        <div className="container-page">
          <div className="section-label">Products</div>
          <h1 className="page-hero__title">제품 카탈로그</h1>
          <p className="page-hero__lead">
            SaaS 계정이 아니라 소스 저장소와 실행 산출물을 납품합니다.
            필요한 모듈만 도입하거나, 풀스택으로 묶을 수 있습니다.
          </p>
        </div>
      </section>

      <section className="section catalog">
        <div className="container-page catalog-list">
          {catalog.map((item, i) => (
            <article
              key={item.id}
              id={item.id}
              className="catalog-item reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <header className="catalog-item__head">
                <Badge variant="outline" className="mb-3 border-brand/40 font-mono text-[0.7rem] tracking-[0.12em] text-brand">
                  {item.tag}
                </Badge>
                <h2>
                  <span className="catalog-item__code">{item.name}</span>
                  <span className="catalog-item__title">{item.title}</span>
                </h2>
                <p>{item.summary}</p>
              </header>
              <ul className="catalog-item__features">
                {item.features.map((f) => (
                  <li key={f}>
                    <span className="mono" aria-hidden="true">+</span>
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section stack">
        <div className="container-page stack__inner reveal">
          <div>
            <div className="section-label">Stack</div>
            <h2 className="section-title">납품 기준 스택</h2>
            <p className="section-lead">
              프로젝트마다 조정 가능합니다. 기본은 유지보수와 이관이 쉬운 구성을 사용합니다.
            </p>
          </div>
          <dl className="stack-dl">
            <div>
              <dt className="mono">Backend</dt>
              <dd>Java / Spring 또는 Node · REST · 배치</dd>
            </div>
            <div>
              <dt className="mono">Frontend</dt>
              <dd>React · 관리자 / 현장 UI</dd>
            </div>
            <div>
              <dt className="mono">Data</dt>
              <dd>PostgreSQL / MSSQL · Redis(옵션)</dd>
            </div>
            <div>
              <dt className="mono">Ops</dt>
              <dd>Docker · CI 스크립트 · 환경설정 문서</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section products-cta">
        <div className="container-page reveal">
          <h2 className="section-title">스펙 확인이 필요하신가요?</h2>
          <p className="section-lead">운영 규모와 연동 대상을 알려주시면 모듈 구성을 제안합니다.</p>
          <Button size="lg" className="mt-6" onClick={openModal}>
            제품 문의
          </Button>
        </div>
      </section>
    </div>
  );
}
