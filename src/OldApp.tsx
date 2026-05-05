/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from 'motion/react';
import { Mail, Settings2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const FILTERS = [
  { id: 'dreamy', name: 'Dreamy Blur (Default)', class: 'blur-md saturate-50 brightness-110 mix-blend-screen opacity-40' },
  { id: 'noir', name: 'Noir', class: 'grayscale contrast-125 brightness-75 mix-blend-screen opacity-50' },
  { id: 'sepia', name: 'Warm Sepia', class: 'sepia contrast-125 brightness-75 mix-blend-screen opacity-60' },
  { id: 'cyberpunk', name: 'Cyberpunk', class: 'hue-rotate-90 saturate-200 contrast-125 brightness-75 mix-blend-screen opacity-50' },
  { id: 'glitch', name: 'Subtle Glitch', class: 'glitch-effect' },
  { id: 'raw', name: 'Raw Minimal', class: 'opacity-30' },
];

const CLIENTS = [
  { name: 'Peel Mission', src: '/logos/peel-mission.png' },
  { name: 'Echo Investment', src: '/logos/echo-investment.png' },
  { name: 'Archicom', src: '/logos/archicom.png' },
  { name: 'Smartaero Flight Academy', src: '/logos/smartaero.png' },
  { name: 'Idylla Fundacja', src: '/logos/idylla.png' },
  { name: 'EPP', src: '/logos/epp.png' },
  { name: 'Asseco', src: '/logos/asseco.png' },
  { name: 'Concordia Design', src: '/logos/concordia.png' },
  { name: 'Metro Properties', src: '/logos/metro.png' },
  { name: 'Komisja Europejska', src: '/logos/komisja-europejska.png' },
  { name: 'Xella', src: '/logos/xella.png' },
  { name: 'Polskie Koleje Linowe PKL', src: '/logos/pkl.png' },
  { name: 'Punkta', src: '/logos/punkta.png' },
  { name: 'SentiOne', src: '/logos/sentione.png' },
  { name: 'BEAN & BUDDIES', src: '/logos/bean-buddies.png' },
  { name: 'MMANIAK.PL', src: '/logos/mmaniak.png' },
  { name: 'TRAVEL TECH', src: '/logos/travel-tech.png' },
  { name: 'ONET.PL', src: '/logos/onet.png' },
  { name: 'LUBA GROUP', src: '/logos/luba-group.png' },
  { name: 'REMMED VISION', src: '/logos/remmed-vision.png' },
  { name: 'DAX COSMETICS', src: '/logos/dax-cosmetics.png' },
  { name: 'POLPHARMA', src: '/logos/polpharma.png' },
];

const LogoDisplay = ({ client }: { client: any }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="font-display text-2xl md:text-3xl tracking-widest font-light text-white/80 uppercase">
        {client.name}
      </div>
    );
  }

  return (
    <img 
      src={client.src} 
      alt={client.name} 
      className="h-8 md:h-12 object-contain opacity-80 brightness-0 invert"
      onError={() => setError(true)}
    />
  );
};

const ClientLogos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CLIENTS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.2 }}
      className="mt-16 md:mt-24"
    >
      <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-6 font-bold">Zaufali nam</div>
      <div className="relative h-12 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute left-0 flex items-center"
          >
            <LogoDisplay client={CLIENTS[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FluidBackground = ({ filterClass }: { filterClass: string }) => {
  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0a] overflow-hidden">
      <style>{`
        @keyframes intermittent-glitch {
          0%, 92% { transform: translate(0, 0) scale(1); filter: contrast(1) hue-rotate(0deg); }
          92.5% { transform: translate(-10px, 5px) scale(1.02) skewX(2deg); filter: contrast(1.5) hue-rotate(45deg); }
          93% { transform: translate(10px, -5px) scale(1.02) skewX(-2deg); filter: contrast(1.5) hue-rotate(-45deg); }
          93.5% { transform: translate(0, 0) scale(1) skewX(0deg); filter: contrast(1) hue-rotate(0deg); }
          96% { transform: translate(0, 0) scale(1); filter: contrast(1) hue-rotate(0deg); }
          96.5% { transform: translate(-5px, 10px) scale(1.01) skewY(2deg); filter: contrast(1.2) hue-rotate(90deg); }
          97% { transform: translate(5px, -10px) scale(1.01) skewY(-2deg); filter: contrast(1.2) hue-rotate(-90deg); }
          97.5%, 100% { transform: translate(0, 0) scale(1) skewY(0deg); filter: contrast(1) hue-rotate(0deg); }
        }
        .glitch-effect {
          animation: intermittent-glitch 7s infinite;
          opacity: 0.6;
          mix-blend-mode: screen;
        }
      `}</style>
      <div className={`absolute inset-0 transition-all duration-1000 ${filterClass}`}>
        <motion.div
          animate={{ x: ['0%', '8%', '-4%', '0%'], y: ['0%', '-10%', '5%', '0%'], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-violet-900/60 rounded-full mix-blend-screen blur-[120px]"
        />
        <motion.div
          animate={{ x: ['0%', '-8%', '6%', '0%'], y: ['0%', '12%', '-6%', '0%'], scale: [1, 1.05, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] -right-[10%] w-[70%] h-[90%] bg-fuchsia-900/50 rounded-full mix-blend-screen blur-[140px]"
        />
        <motion.div
          animate={{ x: ['0%', '6%', '-8%', '0%'], y: ['0%', '-8%', '10%', '0%'], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] left-[10%] w-[90%] h-[70%] bg-blue-900/50 rounded-full mix-blend-screen blur-[130px]"
        />
        <motion.div
          animate={{ x: ['0%', '-6%', '8%', '0%'], y: ['0%', '10%', '-8%', '0%'], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[10%] w-[60%] h-[60%] bg-indigo-900/60 rounded-full mix-blend-screen blur-[100px]"
        />
      </div>
      {/* Noise texture overlay for that modern premium agency look */}
      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>
      {/* Gradient overlay to ensure text readability with gentle drift */}
      <motion.div 
        animate={{ y: ['-5%', '5%', '-5%'], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-[10%] bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none"
      />
    </div>
  );
};

export default function App() {
  const [filterIdx, setFilterIdx] = useState(0);
  const [showControls, setShowControls] = useState(false);

  return (
    <div className="relative w-full h-screen bg-[#050505] text-white font-sans overflow-hidden">
      {/* Background Video */}
      <FluidBackground filterClass={FILTERS[filterIdx].class} />

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full p-8 md:p-16 pointer-events-none">
        <div className="h-full flex flex-col justify-between pointer-events-auto">
          {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div className="font-display text-4xl font-bold tracking-tighter">
            LUŹNO&
          </div>
          <div className="flex items-center gap-3 text-sm uppercase tracking-widest">
            {/* Violet Heartbeat Dot */}
            <motion.div
              animate={{ 
                scale: [1, 1.25, 1, 1.25, 1, 1], 
                opacity: [0.5, 1, 0.5, 1, 0.5, 0.5] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.2, 
                times: [0, 0.15, 0.3, 0.45, 0.6, 1],
                ease: "easeInOut" 
              }}
              className="w-2 h-2 bg-violet-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]"
            />
            Rebranding in progress
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6"
          >
            ROBIMY TO LUŹNO.<br />NA NOWO.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="text-lg md:text-xl font-light leading-relaxed mb-10 opacity-90 max-w-2xl"
          >
            Jesteśmy zespołem, który od ponad 7 lat po prostu dowozi. Właśnie przebudowujemy nasz cyfrowy dom, ale biznes kręci się dalej. Napisz do nas i zróbmy razem dobro w digitalu.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.98 }}
            href="mailto:marek@luzno.agency"
            className="inline-flex items-center gap-2 px-8 py-4 font-display text-sm md:text-base font-bold text-black bg-white rounded-full transition-colors hover:bg-gray-200"
          >
            <Mail className="w-5 h-5" />
            ZACZNIJMY PROJEKT
          </motion.a>

          <ClientLogos />
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs md:text-sm opacity-70"
        >
          <div className="uppercase tracking-widest">
            Strategia · Social Media · Design · Copywriting · Performance
          </div>
          <div>© 2026 LUŹNO&</div>
        </motion.footer>
        </div>
      </div>

      {/* Aesthetic Controls (Floating Bottom Right) */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        <motion.div 
          initial={false}
          animate={{ 
            opacity: showControls ? 1 : 0, 
            y: showControls ? 0 : 20, 
            pointerEvents: showControls ? 'auto' : 'none' 
          }}
          className="bg-black/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl text-xs flex flex-col gap-5 w-56 shadow-2xl"
        >
          <div>
            <div className="text-white/40 mb-3 font-bold tracking-widest uppercase text-[10px]">Color Filter</div>
            <div className="flex flex-col gap-1">
              {FILTERS.map((f, i) => (
                <button 
                  key={f.id} 
                  onClick={() => setFilterIdx(i)}
                  className={`text-left px-3 py-2 rounded-lg transition-all ${filterIdx === i ? 'bg-white/15 text-white font-medium' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.button 
          onClick={() => setShowControls(!showControls)}
          animate={{ 
            scale: [1, 1.25, 1, 1.25, 1, 1], 
            opacity: [0.5, 1, 0.5, 1, 0.5, 0.5] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.2, 
            times: [0, 0.15, 0.3, 0.45, 0.6, 1],
            ease: "easeInOut" 
          }}
          className="w-12 h-12 bg-violet-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)] flex items-center justify-center cursor-pointer"
          aria-label="Toggle Color Filter"
        >
          <Settings2 className="w-5 h-5 text-white" />
        </motion.button>
      </div>
    </div>
  );
}
