import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — LookThis.One',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-off-white min-h-screen px-7 pt-[108px] pb-20">
        <div className="mx-auto max-w-2xl">
          <h1
            className="font-syne text-dark mb-2 font-extrabold tracking-[-1px]"
            style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}
          >
            Privacy Policy
          </h1>
          <p className="font-jakarta text-mid mb-10 text-sm">
            Last updated: April 2026
          </p>

          <div className="font-jakarta space-y-8 text-[15px] leading-[1.8]">
            <section className="rounded-lg border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
              <strong className="font-semibold">0. Note.</strong> This is a
              placeholder page created for the first version of LookThis.One. A
              proper privacy policy will replace it before the public launch.
            </section>

            <section>
              <h2 className="font-syne text-dark mb-3 text-[18px] font-bold">
                1. Data we collect
              </h2>
              <p className="text-mid">
                We collect the email address you use to sign up, the profile
                information you enter (display name, bio, avatar, links), and
                anonymous usage data (page views and link clicks) when you
                consent to analytics. We do not sell your data.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-dark mb-3 text-[18px] font-bold">
                2. How we use it
              </h2>
              <p className="text-mid">
                Your data is used to operate the service: authenticating your
                account, displaying your public page, and showing you analytics
                in the dashboard. We may use your email address to send service
                updates. We use it for nothing else.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-dark mb-3 text-[18px] font-bold">
                3. Third-party services
              </h2>
              <p className="text-mid">
                We use Supabase for authentication and file storage, and Vercel
                for hosting. These providers process data on our behalf under
                their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-dark mb-3 text-[18px] font-bold">
                4. Cookies
              </h2>
              <p className="text-mid">We set two types of cookies:</p>
              <ul className="text-mid mt-3 list-disc space-y-2 pl-5">
                <li>
                  <span className="text-dark font-semibold">
                    Session cookie
                  </span>{' '}
                  — keeps you logged in. Set when you sign in and cleared when
                  you sign out. Required for the service to function.
                </li>
                <li>
                  <span className="text-dark font-semibold">
                    Analytics consent cookie
                  </span>{' '}
                  (<span className="font-mono text-xs">lto_consent</span>) —
                  records your accept/reject choice for anonymous analytics.
                  Lasts 12 months. No analytics data is collected until you
                  accept. You can change your choice by clearing your cookies.
                </li>
              </ul>
              <p className="text-mid mt-3">
                No advertising or third-party tracking cookies are set.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-dark mb-3 text-[18px] font-bold">
                5. Your rights
              </h2>
              <p className="text-mid">
                You can delete your account at any time from account settings.
                This permanently removes your profile, links, and all associated
                analytics data. You may also request a copy of your data by
                emailing us.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-dark mb-3 text-[18px] font-bold">
                6. Contact
              </h2>
              <p className="text-mid">
                Privacy questions:{' '}
                <a
                  href="mailto:hola@lookthis.one"
                  className="text-brand hover:underline"
                >
                  hola@lookthis.one
                </a>
                .
              </p>
            </section>
          </div>

          <Link
            href="/"
            className="font-jakarta text-brand mt-12 inline-block text-sm hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
