import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/products', label: '제품' },
  { to: '/license', label: '라이선스' },
];

export default function Header({ openModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 border-b border-transparent bg-background/85 backdrop-blur-md transition-colors',
        scrolled && 'border-border bg-background/96'
      )}
    >
      <div className="container-page flex h-full items-center gap-6">
        <Link to="/" className="mr-auto flex items-center gap-2.5" aria-label="매니커스 홈">
          <svg width="22" height="20" viewBox="0 0 21 20" fill="none" aria-hidden="true">
            <rect width="21" height="20" rx="2" fill="#0B1220" />
            <path d="M0 0.3V19.3H3.48V5.97L9 11.97V6.63L2.9 0.3H0Z" fill="#fff" />
            <path d="M20 0.3V19.3H16.52V5.97L11 11.97V6.63L17.1 0.3H20Z" fill="#0F6E7C" />
          </svg>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-[0.12em]">MANICUS</span>
            <span className="font-mono text-[0.65rem] tracking-[0.16em] text-muted-foreground">
              MNCS
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="주 메뉴">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'border-b-2 border-transparent px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                  isActive && 'border-brand text-foreground'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button size="lg" className="hidden md:inline-flex" onClick={openModal}>
            문의하기
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="메뉴 열기">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle className="tracking-[0.12em]">MANICUS</SheetTitle>
              </SheetHeader>
              <Separator />
              <nav className="flex flex-col gap-1 px-1" aria-label="모바일 메뉴">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'rounded-md px-3 py-3 text-base font-semibold text-muted-foreground',
                        isActive && 'bg-muted text-foreground'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Button
                  className="mt-3 w-full"
                  onClick={() => {
                    setMenuOpen(false);
                    openModal();
                  }}
                >
                  문의하기
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
