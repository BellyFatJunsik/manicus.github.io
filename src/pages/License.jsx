import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSEO } from '../hooks/useSEO';
import { useReveal } from '../hooks/useReveal';
import './License.css';

const tiers = [
  {
    name: 'Module',
    price: '모듈 단위',
    desc: 'WMS / OMS / INV 중 필요한 코어만 도입할 때.',
    points: ['해당 모듈 전체 소스', '기본 문서 · 빌드 가이드', '1회 설치 지원', '기능 커스터마이징은 별도'],
  },
  {
    name: 'Suite',
    price: '제품군 패키지',
    desc: '물류 운영에 필요한 모듈을 묶어서 납품할 때.',
    points: ['복수 모듈 소스', '연동 포인트 포함', '인수 테스트 지원', '초기 운영 안정화'],
    featured: true,
  },
  {
    name: 'Build',
    price: '맞춤 제작',
    desc: '현장 프로세스에 맞춰 새로 설계·개발할 때.',
    points: ['요구사항 분석', '설계 · 개발 · 이관', '소스 소유권 이전', '유지보수 옵션'],
  },
];

const notes = [
  '소스 라이선스는 고객사 내부 사용·수정·배포(고객 소유 서비스)를 전제로 합니다.',
  '재판매·재배포 범위는 계약서에 명시합니다.',
  '제3자 라이브러리 라이선스는 별도 고지를 따릅니다.',
];

export default function License({ openModal }) {
  const rootRef = useReveal();

  useSEO({
    title: '라이선스 — 매니커스 소스 도입',
    description: '모듈 단위, 제품군 패키지, 맞춤 제작 라이선스 안내. 소스코드 소유와 이관 기준.',
    keywords: 'WMS 라이선스, 소스코드 판매, 시스템 도입 비용, 매니커스',
    ogUrl: 'https://manicus.co.kr/license',
  });

  return (
    <div ref={rootRef} className="license-page">
      <section className="page-hero">
        <div className="container-page">
          <div className="section-label">License</div>
          <h1 className="page-hero__title">라이선스 · 도입 방식</h1>
          <p className="page-hero__lead">
            구독형이 아닌 소스 납품입니다. 범위와 소유 조건을 명확히 한 뒤 계약을 진행합니다.
          </p>
        </div>
      </section>

      <section className="section tiers">
        <div className="container-page grid gap-px border border-border bg-border md:grid-cols-3">
          {tiers.map((tier, i) => (
            <Card
              key={tier.name}
              className={`reveal rounded-none border-0 shadow-none ${tier.featured ? 'bg-[#e8eef0]' : 'bg-card'}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <CardHeader className="relative">
                {tier.featured && (
                  <Badge
                    variant="outline"
                    className="absolute top-4 right-4 border-brand/40 font-mono text-[0.65rem] tracking-[0.08em] text-brand uppercase"
                  >
                    Recommended
                  </Badge>
                )}
                <CardTitle className="text-xl tracking-tight">{tier.name}</CardTitle>
                <p className="font-mono text-sm text-brand">{tier.price}</p>
                <CardDescription>{tier.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-2">
                  {tier.points.map((p) => (
                    <li
                      key={p}
                      className="relative pl-3.5 text-sm text-foreground/80 before:absolute before:top-[0.55em] before:left-0 before:h-px before:w-1.5 before:bg-brand"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={
                    tier.featured
                      ? 'w-full bg-brand text-brand-foreground hover:bg-brand/90'
                      : 'w-full'
                  }
                  variant={tier.featured ? 'default' : 'outline'}
                  onClick={openModal}
                >
                  견적 문의
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="section notes">
        <div className="container-page notes__inner reveal">
          <div>
            <div className="section-label">Terms</div>
            <h2 className="section-title">기본 조건</h2>
          </div>
          <ul className="notes-list">
            {notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section license-cta">
        <div className="container-page reveal">
          <h2 className="section-title">견적은 범위에 따라 산출합니다</h2>
          <p className="section-lead">
            창고 수, 사용자 수, 연동 대상, 커스터마이징 범위를 기준으로 제안서를 드립니다.
          </p>
          <Button size="lg" className="mt-6" onClick={openModal}>
            도입 상담
          </Button>
        </div>
      </section>
    </div>
  );
}
