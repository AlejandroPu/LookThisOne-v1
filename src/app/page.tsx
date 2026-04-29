import { getTranslations } from 'next-intl/server';
import BrandName from '@/components/BrandName';
import Header from '@/components/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default async function LandingPage() {
  const t = await getTranslations('Landing');

  // Demo handles for the URL card
  const demoHandles = [
    { handle: 'ana.creates', color: 'bg-brand' },
    { handle: 'djnova', color: 'bg-accent' },
    { handle: 'marcos.dev', color: 'bg-success' },
  ];

  const stats = [
    { n: t('stats.stat2n'), label: t('stats.stat2label') },
    { n: t('stats.stat3n'), label: t('stats.stat3label') },
    { n: t('stats.stat4n'), label: t('stats.stat4label') },
  ];

  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* About — "¿Qué es LookThis.One?" */}
        <section id="features" className="bg-off-white px-7 py-[108px]">
          <div className="mx-auto max-w-screen-xl">
            <div className="mb-[72px] grid grid-cols-2 items-center gap-20">
              {/* Copy */}
              <div>
                <div className="rounded-pill bg-brand-light mb-6 inline-flex items-center gap-2 px-4 py-[6px]">
                  <span className="bg-brand h-[7px] w-[7px] rounded-full" />
                  <span className="font-jakarta text-brand-dark text-[13px] font-semibold tracking-widest uppercase">
                    {t('about.badge')}
                  </span>
                </div>

                <h2
                  className="font-syne text-dark mb-6 leading-[1.1] font-extrabold tracking-[-1.2px]"
                  style={{ fontSize: 'clamp(34px, 3.8vw, 52px)' }}
                >
                  {t('about.heading1')}
                  <br />
                  {t('about.heading2')}
                </h2>

                <p className="font-jakarta text-mid text-[17px] leading-[1.75]">
                  <BrandName baseClass="text-mid" /> {t('about.body')}
                </p>
              </div>

              {/* URL demo card */}
              <div className="rounded-card border-border border bg-white p-8 shadow-[0_4px_24px_oklch(80%_0.02_285_/_0.25)]">
                <p className="font-jakarta mb-3 text-[13px] text-[oklch(65%_0.01_285)]">
                  {t('about.urlLabel')}
                </p>

                <div className="border-brand/30 bg-brand-light mb-6 flex items-center gap-3 rounded-lg border px-5 py-4">
                  <span className="bg-brand h-2 w-2 flex-shrink-0 rounded-full" />
                  <span className="font-syne text-brand-dark text-lg font-bold tracking-tight">
                    <BrandName baseClass="text-brand-dark" />/
                    <span className="text-brand">{t('about.urlHandle')}</span>
                  </span>
                </div>

                <div className="flex flex-col gap-[10px]">
                  {demoHandles.map((u) => (
                    <div
                      key={u.handle}
                      className="flex items-center gap-[10px] rounded-[10px] bg-[oklch(97%_0.005_285)] px-[14px] py-[10px]"
                    >
                      <div
                        className={`h-7 w-7 flex-shrink-0 rounded-full ${u.color}`}
                      />
                      <span className="font-jakarta text-mid text-[13px]">
                        <BrandName baseClass="text-mid" />/{u.handle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5">
              {stats.map((s) => (
                <div
                  key={s.n}
                  className="rounded-card border-border border bg-white px-6 py-7"
                >
                  <p className="font-syne text-dark mb-1 text-[40px] leading-none font-extrabold tracking-tight">
                    {s.n}
                  </p>
                  <p className="font-jakarta text-mid text-[15px]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Features />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
