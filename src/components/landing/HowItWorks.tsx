import { getTranslations } from 'next-intl/server';

export default async function HowItWorks() {
  const t = await getTranslations('Landing.howItWorks');

  const steps = [0, 1, 2].map((i) => ({
    n: t(`step${i}n` as Parameters<typeof t>[0]),
    title: t(`step${i}title` as Parameters<typeof t>[0]),
    desc: t(`step${i}desc` as Parameters<typeof t>[0]),
  }));

  return (
    <section className="bg-accent px-5 py-16 sm:px-7 sm:py-[108px]">
      <div className="mx-auto max-w-screen-xl">
        {/* Section header */}
        <div className="mb-[72px] text-center">
          <div className="rounded-pill mb-5 inline-flex items-center gap-2 bg-white/15 px-4 py-[6px]">
            <span className="bg-warning h-[7px] w-[7px] rounded-full" />
            <span className="font-jakarta text-[13px] font-medium tracking-widest text-white/80 uppercase">
              {t('badge')}
            </span>
          </div>
          <h2
            className="font-syne font-extrabold tracking-[-1.2px] text-white"
            style={{ fontSize: 'clamp(22px, 3.8vw, 52px)' }}
          >
            {t('heading')}
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {/* connector line — desktop only */}
          <div
            className="absolute top-10 right-[16.5%] left-[16.5%] hidden h-px bg-white/20 md:block"
            aria-hidden="true"
          />

          {steps.map((s) => (
            <div key={s.n} className="relative z-10 text-center">
              <div className="font-syne mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/25 bg-white/15 text-[22px] font-extrabold text-white">
                {s.n}
              </div>
              <h3 className="font-syne mb-3 text-[22px] font-bold text-white">
                {s.title}
              </h3>
              <p className="font-jakarta text-base leading-[1.65] text-white/75">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
