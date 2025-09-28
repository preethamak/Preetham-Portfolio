import React, { useRef, useEffect } from 'react';

interface Skill {
  name: string;
  level: number;
  color: string;
}

const SkillsRadar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const skills: Skill[] = [
    { name: 'Blockchain', level: 90, color: '#00FFFF' },
    { name: 'Solidity', level: 85, color: '#0099FF' },
    { name: 'Vyper', level: 80, color: '#0088DD' },
    { name: 'AI/ML', level: 88, color: '#00AAFF' },
    { name: 'Python', level: 92, color: '#0066FF' },
    { name: 'C++', level: 85, color: '#0077EE' },
    { name: 'Web Dev', level: 90, color: '#00BBFF' },
    { name: 'Smart Contracts', level: 88, color: '#0055CC' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 40;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid circles
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (maxRadius / 5) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw grid lines
      const angleStep = (Math.PI * 2) / skills.length;
      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * maxRadius;
        const y = centerY + Math.sin(angle) * maxRadius;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      // Draw skill polygon
      ctx.beginPath();
      skills.forEach((skill, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const radius = (skill.level / 100) * maxRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      
      // Fill with gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 255, 255, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw skill points and labels
      skills.forEach((skill, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const radius = (skill.level / 100) * maxRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Draw point
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = skill.color;
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw label
        const labelX = centerX + Math.cos(angle) * (maxRadius + 25);
        const labelY = centerY + Math.sin(angle) * (maxRadius + 25);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(skill.name, labelX, labelY);
        ctx.fillText(`${skill.level}%`, labelX, labelY + 15);
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="flex justify-center items-center p-8">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border border-primary/20 rounded-lg bg-card/50 backdrop-blur-sm"
      />
    </div>
  );
};

export default SkillsRadar;