import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import CatalogGrid from '@/components/landing/CatalogGrid';
import Footer from '@/components/landing/Footer';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Catalog');
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default function CatalogoPage() {
  return (
    <>
      <Header />
      <main>
        <CatalogGrid />
      </main>
      <Footer />
    </>
  );
}
