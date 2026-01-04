
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
      active ? 'text-sky-400' : 'text-slate-400 hover:text-white'
    }`}
  >
    {children}
    {active && <span className="absolute bottom-[-10px] left-8 right-8 h-[3px] bg-sky-400 shadow-[0_0_15px_#0ea5e9]"></span>}
  </Link>
);

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-[60] bg-black/60 backdrop-blur-2xl border-b border-sky-500/10">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-16 h-24 flex justify-between items-center">
        <Link to="/" className="group flex items-center space-x-4">
          <div className="relative">
            <div className="w-10 h-10 border border-sky-500/50 group-hover:rotate-180 transition-all duration-1000 flex items-center justify-center">
              <div className="w-4 h-4 bg-sky-500"></div>
            </div>
            <div className="absolute inset-0 bg-sky-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all"></div>
          </div>
          <span className="text-xl font-black tracking-[0.2em] uppercase font-outfit">Conectarapak<span className="text-sky-500 italic">.ai</span></span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-2">
          <NavLink to="/" active={isActive('/')}>Inteligencia</NavLink>
          <NavLink to="/dashboard" active={isActive('/dashboard')}>Terminal</NavLink>
          <NavLink to="/projects" active={isActive('/projects')}>Activos</NavLink>
          <NavLink to="/network" active={isActive('/network')}>Red</NavLink>
          <Link 
            to="/assistant" 
            className="ml-12 px-10 py-4 bg-sky-500/10 border border-sky-500/30 text-[12px] font-mono uppercase tracking-[0.4em] font-black hover:bg-sky-500 hover:text-white transition-all duration-500 glow-cyan"
          >
            Núcleo Advisor
          </Link>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-sky-500 selection:text-white">
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
        
        <footer className="bg-black text-white pt-48 pb-16 px-8 md:px-16 border-t border-sky-900/30">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-32">
              <div className="lg:col-span-7">
                <h2 className="text-[12vw] lg:text-[130px] font-black leading-[0.8] tracking-tighter uppercase font-outfit">
                  INGENIERÍA <br />
                  <span className="text-sky-500">NUEVAS FRONTERAS</span>
                </h2>
              </div>

              <div className="lg:col-span-5 border-l border-sky-900/50 pl-16 space-y-20">
                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <span className="text-[10px] font-mono text-sky-500 uppercase tracking-widest font-black">Arquitectura</span>
                    <nav className="flex flex-col space-y-4">
                      <Link to="/" className="text-sm font-light hover:text-sky-400 transition-all uppercase tracking-widest">Protocolo</Link>
                      <Link to="/projects" className="text-sm font-light hover:text-sky-400 transition-all uppercase tracking-widest">Sala de Activos</Link>
                      <Link to="/network" className="text-sm font-light hover:text-sky-400 transition-all uppercase tracking-widest">Registro de Nodos</Link>
                    </nav>
                  </div>
                  <div className="space-y-6">
                    <span className="text-[10px] font-mono text-sky-500 uppercase tracking-widest font-black">Conectar</span>
                    <div className="flex space-x-6 text-2xl">
                      <a href="#" className="hover:text-sky-500 transition-all"><i className="fab fa-linkedin"></i></a>
                      <a href="#" className="hover:text-sky-500 transition-all"><i className="fab fa-x-twitter"></i></a>
                      <a href="#" className="hover:text-sky-500 transition-all"><i className="fab fa-discord"></i></a>
                    </div>
                  </div>
                </div>
                
                <div className="pt-12 border-t border-sky-900/30">
                  <p className="text-[10px] font-mono text-slate-500 leading-relaxed uppercase tracking-[0.2em]">
                    ConecTarapak es la plataforma líder de crowdfunding en la región de Tarapacá, diseñada para consolidar proyectos y alianzas con miras al escalamiento global. Potenciamos ideas innovadoras mediante IA, integrando el impacto ambiental y la economía circular en el corazón del crecimiento regional.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative pt-32 overflow-hidden">
              <div className="stretched-text text-[25vw] font-black text-sky-500 select-none pointer-events-none">
                CONECTARAPAK
              </div>
            </div>

            <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-mono text-slate-600 uppercase tracking-[0.4em]">
              <div className="flex items-center gap-6">
                <span>© 2024 CONECTARAPAK REGIONAL</span>
                <span className="text-sky-900">|</span>
                <span>ESTADO DEL SISTEMA: ÓPTIMO</span>
              </div>
              <div className="flex gap-12">
                <a href="#" className="hover:text-sky-400">PRIVACIDAD DE DATOS</a>
                <a href="#" className="hover:text-sky-400">CUMPLIMIENTO DE RED</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
