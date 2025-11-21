/**
 * Utility function to get asset paths with basePath prefix
 * This ensures assets work correctly on GitHub Pages with subdirectory deployment
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/SanBernardinowebapp';

export function assetPath(path: string): string {
  // If path already starts with basePath, return as is
  if (path.startsWith(basePath)) {
    return path;
  }
  
  // If path is absolute (starts with /), prefix with basePath
  if (path.startsWith('/')) {
    return `${basePath}${path}`;
  }
  
  // Otherwise return as is (relative paths)
  return path;
}

