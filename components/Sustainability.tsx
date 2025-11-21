'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Sustainability() {
  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg px-4">
              Eleganza Sostenibile
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed mb-6 md:mb-8 drop-shadow-md px-4">
              Fin dall'inizio abbiamo scelto di allontanarci dalla plastica, abbracciando materiali
              che rispettano l'ambiente e la purezza del nostro prodotto. Il vetro e l'alluminio sono
              l'espressione tangibile dei nostri valori: trasparenza, leggerezza, riutilizzabilità sostenibile.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white mb-6 md:mb-8 drop-shadow-sm px-4">
              Ora, con la tecnologia Web3, puoi certificare la sostenibilità della tua bottiglia
              come NFT immutabile sulla blockchain, garantendo autenticità e tracciabilità.
            </p>
            <Link
              href="/sustainability"
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-primary-600 text-white rounded-lg text-sm md:text-base font-semibold hover:bg-primary-700 transition shadow-lg"
            >
              Scopri di più sulla Sostenibilità
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

