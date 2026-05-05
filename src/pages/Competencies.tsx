import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';
import { Compass, PenTool, PencilLine, Share2, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const competencies = [
  {
    id: '01',
    title: 'Strategia',
    titleEn: 'Strategy',
    icon: Compass,
    description: 'O strategiach na rynku mówi się dużo i każdy coś na ten temat wie. W LUŹNO to jeden z kluczowych obszarów. Nasz zespół widzi różnicę pomiędzy strategią, a taktykami, pomysłami, czy kanałami komunikacji, nie miesza pojęć i nie tworzy wykluczających się konstruktów. Strategia jako nadrzędny element powinna zawsze wskazywać drogę, pokazywać kierunki i być przewodnikiem w działaniach firmy, czy marki.',
    descriptionEn: 'There is a lot of talk about strategies on the market and everyone knows something about it. At LUŹNO, this is one of the key areas. Our team sees the difference between strategy and tactics, ideas or communication channels, does not mix concepts and does not create mutually exclusive constructs. Strategy as an overarching element should always point the way, show directions and be a guide in the activities of a company or brand.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '02',
    title: 'Design',
    titleEn: 'Design',
    icon: PenTool,
    description: 'Rozwijamy się w obszarze designu od lat, a naszą wcześniejszą zasadę ASP only zmieniliśmy w skill based recruitment gdzie przykładamy ogromną wagę nie tylko do jakości i rozumienia zasad projektowania, ale także znajomości narzędzi. Designerzy w LUŹNO to nie tylko artyści, ale także ludzie rozumiejący komunikację. Dzięki temu tworzymy nie tylko rzeczy piękne, ale także działające.',
    descriptionEn: 'We have been developing in the area of design for years, and we changed our previous ASP only rule to skill-based recruitment, where we attach great importance not only to quality and understanding of design principles, but also knowledge of tools. Designers at LUŹNO are not only artists, but also people who understand communication. Thanks to this, we create not only beautiful things, but also things that work.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '03',
    title: 'Copywriting',
    titleEn: 'Copywriting',
    icon: PencilLine,
    description: 'Język Polski jest piękny, pozwala na ograniczoną jedynie wyobraźnią ilość interpretacji przekazów. W LUŹNO tworzymy teksty tak, by interpretacje te przewidywać, być gotowym na dowolny scenariusz i zostać zapamiętanym tak jak firma, czy marka dla której piszemy tego oczekuje.',
    descriptionEn: 'The Polish language is beautiful, it allows for a number of interpretations of messages limited only by imagination. At LUŹNO, we create texts in such a way as to predict these interpretations, be ready for any scenario and be remembered exactly as the company or brand we write for expects it.',
    image: 'https://images.unsplash.com/photo-1550592704-6c76defa99ce?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '04',
    title: 'Social media',
    titleEn: 'Social media',
    icon: Share2,
    description: 'Jeden z najtrudniejszych elementów marketingu, komunikacja dwustronna, wymagająca nie tylko śledzenia trendów, ale przede wszystkim umiejętności rozumienia mechanizmów uwagi. Dobrze prowadzona komunikacja z poziomu social mediów jest wielce potężną bronią w rękach marketingowca oraz niebezpieczeństwem w rękach amatora. W LUŹNO budujemy analizy SoMe pozwalające na tworzenie celowej komunikacji, której interpretacja przez grupy celowe nie jest dla marketera zaskoczeniem.',
    descriptionEn: 'One of the most difficult elements of marketing, two-way communication, requiring not only following trends, but above all the ability to understand attention mechanisms. Well-conducted communication from the level of social media is a very powerful weapon in the hands of a marketer and a danger in the hands of an amateur. At LUŹNO, we build SoMe analyzes that allow for the creation of targeted communication, the interpretation of which by target groups is not a surprise for the marketer.',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '05',
    title: 'Performance',
    titleEn: 'Performance',
    icon: TrendingUp,
    description: 'W czasach AI, automatyzacji i wszechobecności danych bycie data driven schodzi na drugi plan, zaraz po wspaniałych dashboardach i narzędziach, których nikt nie weryfikuje. W LUŻNO wierzymy, że dobrze robiony performance to taki, w którym rozumiemy co działa, dlaczego działa i umiemy te informacje wykorzystywać w tworzeniu planów na kolejne okresy.',
    descriptionEn: 'In the era of AI, automation and the ubiquity of data, being data-driven takes a back seat, right after wonderful dashboards and tools that nobody verifies. At LUŹNO, we believe that well-done performance is one in which we understand what works, why it works and we know how to use this information to create plans for subsequent periods.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
  },
  {
    id: '06',
    title: 'Zewnętrzny dział kreacji',
    titleEn: 'External creative department',
    icon: Users,
    description: 'Stworzyliśmy model, w którym otrzymujesz od nas nie tylko Project Managera, ale także swój własny dedykowany zespół designerów i copywriterów, którzy realizują projekty Twojej organizacji. Dokumentacja, umowy, sprzęt - wszystko jest po naszej stronie. Kupujesz jedynie czas i kompetencje.',
    descriptionEn: 'We have created a model in which you receive from us not only a Project Manager, but also your own dedicated team of designers and copywriters who implement your organization\'s projects. Documentation, contracts, equipment - everything is on our side. You only buy time and expertise.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop'
  }
];

export default function Competencies() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const handleCompetencyClick = (index: number) => {
    setActiveIndex(index);
    if (window.innerWidth < 1024 && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative min-h-[100dvh] lg:h-[100dvh] bg-[#050505] text-white overflow-x-hidden overflow-y-auto lg:overflow-hidden flex flex-col pt-24 lg:pt-0"
    >
      <SEO 
        title="Kompetencje | Luźno Agency - Social Media, Strategia, Design"
        description="Nasze kompetencje: strategia, social media, design, content creation, performance marketing. Dostarczamy kompleksowe rozwiązania dla marek."
      />
      <div className="flex-1 flex flex-col lg:flex-row w-full min-h-full relative z-10">
        
        {/* Left Column: Navigation */}
        <div className="lg:w-1/2 min-h-[50vh] lg:h-full flex flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-24 lg:border-r border-white/10 relative z-20 bg-[#050505] lg:bg-transparent py-12 lg:py-0">
          <div className="mb-12 lg:mb-20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-white/30" />
              <h1 className="text-xs tracking-[0.3em] uppercase text-white/50 font-bold">
                {t('Kompetencje', 'Expertise')}
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-white/90">
              {t('Co robimy ', 'What we do ')}<span className="font-bold italic text-white">{t('najlepiej', 'best')}</span>.
            </h2>
            <p className="mt-4 text-sm md:text-base text-white/60 font-medium max-w-md">
              {t('Jako najlepsza agencja social media i digital, Luźno dostarcza kompleksowe strategie, design i performance marketing dla wymagających marek.', 'As the best social media and digital agency, Luźno delivers comprehensive strategies, design and performance marketing for demanding brands.')}
            </p>
          </div>

          <div className="flex flex-col gap-6 md:gap-8">
            {competencies.map((comp, index) => {
              const isActive = activeIndex === index;
              return (
                <button 
                  key={comp.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => handleCompetencyClick(index)}
                  className="group flex items-center gap-6 text-left w-full relative py-2"
                >
                  <span className={`text-xs font-mono transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/30'}`}>
                    {comp.id}
                  </span>
                  <h3 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-tight transition-all duration-500 ${isActive ? 'text-white translate-x-2 sm:translate-x-4' : 'text-white/30 group-hover:text-white/60'}`}>
                    {t(comp.title, comp.titleEn)}
                  </h3>
                  {isActive && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-full bg-white hidden lg:block"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Content */}
        <div ref={contentRef} className="lg:w-1/2 min-h-[50vh] lg:h-full flex items-center px-6 sm:px-8 md:px-16 lg:px-24 relative py-16 lg:py-0">
          {/* Background Image scoped to right column */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
            {competencies.map((comp, index) => (
              <motion.img
                key={comp.id}
                src={comp.image}
                initial={false}
                animate={{ 
                  opacity: activeIndex === index ? 0.3 : 0,
                  scale: activeIndex === index ? 1 : 1.05
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity"
                style={{ pointerEvents: activeIndex === index ? 'auto' : 'none' }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent lg:hidden z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent hidden lg:block z-10" />
            <div className="absolute inset-0 bg-[#050505]/40 z-10" />
          </div>

          <div className="relative z-20 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {(() => {
                  const ActiveIcon = competencies[activeIndex].icon;
                  return (
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-8 backdrop-blur-md bg-black/40">
                      <ActiveIcon className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                  );
                })()}
                
                <h4 className="text-2xl font-bold mb-6 tracking-wide uppercase text-white/90">
                  {t(competencies[activeIndex].title, competencies[activeIndex].titleEn)}
                </h4>
                
                <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">
                  {t(competencies[activeIndex].description, competencies[activeIndex].descriptionEn)}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
