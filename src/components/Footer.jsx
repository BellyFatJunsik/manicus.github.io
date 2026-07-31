import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Footer({ openModal }) {
  return (
    <footer className="mt-auto border-t border-border bg-primary text-primary-foreground">
      <div className="container-page grid gap-8 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-3 text-base font-bold tracking-[0.14em]">MANICUS</div>
          <p className="max-w-xs text-sm text-primary-foreground/65">
            WMS · 업무시스템 소스코드 제작 및 판매.
            <br />
            운영에 바로 붙는 기술 자산을 제공합니다.
          </p>
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
            <li className="text-primary-foreground/45">서울 · 대한민국</li>
          </ul>
        </div>
      </div>

      <div className="container-page">
        <Separator className="bg-primary-foreground/10" />
        <div className="flex justify-between gap-4 py-5 font-mono text-xs text-primary-foreground/45">
          <span>© {new Date().getFullYear()} Manicus</span>
          <span>manicus.co.kr</span>
        </div>
      </div>
    </footer>
  );
}
