import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import BrandName from '@/components/BrandName';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { DashboardNav } from './DashboardNav';

type Props = {
  email: string;
  username: string;
  onNavigate?: () => void;
};

export async function DashboardSidebar({ email, username, onNavigate }: Props) {
  const t = await getTranslations('Dashboard');

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="px-5 pt-6 pb-4">
        <Link
          href="/dashboard"
          className="font-syne text-off-white text-[18px] font-extrabold tracking-tight"
        >
          <BrandName baseClass="text-[oklch(48%_0.02_285)]" />
        </Link>
        <p className="font-jakarta mt-1 truncate text-[12px] text-[oklch(48%_0.02_285)]">
          @{username}
        </p>
      </div>

      {/* Divider */}
      <div className="mx-4 mb-3 h-px bg-white/8" />

      {/* Nav */}
      <div className="flex-1 overflow-y-auto pb-4">
        <DashboardNav onNavigate={onNavigate} />
      </div>

      {/* Footer */}
      <div className="mx-4 border-t border-white/8 pt-4 pb-5">
        <p className="font-jakarta mb-3 truncate px-3 text-[12px] text-[oklch(42%_0.02_285)]">
          {email}
        </p>
        <div className="flex items-center justify-between px-3">
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="font-jakarta hover:text-off-white text-[13px] text-[oklch(50%_0.02_285)] transition-colors duration-150"
            >
              {t('signOut')}
            </button>
          </form>
          <LocaleSwitcher variant="dark" />
        </div>
      </div>
    </div>
  );
}
