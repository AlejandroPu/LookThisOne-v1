'use client';

import { useRef, useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { readConsent, setConsent } from '@/lib/consent/cookie.client';

const PRIVATE_PREFIXES = [
  '/dashboard',
  '/login',
  '/signup',
  '/auth',
  '/onboarding',
  '/go',
];

// useSyncExternalStore lets React reconcile the server/client snapshots
// without throwing a hydration error. The server snapshot always returns
// 'undetermined' so the banner is hidden during SSR; the client snapshot
// reads the real cookie value after hydration.
function subscribeToNothing() {
  return () => {};
}
function getClientSnapshot() {
  return readConsent();
}
function getServerSnapshot() {
  return 'undetermined' as const;
}

export function ConsentBanner() {
  const pathname = usePathname();
  const t = useTranslations('Consent');

  const consentValue = useSyncExternalStore(
    subscribeToNothing,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [dismissed, setDismissed] = useState(false);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  const visible = !dismissed && consentValue === null;

  useEffect(() => {
    if (visible) firstButtonRef.current?.focus();
  }, [visible]);

  if (PRIVATE_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  if (!visible) return null;

  function handleChoice(value: 'granted' | 'denied') {
    setConsent(value);
    setDismissed(true);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('ariaLabel')}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white shadow-md"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700">
          {t('message')}{' '}
          <Link href="/privacy" className="underline hover:text-gray-900">
            {t('privacyPolicy')}
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            ref={firstButtonRef}
            onClick={() => handleChoice('denied')}
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {t('reject')}
          </button>
          <button
            onClick={() => handleChoice('granted')}
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
