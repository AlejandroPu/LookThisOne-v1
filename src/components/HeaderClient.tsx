'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandName from '@/components/BrandName';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';

type Props = {
  isLoggedIn: boolean;
  labels: {
    homeAriaLabel: string;
    whatIs: string;
    catalog: string;
    reservePage: string;
    goToDashboard: string;
    menuLabel: string;
  };
};

function HamburgerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 5h14M3 10h14M3 15h14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 4l12 12M16 4L4 16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HeaderClient({ isLoggedIn, labels }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const isCatalog = pathname === '/catalogo';
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu and return focus to hamburger button
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  // Escape key closes the menu
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, closeMenu]);

  const isLightCtx = isCatalog || scrolled;
  const navItemBase =
    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200';
  const ctaHref = isLoggedIn ? '/dashboard' : '/signup';
  const ctaLabel = isLoggedIn ? labels.goToDashboard : labels.reservePage;

  return (
    <>
      <header
        className={[
          'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
          isLightCtx
            ? 'border-border bg-off-white/95 border-b backdrop-blur-lg'
            : 'border-b border-transparent bg-transparent',
        ].join(' ')}
      >
        <div className="mx-auto flex h-[68px] max-w-screen-xl items-center justify-between px-5 sm:px-7">
          {/* Logo — smaller on mobile */}
          <Link
            href="/"
            aria-label={labels.homeAriaLabel}
            className={[
              'font-syne text-[17px] font-extrabold tracking-tight transition-colors duration-300 md:text-[21px]',
              isLightCtx ? 'text-dark' : 'text-off-white',
            ].join(' ')}
          >
            <BrandName
              baseClass={isLightCtx ? 'text-dark' : 'text-off-white'}
            />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 md:flex"
          >
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
                baseClass={
                  isLanding || !isLightCtx ? 'text-off-white' : 'text-dark'
                }
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
              href={ctaHref}
              className="rounded-pill bg-brand font-jakarta ml-3 px-[22px] py-[10px] text-sm font-semibold text-white shadow-[0_4px_20px_oklch(62%_0.28_285_/_0.5)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_28px_oklch(62%_0.28_285_/_0.6)]"
            >
              {ctaLabel}
            </Link>

            <div className="ml-3">
              <LocaleSwitcher variant={isLightCtx ? 'light' : 'dark'} />
            </div>
          </nav>

          {/* Mobile hamburger button */}
          <button
            ref={hamburgerRef}
            type="button"
            aria-label={labels.menuLabel}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className={[
              'flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200 md:hidden',
              isLightCtx
                ? 'text-dark hover:bg-border'
                : 'text-off-white hover:bg-white/10',
            ].join(' ')}
          >
            {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <>
          {/* Backdrop — closes menu on outside click */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            aria-hidden="true"
            onClick={closeMenu}
          />

          {/* Menu panel */}
          <div
            id="mobile-menu"
            className="border-border bg-off-white/98 fixed top-[68px] right-0 z-[45] w-[min(280px,calc(100vw-1.25rem))] rounded-bl-xl border-b border-l shadow-lg backdrop-blur-lg md:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="mx-auto flex max-w-screen-xl flex-col gap-1 px-5 py-4"
            >
              <Link
                href="/"
                onClick={closeMenu}
                className={[
                  'rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-150',
                  isLanding
                    ? 'bg-dark text-off-white font-semibold'
                    : 'text-dark hover:bg-border',
                ].join(' ')}
              >
                {labels.whatIs}{' '}
                <BrandName
                  baseClass={isLanding ? 'text-off-white' : 'text-dark'}
                />
              </Link>

              <Link
                href="/catalogo"
                onClick={closeMenu}
                className={[
                  'rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-150',
                  isCatalog
                    ? 'bg-dark text-off-white font-semibold'
                    : 'text-dark hover:bg-border',
                ].join(' ')}
              >
                {labels.catalog}
              </Link>

              <div className="my-1 h-px bg-[oklch(92%_0.005_285)]" />

              <Link
                href={ctaHref}
                onClick={closeMenu}
                className="rounded-pill bg-brand font-jakarta px-5 py-3 text-center text-sm font-semibold text-white"
              >
                {ctaLabel}
              </Link>

              <div className="mt-2 flex justify-center">
                <LocaleSwitcher variant="light" />
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
