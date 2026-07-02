import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const PALETTES = [
  ['bg-purple-600', 'bg-pink-600', 'bg-indigo-600'], // Default/violet
  ['bg-zinc-600', 'bg-zinc-800', 'bg-zinc-500'], // subtle/grey
  ['bg-blue-600', 'bg-teal-500', 'bg-cyan-600'],
  ['bg-orange-600', 'bg-red-600', 'bg-yellow-500'],
  ['bg-emerald-600', 'bg-green-500', 'bg-teal-600'],
];

export default function SmokeBackground({ paletteIndex }: { paletteIndex: number }) {
  const colors = PALETTES[paletteIndex % PALETTES.length];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const gpu = { willChange: 'transform', transform: 'translateZ(0)' } as const;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#050505]">
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-10"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      <motion.div
        style={gpu}
        animate={isMobile
          ? { x: ['-10%', '10%', '-10%'], y: ['-10%', '10%', '-10%'] }
          : { x: ['-20%', '20%', '-20%'], y: ['-20%', '20%', '-20%'] }
        }
        transition={{ duration: isMobile ? 30 : 24, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute top-[-10%] left-[-10%] w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] rounded-full ${isMobile ? 'opacity-20 blur-[60px]' : 'mix-blend-screen filter blur-[80px] opacity-40'} transition-colors duration-1000 ${colors[0]}`}
      />
      <motion.div
        style={gpu}
        animate={isMobile
          ? { x: ['10%', '-10%', '10%'], y: ['10%', '-10%', '10%'] }
          : { x: ['20%', '-20%', '20%'], y: ['20%', '-20%', '20%'] }
        }
        transition={{ duration: isMobile ? 35 : 30, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute bottom-[-10%] right-[-10%] w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] rounded-full ${isMobile ? 'opacity-15 blur-[70px]' : 'mix-blend-screen filter blur-[90px] opacity-30'} transition-colors duration-1000 ${colors[1]}`}
      />
      <motion.div
        style={gpu}
        animate={isMobile
          ? { x: ['0%', '5%', '0%'], y: ['0%', '-5%', '0%'] }
          : { x: ['0%', '30%', '-30%', '0%'], y: ['30%', '0%', '-30%', '30%'] }
        }
        transition={{ duration: isMobile ? 40 : 36, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute top-[20%] left-[20%] w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] rounded-full ${isMobile ? 'opacity-15 blur-[60px]' : 'mix-blend-screen filter blur-[80px] opacity-30'} transition-colors duration-1000 ${colors[2]}`}
      />
    </div>
  );
}
