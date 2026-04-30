import { getTranslations } from 'next-intl/server';
import { requirePage } from '@/lib/auth/dal';
import { prisma } from '@/lib/prisma';
import { ThemePicker } from '../ThemePicker';

export const metadata = { title: 'Theme — Dashboard' };

export default async function DashboardThemePage() {
  const { page } = await requirePage();
  const t = await getTranslations('Theme');

  const builtInThemes = await prisma.theme.findMany({
    where: { isBuiltIn: true },
    select: {
      id: true,
      name: true,
      background: true,
      foreground: true,
      accent: true,
    },
    orderBy: { name: 'asc' },
  });

  return (
    <main className="mx-auto max-w-2xl px-6 py-10 sm:px-8">
      <h1 className="font-syne text-dark mb-8 text-2xl font-extrabold tracking-tight">
        {t('heading')}
      </h1>
      <ThemePicker
        themes={builtInThemes}
        currentThemeId={page.themeId}
        page={{
          title: page.title,
          bio: page.bio,
          avatarUrl: page.avatarUrl,
          username: page.username,
          links: page.links,
        }}
      />
    </main>
  );
}
