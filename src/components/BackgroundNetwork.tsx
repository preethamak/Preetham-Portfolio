import React, { useEffect, useRef } from "react";

/**
 * BackgroundNetwork
 * Fixed, GPU-friendly canvas network with nodes and connecting lines.
 * Uses design tokens via CSS variables for colors.
 */
const BackgroundNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let raf = 0;
    let mounted = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const getHSL = (v: string, alpha = 1) => {
      const val = v.trim(); // e.g. "172 100% 50%"
      return `hsla(${val} / ${alpha})`;
    };
    const root = getComputedStyle(document.documentElement);
    let primary = root.getPropertyValue("--primary");

    const onResize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    type Node = { x: number; y: number; vx: number; vy: number };
    const nodes: Node[] = [];
    const targetCount = Math.max(28, Math.min(80, Math.floor(window.innerWidth / 20)));
    const speed = 0.35;
    const distance = Math.min(160, Math.max(90, window.innerWidth * 0.08));

    const init = () => {
      nodes.length = 0;
      for (let i = 0; i < targetCount; i++) {
        nodes.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
        });
      }
    };

    const mouse = { x: -9999, y: -9999 };
    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const step = () => {
      if (!mounted) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Soft gradient backdrop for depth
      const grad = ctx.createRadialGradient(
        canvas.width / (2 * dpr),
        canvas.height / (2 * dpr),
        0,
        canvas.width / (2 * dpr),
        canvas.height / (2 * dpr),
        Math.max(canvas.width, canvas.height) / dpr
      );
      grad.addColorStop(0, getHSL(primary, 0.04));
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw
      const lineColor = getHSL(primary, 0.18);
      const dotColor = getHSL(primary, 0.5);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // wrap around edges for continuous movement
        if (n.x < -10) n.x = window.innerWidth + 10;
        if (n.x > window.innerWidth + 10) n.x = -10;
        if (n.y < -10) n.y = window.innerHeight + 10;
        if (n.y > window.innerHeight + 10) n.y = -10;

        // Draw node
        ctx.beginPath();
        ctx.fillStyle = dotColor;
        ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Connections
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < distance) {
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = 1 - dist / distance;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }

        // Connect to mouse
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < distance * 0.9) {
          ctx.strokeStyle = getHSL(primary, 0.3);
          ctx.globalAlpha = 1 - md / (distance * 0.9);
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      raf = requestAnimationFrame(step);
    };

    onResize();
    init();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    raf = requestAnimationFrame(step);

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full opacity-70" />
    </div>
  );
};

export default BackgroundNetwork;
