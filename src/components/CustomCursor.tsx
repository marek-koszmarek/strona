import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;
    let ringOffset = 24;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - ringOffset}px, ${ringY - ringOffset}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hovering =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('a') ||
        !!target.closest('button');

      if (dotRef.current) {
        dotRef.current.style.width = hovering ? '18px' : '12px';
        dotRef.current.style.height = hovering ? '18px' : '12px';
      }
      if (ringRef.current) {
        ringOffset = hovering ? 31 : 24;
        ringRef.current.style.opacity = hovering ? '0.8' : '0.3';
        ringRef.current.style.width = hovering ? '62px' : '48px';
        ringRef.current.style.height = hovering ? '62px' : '48px';
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transition: 'width 0.2s, height 0.2s', willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-12 h-12 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference opacity-30"
        style={{ transition: 'opacity 0.3s, width 0.3s, height 0.3s', willChange: 'transform' }}
      />
    </>
  );
}
