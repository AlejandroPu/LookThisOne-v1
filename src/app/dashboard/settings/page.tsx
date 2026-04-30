import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { requirePage } from '@/lib/auth/dal';
import { UsernameForm } from './UsernameForm';
import { EmailForm } from './EmailForm';
import { PasswordForm } from './PasswordForm';
import { DeleteForm } from './DeleteForm';

export const metadata: Metadata = { title: 'Settings — Dashboard' };

export default async function SettingsPage() {
  const { user, page } = await requirePage();
  const t = await getTranslations('Settings');

  const hasPasswordProvider = user.identities?.some(
    (i) => i.provider === 'email',
  );

  return (
    <main className="mx-auto max-w-2xl px-6 py-10 sm:px-8">
      <h1 className="font-syne text-dark mb-1 text-2xl font-extrabold tracking-tight">
        {t('title')}
      </h1>
      <p className="font-jakarta text-mid mb-8 text-sm">
        {t('signedInAs')}{' '}
        <span className="text-dark font-mono">{user.email}</span>
      </p>

      <UsernameForm currentUsername={page.username} />
      <EmailForm currentEmail={user.email ?? ''} />

      {hasPasswordProvider ? (
        <PasswordForm />
      ) : (
        <section className="rounded-card border-border mt-6 border bg-white p-6">
          <h2 className="font-jakarta text-mid mb-3 text-sm font-semibold tracking-wide uppercase">
            {t('password.heading')}
          </h2>
          <p className="font-jakarta text-mid text-sm">
            {t('password.googleSignIn')}
          </p>
        </section>
      )}

      <DeleteForm username={page.username} />
    </main>
  );
}
