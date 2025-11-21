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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Eleganza Sostenibile
            </h2>
            <p className="text-xl text-white leading-relaxed mb-8 drop-shadow-md">
              Fin dall'inizio abbiamo scelto di allontanarci dalla plastica, abbracciando materiali
              che rispettano l'ambiente e la purezza del nostro prodotto. Il vetro e l'alluminio sono
              l'espressione tangibile dei nostri valori: trasparenza, leggerezza, riutilizzabilità sostenibile.
            </p>
            <p className="text-lg text-white mb-8 drop-shadow-sm">
              Ora, con la tecnologia Web3, puoi certificare la sostenibilità della tua bottiglia
              come NFT immutabile sulla blockchain, garantendo autenticità e tracciabilità.
            </p>
            <Link
              href="/sustainability"
              className="inline-block px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition shadow-lg"
            >
              Scopri di più sulla Sostenibilità
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

