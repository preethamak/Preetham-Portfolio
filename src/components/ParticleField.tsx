import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  size?: number;
  color?: string;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ 
  count = 1000, 
  size = 2, 
  color = '#00FFFF' 
}) => {
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

    // Particle geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;
      
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material
    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: size,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 20;

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
      const positions = positionAttribute.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Update positions
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        // Boundary check and reset
        if (Math.abs(positions[i3]) > 25) velocities[i3] *= -1;
        if (Math.abs(positions[i3 + 1]) > 25) velocities[i3 + 1] *= -1;
        if (Math.abs(positions[i3 + 2]) > 25) velocities[i3 + 2] *= -1;

        // Mouse attraction
        const dx = mouse.x * 20 - positions[i3];
        const dy = mouse.y * 20 - positions[i3 + 1];
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 10) {
          velocities[i3] += dx * 0.0001;
          velocities[i3 + 1] += dy * 0.0001;
        }
      }

      positionAttribute.needsUpdate = true;
      
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.002;

      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 5 - camera.position.y) * 0.05;
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
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [count, size, color]);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  );
};

export default ParticleField;