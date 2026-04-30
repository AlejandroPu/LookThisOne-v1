import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { requirePage } from '@/lib/auth/dal';
import { togglePublish } from './actions';
import { AnalyticsWidget } from './AnalyticsWidget';

export const metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const { page } = await requirePage();
  const publicPath = `/${page.username}`;
  const t = await getTranslations('Dashboard');

  return (
    <main className="mx-auto max-w-2xl px-6 py-10 sm:px-8">
      <h1 className="font-syne text-dark mb-8 text-2xl font-extrabold tracking-tight">
        {t('nav.overview')}
      </h1>

      {/* Page status */}
      <section className="rounded-card border-border mb-6 border bg-white p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-jakarta text-mid mb-0.5 text-[13px] font-medium tracking-wide uppercase">
              {t('yourPage')}
            </p>
            <p className="font-syne text-dark text-lg font-bold tracking-tight">
              lookthis.one{publicPath}
            </p>
          </div>
          <span
            className={[
              'rounded-pill font-jakarta px-3 py-1 text-[12px] font-semibold',
              page.published
                ? 'bg-success-light text-success-dark'
                : 'text-mid bg-[oklch(95%_0.005_285)]',
            ].join(' ')}
          >
            {page.published ? t('published') : t('draft')}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <form action={togglePublish}>
            <button
              type="submit"
              className="rounded-pill bg-brand font-jakarta px-5 py-2 text-sm font-semibold text-white shadow-[0_4px_16px_oklch(62%_0.28_285_/_0.35)] transition-all duration-200 hover:-translate-y-px"
            >
              {page.published ? t('unpublish') : t('publish')}
            </button>
          </form>

          {page.published ? (
            <Link
              href={publicPath}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-pill border-border font-jakarta text-dark border px-5 py-2 text-sm font-medium transition-colors duration-200 hover:bg-[oklch(96%_0.005_285)]"
            >
              {t('viewPublicPage')}
            </Link>
          ) : (
            <p className="font-jakarta text-mid text-[13px]">
              {t('publishHint')}
            </p>
          )}
        </div>
      </section>

      <AnalyticsWidget
        pageId={page.id}
        published={page.published}
        links={page.links.map((l) => ({ id: l.id, title: l.title }))}
      />
    </main>
  );
}
