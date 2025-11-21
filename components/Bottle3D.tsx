'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface Bottle3DProps {
  depthMapUrl?: string;
  textureUrl?: string;
  bottleType?: 'still' | 'sparkling' | 'extra-sparkling';
  autoRotate?: boolean;
  labelImageUrl?: string;
  modelUrl?: string; // GLB/GLTF file path
}

function BottleMesh({ 
  depthMapUrl, 
  textureUrl, 
  bottleType = 'still',
  labelImageUrl,
  modelUrl,
  autoRotate = true
}: Bottle3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [material, setMaterial] = useState<THREE.Material | null>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);
  
  // Handle GLB model loading via useEffect
  useEffect(() => {
    if (modelUrl) {
      // Use GLTFLoader directly for conditional loading
      const loader = new GLTFLoader();
      loader.load(
        modelUrl,
        (gltf) => {
          console.log('GLB model loaded successfully:', gltf);
          const clonedScene = gltf.scene.clone();
          
          // Calculate bounding box to scale and center model
          const box = new THREE.Box3().setFromObject(clonedScene);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          
          // Scale model to fit nicely in view (target height ~2.2 units to fit in circle)
          const targetHeight = 2.2;
          const scale = targetHeight / size.y;
          
          // Apply scale uniformly
          clonedScene.scale.set(scale, scale, scale);
          
          // Center the model at origin by moving it
          // First get the center after scaling
          const scaledCenter = center.clone().multiplyScalar(scale);
          // Center vertically - no offset to show full object
          clonedScene.position.set(-scaledCenter.x, -scaledCenter.y, -scaledCenter.z);
          
          // Reset rotation to ensure proper orientation
          clonedScene.rotation.set(0, 0, 0);
          
          console.log('Model scaled by:', scale, 'Centered at:', clonedScene.position);
          
          setModel(clonedScene);
          
          // Extract geometry and material from the model if needed
          clonedScene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              if (child.geometry) setGeometry(child.geometry);
              if (child.material) {
                if (Array.isArray(child.material)) {
                  setMaterial(child.material[0]);
                } else {
                  setMaterial(child.material);
                }
              }
            }
          });
        },
        (progress) => {
          console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%');
        },
        (error) => {
          console.error('Failed to load GLB model:', error);
        }
      );
    } else {
      // Clear model if modelUrl is removed
      setModel(null);
    }
  }, [modelUrl]);

  useEffect(() => {
    // Skip procedural geometry if we have a GLB model
    if (modelUrl) {
      return;
    }
    
    // Create bottle geometry from depth map or use default shape
    if (depthMapUrl) {
      // Load depth map and create displacement geometry
      const loader = new THREE.TextureLoader();
      loader.load(depthMapUrl, (depthTexture) => {
        // Create a cylinder as base shape
        const segments = 64;
        const baseGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.2, segments);
        
        // Apply depth map as displacement
        const positions = baseGeometry.attributes.position;
        const uvs = baseGeometry.attributes.uv;
        
        // Sample depth map to displace vertices
        const depthCanvas = document.createElement('canvas');
        depthCanvas.width = depthTexture.image.width;
        depthCanvas.height = depthTexture.image.height;
        const ctx = depthCanvas.getContext('2d');
        
        if (ctx && depthTexture.image) {
          ctx.drawImage(depthTexture.image, 0, 0);
          const imageData = ctx.getImageData(0, 0, depthCanvas.width, depthCanvas.height);
          
          // Displace vertices based on depth
          for (let i = 0; i < positions.count; i++) {
            const u = uvs.getX(i);
            const v = uvs.getY(i);
            
            const x = Math.floor(u * imageData.width);
            const y = Math.floor((1 - v) * imageData.height);
            const index = (y * imageData.width + x) * 4;
            
            if (index >= 0 && index < imageData.data.length) {
              const depth = imageData.data[index] / 255; // Normalize to 0-1
              const displacement = (depth - 0.5) * 0.1; // Scale displacement
              
              const normal = new THREE.Vector3();
              baseGeometry.computeVertexNormals();
              const normalAttr = baseGeometry.attributes.normal;
              normal.fromBufferAttribute(normalAttr, i);
              
              positions.setXYZ(
                i,
                positions.getX(i) + normal.x * displacement,
                positions.getY(i) + normal.y * displacement,
                positions.getZ(i) + normal.z * displacement
              );
            }
          }
          
          positions.needsUpdate = true;
          baseGeometry.computeVertexNormals();
        }
        
        setGeometry(baseGeometry);
      });
    } else {
      // Default elegant bottle shape
      const bottleGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.2, 64);
      
      // Modify to create elegant tapered shape
      const positions = bottleGeometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i);
        const normalizedY = (y + 0.6) / 1.2; // Normalize to 0-1
        
        // Create tapered shape - wider at bottom, narrower at top
        const radiusScale = 0.7 + (1 - normalizedY) * 0.3;
        const angle = Math.atan2(positions.getZ(i), positions.getX(i));
        const radius = Math.sqrt(positions.getX(i) ** 2 + positions.getZ(i) ** 2);
        
        positions.setX(i, Math.cos(angle) * radius * radiusScale);
        positions.setZ(i, Math.sin(angle) * radius * radiusScale);
      }
      
      positions.needsUpdate = true;
      bottleGeometry.computeVertexNormals();
      setGeometry(bottleGeometry);
    }

    // Create material based on bottle type
    if (textureUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(textureUrl, (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        const mat = new THREE.MeshPhysicalMaterial({
          map: texture,
          roughness: 0.1,
          metalness: 0.0,
          transmission: 0.9,
          thickness: 0.5,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
        });
        setMaterial(mat);
      });
    } else {
      // Default glass material with color based on type
      const colors = {
        still: new THREE.Color(0x87ceeb), // Sky blue
        sparkling: new THREE.Color(0x90ee90), // Light green
        'extra-sparkling': new THREE.Color(0xdda0dd), // Plum
      };
      
      const bottleMaterial = new THREE.MeshPhysicalMaterial({
        color: colors[bottleType],
        roughness: 0.1,
        metalness: 0.0,
        transmission: 0.95,
        thickness: 0.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        opacity: 0.9,
        transparent: true,
      });
      setMaterial(bottleMaterial);
    }
  }, [depthMapUrl, textureUrl, bottleType, modelUrl]);

  // Apply label as texture if provided
  useEffect(() => {
    if (labelImageUrl && material && material instanceof THREE.MeshPhysicalMaterial) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(labelImageUrl, (labelTexture) => {
        const newMaterial = material.clone() as THREE.MeshPhysicalMaterial;
        // For now, we'll use the label as a decal or overlay
        // In a more advanced implementation, you'd use UV mapping
        setMaterial(newMaterial);
      });
    }
  }, [labelImageUrl, material]);

  // No rotation - static model

  // If we have a GLB model, render it directly
  if (model) {
    return (
      <group ref={meshRef} position={[0, 0, 0]}>
        <primitive object={model} />
      </group>
    );
  }

  // Otherwise, use the procedural geometry
  if (!geometry || !material) {
    return null;
  }

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} position={[0, 0, 0]} />
  );
}

export default function Bottle3D({
  depthMapUrl,
  textureUrl,
  bottleType = 'still',
  autoRotate = true,
  labelImageUrl,
  modelUrl,
}: Bottle3DProps) {
  return (
    <div className="w-full h-full bg-transparent rounded-lg overflow-visible" style={{ height: '100%', minHeight: '100%' }}>
      <Canvas 
        shadows
        style={{ width: '100%', height: '100%' }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />
        
        {/* Full Lighting with Shadows */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, 0, 5]} intensity={0.5} />
        <spotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        
        {/* Environment for reflections */}
        <Environment preset="city" />
        
        {/* Bottle */}
        <BottleMesh
          depthMapUrl={depthMapUrl}
          textureUrl={textureUrl}
          bottleType={bottleType}
          labelImageUrl={labelImageUrl}
          modelUrl={modelUrl}
          autoRotate={false}
        />
        
        {/* Ground plane for shadows */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
        
        {/* Controls - No rotation, no interaction */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          autoRotate={false}
          minDistance={2.5}
          maxDistance={8}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}

