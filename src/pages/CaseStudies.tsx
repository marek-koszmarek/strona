import { motion } from 'motion/react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

// Wszystkie zdjęcia ze wszystkich projektów — flat array
const ALL_IMAGES: { src: string; alt: string }[] = [
  // M1 / EPP
  { src: '/M1/m1_1.webp', alt: 'EPP' },
  { src: '/M1/m1_2.webp', alt: 'EPP' },
  { src: '/M1/m1_3.webp', alt: 'EPP' },
  { src: '/M1/m1_4.webp', alt: 'EPP' },
  // SentiOne
  { src: '/SentiOne/sentione_1.webp', alt: 'SentiOne' },
  { src: '/SentiOne/sentione_2.webp', alt: 'SentiOne' },
  { src: '/SentiOne/sentione_3.webp', alt: 'SentiOne' },
  { src: '/SentiOne/sentione_4.webp', alt: 'SentiOne' },
  // Komisja Europejska
  { src: '/Komisja%20europejska/komisja_1.webp', alt: 'Komisja Europejska' },
  { src: '/Komisja%20europejska/komisja_2.webp', alt: 'Komisja Europejska' },
  { src: '/Komisja%20europejska/komisja_3.webp', alt: 'Komisja Europejska' },
  { src: '/Komisja%20europejska/komisja_4.webp', alt: 'Komisja Europejska' },
  // Building Companion
  { src: '/Builing%20companion/buildingcompanion_1.webp', alt: 'Building Companion' },
  { src: '/Builing%20companion/buildingcompanion_2.webp', alt: 'Building Companion' },
  { src: '/Builing%20companion/buildingcompanion_3.webp', alt: 'Building Companion' },
  { src: '/Builing%20companion/buildingcompanion_4.webp', alt: 'Building Companion' },
  // Monting
  { src: '/Monting/monting_1.webp', alt: 'Monting Development' },
  { src: '/Monting/monting_2.webp', alt: 'Monting Development' },
  { src: '/Monting/monting_3.webp', alt: 'Monting Development' },
  { src: '/Monting/monting_4.webp', alt: 'Monting Development' },
  // Bean and Buddies
  { src: '/Bean/beanandbuddies_1.webp', alt: 'Bean and Buddies' },
  { src: '/Bean/beanandbuddies_2.webp', alt: 'Bean and Buddies' },
  { src: '/Bean/beanandbuddies_3.webp', alt: 'Bean and Buddies' },
  { src: '/Bean/beanandbuddies_4.webp', alt: 'Bean and Buddies' },
  // Portman Lights
  { src: '/Portman%20Lights/portman_1.webp', alt: 'Portman Lights' },
  { src: '/Portman%20Lights/portman_2.webp', alt: 'Portman Lights' },
  { src: '/Portman%20Lights/portman_3.webp', alt: 'Portman Lights' },
  { src: '/Portman%20Lights/portman_4.webp', alt: 'Portman Lights' },
  // Punkta
  { src: '/Punkta/punkta_1.webp', alt: 'Punkta' },
  { src: '/Punkta/punkta_2.webp', alt: 'Punkta' },
  { src: '/Punkta/punkta_3.webp', alt: 'Punkta' },
  { src: '/Punkta/punkta_4.webp', alt: 'Punkta' },
  // eN Studios
  { src: '/eN%20Studios/enstudios_1.webp', alt: 'En Studios' },
  { src: '/eN%20Studios/enstudios_2.webp', alt: 'En Studios' },
  { src: '/eN%20Studios/enstudios_3.webp', alt: 'En Studios' },
  { src: '/eN%20Studios/enstudios_4.webp', alt: 'En Studios' },
  // Luba
  { src: '/Luba/luba_1.webp', alt: 'Luba Group' },
  { src: '/Luba/luba_2.webp', alt: 'Luba Group' },
  { src: '/Luba/luba_3.webp', alt: 'Luba Group' },
  { src: '/Luba/luba_4.webp', alt: 'Luba Group' },
  // Archicom
  { src: '/Archicom/archicom_1.webp', alt: 'Archicom' },
  { src: '/Archicom/archicom_2.webp', alt: 'Archicom' },
  { src: '/Archicom/archicom_3.webp', alt: 'Archicom' },
  { src: '/Archicom/archicom_4.webp', alt: 'Archicom' },
];

export default function CaseStudies() {
  const { t } = useLanguage();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="bg-[#050505] min-h-[100dvh] text-white pt-32 pb-24 px-6 sm:px-8 md:px-16 lg:px-24"
    >
      <SEO
        title="Case Studies | Luźno Agency"
        description="Nasze realizacje — kampanie, strategie i projekty dla topowych marek."
      />

      {/* Nagłówek */}
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-white/30" />
          <span className="text-sm font-mono uppercase tracking-[0.2em] text-white/50">
            {t('Nasze realizacje', 'Our works')}
          </span>
        </div>
        <h1 className="text-[clamp(3.5rem,14vw,9rem)] leading-[0.85] font-black tracking-tighter uppercase">
          {t('Prace', 'Work')}
        </h1>
      </div>

      {/* Instagram-style grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2"
      >
        {ALL_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.02 }}
            className="aspect-square overflow-hidden bg-white/5 relative group"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover grayscale opacity-70 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </motion.div>

    </motion.main>
  );
}
