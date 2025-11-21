'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

interface ParallaxLayer {
  className: string;
  imageUrl: string;
  fromY: number;
  toY: number;
}

interface ParallaxBackgroundProps {
  /**
   * Unique ID for the scroll trigger (required for multiple instances)
   */
  id?: string;
  /**
   * Height of the scroll distance element (controls scroll range)
   */
  scrollHeight?: string;
  /**
   * Sky image URL
   */
  skyImage?: string;
  /**
   * Background mountain image URL
   */
  mountBgImage?: string;
  /**
   * Middle mountain image URL
   */
  mountMgImage?: string;
  /**
   * Foreground mountain image URL
   */
  mountFgImage?: string;
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
   * Custom parallax layers configuration
   */
  layers?: ParallaxLayer[];
  /**
   * Custom scroll trigger start/end
   */
  scrollStart?: string;
  scrollEnd?: string;
}

export default function ParallaxBackground({
  id = 'parallax',
  scrollHeight = '200vh',
  skyImage = 'https://assets.codepen.io/721952/sky.jpg',
  mountBgImage = 'https://assets.codepen.io/721952/mountBg.png',
  mountMgImage = 'https://assets.codepen.io/721952/mountMg.png',
  mountFgImage = 'https://assets.codepen.io/721952/mountFg.png',
  cloud1Image = 'https://assets.codepen.io/721952/cloud1.png',
  cloud2Image = 'https://assets.codepen.io/721952/cloud2.png',
  cloud3Image = 'https://assets.codepen.io/721952/cloud3.png',
  text = 'EXPLORE',
  maskedText = '',
  showArrow = true,
  viewBox = '0 0 1200 800',
  layers,
  scrollStart = '0 0',
  scrollEnd = '100% 100%',
}: ParallaxBackgroundProps) {
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

    // Detect mobile device for performance optimization
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // On mobile, use simpler animation with less layers
    if (isMobile) {
      // Simplified mobile parallax using CSS transforms
      const handleScroll = () => {
        try {
          const rect = scrollDist.getBoundingClientRect();
          const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)));
          
          const svg = svgRef.current;
          if (!svg) return;
          
          const sky = svg.querySelector('.sky') as SVGImageElement;
          const cloud1 = svg.querySelector('.cloud1') as SVGImageElement;
          const cloud2 = svg.querySelector('.cloud2') as SVGImageElement;
          const cloud3 = svg.querySelector('.cloud3') as SVGImageElement;
          const mountBg = svg.querySelector('.mountBg') as SVGImageElement;
          const mountFg = svg.querySelector('.mountFg') as SVGImageElement;
          
          if (sky) sky.style.transform = `translateY(${-scrollProgress * 100}px)`;
          if (cloud1) cloud1.style.transform = `translateY(${-scrollProgress * 400}px)`;
          if (cloud2) cloud2.style.transform = `translateY(${-scrollProgress * 250}px)`;
          if (cloud3) cloud3.style.transform = `translateY(${-scrollProgress * 325}px)`;
          if (mountBg) mountBg.style.transform = `translateY(${-scrollProgress * 50}px)`;
          if (mountFg) mountFg.style.transform = `translateY(${-scrollProgress * 200}px)`;
        } catch (error) {
          console.error('Parallax scroll error:', error);
        }
      };
      
      // Throttle scroll events for better performance
      let ticking = false;
      const throttledScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
      
      window.addEventListener('scroll', throttledScroll, { passive: true });
      handleScroll(); // Initial call
      
      return () => {
        window.removeEventListener('scroll', throttledScroll);
      };
    }

    // Desktop: Use GSAP for smooth parallax
    // Create GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollDist,
        start: scrollStart,
        end: scrollEnd,
        scrub: 0.5, // Smoother on desktop
        invalidateOnRefresh: true,
        refreshPriority: -1,
        anticipatePin: 1,
        markers: false, // Disable debug markers
      },
    });

    // Default parallax animations
    if (!layers) {
      // Use SVG-specific selectors to ensure clouds are found
      const svg = svgRef.current;
      if (svg) {
        const cloud1El = svg.querySelector('.cloud1');
        const cloud2El = svg.querySelector('.cloud2');
        const cloud3El = svg.querySelector('.cloud3');
        const skyEl = svg.querySelector('.sky');
        const mountBgEl = svg.querySelector('.mountBg');
        const mountMgEl = svg.querySelector('.mountMg');
        const mountFgEl = svg.querySelector('.mountFg');
        
        if (skyEl) tl.fromTo(skyEl, { y: 0 }, { y: -200 }, 0);
        if (cloud1El) tl.fromTo(cloud1El, { y: 100 }, { y: -800 }, 0);
        if (cloud2El) tl.fromTo(cloud2El, { y: -150 }, { y: -500 }, 0);
        if (cloud3El) tl.fromTo(cloud3El, { y: -50 }, { y: -650 }, 0);
        if (mountBgEl) tl.fromTo(mountBgEl, { y: -10 }, { y: -100 }, 0);
        if (mountMgEl) tl.fromTo(mountMgEl, { y: -30 }, { y: -250 }, 0);
        if (mountFgEl) tl.fromTo(mountFgEl, { y: -50 }, { y: -600 }, 0);
      } else {
        // Fallback to class selectors if SVG not ready
        tl.fromTo('.sky', { y: 0 }, { y: -200 }, 0)
          .fromTo('.cloud1', { y: 100 }, { y: -800 }, 0)
          .fromTo('.cloud2', { y: -150 }, { y: -500 }, 0)
          .fromTo('.cloud3', { y: -50 }, { y: -650 }, 0)
          .fromTo('.mountBg', { y: -10 }, { y: -100 }, 0)
          .fromTo('.mountMg', { y: -30 }, { y: -250 }, 0)
          .fromTo('.mountFg', { y: -50 }, { y: -600 }, 0);
      }
    } else {
      // Custom layers configuration
      layers.forEach((layer) => {
        tl.fromTo(
          `.${layer.className}`,
          { y: layer.fromY },
          { y: layer.toY },
          0
        );
      });
    }

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
  }, [scrollStart, scrollEnd, layers, showArrow]);

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
            href={skyImage}
            width="1200"
            height="590"
            preserveAspectRatio="xMidYMid slice"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          />

          {/* Mountain layers */}
          <image
            className="mountBg"
            href={mountBgImage}
            width="1200"
            height="800"
            preserveAspectRatio="xMidYMid slice"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          />
          <image
            className="mountMg"
            href={mountMgImage}
            width="1200"
            height="800"
            preserveAspectRatio="xMidYMid slice"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          />

          {/* Cloud layers */}
          <image
            className="cloud2"
            href={cloud2Image}
            width="1200"
            height="800"
            preserveAspectRatio="xMidYMid slice"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          />
          <image
            className="mountFg"
            href={mountFgImage}
            width="1200"
            height="800"
            preserveAspectRatio="xMidYMid slice"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          />
          <image
            className="cloud1"
            href={cloud1Image}
            width="1200"
            height="800"
            preserveAspectRatio="xMidYMid slice"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          />
          <image
            className="cloud3"
            href={cloud3Image}
            width="1200"
            height="800"
            preserveAspectRatio="xMidYMid slice"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
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
                y="650" 
                fill="#162a43" 
                fontSize="28" 
                fontWeight="bold"
                textAnchor="middle"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                {maskedText.split('. ').map((line, i, arr) => {
                  const isLast = i === arr.length - 1;
                  const displayLine = isLast ? line : line + '.';
                  return (
                    <tspan key={i} x="600" dy={i === 0 ? "0" : "40"}>
                      {displayLine}
                    </tspan>
                  );
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

