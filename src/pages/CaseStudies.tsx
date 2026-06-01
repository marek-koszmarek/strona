import { useMemo } from 'react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

// ─── Dane klientów ─────────────────────────────────────────────────────────────
// folder   = nazwa folderu w public/prace/ (lowercase)
// alt      = nazwa klienta (alt text / SEO)
// items    = lista "{numer}_{proporcja}" — proporcja czytana z sufiksu nazwy pliku
//            11 = 1:1 | 45 = 4:5 | 916 = 9:16 | 1910 = 19:10 | 43 = 4:3
// Pełna ścieżka pliku: /prace/{folder}/{folder}_{item}.webp
const CLIENTS: { folder: string; alt: string; items: string[] }[] = [
  { folder: 'archicom', alt: 'Archicom', items: ['1_45','2_1910','3_1910','4_1910','5_45','6_45','7_11','8_11','9_11','10_11','11_11','12_11','13_11','14_45','15_11','16_45','17_45','18_45','19_11','20_11','21_11','22_11','23_11','24_11','25_11','26_11','27_45','28_11','29_11','30_11','31_45','32_45','33_11','34_11','35_11','36_11','37_11','38_11','39_11','40_45','41_45','42_45'] },
  { folder: 'm1', alt: 'M1 / EPP', items: ['1_916','2_916','3_45','4_45','5_45','6_45','7_45','8_45','9_45','10_916','11_916','12_45','13_45','14_45','15_45','16_45','17_45','18_916','19_45','20_45','21_916','22_916','23_916','24_916','25_916','26_916','27_916','28_916','29_916','30_916','31_45','32_45','33_916','34_45'] },
  { folder: 'beanbuddies', alt: 'Bean & Buddies', items: ['1_11','2_11','3_11','4_11','5_11','6_11','7_11','8_11','9_11','10_11','11_11','12_11','13_11','14_11','15_11','16_11','17_11','18_11'] },
  { folder: 'building', alt: 'Building Companion', items: ['1_11','2_11','3_11','4_11','5_11','6_11','7_11','8_11'] },
  { folder: 'cityspace', alt: 'CitySpace', items: ['1_11','2_11','3_11','4_11','5_11','6_11','7_11','8_11','9_11','10_11','11_11','12_11','13_11','14_11','15_11','16_11','17_11','18_11'] },
  { folder: 'europodroze', alt: 'Europodróże', items: ['1_45','2_11','3_11','4_11','5_11','6_11','7_11','8_916','9_916','10_916','11_1910','12_1910','13_11','14_11','15_11','16_11','17_11','18_11','19_11','20_11','21_11','22_916','23_916','24_916'] },
  { folder: 'fitme', alt: 'FitMe', items: ['1_11','2_11','3_11','4_11','5_11','6_11','7_11','8_11','9_11','10_11','11_11','12_11'] },
  { folder: 'itaxi', alt: 'iTaxi', items: ['1_45','2_45','3_45','4_45','5_45','6_45','7_45','8_45','9_45'] },
  { folder: 'portman', alt: 'Portman Lights', items: ['1_11','2_11','3_11','4_11','5_11','6_11','7_11','8_11','9_11','10_11','11_11','12_11','13_11','14_11','15_11','16_11'] },
  { folder: 'pufy', alt: 'Pufy', items: ['1_11','2_11','3_11','4_11','5_11','6_11','7_11','8_11','9_11','10_11','11_11'] },
  { folder: 'pularys', alt: 'Pularys', items: ['1_45','2_45','3_45','4_45','5_45','6_45','7_45'] },
  { folder: 'punkta', alt: 'Punkta', items: ['1_11','2_11','3_11','4_11','5_11','6_11','7_11','8_11','9_11','10_11','11_11','12_11'] },
  { folder: 'remmed', alt: 'Remmed Vision', items: ['1_11','2_11','3_11','4_11','5_11','6_11'] },
  { folder: 'root7', alt: 'Root7', items: ['1_45','2_45','3_45','4_45','5_45','6_45','7_45','8_45','9_45','10_45','11_45','12_45'] },
];

// Sufiks proporcji → wartość CSS aspect-ratio
const RATIO_MAP: Record<string, string> = {
  '11': '1 / 1',
  '43': '4 / 3',
  '45': '4 / 5',
  '916': '9 / 16',
  '1910': '19 / 10',
};

type GalleryImage = { src: string; alt: string; ratio: string };

// Spłaszcza CLIENTS → płaska lista wszystkich zdjęć z gotową ścieżką i proporcją
function buildImages(): GalleryImage[] {
  const out: GalleryImage[] = [];
  for (const { folder, alt, items } of CLIENTS) {
    for (const item of items) {
      const ratioKey = item.split('_')[1];
      out.push({
        src: `/prace/${folder}/${folder}_${item}.webp`,
        alt,
        ratio: RATIO_MAP[ratioKey] ?? '1 / 1',
      });
    }
  }
  return out;
}

// Fisher–Yates — losowe wymieszanie (deterministyczne w obrębie jednego mountu)
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function CaseStudies() {
  const { t } = useLanguage();

  // Mieszamy raz na mount — stabilne podczas scrollowania, inne przy każdej wizycie
  const images = useMemo(() => shuffle(buildImages()), []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="bg-[#050505] min-h-[100dvh] text-white pt-32 pb-24 px-6 sm:px-8 md:px-16 lg:px-24"
    >
      <SEO
        title="Prace | Luźno Agency"
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

      {/* Masonry — kolumny CSS. Każde zdjęcie zachowuje swoją proporcję. */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-3 [column-fill:_balance]">
        {images.map((img, i) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: (i % 8) * 0.04 }}
            className="mb-2 sm:mb-3 break-inside-avoid overflow-hidden bg-white/5 relative group"
            style={{ aspectRatio: img.ratio }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover grayscale opacity-70 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
