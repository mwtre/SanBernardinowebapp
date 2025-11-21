import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import RippleBackground from '@/components/RippleBackground';
import BubblesBackground from '@/components/BubblesBackground';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Fonti San Bernardino - Web3 Certification',
  description: 'Mint NFT certifications for your Fonti San Bernardino bottle labels',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={`${inter.className} ${playfair.variable}`}>
        <RippleBackground />
        <BubblesBackground />
        <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}

