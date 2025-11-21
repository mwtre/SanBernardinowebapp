'use client';

import { useState } from 'react';
import Bottle3D from './Bottle3D';
import { motion } from 'framer-motion';

interface Bottle3DViewerProps {
  bottleType?: 'still' | 'sparkling' | 'extra-sparkling';
  depthMapUrl?: string;
  textureUrl?: string;
  labelImageUrl?: string;
  showControls?: boolean;
  modelUrl?: string; // GLB/GLTF file path
}

export default function Bottle3DViewer({
  bottleType = 'still',
  depthMapUrl,
  textureUrl,
  labelImageUrl,
  showControls = true,
  modelUrl,
}: Bottle3DViewerProps) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [viewMode, setViewMode] = useState<'3d' | 'depth'>('3d');

  return (
    <div className="w-full">
      {showControls && (
        <div className="mb-4 flex gap-4 justify-center items-center">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              autoRotate
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {autoRotate ? '⏸️ Pausa' : '▶️ Ruota'}
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('3d')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                viewMode === '3d'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              3D
            </button>
            {depthMapUrl && (
              <button
                onClick={() => setViewMode('depth')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  viewMode === 'depth'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Depth Map
              </button>
            )}
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full"
        style={{ 
          width: '100%', 
          height: '100%',
          minHeight: '100%',
          aspectRatio: '1 / 1'
        }}
      >
        {viewMode === '3d' ? (
          <Bottle3D
            depthMapUrl={depthMapUrl}
            textureUrl={textureUrl}
            bottleType={bottleType}
            autoRotate={autoRotate}
            labelImageUrl={labelImageUrl}
            modelUrl={modelUrl}
          />
        ) : (
          <div className="w-full h-[400px] bg-gray-900 rounded-lg flex items-center justify-center">
            {depthMapUrl ? (
              <img
                src={depthMapUrl}
                alt="Depth Map"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <p className="text-gray-400">Nessuna depth map disponibile</p>
            )}
          </div>
        )}
      </motion.div>

    </div>
  );
}

