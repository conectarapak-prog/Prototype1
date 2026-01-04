
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TechMetric = ({ label, value }: { label: string, value: string }) => (
  <div className="p-10 aero-panel group hover:border-sky-500 transition-all duration-500">
    <span className="text-[14px] font-mono text-sky-600 uppercase tracking-[0.5em] font-black block mb-6">{label}</span>
    <div className="flex items-baseline gap-4">
      <span className="text-5xl font-black uppercase font-outfit">{value}</span>
      <div className="w-3 h-3 bg-sky-500 animate-pulse"></div>
    </div>
  </div>
);

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
        
        {/* HERO - MISSION CONTROL */}
        <section className={`pt-40 pb-64 transition-all duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-10 space-y-12">
              <div className="flex items-center gap-8">
                <div className="h-[1px] w-32 bg-sky-500"></div>
                <span className="text-[14px] font-mono text-sky-400 uppercase tracking-[0.8em] font-black">Ecosistema de Innovación Tarapacá</span>
              </div>
              <h1 className="text-[10vw] lg:text-[160px] leading-[0.75] font-black tracking-tighter uppercase font-outfit">
                INGENIERÍA <br />
                <span className="text-white">DE IMPACTO</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-900">CIRCULAR</span>
              </h1>
              <div className="max-w-4xl pt-12">
                <p className="text-3xl font-light text-slate-400 leading-tight uppercase tracking-widest font-outfit">
                  La plataforma de crowdfunding líder en la región. Consolidamos proyectos innovadores con herramientas de IA para asegurar el escalamiento nacional e internacional.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-2 hidden lg:flex flex-col justify-end pb-12 items-end">
              <div className="vertical-text text-[14px] font-mono text-sky-900 uppercase tracking-[1em] font-bold">CONECTAR_TARAPACA_2024</div>
            </div>
          </div>
        </section>

        {/* REGIONAL TELEMETRY */}
        <section className="reveal grid grid-cols-1 md:grid-cols-4 gap-px bg-sky-500/10 border border-sky-500/10 mb-48">
          <TechMetric label="Nodos Regionales" value="2,104" />
          <TechMetric label="Capital Movilizado" value="$8.2M" />
          <TechMetric label="Circularidad Index" value="94%" />
          <TechMetric label="Escalabilidad" value="GLOBAL" />
        </section>

        {/* CORE PILLARS - RESCUED FROM CONECTARAPAK.COM */}
        <section className="reveal py-32 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-5 space-y-12">
            <span className="text-[14px] font-mono text-sky-500 uppercase tracking-[0.6em] font-black">Nuestro ADN Estratégico</span>
            <h2 className="text-7xl font-black uppercase tracking-tighter leading-[0.9] font-outfit">Sincronización <br/>de <span className="text-sky-500">Oportunidades</span></h2>
            <p className="text-slate-400 font-light leading-relaxed text-xl">
              Fusionamos el crowdfunding tradicional con asesoramiento algorítmico. Cada proyecto en Conectarapak recibe acompañamiento automatizado con IA para garantizar la excelencia en su ejecución y sostenibilidad ambiental.
            </p>
            <div className="pt-8">
              <Link to="/onboarding" className="inline-block px-14 py-6 bg-sky-500 text-white font-mono text-[14px] uppercase tracking-[0.6em] font-black hover:bg-white hover:text-black transition-all glow-cyan shadow-2xl">
                Presentar Proyecto Circular
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { title: 'Crowdfunding Regional', desc: 'Consolidación de capital local para proyectos con visión de expansión global.' },
              { title: 'Acompañamiento IA', desc: 'Herramientas automatizadas para el seguimiento técnico y financiero de cada idea.' },
              { title: 'Economía Circular', desc: 'Foco absoluto en proyectos que regeneran recursos y mitigan el impacto ambiental.' },
              { title: 'Alianzas de Red', desc: 'Conexión directa con mentores y empresas del distrito para el escalamiento.' }
            ].map((pillar, i) => (
              <div key={i} className="aero-panel p-12 space-y-8 hover:bg-sky-500/5 transition-all group">
                <div className="w-12 h-12 border border-sky-500/30 flex items-center justify-center text-sky-500 text-lg font-mono font-black group-hover:bg-sky-500 group-hover:text-white transition-all">{i+1}</div>
                <h4 className="text-2xl font-black uppercase font-outfit tracking-tighter">{pillar.title}</h4>
                <p className="text-slate-500 text-lg font-light leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* VISION CONTROL */}
        <section className="reveal py-64 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-sky-500/5 blur-[150px] rounded-full scale-150"></div>
          <div className="relative z-10 space-y-16">
            <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] font-outfit">
              TRANSFORMANDO <br /><span className="text-sky-500 italic">IDEAS EN ACTIVOS</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-12">
              <Link to="/assistant" className="px-16 py-8 bg-white text-black font-mono text-[14px] uppercase tracking-[0.6em] font-black hover:bg-sky-500 hover:text-white transition-all shadow-2xl">Consultar Núcleo IA</Link>
              <Link to="/projects" className="px-16 py-8 border border-sky-500/30 text-[14px] font-mono uppercase tracking-[0.6em] font-black hover:bg-sky-500/10 transition-all">Explorar Sala de Activos</Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
