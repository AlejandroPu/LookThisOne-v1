'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import BrandName from '@/components/BrandName';

export type CatalogProfile = {
  n: number;
  handle: string;
  name: string;
  bio: string;
  avatarUrl: string | null;
  tags: string[];
};

type Props = {
  profiles: CatalogProfile[];
};

// Deterministic color from username — keeps avatars visually consistent across
// page loads and locales without storing a color in the DB.
const PALETTE = [
  'oklch(62% 0.28 285)',
  'oklch(12% 0.02 285)',
  'oklch(68% 0.22 22)',
  'oklch(62% 0.25 295)',
  'oklch(55% 0.22 200)',
  'oklch(65% 0.22 45)',
  'oklch(62% 0.28 320)',
  'oklch(58% 0.2 175)',
  'oklch(70% 0.18 115)',
  'oklch(45% 0.15 270)',
  'oklch(62% 0.22 240)',
  'oklch(55% 0.25 145)',
];

function profileColor(username: string): string {
  let h = 0;
  for (const c of username) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return PALETTE[h % PALETTE.length];
}

// Locale-neutral sentinel — never displayed directly; rendered via t('tagAll')
const TAG_ALL = 'all';

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export default function CatalogGrid({ profiles }: Props) {
  const t = useTranslations('Catalog');
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState(TAG_ALL);

  const allTags = [...new Set(profiles.flatMap((p) => p.tags))];
  const showTagBar = allTags.length > 0;

  const filtered = profiles.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      u.name.toLowerCase().includes(q) ||
      u.handle.toLowerCase().includes(q) ||
      u.bio.toLowerCase().includes(q);
    const matchTag = activeTag === TAG_ALL || u.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  const resultLabel =
    filtered.length === 1
      ? t('resultSingular', { count: filtered.length })
      : t('resultPlural', { count: filtered.length });

  return (
    <div className="min-h-screen bg-[oklch(97%_0.004_285)] pt-[68px]">
      {/* Page header */}
      <div className="border-border border-b bg-white px-5 pt-11 pb-7 sm:px-7">
        <div className="mx-auto max-w-screen-xl">
          <h1
            className="font-syne text-dark mb-1.5 font-extrabold tracking-[-1px]"
            style={{ fontSize: 'clamp(30px, 3.5vw, 44px)' }}
          >
            {t('heading')}
          </h1>
          <p className="font-jakarta text-mid mb-6 text-base">
            {t('subtitleBefore')} <BrandName baseClass="text-mid" />{' '}
            {t('subtitleAfter')}
          </p>

          {/* Search */}
          <div className="relative max-w-[380px]">
            <span className="text-mid absolute top-1/2 left-4 -translate-y-1/2 opacity-50">
              <SearchIcon />
            </span>
            <input
              type="search"
              placeholder={t('searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-pill border-border font-jakarta text-dark focus:border-brand/50 w-full border bg-[oklch(98%_0.004_285)] py-[13px] pr-5 pl-11 text-[15px] transition-colors duration-200 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Tag filter — only rendered when profiles have tags */}
      {showTagBar && (
        <div className="border-border overflow-x-auto border-b bg-white px-5 py-3 sm:px-7">
          <div className="mx-auto flex max-w-screen-xl gap-2">
            {[TAG_ALL, ...allTags].map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={[
                  'rounded-pill font-jakarta px-4 py-[7px] text-[13px] font-medium whitespace-nowrap transition-all duration-200',
                  activeTag === tag
                    ? 'bg-dark text-off-white'
                    : 'hover:bg-border bg-[oklch(95%_0.005_285)] text-[oklch(45%_0.02_285)]',
                ].join(' ')}
              >
                {tag === TAG_ALL ? t('tagAll') : tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result count + list */}
      <div className="mx-auto max-w-screen-xl px-4 pt-9 pb-16 sm:px-7">
        {profiles.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-syne text-dark mb-3 text-2xl font-bold">
              {t('emptyHeading')}
            </p>
            <p className="font-jakarta text-mid mb-6 text-[15px]">
              {t('emptyBody')}
            </p>
            <Link
              href="/signup"
              className="rounded-pill bg-brand font-jakarta inline-block px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_oklch(62%_0.28_285_/_0.4)] transition-all duration-200 hover:-translate-y-px"
            >
              {t('emptyCta')}
            </Link>
          </div>
        ) : (
          <>
            <p className="font-jakarta text-mid mb-6 text-sm">
              {resultLabel}
              {activeTag !== TAG_ALL ? (
                <>
                  {' '}
                  {t('resultIn')}{' '}
                  <strong className="text-dark font-semibold">
                    {activeTag}
                  </strong>
                </>
              ) : (
                <>
                  {' '}
                  — <BrandName baseClass="text-mid" />
                </>
              )}
            </p>

            {filtered.length > 0 ? (
              <ol className="rounded-card border-border overflow-hidden border bg-white">
                {filtered.map((u, i) => {
                  const color = profileColor(u.handle);
                  const initial = u.handle[0].toUpperCase();
                  return (
                    <li
                      key={u.handle}
                      className={[
                        'flex flex-col gap-2 px-4 py-4 transition-colors duration-150 hover:bg-[oklch(98%_0.005_285)] sm:grid sm:items-center sm:gap-4 sm:px-5 sm:py-3.5',
                        i === 0 ? '' : 'border-border border-t',
                      ].join(' ')}
                      style={{ gridTemplateColumns: '64px 44px 1fr auto' }}
                    >
                      {/* Mobile: number + avatar inline; desktop: separate grid cells */}
                      <div className="flex items-center gap-3 sm:contents">
                        {/* Acquisition number */}
                        <span
                          className={[
                            'font-syne text-[20px] font-extrabold tracking-[-0.5px] tabular-nums sm:text-[22px]',
                            u.n <= 3
                              ? 'text-brand'
                              : 'text-[oklch(70%_0.02_285)]',
                          ].join(' ')}
                        >
                          #{String(u.n).padStart(2, '0')}
                        </span>

                        {/* Avatar */}
                        {u.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={u.avatarUrl}
                            alt={u.name}
                            className="h-9 w-9 flex-shrink-0 rounded-full object-cover"
                            style={{ boxShadow: `0 1px 6px ${color}40` }}
                          />
                        ) : (
                          <span
                            className="font-syne flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                            style={{
                              background: color,
                              boxShadow: `0 1px 6px ${color}40`,
                            }}
                          >
                            {initial}
                          </span>
                        )}
                      </div>

                      {/* Name + handle + bio */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="font-syne text-dark text-[15px] font-bold">
                            {u.name}
                          </span>
                          <span className="font-jakarta text-brand text-[13px] font-medium">
                            @{u.handle}
                          </span>
                        </div>
                        <p className="font-jakarta text-mid mt-0.5 truncate text-[13px]">
                          {u.bio}
                        </p>
                      </div>

                      {/* Tags + arrow */}
                      <div className="flex items-center gap-4">
                        {u.tags.length > 0 && (
                          <div className="hidden gap-1.5 sm:flex">
                            {u.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-pill font-jakarta bg-[oklch(96%_0.005_285)] px-[10px] py-[3px] text-[11px] font-medium text-[oklch(48%_0.02_285)]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <Link
                          href={`/${u.handle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-jakarta text-brand text-[13px] font-semibold whitespace-nowrap transition-opacity duration-200 hover:opacity-70"
                        >
                          {t('viewProfile')}
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <div className="py-20 text-center">
                <p className="font-jakarta mb-2 text-4xl">🔍</p>
                <p className="font-jakarta text-mid text-[17px] font-medium">
                  {t('noResults')}
                </p>
                <p className="font-jakarta mt-2 text-sm text-[oklch(65%_0.02_285)]">
                  {t('noResultsHint')}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
