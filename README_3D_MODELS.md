# 3D Model Integration Guide

## Recommended Format: **GLB** (or GLTF)

For web-based 3D applications, **GLB is the best choice** because:

✅ **Optimized for web** - Smaller file sizes, faster loading  
✅ **Complete format** - Supports materials, textures, animations  
✅ **Native Three.js support** - Works seamlessly with React Three Fiber  
✅ **Modern standard** - Industry standard for web 3D  
✅ **Easy to modify** - Can be edited in code after loading  

## Format Comparison

| Format | Best For | Web Support | File Size | Materials | Animations |
|--------|----------|-------------|-----------|-----------|------------|
| **GLB** | ✅ **Web (Best)** | Excellent | Small | ✅ Yes | ✅ Yes |
| GLTF | Web | Excellent | Small-Medium | ✅ Yes | ✅ Yes |
| OBJ | Simple models | Good | Medium | ⚠️ Limited | ❌ No |
| FBX | Complex animations | ⚠️ Needs conversion | Large | ✅ Yes | ✅ Yes |
| STL | 3D printing | Basic | Small | ❌ No | ❌ No |

## How to Add Your 3D Model

### Step 1: Place Your GLB File

1. Put your `.glb` file in the `public/models/` directory
   ```
   public/
     models/
       bottle.glb
   ```

### Step 2: Use in Components

```tsx
<Bottle3DViewer
  modelUrl="/models/bottle.glb"
  bottleType="still"
  showControls={true}
/>
```

Or in the Products component:

```tsx
<Bottle3DViewer
  bottleType="still"
  modelUrl="/models/pure-spring.glb"
  showControls={false}
/>
```

## Converting Other Formats to GLB

### From FBX/OBJ/STL to GLB

**Option 1: Blender (Free)**
1. Open Blender
2. File → Import → [Your Format]
3. File → Export → glTF 2.0
4. Select "glTF Binary (.glb)" format
5. Export

**Option 2: Online Converters**
- [glTF.report](https://gltf.report/) - Online GLB converter
- [AnyConv](https://anyconv.com/) - Multi-format converter

**Option 3: Command Line (gltf-pipeline)**
```bash
npm install -g gltf-pipeline
gltf-pipeline -i model.fbx -o model.glb
```

## Modifying the 3D Model in Code

The component automatically loads your GLB model. You can modify it:

### Example: Change Material Properties

```tsx
// In Bottle3D.tsx, after loading the model:
useEffect(() => {
  if (model) {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Modify material
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.color.setHex(0x87ceeb); // Change color
          child.material.roughness = 0.1;
          child.material.metalness = 0.0;
        }
      }
    });
  }
}, [model]);
```

### Example: Apply Label Texture

```tsx
useEffect(() => {
  if (model && labelImageUrl) {
    const loader = new THREE.TextureLoader();
    loader.load(labelImageUrl, (texture) => {
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Find the label mesh (you may need to name it in Blender)
          if (child.name === 'Label') {
            child.material.map = texture;
            child.material.needsUpdate = true;
          }
        }
      });
    });
  }
}, [model, labelImageUrl]);
```

### Example: Scale/Position

```tsx
useEffect(() => {
  if (model) {
    model.scale.set(1, 1, 1); // Adjust scale
    model.position.set(0, 0, 0); // Adjust position
    model.rotation.set(0, 0, 0); // Adjust rotation
  }
}, [model]);
```

## Best Practices

1. **Optimize your GLB file**
   - Use compression (Draco compression)
   - Reduce polygon count if possible
   - Compress textures

2. **Name your meshes in Blender**
   - Name the bottle mesh "Bottle"
   - Name the label mesh "Label"
   - Makes it easier to modify in code

3. **File size recommendations**
   - Aim for < 2MB for web
   - Use texture compression
   - Consider LOD (Level of Detail) for complex models

4. **Testing**
   - Test on different devices
   - Check loading performance
   - Verify materials render correctly

## Example Workflow

1. **Create/Export model** → `bottle.glb`
2. **Place in** → `public/models/bottle.glb`
3. **Use in component**:
   ```tsx
   <Bottle3DViewer modelUrl="/models/bottle.glb" />
   ```
4. **Modify in code** (if needed) using the examples above

## Troubleshooting

**Model not loading?**
- Check file path is correct
- Ensure file is in `public/models/`
- Check browser console for errors

**Materials look wrong?**
- GLB includes materials, but you can override them in code
- Check if textures are embedded in GLB or need separate files

**Model too large?**
- Use Blender to reduce polygon count
- Compress textures
- Use Draco compression when exporting

**Need animations?**
- GLB supports animations
- Use `useAnimations` from `@react-three/drei`:
  ```tsx
  const { animations } = useGLTF('/models/bottle.glb');
  const { actions } = useAnimations(animations, group);
  ```

