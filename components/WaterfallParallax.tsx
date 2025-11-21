'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface WaterfallParallaxProps {
  /**
   * Unique ID for the scroll trigger (required for multiple instances)
   */
  id?: string;
  /**
   * Height of the scroll distance element (controls scroll range)
   */
  scrollHeight?: string;
  /**
   * Background waterfall image URL
   */
  waterfallImage?: string;
  /**
   * Waterfall loop animation image URL
   */
  waterfallLoopImage?: string;
  /**
   * Waterfall mask image URL
   */
  waterfallMaskImage?: string;
  /**
   * Cloud images
   */
  cloud1Image?: string;
  cloud2Image?: string;
  cloud3Image?: string;
  /**
   * Custom scroll trigger start/end
   */
  scrollStart?: string;
  scrollEnd?: string;
}

export default function WaterfallParallax({
  id = 'waterfall',
  scrollHeight = '200vh',
  waterfallImage = 'https://cdr2.com/waterfall/waterfall.jpg',
  waterfallLoopImage = 'https://cdr2.com/waterfall/waterfall-loop.png',
  waterfallMaskImage = 'https://cdr2.com/waterfall/waterfall-mask.png',
  cloud1Image = 'https://assets.codepen.io/721952/cloud1.png',
  cloud2Image = 'https://assets.codepen.io/721952/cloud2.png',
  cloud3Image = 'https://assets.codepen.io/721952/cloud3.png',
  scrollStart = '0 0',
  scrollEnd = '100% 100%',
}: WaterfallParallaxProps) {
  const scrollDistRef = useRef<HTMLDivElement>(null);
  const waterfallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scrollDist = scrollDistRef.current;
    const waterfall = waterfallRef.current;
    if (!scrollDist || !waterfall) return;

    // Create GSAP timeline with ScrollTrigger for parallax effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollDist,
        start: scrollStart,
        end: scrollEnd,
        scrub: 1,
      },
    });

    // Parallax effect on waterfall container
    tl.fromTo(waterfall, { y: 0 }, { y: -200 }, 0);

    // Parallax for cloud layers - inside waterfall container
    const cloud1 = waterfall.querySelector('.cloud1');
    const cloud2 = waterfall.querySelector('.cloud2');
    const cloud3 = waterfall.querySelector('.cloud3');
    
    if (cloud1) tl.fromTo(cloud1, { y: 100 }, { y: -800 }, 0);
    if (cloud2) tl.fromTo(cloud2, { y: -150 }, { y: -500 }, 0);
    if (cloud3) tl.fromTo(cloud3, { y: -50 }, { y: -650 }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === scrollDist) {
          trigger.kill();
        }
      });
    };
  }, [scrollStart, scrollEnd, id]);

  return (
    <div className="relative w-full" style={{ position: 'relative', zIndex: 0 }}>
      {/* Scroll distance element - controls the scroll range */}
      <div
        ref={scrollDistRef}
        className="scrollDist"
        style={{ height: scrollHeight }}
      />

      {/* Waterfall Container - exact structure from provided code, but full width */}
      <div
        ref={waterfallRef}
        className="waterfall relative w-full"
        style={{
          height: '801px',
          backgroundSize: 'contain',
          backgroundImage: `url(${waterfallImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        {/* Cloud layers - inside waterfall, positioned at top and bottom */}
        <div
          className="cloud1 absolute w-full"
          style={{
            top: '-200px',
            height: '400px',
            background: `url(${cloud1Image}) center/cover no-repeat`,
            pointerEvents: 'none',
          }}
        />
        <div
          className="cloud2 absolute w-full"
          style={{
            top: '-100px',
            height: '300px',
            background: `url(${cloud2Image}) center/cover no-repeat`,
            pointerEvents: 'none',
          }}
        />
        <div
          className="cloud3 absolute w-full"
          style={{
            bottom: '-150px',
            height: '350px',
            background: `url(${cloud3Image}) center/cover no-repeat`,
            pointerEvents: 'none',
          }}
        />

        {/* The waterfall loop animation - exact positioning from code */}
        <div
          className="waterfall-loop absolute"
          style={{
            left: '38.23%', // 367/960 * 100 (responsive)
            top: '87px',
            width: '23.02%', // 221/960 * 100 (responsive)
            height: '620px',
            background: `url(${waterfallLoopImage}) 0 0 repeat-y`,
            animation: 'waterfallloop 5s infinite linear',
          }}
        />

        {/* The mask overlay to soften borders - exact structure from code */}
        <div
          className="waterfall-mask absolute"
          style={{
            width: '100%',
            height: '801px',
            background: `url(${waterfallMaskImage}) 38.23% 87px no-repeat`,
            backgroundSize: 'contain',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}
