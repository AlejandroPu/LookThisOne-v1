'use client';

import { useTranslations } from 'next-intl';

type Props = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function RootError({ error, unstable_retry }: Props) {
  const t = useTranslations('ErrorBoundary');
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="text-lg font-semibold">{t('heading')}</h2>
      <p className="max-w-sm text-sm text-gray-500">
        {error.digest ? t('bodyWithId', { digest: error.digest }) : t('body')}
      </p>
      <button
        onClick={() => unstable_retry()}
        className="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        {t('retry')}
      </button>
    </main>
  );
}
