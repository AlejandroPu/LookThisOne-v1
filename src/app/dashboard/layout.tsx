import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { requirePage } from '@/lib/auth/dal';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardDrawer } from '@/components/dashboard/DashboardDrawer';

// Auth and onboarding gating live in each page (via the DAL). This layout
// calls requirePage() only to supply display data (email, username) to the
// sidebar. Each page independently re-verifies the session.
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, page } = await requirePage();
  const t = await getTranslations('Dashboard');

  const sidebarProps = { email: user.email ?? '', username: page.username };

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="bg-dark hidden w-60 flex-shrink-0 flex-col md:flex">
        <DashboardSidebar {...sidebarProps} />
      </aside>

      {/* Mobile drawer */}
      <DashboardDrawer
        title={t('title')}
        menuLabel={t('nav.menuLabel')}
        drawerLabel={t('nav.drawerLabel')}
      >
        <DashboardSidebar {...sidebarProps} />
      </DashboardDrawer>

      {/* Main content area — pt-14 clears the fixed mobile top bar on small screens */}
      <div className="bg-off-white min-w-0 flex-1 pt-14 md:pt-0">
        {children}
      </div>
    </div>
  );
}
