import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service — LookThis.One',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-off-white min-h-screen px-7 pt-[108px] pb-20">
        <div className="mx-auto max-w-2xl">
          <h1
            className="font-syne text-dark mb-2 font-extrabold tracking-[-1px]"
            style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}
          >
            Terms of Service
          </h1>
          <p className="font-jakarta text-mid mb-10 text-sm">
            Last updated: April 2026
          </p>

          <div className="font-jakarta space-y-8 text-[15px] leading-[1.8]">
            <section className="rounded-lg border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
              <strong className="font-semibold">0. Note.</strong> This is a
              placeholder page created for the first version of LookThis.One. A
              proper terms of service will replace it before the public launch.
            </section>

            <section>
              <h2 className="font-syne text-dark mb-3 text-[18px] font-bold">
                1. Acceptance
              </h2>
              <p className="text-mid">
                By creating an account or using LookThisOne you agree to these
                terms. If you do not agree, do not use the service.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-dark mb-3 text-[18px] font-bold">
                2. Beta notice
              </h2>
              <p className="text-mid">
                LookThisOne is currently in beta. The service is provided as-is.
                Account data may be reset before the general release. We will
                provide advance notice where possible.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-dark mb-3 text-[18px] font-bold">
                3. Your content
              </h2>
              <p className="text-mid">
                You retain ownership of the content you publish. By publishing
                it you grant us a licence to display it on the platform. You are
                responsible for ensuring your content does not infringe
                third-party rights or applicable law.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-dark mb-3 text-[18px] font-bold">
                4. Prohibited use
              </h2>
              <p className="text-mid">
                You may not use LookThisOne to distribute spam, malware, or
                content that is illegal in your jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-dark mb-3 text-[18px] font-bold">
                5. Limitation of liability
              </h2>
              <p className="text-mid">
                To the maximum extent permitted by law, LookThisOne is not
                liable for indirect, incidental, or consequential damages
                arising from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-dark mb-3 text-[18px] font-bold">
                6. Changes
              </h2>
              <p className="text-mid">
                We may update these terms from time to time. Continued use of
                the service after changes are posted constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-dark mb-3 text-[18px] font-bold">
                7. Contact
              </h2>
              <p className="text-mid">
                Questions? Reach us at{' '}
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
