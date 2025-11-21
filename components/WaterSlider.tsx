'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface WaterProduct {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  image: string;
  headerColor: string;
  headerGradient: string;
  borderColor: string;
  watermark: string;
}

const products: WaterProduct[] = [
  {
    id: 'pure-spring',
    name: 'Pure Spring',
    subtitle: 'Still water from the pristine Swiss Alps. Pure, natural, and refreshing.',
    category: 'Still Water',
    image: '/models/pure-spring.png',
    headerColor: '#808080',
    headerGradient: 'linear-gradient(#808080, #A0A0A0)',
    borderColor: '#808080',
    watermark: 'Pure',
  },
  {
    id: 'sparkling-crest',
    name: 'Sparkling Crest',
    subtitle: 'Sparkling water with natural bubbles. Crisp and invigorating.',
    category: 'Sparkling Water',
    image: '/models/sparkling-crest.png',
    headerColor: '#1a1a1a',
    headerGradient: 'linear-gradient(#1a1a1a, #2d2d2d)',
    borderColor: '#1a1a1a',
    watermark: 'Sparkling',
  },
  {
    id: 'alpine-burst',
    name: 'Alpine Burst',
    subtitle: 'Extra sparkling water with intense bubbles. Bold and refreshing.',
    category: 'Extra Sparkling',
    image: '/models/alpine-burst.png',
    headerColor: '#DC143C',
    headerGradient: 'linear-gradient(#DC143C, #FF6B6B)',
    borderColor: '#DC143C',
    watermark: 'Alpine',
  },
];

const BODY_BACKGROUNDS = ['#808080', '#1a1a1a', '#DC143C'];

export default function WaterSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ratioRef = useRef(0);
  const windowWidthRef = useRef(0);

  useEffect(() => {
    // Set body background color
    document.body.style.backgroundColor = BODY_BACKGROUNDS[currentIndex];
    document.body.style.transition = 'background-color 0.2s';
  }, [currentIndex]);

  const moveCard = (diff: number) => {
    const card = cardsRef.current[currentIndex];
    if (!card) return;

    // Remove transition during drag for smooth following
    card.style.transition = 'none';
    card.style.transform = `translateX(calc(${diff}px - 50%))`;
    moveCardEls(-diff, currentIndex);
  };

  const moveCardEls = (diff: number, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const ratio = ratioRef.current;
    const elements = card.querySelectorAll('.card__will-animate');

    elements.forEach((el, i) => {
      const multipliers = [1, 1, 0.9, 0.85, 0.35, 0.85, 0.65];
      const multiplier = multipliers[i] || 1;
      const isImage = el.classList.contains('card__image');
      const baseTransform = isImage ? 'rotate(-8deg) scale(1.5) ' : '';
      (el as HTMLElement).style.transform = `${baseTransform}translateX(${diff / (ratio * multiplier)}px)`;
    });
  };

  const resetCardElsPosition = () => {
    const card = cardsRef.current[currentIndex];
    if (!card) return;

    const elements = card.querySelectorAll('.card__will-animate');
    elements.forEach((el) => {
      (el as HTMLElement).style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      const isImage = el.classList.contains('card__image');
      (el as HTMLElement).style.transform = isImage ? 'rotate(-8deg) scale(1.5)' : '';
    });

    setTimeout(() => {
      card.style.transition = '';
      elements.forEach((el) => {
        (el as HTMLElement).style.transition = '';
      });
    }, 500);
  };

  const cancelMoveCard = () => {
    const card = cardsRef.current[currentIndex];
    if (!card) return;

    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    card.style.transform = 'translateX(-50%)';
    resetCardElsPosition();
  };

  const slideLeft = () => {
    if (currentIndex === products.length - 1) {
      cancelMoveCard();
      return;
    }

    const card = cardsRef.current[currentIndex];
    if (!card) return;

    const newIndex = currentIndex + 1;
    
    // Animate current card out
    card.style.transition = 'left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    card.style.left = '-50%';
    
    // Reset elements immediately
    resetCardElsPosition();
    
    // Update index
    setCurrentIndex(newIndex);

    // Animate new card in
    requestAnimationFrame(() => {
      const newCard = cardsRef.current[newIndex];
      if (newCard) {
        newCard.style.transition = 'left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        newCard.style.left = '50%';
        newCard.style.transform = 'translateX(-50%)';
        
        // Reset elements after transition
        setTimeout(() => {
          resetCardElsPosition();
        }, 500);
      }
    });
  };

  const slideRight = () => {
    if (currentIndex === 0) {
      cancelMoveCard();
      return;
    }

    const card = cardsRef.current[currentIndex];
    if (!card) return;

    const newIndex = currentIndex - 1;
    
    // Animate current card out
    card.style.transition = 'left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    card.style.left = '150%';
    
    // Reset elements immediately
    resetCardElsPosition();
    
    // Update index
    setCurrentIndex(newIndex);

    // Animate new card in
    requestAnimationFrame(() => {
      const newCard = cardsRef.current[newIndex];
      if (newCard) {
        newCard.style.transition = 'left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        newCard.style.left = '50%';
        newCard.style.transform = 'translateX(-50%)';
        
        // Reset elements after transition
        setTimeout(() => {
          resetCardElsPosition();
        }, 500);
      }
    });
  };

  const onStart = (e: MouseEvent | TouchEvent) => {
    setIsDragging(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : (e as MouseEvent).pageX;
    setCurrentX(pageX);
    setStartX(pageX);

    const card = cardsRef.current[currentIndex];
    if (card) {
      windowWidthRef.current = window.innerWidth;
      const cardWidth = card.offsetWidth;
      ratioRef.current = windowWidthRef.current / (cardWidth / 4);
    }
  };

  const onMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    e.preventDefault(); // Prevent default scrolling
    
    const pageX = 'touches' in e ? e.touches[0].pageX : (e as MouseEvent).pageX;
    setCurrentX(pageX);

    let diff = startX - pageX;
    diff *= -1;

    const maxDiff = windowWidthRef.current / 3;
    if (Math.abs(diff) > maxDiff) {
      diff = diff > 0 ? maxDiff : -maxDiff;
    }

    moveCard(diff);
  };

  const onEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = startX - currentX;
    const direction = diff > 0 ? 'left' : 'right';

    if (Math.abs(diff) > windowWidthRef.current / 4) {
      if (direction === 'left') {
        slideLeft();
      } else {
        slideRight();
      }
    } else {
      cancelMoveCard();
    }

    setStartX(0);
  };


  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (wrapperRef.current?.contains(e.target as Node)) {
        onStart(e);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        onMove(e);
      }
    };
    const handleTouchEnd = () => {
      if (isDragging) {
        onEnd();
      }
    };
    const handleMouseDown = (e: MouseEvent) => {
      if (wrapperRef.current?.contains(e.target as Node)) {
        onStart(e);
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onMove(e);
      }
    };
    const handleMouseUp = () => {
      if (isDragging) {
        onEnd();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, startX, currentX, currentIndex]);

  return (
    <div className="relative overflow-x-hidden w-full h-full min-h-[600px]">
      {/* Swipe to Discover Indicator */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-3 text-white text-base md:text-lg font-medium drop-shadow-lg">
        <svg 
          className="w-6 h-6 md:w-7 md:h-7 animate-pulse" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          style={{ 
            strokeWidth: 2.5,
            animation: 'slide-left 1.5s ease-in-out infinite'
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="tracking-wide">Swipe to discover</span>
        <svg 
          className="w-6 h-6 md:w-7 md:h-7 animate-pulse" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          style={{ 
            strokeWidth: 2.5,
            animation: 'slide-right 1.5s ease-in-out infinite'
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
      
      <div ref={wrapperRef} className="relative w-full h-full">
        {products.map((product, index) => (
          <div
            key={product.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className={`card absolute top-6 mx-auto w-[380px] bg-white rounded-[15px] select-none overflow-visible ${
              index === currentIndex 
                ? 'shadow-[0_40px_60px_rgba(0,0,0,0.4)] scale-100 z-20' 
                : index < currentIndex
                ? 'shadow-[0_20px_40px_rgba(0,0,0,0.2)] scale-95 z-10 opacity-70'
                : 'shadow-[0_20px_40px_rgba(0,0,0,0.2)] scale-95 z-10 opacity-70'
            }`}
            style={{
              left: index === currentIndex ? '50%' : index < currentIndex ? '-50%' : '150%',
              transform: index === currentIndex 
                ? 'translateX(-50%) translateY(0px) rotateY(0deg)' 
                : index < currentIndex
                ? 'translateX(-50%) translateY(15px) rotateY(5deg)'
                : 'translateX(-50%) translateY(15px) rotateY(-5deg)',
            }}
          >
            {/* Card Header */}
            <div
              className="card__header relative h-[170px] px-[30px] pb-[300px] rounded-t-[15px] text-white"
              style={{
                background: product.headerGradient,
              }}
            >
              {/* Watermark */}
              <div className="card__watermark overflow-hidden absolute bottom-[10px] left-0 w-full">
                <div
                  className="relative left-[-20px] text-black/30 text-[160px] font-bold uppercase"
                  style={{ fontFamily: 'var(--font-playfair), serif' }}
                >
                  {product.watermark}
                </div>
              </div>

              {/* Logo placeholder - you can add your logo here */}
              <div className="card__logo card__will-animate w-[40px] h-auto mb-3">
                <span className="text-white text-lg font-bold">SB</span>
              </div>

              {/* Title and Subtitle */}
              <h1 className="card__title card__will-animate my-[25px] mb-3 text-[12px] leading-[1.1em] uppercase tracking-[1px] font-bold text-left">
                {product.name}
              </h1>
              <span className="card__subtitle card__will-animate block text-[11px] font-light text-left">
                {product.subtitle}
              </span>
            </div>

            {/* Card Body */}
            <div className="card__body relative px-[30px] pt-10 pb-5 overflow-visible">
              {/* Product Image */}
              <Image
                src={product.image}
                alt={product.name}
                width={6000}
                height={6000}
                className="card__image card__will-animate z-10 absolute top-[-250px] left-[150px] select-none pointer-events-none"
                style={{ 
                  width: '2000px',
                  height: 'auto',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
                  WebkitUserDrag: 'none',
                  draggable: false,
                  transform: 'scale(1.5)',
                  transformOrigin: 'center center',
                }}
                priority={index === 0}
                draggable={false}
              />

              {/* Category */}
              <span className="card__category card__will-animate block text-[10px] text-[#AEAEAE] uppercase text-center mt-4">
                {product.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder Indicators */}
      <div className="cards-placeholder block relative mb-4 text-center mt-[600px]">
        {products.map((_, index) => (
          <div
            key={index}
            className={`cards-placeholder__item inline-block mr-2.5 bg-white w-[30px] h-[5px] rounded-[5px] transition-opacity duration-200 ${
              index === currentIndex ? 'opacity-100' : 'opacity-30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

