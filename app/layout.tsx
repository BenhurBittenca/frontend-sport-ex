import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SportEx - Encontre sua próxima linha de chegada',
  description: 'Todas as provas, todas as modalidades, em um só lugar. Descubra, planeje e viva o esporte com o SportEx. Encontre corridas incríveis na sua região!',
  icons: {
    icon: '/images/sportex-logo.png',
    shortcut: '/images/sportex-logo.png',
    apple: '/images/sportex-logo.png',
  },
  openGraph: {
    title: 'SportEx - Encontre sua próxima linha de chegada',
    description: 'Todas as provas, todas as modalidades, em um só lugar. Descubra, planeje e viva o esporte com o SportEx.',
    url: 'https://sportex.com.br',
    siteName: 'SportEx',
    images: [
      {
        url: '/images/sportex-logo.png',
        width: 1024,
        height: 1024,
        alt: 'SportEx - Eventos Esportivos',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'SportEx - Encontre sua próxima linha de chegada',
    description: 'Todas as provas, todas as modalidades, em um só lugar.',
    images: ['/images/sportex-logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
