'use client';

import { useEffect } from 'react';

/**
 * Client component to suppress expected console errors
 */
export default function ErrorSuppression() {
  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalLog = console.log;

    // List of error patterns to suppress (harmless errors in static export)
    const suppressedPatterns = [
      /SanBernardinowebapp\.txt\?_rsc=/,
      /Failed to fetch.*\.txt\?_rsc=/,
      /404.*\.txt\?_rsc=/,
      /GET.*\.txt\?_rsc=.*404/,
      /Loading progress:/,
      /chrome-extension:/,
      /Analytics SDK:/,
      /Failed to load resource.*net::ERR_BLOCKED_BY_CLIENT/,
      /Failed to load resource.*403/,
      /Failed to load resource.*404.*\.css/,
      /GLB model loaded successfully/,
      /Model scaled by:/,
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

    console.log = (...args: any[]) => {
      const message = args.join(' ');
      const shouldSuppress = suppressedPatterns.some(pattern => pattern.test(message));
      
      if (!shouldSuppress) {
        originalLog.apply(console, args);
      }
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      console.log = originalLog;
    };
  }, []);

  return null;
}

