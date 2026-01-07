
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { getIntelligenceUpdates } from '../geminiService';

const GROWTH_DATA = [
  { name: 'Ene', valor: 2100 },
  { name: 'Feb', valor: 2400 },
  { name: 'Mar', valor: 2200 },
  { name: 'Abr', valor: 2800 },
  { name: 'May', valor: 3500 },
  { name: 'Jun', valor: 4200 },
  { name: 'Jul', valor: 5800 },
];

const IMPACT_DATA = [
  { name: 'Agua', meta: 80, actual: 65 },
  { name: 'Energía', meta: 100, actual: 92 },
  { name: 'Circular', meta: 70, actual: 88 },
  { name: 'Social', meta: 90, actual: 74 },
];

const Dashboard: React.FC = () => {
  const [intelligence, setIntelligence] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchIntelligence();
  }, []);

  const fetchIntelligence = async () => {
    setIsRefreshing(true);
    const updates = await getIntelligenceUpdates();
    setIntelligence(updates);
    setIsRefreshing(false);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 py-24 space-y-16 animate-in fade-in duration-1000">
      
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-white/5 pb-16 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_15px_#14b8a6]"></span>
            <span className="text-[11px] font-mono text-teal-500 uppercase tracking-[0.8em] font-black">Global Terminal / Tarapacá</span>
          </div>
          <h1 className="text-7xl font-black uppercase tracking-tighter font-outfit leading-none">Telemetría <br/><span className="text-amber-500 italic">de Impacto</span></h1>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full lg:w-auto">
          {[
            { label: 'GLOBAL ASSETS', val: '$8.2M', trend: '+12%' },
            { label: 'RED NODES', val: '2,104', trend: '+86' },
            { label: 'CO2 OFFSET', val: '450T', trend: '+14T' },
            { label: 'YIELD AVG', val: '14.2%', trend: 'Steady' }
          ].map((stat, i) => (
            <div key={i} className="aero-panel p-6 border-white/5 text-center space-y-1">
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-black block">{stat.label}</span>
              <p className="text-xl font-black font-outfit">{stat.val}</p>
              <span className={`text-[9px] font-mono font-bold ${stat.trend.startsWith('+') ? 'text-teal-500' : 'text-slate-600'}`}>{stat.trend}</span>
            </div>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 aero-panel p-10 space-y-10 border-white/5 tech-frame">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-[11px] font-mono text-teal-500 uppercase tracking-[0.5em] font-black">Net Growth Matrix</h3>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Capital Inflow (Region 01)</p>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={GROWTH_DATA}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#14b8a605" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff10" fontSize={9} axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff10" fontSize={9} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #14b8a620', borderRadius: '2px', textTransform: 'uppercase', fontSize: '9px' }}
                />
                <Area type="monotone" dataKey="valor" stroke="#14b8a6" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 aero-panel p-10 flex flex-col space-y-10 border-white/5 tech-frame bg-teal-500/[0.02]">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="text-[11px] font-mono text-teal-500 uppercase tracking-[0.5em] font-black">Intelligence Radar</h3>
            <button onClick={fetchIntelligence} className={`text-slate-600 hover:text-teal-400 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}>
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
          <div className="space-y-10 flex-grow">
            {intelligence.map((item, i) => (
              <div key={i} className="relative pl-8 group cursor-default">
                <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-teal-500 group-hover:bg-amber-500 transition-colors"></div>
                <div className="absolute left-[2.5px] top-4 bottom-[-25px] w-[1px] bg-white/5"></div>
                <span className="text-[9px] font-mono text-slate-500 font-black tracking-widest block uppercase mb-2">{item.time} CLST</span>
                <p className="text-base text-slate-300 font-light leading-snug group-hover:text-white transition-colors">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="pt-8">
            <button className="w-full py-5 bg-teal-500 text-white text-[10px] font-mono uppercase tracking-[0.4em] font-black hover:bg-white hover:text-black transition-all">
              DATA ROOM ACCESS
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="aero-panel p-10 tech-frame space-y-8">
            <h3 className="text-[11px] font-mono text-teal-500 uppercase tracking-[0.5em] font-black">Sustainability Index</h3>
            <div className="h-[250px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={IMPACT_DATA}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                     <XAxis dataKey="name" stroke="#ffffff10" fontSize={9} axisLine={false} tickLine={false} />
                     <YAxis stroke="#ffffff10" fontSize={9} axisLine={false} tickLine={false} />
                     <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', border: 'none' }} />
                     <Bar dataKey="meta" fill="#14b8a610" radius={[2, 2, 0, 0]} />
                     <Bar dataKey="actual" fill="#14b8a6" radius={[2, 2, 0, 0]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="aero-panel p-10 tech-frame flex flex-col justify-center space-y-6 bg-[url('https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800')] bg-cover bg-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>
            <div className="relative z-10 text-center space-y-6">
               <h4 className="text-3xl font-black uppercase font-outfit tracking-tighter">Impacto Social Auditado</h4>
               <p className="text-slate-400 font-light text-base italic max-w-sm mx-auto">
                 "ConecTarapak ha generado más de 400 empleos técnicos especializados en las comunas del interior."
               </p>
               <div className="flex justify-center gap-10 pt-4">
                  <div>
                    <span className="text-3xl font-black font-mono text-teal-500">+12%</span>
                    <p className="text-[8px] font-mono text-slate-600 uppercase font-black mt-1">EMPLEABILIDAD</p>
                  </div>
                  <div className="w-[1px] h-10 bg-white/5"></div>
                  <div>
                    <span className="text-3xl font-black font-mono text-teal-500">98%</span>
                    <p className="text-[8px] font-mono text-slate-600 uppercase font-black mt-1">ESG SCORE</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
};

export default Dashboard;
