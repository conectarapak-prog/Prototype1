
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TechMetric = ({ label, value, prefix = "", suffix = "" }: { label: string, value: number, prefix?: string, suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = (Math.random() - 0.5) * (value * 0.005);
      setDisplayValue(prev => Number((prev + fluctuation).toFixed(prev > 1000 ? 0 : 2)));
    }, 2000);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="p-12 aero-panel group hover:border-teal-600 transition-all duration-700 bg-white/60">
      <span className="text-[12px] font-mono text-teal-600 uppercase tracking-[0.4em] font-black block mb-6">{label}</span>
      <div className="flex items-baseline gap-4">
        <span className="text-5xl font-black uppercase font-outfit text-slate-900">
          {prefix}{displayValue.toLocaleString()}{suffix}
        </span>
        <div className="w-2 h-2 bg-amber-500 animate-pulse shadow-[0_0_10px_#f59e0b]"></div>
      </div>
    </div>
  );
};

const Home = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setTimeout(() => setActive(true), 100);
    
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    
    reveals.forEach(r => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24">
        
        {/* HERO - CONTROL DE MISIÓN */}
        <section className={`pt-48 pb-64 transition-all duration-1000 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-10 space-y-12">
              <div className="flex items-center gap-8">
                <div className="h-[1px] w-24 bg-teal-600/30"></div>
                <span className="text-[12px] font-mono text-teal-600 uppercase tracking-[0.6em] font-black">Distrito Tecnológico Atacama</span>
              </div>
              <h1 className="text-[9vw] lg:text-[140px] leading-[0.8] font-black tracking-tighter uppercase font-outfit text-slate-900">
                TARAPACÁ <br />
                <span className="text-slate-400">PROTOTIPANDO</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-amber-600">EL FUTURO</span>
              </h1>
              <div className="max-w-4xl pt-12">
                <p className="text-2xl font-light text-slate-500 leading-tight uppercase tracking-[0.2em] font-outfit">
                  La plataforma de inversión colectiva que conecta la resiliencia del norte con el capital global. Impulsamos <span className="text-teal-600 font-bold">proyectos</span> de economía circular y tecnología industrial.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TELEMETRÍA REGIONAL */}
        <section className="reveal grid grid-cols-1 md:grid-cols-4 gap-4 mb-48">
          <TechMetric label="Nodos Activos" value={2104} />
          <TechMetric label="Capital Global" value={8.2} prefix="$" suffix="M" />
          <TechMetric label="Eco-Eficiencia" value={94} suffix="%" />
          <TechMetric label="Escalabilidad" value={100} suffix="%" />
        </section>

        {/* PILARES FUNDAMENTALES */}
        <section className="reveal py-32 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-5 space-y-12">
            <span className="text-[12px] font-mono text-amber-600 uppercase tracking-[0.5em] font-black">Nuestra Tesis</span>
            <h2 className="text-7xl font-black uppercase tracking-tighter leading-[0.9] font-outfit text-slate-900">Sincronización <br/>de <span className="text-teal-600">Oportunidades</span></h2>
            <p className="text-slate-500 font-light leading-relaxed text-lg">
              Fusionamos la herencia industrial de Tarapacá con protocolos de IA. Cada proyecto recibe un "Data Room" auditado para inversores de cualquier parte del mundo.
            </p>
            <div className="pt-8">
              <Link to="/onboarding" className="inline-block px-14 py-6 bg-teal-600 text-white font-mono text-[13px] uppercase tracking-[0.5em] font-black hover:bg-slate-900 transition-all shadow-lg">
                Registrar Proyecto Circular
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Crowdfunding Global', desc: 'Acceso a inversores institucionales y retail en una red sin fronteras.' },
              { title: 'Due Diligence IA', desc: 'Validación algorítmica de modelos de negocio y proyecciones de impacto.' },
              { title: 'Economía Circular', desc: 'Estandarización de métricas ambientales para el cumplimiento ESG.' },
              { title: 'Data Room 24/7', desc: 'Transparencia total en el flujo de capital y estados de obra regionales.' }
            ].map((pillar, i) => (
              <div key={i} className="aero-panel p-10 space-y-8 hover:bg-white transition-all group border-slate-100 bg-white/40">
                <div className="w-10 h-10 border border-teal-600/30 flex items-center justify-center text-teal-600 text-sm font-mono font-black group-hover:bg-teal-600 group-hover:text-white transition-all">{i+1}</div>
                <h4 className="text-2xl font-black uppercase font-outfit tracking-tighter text-slate-900">{pillar.title}</h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTROL DE VISIÓN */}
        <section className="reveal py-64 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-teal-600/5 blur-[120px] rounded-full scale-150"></div>
          <div className="relative z-10 space-y-16">
            <h2 className="text-6xl md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8] font-outfit text-slate-900">
              AUDITANDO <br /><span className="text-amber-600 italic">EL IMPACTO REAL</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              <Link to="/assistant" className="px-16 py-8 bg-slate-900 text-white font-mono text-[12px] uppercase tracking-[0.5em] font-black hover:bg-teal-600 transition-all shadow-xl">Consultar Asesor IA</Link>
              <Link to="/projects" className="px-16 py-8 border border-slate-200 text-[12px] font-mono text-slate-600 uppercase tracking-[0.5em] font-black hover:bg-slate-50 transition-all">Ver Proyectos</Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
