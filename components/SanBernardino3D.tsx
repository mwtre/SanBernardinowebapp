'use client';

import { assetPath } from '@/lib/paths';

export default function SanBernardino3D() {
  return (
    <div className="w-full flex items-center justify-center pb-0">
      <img 
        src={assetPath("/models/tranlogo.png")} 
        alt="San Bernardino Logo"
        className="object-contain"
        style={{ 
          width: '100%', 
          height: 'auto', 
          maxWidth: '900px',
          display: 'block',
          margin: '0 auto'
        }}
      />
    </div>
  );
}
