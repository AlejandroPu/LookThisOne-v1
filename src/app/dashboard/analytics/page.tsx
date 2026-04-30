import { getTranslations } from 'next-intl/server';
import { requirePage } from '@/lib/auth/dal';
import { AnalyticsWidget } from '../AnalyticsWidget';

export const metadata = { title: 'Analytics — Dashboard' };

export default async function DashboardAnalyticsPage() {
  const { page } = await requirePage();
  const t = await getTranslations('Dashboard');

  return (
    <main className="mx-auto max-w-2xl px-6 py-10 sm:px-8">
      <h1 className="font-syne text-dark mb-8 text-2xl font-extrabold tracking-tight">
        {t('nav.analytics')}
      </h1>
      <AnalyticsWidget
        pageId={page.id}
        published={page.published}
        links={page.links.map((l) => ({ id: l.id, title: l.title }))}
      />
    </main>
  );
}
