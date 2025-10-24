import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SportEx - Sua plataforma definitiva para corridas de rua',
  description: '🏃‍♂️ Descubra corridas incríveis na sua região! Detectamos onde você está e mostramos os melhores eventos próximos a você. Encontre sua próxima conquista!',
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


