'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const NAV_ITEMS = [
  { href: '/dashboard', key: 'overview' },
  { href: '/dashboard/profile', key: 'profile' },
  { href: '/dashboard/links', key: 'links' },
  { href: '/dashboard/theme', key: 'theme' },
  { href: '/dashboard/analytics', key: 'analytics' },
  { href: '/dashboard/settings', key: 'settings' },
] as const;

type Props = { onNavigate?: () => void };

export function DashboardNav({ onNavigate }: Props) {
  const pathname = usePathname();
  const t = useTranslations('Dashboard.nav');

  return (
    <nav className="flex flex-col gap-0.5 px-3">
      {NAV_ITEMS.map(({ href, key }) => {
        const isActive =
          href === '/dashboard'
            ? pathname === '/dashboard'
            : pathname === href || pathname.startsWith(href + '/');
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={[
              'font-jakarta rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors duration-150',
              isActive
                ? 'text-off-white bg-white/10 font-semibold'
                : 'hover:text-off-white text-[oklch(60%_0.02_285)] hover:bg-white/8',
            ].join(' ')}
          >
            {t(key)}
          </Link>
        );
      })}
    </nav>
  );
}
