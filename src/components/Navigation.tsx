import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface Bolt {
  path: string;
  opacity: number;
  width: number;
  color: string;
}

const LightningText = ({ text, isActive, onClick }: { text: string, isActive: boolean, onClick: () => void }) => {
  const [bolts, setBolts] = useState<Bolt[]>([]);

  useEffect(() => {
    // Disable lightning animation on touch devices for performance
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let animationFrameId: number;
    let lastTime = 0;
    let burstStartTime = 0;
    let isBursting = false;

    const colors = ["#0ea5e9", "#38bdf8", "#7dd3fc", "#ffffff"];

    const generateLightning = () => {
      const newBolts: Bolt[] = [];
      const numBolts = Math.floor(Math.random() * 3) + 1; // 1 to 3 main bolts
      
      for (let i = 0; i < numBolts; i++) {
        // Start at random points along the text width
        let startX = Math.random() * 20; 
        let startY = 40 + Math.random() * 20;
        let path = `M ${startX},${startY}`;
        let x = startX;
        let y = startY;

        // Target a point further down the text
        const targetX = x + 30 + Math.random() * 50;
        
        while (x < targetX && x < 100) {
          const stepX = 2 + Math.random() * 6;
          x += stepX;
          
          // Erratic jumps, but tending towards the center
          const deviation = (Math.random() - 0.5) * 50;
          y = 50 + deviation;
          
          // Keep within bounds
          if (y < 5) y = 5 + Math.random() * 10;
          if (y > 95) y = 95 - Math.random() * 10;
          
          path += ` L ${x},${y}`;
          
          // Occasionally branch
          if (Math.random() > 0.75) {
            let bx = x;
            let by = y;
            let branchPath = `M ${bx},${by}`;
            for(let j=0; j<3; j++) {
               bx += 2 + Math.random() * 5;
               by += (Math.random() - 0.5) * 30;
               branchPath += ` L ${bx},${by}`;
            }
            newBolts.push({
              path: branchPath,
              opacity: Math.random() * 0.4 + 0.1,
              width: Math.random() * 0.6 + 0.2,
              color: colors[Math.floor(Math.random() * colors.length)]
            });
          }
        }
        
        newBolts.push({
          path,
          opacity: Math.random() * 0.7 + 0.3, 
          width: Math.random() * 1.5 + 0.5, 
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      return newBolts;
    };

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;

      if (isBursting) {
        // Burst lasts 50-200ms
        if (time - burstStartTime > 50 + Math.random() * 150) {
          isBursting = false;
          setBolts([]);
        } else {
          // Flicker rapidly during burst (every ~30ms)
          if (time - lastTime > 30) {
            setBolts(Math.random() > 0.2 ? generateLightning() : []);
            lastTime = time;
          }
        }
      } else {
        // Randomly start a burst
        if (Math.random() > 0.96) { // ~4% chance per frame to start a burst
          isBursting = true;
          burstStartTime = time;
          lastTime = time;
          setBolts(generateLightning());
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <Link
      to="/ai-support"
      onClick={onClick}
      className={`relative inline-block text-[clamp(2.5rem,11vw,8rem)] sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter hover:text-white transition-colors duration-300 group ${
        isActive ? 'text-white' : 'text-white/20'
      }`}
    >
      <span className="relative z-10">{text}</span>
      
      {/* Lightning Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none mix-blend-screen">
        <svg className="absolute w-[120%] h-[150%] -left-[10%] -top-[25%]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glow)">
            {bolts.map((bolt, i) => (
              <path
                key={i}
                d={bolt.path}
                fill="none"
                stroke={bolt.color}
                strokeWidth={bolt.width}
                opacity={bolt.opacity}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </g>
        </svg>
      </div>
    </Link>
  );
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'LUŹNO&', path: '/' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: t('Kompetencje', 'Expertise'), path: '/kompetencje' },
    { name: t('Wizja', 'Vision'), path: '/wizja' },
    { name: 'AI Support', path: '/ai-support' },
    { name: t('Kontakt', 'Contact'), path: '/kontakt' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 sm:px-8 py-6 sm:py-8 flex justify-between items-center mix-blend-difference text-white">
        <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl font-bold tracking-tighter uppercase z-[101]">
          Luzno.
        </Link>

        {/* Language Switcher */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-4 z-[101]">
          <button 
            onClick={() => setLanguage('pl')}
            className={`text-2xl min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-300 hover:scale-110 ${language === 'pl' ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
            title="Polski"
          >
            🇵🇱
          </button>
          <button 
            onClick={() => setLanguage('en')}
            className={`text-2xl min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-300 hover:scale-110 ${language === 'en' ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
            title="English"
          >
            🇬🇧
          </button>
        </div>

        <button 
          onClick={toggleMenu}
          className="text-sm font-medium uppercase tracking-widest z-[101] hover:opacity-70 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-end"
        >
          {isOpen ? t('Zamknij', 'Close') : 'Menu'}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#0a0a0a] z-[90] flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <div key={link.path} className="overflow-hidden">
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 + i * 0.05 }}
                    >
                      {link.path === '/ai-support' ? (
                        <LightningText 
                          text={link.name} 
                          isActive={isActive} 
                          onClick={() => setIsOpen(false)} 
                        />
                      ) : (
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`text-[clamp(2.5rem,11vw,8rem)] sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter hover:text-white transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-white/20'
                          }`}
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
