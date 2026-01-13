
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

const FICTITIOUS_PROJECTS: Project[] = [
  { 
    id: 'p1', 
    title: 'H2V-Nexus Rapak', 
    creator: 'Atacama Hydrogen Corp', 
    description: 'Planta piloto de producción de Hidrógeno Verde para transporte minero pesado utilizando energía eólica residual.', 
    category: 'Energía / H2V', 
    goal: 450000, 
    raised: 125000, 
    investors: 42, 
    image: 'https://images.unsplash.com/photo-1508791191529-0a3333cd0941?q=80&w=800', 
    status: 'active',
    minInvestment: 500,
    daysLeft: 42,
    valuation: 3200000,
    returnEstimate: '22% TIR',
    riskLevel: 'Alto',
    milestones: [
      { label: 'INGENIERÍA BÁSICA', amount: 50000, completed: true },
      { label: 'PERMISOS AMBIENTALES', amount: 150000, completed: false },
      { label: 'MONTAJE ELECTROLIZADOR', amount: 250000, completed: false }
    ],
    team: [{ name: 'Carlos Meza', role: 'CTO Energy', img: 'https://i.pravatar.cc/150?u=carlos' }]
  },
  { 
    id: 'p2', 
    title: 'Desal-Grid Modular', 
    creator: 'Eco-H2O Tara', 
    description: 'Sistema descentralizado de desalinización por ósmosis inversa alimentado por paneles solares bifaciales.', 
    category: 'Infraestructura / Agua', 
    goal: 180000, 
    raised: 165000, 
    investors: 112, 
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800', 
    status: 'active',
    minInvestment: 200,
    daysLeft: 12,
    valuation: 950000,
    returnEstimate: '15% ROI',
    riskLevel: 'Moderado',
    milestones: [
      { label: 'PROTOTIPO ALPHA', amount: 40000, completed: true },
      { label: 'VALIDACIÓN EN SALAR', amount: 80000, completed: true },
      { label: 'RED DE DISTRIBUCIÓN', amount: 60000, completed: false }
    ],
    team: [{ name: 'Elena Solís', role: 'Director Proyecto', img: 'https://i.pravatar.cc/150?u=elena' }]
  },
  { 
    id: 'p3', 
    title: 'Lithium-Trace BC', 
    creator: 'White Gold Systems', 
    description: 'Protocolo de trazabilidad blockchain para asegurar la procedencia ética y baja huella de carbono del litio.', 
    category: 'SaaS / Blockchain', 
    goal: 85000, 
    raised: 85000, 
    investors: 89, 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800', 
    status: 'funded',
    minInvestment: 100,
    daysLeft: 0,
    valuation: 1500000,
    returnEstimate: '18% Dividendos',
    riskLevel: 'Bajo',
    milestones: [
      { label: 'MVB BLOCKCHAIN', amount: 30000, completed: true },
      { label: 'CONTRATO MINERO PILOTO', amount: 55000, completed: true }
    ],
    team: [{ name: 'Lucas Viana', role: 'Core Dev', img: 'https://i.pravatar.cc/150?u=lucas' }]
  },
  { 
    id: 'p4', 
    title: 'Agro-Dry Vertical', 
    creator: 'Desert Harvest', 
    description: 'Granjas verticales automatizadas con hidroponía de precisión para cultivo de vegetales en zonas desérticas extremas.', 
    category: 'Agro-Tech', 
    goal: 120000, 
    raised: 45000, 
    investors: 28, 
    image: 'https://images.unsplash.com/photo-1530836361253-ee294074b4b4?q=80&w=800', 
    status: 'active',
    minInvestment: 300,
    daysLeft: 35,
    valuation: 720000,
    returnEstimate: '20% TIR',
    riskLevel: 'Moderado',
    milestones: [
      { label: 'VALIDACIÓN IA RIEGO', amount: 40000, completed: true },
      { label: 'ESTRUCTURA MÓDULO 1', amount: 80000, completed: false }
    ],
    team: [{ name: 'Sara Wu', role: 'Agrónoma IA', img: 'https://i.pravatar.cc/150?u=sara' }]
  },
  { 
    id: 'p5', 
    title: 'Bio-Relave Recovery', 
    creator: 'Circular Minerals', 
    description: 'Biotecnología aplicada para la recuperación de minerales valiosos a partir de relaves mineros abandonados.', 
    category: 'Minería / Circular', 
    goal: 280000, 
    raised: 210000, 
    investors: 156, 
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800', 
    status: 'active',
    minInvestment: 1000,
    daysLeft: 18,
    valuation: 4100000,
    returnEstimate: '25% TIR',
    riskLevel: 'Alto',
    milestones: [
      { label: 'CEPAS BACTERIANAS', amount: 60000, completed: true },
      { label: 'PLANTA PILOTO MÓVIL', amount: 220000, completed: false }
    ],
    team: [{ name: 'Dr. Aris Tech', role: 'Chief Scientist', img: 'https://i.pravatar.cc/150?u=aris' }]
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [invAmount, setInvAmount] = useState<number>(0);
  const [protocolStatus, setProtocolStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  
  // Matriz de Filtros
  const [riskFilter, setRiskFilter] = useState('Todos');
  const [returnFilter, setReturnFilter] = useState('Todos');
  const [stageFilter, setStageFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [selectedProject]);

  const filteredProjects = useMemo(() => {
    return FICTITIOUS_PROJECTS.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.creator.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRisk = riskFilter === 'Todos' || p.riskLevel === riskFilter;
      
      const returnVal = parseFloat(p.returnEstimate) || 0;
      let matchesReturn = returnFilter === 'Todos';
      if (returnFilter === '<15%') matchesReturn = returnVal < 15;
      if (returnFilter === '15-20%') matchesReturn = returnVal >= 15 && returnVal <= 20;
      if (returnFilter === '>20%') matchesReturn = returnVal > 20;

      const completedMilestones = p.milestones.filter(m => m.completed).length;
      let matchesStage = stageFilter === 'Todos';
      if (stageFilter === 'Semilla') matchesStage = completedMilestones === 0;
      if (stageFilter === 'Validación') matchesStage = completedMilestones >= 1 && p.status !== 'funded';
      if (stageFilter === 'Consolidado') matchesStage = p.status === 'funded';

      return matchesSearch && matchesRisk && matchesReturn && matchesStage;
    });
  }, [riskFilter, returnFilter, stageFilter, searchQuery]);

  const handleExecute = () => {
    setProtocolStatus('processing');
    setTimeout(() => {
      setProtocolStatus('success');
      setTimeout(() => {
        setProtocolStatus('idle');
        setSelectedProject(null);
      }, 2000);
    }, 2500);
  };

  const calculateStats = useMemo(() => {
    if (!selectedProject) return { equity: 0, return: 0 };
    const equity = (invAmount / selectedProject.valuation) * 100;
    const estimatedReturn = invAmount * (parseFloat(selectedProject.returnEstimate) / 100 + 1);
    return { equity, return: estimatedReturn };
  }, [invAmount, selectedProject]);

  return (
    <div className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 py-24 min-h-screen">
      
      <header className="reveal flex flex-col space-y-16 border-b border-sky-500/10 pb-20 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></div>
              <span className="text-[12px] font-mono text-sky-500 uppercase tracking-[0.6em] font-black">Capital de Impacto Regional</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-outfit leading-none">
              Proyectos <br/><span className="text-white/20 italic">de Inversión</span>
            </h1>
          </div>
          
          <div className="flex flex-col gap-6 w-full md:w-auto">
             <div className="flex justify-end">
                <Link to="/onboarding" className="px-10 py-5 bg-teal-500 text-white font-mono text-[11px] uppercase tracking-[0.5em] font-black hover:bg-white hover:text-black transition-all glow-teal shadow-2xl flex items-center gap-4 group">
                  <i className="fas fa-plus group-hover:rotate-90 transition-transform"></i>
                  Registrar Activo
                </Link>
             </div>
             
             <div className="flex gap-4">
                <div className="relative group flex-grow md:flex-none">
                    <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-sky-900"></i>
                    <input 
                      type="text" 
                      placeholder="BUSCAR PROYECTO..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-900/40 border border-sky-500/10 focus:border-sky-500/50 focus:outline-none px-16 py-5 text-[11px] font-mono tracking-[0.2em] w-full md:w-[400px] uppercase text-white"
                    />
                </div>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-widest transition-all ${showFilters ? 'bg-teal-500 text-white border-teal-500' : 'bg-white/5 border border-white/10 text-slate-400'}`}
                >
                  <i className="fas fa-sliders"></i>
                  Terminal de Filtros
                </button>
             </div>
          </div>
        </div>

        {/* Terminal de Filtros Desplegable */}
        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${showFilters ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="aero-panel p-10 grid grid-cols-1 md:grid-cols-3 gap-12 border-teal-500/20 tech-frame mb-12 shadow-2xl">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-teal-500 uppercase tracking-widest font-black block">Matriz de Riesgo</span>
              <div className="flex flex-wrap gap-2">
                {['Todos', 'Bajo', 'Moderado', 'Alto'].map(r => (
                  <button key={r} onClick={() => setRiskFilter(r)} className={`px-4 py-2 text-[9px] font-mono border uppercase transition-all ${riskFilter === r ? 'bg-teal-500 border-teal-500 text-white' : 'border-white/5 text-slate-500 hover:border-white/20'}`}>{r}</button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-teal-500 uppercase tracking-widest font-black block">Proyección Retorno</span>
              <div className="flex flex-wrap gap-2">
                {['Todos', '<15%', '15-20%', '>20%'].map(r => (
                  <button key={r} onClick={() => setReturnFilter(r)} className={`px-4 py-2 text-[9px] font-mono border uppercase transition-all ${returnFilter === r ? 'bg-teal-500 border-teal-500 text-white' : 'border-white/5 text-slate-500 hover:border-white/20'}`}>{r}</button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-teal-500 uppercase tracking-widest font-black block">Etapa Desarrollo</span>
              <div className="flex flex-wrap gap-2">
                {['Todos', 'Semilla', 'Validación', 'Consolidado'].map(s => (
                  <button key={s} onClick={() => setStageFilter(s)} className={`px-4 py-2 text-[9px] font-mono border uppercase transition-all ${stageFilter === s ? 'bg-teal-500 border-teal-500 text-white' : 'border-white/5 text-slate-500 hover:border-white/20'}`}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredProjects.map((p, idx) => (
          <div 
            key={p.id} 
            className="reveal aero-panel tech-frame group hover:border-teal-500/50 transition-all duration-700 cursor-pointer overflow-hidden flex flex-col" 
            style={{ transitionDelay: `${idx * 100}ms` }}
            onClick={() => { setSelectedProject(p); setInvAmount(p.minInvestment); }}
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="bg-teal-500 text-[9px] font-mono px-3 py-1.5 uppercase font-black tracking-widest shadow-2xl">{p.category.split('/')[0]}</span>
                <span className={`text-[9px] font-mono px-3 py-1.5 uppercase font-black tracking-widest shadow-2xl ${p.riskLevel === 'Alto' ? 'bg-rose-600' : p.riskLevel === 'Moderado' ? 'bg-amber-600' : 'bg-green-600'}`}>RIESGO_{p.riskLevel.toUpperCase()}</span>
              </div>
            </div>

            <div className="p-10 flex-grow flex flex-col space-y-8">
              <div className="space-y-2">
                <h3 className="text-3xl font-black uppercase font-outfit tracking-tighter group-hover:text-teal-400 transition-colors leading-none">{p.title}</h3>
                <div className="flex justify-between items-center">
                    <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-black">Por {p.creator}</p>
                    <span className="text-[11px] font-mono text-teal-500 font-bold">{p.returnEstimate}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-6">
                <div className="flex justify-between items-end">
                   <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-600 uppercase font-black tracking-widest">Recaudado</span>
                      <p className="text-2xl font-black font-outfit tracking-tighter">${p.raised.toLocaleString()}</p>
                   </div>
                   <div className="text-right space-y-1">
                      <span className="text-[9px] font-mono text-slate-600 uppercase font-black tracking-widest">Inversores</span>
                      <p className="text-2xl font-black font-outfit tracking-tighter text-teal-500">{p.investors}</p>
                   </div>
                </div>

                <div className="space-y-2">
                  <div className="h-1 bg-slate-900 w-full overflow-hidden">
                    <div 
                      className="h-full bg-teal-500 transition-all duration-1000" 
                      style={{ width: `${Math.min((p.raised/p.goal)*100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[9px] font-mono font-black uppercase tracking-widest">
                    <span className="text-teal-800">{((p.raised/p.goal)*100).toFixed(0)}% SINCRO</span>
                    <span className="text-slate-700">OBJ: ${p.goal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 flex items-center justify-center p-6 md:p-12 backdrop-blur-3xl animate-in fade-in duration-500">
          <div className="aero-panel w-full max-w-[1500px] h-[90vh] flex flex-col relative overflow-hidden border-teal-500/30 tech-frame">
            
            {protocolStatus === 'processing' && (
              <div className="absolute inset-0 z-[120] bg-slate-950/90 flex flex-col items-center justify-center space-y-8 backdrop-blur-2xl">
                <div className="w-20 h-20 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[11px] font-mono text-teal-500 uppercase tracking-[0.8em] font-black animate-pulse">AUTENTICANDO TRANSACCIÓN...</p>
              </div>
            )}

            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-[#0f172a]/60 shrink-0">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-teal-500 uppercase tracking-[0.4em] font-black">Auditoría Regional Activa</span>
                <h2 className="text-4xl md:text-5xl font-black uppercase font-outfit leading-none tracking-tighter">{selectedProject.title}</h2>
              </div>
              <button onClick={() => setSelectedProject(null)} className="w-12 h-12 border border-white/10 hover:border-teal-500 transition-all text-xl">✕</button>
            </div>

            <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
              <div className="flex-grow overflow-y-auto p-12 md:p-16 space-y-20 custom-scrollbar">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
                  <div className="space-y-12">
                    <section className="tech-frame p-8 bg-white/[0.01] space-y-6">
                      <h4 className="text-[11px] font-mono text-teal-500 uppercase tracking-[0.6em] font-black border-b border-white/5 pb-4">Tesis_Estratégica</h4>
                      <p className="text-lg font-light leading-relaxed text-slate-300 italic">"{selectedProject.description}"</p>
                    </section>
                    <section className="tech-frame p-8 bg-slate-900/40 space-y-10">
                      <h4 className="text-[11px] font-mono text-teal-500 uppercase tracking-[0.6em] font-black border-b border-white/5 pb-4">Hoja_de_Ruta_Fisica</h4>
                      <div className="space-y-6">
                        {selectedProject.milestones.map((m, i) => (
                          <div key={i} className={`flex items-center justify-between p-5 border transition-all ${m.completed ? 'border-teal-500/20 bg-teal-500/5' : 'border-white/5 opacity-40'}`}>
                            <div className="flex items-center gap-4">
                              <span className="text-[9px] font-mono text-teal-800 font-black">0{i+1}</span>
                              <span className="text-xs font-black uppercase tracking-widest">{m.label}</span>
                            </div>
                            <span className="text-[10px] font-mono text-teal-600">${m.amount.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                  <div className="space-y-8">
                     <img src={selectedProject.image} className="w-full h-80 object-cover grayscale opacity-50 tech-frame" alt="" />
                     <div className="grid grid-cols-2 gap-4">
                       <div className="p-6 aero-panel text-center">
                         <span className="text-[9px] font-mono text-slate-600 uppercase block mb-1">Riesgo Auditado</span>
                         <span className="text-lg font-black text-white uppercase font-outfit">{selectedProject.riskLevel}</span>
                       </div>
                       <div className="p-6 aero-panel text-center">
                         <span className="text-[9px] font-mono text-slate-600 uppercase block mb-1">Potencial Retorno</span>
                         <span className="text-lg font-black text-teal-500 uppercase font-outfit">{selectedProject.returnEstimate}</span>
                       </div>
                     </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[450px] bg-teal-500/[0.02] border-l border-white/5 flex flex-col shrink-0 p-12 space-y-12">
                <div className="tech-frame p-10 bg-[#0f172a]/70 shadow-2xl space-y-10">
                  <h5 className="text-[11px] font-mono text-teal-400 uppercase font-black tracking-[0.5em] border-b border-white/5 pb-6">Terminal de Inyección</h5>
                  <div className="space-y-8">
                    <div className="flex flex-col gap-4">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] font-black">Monto a Inyectar (USD)</span>
                      <div className="flex items-baseline justify-between border-b border-white/10 pb-2">
                        <span className="text-teal-500 text-2xl font-black font-mono">$</span>
                        <input 
                          type="number" 
                          value={invAmount} 
                          onChange={(e) => setInvAmount(Math.max(selectedProject.minInvestment, Number(e.target.value)))}
                          className="bg-transparent text-white text-5xl font-black font-outfit tracking-tighter w-full text-right focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-slate-700 uppercase font-black">
                      <span>Mínimo Protocolo: ${selectedProject.minInvestment}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-slate-600 uppercase font-black tracking-widest">Participación Equity</span>
                          <span className="text-2xl font-black text-white font-outfit">{calculateStats.equity.toFixed(4)}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-slate-600 uppercase font-black tracking-widest">Retorno Proyectado</span>
                          <span className="text-2xl font-black text-teal-500 font-outfit">${calculateStats.return.toLocaleString()}</span>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto space-y-6">
                  <button 
                    onClick={handleExecute}
                    disabled={protocolStatus !== 'idle'}
                    className={`w-full py-8 text-white font-mono text-[14px] uppercase tracking-[1em] font-black transition-all duration-700 tech-frame shadow-2xl overflow-hidden ${
                      protocolStatus === 'success' ? 'bg-green-600' : 'bg-teal-500 hover:bg-white hover:text-black'
                    }`}
                  >
                    {protocolStatus === 'idle' && 'EJECUTAR ORDEN'}
                    {protocolStatus === 'processing' && 'SINCRO_RT...'}
                    {protocolStatus === 'success' && 'ORDEN CONFIRMADA'}
                  </button>
                  <p className="text-[9px] text-center text-slate-600 uppercase font-mono tracking-widest leading-relaxed italic">Al ejecutar, acepta los términos de gobernanza del Distrito Rapak.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
