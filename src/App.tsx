import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { LanguageProvider } from './context/LanguageContext';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Competencies = lazy(() => import('./pages/Competencies'));
const Vision = lazy(() => import('./pages/Vision'));
const AISupport = lazy(() => import('./pages/AISupport'));
const OldApp = lazy(() => import('./OldApp'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-[100dvh] bg-[#050505] flex items-center justify-center text-white">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence 
        mode="wait" 
        onExitComplete={() => {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo(0, 0);
          }
        }}
      >
        <motion.div key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/kompetencje" element={<Competencies />} />
            <Route path="/wizja" element={<Vision />} />
            <Route path="/ai-support" element={<AISupport />} />
            <Route path="/old" element={<OldApp />} />
            <Route path="/kontakt" element={<Contact />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Expose lenis globally for custom scroll behaviors
    (window as any).lenis = lenis;

    // Scroll to top on initial load
    lenis.scrollTo(0, { immediate: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <div className="bg-[#050505] text-[#f5f5f5] min-h-[100dvh] font-sans selection:bg-white selection:text-black">
          <Preloader />
          <CustomCursor />
          <Navigation />
          <AnimatedRoutes />
        </div>
      </Router>
    </LanguageProvider>
  );
}
