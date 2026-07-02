import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const dotX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });

  const ringX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
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
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: -6,
          translateY: -6,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: -24,
          translateY: -24,
        }}
        animate={
          isHovering
            ? {
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3],
                boxShadow: [
                  '0px 0px 0px 0px rgba(255,255,255,0)',
                  '0px 0px 20px 5px rgba(255,255,255,0.6)',
                  '0px 0px 0px 0px rgba(255,255,255,0)',
                ],
                backgroundColor: 'rgba(255, 255, 255, 0)',
              }
            : {
                scale: 1,
                opacity: 0.3,
                boxShadow: '0px 0px 0px 0px rgba(255,255,255,0)',
                backgroundColor: 'rgba(255, 255, 255, 0)',
              }
        }
        transition={
          isHovering
            ? {
                scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                boxShadow: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
              }
            : {}
        }
      />
    </>
  );
}
