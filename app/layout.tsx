import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'CineInsight - AI Movie Analysis',
  description:
    'Enter any IMDb ID to get AI-powered audience sentiment analysis, cast information, and detailed movie insights.',
  keywords: ['movie', 'AI', 'sentiment analysis', 'IMDb', 'reviews', 'cinema'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans bg-gray-950 text-gray-50 antialiased min-h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
