import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const DataStreamCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      pulse: number = 0;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Slower movement: 0.8
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 1.5 + 0.5;
        this.baseAlpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        const currentRadius = this.radius + this.pulse * 1.5;
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        
        const currentAlpha = Math.min(1, this.baseAlpha + this.pulse * 0.6);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        
        if (this.pulse > 0.2) {
          ctx.shadowBlur = 10 * this.pulse;
          ctx.shadowColor = 'rgba(217, 70, 239, 0.6)'; // Fuchsia glow
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const nodes: Node[] = [];
    // Adjust density based on screen size (increased density)
    const numNodes = Math.floor((width * height) / 8000); 
    for (let i = 0; i < numNodes; i++) {
      nodes.push(new Node());
    }

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);
      
      nodes.forEach(n => n.pulse = 0);
      
      // Draw correlations (lines between close nodes)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const maxDist = 180;
          if (dist < maxDist) {
            const proximity = 1 - dist / maxDist;
            nodes[i].pulse = Math.max(nodes[i].pulse, proximity);
            nodes[j].pulse = Math.max(nodes[j].pulse, proximity);

            // 3D Shapes (Triangles)
            const shapeMaxDist = 140;
            if (dist < shapeMaxDist) {
              for (let k = j + 1; k < nodes.length; k++) {
                const dx2 = nodes[k].x - nodes[j].x;
                const dy2 = nodes[k].y - nodes[j].y;
                const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                if (dist2 < shapeMaxDist) {
                  const dx3 = nodes[k].x - nodes[i].x;
                  const dy3 = nodes[k].y - nodes[i].y;
                  const dist3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);

                   if (dist3 < shapeMaxDist) {
                    const avgPulse = (nodes[i].pulse + nodes[j].pulse + nodes[k].pulse) / 3;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.lineTo(nodes[k].x, nodes[k].y);
                    ctx.closePath();
                    // Subtle geometric fill to create 3D structures
                    ctx.fillStyle = `rgba(255, 255, 255, ${avgPulse * 0.12})`;
                    ctx.fill();
                  }
                }
              }
            }

            // "Finding patterns" - occasionally flash lines brightly
            // Use a pseudo-random hash based on indices and time to trigger flashes
            const flashTrigger = Math.sin(time * 2 + i * 0.1 + j * 0.1);
            const isPattern = flashTrigger > 0.98;
            
            const baseAlpha = proximity * 0.15;
            const alpha = isPattern ? 0.8 : baseAlpha;
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            // Active pattern line: Neon Green
            ctx.strokeStyle = isPattern ? `rgba(74, 222, 128, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = isPattern ? 2 : 0.5;
            ctx.stroke();
            
            if (isPattern) {
              // Draw a data packet moving along the line
              const packetPos = (Math.sin(time * 15 + i) + 1) / 2; // 0 to 1
              const px = nodes[i].x + dx * packetPos;
              const py = nodes[i].y + dy * packetPos;
              
              ctx.beginPath();
              ctx.arc(px, py, 3.5, 0, Math.PI * 2);
              // Packet: Amber/Gold
              ctx.fillStyle = '#fbbf24'; 
              ctx.shadowBlur = 15;
              ctx.shadowColor = '#fbbf24';
              ctx.fill();
              ctx.shadowBlur = 0; // reset
            }
          }
        }
      }

      nodes.forEach(node => {
        node.update();
        node.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      const newNumNodes = Math.floor((width * height) / 8000);
      if (newNumNodes > nodes.length) {
        for (let i = nodes.length; i < newNumNodes; i++) {
          nodes.push(new Node());
        }
      } else {
        nodes.splice(newNumNodes);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />;
};

const aiFeatures = [
  {
    id: '01',
    title: 'Agentic Agency OS',
    titleEn: 'Agentic Agency OS',
    subtitle: 'Not a set of tools. An operating system for an agency.',
    subtitleEn: 'Not a set of tools. An operating system for an agency.',
    description: 'We built the infrastructure before the services. At the core is a Claude Code environment with seven specialized sub-agents - each with a defined role, its own knowledge base, and a strictly scoped set of tools. Agents don\'t share context by accident. Routing is semantic. Isolation is intentional.\n\nClient context lives in per-client folders. Domain knowledge is stored as structured markdown files that agents read before acting. A global CLAUDE.md defines shared rules across all agents. Every irreversible action - sending a message, submitting a form, publishing content - has a human confirmation gate. Nothing happens without explicit approval.',
    descriptionEn: 'We built the infrastructure before the services. At the core is a Claude Code environment with seven specialized sub-agents - each with a defined role, its own knowledge base, and a strictly scoped set of tools. Agents don\'t share context by accident. Routing is semantic. Isolation is intentional.\n\nClient context lives in per-client folders. Domain knowledge is stored as structured markdown files that agents read before acting. A global CLAUDE.md defines shared rules across all agents. Every irreversible action - sending a message, submitting a form, publishing content - has a human confirmation gate. Nothing happens without explicit approval.',
    listTitle: 'ARCHITECTURE & DATA ISOLATION:',
    listTitleEn: 'ARCHITECTURE & DATA ISOLATION:',
    listItems: [
      { pl: '7 sub-agents: client-service · performance · designer · developer · backend · analyst', en: '7 sub-agents: client-service · performance · designer · developer · backend · analyst' },
      { pl: 'CLAUDE.md - global agency config, shared rules across all agents', en: 'CLAUDE.md - global agency config, shared rules across all agents' },
      { pl: 'Composio as integration middleware - one auth layer for all external tools', en: 'Composio as integration middleware - one auth layer for all external tools' },
      { pl: 'Each client has a strictly isolated folder - agents operating on client A have no filesystem access to client B context', en: 'Each client has a strictly isolated folder - agents operating on client A have no filesystem access to client B context' },
      { pl: 'No client data is passed to model providers for training - API access only, under standard data processing terms', en: 'No client data is passed to model providers for training - API access only, under standard data processing terms' }
    ]
  },
  {
    id: '02',
    title: 'Performance Marketing Intelligence',
    titleEn: 'Performance Marketing Intelligence',
    subtitle: 'Real API access. Not scraped screenshots.',
    subtitleEn: 'Real API access. Not scraped screenshots.',
    description: 'Google Ads data comes through MCC-level API integration - campaigns, ad groups, keywords, conversion paths across all client accounts. Meta data comes from the Marketing API. Both feed into a unified view where the LLM operates as an interpretation layer: anomaly detection, automatic narrative generation, ROAS context that explains what happened and why - not just what the numbers are.\n\nThe analyst agent works on structured data, runs SQL when needed, and produces reports with a defined methodology. The media team and the client see the same data - without manual export cycles.',
    descriptionEn: 'Google Ads data comes through MCC-level API integration - campaigns, ad groups, keywords, conversion paths across all client accounts. Meta data comes from the Marketing API. Both feed into a unified view where the LLM operates as an interpretation layer: anomaly detection, automatic narrative generation, ROAS context that explains what happened and why - not just what the numbers are.\n\nThe analyst agent works on structured data, runs SQL when needed, and produces reports with a defined methodology. The media team and the client see the same data - without manual export cycles.',
    listTitle: 'DATA AND INTEGRATIONS:',
    listTitleEn: 'DATA AND INTEGRATIONS:',
    listItems: [
      { pl: 'Google Ads API (MCC) & Meta Marketing API integration', en: 'Google Ads API (MCC) & Meta Marketing API integration' },
      { pl: 'Google Sheets as live data layer - connected, not exported', en: 'Google Sheets as live data layer - connected, not exported' },
      { pl: 'LLM interpretation layer - anomalies, narrative, context-aware alerts', en: 'LLM interpretation layer - anomalies, narrative, context-aware alerts' },
      { pl: 'Campaign data is read directly from platform APIs and written to Google Sheets or BigQuery within Google\'s infrastructure', en: 'Campaign data is read directly from platform APIs and written to Google Sheets or BigQuery within Google\'s infrastructure' },
      { pl: 'API credentials are stored in Composio\'s encrypted vault, never in agent prompts', en: 'API credentials are stored in Composio\'s encrypted vault, never in agent prompts' }
    ]
  },
  {
    id: '03',
    title: 'AI Creative Pipeline',
    titleEn: 'AI Creative Pipeline',
    subtitle: 'From brief to concept. With a pause where it matters.',
    subtitleEn: 'From brief to concept. With a pause where it matters.',
    description: 'The creative pipeline is a Next.js application running a multi-stage agentic flow. A researcher agent processes the brief, identifies gaps, and - when context is insufficient - pauses the pipeline and surfaces clarification questions through a structured interface. Only when the brief is complete does generation begin.\n\nAsset generation is programmatic: Python renders production-ready PNG files in exact format dimensions, using per-client brand templates with isolated color palettes and typography. No hallucinated brand elements. Aesthetic and strategic decisions stay with the human team.',
    descriptionEn: 'The creative pipeline is a Next.js application running a multi-stage agentic flow. A researcher agent processes the brief, identifies gaps, and - when context is insufficient - pauses the pipeline and surfaces clarification questions through a structured interface. Only when the brief is complete does generation begin.\n\nAsset generation is programmatic: Python renders production-ready PNG files in exact format dimensions, using per-client brand templates with isolated color palettes and typography. No hallucinated brand elements. Aesthetic and strategic decisions stay with the human team.',
    listTitle: 'STACK:',
    listTitleEn: 'STACK:',
    listItems: [
      { pl: 'Next.js on Vercel - pipeline interface and multi-agent orchestration', en: 'Next.js on Vercel - pipeline interface and multi-agent orchestration' },
      { pl: 'Multi-agent flow: Researcher - clarification - generation - output', en: 'Multi-agent flow: Researcher - clarification - generation - output' },
      { pl: 'Python + Pillow - programmatic PNG generation in correct ad formats', en: 'Python + Pillow - programmatic PNG generation in correct ad formats' },
      { pl: 'Per-client template system - brand context isolation by folder structure', en: 'Per-client template system - brand context isolation by folder structure' }
    ]
  },
  {
    id: '04',
    title: 'Backend Integration & Automation',
    titleEn: 'Backend Integration & Automation',
    subtitle: 'LLM as decision logic. Not decoration.',
    subtitleEn: 'LLM as decision logic. Not decoration.',
    description: 'The backend agent handles API integrations, webhook orchestration, and the connective tissue between systems. Composio provides the integration middleware - Gmail, Google Docs, Google Sheets, Google Ads, Meta - one connection layer, tool-aware agents that know which action to take and when to ask.\n\nLLM is used where it makes sense: semantic routing of inbound requests, structured data extraction from unstructured inputs, context-preserving summarization. Each automation has a defined prompt with role, context, and output format. None runs on default settings.',
    descriptionEn: 'The backend agent handles API integrations, webhook orchestration, and the connective tissue between systems. Composio provides the integration middleware - Gmail, Google Docs, Google Sheets, Google Ads, Meta - one connection layer, tool-aware agents that know which action to take and when to ask.\n\nLLM is used where it makes sense: semantic routing of inbound requests, structured data extraction from unstructured inputs, context-preserving summarization. Each automation has a defined prompt with role, context, and output format. None runs on default settings.',
    listTitle: 'APPLICATIONS & SECURITY:',
    listTitleEn: 'APPLICATIONS & SECURITY:',
    listItems: [
      { pl: 'Semantic classification for ticket and task routing', en: 'Semantic classification for ticket and task routing' },
      { pl: 'Structured data extraction from emails, forms, and transcripts', en: 'Structured data extraction from emails, forms, and transcripts' },
      { pl: 'All external service credentials managed through Composio\'s OAuth layer', en: 'All external service credentials managed through Composio\'s OAuth layer' },
      { pl: 'Agents operate with minimum necessary permissions - read-only where write access is not required', en: 'Agents operate with minimum necessary permissions - read-only where write access is not required' },
      { pl: 'No automation sends, posts, or modifies external data without an explicit human approval step', en: 'No automation sends, posts, or modifies external data without an explicit human approval step' }
    ]
  },
  {
    id: '05',
    title: 'Research & Analytics',
    titleEn: 'Research & Analytics',
    subtitle: 'Verifiable methodology. Not prompt-and-paste.',
    subtitleEn: 'Verifiable methodology. Not prompt-and-paste.',
    description: 'We conduct in-depth research and analysis with a clearly defined process: sources - extraction - cross-verification - synthesis - output. The language model is a tool at every stage - a parser and structurizer - not a source of facts. Verification happens against verifiable sources, not against the model\'s own confidence.\n\nThe client receives a document with methodology and cited sources. Not a report with hallucinations and no audit trail.',
    descriptionEn: 'We conduct in-depth research and analysis with a clearly defined process: sources - extraction - cross-verification - synthesis - output. The language model is a tool at every stage - a parser and structurizer - not a source of facts. Verification happens against verifiable sources, not against the model\'s own confidence.\n\nThe client receives a document with methodology and cited sources. Not a report with hallucinations and no audit trail.',
    listTitle: 'PROCESS:',
    listTitleEn: 'PROCESS:',
    listItems: [
      { pl: 'Sources - defined and verifiable before work begins', en: 'Sources - defined and verifiable before work begins' },
      { pl: 'Extraction - LLM as parser, not as authority', en: 'Extraction - LLM as parser, not as authority' },
      { pl: 'Cross-verification - claims checked across multiple independent sources', en: 'Cross-verification - claims checked across multiple independent sources' },
      { pl: 'Output - document with methodology, sources, and traceable conclusions', en: 'Output - document with methodology, sources, and traceable conclusions' }
    ]
  }
];

export default function AISupport() {
  const { t, language } = useLanguage();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="bg-[#050505] min-h-[100dvh] relative overflow-hidden text-white pt-32 pb-32 px-4 md:px-8 lg:px-16"
    >
      <SEO 
        title="AI Support | Luźno Agency - Automatyzacja i Sztuczna Inteligencja"
        description="Wykorzystujemy AI do optymalizacji procesów, tworzenia treści i analizy danych. Sprawdź, jak sztuczna inteligencja może pomóc Twojej firmie."
      />
      <DataStreamCanvas />
      
      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] z-0" />
      
      {/* Scanning Line */}
      <motion.div 
        animate={{ y: ['-100vh', '200vh'] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_20px_4px_rgba(34,211,238,0.5),0_0_40px_rgba(34,211,238,0.3)] z-0 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col gap-24">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center gap-4 text-xs font-mono text-white/40 uppercase tracking-widest"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              System Active // Technical Overview
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85]"
            >
              AI<br/>
              <span className="text-white/30">Support</span>
            </motion.h1>
          </div>

          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-col gap-2 font-mono text-[10px] md:text-xs text-white/30 border-l border-white/10 pl-4"
            >
              <p>AGENT_FRAMEWORKS: <span className="text-white/70">ANTYGRAVITY, CLAUDE CODE</span></p>
              <p>INTELLIGENCE_LAYER: <span className="text-white/70">CLAUDE 4.6 SONNET, GEMINI 3.1 PRO, O3-MINI</span></p>
              <p>DATA_ARCHITECTURE: <span className="text-white/70">GCP BIGQUERY, DBT</span></p>
              <p>ORCHESTRATION: <span className="text-white/70">MAKE (ENTERPRISE), CUSTOM WEBHOOKS</span></p>
              <p>SCALING: <span className="text-white/70">12 PARALLEL AGENT INSTANCES</span></p>
            </motion.div>
          </div>
        </div>

        {/* Features List */}
        <div className="flex flex-col gap-12 md:gap-16">
          {aiFeatures.map((feature, index) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative p-6 md:p-10 lg:p-12 border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-black/60 transition-colors duration-500"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/50 transition-colors duration-300 group-hover:border-cyan-400" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/50 transition-colors duration-300 group-hover:border-cyan-400" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/50 transition-colors duration-300 group-hover:border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/50 transition-colors duration-300 group-hover:border-cyan-400" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                
                {/* Left Col: Number & Title */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                  <div className="font-mono text-4xl md:text-5xl font-black text-white/10 group-hover:text-cyan-400/20 transition-colors duration-500">
                    {feature.id}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white/90">
                    {language === 'pl' ? feature.title : (feature.titleEn || feature.title)}
                  </h2>
                  <p className="text-sm md:text-base font-mono text-cyan-400/80 mt-2">
                    {language === 'pl' ? feature.subtitle : feature.subtitleEn}
                  </p>
                </div>

                {/* Right Col: Description & List */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                  <div className="text-base md:text-lg text-white/60 font-light leading-relaxed whitespace-pre-line">
                    {language === 'pl' ? feature.description : feature.descriptionEn}
                  </div>
                  
                  <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent" />

                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest">
                      {language === 'pl' ? feature.listTitle : feature.listTitleEn}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {feature.listItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm md:text-base text-white/80 font-light">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-cyan-400/50 rounded-full shrink-0" />
                          <span>{language === 'pl' ? item.pl : item.en}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.main>
  );
}

