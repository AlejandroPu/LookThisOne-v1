import { getTranslations } from 'next-intl/server';

const ICONS = ['🔗', '📊', '🎨', '🌟', '🎟️', '🔒'];
const CARD_CLASSES = [
  'bg-white',
  'bg-brand-light',
  'bg-white',
  'bg-accent-light',
  'bg-white',
  'bg-success-light',
];

export default async function Features() {
  const t = await getTranslations('Landing.features');

  const items = ICONS.map((icon, i) => ({
    icon,
    cardClass: CARD_CLASSES[i],
    title: t(`item${i}title` as Parameters<typeof t>[0]),
    desc: t(`item${i}desc` as Parameters<typeof t>[0]),
  }));

  return (
    <section className="bg-brand px-5 py-16 sm:px-7 sm:py-[108px]">
      <div className="mx-auto max-w-screen-xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="rounded-pill mb-5 inline-flex items-center gap-2 bg-white/10 px-4 py-[6px]">
            <span className="bg-warning h-[7px] w-[7px] rounded-full" />
            <span className="font-jakarta text-[13px] font-medium tracking-widest text-white/75 uppercase">
              {t('badge')}
            </span>
          </div>
          <h2
            className="font-syne leading-[1.1] font-extrabold tracking-[-1.2px] text-white"
            style={{ fontSize: 'clamp(34px, 3.8vw, 52px)' }}
          >
            {t('heading')}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[18px] lg:grid-cols-3">
          {items.map((f) => (
            <article
              key={f.title}
              className={`${f.cardClass} rounded-card p-8 transition-transform duration-200 hover:-translate-y-1.5`}
            >
              <div className="mb-[18px] text-4xl leading-none">{f.icon}</div>
              <h3 className="font-syne text-dark mb-[10px] text-xl font-bold">
                {f.title}
              </h3>
              <p className="font-jakarta text-mid text-[15px] leading-[1.65]">
                {f.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
