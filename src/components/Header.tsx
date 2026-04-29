import { getTranslations } from 'next-intl/server';
import { peekUser } from '@/lib/auth/dal';
import HeaderClient from '@/components/HeaderClient';

export default async function Header() {
  const [t, user] = await Promise.all([getTranslations('Nav'), peekUser()]);

  return (
    <HeaderClient
      isLoggedIn={!!user}
      labels={{
        whatIs: t('whatIs'),
        catalog: t('catalog'),
        reservePage: t('reservePage'),
        goToDashboard: t('goToDashboard'),
      }}
    />
  );
}
