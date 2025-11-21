'use client';

import { useEffect } from 'react';

/**
 * Client component to suppress expected console errors
 */
export default function ErrorSuppression() {
  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;

    // List of error patterns to suppress (harmless errors in static export)
    const suppressedPatterns = [
      /SanBernardinowebapp\.txt\?_rsc=/,
      /Failed to fetch.*\.txt\?_rsc=/,
      /404.*\.txt\?_rsc=/,
      /GET.*\.txt\?_rsc=.*404/,
    ];

    console.error = (...args: any[]) => {
      const message = args.join(' ');
      const shouldSuppress = suppressedPatterns.some(pattern => pattern.test(message));
      
      if (!shouldSuppress) {
        originalError.apply(console, args);
      }
    };

    console.warn = (...args: any[]) => {
      const message = args.join(' ');
      const shouldSuppress = suppressedPatterns.some(pattern => pattern.test(message));
      
      if (!shouldSuppress) {
        originalWarn.apply(console, args);
      }
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return null;
}

