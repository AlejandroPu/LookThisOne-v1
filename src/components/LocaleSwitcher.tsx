'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

// next-intl's localeCookie config drives middleware auto-detection only.
// Without URL-prefix routing (localePrefix: 'never') there is no middleware,
// so the client must write the cookie manually before calling router.refresh().
function setLocaleCookie(locale: string) {
  const maxAge = 60 * 60 * 24 * 365;
  const secure =
    typeof location !== 'undefined' && location.protocol === 'https:'
      ? '; Secure'
      : '';
  document.cookie = `lto_locale=${locale}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

type Variant = 'light' | 'dark';

export function LocaleSwitcher({ variant = 'light' }: { variant?: Variant }) {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(next: string) {
    setLocaleCookie(next);
    startTransition(() => {
      router.refresh();
    });
  }

  const activeClass =
    variant === 'dark' ? 'text-off-white font-semibold' : 'font-semibold';
  const inactiveClass =
    variant === 'dark'
      ? 'text-off-white/40 hover:text-off-white/80'
      : 'text-zinc-400 hover:text-zinc-900';
  const dividerClass =
    variant === 'dark' ? 'text-off-white/20' : 'text-zinc-300';

  return (
    <div
      className="font-jakarta flex items-center gap-1 text-xs"
      aria-label="Language"
    >
      <button
        onClick={() => handleChange('en')}
        disabled={locale === 'en' || isPending}
        aria-label="English"
        className={locale === 'en' ? activeClass : inactiveClass}
      >
        EN
      </button>
      <span className={dividerClass} aria-hidden="true">
        |
      </span>
      <button
        onClick={() => handleChange('es')}
        disabled={locale === 'es' || isPending}
        aria-label="Español"
        className={locale === 'es' ? activeClass : inactiveClass}
      >
        ES
      </button>
    </div>
  );
}
