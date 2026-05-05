import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
      {/* Expanding ring on hover */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
        animate={
          isHovering
            ? {
                x: mousePosition.x - 24,
                y: mousePosition.y - 24,
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3],
                boxShadow: [
                  "0px 0px 0px 0px rgba(255,255,255,0)",
                  "0px 0px 20px 5px rgba(255,255,255,0.6)",
                  "0px 0px 0px 0px rgba(255,255,255,0)"
                ],
                backgroundColor: 'rgba(255, 255, 255, 0)'
              }
            : {
                x: mousePosition.x - 24,
                y: mousePosition.y - 24,
                scale: 1,
                opacity: 0.3,
                boxShadow: "0px 0px 0px 0px rgba(255,255,255,0)",
                backgroundColor: 'rgba(255, 255, 255, 0)'
              }
        }
        transition={
          isHovering
            ? {
                x: { type: 'spring', stiffness: 150, damping: 15, mass: 0.5 },
                y: { type: 'spring', stiffness: 150, damping: 15, mass: 0.5 },
                scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }
            : { type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }
        }
      />
    </>
  );
}
