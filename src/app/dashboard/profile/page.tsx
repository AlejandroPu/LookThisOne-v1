import { getTranslations } from 'next-intl/server';
import { requirePage } from '@/lib/auth/dal';
import { ProfileEditor } from '../ProfileEditor';

export const metadata = { title: 'Profile — Dashboard' };

export default async function DashboardProfilePage() {
  const { page } = await requirePage();
  const t = await getTranslations('Profile');

  return (
    <main className="mx-auto max-w-2xl px-6 py-10 sm:px-8">
      <h1 className="font-syne text-dark mb-8 text-2xl font-extrabold tracking-tight">
        {t('heading')}
      </h1>
      <ProfileEditor
        title={page.title}
        bio={page.bio}
        avatarUrl={page.avatarUrl}
        username={page.username}
      />
    </main>
  );
}
