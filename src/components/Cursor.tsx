import React, { useEffect, useRef, useState } from "react";

const isCoarsePointer = () =>
  typeof window !== "undefined" && matchMedia && window.matchMedia("(pointer: coarse)").matches;

const Cursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  const [hidden, setHidden] = useState(true);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (isCoarsePointer()) return; // Hide on touch devices

    const ring = ringRef.current!;
    const dot = dotRef.current!;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const ease = 0.18;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (hidden) setHidden(false);
    };

    const checkHover = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest("a, button, [role='button'], input, textarea, select");
      setHovering(Boolean(el));
    };

    const loop = () => {
      rx += (mx - rx) * ease;
      ry += (my - ry) * ease;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${hovering ? 1.25 : 1})`;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", checkHover, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", checkHover);
    };
  }, [hidden, hovering]);

  if (isCoarsePointer()) return null;

  return (
    <>
      <div ref={ringRef} className={`custom-cursor-ring ${hidden ? "opacity-0" : "opacity-100"}`} />
      <div ref={dotRef} className={`custom-cursor-dot ${hidden ? "opacity-0" : "opacity-100"}`} />
    </>
  );
};

export default Cursor;
