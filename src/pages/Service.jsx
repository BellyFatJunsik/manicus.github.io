import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import ServiceHeroBackground from '../components/ServiceHeroBackground';

const CORE_EXPERTISE = [
  {
    title: 'Web & App Development',
    desc: '최신 프레임워크를 활용한 반응형 웹 및 하이브리드 앱 구축.',
    keywords: ['React', 'Next.js', 'Flutter', 'TypeScript'],
  },
  {
    title: 'Backend & Infrastructure',
    desc: '대규모 트래픽 처리가 가능한 안정적인 서버 아키텍처 설계.',
    keywords: ['Spring Boot', 'Kotlin', 'Kafka', 'AWS Cloud'],
  },
  {
    title: 'IT Consulting & UX Design',
    desc: '사용자 데이터 기반의 UI/UX 설계 및 기술 로드맵 제시.',
    keywords: ['Figma', 'Design System', 'Agile Methodology'],
  },
];

const DEV_PROCESS = [
  { step: 'Discovery', label: '요구사항 분석 및 비즈니스 목표 설정.' },
  { step: 'Strategy', label: '기술 스택 선정 및 아키텍처 설계.' },
  { step: 'Execution', label: '코드 품질 중심의 애자일 개발.' },
  { step: 'Delivery', label: '철저한 QA 후 안정적인 배포 및 운영.' },
];

const TECH_STACK = [
  'Java', 'Kotlin', 'Spring Boot', 'React', 'Next.js', 'TypeScript',
  'PostgreSQL', 'Redis', 'Kafka', 'AWS Cloud', 'Docker', 'Kubernetes',
  'Figma', 'Agile',
];

const Service = ({ openModal }) => {
  useSEO({
    title: '서비스 - 매니커스 | 웹·앱 개발, 백엔드·인프라, IT 컨설팅',
    description: '매니커스 IT 솔루션: Web & App Development(React, Next.js, Flutter), Backend & Infrastructure(Spring Boot, AWS), IT Consulting & UX Design. 개발 프로세스와 기술 스택 소개.',
    keywords: '매니커스, 웹 개발, 앱 개발, React, Next.js, Spring Boot, Kotlin, AWS, IT 컨설팅, UX 디자인, 백엔드, 인프라',
    ogUrl: typeof window !== 'undefined' ? window.location.href : 'https://manicus.co.kr/service',
  });

  return (
    <>
      <h1 className="sr-only">매니커스 서비스 - 웹·앱 개발, 백엔드·인프라, IT 컨설팅 및 개발 프로세스</h1>

      {/* Section 1: Service Hero - wide 배경: 별 반짝임 + 중앙 밝은 그라데이션 */}
      <section className="frame-9 sv-hero sv-hero-wide" aria-labelledby="sv-hero-title">
        <ServiceHeroBackground />
        <div className="content-center sv-hero-inner">
          <h2 id="sv-hero-title" className="sv-hero-title">
            비즈니스의 상상을 디지털 현실로 구현합니다.
          </h2>
          <p className="sv-hero-desc">
            전략 기획부터 고도화된 엔지니어링까지, 매니커스가 함께합니다.
          </p>
        </div>
      </section>

      {/* Section 2: Core Expertise */}
      <section className="frame-9 sv-section" aria-labelledby="sv-expertise-head">
        <div className="content-center">
          <h2 id="sv-expertise-head" className="sv-section-title">Core Expertise</h2>
          <p className="sv-section-lead">주요 서비스 영역</p>
          <div className="sv-cards">
            {CORE_EXPERTISE.map((item, i) => (
              <article key={i} className="sv-card">
                <h3 className="sv-card-title">{item.title}</h3>
                <p className="sv-card-desc">{item.desc}</p>
                <ul className="sv-card-keywords" aria-label="기술 키워드">
                  {item.keywords.map((kw, j) => (
                    <li key={j}><span className="sv-kw">{kw}</span></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Development Process */}
      <section className="frame-9 sv-section sv-process-wrap" aria-labelledby="sv-process-head">
        <div className="content-center">
          <h2 id="sv-process-head" className="sv-section-title">Development Process</h2>
          <p className="sv-section-lead">개발 프로세스</p>
          <ol className="sv-steps">
            {DEV_PROCESS.map((item, i) => (
              <li key={i} className="sv-step">
                <span className="sv-step-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="sv-step-body">
                  <h3 className="sv-step-title">{item.step}</h3>
                  <p className="sv-step-desc">{item.label}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Section 4: Technology Stack */}
      <section className="frame-9 sv-section" aria-labelledby="sv-tech-head">
        <div className="content-center">
          <h2 id="sv-tech-head" className="sv-section-title">Technology Stack</h2>
          <p className="sv-section-lead">주요 사용 기술</p>
          <ul className="sv-tech-list">
            {TECH_STACK.map((tech, i) => (
              <li key={i} className="sv-tech-item">{tech}</li>
            ))}
          </ul>
        </div>
      </section>

    </>
  );
};

export default Service;
