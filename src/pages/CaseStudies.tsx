import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

// ─── Dane projektów ────────────────────────────────────────────────────────────
// folderPath = nazwa folderu w public/ (dokładna, z wielkimi literami i spacjami)
// filePrefix = prefix nazwy pliku (np. m1 → m1_1.webp)
// imageCount = liczba zdjęć
const caseStudies = [
  {
    id: '01',
    folderPath: 'M1', filePrefix: 'm1', imageCount: 4,
    category: 'Retail', client: 'EPP',
    scope:   'Design, Social Media, Konkursy, AI, Kampanie reklamowe (Meta, Programmatic)',
    scopeEn: 'Design, Social Media, Contests, AI, Advertising Campaigns (Meta, Programmatic)',
    challenge:   'Zarządzać komunikacją social media 9 centrów handlowych wykorzystując jeden spójny ekosystem, przy jednoczesnym wzroście zaangażowania i optymalizacji kosztów.',
    challengeEn: 'Manage social media communication for 9 shopping centers using one cohesive ecosystem, while simultaneously increasing engagement and optimizing costs.',
    delivery:   'Stworzyliśmy model zarządzania social media, przy jednoczesnej koordynacji współprac ambasadorskich z ponad 50 content creatorami, a także w oparciu o autorskie modele analiz danych wraz z partnerami stworzyliśmy działania, które pozwalają na mierzenie oraz optymalizację kosztu pozyskania footfall.',
    deliveryEn: 'We created a social media management model, while coordinating ambassador collaborations with over 50 content creators. Based on proprietary data analysis models, together with partners, we created activities that allow measuring and optimizing the cost of footfall acquisition.',
  },
  {
    id: '02',
    folderPath: 'SentiOne', filePrefix: 'sentione', imageCount: 4,
    category: 'Technology', client: 'SentiOne',
    scope:   'Social Media, Design, Performance Marketing',
    scopeEn: 'Social Media, Design, Performance Marketing',
    challenge:   'Przejąć rolę zewnętrznego, strategicznego działu marketingu, odpowiedzialności za KPI i generowanie leadów (MQL) przy jednoczesnym ujednoliceniu komunikacji wielokanałowej na 6 rynkach.',
    challengeEn: 'Take over the role of an external, strategic marketing department, taking responsibility for KPIs and lead generation (MQL) while unifying omnichannel communication across 6 markets.',
    delivery:   'Zbudowaliśmy plan komunikacji oraz strukturę działań performance na wszystkie rynki, do których komunikuje się Klient. Odpowiadaliśmy za współpracę z działem sprzedaży oraz wynik leadowy.',
    deliveryEn: 'We built a communication plan and a performance activity structure for all markets the Client communicates with. We were responsible for cooperation with the sales department and the lead generation results.',
  },
  {
    id: '03',
    folderPath: 'Komisja europejska', filePrefix: 'komisja', imageCount: 4,
    category: 'Politics', client: 'Komisja Europejska',
    scope:   'Strategia Komunikacji, Social Media, PR',
    scopeEn: 'Communication Strategy, Social Media, PR',
    challenge:   'Opracować strategię dla jednej z największych kampanii informacyjnych Komisji Europejskiej, przy pełnym uwzględnieniu specyfiki i wrażliwości lokalnego rynku.',
    challengeEn: 'Develop a strategy for one of the largest information campaigns of the European Commission, fully taking into account the specificity and sensitivity of the local market.',
    delivery:   'Stworzyliśmy kompleksowy fundament strategiczny: od pogłębionej analizy grup docelowych i monitoringu mediów, po koncepty kreatywne. Wspieraliśmy klienta na każdym etapie, dbając o precyzyjne briefowanie agencji wykonawczych.',
    deliveryEn: 'We created a comprehensive strategic foundation: from in-depth analysis of target groups and media monitoring to creative concepts. We supported the client at every stage, ensuring precise briefing of executive agencies.',
  },
  {
    id: '04',
    folderPath: 'Builing companion', filePrefix: 'buildingcompanion', imageCount: 4,
    category: 'Construction', client: 'Xella / Building Companion',
    scope:   'Social Media, Design, Copywriting',
    scopeEn: 'Social Media, Design, Copywriting',
    challenge:   'Zbudować spójną komunikację skierowaną do osób poszukujących ekip budowlanych oraz wspierać działania performance.',
    challengeEn: 'Build cohesive communication directed at people looking for construction crews and support performance marketing.',
    delivery:   'Opracowaliśmy unikalny koncept i tonalność marki, które przełożyliśmy na konkretne segmenty komunikacyjne. Wykorzystaliśmy realne insighty z monitoringu mediów, by odpowiadać na faktyczne potrzeby odbiorców i budować autentyczne zaangażowanie.',
    deliveryEn: 'We developed a unique concept and brand tonality, which we translated into specific communication segments. We used real insights from media monitoring to respond to the actual needs of the audience and build authentic engagement.',
  },
  {
    id: '05',
    folderPath: 'Monting', filePrefix: 'monting', imageCount: 4,
    category: 'Real Estate', client: 'Monting Development',
    scope:   'Branding, Social Media, Design, Copywriting, Web Development',
    scopeEn: 'Branding, Social Media, Design, Copywriting, Web Development',
    challenge:   'Stworzyć nazwę, logotyp, tonalność i strategię komunikacji nowej inwestycji mieszkaniowej.',
    challengeEn: 'Create a name, logotype, tonality, and communication strategy for a new residential investment.',
    delivery:   'Stworzyliśmy kompletną bazę marki: od nazwy i logotypu po strategię komunikacji. Zaprojektowaliśmy materiały reklamowe oraz stronę www z wyszukiwarką mieszkań.',
    deliveryEn: 'We created a complete brand base: from the name and logotype to the communication strategy. We designed advertising materials and a website with an apartment search engine.',
  },
  {
    id: '06',
    folderPath: 'Bean', filePrefix: 'beanandbuddies', imageCount: 4,
    category: 'FMCG', client: 'Bean and Buddies',
    scope:   'Social Media, Design, Copywriting',
    scopeEn: 'Social Media, Design, Copywriting',
    challenge:   'Wyróżnić lokalnego producenta kawy w nasyconym środowisku social mediów i zbudować lojalną społeczność wokół marki.',
    challengeEn: 'Distinguish a local coffee producer in a saturated social media environment and build a loyal community around the brand.',
    delivery:   'Odeszliśmy od schematów. Postawiliśmy na odważny design, język, który skraca dystans i szybkie reakcje w ramach Real-Time Marketingu. Dzięki autentycznej komunikacji zbudowaliśmy zaangażowaną społeczność.',
    deliveryEn: 'We stepped away from the usual patterns. We focused on bold design, language that shortens the distance, and quick reactions within Real-Time Marketing. Thanks to authentic communication, we built an engaged community.',
  },
  {
    id: '07',
    folderPath: 'Portman Lights', filePrefix: 'portman', imageCount: 4,
    category: 'Event Technology', client: 'Portman Lights',
    scope:   'Social Media, Design, Strategy',
    scopeEn: 'Social Media, Design, Strategy',
    challenge:   'Precyzyjnie docierać do wąskich grup docelowych (B2B) na rynkach zagranicznych oraz realizować cele sprzedażowe w kampaniach performance.',
    challengeEn: 'Precisely reach narrow target groups (B2B) in foreign markets and achieve sales goals in performance campaigns.',
    delivery:   'Dopracowaliśmy warstwę wizualną w standardzie premium, dopasowaną do globalnych rynków. Przygotowaliśmy anglojęzyczne segmenty komunikacyjne, które ugruntowały pozycję marki jako eksperta w branży stage lighting.',
    deliveryEn: 'We refined the visual layer to a premium standard, tailored to global markets. We prepared English-language communication segments that consolidated the brand\'s position as an expert in the stage lighting industry.',
  },
  {
    id: '08',
    folderPath: 'Punkta', filePrefix: 'punkta', imageCount: 4,
    category: 'Fintech / Insurance', client: 'Punkta',
    scope:   'Social Media, Video, Ads, Design, Copywriting',
    scopeEn: 'Social Media, Video, Ads, Design, Copywriting',
    challenge:   'Zdominować przestrzeń digital działaniami, które realnie przekładają się na sprzedaż.',
    challengeEn: 'Dominate the digital space with activities that tangibly translate into sales.',
    delivery:   'Zrezygnowaliśmy z generycznej komunikacji na rzecz budowania silnej marki w social mediach. Stworzyliśmy autorski format wideo na YouTube i pierwsze w Polsce motoryzacyjne commentary.',
    deliveryEn: 'We abandoned generic communication in favor of building a strong brand on social media. We created an original video format on YouTube and the first automotive commentary in Poland.',
  },
  {
    id: '09',
    folderPath: 'eN Studios', filePrefix: 'enstudios', imageCount: 4,
    category: 'Creative / Production', client: 'En Studios',
    scope:   'Design, Social Media, Copywriting, Web Development',
    scopeEn: 'Design, Social Media, Copywriting, Web Development',
    challenge:   'Zbudować od podstaw wyrazistą tożsamość digitalową dla studia kreatywnego i stworzyć spójny ekosystem komunikacji.',
    challengeEn: 'Build a distinct digital identity for a creative studio from scratch and create a cohesive communication ecosystem.',
    delivery:   'Opracowaliśmy spójny model komunikacji w social mediach i zaprojektowaliśmy stronę www. Wyeliminowaliśmy komunikacyjny szum, stawiając na wyrazisty visual i konkretny komunikat.',
    deliveryEn: 'We developed a cohesive communication model in social media and designed a website. We eliminated communication noise, focusing on a distinct visual and a specific message.',
  },
  {
    id: '10',
    folderPath: 'Luba', filePrefix: 'luba', imageCount: 4,
    category: 'FMCG', client: 'Luba Group',
    scope:   'Branding, Social Media, Ads, Strategy',
    scopeEn: 'Branding, Social Media, Ads, Strategy',
    challenge:   'Wykorzystać potencjał marki do skutecznego wejścia w nowe kategorie produktowe i rynkowe nisze.',
    challengeEn: 'Leverage the brand\'s potential to successfully enter new product categories and market niches.',
    delivery:   'Zaprojektowaliśmy nowe linie produktów od podstaw — odpowiadając za koncepty, naming, sesje zdjęciowe oraz design opakowań.',
    deliveryEn: 'We designed new product lines from scratch — taking responsibility for concepts, naming, photo sessions, and packaging design.',
  },
  {
    id: '11',
    folderPath: 'MMAniak', filePrefix: 'mmaniak', imageCount: 4,
    category: 'Sport', client: 'MMAniak',
    scope:   'Sponsoring, Event Marketing, Social Media',
    scopeEn: 'Sponsorship, Event Marketing, Social Media',
    challenge:   'Odświeżyć wizerunek marki i opracować nową strategię komunikacji ukierunkowaną na dynamiczny wzrost sprzedaży online.',
    challengeEn: 'Refresh the brand image and develop a new communication strategy focused on dynamic online sales growth.',
    delivery:   'Zbudowaliśmy nową tożsamość wizualną marki w social mediach, dopasowaną do specyfiki świata sportów walki. Pozyskaliśmy zawodników UFC jako ambasadorów.',
    deliveryEn: 'We built a new visual brand identity on social media, tailored to the specifics of the combat sports world. We acquired UFC fighters as ambassadors.',
  },
  {
    id: '12',
    folderPath: 'Archicom', filePrefix: 'archicom', imageCount: 4,
    category: 'Real Estate', client: 'Archicom',
    scope:   'Performance Marketing, 3D Design, Copywriting',
    scopeEn: 'Performance Marketing, 3D Design, Copywriting',
    challenge:   'Stworzyć i wdrożyć kompleksową strategię social media i wspierać działania performance dla ponad 20 inwestycji deweloperskich.',
    challengeEn: 'Create and implement a comprehensive social media strategy and support performance marketing for over 20 real estate investments.',
    delivery:   'Uporządkowaliśmy system pracy nad projektami, przenosząc zarządzanie komunikacją do Jiry. Wdrożyliśmy narzędzia AI do produkcji contentu foto i wideo.',
    deliveryEn: 'We organized the project workflow, moving communication management to Jira. We implemented AI tools for photo and video content production.',
  },
];

// ─── Generuje URL-e zdjęć z public/ ───────────────────────────────────────────
// Używa encodeURIComponent dla folderów ze spacjami (np. "Builing companion")
function getImages(folderPath: string, filePrefix: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) =>
    `/${encodeURIComponent(folderPath)}/${filePrefix}_${i + 1}.webp`
  );
}

// ─── Galeria zdjęć projektu ────────────────────────────────────────────────────
function Gallery({ folderPath, filePrefix, client, count }: {
  folderPath: string;
  filePrefix: string;
  client: string;
  count: number;
}) {
  return (
    <div className="mt-16 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {getImages(folderPath, filePrefix, count).map((src, i) => (
        <div key={i} className="aspect-square overflow-hidden bg-white/5 relative group/img">
          <img
            src={src}
            alt={`${client} — ${i + 1}`}
            className="w-full h-full object-cover grayscale opacity-60 transition-all duration-700 ease-out group-hover/img:grayscale-0 group-hover/img:opacity-100 group-hover/img:scale-105"
          />
        </div>
      ))}
    </div>
  );
}

// ─── Główny widok ──────────────────────────────────────────────────────────────
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
      <div className="mb-20 md:mb-32">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-white/30" />
          <span className="text-sm font-mono uppercase tracking-[0.2em] text-white/50">
            {t('Nasze realizacje', 'Our works')}
          </span>
        </div>
        <h1 className="text-[clamp(3.5rem,14vw,9rem)] leading-[0.85] font-black tracking-tighter uppercase">
          Case<br />Studies
        </h1>
      </div>

      {/* Lista case studies */}
      <div className="flex flex-col w-full">
        {caseStudies.map((cs) => (
          <motion.article
            key={cs.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="border-t border-white/20 py-12 md:py-20 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

              {/* Kolumna 1: numer, kategoria, klient, zakres */}
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-white/40">{cs.id}</span>
                    <ArrowUpRight className="w-6 h-6 text-white/20 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-light uppercase tracking-tight mb-12 group-hover:translate-x-2 transition-transform duration-500">
                    {cs.category}
                  </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-8">
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-mono text-white/40 mb-2 uppercase tracking-widest">
                      {t('Klient', 'Client')}
                    </h4>
                    <p className="text-base sm:text-lg font-medium">{cs.client}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-mono text-white/40 mb-2 uppercase tracking-widest">
                      {t('Zakres współpracy', 'Scope of work')}
                    </h4>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t(cs.scope, cs.scopeEn)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Kolumna 2: wyzwanie */}
              <div className="lg:col-span-4 lg:pl-8">
                <h4 className="text-[10px] sm:text-xs font-mono text-white/40 mb-6 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-4 h-[1px] bg-white/20" />
                  {t('Wyzwanie', 'Challenge')}
                </h4>
                <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed font-light">
                  {t(cs.challenge, cs.challengeEn)}
                </p>
              </div>

              {/* Kolumna 3: działania */}
              <div className="lg:col-span-4 lg:pl-8">
                <h4 className="text-[10px] sm:text-xs font-mono text-white/40 mb-6 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-4 h-[1px] bg-white/20" />
                  {t('Działania', 'Delivery')}
                </h4>
                <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed font-light">
                  {t(cs.delivery, cs.deliveryEn)}
                </p>
              </div>

            </div>

            {/* Galeria */}
            <Gallery
              folderPath={cs.folderPath}
              filePrefix={cs.filePrefix}
              client={cs.client}
              count={cs.imageCount}
            />

          </motion.article>
        ))}
      </div>
    </motion.main>
  );
}
