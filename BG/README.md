# Background Components

This folder contains background animation components for the Fonti San Bernardino website.

## Components

### 1. Ripple Background Animation

An interactive canvas-based ripple effect animation that responds to mouse movement.

**Files:**
- `index.html` - Main HTML file with canvas element
- `style.css` - Styling for the canvas and wrapper
- `ripple.js` - JavaScript code for the ripple animation

**Usage:**
Simply open `index.html` in a web browser. Move your mouse over the canvas to create ripple effects.

### 2. Parallax Background Component

A React component that creates a parallax scrolling effect with multiple layers (sky, mountains, clouds) using GSAP ScrollTrigger.

**Location:** `../components/ParallaxBackground.tsx`

**Usage Example:**

```tsx
import ParallaxBackground from '@/components/ParallaxBackground';

export default function MySection() {
  return (
    <section className="relative min-h-screen">
      <ParallaxBackground
        id="hero-parallax"
        scrollHeight="200vh"
        text="EXPLORE"
        showArrow={true}
      />
      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </section>
  );
}
```

**Props:**

- `id` (string, optional): Unique ID for the scroll trigger (default: 'parallax')
- `scrollHeight` (string, optional): Height of scroll distance element (default: '200vh')
- `skyImage` (string, optional): Sky image URL
- `mountBgImage` (string, optional): Background mountain image URL
- `mountMgImage` (string, optional): Middle mountain image URL
- `mountFgImage` (string, optional): Foreground mountain image URL
- `cloud1Image`, `cloud2Image`, `cloud3Image` (string, optional): Cloud image URLs
- `text` (string, optional): Text to display (default: 'EXPLORE')
- `showArrow` (boolean, optional): Show arrow button (default: true)
- `viewBox` (string, optional): SVG viewBox (default: '0 0 1200 800')
- `layers` (array, optional): Custom parallax layers configuration
- `scrollStart` (string, optional): Scroll trigger start (default: '0 0')
- `scrollEnd` (string, optional): Scroll trigger end (default: '100% 100%')

**Custom Layers Example:**

```tsx
<ParallaxBackground
  layers={[
    { className: 'layer1', imageUrl: '/images/layer1.png', fromY: 0, toY: -200 },
    { className: 'layer2', imageUrl: '/images/layer2.png', fromY: 50, toY: -400 },
  ]}
/>
```

## Browser Compatibility

Works in all modern browsers that support GSAP and ScrollTrigger.

