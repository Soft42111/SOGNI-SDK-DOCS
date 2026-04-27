import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Menu, 
  X, 
  Book, 
  Zap, 
  Shield, 
  Cpu, 
  Layers, 
  Video, 
  Music, 
  MessageSquare, 
  Settings,
  ChevronLeft,
  Sun,
  Moon,
  Globe,
  Layout,
  Smartphone,
  Monitor,
  Bot,
  Camera,
  MessageCircle,
  Sparkles,
  RefreshCcw,
  Maximize,
  Send,
  Activity
} from 'lucide-react';
import menuData from './data/menu.json';
import './index.css';

// --- Types ---
interface Page {
  title: string;
  path: string;
}

interface Division {
  title: string;
  pages: Page[];
}

// --- Constants ---
const divisionIcons: Record<string, any> = {
  "Division I: Foundations": Book,
  "Division II: Identity & Economy": Shield,
  "Division III: Client Architecture": Layers,
  "Division IV: Image Synthesis": Zap,
  "Division V: Advanced Control": Cpu,
  "Division VI: WAN Video Engine": Video,
  "Division VII: LTX Video Engine": Video,
  "Division VIII: Audio Engine": Music,
  "Division IX: LLM Cognitive": MessageSquare,
  "Division X: Optimization": Settings
};

// --- Taste Skill UI Components ---

const BentoCard = ({ title, division, pages, icon: Icon, delay = 0 }: any) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="doc-division-card glass-surface"
    >
      <div className="icon-label">
        <Icon size={16} strokeWidth={1.5} />
        <span>Division {division}</span>
      </div>
      <h3>{title}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
        {pages.length} Volumes Coverage
      </p>
      <Link 
        to={`/docs/${pages[0].path}`}
        className="explore-btn"
        style={{ 
          marginTop: 'auto', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: hovered ? 'var(--accent-primary)' : 'var(--text-dim)',
          transition: 'all 0.3s ease'
        }}
      >
        Explore Division <ChevronRight size={14} />
      </Link>
    </motion.div>
  );
};

const MagneticLink = ({ title, desc, icon: Icon, href, external = true }: any) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    cardRef.current.style.setProperty('--x', `${x}%`);
    cardRef.current.style.setProperty('--y', `${y}%`);
  };

  return (
    <motion.a 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      href={href} 
      target={external ? "_blank" : "_self"} 
      rel={external ? "noreferrer" : ""} 
      className="glass-surface taste-card"
      style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}
    >
      <div style={{ color: 'var(--accent-primary)', opacity: 0.8 }}>
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <div>
        <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{title}</h4>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', margin: 0 }}>{desc}</p>
      </div>
    </motion.a>
  );
};

const Footer = () => (
  <footer className="footer-watermark">
    <p style={{ opacity: 0.8, fontSize: '0.9rem', letterSpacing: '0.05em' }}>
      Made by <a href="https://basitresume.xyz" target="_blank" rel="noreferrer" className="gold-glow">Basit</a>
    </p>
  </footer>
);

// --- Sections ---

const LandingPage = () => {
  return (
    <div className="landing-container">
      <section className="hero-section">
        <motion.img 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src="/sogni-logo.png" 
          alt="Sogni Logo" 
          className="brand-logo" 
        />
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3, duration: 1 }}
        >
          <p className="basit-credit">Professional SDK Documentation Developed by Basit</p>
          <h1 className="main-title">SOGNI AI</h1>
          <p style={{ maxWidth: '700px', color: 'var(--text-dim)', fontSize: '1.2rem', margin: '0 auto' }}>
            The definitive technical reference and creative ecosystem for decentralized AI generation. 
            An industrial-grade documentation project.
          </p>
        </motion.div>
      </section>

      <section style={{ padding: '4rem 0' }}>
        <div style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <h2 className="section-title">Technical Encyclopedia</h2>
        </div>
        <div className="bento-grid">
          {menuData.map((div: Division, i: number) => {
            const Icon = divisionIcons[div.title] || Book;
            return (
              <BentoCard 
                key={div.title}
                title={div.title.split(': ')[1]} 
                division={div.title.split(': ')[0].split(' ')[1]}
                pages={div.pages}
                icon={Icon}
                delay={i * 0.1}
              />
            );
          })}
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 className="section-title">Official Resources</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          <MagneticLink title="Official Site" desc="Core Sogni Home" icon={Globe} href="https://sogni.ai" />
          <MagneticLink title="Supernet" desc="TPU Compute Node" icon={Activity} href="https://sogni.ai/supernet" />
          <MagneticLink title="Dashboard" desc="Asset Portal" icon={Layout} href="https://dashboard.sogni.ai" />
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 className="section-title">Applications</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
          <MagneticLink title="Studio Pro" desc="macOS" icon={Monitor} href="https://sogni.ai/studio" />
          <MagneticLink title="Studio" desc="macOS" icon={Monitor} href="https://sogni.ai/studio" />
          <MagneticLink title="Pocket" desc="iOS" icon={Smartphone} href="https://sogni.ai/pocket" />
          <MagneticLink title="Sogni Web" desc="Cloud" icon={Globe} href="https://sogni.ai/sogni-web" />
          <MagneticLink title="Sticker Bot" desc="Bot" icon={Bot} href="https://sogni.ai/sticker" />
          <MagneticLink title="Photobooth" desc="Photo" icon={Camera} href="https://photobooth.sogni.ai" />
          <MagneticLink title="Sogni Chat" desc="AI" icon={MessageSquare} href="https://chat.sogni.ai" />
          <MagneticLink title="Makeover" desc="Magic" icon={Sparkles} href="https://makeover.sogni.ai" />
          <MagneticLink title="Restore" desc="Fix" icon={RefreshCcw} href="https://restore.sogni.ai" />
          <MagneticLink title="Sogni 360" desc="POV" icon={Maximize} href="https://360.sogni.ai" />
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 className="section-title">Community</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          <MagneticLink title="Discord" desc="Join" icon={MessageCircle} href="https://discord.gg/sogni" />
          <MagneticLink title="X/Twitter" desc="Latest" icon={Globe} href="https://x.com/sogni.ai" />
          <MagneticLink title="Telegram" desc="Chat" icon={Send} href="https://t.me/sogniai" />
          <MagneticLink title="Instagram" desc="Art" icon={Camera} href="https://instagram.com/sogni.ai" />
          <MagneticLink title="Reddit" desc="Discuss" icon={Layout} href="https://reddit.com/r/Sogni_Protocol" />
          <MagneticLink title="YouTube" desc="Watch" icon={Video} href="https://youtube.com/@SogniAI" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

// --- Header ---
const Header = ({ 
  onMenuClick, 
  onSearch, 
  theme, 
  onToggleTheme 
}: any) => (
  <header style={{ 
    height: '70px', 
    background: 'var(--glass-base)', 
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--glass-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 100
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <button className="mobile-menu-btn" onClick={onMenuClick} style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text-main)' }}>
        <Menu size={22} />
      </button>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)' }}>
        <img src="/sogni-logo.png" alt="Sogni" height="30" />
        <span style={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.2rem' }}>SOGNI</span>
      </Link>
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', opacity: 0.5 }} />
        <input 
          type="text" 
          placeholder="Search SDK..." 
          onChange={(e) => onSearch(e.target.value)}
          style={{ 
            background: 'rgba(128,128,128,0.1)', 
            border: '1px solid var(--glass-border)',
            borderRadius: '100px',
            padding: '0.6rem 1rem 0.6rem 2.5rem',
            color: 'var(--text-main)',
            outline: 'none',
            fontSize: '0.85rem'
          }}
        />
      </div>
      <button onClick={onToggleTheme} style={{ background: 'none', border: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  </header>
);

// --- Sidebar & Documentation (Kept stable) ---

const Sidebar = ({ isOpen, onClose }: any) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const location = useLocation();

  const toggleExpand = (title: string) => {
    setExpanded(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  useEffect(() => {
    const currentPath = location.hash.replace('#/docs/', '');
    if (currentPath) {
      const division = menuData.find((d: Division) => d.pages.some((p: Page) => p.path === currentPath));
      if (division && !expanded.includes(division.title)) {
        setExpanded(prev => [...prev, division.title]);
      }
    }
  }, [location.hash]);

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-mobile-header">
          <span className="sidebar-mobile-title">Navigation</span>
          <button onClick={onClose} aria-label="Close menu"><X size={20} /></button>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" style={{ padding: '1rem', fontWeight: 600, color: 'var(--accent-primary)', display: 'block' }}>
            ← Home Portal
          </Link>
          {menuData.map((division: Division) => {
            const Icon = divisionIcons[division.title] || Book;
            const isExpanded = expanded.includes(division.title);
            
            return (
              <div key={division.title} className="division-group">
                <button 
                  className={`division-header ${isExpanded ? 'active' : ''}`}
                  onClick={() => toggleExpand(division.title)}
                >
                  <div className="division-title-group">
                    <Icon size={16} className="division-icon" />
                    <span>{division.title}</span>
                  </div>
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                
                <div className={`pages-list ${isExpanded ? 'expanded' : ''}`}>
                  {division.pages.map((page: Page) => {
                    const isActive = location.hash === `#/docs/${page.path}`;
                    return (
                      <Link 
                        key={page.path}
                        to={`/docs/${page.path}`}
                        className={`page-link ${isActive ? 'active' : ''}`}
                        onClick={() => { if(window.innerWidth < 1024) onClose(); }}
                      >
                        {page.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

const DocContent = () => {
  const { slug } = useParams();
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState(true);
  
  const allPages = menuData.flatMap((d: Division) => d.pages);
  const currentIndex = allPages.findIndex((p: Page) => p.path === slug);
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  useEffect(() => {
    setLoading(true);
    const loadMarkdown = async () => {
      try {
        const docName = slug || 'VOL_01_MANIFESTO';
        const response = await fetch(`${import.meta.env.BASE_URL}docs/${docName}.md`);
        if (!response.ok) throw new Error("File not found");
        const text = await response.text();
        if (text.trim().startsWith('<!')) throw new Error("Fallback HTML");
        setMarkdown(text);
      } catch {
        setMarkdown(`# 📄 Volume Not Found\n\nThe requested documentation volume could not be loaded.`);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };
    loadMarkdown();
  }, [slug]);

  if (loading) return <div className="loader"><div className="loader-spinner" /></div>;

  return (
    <article className="doc-article">
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
      <div className="pagination">
        {prevPage && (
          <Link to={`/docs/${prevPage.path}`} className="pagination-btn prev">
            <ChevronLeft size={18} />
            <div><span className="pg-direction">Previous</span><span className="pg-title">{prevPage.title}</span></div>
          </Link>
        )}
        {nextPage && (
          <Link to={`/docs/${nextPage.path}`} className="pagination-btn next">
            <div style={{ textAlign: 'right' }}><span className="pg-direction">Next</span><span className="pg-title">{nextPage.title}</span></div>
            <ChevronRight size={18} />
          </Link>
        )}
      </div>
      <Footer />
    </article>
  );
};

// --- App ---
const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem('sogni-theme') || 'dark');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sogni-theme', theme);
  }, [theme]);

  const allPages = menuData.flatMap((d: Division) => d.pages);
  const searchResults = searchQuery.trim().length > 1
    ? allPages.filter((p: Page) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const isHome = location.pathname === '/';

  return (
    <div className="app-container">
      <Header 
        onMenuClick={() => setIsSidebarOpen(true)} 
        onSearch={setSearchQuery}
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
      />
      <div className="main-layout">
        {!isHome && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
        <main className="content-area" style={{ padding: isHome ? '0' : undefined }}>
          <AnimatePresence mode="wait">
            {searchResults.length > 0 ? (
              <motion.div 
                key="search"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="search-results"
              >
                <h2>Search Results for "{searchQuery}"</h2>
                <div className="results-list">
                  {searchResults.map((p: Page) => (
                    <Link key={p.path} to={`/docs/${p.path}`} className="result-item" onClick={() => setSearchQuery("")}>
                      <Book size={16} /><span>{p.title}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ) : (
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/docs/:slug" element={<DocContent />} />
              </Routes>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;
