import { auth } from '@/auth';
import SessionProvider from '@/components/SessionProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Veículos EPTA',
  description: 'Veiculos Dashboard',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="pt-BR">
      <SessionProvider session={session}>
        <body className={`${interSans.variable} antialiased`}>{children}</body>
      </SessionProvider>
    </html>
  );
}
