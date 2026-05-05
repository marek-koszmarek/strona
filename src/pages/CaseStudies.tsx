import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const caseStudies = [
  {
    id: '01',
    folderName: 'm1',
    category: 'Retail',
    client: 'EPP',
    scope: 'Design, Social Media, Konkursy, AI, Kampanie reklamowe (Meta, Programmatic)',
    scopeEn: 'Design, Social Media, Contests, AI, Advertising Campaigns (Meta, Programmatic)',
    challenge: 'Zarządzać komunikacją social media 9 centrów handlowych wykorzystując jeden spójny ekosystem, przy jednoczesnym wzroście zaangażowania i optymalizacji kosztów.',
    challengeEn: 'Manage social media communication for 9 shopping centers using one cohesive ecosystem, while simultaneously increasing engagement and optimizing costs.',
    delivery: 'Stworzyliśmy model zarządzania social media, przy jednoczesnej koordynacji współprac ambasadorskich z ponad 50 content creatorami, a także w oparciu o autorskie modele analiz danych wraz z partnerami stworzyliśmy działania, które pozwalają na mierzenie oraz optymalizację kosztu pozyskania footfall.',
    deliveryEn: 'We created a social media management model, while coordinating ambassador collaborations with over 50 content creators. Based on proprietary data analysis models, together with partners, we created activities that allow measuring and optimizing the cost of footfall acquisition.',
  },
  {
    id: '02',
    folderName: 'sentione',
    category: 'Technology',
    client: 'SentiOne',
    scope: 'Social Media, Design, Performance Marketing',
    scopeEn: 'Social Media, Design, Performance Marketing',
    challenge: 'Przejąć rolę zewnętrznego, strategicznego działu marketingu, odpowiedzialności za KPI i generowanie leadów (MQL) przy jednoczesnym ujednoliceniu komunikacji wielokanałowej na 6 rynkach.',
    challengeEn: 'Take over the role of an external, strategic marketing department, taking responsibility for KPIs and lead generation (MQL) while unifying omnichannel communication across 6 markets.',
    delivery: 'Zbudowaliśmy plan komunikacji oraz strukturę działań performance na wszystkie rynki, do których komunikuje się Klient. Odpowiadaliśmy za współpracę z działem sprzedaży oraz wynik leadowy.',
    deliveryEn: 'We built a communication plan and a performance activity structure for all markets the Client communicates with. We were responsible for cooperation with the sales department and the lead generation results.',
  },
  {
    id: '03',
    folderName: 'komisja',
    category: 'Politics',
    client: 'Komisja Europejska',
    scope: 'Strategia Komunikacji, Social Media, PR',
    scopeEn: 'Communication Strategy, Social Media, PR',
    challenge: 'Opracować strategię dla jednej z największych kampanii informacyjnych Komisji Europejskiej, przy pełnym uwzględnieniu specyfiki i wrażliwości lokalnego rynku.',
    challengeEn: 'Develop a strategy for one of the largest information campaigns of the European Commission, fully taking into account the specificity and sensitivity of the local market.',
    delivery: 'Stworzyliśmy kompleksowy fundament strategiczny: od pogłębionej analizy grup docelowych i monitoringu mediów, po koncepty kreatywne. Wspieraliśmy klienta na każdym etapie, dbając o precyzyjne briefowanie agencji wykonawczych.',
    deliveryEn: 'We created a comprehensive strategic foundation: from in-depth analysis of target groups and media monitoring to creative concepts. We supported the client at every stage, ensuring precise briefing of executive agencies.',
  },
  {
    id: '04',
    folderName: 'buildingcompanion',
    category: 'Construction',
    client: 'Xella / Building Companion',
    scope: 'Social Media, Design, Copywriting',
    scopeEn: 'Social Media, Design, Copywriting',
    challenge: 'Zbudować spójną komunikację skierowaną do osób poszukujących ekip budowlanych oraz wspierać działania performance.',
    challengeEn: 'Build cohesive communication directed at people looking for construction crews and support performance marketing.',
    delivery: 'Opracowaliśmy unikalny koncept i tonalność marki, które przełożyliśmy na konkretne segmenty komunikacyjne. Wykorzystaliśmy realne insighty z monitoringu mediów, by odpowiadać na faktyczne potrzeby odbiorców i budować autentyczne zaangażowanie. Zmieniliśmy suchy przekaz ofertowy w dialog oparty na zaufaniu, dostarczając precyzyjne argumenty tam, gdzie zapadają decyzje zakupowe.',
    deliveryEn: 'We developed a unique concept and brand tonality, which we translated into specific communication segments. We used real insights from media monitoring to respond to the actual needs of the audience and build authentic engagement. We changed the dry offer message into a dialogue based on trust, providing precise arguments where purchasing decisions are made.',
  },
  {
    id: '05',
    folderName: 'monting',
    category: 'Real Estate',
    client: 'Monting Development',
    scope: 'Branding, Social Media, Design, Copywriting, Web Development',
    scopeEn: 'Branding, Social Media, Design, Copywriting, Web Development',
    challenge: 'Stworzyć nazwę, logotyp, tonalność i strategię komunikacji nowej inwestycji mieszkaniowej.',
    challengeEn: 'Create a name, logotype, tonality, and communication strategy for a new residential investment.',
    delivery: 'Stworzyliśmy kompletną bazę marki: od nazwy i logotypu po strategię komunikacji. Zaprojektowaliśmy materiały reklamowe oraz stronę www z wyszukiwarką mieszkań, dbając o ich spójność z nowym wizerunkiem inwestycji.',
    deliveryEn: 'We created a complete brand base: from the name and logotype to the communication strategy. We designed advertising materials and a website with an apartment search engine, ensuring their consistency with the new image of the investment.',
  },
  {
    id: '06',
    folderName: 'beanandbuddies',
    category: 'FMCG',
    client: 'Bean and Buddies',
    scope: 'Social Media, Design, Copywriting',
    scopeEn: 'Social Media, Design, Copywriting',
    challenge: 'Wyróżnić lokalnego producenta kawy w nasyconym środowisku social mediów i zbudować lojalną społeczności wokół marki.',
    challengeEn: 'Distinguish a local coffee producer in a saturated social media environment and build a loyal community around the brand.',
    delivery: 'Odeszliśmy od schematów. Postawiliśmy na odważny design, język, który skraca dystans i szybkie reakcje w ramach Real-Time Marketingu. Dzięki wykorzystaniu memów i autentycznej komunikacji, zbudowaliśmy zaangażowaną społeczność, która realnie utożsamia się z marką.',
    deliveryEn: 'We stepped away from the usual patterns. We focused on bold design, language that shortens the distance, and quick reactions within Real-Time Marketing. Thanks to the use of memes and authentic communication, we built an engaged community that genuinely identifies with the brand.',
  },
  {
    id: '07',
    folderName: 'portman',
    category: 'Event Technology',
    client: 'Portman Lights',
    scope: 'Social Media, Design, Strategy',
    scopeEn: 'Social Media, Design, Strategy',
    challenge: 'Precyzyjnie docierać do wąskich grup docelowych (B2B) na rynkach zagranicznych oraz realizować cele sprzedażowe w kampaniach performance.',
    challengeEn: 'Precisely reach narrow target groups (B2B) in foreign markets and achieve sales goals in performance campaigns.',
    delivery: 'Dopracowaliśmy warstwę wizualną w standardzie premium, dopasowaną do globalnych rynków. Przygotowaliśmy anglojęzyczne segmenty komunikacyjne, które ugruntowały pozycję marki jako eksperta w branży stage lighting. Całość wsparliśmy skuteczną strategią i działaniami performance.',
    deliveryEn: 'We refined the visual layer to a premium standard, tailored to global markets. We prepared English-language communication segments that consolidated the brand\'s position as an expert in the stage lighting industry. We supported everything with an effective strategy and performance activities.',
  },
  {
    id: '08',
    folderName: 'punkta',
    category: 'Fintech / Insurance',
    client: 'Punkta',
    scope: 'Social Media, Video, Ads, Design, Copywriting',
    scopeEn: 'Social Media, Video, Ads, Design, Copywriting',
    challenge: 'Zdominować przestrzeń digital działaniami, które realnie przekładają się na sprzedaż.',
    challengeEn: 'Dominate the digital space with activities that tangibly translate into sales.',
    delivery: 'Zrezygnowaliśmy z generycznej komunikacji na rzecz budowania silnej marki w social mediach. Stworzyliśmy autorski format wideo na YouTube i pierwsze w Polsce motoryzacyjne commentary, wchodząc w głęboką interakcję z użytkownikami, zaangażowaliśmy się w największy w Europie cykl wyścigowy Miata Challenge. Zmieniliśmy sposób mówienia o ubezpieczeniach, zamieniając suche fakty w angażujący content, który stał się znakiem rozpoznawczym nowej marki.',
    deliveryEn: 'We abandoned generic communication in favor of building a strong brand on social media. We created an original video format on YouTube and the first automotive commentary in Poland, entering into deep interaction with users, and we got involved in Europe\'s largest racing series, Miata Challenge. We changed the way we talk about insurance, turning dry facts into engaging content that became the hallmark of the new brand.',
  },
  {
    id: '09',
    folderName: 'enstudios',
    category: 'Creative / Production',
    client: 'En Studios',
    scope: 'Design, Social Media, Copywriting, Web Development',
    scopeEn: 'Design, Social Media, Copywriting, Web Development',
    challenge: 'Zbudować od podstaw wyrazistą tożsamość digitalową dla studia kreatywnego i stworzyć spójny ekosystemu komunikacji.',
    challengeEn: 'Build a distinct digital identity for a creative studio from scratch and create a cohesive communication ecosystem.',
    delivery: 'Opracowaliśmy spójny model komunikacji w social mediach i zaprojektowaliśmy stronę www. Wyeliminowaliśmy komunikacyjny szum, stawiając na wyrazisty visual i konkretny komunikat.',
    deliveryEn: 'We developed a cohesive communication model in social media and designed a website. We eliminated communication noise, focusing on a distinct visual and a specific message.',
  },
  {
    id: '10',
    folderName: 'luba',
    category: 'FMCG',
    client: 'Luba Group',
    scope: 'Branding, Social Media, Ads, Strategy',
    scopeEn: 'Branding, Social Media, Ads, Strategy',
    challenge: 'Wykorzystać potencjał marki do skutecznego wejścia w nowe kategorie produktowe i rynkowe nisze.',
    challengeEn: 'Leverage the brand\'s potential to successfully enter new product categories and market niches.',
    delivery: 'Zaprojektowaliśmy nowe linie produktów od podstaw - odpowiadając za koncepty, naming, sesje zdjęciowe oraz design opakowań. Zadbaliśmy o pełną oprawę wizualną i kampanie performance, łącząc budowanie świadomości marki z realnym wsparciem ich dystrybucji poprzez współpracę przy wprowadzaniu ich do sieci sprzedaży.',
    deliveryEn: 'We designed new product lines from scratch - taking responsibility for concepts, naming, photo sessions, and packaging design. We took care of the full visual setting and performance campaigns, combining brand awareness building with real support for their distribution through cooperation in introducing them to the sales network.',
  },
  {
    id: '11',
    folderName: 'mmaniak',
    category: 'Sport',
    client: 'MMAniak',
    scope: 'Sponsoring, Event Marketing, Social Media',
    scopeEn: 'Sponsorship, Event Marketing, Social Media',
    challenge: 'Odświeżyć wizerunek marki i opracować nową strategię komunikacji ukierunkowaną na dynamiczny wzrost sprzedaży online.',
    challengeEn: 'Refresh the brand image and develop a new communication strategy focused on dynamic online sales growth.',
    delivery: 'Zbudowaliśmy nową tożsamość wizualną marki w social mediach, dopasowaną do specyfiki świata sportów walki. Pozyskaliśmy zawodników UFC jako ambasadorów oraz odpowiadaliśmy całościowo za performance.',
    deliveryEn: 'We built a new visual brand identity on social media, tailored to the specifics of the combat sports world. We acquired UFC fighters as ambassadors and were entirely responsible for performance.',
  },
  {
    id: '12',
    folderName: 'smartaero',
    category: 'Aviation',
    client: 'Smart Aero',
    scope: 'Rebranding, B2B Marketing, Web Design',
    scopeEn: 'Rebranding, B2B Marketing, Web Design',
    challenge: 'Przygotować materiał, który pozwoli wyróżnić się topowemu ośrodkowi szkolenia lotniczego w digitalu oraz stworzyć stronę www.',
    challengeEn: 'Prepare material that will allow a top aviation training center to stand out in digital and create a website.',
    delivery: 'Zrealizowaliśmy sesję zdjęciową oraz spot reklamowy z wykorzystaniem floty klienta. Zaprojektowaliśmy i wdrożyliśmy nową stronę www, tworząc spójną wizytówkę marki.',
    deliveryEn: 'We carried out a photo session and a promotional spot using the client\'s fleet. We designed and implemented a new website, creating a cohesive showcase for the brand.',
  },
  {
    id: '13',
    folderName: 'archicom',
    category: 'Real Estate',
    client: 'Archicom',
    scope: 'Performance Marketing, 3D Design, Copywriting',
    scopeEn: 'Performance Marketing, 3D Design, Copywriting',
    challenge: 'Stworzyć i wdrożyć kompleksową strategię social media i wspierać działania performance dla ponad 20 inwestycji deweloperskich.',
    challengeEn: 'Create and implement a comprehensive social media strategy and support performance marketing for over 20 real estate investments.',
    delivery: 'Uporządkowaliśmy system pracy nad projektami, przenosząc zarządzanie komunikacją do Jiry. Wdrożyliśmy narzędzia AI do produkcji contentu foto i wideo, co pozwoliło nam utrzymać wysoką jakość i spójność treści dla każdej z inwestycji. W efekcie marka awansowała do Top 3 zestawienia deweloperów w raporcie SoTrender.',
    deliveryEn: 'We organized the project workflow, moving communication management to Jira. We implemented AI tools for photo and video content production, which allowed us to maintain high quality and consistency of content for each investment. As a result, the brand advanced to the Top 3 in the developer ranking in the SoTrender report.',
  }
];

// Dynamically import all images from src/assets/case-studies
const imageModules = import.meta.glob<string>('/src/assets/case-studies/**/*.{png,jpg,jpeg,webp,gif}', { eager: true, as: 'url' });

const getImagesForClient = (folderName: string) => {
  const images: string[] = [];
  for (const path in imageModules) {
    if (path.includes(`/case-studies/${folderName}/`)) {
      images.push(imageModules[path] as string);
    }
  }
  // Sort images to ensure consistent order (e.g., 1.webp, 2.webp)
  return images.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
};

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
        title="Case Studies | Luźno Agency - Najlepsze Kampanie Digital i Social Media"
        description="Zobacz nasze realizacje. Poznaj case studies kampanii, które zrealizowaliśmy dla topowych marek. Skuteczny marketing, AI i kreatywność w praktyce."
      />
      {/* Header */}
      <div className="mb-20 md:mb-32">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-white/30" />
          <span className="text-sm font-mono uppercase tracking-[0.2em] text-white/50">{t('Nasze realizacje', 'Our works')}</span>
        </div>
        <h1 className="text-[clamp(3.5rem,14vw,9rem)] sm:text-[12vw] md:text-8xl lg:text-[9vw] leading-[0.85] font-black tracking-tighter uppercase text-white">
          Case<br />Studies
        </h1>
      </div>

      {/* Case Studies List */}
      <div className="flex flex-col w-full">
        {caseStudies.map((cs, index) => (
          <motion.article 
            key={cs.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="border-t border-white/20 py-12 md:py-20 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
              
              {/* Column 1: Category, Client, Scope */}
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
                    <h4 className="text-[10px] sm:text-xs font-mono text-white/40 mb-2 uppercase tracking-widest">{t('Klient', 'Client')}</h4>
                    <p className="text-base sm:text-lg font-medium">{cs.client}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-mono text-white/40 mb-2 uppercase tracking-widest">{t('Zakres współpracy', 'Scope of work')}</h4>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">{t(cs.scope, cs.scopeEn)}</p>
                  </div>
                </div>
              </div>

              {/* Column 2: Challenge */}
              <div className="lg:col-span-4 lg:pl-8 flex flex-col gap-12">
                <div>
                  <h4 className="text-[10px] sm:text-xs font-mono text-white/40 mb-6 uppercase tracking-widest flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-white/20"></span>
                    {t('Wyzwanie', 'Challenge')}
                  </h4>
                  <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed font-light">
                    {t(cs.challenge, cs.challengeEn)}
                  </p>
                </div>
              </div>

              {/* Column 3: Delivery */}
              <div className="lg:col-span-4 lg:pl-8 flex flex-col gap-12">
                {cs.delivery && (
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-mono text-white/40 mb-6 uppercase tracking-widest flex items-center gap-3">
                      <span className="w-4 h-[1px] bg-white/20"></span>
                      {t('Działania', 'Delivery')}
                    </h4>
                    <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed font-light">
                      {t(cs.delivery, cs.deliveryEn)}
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Gallery */}
            {getImagesForClient(cs.folderName).length > 0 && (
              <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {getImagesForClient(cs.folderName).map((img, i) => (
                  <div key={i} className="aspect-square overflow-hidden bg-white/5 relative group/image">
                    <img 
                      src={img} 
                      loading="lazy"
                      decoding="async"
                      alt={`${cs.client} gallery image ${i + 1}`} 
                      className="w-full h-full object-cover grayscale opacity-70 group-hover/image:grayscale-0 group-hover/image:opacity-100 group-hover/image:scale-105 transition-all duration-700 ease-[0.21,0.47,0.32,0.98]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </motion.main>
  );
}
