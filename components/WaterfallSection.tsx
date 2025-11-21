'use client';

import WaterfallParallax from './WaterfallParallax';

export default function WaterfallSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center" style={{ zIndex: 10 }}>
      <div className="w-full">
        <WaterfallParallax
          id="waterfall-section"
          scrollHeight="150vh"
        />
      </div>
    </section>
  );
}

