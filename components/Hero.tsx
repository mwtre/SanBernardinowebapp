'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SanBernardino3D from './SanBernardino3D';
import ParallaxBackground from './ParallaxBackground';
import WaterSlider from './WaterSlider';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center z-10">
      {/* Parallax Background */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <ParallaxBackground
          id="hero-parallax"
          scrollHeight="150vh"
          text=""
          showArrow={false}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 mt-32 md:mt-40">
        <div className="flex flex-col items-center gap-0">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex items-center justify-center mb-0"
          >
            <SanBernardino3D />
          </motion.div>

          {/* Text Content - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center w-full max-w-4xl -mt-48"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Alpine by Origin
              <br />
              <span className="text-black">Pure by Nature</span>
            </h1>
            <p className="text-xl md:text-2xl text-black mb-8 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Three souls, one origin.
              <br />
              We are more than water. We are the story of a land, the voice of an uncontaminated ecosystem,
              the breath of the Swiss Alps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/mint"
                className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition shadow-lg hover:shadow-xl"
              >
                Certifica la tua Bottiglia
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition"
              >
                Scopri di più
              </Link>
            </div>
          </motion.div>

          {/* Water Slider */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full mt-16"
          >
            <WaterSlider />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

