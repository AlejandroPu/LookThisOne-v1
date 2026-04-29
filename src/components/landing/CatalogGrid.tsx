'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import BrandName from '@/components/BrandName';

type Profile = {
  /** Acquisition number — order in which the slot was reserved. */
  n: number;
  handle: string;
  name: string;
  bio: string;
  color: string;
  initial: string;
  tags: string[];
};

// TODO(#40): replace with real Prisma query once acquisition_number column is added.
const PROFILES: Profile[] = [
  {
    n: 1,
    handle: 'ana.creates',
    name: 'Ana García',
    bio: 'Creadora de contenido ✨ · Madrid',
    color: 'oklch(62% 0.28 285)',
    initial: 'A',
    tags: ['contenido', 'lifestyle'],
  },
  {
    n: 2,
    handle: 'marcos.dev',
    name: 'Marcos López',
    bio: 'Desarrollador full-stack · freelance',
    color: 'oklch(12% 0.02 285)',
    initial: 'M',
    tags: ['tech', 'programación'],
  },
  {
    n: 3,
    handle: 'laurafit',
    name: 'Laura Fitness',
    bio: 'Entrenadora personal 💪 · online',
    color: 'oklch(68% 0.22 22)',
    initial: 'L',
    tags: ['fitness', 'salud'],
  },
  {
    n: 4,
    handle: 'djnova',
    name: 'DJ Nova',
    bio: 'Música electrónica 🎶 · Ibiza',
    color: 'oklch(62% 0.25 295)',
    initial: 'N',
    tags: ['música', 'arte'],
  },
  {
    n: 5,
    handle: 'foto.mx',
    name: 'Carlos Foto',
    bio: 'Fotógrafo profesional 📷 · México',
    color: 'oklch(55% 0.22 200)',
    initial: 'C',
    tags: ['fotografía', 'arte'],
  },
  {
    n: 6,
    handle: 'chef.ramon',
    name: 'Ramón Cocina',
    bio: 'Chef y foodie 🍳 · Barcelona',
    color: 'oklch(65% 0.22 45)',
    initial: 'R',
    tags: ['gastronomía', 'lifestyle'],
  },
  {
    n: 7,
    handle: 'mia.designs',
    name: 'Mía Rodríguez',
    bio: 'Diseñadora gráfica 🎨 · remota',
    color: 'oklch(62% 0.28 320)',
    initial: 'R',
    tags: ['diseño', 'arte'],
  },
  {
    n: 8,
    handle: 'viajes.carlos',
    name: 'Carlos Viaja',
    bio: 'Nómada digital ✈️ · en movimiento',
    color: 'oklch(58% 0.2 175)',
    initial: 'C',
    tags: ['viajes', 'lifestyle'],
  },
  {
    n: 9,
    handle: 'yoga.sofia',
    name: 'Sofía Yoga',
    bio: 'Bienestar y meditación 🧘 · online',
    color: 'oklch(70% 0.18 115)',
    initial: 'S',
    tags: ['salud', 'bienestar'],
  },
  {
    n: 10,
    handle: 'el_poeta',
    name: 'Juan Poemas',
    bio: 'Escritor y poeta 📖 · Buenos Aires',
    color: 'oklch(45% 0.15 270)',
    initial: 'J',
    tags: ['escritura', 'arte'],
  },
  {
    n: 11,
    handle: 'startup.alba',
    name: 'Alba Emprende',
    bio: 'Fundadora de startups 🚀 · Madrid',
    color: 'oklch(62% 0.22 240)',
    initial: 'A',
    tags: ['emprendimiento', 'tech'],
  },
  {
    n: 12,
    handle: 'gamer.leo',
    name: 'Leo Games',
    bio: 'Streamer y gamer 🎮 · online',
    color: 'oklch(55% 0.25 145)',
    initial: 'L',
    tags: ['gaming', 'contenido'],
  },
];

// Locale-neutral sentinel — never displayed directly; rendered via t('tagAll')
const TAG_ALL = 'all';

const ALL_TAGS = [
  TAG_ALL,
  'contenido',
  'tech',
  'fitness',
  'música',
  'arte',
  'gastronomía',
  'diseño',
  'viajes',
  'bienestar',
  'escritura',
  'emprendimiento',
  'gaming',
  'salud',
  'lifestyle',
  'fotografía',
];

// Inline search icon — avoids adding a new dependency
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

export default function CatalogGrid() {
  const t = useTranslations('Catalog');
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState(TAG_ALL);

  const filtered = PROFILES.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      u.name.toLowerCase().includes(q) ||
      u.handle.toLowerCase().includes(q) ||
      u.bio.toLowerCase().includes(q);
    const matchTag = activeTag === TAG_ALL || u.tags.includes(activeTag);
    return matchSearch && matchTag;
  }).sort((a, b) => b.n - a.n); // descending: newest members appear at the top

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

      {/* Tag filter */}
      <div className="border-border overflow-x-auto border-b bg-white px-5 py-3 sm:px-7">
        <div className="mx-auto flex max-w-screen-xl gap-2">
          {ALL_TAGS.map((tag) => (
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

      {/* Demo notice */}
      <div className="border-border border-b bg-[oklch(98%_0.008_88)] px-5 py-2.5 sm:px-7">
        <div className="mx-auto max-w-screen-xl">
          <p className="font-jakarta text-[12px] text-[oklch(55%_0.08_88)]">
            {t('demoNotice')}
          </p>
        </div>
      </div>

      {/* Result count + list */}
      <div className="mx-auto max-w-screen-xl px-4 pt-9 pb-16 sm:px-7">
        <p className="font-jakarta text-mid mb-6 text-sm">
          {resultLabel}
          {activeTag !== TAG_ALL ? (
            <>
              {' '}
              {t('resultIn')}{' '}
              <strong className="text-dark font-semibold">{activeTag}</strong>
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
            {filtered.map((u, i) => (
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
                      u.n <= 3 ? 'text-brand' : 'text-[oklch(70%_0.02_285)]',
                    ].join(' ')}
                  >
                    #{String(u.n).padStart(2, '0')}
                  </span>

                  {/* Avatar */}
                  <span
                    className="font-syne flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{
                      background: u.color,
                      boxShadow: `0 1px 6px ${u.color}40`,
                    }}
                  >
                    {u.initial}
                  </span>
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
                  <Link
                    href={`/${u.handle}`}
                    className="font-jakarta text-brand text-[13px] font-semibold whitespace-nowrap transition-opacity duration-200 hover:opacity-70"
                  >
                    {t('viewProfile')}
                  </Link>
                </div>
              </li>
            ))}
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
      </div>
    </div>
  );
}
