'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import Bottle3DViewer from './Bottle3DViewer';

const products = [
  {
    name: 'Pure Spring',
    description: 'Still',
    sizes: '750ml - 250ml',
    type: 'still',
    rarity: 'common',
    rarityLabel: 'Common',
    rarityColor: 'bg-gray-500',
    rarityBorder: 'border-gray-400',
    rarityBg: 'from-gray-600 to-gray-800',
    rarityGlow: 'from-gray-400/30 to-transparent',
    supply: 10000,
    minted: 0,
    price: '0.01 ETH',
  },
  {
    name: 'Sparkling Crest',
    description: 'Sparkling',
    sizes: '750ml - 250ml',
    type: 'sparkling',
    rarity: 'rare',
    rarityLabel: 'Rare',
    rarityColor: 'bg-blue-500',
    rarityBorder: 'border-blue-400',
    rarityBg: 'from-blue-600 to-blue-800',
    rarityGlow: 'from-blue-400/30 to-transparent',
    supply: 1000,
    minted: 0,
    price: '0.05 ETH',
  },
  {
    name: 'Alpine Burst',
    description: 'Extra Sparkling',
    sizes: '750ml - 250ml',
    type: 'extra-sparkling',
    rarity: 'epic',
    rarityLabel: 'Epic',
    rarityColor: 'bg-purple-500',
    rarityBorder: 'border-purple-400',
    rarityBg: 'from-purple-600 to-purple-800',
    rarityGlow: 'from-purple-400/30 to-transparent',
    supply: 100,
    minted: 0,
    price: '0.1 ETH',
  },
];

export default function Products() {
  return (
    <section 
      className="relative w-full overflow-hidden" 
      id="products-section"
      style={{ 
        paddingTop: '80px',
        paddingBottom: '80px',
        marginTop: '40px',
        position: 'relative',
        zIndex: 20,
        backgroundColor: '#26b4f4',
        isolation: 'isolate'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg px-4">
            First Web3 Water Integration
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow-md px-4">
            Mint Exclusive NFT. Choose your rarity and certify your bottle as a unique digital asset.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex justify-center items-center relative w-full"
              style={{ paddingTop: '20px', paddingBottom: '20px', minHeight: '100%' }}
            >
              {/* Neumorphic NFT Card with Water-style Opacity */}
              <div 
                className={`nft-card`}
                style={{
                  boxShadow: `
                    inset 20px 20px 20px rgba(0, 0, 0, 0.05),
                    25px 35px 20px rgba(0, 0, 0, 0.05),
                    inset -20px -20px 25px rgba(220, 216, 216, 0.372)
                  `,
                  background: product.rarity === 'common' 
                    ? 'linear-gradient(145deg, rgba(75, 85, 99, 0.4), rgba(31, 41, 55, 0.4))'
                    : product.rarity === 'rare'
                    ? 'linear-gradient(145deg, rgba(37, 99, 235, 0.4), rgba(30, 64, 175, 0.4))'
                    : 'linear-gradient(145deg, rgba(147, 51, 234, 0.4), rgba(107, 33, 168, 0.4))'
                }}
              >
                {/* 3D Object Box - Positioned at top, scales on hover */}
                <div className="nft-card-3d-box" style={{ overflow: 'visible', clipPath: 'none', position: 'relative' }}>
                  <div 
                    className="w-full h-full flex items-center justify-center" 
                    style={{ 
                      overflow: 'visible', 
                      width: '100%', 
                      height: '100%',
                      transformOrigin: 'center center',
                      position: 'relative',
                      aspectRatio: '1 / 1'
                    }}
                  >
                    <ErrorBoundary
                      fallback={
                        <div className="w-full h-full flex items-center justify-center bg-gray-200/20 rounded-lg">
                          <span className="text-white text-xs">3D Model</span>
                        </div>
                      }
                    >
                      <Suspense
                        fallback={
                          <div className="w-full h-full flex items-center justify-center bg-gray-200/20 rounded-lg">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                          </div>
                        }
                      >
                        <Bottle3DViewer
                          bottleType={product.type as 'still' | 'sparkling' | 'extra-sparkling'}
                          showControls={false}
                          modelUrl="/SanBernardinowebapp/models/hitem3d.glb"
                        />
                      </Suspense>
                    </ErrorBoundary>
                  </div>
                </div>

                {/* Content Section - Slides up on hover */}
                <div className="nft-card-content">
                  <div className="nft-card-details">
                    {/* Title and Description with Rarity Glow */}
                    <h2 
                      style={{ 
                        fontSize: 'clamp(1em, 4vw, 1.25em)', 
                        fontWeight: 500, 
                        color: '#fff', 
                        lineHeight: 1.2,
                        textShadow: product.rarity === 'common' 
                          ? '0 0 10px rgba(156, 163, 175, 0.8), 0 0 20px rgba(156, 163, 175, 0.5)'
                          : product.rarity === 'rare'
                          ? '0 0 10px rgba(96, 165, 250, 0.8), 0 0 20px rgba(96, 165, 250, 0.5)'
                          : '0 0 10px rgba(167, 139, 250, 0.8), 0 0 20px rgba(167, 139, 250, 0.5)'
                      }}
                    >
                      {product.name}
                      <br />
                      <span style={{ fontSize: 'clamp(0.65em, 3vw, 0.75em)', fontWeight: 400, opacity: 0.6 }}>
                        {product.description} • {product.sizes}
                      </span>
                    </h2>

                    {/* NFT Stats with Rarity Glow */}
                    <div className="nft-card-data">
                      <div>
                        <h3 style={{ 
                          fontSize: 'clamp(0.85em, 3.5vw, 1em)', 
                          color: '#fff', 
                          lineHeight: '1.2em', 
                          fontWeight: 500,
                          textShadow: product.rarity === 'common' 
                            ? '0 0 8px rgba(156, 163, 175, 0.6)'
                            : product.rarity === 'rare'
                            ? '0 0 8px rgba(96, 165, 250, 0.6)'
                            : '0 0 8px rgba(167, 139, 250, 0.6)'
                        }}>
                          {product.minted.toLocaleString()}
                          <br />
                          <span style={{ fontSize: 'clamp(0.7em, 3vw, 0.85em)', fontWeight: 300, opacity: 0.6 }}>Minted</span>
                        </h3>
                      </div>
                      <div>
                        <h3 style={{ 
                          fontSize: 'clamp(0.85em, 3.5vw, 1em)', 
                          color: '#fff', 
                          lineHeight: '1.2em', 
                          fontWeight: 500,
                          textShadow: product.rarity === 'common' 
                            ? '0 0 8px rgba(156, 163, 175, 0.6)'
                            : product.rarity === 'rare'
                            ? '0 0 8px rgba(96, 165, 250, 0.6)'
                            : '0 0 8px rgba(167, 139, 250, 0.6)'
                        }}>
                          {product.supply.toLocaleString()}
                          <br />
                          <span style={{ fontSize: 'clamp(0.7em, 3vw, 0.85em)', fontWeight: 300, opacity: 0.6 }}>Supply</span>
                        </h3>
                      </div>
                      <div>
                        <h3 style={{ 
                          fontSize: 'clamp(0.85em, 3.5vw, 1em)', 
                          color: '#fff', 
                          lineHeight: '1.2em', 
                          fontWeight: 500,
                          textShadow: product.rarity === 'common' 
                            ? '0 0 8px rgba(156, 163, 175, 0.6)'
                            : product.rarity === 'rare'
                            ? '0 0 8px rgba(96, 165, 250, 0.6)'
                            : '0 0 8px rgba(167, 139, 250, 0.6)'
                        }}>
                          {product.rarityLabel}
                          <br />
                          <span style={{ fontSize: 'clamp(0.7em, 3vw, 0.85em)', fontWeight: 300, opacity: 0.6 }}>Rarity</span>
                        </h3>
                      </div>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="nft-card-action-btn flex-wrap gap-2">
                      <Link
                        href={`/mint?type=${product.type}&rarity=${product.rarity}`}
                        className="px-4 sm:px-5 py-2 rounded-md outline-none border-none text-xs sm:text-sm font-medium bg-white cursor-pointer shadow-lg whitespace-nowrap"
                        style={{
                          color: product.rarityColor === 'bg-gray-500' ? '#269cd9' : 
                                 product.rarityColor === 'bg-blue-500' ? '#269cd9' : '#e58ce9'
                        }}
                      >
                        {product.price}
                      </Link>
                      <Link
                        href={`/mint?type=${product.type}&rarity=${product.rarity}`}
                        className="px-4 sm:px-5 py-2 rounded-md outline-none border-2 text-xs sm:text-sm font-medium bg-transparent text-white cursor-pointer whitespace-nowrap"
                        style={{
                          borderColor: product.rarityColor === 'bg-gray-500' ? '#9ca3af' : 
                                       product.rarityColor === 'bg-blue-500' ? '#60a5fa' : '#e58ce9'
                        }}
                      >
                        Mint NFT
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

