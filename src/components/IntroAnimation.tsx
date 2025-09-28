import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'loading' | 'name' | 'effects' | 'complete'>('loading');
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Create Three.js scene for background effects
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x00FFFF,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create energy rings
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const ringGeometry = new THREE.RingGeometry(2 + i * 0.5, 2.1 + i * 0.5, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x00FFFF,
        transparent: true,
        opacity: 0.3 - i * 0.05,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.z = -5;
      rings.push(ring);
      scene.add(ring);
    }

    camera.position.z = 5;

    // Animation sequence
    const animate = () => {
      // Rotate particles
      particlesMesh.rotation.y += 0.002;
      particlesMesh.rotation.x += 0.001;

        // Animate rings
        rings.forEach((ring, index) => {
          ring.rotation.z += 0.01 * (index + 1);
          const material = ring.material as THREE.MeshBasicMaterial;
          material.opacity = 0.3 - index * 0.05 + Math.sin(Date.now() * 0.003) * 0.1;
        });

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Phase transitions
    const timer1 = setTimeout(() => setPhase('name'), 500);
    const timer2 = setTimeout(() => setPhase('effects'), 2000);
    const timer3 = setTimeout(() => setPhase('complete'), 4000);
    const timer4 = setTimeout(() => onComplete(), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <div ref={mountRef} className="absolute inset-0" />
      
      {/* Loading Phase */}
      {phase === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
        </div>
      )}

      {/* Name Animation */}
      {(phase === 'name' || phase === 'effects' || phase === 'complete') && (
        <div className="relative z-10 text-center">
          <div className={`transition-all duration-1000 ${phase === 'name' ? 'opacity-100 scale-100' : 'opacity-100 scale-110'}`}>
            <h1 className="text-8xl md:text-9xl font-bold tracking-wider">
              <span className={`inline-block transition-all duration-700 ${
                phase === 'name' ? 'transform translate-x-[-100px] opacity-0' : 'transform translate-x-0 opacity-100'
              }`} style={{ transitionDelay: '0ms' }}>
                P
              </span>
              <span className={`inline-block transition-all duration-700 ${
                phase === 'name' ? 'transform translate-y-[100px] opacity-0' : 'transform translate-y-0 opacity-100'
              }`} style={{ transitionDelay: '100ms' }}>
                r
              </span>
              <span className={`inline-block transition-all duration-700 ${
                phase === 'name' ? 'transform translate-x-[100px] opacity-0' : 'transform translate-x-0 opacity-100'
              }`} style={{ transitionDelay: '200ms' }}>
                e
              </span>
              <span className={`inline-block transition-all duration-700 ${
                phase === 'name' ? 'transform translate-y-[-100px] opacity-0' : 'transform translate-y-0 opacity-100'
              }`} style={{ transitionDelay: '300ms' }}>
                e
              </span>
              <span className={`inline-block transition-all duration-700 ${
                phase === 'name' ? 'transform translate-x-[-100px] opacity-0' : 'transform translate-x-0 opacity-100'
              }`} style={{ transitionDelay: '400ms' }}>
                t
              </span>
              <span className={`inline-block transition-all duration-700 ${
                phase === 'name' ? 'transform translate-y-[100px] opacity-0' : 'transform translate-y-0 opacity-100'
              }`} style={{ transitionDelay: '500ms' }}>
                h
              </span>
              <span className={`inline-block transition-all duration-700 ${
                phase === 'name' ? 'transform translate-x-[100px] opacity-0' : 'transform translate-x-0 opacity-100'
              }`} style={{ transitionDelay: '600ms' }}>
                a
              </span>
              <span className={`inline-block transition-all duration-700 ${
                phase === 'name' ? 'transform translate-y-[-100px] opacity-0' : 'transform translate-y-0 opacity-100'
              }`} style={{ transitionDelay: '700ms' }}>
                m
              </span>
              <span className="mx-8"></span>
              <span className={`inline-block transition-all duration-700 text-primary ${
                phase === 'name' ? 'transform scale-0 opacity-0' : 'transform scale-100 opacity-100'
              }`} style={{ transitionDelay: '800ms' }}>
                A
              </span>
              <span className={`inline-block transition-all duration-700 text-primary ${
                phase === 'name' ? 'transform scale-0 opacity-0' : 'transform scale-100 opacity-100'
              }`} style={{ transitionDelay: '900ms' }}>
                K
              </span>
            </h1>
          </div>
        </div>
      )}

      {/* Effects Phase */}
      {phase === 'effects' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Energy burst effects */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 border-4 border-primary rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-0 w-96 h-96 border-2 border-primary rounded-full animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-0 w-96 h-96 border border-primary rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Particle trails */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Complete Phase - Fade to black with portal effect */}
      {phase === 'complete' && (
        <div className="absolute inset-0 bg-background animate-fade-in flex items-center justify-center">
          <div className="w-32 h-32 border-4 border-primary rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default IntroAnimation;