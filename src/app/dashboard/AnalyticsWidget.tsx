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
      <section className="mt-8 rounded border border-gray-200 p-6">
        <h2 className="mb-4 text-sm font-medium text-gray-500">
          {t('analyticsHeading')}
        </h2>
        <p className="text-sm text-gray-400">{t('analyticsUnpublished')}</p>
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
    <section className="mt-8 rounded border border-gray-200 p-6">
      <h2 className="mb-4 text-sm font-medium text-gray-500">
        {t('analyticsHeading')}
      </h2>

      {!hasData ? (
        <p className="text-sm text-gray-400">{t('analyticsNoData')}</p>
      ) : (
        <div className="space-y-6">
          {/* Summary row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded border border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-xs text-gray-500">{t('analyticsViews')}</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">
                {views.toLocaleString()}
              </p>
            </div>
            <div className="rounded border border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-xs text-gray-500">{t('analyticsClicks')}</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">
                {clicks.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Per-link breakdown */}
          {links.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium text-gray-500">
                {t('analyticsClicksPerLink')}
              </p>
              <ul className="divide-y divide-gray-100 rounded border border-gray-100">
                {links.map((link) => {
                  const count = clicksByLinkId[link.id] ?? 0;
                  const pct = clicks > 0 ? (count / clicks) * 100 : 0;
                  return (
                    <li
                      key={link.id}
                      className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm"
                    >
                      <span className="min-w-0 truncate text-gray-700">
                        {link.title}
                      </span>
                      <div className="flex shrink-0 items-center gap-3">
                        {clicks > 0 && (
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className="h-full rounded-full bg-gray-400"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        )}
                        <span className="w-8 text-right text-gray-500 tabular-nums">
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
