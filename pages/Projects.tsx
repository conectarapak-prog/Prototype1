
import React, { useState, useMemo, useEffect } from 'react';
import { Project } from '../types';

const MOCK_PROJECTS: Project[] = [
  { 
    id: '3', 
    title: 'Hub-OS Tarapacá', 
    creator: 'ConecTarapak Labs', 
    description: 'Sistema descentralizado para la gobernanza de recursos hídricos y energéticos en el distrito Rapak.', 
    category: 'Software', 
    goal: 25000, 
    raised: 12500, 
    investors: 84, 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', 
    status: 'active',
    minInvestment: 100,
    daysLeft: 45,
    valuation: 150000,
    returnEstimate: 'Equity + Impact',
    riskLevel: 'Moderado',
    milestones: [
      { label: 'VALIDACIÓN REGIONAL', amount: 5000, completed: true },
      { label: 'LANZAMIENTO NODOS', amount: 15000, completed: false }
    ],
    team: [{ name: 'Lucas Viana', role: 'CTO', img: 'https://i.pravatar.cc/150?u=lucas' }]
  },
  { 
    id: '1', 
    title: 'Desal-Solar Circular', 
    creator: 'Eco-Innova Tara', 
    description: 'Planta modular de desalinización solar con cero emisiones y aprovechamiento de salmuera para procesos industriales.', 
    category: 'Energía', 
    goal: 120000, 
    raised: 85000, 
    investors: 256, 
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800', 
    status: 'active',
    minInvestment: 500,
    daysLeft: 18,
    valuation: 950000,
    returnEstimate: '15% TIR Proyectada',
    riskLevel: 'Moderado',
    milestones: [
      { label: 'PROTOTIPO ALPHA', amount: 30000, completed: true },
      { label: 'ESCALAMIENTO NIVEL 1', amount: 60000, completed: false }
    ],
    team: [{ name: 'Elena Solís', role: 'CEO', img: 'https://i.pravatar.cc/150?u=elena' }]
  },
  { 
    id: '4', 
    title: 'Recicla-Min Pro', 
    creator: 'Circular Minerals', 
    description: 'Recuperación de metales de valor en relaves mineros mediante biotecnología aplicada de bajo impacto ambiental.', 
    category: 'Impacto', 
    goal: 75000, 
    raised: 45000, 
    investors: 112, 
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800', 
    status: 'active',
    minInvestment: 1000,
    daysLeft: 30,
    valuation: 1200000,
    returnEstimate: '22% ROI',
    riskLevel: 'Moderado',
    milestones: [
      { label: 'PATENTE BIOTECH', amount: 25000, completed: true },
      { label: 'PLANTA PILOTO TARA', amount: 50000, completed: false }
    ],
    team: [{ name: 'Dr. Aris Tech', role: 'Science Lead', img: 'https://i.pravatar.cc/150?u=aris' }]
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [invAmount, setInvAmount] = useState<number>(0);
  const [protocolStatus, setProtocolStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    reveals.forEach(r => observer.observe(r));
    return () => {
      observer.disconnect();
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  const stats = useMemo(() => {
    if (!selectedProject) return { participation: 0, estimatedReturn: 0 };
    const amt = invAmount || selectedProject.minInvestment;
    return { 
      participation: (amt / selectedProject.valuation) * 100,
      estimatedReturn: amt * 1.22 
    };
  }, [invAmount, selectedProject]);

  const handleExecute = () => {
    setProtocolStatus('processing');
    setTimeout(() => {
      setProtocolStatus('success');
      setTimeout(() => {
        setProtocolStatus('idle');
        setSelectedProject(null);
      }, 3000);
    }, 2500);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 py-24">
      <header className="reveal flex flex-col md:flex-row justify-between items-end gap-12 border-b border-sky-500/10 pb-20 mb-32">
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-4 h-4 bg-sky-500 shadow-[0_0_15px_#0ea5e9]"></div>
            <span className="text-[14px] font-mono text-sky-500 uppercase tracking-[0.6em] font-black">Sala de Activos de Impacto Tarapacá</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase font-outfit leading-none">
            Ecosistema <br/><span className="text-white/20 italic">de Inversión</span>
          </h1>
        </div>
        <div className="flex aero-panel p-2 rounded-sm border-sky-500/20 bg-black/40">
          <button className="text-[12px] font-mono px-12 py-5 bg-sky-500 text-white uppercase tracking-[0.4em] font-black">Activos_Vivos</button>
          <button className="text-[12px] font-mono px-12 py-5 text-slate-500 hover:text-white uppercase tracking-[0.4em] font-black transition-all">Archivados</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {MOCK_PROJECTS.map((p, idx) => (
          <div 
            key={p.id} 
            className="reveal aero-panel tech-frame group hover:border-sky-500 transition-all duration-700 cursor-pointer overflow-hidden opacity-0 translate-y-8" 
            style={{ transitionDelay: `${idx * 150}ms` }}
            onClick={() => { setSelectedProject(p); setInvAmount(p.minInvestment); }}
          >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-sky-500/10">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
              <div className="absolute top-8 left-8 bg-sky-500 text-[10px] font-mono px-4 py-2 uppercase font-black tracking-[0.3em] z-20 shadow-xl">
                {p.category}
              </div>
            </div>
            <div className="p-10 space-y-6 bg-black/20">
              <h3 className="text-3xl font-black uppercase font-outfit tracking-tighter group-hover:text-sky-400 transition-colors leading-none">{p.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-light line-clamp-2">{p.description}</p>
              
              <div className="space-y-4 pt-4 border-t border-sky-500/10">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600 font-black">
                  <span>FONDEO_ACTUAL</span>
                  <span className="text-white">{(p.raised/p.goal*100).toFixed(1)}%</span>
                </div>
                <div className="h-1.5 bg-sky-900/30 w-full overflow-hidden rounded-full">
                  <div className="h-full bg-sky-500" style={{ width: `${(p.raised/p.goal)*100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DATA ROOM - REFINADO SIN DESFASES */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-0 md:p-6 lg:p-10 backdrop-blur-3xl animate-in fade-in duration-500">
          <div className="aero-panel w-full max-w-[1600px] h-full md:h-[95vh] flex flex-col relative overflow-hidden border-sky-500/30 md:rounded-lg tech-frame">
            
            {/* OVERLAY PROCESAMIENTO */}
            {protocolStatus === 'processing' && (
              <div className="absolute inset-0 z-[120] bg-black/90 flex flex-col items-center justify-center space-y-8 backdrop-blur-2xl">
                <div className="w-20 h-20 border-2 border-sky-500 border-t-transparent rounded-full animate-spin shadow-[0_0_40px_rgba(14,165,233,0.4)]"></div>
                <p className="text-[12px] font-mono text-sky-500 uppercase tracking-[1em] font-black animate-pulse text-center">VALIDANDO BLOQUE DE IMPACTO...</p>
              </div>
            )}

            {/* CABECERA MODAL - ESPACIADO REFINADO */}
            <div className="p-8 md:p-12 border-b border-sky-500/10 flex justify-between items-center bg-black/60 shrink-0 z-10">
              <div className="space-y-3">
                <h2 className="text-3xl md:text-5xl font-black uppercase font-outfit leading-none tracking-tighter">{selectedProject.title}</h2>
                <div className="flex items-center gap-8 text-sky-500/40 font-mono text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2"><i className="fas fa-microchip"></i> DATA_ROOM_V4.0</span>
                  <span className="hidden md:flex items-center gap-2 text-green-500/60"><i className="fas fa-circle text-[5px] animate-pulse"></i> SECURE_ENCLAVE_ACTIVE</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProject(null)} 
                className="w-12 h-12 md:w-16 md:h-16 border border-sky-500/20 hover:border-sky-500 hover:bg-sky-500/10 transition-all text-xl md:text-2xl font-light flex items-center justify-center rounded-full"
              >✕</button>
            </div>

            {/* CUERPO MODAL */}
            <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
              
              {/* PANEL IZQUIERDO: CONTENIDO TÉCNICO */}
              <div className="flex-grow overflow-y-auto p-10 md:p-16 lg:p-24 space-y-24 custom-scrollbar bg-black/20">
                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
                    
                    {/* VISIÓN ESTRATÉGICA */}
                    <div className="space-y-12">
                      <div className="tech-frame p-10 bg-white/[0.01]">
                        <span className="text-[12px] font-mono text-sky-500 uppercase tracking-[0.6em] font-black block border-b border-sky-500/10 pb-6 mb-8">Visión_Estratégica</span>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-slate-300 italic">
                          "{selectedProject.description}"
                        </p>
                      </div>

                      <div className="tech-frame p-10 bg-white/[0.01]">
                         <span className="text-[12px] font-mono text-sky-500 uppercase tracking-[0.6em] font-black block border-b border-sky-500/10 pb-6 mb-8">Métricas_Sostenibilidad</span>
                         <div className="grid grid-cols-2 gap-8">
                            <div className="p-8 border border-sky-500/10 bg-sky-500/5">
                               <p className="text-[10px] font-mono text-slate-500 uppercase font-black mb-4 tracking-widest text-center">CARBON_OFFSET</p>
                               <p className="text-3xl md:text-4xl font-black font-outfit text-white text-center">12.4t CO2</p>
                            </div>
                            <div className="p-8 border border-sky-500/10 bg-sky-500/5">
                               <p className="text-[10px] font-mono text-slate-500 uppercase font-black mb-4 tracking-widest text-center">CIRCULAR_INDEX</p>
                               <p className="text-3xl md:text-4xl font-black font-outfit text-sky-500 text-center">92%</p>
                            </div>
                         </div>
                      </div>
                    </div>

                    {/* HITOS - ALINEACIÓN CORREGIDA */}
                    <div className="tech-frame p-10 bg-black/30">
                       <span className="text-[12px] font-mono text-sky-500 uppercase tracking-[0.6em] font-black block border-b border-sky-500/10 pb-6 mb-10">Estructura_de_Hitos</span>
                       <div className="space-y-8">
                          {selectedProject.milestones.map((m, i) => (
                            <div key={i} className={`flex items-center justify-between p-8 border transition-all duration-500 ${m.completed ? 'border-sky-500/40 bg-sky-500/5 shadow-[inset_0_0_20px_rgba(14,165,233,0.05)]' : 'border-white/5 bg-white/5 opacity-40'}`}>
                               <div className="flex items-center gap-6">
                                  <div className={`w-3 h-3 rounded-sm rotate-45 shrink-0 ${m.completed ? 'bg-sky-500 shadow-[0_0_15px_#0ea5e9]' : 'bg-slate-800'}`}></div>
                                  <span className="text-lg md:text-2xl font-black uppercase font-outfit tracking-tighter">{m.label}</span>
                               </div>
                               <span className="text-sm md:text-lg font-mono text-sky-700 font-black tracking-widest">${m.amount.toLocaleString()}</span>
                            </div>
                          ))}
                       </div>
                    </div>

                 </div>
                 <div className="h-24"></div>
              </div>

              {/* PANEL DERECHO: CONSOLA DE INVERSIÓN (ESPACIADO OPTIMIZADO) */}
              <div className="w-full lg:w-[540px] xl:w-[620px] bg-sky-500/[0.03] border-l border-sky-500/10 flex flex-col shrink-0">
                <div className="p-10 md:p-14 space-y-16 h-full overflow-y-auto custom-scrollbar flex flex-col">
                  
                  {/* FRAME DE CONTROL */}
                  <div className="tech-frame p-12 bg-black/70 shadow-[0_0_60px_rgba(14,165,233,0.1)] space-y-14">
                    <div className="flex justify-between items-center border-b border-sky-500/10 pb-6">
                      <h5 className="text-[12px] font-mono text-sky-400 uppercase font-black tracking-[0.6em]">Consola de Inversión</h5>
                      <span className="text-[10px] font-mono text-slate-700 tracking-widest font-bold">TX_NODE_892</span>
                    </div>
                    
                    {/* INPUT MONTO - SIN COMPRESIÓN */}
                    <div className="space-y-10">
                      <div className="flex flex-col gap-4">
                        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.5em] font-black">Monto_Seleccionado</span>
                        <div className="flex items-baseline justify-between border-b border-sky-500/20 pb-4">
                          <span className="text-sky-500 text-3xl font-black font-mono">$</span>
                          <span className="text-white text-6xl font-black font-outfit tracking-tighter">{invAmount.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-6 pt-4">
                        <input 
                          type="range" min={selectedProject.minInvestment} max={selectedProject.goal} step={100} 
                          value={invAmount} onChange={(e)=>setInvAmount(Number(e.target.value))}
                          className="w-full h-1 bg-sky-900/30 rounded-lg appearance-none cursor-pointer accent-sky-500"
                        />
                        <div className="flex justify-between text-[10px] font-mono font-black tracking-[0.2em] uppercase text-sky-800">
                          <div className="flex flex-col">
                            <span className="text-slate-700 text-[8px] mb-1">LIMIT_MIN</span>
                            <span className="bg-sky-500/5 px-4 py-2 border border-sky-500/10">${selectedProject.minInvestment.toLocaleString()}</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-slate-700 text-[8px] mb-1">LIMIT_MAX</span>
                            <span className="bg-sky-500/5 px-4 py-2 border border-sky-500/10">${selectedProject.goal.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* MÉTRICAS - ESPACIADO REFINADO */}
                    <div className="grid grid-cols-1 gap-12 pt-12 border-t border-sky-500/10">
                        <div className="space-y-4">
                          <p className="text-[12px] font-mono text-sky-800 uppercase tracking-[0.6em] font-black">Participación_Estimada</p>
                          <div className="flex items-baseline gap-4">
                            <p className="text-6xl font-black text-white tracking-tighter font-outfit">{stats.participation.toFixed(4)}</p>
                            <p className="text-3xl font-black text-sky-500">%</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-[12px] font-mono text-sky-800 uppercase tracking-[0.6em] font-black">ROI_Proyectado</p>
                          <div className="flex items-baseline gap-4">
                            <p className="text-3xl font-black text-sky-500">$</p>
                            <p className="text-6xl font-black text-white tracking-tighter font-outfit">{stats.estimatedReturn.toLocaleString()}</p>
                          </div>
                        </div>
                    </div>
                  </div>

                  {/* ACCIÓN FINAL */}
                  <div className="mt-auto space-y-10 pt-10 pb-16">
                    <div className="flex items-center justify-center gap-8 p-8 border border-sky-500/20 bg-sky-500/5 tech-frame rounded-sm">
                        <i className="fas fa-shield-halved text-3xl text-sky-500 animate-pulse"></i>
                        <span className="text-[11px] font-mono text-sky-500 uppercase tracking-[0.5em] font-black text-center leading-relaxed">
                          SISTEMA_IDENTIDAD_ACTIVO<br/><span className="text-slate-600 text-[9px] font-bold">REGISTRO_BLOCKCHAIN_TARAPACÁ</span>
                        </span>
                    </div>
                    
                    <button 
                      onClick={handleExecute}
                      disabled={protocolStatus !== 'idle'}
                      className={`w-full py-12 text-white font-mono text-[18px] uppercase tracking-[1.2em] font-black transition-all duration-700 shadow-[0_20px_60px_rgba(14,165,233,0.3)] relative overflow-hidden tech-frame ${
                        protocolStatus === 'success' ? 'bg-green-600' : 'bg-sky-500 hover:bg-white hover:text-black hover:tracking-[1.4em]'
                      }`}
                    >
                      <div className="relative z-10">
                        {protocolStatus === 'idle' && 'EJECUTAR PROTOCOLO'}
                        {protocolStatus === 'processing' && 'SINCRONIZANDO...'}
                        {protocolStatus === 'success' && 'OPERACIÓN_OK'}
                      </div>
                    </button>
                    
                    <p className="text-[11px] text-center text-sky-900/60 uppercase font-mono tracking-[0.2em] leading-relaxed font-bold italic px-8">
                      "LA EJECUCIÓN DE ESTA OPERACIÓN IMPLICA LA ACEPTACIÓN DE LOS ESTATUTOS DE IMPACTO CIRCULAR VIGENTES."
                    </p>
                  </div>

                  <div className="h-24 shrink-0"></div>
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
