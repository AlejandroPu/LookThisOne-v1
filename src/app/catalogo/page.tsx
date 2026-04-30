import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import CatalogGrid, {
  type CatalogProfile,
} from '@/components/landing/CatalogGrid';
import Footer from '@/components/landing/Footer';
import { prisma } from '@/lib/prisma';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Catalog');
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default async function CatalogoPage() {
  // v2: add isDemo: false once real users fill the catalog and demo rows are cleaned up.
  const pages = await prisma.page.findMany({
    where: {
      published: true,
      acquisitionNumber: { not: null },
    },
    orderBy: { acquisitionNumber: 'asc' },
    select: {
      username: true,
      title: true,
      bio: true,
      avatarUrl: true,
      acquisitionNumber: true,
    },
  });

  const profiles: CatalogProfile[] = pages.map((page) => ({
    n: page.acquisitionNumber!,
    handle: page.username,
    name: page.title ?? page.username,
    bio: page.bio ?? '',
    avatarUrl: page.avatarUrl,
    tags: [],
  }));

  return (
    <>
      <Header />
      <main>
        <CatalogGrid profiles={profiles} />
      </main>
      <Footer />
    </>
  );
}
