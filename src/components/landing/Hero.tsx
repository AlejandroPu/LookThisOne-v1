import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import BrandName from '@/components/BrandName';

function PhoneMockup() {
  const links = [
    {
      label: 'Mi último video 🎬',
      bg: 'bg-brand/10',
      border: 'border-brand/25',
    },
    {
      label: 'Newsletter mensual ✉️',
      bg: 'bg-accent/10',
      border: 'border-accent/25',
    },
    {
      label: 'Mis cursos online 📚',
      bg: 'bg-success/10',
      border: 'border-success/25',
    },
    {
      label: 'Instagram',
      bg: 'bg-[#E1306C]/10',
      border: 'border-[#E1306C]/20',
    },
    { label: 'TikTok', bg: 'bg-dark/5', border: 'border-dark/15' },
  ];

  return (
    <div
      className="animate-float relative flex-shrink-0"
      style={{
        width: 256,
        height: 516,
        background: 'oklch(10% 0.02 285)',
        borderRadius: 44,
        border: '7px solid oklch(20% 0.03 285)',
        boxShadow:
          '0 0 0 1px oklch(28% 0.02 285), 0 48px 96px oklch(10% 0.28 285 / 0.55)',
        overflow: 'hidden',
      }}
    >
      {/* notch */}
      <div
        className="absolute top-[14px] left-1/2 z-10 -translate-x-1/2"
        style={{
          width: 88,
          height: 22,
          background: 'oklch(10% 0.02 285)',
          borderRadius: 11,
        }}
      />
      {/* screen */}
      <div className="bg-off-white flex h-full flex-col items-center gap-[10px] px-[18px] pt-[52px] pb-[18px]">
        {/* avatar */}
        <div
          className="font-syne mt-1 mb-[2px] flex h-[68px] w-[68px] items-center justify-center rounded-full text-[26px] font-extrabold text-white"
          style={{
            background:
              'linear-gradient(135deg, oklch(62% 0.28 285), oklch(68% 0.22 22))',
            boxShadow: '0 4px 16px oklch(62% 0.28 285 / 0.4)',
          }}
        >
          A
        </div>

        <p className="font-syne text-dark text-[15px] font-bold">
          @ana.creates
        </p>
        <p className="font-jakarta text-mid max-w-[160px] text-center text-[11.5px] leading-relaxed">
          Perfil #1 · Madrid 🌟
        </p>

        {/* social row */}
        <div className="mb-1 flex gap-2">
          {['IG', 'TK', 'YT', 'TW'].map((s) => (
            <div
              key={s}
              className="bg-border text-mid flex h-7 w-7 items-center justify-center rounded-full text-[11px]"
            >
              {s}
            </div>
          ))}
        </div>

        {/* links */}
        {links.map((l, i) => (
          <div
            key={i}
            className={`font-jakarta text-dark w-full rounded-[10px] border px-[14px] py-[11px] text-center text-[12px] font-semibold ${l.bg} ${l.border}`}
          >
            {l.label}
          </div>
        ))}

        {/* watermark */}
        <p className="font-jakarta text-border mt-auto text-[10px]">
          <BrandName baseClass="text-border" />
          /@ana.creates
        </p>
      </div>
    </div>
  );
}

export default async function Hero() {
  const t = await getTranslations('Landing.hero');

  const avatarColors = [
    'bg-brand',
    'bg-accent',
    'bg-success',
    'bg-warning',
    'bg-[oklch(62%_0.22_320)]',
  ];

  return (
    <section className="bg-dark relative flex min-h-screen items-center overflow-hidden px-7 pt-[120px] pb-20">
      {/* ambient glows */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[640px] w-[640px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, oklch(62% 0.28 285 / 0.35) 0%, transparent 68%)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, oklch(68% 0.22 22 / 0.25) 0%, transparent 68%)',
        }}
      />

      <div className="relative mx-auto flex w-full max-w-screen-xl items-center justify-between gap-16">
        {/* Copy */}
        <div className="flex-1">
          {/* badge */}
          <div
            className="animate-fade-up rounded-pill mb-7 inline-flex items-center gap-2 px-4 py-[6px]"
            style={{ background: 'oklch(22% 0.04 285)' }}
          >
            <span className="bg-success h-[7px] w-[7px] rounded-full" />
            <span
              className="font-jakarta text-[13px] font-medium"
              style={{ color: 'oklch(72% 0.05 285)' }}
            >
              {t('badge')}
            </span>
          </div>

          {/* headline */}
          <h1
            className="font-syne mb-6 leading-[1.03] font-extrabold tracking-[-2.5px]"
            style={{ fontSize: 'clamp(52px, 6.5vw, 96px)' }}
          >
            <span className="text-brand">{t('headline1')}</span>
            <br />
            <span className="text-accent">{t('headline2')}</span>
            <br />
            <span className="text-off-white">{t('headline3')}</span>
          </h1>

          <p
            className="font-jakarta mb-10 leading-[1.65] font-normal text-[oklch(68%_0.02_285)]"
            style={{ fontSize: 19, maxWidth: 460 }}
          >
            {t('subheadline')}
          </p>

          <div className="flex flex-col gap-5">
            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/signup"
                className="rounded-pill bg-brand font-syne px-9 py-[17px] text-[17px] font-bold text-white shadow-[0_8px_32px_oklch(62%_0.28_285_/_0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_oklch(62%_0.28_285_/_0.7)]"
              >
                {t('ctaPrimary')}
              </Link>
              <span className="font-jakarta text-sm text-[oklch(48%_0.02_285)]">
                {t('ctaPrice')}
              </span>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex">
                {avatarColors.map((c, i) => (
                  <div
                    key={i}
                    className={`border-dark h-[30px] w-[30px] rounded-full border-[2.5px] ${c}`}
                    style={{ marginLeft: i > 0 ? -9 : 0 }}
                  />
                ))}
              </div>
              <span className="font-jakarta text-sm text-[oklch(55%_0.02_285)]">
                {t('socialProof')}
              </span>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-shrink-0 justify-center pr-8">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
