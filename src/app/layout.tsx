import type { Metadata } from 'next';
import { Geist, Geist_Mono, Syne, Plus_Jakarta_Sans } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import './globals.css';

import { ConsentBanner } from '@/components/ConsentBanner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const syne = Syne({
  variable: '--font-syne-var',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta-var',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'LookThis.One — Tu link. Tu marca. Tu mundo.',
    template: '%s · LookThis.One',
  },
  description: 'Tu link-in-bio personal. Una página, todo lo que tienes.',
  metadataBase: new URL('https://lookthis.one'),
  openGraph: {
    title: 'LookThis.One — Tu link. Tu marca. Tu mundo.',
    description: 'Tu link. Tu marca. Tu mundo.',
    url: 'https://lookthis.one',
    siteName: 'LookThis.One',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LookThis.One — Tu link. Tu marca. Tu mundo.',
    description: 'Tu link. Tu marca. Tu mundo.',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          {children}
          <ConsentBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
