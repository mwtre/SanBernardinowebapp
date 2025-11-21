'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

interface MountainSignParallaxProps {
  /**
   * Unique ID for the scroll trigger (required for multiple instances)
   */
  id?: string;
  /**
   * Height of the scroll distance element (controls scroll range)
   */
  scrollHeight?: string;
  /**
   * Mountain sign image URL
   */
  mountainSignImage?: string;
  /**
   * Cloud images
   */
  cloud1Image?: string;
  cloud2Image?: string;
  cloud3Image?: string;
  /**
   * Text to display
   */
  text?: string;
  /**
   * Text to display in masked area (below)
   */
  maskedText?: string;
  /**
   * Show arrow button
   */
  showArrow?: boolean;
  /**
   * Custom SVG viewBox (default: "0 0 1200 800")
   */
  viewBox?: string;
  /**
   * Custom scroll trigger start/end
   */
  scrollStart?: string;
  scrollEnd?: string;
}

export default function MountainSignParallax({
  id = 'mountain-sign',
  scrollHeight = '200vh',
  mountainSignImage = '/SanBernardinowebapp/models/sing of the moutain .jpg',
  cloud1Image = 'https://assets.codepen.io/721952/cloud1.png',
  cloud2Image = 'https://assets.codepen.io/721952/cloud2.png',
  cloud3Image = 'https://assets.codepen.io/721952/cloud3.png',
  text = 'EXPLORE',
  maskedText = '',
  showArrow = true,
  viewBox = '0 0 1200 800',
  scrollStart = '0 0',
  scrollEnd = '100% 100%',
}: MountainSignParallaxProps) {
  const scrollDistRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const arrowBtnRef = useRef<SVGRectElement>(null);
  const arrowRef = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scrollDist = scrollDistRef.current;
    const arrowBtn = arrowBtnRef.current;
    const arrow = arrowRef.current;

    if (!scrollDist) return;

    // Create GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollDist,
        start: scrollStart,
        end: scrollEnd,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Parallax animations - using mountain sign as background, middle, and foreground layers
    tl.fromTo(
      '.sky',
      { y: 0 },
      { y: -200 },
      0
    )
      .fromTo('.cloud1', { y: 100 }, { y: -800 }, 0)
      .fromTo('.cloud2', { y: -150 }, { y: -500 }, 0)
      .fromTo('.cloud3', { y: -50 }, { y: -650 }, 0)
      .fromTo('.mountainBg', { y: -10 }, { y: -100 }, 0)
      .fromTo('.mountainMg', { y: -30 }, { y: -250 }, 0)
      .fromTo('.mountainFg', { y: -50 }, { y: -600 }, 0);

    // Arrow button interactions
    if (arrowBtn && arrow && showArrow) {
      const handleMouseEnter = () => {
        gsap.to(arrow, {
          y: 10,
          duration: 0.8,
          ease: 'back.inOut(3)',
          overwrite: 'auto',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(arrow, {
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };

      const handleClick = () => {
        gsap.to(window, {
          scrollTo: window.innerHeight,
          duration: 1.5,
          ease: 'power1.inOut',
        });
      };

      arrowBtn.addEventListener('mouseenter', handleMouseEnter);
      arrowBtn.addEventListener('mouseleave', handleMouseLeave);
      arrowBtn.addEventListener('click', handleClick);

      return () => {
        arrowBtn.removeEventListener('mouseenter', handleMouseEnter);
        arrowBtn.removeEventListener('mouseleave', handleMouseLeave);
        arrowBtn.removeEventListener('click', handleClick);
        tl.kill();
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === scrollDist) {
            trigger.kill();
          }
        });
      };
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === scrollDist) {
          trigger.kill();
        }
      });
    };
  }, [scrollStart, scrollEnd, showArrow]);

  return (
    <div className="relative w-full" style={{ position: 'relative', zIndex: 0 }}>
      {/* Scroll distance element - controls the scroll range */}
      <div
        ref={scrollDistRef}
        className="scrollDist"
        style={{ height: scrollHeight, position: 'relative', width: '100%' }}
      />

      {/* Parallax SVG */}
      <main
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <svg
          ref={svgRef}
          viewBox={viewBox}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          {/* Mask for cloud effect */}
          <mask id={`m-${id}`}>
            <g className="cloud1">
              <rect fill="#fff" width="100%" height="801" y="799" />
              <image
                href={cloud1Image}
                width="1200"
                height="800"
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
          </mask>

          {/* Sky layer */}
          <image
            className="sky"
            href={mountainSignImage}
            width="1200"
            height="590"
            preserveAspectRatio="xMidYMid slice"
          />

          {/* Mountain sign layers - using the same image for depth effect */}
          <image
            className="mountainBg"
            href={mountainSignImage}
            width="1200"
            height="800"
            preserveAspectRatio="xMidYMid slice"
          />
          <image
            className="mountainMg"
            href={mountainSignImage}
            width="1200"
            height="800"
            preserveAspectRatio="xMidYMid slice"
          />

          {/* Cloud layers */}
          <image
            className="cloud2"
            href={cloud2Image}
            width="1200"
            height="800"
            preserveAspectRatio="xMidYMid slice"
          />
          <image
            className="mountainFg"
            href={mountainSignImage}
            width="1200"
            height="800"
            preserveAspectRatio="xMidYMid slice"
          />
          <image
            className="cloud1"
            href={cloud1Image}
            width="1200"
            height="800"
            preserveAspectRatio="xMidYMid slice"
          />
          <image
            className="cloud3"
            href={cloud3Image}
            width="1200"
            height="800"
            preserveAspectRatio="xMidYMid slice"
          />

          {/* Text */}
          <text fill="#fff" x="350" y="200" fontSize="48" fontWeight="bold">
            {text}
          </text>

          {/* Arrow */}
          {showArrow && (
            <polyline
              ref={arrowRef}
              className="arrow"
              fill="#fff"
              points="599,250 599,289 590,279 590,282 600,292 610,282 610,279 601,289 601,250"
            />
          )}

          {/* Masked text effect */}
          <g mask={`url(#m-${id})`}>
            <rect fill="#fff" width="100%" height="100%" />
            {maskedText && (
              <text 
                x="600" 
                y="250" 
                fill="#162a43" 
                fontSize="24" 
                fontWeight="bold"
                textAnchor="middle"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                {maskedText.split('\n\n').map((paragraph, pIdx) => {
                  const lines = paragraph.split('. ').filter(l => l.trim());
                  return lines.map((line, lIdx) => {
                    const globalIdx = pIdx * 20 + lIdx;
                    return (
                      <tspan 
                        key={globalIdx} 
                        x="600" 
                        dy={globalIdx === 0 ? "0" : lIdx === 0 ? "40" : "30"}
                        fontSize="24"
                        fontWeight="bold"
                      >
                        {line.trim()}{!line.trim().endsWith('.') && line.trim() !== '' ? '.' : ''}
                      </tspan>
                    );
                  });
                })}
              </text>
            )}
          </g>

          {/* Arrow button (invisible clickable area) */}
          {showArrow && (
            <rect
              ref={arrowBtnRef}
              id={`arrow-btn-${id}`}
              width="100"
              height="100"
              opacity="0"
              x="550"
              y="220"
              style={{ cursor: 'pointer' }}
            />
          )}
        </svg>
      </main>
    </div>
  );
}

