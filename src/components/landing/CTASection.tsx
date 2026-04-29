import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import BrandName from '@/components/BrandName';

export default async function CTASection() {
  const t = await getTranslations('Landing.cta');

  return (
    <section className="bg-warning px-7 py-32">
      <div className="mx-auto max-w-[680px] text-center">
        <h2
          className="font-syne text-dark mb-5 leading-[1.07] font-extrabold tracking-[-2px]"
          style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}
        >
          {t('heading')}
        </h2>
        <p className="font-jakarta mb-11 text-lg leading-[1.65] text-[oklch(32%_0.06_88)]">
          {t('bodyBefore')} <BrandName baseClass="text-[oklch(32%_0.06_88)]" />{' '}
          {t('bodyAfter')}
        </p>

        <Link
          href="/signup"
          className="rounded-pill bg-dark font-syne text-off-white inline-block px-9 py-[17px] text-[17px] font-bold transition-colors duration-200 hover:bg-[oklch(20%_0.03_285)]"
        >
          {t('button')}
        </Link>

        <p className="font-jakarta mt-4 text-[13px] text-[oklch(42%_0.06_88)]">
          {t('price')}
        </p>
      </div>
    </section>
  );
}
