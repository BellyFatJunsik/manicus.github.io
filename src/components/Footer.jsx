import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Footer({ openModal }) {
  return (
    <footer className="mt-auto border-t border-border bg-primary text-primary-foreground">
      <div className="container-page grid gap-8 py-14 md:grid-cols-[1.5fr_1fr_1.2fr]">
        <div>
          <div className="mb-3 text-base font-bold tracking-[0.14em]">MANICUS</div>
          <p className="mb-4 max-w-sm text-sm text-primary-foreground/65">
            WMS · 업무시스템 소스코드 제작 및 판매.
            <br />
            운영에 바로 붙는 기술 자산을 제공합니다.
          </p>
          <dl className="space-y-1.5 text-xs leading-relaxed text-primary-foreground/55">
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-primary-foreground/40">상호</dt>
              <dd>(주)매니커스</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-primary-foreground/40">사업자등록번호</dt>
              <dd>793-86-03495</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="shrink-0 text-primary-foreground/40">주소</dt>
              <dd>경기도 부천시 소사구 양지로 237 10층 1061호</dd>
            </div>
          </dl>
        </div>

        <div>
          <div className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-primary-foreground/45">
            Navigate
          </div>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link className="text-primary-foreground/80 hover:text-primary-foreground" to="/products">
                제품
              </Link>
            </li>
            <li>
              <Link className="text-primary-foreground/80 hover:text-primary-foreground" to="/license">
                라이선스
              </Link>
            </li>
            <li>
              <Button
                variant="link"
                className="h-auto p-0 text-primary-foreground/80 hover:text-primary-foreground"
                onClick={openModal}
              >
                문의
              </Button>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-primary-foreground/45">
            Contact
          </div>
          <ul className="flex flex-col gap-2 text-sm text-primary-foreground/80">
            <li>
              <a href="mailto:contact@manicus.co.kr" className="hover:text-primary-foreground">
                contact@manicus.co.kr
              </a>
            </li>
            <li className="text-primary-foreground/55">
              경기도 부천시 소사구 양지로 237
              <br />
              10층 1061호
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page">
        <Separator className="bg-primary-foreground/10" />
        <div className="flex flex-col gap-2 py-5 font-mono text-xs text-primary-foreground/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} (주)매니커스</span>
          <span>사업자등록번호 793-86-03495</span>
        </div>
      </div>
    </footer>
  );
}
