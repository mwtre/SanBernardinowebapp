'use client';

import MountainSignParallax from './MountainSignParallax';
import { motion } from 'framer-motion';

export default function MountainSignSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ 
        zIndex: 5,
        position: 'relative',
        marginBottom: '60px'
      }}
    >
      {/* Parallax Background */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <div className="relative w-full" style={{ height: '200vh', position: 'relative' }}>
          <MountainSignParallax
            id="mountain-sign-parallax"
            scrollHeight="200vh"
            text=""
            showArrow={false}
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="container mx-auto px-4 relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center w-full max-w-4xl"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-black mb-4 md:mb-6 px-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Sustainable
            <br />
            <span className="text-black">Elegance</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black mb-6 md:mb-8 max-w-3xl mx-auto px-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            From the beginning, we chose to eliminate plastic, adopting materials that respect the environment while reflecting our product's purity. The glass bottle and aluminum cap embody our values: transparency, lightness, and recyclability.
            <br />
            <br />
            Every cap is made from 100% recycled aluminum, including the tamper-proof seal—completely plastic-free.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

