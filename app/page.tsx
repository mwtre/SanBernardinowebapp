import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Sustainability from '@/components/Sustainability';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MountainSignSection from '@/components/MountainSignSection';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Home() {
  return (
    <main className="min-h-screen relative z-10">
      <Navigation />
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <MountainSignSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <Products />
      </ErrorBoundary>
      <Sustainability />
      <Footer />
    </main>
  );
}

