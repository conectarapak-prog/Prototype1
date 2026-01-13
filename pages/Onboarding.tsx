
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { title: "Identidad", desc: "Selección de Nodo" },
    { title: "Génesis", desc: "Definición Técnica" },
    { title: "Validación", desc: "Certificación IA" }
  ];

  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(step + 1);
    }, 2000);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-12 md:px-24 py-32 min-h-[85vh] flex flex-col justify-center">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-32 border-t border-white/5 pt-16">
        {steps.map((s, i) => (
          <div key={i} className={`space-y-6 transition-all duration-1000 ${step === i + 1 ? 'opacity-100 scale-100' : 'opacity-20 scale-95'}`}>
            <div className="flex items-center space-x-6">
              <span className={`text-[14px] font-mono font-black ${step === i + 1 ? 'text-teal-500' : 'text-slate-500'}`}>0{i + 1}</span>
              <span className="text-[14px] font-mono uppercase tracking-[0.5em] font-black">{s.title}</span>
            </div>
            <p className="text-[12px] uppercase tracking-[0.3em] text-slate-500 leading-relaxed font-bold">{s.desc}</p>
            {step === i + 1 && <div className="h-[2px] bg-teal-500 w-full animate-in slide-in-from-left duration-1000"></div>}
          </div>
        ))}
      </div>

      <div className="min-h-[600px] flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-12 animate-in fade-in duration-500">
             <div className="relative">
                <div className="w-32 h-32 border-4 border-white/5 rounded-full"></div>
                <div className="absolute inset-0 border-t-4 border-teal-500 rounded-full animate-spin"></div>
             </div>
             <p className="text-[14px] font-mono uppercase tracking-[0.8em] text-teal-500 font-black animate-pulse">Sincronizando con Núcleo Asesor...</p>
          </div>
        ) : (
          <div className="w-full">
            {step === 1 && (
              <div className="space-y-24">
                <div className="space-y-8">
                  <span className="text-[14px] font-mono text-teal-500 uppercase tracking-[0.6em] font-black">Iniciando Protocolo de Admisión</span>
                  <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none font-outfit">Seleccione su <br/><span className="text-slate-500 italic">Estatus de Red</span></h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {[
                    { t: 'Emprendedor Circular', d: 'Tengo un proyecto de impacto ambiental y busco escalamiento.' },
                    { t: 'Inversor Estratégico', d: 'Busco activos de valor en la región con alto retorno social y ambiental.' },
                    { t: 'Asesor Mentor', d: 'Deseo guiar el crecimiento de startups regionales mediante mi experiencia.' }
                  ].map(item => (
                    <button 
                      key={item.t}
                      onClick={() => { setType(item.t); handleNext(); }}
                      className="aero-panel p-16 text-left hover:border-teal-500 transition-all group flex flex-col justify-between h-[350px] bg-teal-500/[0.02]"
                    >
                      <span className="text-4xl font-black uppercase font-outfit tracking-tighter group-hover:text-teal-400 transition-colors leading-none">{item.t}</span>
                      <div className="space-y-8">
                        <p className="text-[14px] font-mono text-slate-500 uppercase tracking-widest font-bold leading-relaxed">{item.d}</p>
                        <span className="text-slate-800 group-hover:text-teal-500 group-hover:translate-x-4 transition-all text-4xl font-light">→</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-24 max-w-6xl mx-auto">
                <div className="space-y-8">
                  <span className="text-[14px] font-mono text-teal-500 uppercase tracking-[0.6em] font-black">Génesis del Perfil: {type}</span>
                  <h2 className="text-7xl font-black tracking-tighter uppercase leading-none font-outfit">Definición de <br/><span className="text-teal-500">Parámetros</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
                  <div className="group border-b border-white/10 focus-within:border-teal-500 transition-all py-4">
                    <label className="text-[14px] font-mono text-slate-600 uppercase tracking-[0.4em] font-black block mb-4">Identidad / Razón Social</label>
                    <input type="text" className="w-full bg-transparent py-4 focus:outline-none font-light text-3xl text-white placeholder:text-slate-800 uppercase font-outfit" placeholder="NOMBRE_SISTEMA" />
                  </div>
                  
                  <div className="group border-b border-white/10 focus-within:border-teal-500 transition-all py-4">
                    <label className="text-[14px] font-mono text-slate-600 uppercase tracking-[0.4em] font-black block mb-4">Canal de Comunicación</label>
                    <input type="email" className="w-full bg-transparent py-4 focus:outline-none font-light text-3xl text-white placeholder:text-slate-800 uppercase font-outfit" placeholder="RECEPTOR@DOMAIN.COM" />
                  </div>

                  {type?.includes('Emprendedor') && (
                    <>
                      <div className="group border-b border-white/10 focus-within:border-teal-500 transition-all py-4">
                        <label className="text-[14px] font-mono text-slate-600 uppercase tracking-[0.4em] font-black block mb-4">Sector de Impacto Circular</label>
                        <select className="w-full bg-transparent py-4 focus:outline-none font-black text-2xl text-teal-500 uppercase font-mono">
                          <option>Gestión de Agua / Desalinización</option>
                          <option>Energías Renovables</option>
                          <option>Reciclaje Industrial</option>
                          <option>Agro-Tech Sostenible</option>
                        </select>
                      </div>
                      <div className="group border-b border-white/10 focus-within:border-teal-500 transition-all py-4">
                        <label className="text-[14px] font-mono text-slate-600 uppercase tracking-[0.4em] font-black block mb-4">Meta de Capital Regional (USD)</label>
                        <input type="number" className="w-full bg-transparent py-4 focus:outline-none font-light text-3xl text-white placeholder:text-slate-800 font-outfit" placeholder="0.00" />
                      </div>
                    </>
                  )}
                </div>
                
                <div className="pt-16 flex items-center space-x-12">
                  <button onClick={() => setStep(1)} className="text-[14px] font-mono uppercase tracking-[0.6em] text-slate-500 hover:text-white transition-all font-black">← REINICIAR</button>
                  <button 
                    onClick={handleNext} 
                    className="bg-white text-black px-16 py-8 text-[14px] font-mono uppercase tracking-[0.6em] font-black hover:bg-teal-500 hover:text-white transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                  >
                    VALIDAR GÉNESIS
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center text-center space-y-16 py-24 max-w-4xl mx-auto">
                <div className="relative">
                   <div className="w-40 h-40 bg-teal-500 rounded-sm rotate-45 flex items-center justify-center text-white text-5xl shadow-[0_0_100px_rgba(20,184,166,0.4)]">
                      <i className="fas fa-satellite -rotate-45 animate-pulse"></i>
                   </div>
                </div>
                
                <div className="space-y-12">
                  <h2 className="text-7xl font-black tracking-tighter uppercase leading-none font-outfit">Nodo de Red <br/><span className="text-teal-500 italic">Sincronizado</span></h2>
                  <p className="text-slate-400 text-2xl font-light leading-relaxed max-w-2xl mx-auto">
                    Su solicitud ha sido registrada bajo los protocolos de <span className="text-white font-black">Conectarapak Regional</span>. El Núcleo Asesor está analizando su tesis de impacto.
                  </p>
                  <div className="aero-panel p-10 border-teal-500/20 bg-teal-500/5 inline-block">
                     <p className="text-[14px] font-mono text-teal-400 uppercase tracking-[0.8em] font-black">Acceso Alpha concedido al Terminal Central</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-10">
                  <Link to="/dashboard" className="px-20 py-8 bg-teal-500 text-white text-[14px] font-mono uppercase tracking-[0.6em] font-black hover:bg-white hover:text-black transition-all shadow-[0_0_50px_rgba(20,184,166,0.3)]">
                    Entrar al Terminal
                  </Link>
                  <Link to="/" className="px-20 py-8 border border-white/10 text-[14px] font-mono uppercase tracking-[0.6em] font-black hover:bg-teal-500/10 transition-all">
                    Volver al Inicio
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
