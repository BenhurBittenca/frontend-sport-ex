import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SportEx - Encontre sua próxima linha de chegada',
  description: 'Todas as provas, todas as modalidades, em um só lugar. Descubra, planeje e viva o esporte com o SportEx. Encontre corridas incríveis na sua região!',
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


