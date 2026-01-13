
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Network from './pages/Network';
import Assistant from './pages/Assistant';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';

const MarketTicker = () => {
  const initialStocks = [
    { symbol: 'BTC/USD', price: 92432.50, change: 1.24, category: 'CRYPTO' },
    { symbol: 'ETH/USD', price: 2753.12, change: -0.85, category: 'CRYPTO' },
    { symbol: 'SOL/USD', price: 185.67, change: 4.12, category: 'CRYPTO' },
    { symbol: 'COBRE (HG1!)', price: 4.32, change: 0.15, category: 'COMMODITY' },
    { symbol: 'LITIO (LIT)', price: 14.45, change: -2.10, category: 'COMMODITY' },
    { symbol: 'NVDA (AI-PROXY)', price: 135.20, change: 2.45, category: 'TECH' },
    { symbol: 'S&P 500', price: 5924.10, change: 0.54, category: 'MARKET' },
    { symbol: 'NASDAQ 100', price: 19452.00, change: 0.88, category: 'MARKET' },
    { symbol: 'USD/CLP', price: 924.20, change: -0.22, category: 'FOREX' },
    { symbol: 'BRENT OIL', price: 78.45, change: 1.15, category: 'ENERGY' },
    { symbol: 'ORO (XAU)', price: 2742.10, change: 0.32, category: 'SAFE_HAVEN' },
  ];

  const [stocks, setStocks] = useState(initialStocks);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(current => current.map(s => ({
        ...s,
        price: s.price + (Math.random() - 0.5) * (s.price * 0.0008),
        change: s.change + (Math.random() - 0.5) * 0.05
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const TickerList = () => (
    <>
      {stocks.map((s, i) => (
        <div key={i} className="flex items-center space-x-6 px-12 border-r border-white/10 h-full group cursor-pointer hover:bg-white/5 transition-colors">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-slate-500 font-black tracking-widest uppercase mb-0.5">
              {s.category}
            </span>
            <span className="text-[11px] font-mono font-black text-white/90 whitespace-nowrap tracking-tighter">
              {s.symbol}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[12px] font-mono font-black text-white">
              {s.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={`text-[9px] font-mono font-black flex items-center leading-none ${s.change >= 0 ? 'text-teal-400' : 'text-rose-500'}`}>
              <i className={`fas fa-caret-${s.change >= 0 ? 'up' : 'down'} mr-1`}></i>
              {Math.abs(s.change).toFixed(2)}%
            </span>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-12 bg-black/95 backdrop-blur-xl border-b border-teal-500/30 overflow-hidden select-none shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="animate-ticker h-full items-center">
        <TickerList />
        <TickerList />
      </div>
      <div className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-black via-black/80 to-transparent pl-20 pr-6 flex items-center">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_#14b8a6]"></span>
          <span className="text-[9px] font-mono text-teal-500 font-black tracking-[0.3em] uppercase">SINCRO_RT</span>
        </div>
      </div>
    </div>
  );
};

const NavLink = ({ to, active, children }: React.PropsWithChildren<{ to: string, active: boolean }>) => (
  <Link 
    to={to} 
    className={`relative px-8 py-2 text-[13px] font-mono tracking-[0.4em] uppercase transition-all duration-500 font-bold ${
      active ? 'text-teal-400' : 'text-slate-400 hover:text-white'
    }`}
  >
    {children}
    {active && (
      <span className="absolute bottom-[-10px] left-8 right-8 h-[2px] bg-teal-400 shadow-[0_0_20px_#14b8a6]">
        <span className="absolute inset-0 bg-teal-400 animate-pulse"></span>
      </span>
    )}
  </Link>
);

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-12 z-[60] bg-[#0f172a]/90 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-16 h-24 flex justify-between items-center">
        <Link to="/" className="group flex items-center space-x-5">
          <div className="relative">
            <div className="w-12 h-12 border-2 border-teal-500/20 group-hover:border-teal-500 group-hover:rotate-180 transition-all duration-1000 flex items-center justify-center rounded-sm">
              <div className="w-5 h-5 bg-teal-500 shadow-[0_0_20px_#14b8a6]"></div>
            </div>
            <div className="absolute inset-0 bg-teal-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-[0.1em] uppercase font-outfit leading-none">Conectarapak</span>
            <span className="text-[10px] font-mono text-teal-500 font-bold tracking-[0.4em] uppercase">Intelligence Hub</span>
          </div>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-2">
          <NavLink to="/" active={isActive('/')}>Inicio</NavLink>
          <NavLink to="/dashboard" active={isActive('/dashboard')}>Terminal</NavLink>
          <NavLink to="/projects" active={isActive('/projects')}>Proyectos</NavLink>
          <NavLink to="/network" active={isActive('/network')}>Red</NavLink>
          <Link 
            to="/assistant" 
            className="ml-12 px-10 py-4 bg-teal-500/10 border border-teal-500/30 text-[11px] font-mono uppercase tracking-[0.5em] font-black hover:bg-teal-500 hover:text-white transition-all duration-500 glow-teal relative group overflow-hidden"
          >
            <span className="relative z-10">Núcleo Asesor</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-teal-500 selection:text-white">
        <MarketTicker />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/network" element={<Network />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project-detail/:id" element={<ProjectDetail />} />
          </Routes>
        </main>
        
        <footer className="bg-[#0f172a] text-white pt-48 pb-16 px-8 md:px-16 border-t border-white/5">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-32">
              <div className="lg:col-span-7">
                <h2 className="text-[10vw] lg:text-[110px] font-black leading-[0.9] tracking-tighter uppercase font-outfit">
                  TARAPACÁ <br />
                  <span className="text-teal-500">AL MUNDO</span>
                </h2>
              </div>

              <div className="lg:col-span-5 border-l border-white/5 pl-16 space-y-16">
                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <span className="text-[10px] font-mono text-teal-500 uppercase tracking-widest font-black">Navegación</span>
                    <nav className="flex flex-col space-y-4">
                      <Link to="/" className="text-xs font-light hover:text-teal-400 transition-all uppercase tracking-widest">Protocolo</Link>
                      <Link to="/projects" className="text-xs font-light hover:text-teal-400 transition-all uppercase tracking-widest">Proyectos</Link>
                      <Link to="/network" className="text-xs font-light hover:text-teal-400 transition-all uppercase tracking-widest">Red</Link>
                    </nav>
                  </div>
                  <div className="space-y-6">
                    <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-black">Social</span>
                    <div className="flex space-x-6 text-xl">
                      <a href="#" className="hover:text-teal-500 transition-all"><i className="fab fa-linkedin"></i></a>
                      <a href="#" className="hover:text-teal-500 transition-all"><i className="fab fa-x-twitter"></i></a>
                    </div>
                  </div>
                </div>
                
                <div className="pt-12 border-t border-white/5">
                  <p className="text-[10px] font-mono text-slate-500 leading-relaxed uppercase tracking-[0.2em]">
                    ConecTarapak consolida la innovación del norte chileno mediante IA y capital global. Transformamos el desierto en un laboratorio de futuro sostenible.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative pt-32 pb-16 overflow-visible">
              <div className="stretched-text text-[7.2vw] font-black text-teal-500/10 select-none pointer-events-none font-outfit uppercase tracking-widest">
                ConecTarapak
              </div>
            </div>

            <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-mono text-slate-500 uppercase tracking-[0.4em]">
              <div className="flex items-center gap-6">
                <span>© 2024 HUB GLOBAL CONECTARAPAK</span>
                <span className="text-white/10">|</span>
                <span className="text-amber-600/50">ESTADO DEL SISTEMA: ÓPTIMO</span>
              </div>
              <div className="flex gap-12">
                <a href="#" className="hover:text-teal-400">CUMPLIMIENTO LEGAL</a>
                <a href="#" className="hover:text-teal-400">REGLAMENTOS DE RED</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
