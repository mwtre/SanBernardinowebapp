import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen relative z-10">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white drop-shadow-lg">
            Sostenibilità Attiva
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-white mb-6 drop-shadow-md">
              Eleganza Sostenibile: la nostra promessa per un futuro migliore.
            </p>
            
            <h2 className="text-3xl font-bold text-white mt-12 mb-6 drop-shadow-lg">
              Materiali Sostenibili
            </h2>
            
            <p className="text-white mb-6 drop-shadow-sm">
              Fin dall'inizio abbiamo scelto di allontanarci dalla plastica, abbracciando materiali
              che rispettano l'ambiente e la purezza del nostro prodotto. Il vetro e l'alluminio sono
              l'espressione tangibile dei nostri valori: trasparenza, leggerezza, riutilizzabilità sostenibile.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-transparent backdrop-blur-md rounded-lg p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">Vetro</h3>
                <p className="text-white drop-shadow-sm">
                  Riciclabile al 100%, mantiene la purezza dell'acqua senza alterarne il sapore.
                </p>
              </div>
              
              <div className="bg-transparent backdrop-blur-md rounded-lg p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">Alluminio</h3>
                <p className="text-white drop-shadow-sm">
                  Leggero, riciclabile all'infinito, perfetto per la sostenibilità.
                </p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mt-12 mb-6 drop-shadow-lg">
              Blockchain per la Tracciabilità
            </h2>
            
            <p className="text-white mb-6 drop-shadow-sm">
              La tecnologia Web3 ci permette di certificare ogni bottiglia sulla blockchain, creando
              un registro immutabile della sua provenienza e autenticità. Questo non solo garantisce
              la trasparenza, ma anche la tracciabilità completa del prodotto dalla fonte al consumatore.
            </p>
            
            <div className="bg-transparent backdrop-blur-md rounded-lg p-8 my-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
                Benefici della Certificazione NFT
              </h3>
              <ul className="space-y-3 text-white drop-shadow-sm">
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span>Autenticità garantita sulla blockchain</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span>Tracciabilità completa del prodotto</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span>Riduzione della contraffazione</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span>Supporto alla sostenibilità attraverso la trasparenza</span>
                </li>
              </ul>
            </div>
            
            <h2 className="text-3xl font-bold text-white mt-12 mb-6 drop-shadow-lg">
              Il Nostro Impegno
            </h2>
            
            <p className="text-white mb-6 drop-shadow-sm">
              Siamo impegnati a proteggere le sorgenti alpine che ci forniscono la nostra acqua pura.
              Ogni bottiglia certificata contribuisce a questo impegno, creando un sistema di tracciabilità
              che premia la sostenibilità e scoraggia pratiche dannose per l'ambiente.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

