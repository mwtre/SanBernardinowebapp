import Navigation from '@/components/Navigation';
import MintInterface from '@/components/MintInterface';
import Footer from '@/components/Footer';

export default function MintPage() {
  return (
    <main className="min-h-screen relative z-10">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-white drop-shadow-lg">
            Certifica la tua Bottiglia
          </h1>
          <p className="text-center text-white mb-12 drop-shadow-md">
            Converti l'etichetta della tua bottiglia Fonti San Bernardino in un NFT certificato
          </p>
          <MintInterface />
        </div>
      </div>
      <Footer />
    </main>
  );
}

