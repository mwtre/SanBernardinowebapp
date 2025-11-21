import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-white py-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white drop-shadow-md">Fonti San Bernardino</h3>
            <p className="text-white drop-shadow-sm">
              Alpina per origine, pura per natura. Certificazione NFT per autenticità e sostenibilità.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white drop-shadow-md">Acque</h4>
            <ul className="space-y-2 text-white drop-shadow-sm">
              <li><Link href="/mint?type=still" className="hover:text-white transition">Pure Spring</Link></li>
              <li><Link href="/mint?type=sparkling" className="hover:text-white transition">Sparkling Crest</Link></li>
              <li><Link href="/mint?type=extra-sparkling" className="hover:text-white transition">Alpine Burst</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white drop-shadow-md">Informazioni</h4>
            <ul className="space-y-2 text-white drop-shadow-sm">
              <li><Link href="/about" className="hover:text-white transition">La Fonte</Link></li>
              <li><Link href="/sustainability" className="hover:text-white transition">Sostenibilità Attiva</Link></li>
              <li><Link href="/mint" className="hover:text-white transition">Certifica Bottiglia</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white drop-shadow-md">Contatti</h4>
            <ul className="space-y-2 text-white drop-shadow-sm">
              <li>info@fsb-sa.ch</li>
              <li>Svizzera</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white drop-shadow-sm">
          <p>© 2025 Fonti San Bernardino - Web3 Certification Platform</p>
        </div>
      </div>
    </footer>
  );
}

