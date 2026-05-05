import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SmokeBackground from '../components/SmokeBackground';
import { Palette } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

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

const LogoDisplay = ({ client }: { key?: string; client: any }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="font-display text-sm md:text-base tracking-widest font-light text-white/50 uppercase text-center">
        {client.name}
      </div>
    );
  }

  return (
    <img 
      src={client.src} 
      alt={client.name} 
      loading="lazy"
      className="h-6 md:h-8 object-contain opacity-50 brightness-0 invert mx-auto"
      onError={() => setError(true)}
    />
  );
};

const ClientLogosGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();
  const itemsPerPage = 6;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + itemsPerPage) % CLIENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentClients = [];
  for (let i = 0; i < itemsPerPage; i++) {
    currentClients.push(CLIENTS[(currentIndex + i) % CLIENTS.length]);
  }

  return (
    <div className="mt-16 md:mt-24 w-full">
      <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8 font-bold">{t('Zaufali nam', 'Trusted by')}</div>
      <div className="relative min-h-[100px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 items-center"
          >
            {currentClients.map((client, i) => (
              <LogoDisplay key={`${client.name}-${currentIndex}-${i}`} client={client} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [stars, setStars] = useState<number[]>([]);
  const { t } = useLanguage();
  
  // Snap scrolling logic
  useEffect(() => {
    let isSnapping = false;
    let snapTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      const lenis = (window as any).lenis;
      if (!lenis) return;

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const tolerance = 10;

      // Between Section 1 and Section 2
      if (scrollY < vh - tolerance) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isSnapping) return;
        
        const direction = e.deltaY > 0 ? 1 : -1;
        const target = direction === 1 ? vh : 0;
        
        isSnapping = true;
        lenis.scrollTo(target, {
          duration: 1.2,
          lock: true,
          onComplete: () => { 
            snapTimeout = setTimeout(() => { isSnapping = false; }, 50);
          }
        });
      } 
      // At Section 2, scrolling UP
      else if (Math.abs(scrollY - vh) <= tolerance && e.deltaY < 0) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isSnapping) return;
        
        isSnapping = true;
        lenis.scrollTo(0, {
          duration: 1.2,
          lock: true,
          onComplete: () => { 
            snapTimeout = setTimeout(() => { isSnapping = false; }, 50);
          }
        });
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const lenis = (window as any).lenis;
      if (!lenis) return;

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const tolerance = 10;
      
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      if (Math.abs(deltaY) > 50) {
        if (scrollY < vh - tolerance) {
          e.preventDefault();
          e.stopPropagation();
          
          if (isSnapping) return;
          
          const direction = deltaY > 0 ? 1 : -1;
          const target = direction === 1 ? vh : 0;
          
          isSnapping = true;
          lenis.scrollTo(target, {
            duration: 1.2,
            lock: true,
            onComplete: () => { 
              snapTimeout = setTimeout(() => { isSnapping = false; }, 50);
            }
          });
        } else if (Math.abs(scrollY - vh) <= tolerance && deltaY < 0) {
          e.preventDefault();
          e.stopPropagation();
          
          if (isSnapping) return;
          
          isSnapping = true;
          lenis.scrollTo(0, {
            duration: 1.2,
            lock: true,
            onComplete: () => { 
              snapTimeout = setTimeout(() => { isSnapping = false; }, 50);
            }
          });
        }
      }
    };

    // Use capture phase to intercept events before Lenis does
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true } as any);
      window.removeEventListener('touchstart', handleTouchStart, { capture: true } as any);
      window.removeEventListener('touchmove', handleTouchMove, { capture: true } as any);
      clearTimeout(snapTimeout);
    };
  }, []);

  const handleSectionClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    
    setTimeout(() => {
      setStars(prev => [...prev, Date.now()]);
    }, 2000);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="bg-[#050505] min-h-[100dvh] relative overflow-hidden"
      ref={containerRef}
    >
      <SEO 
        title="Luźno | Najlepsza Agencja Kreatywna, Digital i Social Media"
        description="Luźno to agencja kreatywna i digitalowa. Tworzymy innowacyjne kampanie social media, strategie komunikacji i rozwiązania oparte na AI."
      />
      <SmokeBackground paletteIndex={paletteIndex} />

      {/* Hero Section */}
      <section className="h-[100dvh] flex flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-24 relative z-10">
        <motion.div style={{ y: y1, opacity, scale }} className="w-full flex flex-col">
          <div className="overflow-hidden mb-2 pt-4 -mt-4 pr-4 sm:pr-8 w-fit">
            <motion.h1 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              className="text-[clamp(3.5rem,14vw,9rem)] sm:text-[11vw] md:text-7xl lg:text-[7vw] xl:text-[6.5vw] 2xl:text-[5.5vw] leading-[0.85] font-black tracking-tighter text-white whitespace-nowrap"
            >
              {t('JAKOŚCI', 'QUALITY')}
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-2 pt-4 -mt-4 pr-4 sm:pr-8 w-fit">
            <motion.h1 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
              className="text-[clamp(3.5rem,14vw,9rem)] sm:text-[11vw] md:text-7xl lg:text-[7vw] xl:text-[6.5vw] 2xl:text-[5.5vw] leading-[0.85] font-black tracking-tighter text-white/40 whitespace-nowrap"
            >
              {t('NIE TRZEBA', 'NEEDS NO')}
            </motion.h1>
          </div>
          <div className="overflow-hidden pt-4 -mt-4 pr-4 sm:pr-8 relative z-20 w-fit">
            <motion.h1 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
              className="text-[clamp(3.5rem,14vw,9rem)] sm:text-[11vw] md:text-7xl lg:text-[7vw] xl:text-[6.5vw] 2xl:text-[5.5vw] leading-[0.85] font-black tracking-tighter text-white whitespace-nowrap"
            >
              {t('TŁUMACZYĆ.', 'EXPLANATION.')}
            </motion.h1>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-6 sm:left-8 md:left-16 lg:left-24 flex items-center gap-4 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium text-white/40"
        >
          <div className="w-12 sm:w-16 h-[1px] bg-white/40" />
          {t('Scrolluj w dół', 'Scroll down')}
        </motion.div>
      </section>

      {/* Secondary Section - Intro */}
      <section 
        className="min-h-[100dvh] flex items-center px-6 sm:px-8 md:px-16 lg:px-24 relative z-10 py-24 cursor-default"
        onClick={handleSectionClick}
      >
        {/* Shooting Stars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <AnimatePresence>
            {stars.map(id => (
              <motion.div
                key={id}
                initial={{ 
                  x: '-20vw',
                  y: '-20vw',
                  opacity: 0,
                  rotate: 45
                }}
                animate={{ 
                  x: '100vw',
                  y: '100vw',
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 1.5, ease: "linear" }}
                className="absolute top-[5%] left-[5%] w-[120px] h-[1px] bg-gradient-to-r from-transparent to-white origin-left drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                onAnimationComplete={() => setStars(prev => prev.filter(starId => starId !== id))}
              >
                {/* Star Head */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_16px_4px_rgba(255,255,255,1)]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 w-full items-center pb-24 lg:pb-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-5 h-[40vh] md:h-[60vh] lg:h-[80vh] w-full relative flex items-center justify-center"
          >
            <div 
              className="absolute inset-0 w-full h-full mix-blend-luminosity opacity-70"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)'
              }}
            >
              <img 
                src="https://picsum.photos/seed/agency/1920/1080?grayscale" 
                alt="Agency team" 
                loading="lazy"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          <motion.div 
            style={{ y: y2 }}
            className="lg:col-span-6 lg:col-start-7"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-8 md:mb-12 tracking-tight">
              {t('Jesteśmy agencją, która od ponad ', 'We are an agency that has been ')}
              <span className="font-bold italic">{t('7 lat dowozi', 'delivering the goods for over 7 years')}</span>.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed mb-4 max-w-2xl font-light">
              {t('Pracujemy z najlepszymi markami nad doskonałym zrozumieniem ich odbiorców i tworzeniem celowanej komunikacji, której interpretacja nie jest po emisji dla nikogo zaskoczeniem.', 'We work with top brands to perfectly understand their audience and create targeted communication whose interpretation is never a surprise after launch.')}
            </p>
            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-10 md:mb-16 max-w-2xl font-medium">
              {t('Szukasz najlepszej agencji kreatywnej? Luźno to agencja digital, która łączy innowacyjne strategie z efektywnym performance marketingiem.', 'Looking for the best creative agency? Luźno is a digital agency that combines innovative strategies with effective performance marketing.')}
            </p>
            
            <Link to="/kontakt" className="group relative inline-block px-10 py-5 overflow-hidden rounded-full border border-white/20 hover:border-white transition-colors duration-500">
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-[0.76,0,0.24,1]" />
              <span className="relative z-10 text-xs uppercase tracking-[0.2em] font-bold group-hover:text-black transition-colors duration-500">
                {t('Rozpocznij współpracę', 'Start a project')}
              </span>
            </Link>

            <ClientLogosGrid />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          viewport={{ once: true }}
          className="absolute bottom-8 md:bottom-12 left-6 sm:left-8 md:left-16 lg:left-24 right-6 sm:right-8 md:right-16 lg:right-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[9px] sm:text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-white/70"
        >
          <div className="leading-relaxed md:leading-normal">
            {t('STRATEGIA · DESIGN · COPYWRITING · SOCIAL MEDIA · MEDIA BUYING · PERFORMANCE', 'STRATEGY · DESIGN · COPYWRITING · SOCIAL MEDIA · MEDIA BUYING · PERFORMANCE')}
          </div>
          <div className="flex items-center gap-4 sm:gap-6 mt-2 md:mt-0">
            <a 
              href="https://www.linkedin.com/company/lu%C5%BAno-digital-branding/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LINKEDIN
            </a>
            <span>© 2026 LUŹNO&</span>
          </div>
        </motion.div>
      </section>

      {/* Heartbeat Palette Button */}
      <motion.button
        onClick={() => setPaletteIndex(p => p + 1)}
        animate={{ 
          scale: [1, 1.15, 1, 1.15, 1],
          boxShadow: [
            "0px 0px 0px 0px rgba(244, 63, 94, 0)",
            "0px 0px 20px 10px rgba(244, 63, 94, 0.4)",
            "0px 0px 0px 0px rgba(244, 63, 94, 0)",
            "0px 0px 20px 10px rgba(244, 63, 94, 0.4)",
            "0px 0px 0px 0px rgba(244, 63, 94, 0)"
          ]
        }}
        transition={{ 
          duration: 0.8, 
          repeat: Infinity, 
          repeatDelay: 0.2,
          times: [0, 0.15, 0.3, 0.45, 0.6] 
        }}
        className="fixed bottom-8 right-8 z-50 p-4 bg-rose-500/20 backdrop-blur-md border border-rose-500/50 rounded-full text-rose-400 hover:bg-rose-500/40 hover:text-rose-300 transition-colors"
        aria-label={t('Zmień kolor dymu', 'Change smoke color')}
      >
        <Palette className="w-6 h-6" />
      </motion.button>

    </motion.main>
  );
}
