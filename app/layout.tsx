import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const syne = localFont({
  src: './fonts/syne-local.ttf',
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = localFont({
  src: './fonts/dm-sans-local.ttf',
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: './fonts/jetbrains-mono-local.ttf',
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Oscar Scardubu — Staff Full-Stack ML Engineer',
  description:
    'Building production AI and fintech systems. Open to Staff+ roles, co-founder partnerships, and ML consulting.',
  metadataBase: new URL('https://www.scardubu.dev'),
  openGraph: {
    type: 'website',
    url: 'https://www.scardubu.dev',
    title: 'Oscar Scardubu — Staff Full-Stack ML Engineer',
    description:
      'Building production AI and fintech systems. Open to Staff+ roles, co-founder partnerships, and ML consulting.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Oscar Scardubu portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
