import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const PRELOADER_IMAGES = [
  "/zbiorczo/sentione_1.webp",
  "/zbiorczo/monting_1.webp",
  "/zbiorczo/portman_1.webp",
  "/zbiorczo/punkta_1.webp",
  "/zbiorczo/mmaniak_3.webp",
];

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();
  const location = useLocation();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // Only show preloader on initial load of the home page
    if (location.pathname !== '/' || !isFirstLoad.current) {
      setIsLoading(false);
      return;
    }

    isFirstLoad.current = false;

    // Preload images
    PRELOADER_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Rapid image switching interval
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % PRELOADER_IMAGES.length);
    }, 150); // Fast switching for abstract effect

    // Progress bar interval
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2; // Adjust speed here
      });
    }, 50);

    // Total loading time
    const timeout = setTimeout(() => {
      setIsLoading(false);
      clearInterval(imageInterval);
      clearInterval(progressInterval);
    }, 3000); // 3 seconds total duration

    return () => {
      clearTimeout(timeout);
      clearInterval(imageInterval);
      clearInterval(progressInterval);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Abstract Image Showreel */}
          <div className="absolute inset-0 w-full h-full opacity-30 mix-blend-screen overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={PRELOADER_IMAGES[currentImageIndex]}
                initial={{ scale: 1.2, opacity: 0, filter: 'blur(10px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                exit={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Preloader abstract"
              />
            </AnimatePresence>
            
            {/* Overlay gradients for abstract feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-90" />
          </div>

          {/* Glitch Text Effect */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white font-black text-4xl md:text-6xl tracking-tighter mix-blend-difference"
            >
              <span className="relative inline-block">
                LUŹNO
                <motion.span
                  animate={{ 
                    x: [-2, 2, -2, 0],
                    y: [1, -1, 1, 0],
                    opacity: [0.5, 1, 0.5, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 0.2, repeatType: 'mirror' }}
                  className="absolute top-0 left-[2px] text-red-500 mix-blend-screen opacity-50"
                >
                  LUŹNO
                </motion.span>
                <motion.span
                  animate={{ 
                    x: [2, -2, 2, 0],
                    y: [-1, 1, -1, 0],
                    opacity: [0.5, 1, 0.5, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 0.2, repeatType: 'mirror', delay: 0.1 }}
                  className="absolute top-0 left-[-2px] text-blue-500 mix-blend-screen opacity-50"
                >
                  LUŹNO
                </motion.span>
              </span>
            </motion.div>

            {/* Loading Progress */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="text-white/50 text-xs font-mono tracking-widest">
                {progress}%
              </div>
              <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-white"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
