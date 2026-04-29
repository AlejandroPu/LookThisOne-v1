'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandName from '@/components/BrandName';

type Props = {
  isLoggedIn: boolean;
  labels: {
    whatIs: string;
    catalog: string;
    reservePage: string;
    goToDashboard: string;
  };
};

export default function HeaderClient({ isLoggedIn, labels }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const isCatalog = pathname === '/catalogo';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isLightCtx = isCatalog || scrolled;
  const navItemBase =
    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200';

  return (
    <header
      className={[
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        isLightCtx
          ? 'border-border bg-off-white/95 border-b backdrop-blur-lg'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex h-[68px] max-w-screen-xl items-center justify-between px-7">
        {/* Logo */}
        <Link
          href="/"
          aria-label="LookThis.One — inicio"
          className={[
            'font-syne text-[21px] font-extrabold tracking-tight transition-colors duration-300',
            isLightCtx ? 'text-dark' : 'text-off-white',
          ].join(' ')}
        >
          <BrandName baseClass={isLightCtx ? 'text-dark' : 'text-off-white'} />
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className={[
              navItemBase,
              isLanding
                ? isLightCtx
                  ? 'bg-dark text-off-white'
                  : 'text-off-white bg-white/10 font-semibold'
                : isLightCtx
                  ? 'text-dark hover:bg-border'
                  : 'text-off-white/80 hover:bg-white/8',
            ].join(' ')}
          >
            {labels.whatIs}{' '}
            <BrandName
              baseClass={isLightCtx ? 'text-dark' : 'text-off-white'}
            />
          </Link>

          <Link
            href="/catalogo"
            className={[
              navItemBase,
              isCatalog
                ? 'bg-dark text-off-white font-semibold'
                : isLightCtx
                  ? 'text-dark hover:bg-border'
                  : 'text-off-white/80 hover:bg-white/8',
            ].join(' ')}
          >
            {labels.catalog}
          </Link>

          <Link
            href={isLoggedIn ? '/dashboard' : '/signup'}
            className="rounded-pill bg-brand font-jakarta ml-3 px-[22px] py-[10px] text-sm font-semibold text-white shadow-[0_4px_20px_oklch(62%_0.28_285_/_0.5)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_28px_oklch(62%_0.28_285_/_0.6)]"
          >
            {isLoggedIn ? labels.goToDashboard : labels.reservePage}
          </Link>
        </nav>
      </div>
    </header>
  );
}
