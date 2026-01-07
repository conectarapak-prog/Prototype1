
import React, { useState, useMemo, useEffect } from 'react';
import { Project } from '../types';

const MOCK_PROJECTS: Project[] = [
  { 
    id: '1', 
    title: 'Desal-Solar Circular', 
    creator: 'Eco-Innova Tara', 
    description: 'Planta modular de desalinización solar con cero emisiones y aprovechamiento de salmuera para procesos industriales.', 
    category: 'Energía / Infraestructura', 
    goal: 120000, 
    raised: 125000, 
    investors: 256, 
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800', 
    status: 'funded',
    minInvestment: 500,
    daysLeft: 0,
    valuation: 950000,
    returnEstimate: '18% TIR Anual',
    riskLevel: 'Moderado',
    milestones: [
      { label: 'PROTOTIPO ALPHA', amount: 30000, completed: true },
      { label: 'ESCALAMIENTO NIVEL 1', amount: 60000, completed: true },
      { label: 'EXPANSIÓN LATAM', amount: 30000, completed: false }
    ],
    team: [{ name: 'Elena Solís', role: 'CEO', img: 'https://i.pravatar.cc/150?u=elena' }]
  },
  { 
    id: '3', 
    title: 'Hub-OS Tarapacá', 
    creator: 'ConecTarapak Labs', 
    description: 'Sistema descentralizado para la gobernanza de recursos hídricos y energéticos en el distrito Rapak.', 
    category: 'SaaS / Blockchain', 
    goal: 45000, 
    raised: 12500, 
    investors: 84, 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', 
    status: 'active',
    minInvestment: 100,
    daysLeft: 45,
    valuation: 350000,
    returnEstimate: 'Equity + Dividendos',
    riskLevel: 'Bajo',
    milestones: [
      { label: 'VALIDACIÓN REGIONAL', amount: 15000, completed: true },
      { label: 'LANZAMIENTO NODOS', amount: 30000, completed: false }
    ],
    team: [{ name: 'Lucas Viana', role: 'CTO', img: 'https://i.pravatar.cc/150?u=lucas' }]
  },
  { 
    id: '4', 
    title: 'Recicla-Min Pro', 
    creator: 'Circular Minerals', 
    description: 'Recuperación de metales de valor en relaves mineros mediante biotecnología aplicada.', 
    category: 'Minería / Impacto', 
    goal: 250000, 
    raised: 185000, 
    investors: 412, 
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800', 
    status: 'active',
    minInvestment: 1000,
    daysLeft: 12,
    valuation: 2100000,
    returnEstimate: '22.5% ROI Esperado',
    riskLevel: 'Alto',
    milestones: [
      { label: 'PATENTE BIOTECH', amount: 50000, completed: true },
      { label: 'PLANTA PILOTO TARA', amount: 100000, completed: false },
      { label: 'OPERACIÓN FULL', amount: 100000, completed: false }
    ],
    team: [{ name: 'Dr. Aris Tech', role: 'Science Lead', img: 'https://i.pravatar.cc/150?u=aris' }]
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [invAmount, setInvAmount] = useState<number>(0);
  const [protocolStatus, setProtocolStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [filter, setFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'raised' | 'goal'>('recent');

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [selectedProject]);

  // Lógica de filtrado y búsqueda real
  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.creator.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === 'Todos' || 
                           (filter === 'Escalamiento' ? p.status === 'funded' : p.category.includes(filter));
      return matchesSearch && matchesFilter;
    }).sort((a, b) => {
      if (sortBy === 'raised') return b.raised - a.raised;
      if (sortBy === 'goal') return b.goal - a.goal;
      return 0; // 'recent' as default
    });
  }, [filter, searchQuery, sortBy]);

  const stats = useMemo(() => {
    if (!selectedProject) return { participation: 0, estimatedReturn: 0 };
    const amt = invAmount || selectedProject.minInvestment;
    // Lógica de ROI basada en riesgo real
    const riskMultiplier = selectedProject.riskLevel === 'Alto' ? 1.45 : selectedProject.riskLevel === 'Moderado' ? 1.25 : 1.12;
    return { 
      participation: (amt / selectedProject.valuation) * 100,
      estimatedReturn: amt * riskMultiplier 
    };
  }, [invAmount, selectedProject]);

  const handleExecute = () => {
    setProtocolStatus('processing');
    setTimeout(() => {
      setProtocolStatus('success');
      setTimeout(() => {
        setProtocolStatus('idle');
        setSelectedProject(null);
      }, 2500);
    }, 2000);
  };

  const investmentTiers = [
    { label: 'Inversor Semilla', min: 100, bonus: 'Acceso a Reportes Trimestrales' },
    { label: 'Socio de Red', min: 1000, bonus: 'Voto en Decisiones de Escalamiento' },
    { label: 'Líder de Impacto', min: 5000, bonus: 'Placa en Planta + Equity Preferente' }
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 py-24 min-h-screen">
      
      {/* HEADER DE MERCADO DINÁMICO CON BUSCADOR */}
      <header className="reveal flex flex-col space-y-16 border-b border-sky-500/10 pb-20 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></div>
              <span className="text-[12px] font-mono text-sky-500 uppercase tracking-[0.6em] font-black">Capital de Impacto Regional</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-outfit leading-none">
              Activos <br/><span className="text-white/20 italic">de Futuro</span>
            </h1>
          </div>
          
          <div className="flex flex-col gap-6 w-full md:w-auto">
             {/* BARRA DE BÚSQUEDA TÁCTICA */}
             <div className="relative group">
                <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-sky-900 group-focus-within:text-sky-500 transition-colors"></i>
                <input 
                  type="text" 
                  placeholder="BUSCAR ACTIVO O EMISOR..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/40 border border-sky-500/10 focus:border-sky-500/50 focus:outline-none px-16 py-5 text-[11px] font-mono tracking-[0.2em] w-full md:w-[400px] uppercase text-white transition-all"
                />
             </div>
             
             <div className="flex flex-wrap gap-3 aero-panel p-2 rounded-sm bg-black/40 border-sky-500/10">
                {['Todos', 'Energía', 'SaaS', 'Minería', 'Escalamiento'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`text-[10px] font-mono px-6 py-3 uppercase tracking-[0.2em] font-black transition-all ${
                      filter === cat ? 'bg-sky-500 text-white shadow-xl' : 'text-slate-600 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* ORDENAMIENTO */}
        <div className="flex justify-end items-center gap-8">
           <span className="text-[10px] font-mono text-slate-700 uppercase tracking-widest font-black">Ordenar por:</span>
           <div className="flex gap-4">
              {[
                { id: 'recent', label: 'RECIENTES' },
                { id: 'raised', label: 'MAYOR RECAUDO' },
                { id: 'goal', label: 'OBJETIVO' }
              ].map(sort => (
                <button 
                  key={sort.id}
                  onClick={() => setSortBy(sort.id as any)}
                  className={`text-[9px] font-mono uppercase tracking-[0.1em] font-bold ${sortBy === sort.id ? 'text-sky-400' : 'text-slate-500'}`}
                >
                  {sort.label}
                </button>
              ))}
           </div>
        </div>
      </header>

      {/* GRILLA DE PROYECTOS FILTRADA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 min-h-[400px]">
        {filteredProjects.length > 0 ? filteredProjects.map((p, idx) => (
          <div 
            key={p.id} 
            className="reveal aero-panel tech-frame group hover:border-sky-500/50 transition-all duration-700 cursor-pointer overflow-hidden flex flex-col h-full" 
            style={{ transitionDelay: `${idx * 100}ms` }}
            onClick={() => { setSelectedProject(p); setInvAmount(p.minInvestment); }}
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              <div className="absolute top-6 left-6 flex gap-3 z-20">
                <span className="bg-sky-500 text-[9px] font-mono px-3 py-1.5 uppercase font-black tracking-widest shadow-2xl">
                  {p.category.split('/')[0]}
                </span>
                {p.status === 'funded' && (
                  <span className="bg-green-600 text-[9px] font-mono px-3 py-1.5 uppercase font-black tracking-widest shadow-2xl flex items-center gap-2">
                    <i className="fas fa-rocket text-[7px] animate-bounce"></i> Escalamiento
                  </span>
                )}
              </div>
            </div>

            <div className="p-10 flex-grow flex flex-col space-y-8">
              <div className="space-y-2">
                <h3 className="text-3xl font-black uppercase font-outfit tracking-tighter group-hover:text-sky-400 transition-colors leading-none">{p.title}</h3>
                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-black">Por {p.creator}</p>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed font-light line-clamp-2 h-10">{p.description}</p>
              
              <div className="pt-6 border-t border-sky-500/10 space-y-6">
                <div className="flex justify-between items-end">
                   <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-600 uppercase font-black tracking-widest">Recaudado</span>
                      <p className="text-2xl font-black font-outfit tracking-tighter">${p.raised.toLocaleString()}</p>
                   </div>
                   <div className="text-right space-y-1">
                      <span className="text-[9px] font-mono text-slate-600 uppercase font-black tracking-widest">Inversores</span>
                      <p className="text-2xl font-black font-outfit tracking-tighter text-sky-500">{p.investors}</p>
                   </div>
                </div>

                <div className="space-y-2">
                  <div className="h-1.5 bg-sky-950/30 w-full overflow-hidden rounded-full">
                    <div 
                      className={`h-full transition-all duration-1000 ${p.status === 'funded' ? 'bg-green-500' : 'bg-sky-500'}`} 
                      style={{ width: `${Math.min((p.raised/p.goal)*100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[9px] font-mono font-black uppercase tracking-widest">
                    <span className={p.status === 'funded' ? 'text-green-500' : 'text-sky-800'}>
                      {((p.raised/p.goal)*100).toFixed(0)}% Completado
                    </span>
                    <span className="text-slate-700">Objetivo: ${p.goal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-32 text-center space-y-8 animate-pulse">
             <i className="fas fa-satellite-dish text-6xl text-sky-900"></i>
             <p className="text-xl font-mono text-slate-600 uppercase tracking-[0.5em]">No se detectan activos con esos parámetros de búsqueda</p>
             <button onClick={() => {setFilter('Todos'); setSearchQuery('');}} className="text-sky-500 font-mono text-sm underline tracking-widest uppercase">Reiniciar Protocolo de Búsqueda</button>
          </div>
        )}
      </div>

      {/* MODAL DATA ROOM MULTIDIMENSIONAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-4 md:p-10 backdrop-blur-3xl animate-in fade-in duration-500">
          <div className="aero-panel w-full max-w-[1700px] h-[95vh] flex flex-col relative overflow-hidden border-sky-500/30 md:rounded-lg tech-frame">
            
            {protocolStatus === 'processing' && (
              <div className="absolute inset-0 z-[120] bg-black/90 flex flex-col items-center justify-center space-y-8 backdrop-blur-2xl">
                <div className="w-24 h-24 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[12px] font-mono text-sky-500 uppercase tracking-[1em] font-black animate-pulse">AUTENTICANDO TRANSACCIÓN REGIONAL...</p>
              </div>
            )}

            <div className="p-8 md:p-12 border-b border-sky-500/10 flex flex-col md:flex-row justify-between items-start md:items-center bg-black/60 shrink-0 z-10 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-sky-500 border border-sky-500/30 px-3 py-1 uppercase font-black tracking-[0.4em]">Auditado por IA</span>
                  <span className="text-[10px] font-mono text-green-500 border border-green-500/30 px-3 py-1 uppercase font-black tracking-[0.4em]">Enlace Seguro</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase font-outfit leading-none tracking-tighter">{selectedProject.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedProject(null)} 
                className="w-16 h-16 border border-sky-500/20 hover:border-sky-500 hover:bg-sky-500/10 transition-all text-2xl font-light flex items-center justify-center rounded-full"
              >✕</button>
            </div>

            <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
              
              <div className="flex-grow overflow-y-auto p-8 md:p-16 lg:p-20 space-y-24 custom-scrollbar bg-black/40">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
                  
                  <div className="space-y-12">
                    <section className="tech-frame p-10 bg-white/[0.01] space-y-6">
                      <h4 className="text-[12px] font-mono text-sky-500 uppercase tracking-[0.6em] font-black border-b border-sky-500/10 pb-4">Tesis_Estratégica</h4>
                      <p className="text-xl font-light leading-relaxed text-slate-300 italic">
                        "{selectedProject.description}"
                      </p>
                      <div className="grid grid-cols-3 gap-4 pt-6">
                        <div className="p-4 border border-sky-500/5 bg-sky-500/5 text-center">
                          <span className="text-[8px] font-mono text-slate-600 block mb-1 uppercase">Riesgo</span>
                          <span className="text-sm font-black uppercase text-white tracking-widest">{selectedProject.riskLevel}</span>
                        </div>
                        <div className="p-4 border border-sky-500/5 bg-sky-500/5 text-center">
                          <span className="text-[8px] font-mono text-slate-600 block mb-1 uppercase">Valuación</span>
                          <span className="text-sm font-black uppercase text-white tracking-widest">${(selectedProject.valuation/1000000).toFixed(1)}M</span>
                        </div>
                        <div className="p-4 border border-sky-500/5 bg-sky-500/5 text-center">
                          <span className="text-[8px] font-mono text-slate-600 block mb-1 uppercase">Tipo</span>
                          <span className="text-sm font-black uppercase text-white tracking-widest">Equity</span>
                        </div>
                      </div>
                    </section>

                    <section className="tech-frame p-10 bg-black/40 space-y-10">
                      <h4 className="text-[12px] font-mono text-sky-500 uppercase tracking-[0.6em] font-black border-b border-sky-500/10 pb-4">Hoja_de_Ruta</h4>
                      <div className="relative pt-8 pb-4">
                        <div className="absolute top-[48px] left-4 right-4 h-[1px] bg-sky-900/30"></div>
                        <div className="grid grid-cols-3 relative z-10">
                          {['Concepto', 'Prototipo', 'Mercado'].map((stage, i) => (
                            <div key={i} className="flex flex-col items-center gap-4">
                              <div className={`w-8 h-8 rounded-sm rotate-45 border-2 flex items-center justify-center transition-all duration-700 ${i < 2 ? 'bg-sky-500 border-sky-500 shadow-[0_0_20px_#0ea5e9]' : 'bg-black border-sky-900'}`}>
                                {i < 2 && <i className="fas fa-check -rotate-45 text-[10px] text-white"></i>}
                              </div>
                              <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${i < 2 ? 'text-white' : 'text-slate-700'}`}>{stage}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4 pt-4">
                        {selectedProject.milestones.map((m, i) => (
                          <div key={i} className={`flex items-center justify-between p-6 border transition-all ${m.completed ? 'border-sky-500/20 bg-sky-500/5' : 'border-white/5 bg-white/5 opacity-40'}`}>
                            <div className="flex items-center gap-6">
                              <span className="text-[10px] font-mono text-sky-800 font-black">0{i+1}</span>
                              <span className="text-sm font-black uppercase tracking-tighter">{m.label}</span>
                            </div>
                            <span className="text-xs font-mono text-sky-600">${m.amount.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="space-y-12">
                    <section className="tech-frame p-10 bg-white/[0.01] space-y-8">
                       <h4 className="text-[12px] font-mono text-sky-500 uppercase tracking-[0.6em] font-black border-b border-sky-500/10 pb-4">Liderazgo_Técnico</h4>
                       <div className="grid grid-cols-1 gap-6">
                         {selectedProject.team.map((member, i) => (
                            <div key={i} className="flex items-center gap-6 p-4 border border-sky-500/5 hover:bg-sky-500/5 transition-all">
                               <img src={member.img} alt={member.name} className="w-16 h-16 rounded-full grayscale border border-sky-500/20" />
                               <div>
                                  <p className="text-xl font-black uppercase font-outfit leading-none">{member.name}</p>
                                  <p className="text-[10px] font-mono text-sky-500 uppercase tracking-widest font-bold mt-2">{member.role}</p>
                               </div>
                            </div>
                         ))}
                       </div>
                    </section>
                  </div>
                </div>
                <div className="h-20"></div>
              </div>

              {/* CONSOLA DE INVERSIÓN INTERACTIVA */}
              <div className="w-full lg:w-[580px] xl:w-[650px] bg-sky-500/[0.02] border-l border-sky-500/10 flex flex-col shrink-0">
                <div className="p-10 md:p-14 space-y-16 h-full overflow-y-auto custom-scrollbar flex flex-col">
                  
                  <div className="tech-frame p-12 bg-black/70 shadow-[0_0_80px_rgba(14,165,233,0.1)] space-y-12">
                    <div className="flex justify-between items-center border-b border-sky-500/10 pb-6">
                      <h5 className="text-[12px] font-mono text-sky-400 uppercase font-black tracking-[0.5em]">Terminal de Transacción</h5>
                      <div className="flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                         <span className="text-[10px] font-mono text-green-500 uppercase font-black tracking-widest">Sincronizado</span>
                      </div>
                    </div>
                    
                    <div className="space-y-10">
                      <div className="flex flex-col gap-4">
                        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.4em] font-black">Monto a Inyectar (USD)</span>
                        <div className="flex items-baseline justify-between border-b border-sky-500/20 pb-4">
                          <span className="text-sky-500 text-3xl font-black font-mono">$</span>
                          <input 
                            type="number" 
                            value={invAmount} 
                            onChange={(e) => setInvAmount(Math.max(selectedProject.minInvestment, Number(e.target.value)))}
                            className="bg-transparent text-white text-6xl font-black font-outfit tracking-tighter w-full text-right focus:outline-none focus:text-sky-400 transition-colors"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <input 
                          type="range" min={selectedProject.minInvestment} max={selectedProject.goal} step={500} 
                          value={invAmount} onChange={(e)=>setInvAmount(Number(e.target.value))}
                          className="w-full h-1.5 bg-sky-950/40 rounded-lg appearance-none cursor-pointer accent-sky-500"
                        />
                        <div className="flex justify-between text-[10px] font-mono font-black tracking-widest uppercase text-sky-900">
                          <span>Umbral Min: ${selectedProject.minInvestment.toLocaleString()}</span>
                          <span>Cupo Max: ${selectedProject.goal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-10 pt-10 border-t border-sky-500/10">
                        <div className="flex justify-between items-center">
                          <p className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.4em] font-black">Participación Equity</p>
                          <p className="text-4xl font-black text-white tracking-tighter font-outfit">{stats.participation.toFixed(4)}%</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.4em] font-black">Retorno Proyectado (12m)</p>
                          <p className="text-4xl font-black text-sky-500 tracking-tighter font-outfit">${stats.estimatedReturn.toLocaleString()}</p>
                        </div>
                    </div>
                  </div>

                  {/* NIVELES DE SOCIO DINÁMICOS */}
                  <div className="space-y-8">
                    <h5 className="text-[12px] font-mono text-sky-800 uppercase tracking-[0.5em] font-black">Status de Beneficios</h5>
                    <div className="grid grid-cols-1 gap-4">
                      {investmentTiers.map((tier, i) => (
                        <div 
                          key={i} 
                          className={`p-6 border transition-all cursor-pointer ${invAmount >= tier.min ? 'border-sky-500/50 bg-sky-500/10 scale-[1.02]' : 'border-white/5 bg-white/5 opacity-40 hover:opacity-60'}`}
                          onClick={() => setInvAmount(tier.min)}
                        >
                           <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-4">
                                {invAmount >= tier.min && <i className="fas fa-certificate text-sky-500 animate-spin-slow"></i>}
                                <span className="text-lg font-black uppercase font-outfit">{tier.label}</span>
                              </div>
                              <span className="text-xs font-mono text-sky-500">+${tier.min}</span>
                           </div>
                           <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{tier.bonus}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto space-y-8 pt-12 pb-16">
                    <button 
                      onClick={handleExecute}
                      disabled={protocolStatus !== 'idle'}
                      className={`w-full py-12 text-white font-mono text-[18px] uppercase tracking-[1.4em] font-black transition-all duration-700 shadow-[0_20px_80px_rgba(14,165,233,0.3)] relative overflow-hidden tech-frame ${
                        protocolStatus === 'success' ? 'bg-green-600' : 'bg-sky-500 hover:bg-white hover:text-black hover:tracking-[1.6em]'
                      }`}
                    >
                      <div className="relative z-10">
                        {protocolStatus === 'idle' && 'EJECUTAR TRANSACCIÓN'}
                        {protocolStatus === 'processing' && 'SINCRONIZANDO...'}
                        {protocolStatus === 'success' && 'CONFIRMADO'}
                      </div>
                    </button>
                    <p className="text-[10px] text-center text-sky-900/60 uppercase font-mono tracking-[0.2em] leading-relaxed font-bold italic">
                      Al ejecutar la transacción, usted acepta la tesis de impacto auditada por el Núcleo Advisor.
                    </p>
                  </div>
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
