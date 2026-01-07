
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Network from './pages/Network';
import Assistant from './pages/Assistant';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';

const NavLink = ({ to, active, children }: React.PropsWithChildren<{ to: string, active: boolean }>) => (
  <Link 
    to={to} 
    className={`relative px-8 py-2 text-[13px] font-mono tracking-[0.4em] uppercase transition-all duration-500 font-bold ${
      active ? 'text-teal-400' : 'text-slate-500 hover:text-white'
    }`}
  >
    {children}
    {active && <span className="absolute bottom-[-10px] left-8 right-8 h-[2px] bg-teal-400 shadow-[0_0_15px_#14b8a6]"></span>}
  </Link>
);

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-[60] bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-16 h-24 flex justify-between items-center">
        <Link to="/" className="group flex items-center space-x-4">
          <div className="relative">
            <div className="w-10 h-10 border border-teal-500/30 group-hover:rotate-180 transition-all duration-1000 flex items-center justify-center">
              <div className="w-4 h-4 bg-teal-500 shadow-[0_0_10px_#14b8a6]"></div>
            </div>
            <div className="absolute inset-0 bg-teal-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all"></div>
          </div>
          <span className="text-xl font-black tracking-[0.2em] uppercase font-outfit">Conectarapak<span className="text-teal-500 italic">.ai</span></span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-2">
          <NavLink to="/" active={isActive('/')}>Inicio</NavLink>
          <NavLink to="/dashboard" active={isActive('/dashboard')}>Terminal</NavLink>
          <NavLink to="/projects" active={isActive('/projects')}>Activos</NavLink>
          <NavLink to="/network" active={isActive('/network')}>Red</NavLink>
          <Link 
            to="/assistant" 
            className="ml-12 px-10 py-4 bg-teal-500/5 border border-teal-500/20 text-[11px] font-mono uppercase tracking-[0.5em] font-black hover:bg-teal-500 hover:text-white transition-all duration-500 glow-teal"
          >
            Advisor Core
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
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/network" element={<Network />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        
        <footer className="bg-[#050505] text-white pt-48 pb-16 px-8 md:px-16 border-t border-white/5">
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
                      <Link to="/projects" className="text-xs font-light hover:text-teal-400 transition-all uppercase tracking-widest">Activos</Link>
                      <Link to="/network" className="text-xs font-light hover:text-teal-400 transition-all uppercase tracking-widest">Nodos</Link>
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
              <div className="stretched-text text-[7.2vw] font-black text-teal-500/20 select-none pointer-events-none font-outfit uppercase tracking-widest">
                ConecTarapak
              </div>
            </div>

            <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-mono text-slate-700 uppercase tracking-[0.4em]">
              <div className="flex items-center gap-6">
                <span>© 2024 CONECTARAPAK GLOBAL HUB</span>
                <span className="text-white/10">|</span>
                <span className="text-amber-600/50">SYSTEM STATUS: OPTIMAL</span>
              </div>
              <div className="flex gap-12">
                <a href="#" className="hover:text-teal-400">LEGAL COMPLIANCE</a>
                <a href="#" className="hover:text-teal-400">NETWORK BYLAWS</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
