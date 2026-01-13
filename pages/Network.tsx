
import React from 'react';

const Network: React.FC = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-12 md:px-24 py-32 space-y-40">
      
      <header className="border-b border-white/5 pb-20 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="space-y-8">
          <div className="flex items-center gap-8">
             <div className="w-6 h-[1px] bg-teal-500"></div>
             <span className="text-[14px] font-mono text-teal-500 uppercase tracking-[0.6em] font-black">Registro de Nodos y Alianzas</span>
          </div>
          <h1 className="text-8xl font-black tracking-tighter uppercase font-outfit leading-none">Red de <br/><span className="text-white/20 italic">Impacto Regional</span></h1>
        </div>
        <button className="bg-teal-500 text-white px-16 py-6 text-[14px] font-mono uppercase tracking-[0.6em] font-black hover:bg-white hover:text-black transition-all glow-teal shadow-2xl">
          Sincronizar Alianza
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
        
        <div className="lg:col-span-8 space-y-24">
          <div className="flex items-center gap-10 mb-16">
            <h2 className="text-[14px] font-mono uppercase tracking-[0.8em] font-black text-teal-500">Conexiones Activas / Tarapacá</h2>
            <div className="h-[1px] flex-grow bg-white/5"></div>
          </div>
          
          {[
            { date: '15 NOV', title: 'Foro Internacional: Economía Circular en Minería', host: 'Nodo Iquique', type: 'Evento Regional' },
            { date: '22 NOV', title: 'Ronda de Pitch: Desafíos Hídricos 2024', host: 'Conectarapak Labs', type: 'Convocatoria Abierta' },
            { date: '05 DIC', title: 'Cena de Trabajo: Escalamiento Global', host: 'Distrito Rapak', type: 'Exclusivo Miembros' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row items-start md:items-center group cursor-pointer border-b border-white/5 pb-16 hover:border-teal-500 transition-all gap-12">
              <div className="w-40 font-mono space-y-4">
                <span className="text-[12px] block text-slate-700 font-black tracking-widest uppercase">FECHA_NODO</span>
                <span className="text-5xl font-black text-white">{item.date}</span>
              </div>
              <div className="flex-grow space-y-4">
                <span className="text-[14px] font-mono text-teal-500 uppercase tracking-widest font-black block">{item.host}</span>
                <h3 className="text-4xl font-black uppercase font-outfit group-hover:translate-x-6 transition-transform duration-700 leading-none">{item.title}</h3>
              </div>
              <div className="text-right">
                <span className="text-[12px] font-mono border border-white/10 px-10 py-4 uppercase text-slate-500 group-hover:text-teal-400 group-hover:border-teal-500/50 transition-all font-black">
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-16">
          <div className="aero-panel p-16 space-y-10 border-teal-500/30 bg-teal-500/[0.02] shadow-2xl relative overflow-hidden text-gradient-copper">
            <div className="absolute top-0 right-0 w-2 h-full bg-teal-500 opacity-20"></div>
            <h3 className="text-4xl font-black uppercase font-outfit tracking-tighter text-white">Núcleo de Asesores</h3>
            <p className="text-lg text-slate-400 leading-relaxed font-light italic">
              Conecte con nuestra red curada de expertos en escalabilidad, legalidad y finanzas con enfoque en Tarapacá.
            </p>
            <button className="w-full py-6 bg-white/5 border border-white/10 text-[12px] font-mono uppercase tracking-[0.5em] font-black hover:bg-teal-500 hover:text-white transition-all shadow-xl">
              Ver Directorio Alpha
            </button>
          </div>

          <div className="aero-panel p-16 space-y-10 border-white/5">
            <h3 className="text-4xl font-black uppercase font-outfit tracking-tighter">Alianzas de Red</h3>
            <div className="space-y-10">
              {[
                { label: 'GOBIERNO REGIONAL', val: 'CONECTADO' },
                { label: 'ACADEMIA TARA', val: 'SINCRO 98%' },
                { label: 'DISTRIBUIDORES LATAM', val: 'ACTIVO' },
                { label: 'NODOS EUROPA', val: 'ENLACE' }
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4">
                  <span className="text-[12px] font-mono text-slate-600 uppercase font-black tracking-widest">{stat.label}</span>
                  <span className="text-[14px] font-mono text-teal-500 font-black tracking-widest uppercase">{stat.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="reveal py-32 border-t border-white/5">
         <div className="aero-panel w-full aspect-[21/9] flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920')] bg-cover bg-center grayscale opacity-10 group-hover:opacity-20 transition-all duration-1000"></div>
            <div className="relative z-10 text-center space-y-12">
               <h3 className="text-6xl font-black uppercase font-outfit tracking-tighter text-white/50 group-hover:text-teal-500 transition-all">Mapa de Impacto Regional</h3>
               <div className="flex justify-center gap-12">
                  <div className="flex flex-col items-center">
                     <span className="text-5xl font-black font-mono text-white">124</span>
                     <span className="text-[12px] font-mono text-slate-800 uppercase font-black tracking-widest">PROYECTOS ACTIVOS</span>
                  </div>
                  <div className="h-20 w-[1px] bg-white/5"></div>
                  <div className="flex flex-col items-center">
                     <span className="text-5xl font-black font-mono text-teal-500">14</span>
                     <span className="text-[12px] font-mono text-slate-800 uppercase font-black tracking-widest">COMUNAS IMPACTADAS</span>
                  </div>
               </div>
               <button className="px-12 py-5 border border-white/20 text-[12px] font-mono uppercase tracking-[0.6em] font-black hover:bg-teal-500 hover:text-white transition-all backdrop-blur-xl">Abrir Telemetría Geográfica</button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Network;
