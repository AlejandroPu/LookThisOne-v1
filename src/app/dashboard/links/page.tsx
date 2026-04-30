import { getTranslations } from 'next-intl/server';
import { requirePage } from '@/lib/auth/dal';
import { LinksEditor } from '../LinksEditor';

export const metadata = { title: 'Links — Dashboard' };

export default async function DashboardLinksPage() {
  const { page } = await requirePage();
  const t = await getTranslations('Links');

  return (
    <main className="mx-auto max-w-2xl px-6 py-10 sm:px-8">
      <h1 className="font-syne text-dark mb-8 text-2xl font-extrabold tracking-tight">
        {t('heading')}
      </h1>
      <LinksEditor links={page.links} />
    </main>
  );
}
