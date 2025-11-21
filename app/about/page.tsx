import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen relative z-10">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white drop-shadow-lg">
            La Fonte
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-white mb-6 drop-shadow-md">
              Siamo più che acqua. Siamo la storia di una terra, la voce di un ecosistema incontaminato,
              il respiro delle Alpi svizzere.
            </p>
            
            <p className="text-white mb-6 drop-shadow-sm">
              Fonti San Bernardino nasce dalle sorgenti pure delle Alpi svizzere, dove l'acqua scorre
              attraverso rocce millenarie, acquisendo la sua unica composizione minerale. Ogni goccia
              racconta una storia di purezza, sostenibilità e rispetto per l'ambiente.
            </p>
            
            <h2 className="text-3xl font-bold text-white mt-12 mb-6 drop-shadow-lg">
              La Nostra Storia
            </h2>
            
            <p className="text-white mb-6 drop-shadow-sm">
              Fin dall'inizio, abbiamo scelto di allontanarci dalla plastica, abbracciando materiali
              che rispettano l'ambiente e la purezza del nostro prodotto. Il vetro e l'alluminio sono
              l'espressione tangibile dei nostri valori: trasparenza, leggerezza, riutilizzabilità sostenibile.
            </p>
            
            <h2 className="text-3xl font-bold text-white mt-12 mb-6 drop-shadow-lg">
              Certificazione Web3
            </h2>
            
            <p className="text-white mb-6 drop-shadow-sm">
              Con la tecnologia blockchain, ora puoi certificare l'autenticità della tua bottiglia Fonti
              San Bernardino come NFT. Ogni certificazione è unica, immutabile e tracciabile, garantendo
              la provenienza e l'autenticità del prodotto.
            </p>
            
            <div className="bg-transparent backdrop-blur-md rounded-lg p-6 mt-8 border border-white/20">
              <p className="text-white font-semibold drop-shadow-md">
                💧 Ogni bottiglia certificata contribuisce alla tracciabilità e alla sostenibilità della nostra catena di approvvigionamento.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

