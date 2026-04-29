import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import BrandName from '@/components/BrandName';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';

export default async function Footer() {
  const t = await getTranslations('Landing.footer');

  return (
    <footer className="bg-dark px-7 pt-16 pb-10">
      <div className="mx-auto max-w-screen-xl">
        {/* Top row */}
        <div className="mb-12 flex flex-wrap items-start justify-between gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-syne text-off-white text-[22px] font-extrabold tracking-tight"
            >
              <BrandName baseClass="text-[oklch(48%_0.02_285)]" />
            </Link>
            <p className="font-jakarta mt-2 max-w-[260px] text-sm leading-relaxed text-[oklch(48%_0.02_285)]">
              {t('tagline1')}
              <br />
              {t('tagline2')}
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-10">
            <div>
              <p className="font-jakarta mb-4 text-xs font-semibold tracking-[1.5px] text-[oklch(40%_0.02_285)] uppercase">
                {t('productHeading')}
              </p>
              <ul className="flex flex-col gap-[10px]">
                <li>
                  <Link
                    href="/#features"
                    className="font-jakarta hover:text-off-white text-sm text-[oklch(55%_0.02_285)] transition-colors duration-200"
                  >
                    {t('linkFeatures')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalogo"
                    className="font-jakarta hover:text-off-white text-sm text-[oklch(55%_0.02_285)] transition-colors duration-200"
                  >
                    {t('linkCatalog')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-jakarta mb-4 text-xs font-semibold tracking-[1.5px] text-[oklch(40%_0.02_285)] uppercase">
                {t('legalHeading')}
              </p>
              <ul className="flex flex-col gap-[10px]">
                <li>
                  <Link
                    href="/privacy"
                    className="font-jakarta hover:text-off-white text-sm text-[oklch(55%_0.02_285)] transition-colors duration-200"
                  >
                    {t('linkPrivacy')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="font-jakarta hover:text-off-white text-sm text-[oklch(55%_0.02_285)] transition-colors duration-200"
                  >
                    {t('linkTerms')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[oklch(22%_0.02_285)] pt-7">
          <p className="font-jakarta text-[13px] text-[oklch(38%_0.02_285)]">
            © {new Date().getFullYear()}{' '}
            <BrandName baseClass="text-[oklch(38%_0.02_285)]" />{' '}
            {t('copyrightAfter')}
          </p>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}
