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

    // Create Three.js scene for magnetic particle background
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create magnetic particle field
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 40;
      posArray[i + 1] = (Math.random() - 0.5) * 40;
      posArray[i + 2] = (Math.random() - 0.5) * 40;
      
      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.008,
      color: 0x00FFFF,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 8;

    // Magnetic field animation
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        // Create magnetic field effect
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        const distance = Math.sqrt(x * x + y * y + z * z);
        const force = Math.sin(time + distance * 0.1) * 0.001;
        
        positions[i] += Math.sin(time + i) * force;
        positions[i + 1] += Math.cos(time + i) * force;
        positions[i + 2] += Math.sin(time * 0.5 + i) * force * 0.5;
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Responsive resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Phase transitions
    const timer1 = setTimeout(() => setPhase('name'), 800);
    const timer2 = setTimeout(() => setPhase('effects'), 2500);
    const timer3 = setTimeout(() => setPhase('complete'), 4500);
    const timer4 = setTimeout(() => onComplete(), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      window.removeEventListener('resize', handleResize);
      
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
      {/* Three.js Magnetic Background only (no photo) */}
      <div ref={mountRef} className="absolute inset-0" />
      
      {/* Loading Phase */}
      {phase === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-primary rounded-full animate-ping"></div>
        </div>
      )}

      {/* Name Animation */}
      {(phase === 'name' || phase === 'effects' || phase === 'complete') && (
        <div className="relative z-10 text-center px-4">
          {/* Glass panel */}
          <div className="mx-auto max-w-[90vw] sm:max-w-3xl rounded-2xl bg-background/30 backdrop-blur-lg border border-white/10 shadow-xl p-4 sm:p-8 mb-4 sm:mb-8 [transform-style:preserve-3d] [perspective:1000px]">
            <div className={`transition-all duration-1000 ${phase === 'name' ? 'opacity-100 scale-100' : 'opacity-100 scale-105'} [transform:rotateX(0deg)_rotateY(0deg)]`}> 
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-wider">
              <span className={`inline-block transition-all duration-700 text-gradient ${
                phase === 'name' ? 'transform translate-x-[-100px] opacity-0' : 'transform translate-x-0 opacity-100'
              }`} style={{ transitionDelay: '0ms' }}>
                P
              </span>
              <span className={`inline-block transition-all duration-700 text-gradient ${
                phase === 'name' ? 'transform translate-y-[100px] opacity-0' : 'transform translate-y-0 opacity-100'
              }`} style={{ transitionDelay: '100ms' }}>
                r
              </span>
              <span className={`inline-block transition-all duration-700 text-gradient ${
                phase === 'name' ? 'transform translate-x-[100px] opacity-0' : 'transform translate-x-0 opacity-100'
              }`} style={{ transitionDelay: '200ms' }}>
                e
              </span>
              <span className={`inline-block transition-all duration-700 text-gradient ${
                phase === 'name' ? 'transform translate-y-[-100px] opacity-0' : 'transform translate-y-0 opacity-100'
              }`} style={{ transitionDelay: '300ms' }}>
                e
              </span>
              <span className={`inline-block transition-all duration-700 text-gradient ${
                phase === 'name' ? 'transform translate-x-[-100px] opacity-0' : 'transform translate-x-0 opacity-100'
              }`} style={{ transitionDelay: '400ms' }}>
                t
              </span>
              <span className={`inline-block transition-all duration-700 text-gradient ${
                phase === 'name' ? 'transform translate-y-[100px] opacity-0' : 'transform translate-y-0 opacity-100'
              }`} style={{ transitionDelay: '500ms' }}>
                h
              </span>
              <span className={`inline-block transition-all duration-700 text-gradient ${
                phase === 'name' ? 'transform translate-x-[100px] opacity-0' : 'transform translate-x-0 opacity-100'
              }`} style={{ transitionDelay: '600ms' }}>
                a
              </span>
              <span className={`inline-block transition-all duration-700 text-gradient ${
                phase === 'name' ? 'transform translate-y-[-100px] opacity-0' : 'transform translate-y-0 opacity-100'
              }`} style={{ transitionDelay: '700ms' }}>
                m
              </span>
              <span className="mx-4 sm:mx-8"></span>
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
        </div>
      )}

      {/* Effects Phase */}
      {phase === 'effects' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Energy burst effects */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-64 h-64 sm:w-96 sm:h-96 border-4 border-primary rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-0 w-64 h-64 sm:w-96 sm:h-96 border-2 border-primary rounded-full animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-0 w-64 h-64 sm:w-96 sm:h-96 border border-primary rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Particle trails */}
          {Array.from({ length: 15 }).map((_, i) => (
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

      {/* Complete Phase */}
      {phase === 'complete' && (
        <div className="absolute inset-0 bg-background/90 animate-fade-in flex items-center justify-center">
          <div className="w-20 h-20 sm:w-32 sm:h-32 border-4 border-primary rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default IntroAnimation;