import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const FloatingGeometry: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating geometric shapes
    const geometries = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.TetrahedronGeometry(1.5, 0),
      new THREE.DodecahedronGeometry(0.8, 0),
    ];

    const materials = [
      new THREE.MeshBasicMaterial({ 
        color: 0x00FFFF, 
        transparent: true, 
        opacity: 0.1,
        wireframe: true 
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x0088FF, 
        transparent: true, 
        opacity: 0.08,
        wireframe: true 
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x00AAFF, 
        transparent: true, 
        opacity: 0.12,
        wireframe: true 
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x0066FF, 
        transparent: true, 
        opacity: 0.09,
        wireframe: true 
      }),
    ];

    const meshes: THREE.Mesh[] = [];
    const rotationSpeeds: { x: number; y: number; z: number }[] = [];

    // Create multiple floating objects
    for (let i = 0; i < 8; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      // Random positions
      mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20
      );
      
      mesh.scale.setScalar(Math.random() * 0.5 + 0.5);
      
      rotationSpeeds.push({
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
      });

      meshes.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 15;

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      meshes.forEach((mesh, index) => {
        const speed = rotationSpeeds[index];
        mesh.rotation.x += speed.x;
        mesh.rotation.y += speed.y;
        mesh.rotation.z += speed.z;

        // Floating motion
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        mesh.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.001;

        // Mouse influence
        const mouseInfluence = 0.1;
        mesh.rotation.y += mouse.x * mouseInfluence * 0.01;
        mesh.rotation.x += mouse.y * mouseInfluence * 0.01;
      });

      // Camera gentle movement
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Cleanup
      geometries.forEach(geo => geo.dispose());
      materials.forEach(mat => mat.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-30 pointer-events-none"
    />
  );
};

export default FloatingGeometry;