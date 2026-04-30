import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';

type Link = { id: string; title: string };

type Props = {
  pageId: string;
  published: boolean;
  links: Link[];
};

export async function AnalyticsWidget({ pageId, published, links }: Props) {
  const t = await getTranslations('Dashboard');

  if (!published) {
    return (
      <section className="rounded-card border-border border bg-white p-6">
        <h2 className="font-jakarta text-mid mb-3 text-sm font-semibold tracking-wide uppercase">
          {t('analyticsHeading')}
        </h2>
        <p className="font-jakarta text-mid text-sm">
          {t('analyticsUnpublished')}
        </p>
      </section>
    );
  }

  const [views, clicks, linkClicks] = await Promise.all([
    prisma.analyticsEvent.count({ where: { pageId, type: 'view' } }),
    prisma.analyticsEvent.count({ where: { pageId, type: 'click' } }),
    prisma.analyticsEvent.groupBy({
      by: ['linkId'],
      where: { pageId, type: 'click', linkId: { not: null } },
      _count: { id: true },
    }),
  ]);

  // Prisma groupBy types linkId as string|null even with the `not: null` filter.
  // Filter here to keep the map keys as pure strings.
  const clicksByLinkId = Object.fromEntries(
    linkClicks
      .filter(
        (row): row is typeof row & { linkId: string } => row.linkId !== null,
      )
      .map((row) => [row.linkId, row._count.id]),
  );

  const hasData = views > 0 || clicks > 0;

  return (
    <section className="rounded-card border-border border bg-white p-6">
      <h2 className="font-jakarta text-mid mb-4 text-sm font-semibold tracking-wide uppercase">
        {t('analyticsHeading')}
      </h2>

      {!hasData ? (
        <p className="font-jakarta text-mid text-sm">{t('analyticsNoData')}</p>
      ) : (
        <div className="space-y-6">
          {/* Summary row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-card border-border bg-off-white border px-4 py-3">
              <p className="font-jakarta text-mid text-xs">
                {t('analyticsViews')}
              </p>
              <p className="font-syne text-dark mt-1 text-2xl font-extrabold tabular-nums">
                {views.toLocaleString()}
              </p>
            </div>
            <div className="rounded-card border-border bg-off-white border px-4 py-3">
              <p className="font-jakarta text-mid text-xs">
                {t('analyticsClicks')}
              </p>
              <p className="font-syne text-dark mt-1 text-2xl font-extrabold tabular-nums">
                {clicks.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Per-link breakdown */}
          {links.length > 0 && (
            <div>
              <p className="font-jakarta text-mid mb-2 text-xs font-semibold tracking-wide uppercase">
                {t('analyticsClicksPerLink')}
              </p>
              <ul className="border-border divide-border divide-y overflow-hidden rounded-xl border">
                {links.map((link) => {
                  const count = clicksByLinkId[link.id] ?? 0;
                  const pct = clicks > 0 ? (count / clicks) * 100 : 0;
                  return (
                    <li
                      key={link.id}
                      className="flex items-center justify-between gap-4 bg-white px-4 py-2.5 text-sm"
                    >
                      <span className="font-jakarta text-dark min-w-0 truncate">
                        {link.title}
                      </span>
                      <div className="flex shrink-0 items-center gap-3">
                        {clicks > 0 && (
                          <div className="border-border h-1.5 w-16 overflow-hidden rounded-full bg-[oklch(93%_0.005_285)]">
                            <div
                              className="bg-brand h-full rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        )}
                        <span className="font-jakarta text-mid w-8 text-right tabular-nums">
                          {count}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
