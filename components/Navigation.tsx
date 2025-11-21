'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent backdrop-blur-md shadow-sm sticky top-0 z-50 relative border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-white drop-shadow-lg">
            Fonti San Bernardino
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-white/80 transition drop-shadow-md">
              Home
            </Link>
            <Link href="/mint" className="text-white hover:text-white/80 transition drop-shadow-md">
              Certifica Bottiglia
            </Link>
            <Link href="/about" className="text-white hover:text-white/80 transition drop-shadow-md">
              La Fonte
            </Link>
            <Link href="/sustainability" className="text-white hover:text-white/80 transition drop-shadow-md">
              Sostenibilità
            </Link>
            <ConnectButton />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none drop-shadow-md"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/" className="block text-white hover:text-white/80 drop-shadow-md">
              Home
            </Link>
            <Link href="/mint" className="block text-white hover:text-white/80 drop-shadow-md">
              Certifica Bottiglia
            </Link>
            <Link href="/about" className="block text-white hover:text-white/80 drop-shadow-md">
              La Fonte
            </Link>
            <Link href="/sustainability" className="block text-white hover:text-white/80 drop-shadow-md">
              Sostenibilità
            </Link>
            <div className="pt-4">
              <ConnectButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

