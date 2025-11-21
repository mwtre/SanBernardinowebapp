# 3D Bottle Visualization with Depth Maps

This project includes a 3D visualization system that can create realistic 3D models of bottles using depth maps.

## How It Works

### Depth Map Processing

A depth map is a grayscale image where:
- **White pixels** = Closer to camera (protruding)
- **Black pixels** = Farther from camera (recessed)
- **Gray pixels** = Intermediate depth

The system:
1. Loads the depth map image
2. Samples depth values for each vertex of the base bottle geometry
3. Displaces vertices along their normals based on depth values
4. Creates a detailed 3D model matching the depth information

### Usage

#### In Product Showcase

The `Products` component automatically displays 3D bottles for each product type:

```tsx
<Bottle3DViewer
  bottleType="still"
  showControls={false}
/>
```

#### In Minting Interface

Users can upload:
1. **Label Image**: The bottle label photo
2. **Depth Map** (optional): A grayscale depth map for detailed 3D modeling

When both are provided, the 3D preview shows the bottle with the label applied.

### Creating Depth Maps

You can create depth maps using:

1. **Photogrammetry Software**
   - RealityCapture
   - Agisoft Metashape
   - Meshroom (free, open-source)

2. **AI Tools**
   - MiDaS (Monocular Depth Estimation)
   - DPT (Dense Prediction Transformer)
   - Online tools like DepthAnything

3. **3D Software**
   - Blender (with depth pass rendering)
   - After Effects (depth matte)
   - Photoshop (manual creation)

### Example Depth Map Workflow

1. Take a photo of the bottle from the front
2. Use AI depth estimation to generate depth map
3. Clean up the depth map in Photoshop/GIMP if needed
4. Upload both the label image and depth map
5. The 3D model will be generated automatically

### Technical Details

- **Base Geometry**: Cylinder with 64 segments
- **Displacement**: Up to 10% of base radius
- **Material**: Glass-like physical material with transmission
- **Lighting**: Multiple light sources for realistic rendering
- **Controls**: Orbit controls for rotation and zoom

### Customization

You can customize the 3D appearance by:

```tsx
<Bottle3DViewer
  bottleType="sparkling"
  depthMapUrl="/path/to/depth-map.png"
  textureUrl="/path/to/texture.jpg"
  labelImageUrl="/path/to/label.jpg"
  showControls={true}
/>
```

### Performance

- Uses WebGL via Three.js
- Optimized geometry (64 segments)
- Efficient depth map processing
- Responsive to user interactions

### Future Enhancements

- [ ] Real-time depth map generation from photos
- [ ] UV mapping for precise label placement
- [ ] AR preview using WebXR
- [ ] Export 3D model as GLTF
- [ ] Animated label application
- [ ] Multiple bottle views (front, side, back)

