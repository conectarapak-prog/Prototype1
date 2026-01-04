
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getIntelligenceUpdates } from '../geminiService';

const INITIAL_DATA = [
  { name: 'Lun', valor: 4000 },
  { name: 'Mar', valor: 4200 },
  { name: 'Mie', valor: 4100 },
  { name: 'Jue', valor: 4800 },
  { name: 'Vie', valor: 5200 },
  { name: 'Sab', valor: 5100 },
  { name: 'Dom', valor: 5500 },
];

const StatCard = ({ label, value, trend, isDynamic = false }: { label: string, value: string | number, trend?: string, isDynamic?: boolean }) => {
  const [currentValue, setCurrentValue] = useState(value);
  
  useEffect(() => {
    if (!isDynamic) return;
    const interval = setInterval(() => {
      if (typeof value === 'number') {
        const variation = (Math.random() - 0.5) * 50;
        setCurrentValue(prev => Number((Number(prev) + variation).toFixed(2)));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isDynamic, value]);

  return (
    <div className="aero-panel p-10 space-y-6 border-sky-500/10 hover:border-sky-500 transition-all group overflow-hidden relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rotate-45 translate-x-12 -translate-y-12 group-hover:bg-sky-500/10 transition-colors"></div>
      <span className="text-[14px] font-mono text-sky-700 uppercase tracking-[0.5em] font-black block">{label}</span>
      <div className="flex items-end justify-between relative z-10">
        <span className="text-4xl font-black font-outfit uppercase tracking-tighter">
          {typeof currentValue === 'number' ? `$${currentValue.toLocaleString()}` : currentValue}
        </span>
        {trend && (
          <div className="flex flex-col items-end">
             <span className={`text-[12px] font-mono font-black ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{trend}</span>
             <div className="w-16 h-1.5 bg-sky-900/20 mt-2 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 animate-pulse" style={{width: '75%'}}></div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState(INITIAL_DATA);
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

  const assets = [
    { id: '1', name: 'Rapak-Waste Tech', status: 'Operativo', impact: '8.2 Ton CO2', yield: '+15.2%', risk: 'Bajo', detail: 'Planta de transformación de residuos industriales en Tarapacá.' },
    { id: '2', name: 'Sol-Tara Energy', status: 'Sincronizado', impact: '12MW Gen', yield: '+9.4%', risk: 'Moderado', detail: 'Red de micro-redes solares para comunidades aisladas.' },
    { id: '3', name: 'Aqua-Pure Hub', status: 'Análisis IA', impact: '4k m3/día', yield: 'Pendiente', risk: 'Fase I', detail: 'Proyecto de desalinización solar con enfoque en economía circular.' }
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 py-16 space-y-16 animate-in fade-in duration-1000">
      
      {/* CONTROL PANEL HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-sky-500/10 pb-16 gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_#22c55e]"></span>
            <span className="text-[14px] font-mono text-sky-500 uppercase tracking-[0.6em] font-black">Link de Operaciones: ONLINE (TARAPACÁ)</span>
          </div>
          <h1 className="text-7xl font-black uppercase tracking-tighter font-outfit leading-none">TERMINAL DE <br/><span className="text-sky-500 italic">IMPACTO REGIONAL</span></h1>
        </div>
        <div className="flex gap-6">
          <button className="px-10 py-5 bg-sky-500 text-white text-[12px] font-mono uppercase tracking-widest font-black shadow-[0_0_35px_rgba(14,165,233,0.3)] hover:bg-white hover:text-sky-500 transition-all">
            Nueva Tesis de Inversión
          </button>
        </div>
      </header>

      {/* STRATEGIC METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatCard label="Patrimonio de Red" value={245800} trend="+18.2%" isDynamic />
        <StatCard label="Alianzas Activas" value="32" trend="+5 act" />
        <StatCard label="Impacto Ambiental" value="ÓPTIMO" />
        <StatCard label="Nodos Distribuidos" value="142" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* CHART AREA */}
        <div className="lg:col-span-8 aero-panel p-12 space-y-12 border-sky-500/20">
          <div className="flex justify-between items-center">
            <h3 className="text-[14px] font-mono text-sky-500 uppercase tracking-[0.6em] font-black">Crecimiento de Ecosistema Tarapacá</h3>
            <div className="flex gap-6 text-[12px] font-mono text-slate-500 font-bold uppercase tracking-widest">
              <span className="text-sky-400 border-b-2 border-sky-400 pb-1 cursor-pointer">Historial_Live</span>
            </div>
          </div>
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0ea5e908" vertical={false} />
                <XAxis dataKey="name" stroke="#0ea5e930" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="#0ea5e930" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid #0ea5e940', borderRadius: '4px' }}
                  itemStyle={{ color: '#0ea5e9', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="valor" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI FEED */}
        <div className="lg:col-span-4 aero-panel p-12 flex flex-col space-y-10 border-sky-500/20">
          <div className="flex justify-between items-center border-b border-sky-500/10 pb-6">
            <h3 className="text-[14px] font-mono text-sky-500 uppercase tracking-[0.6em] font-black">Vigilancia de Inteligencia</h3>
            <button onClick={fetchIntelligence} className={`text-sky-800 ${isRefreshing ? 'animate-spin' : ''}`}>
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
          <div className="space-y-10 flex-grow">
            {intelligence.map((item, i) => (
              <div key={i} className="border-l-2 border-sky-500/30 pl-8 py-2 space-y-3 group hover:border-sky-500 transition-all">
                <span className="text-[12px] font-mono text-sky-800 font-bold tracking-widest block uppercase">{item.time} _ UTC-4</span>
                <p className="text-lg text-slate-400 font-light leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
          <button className="w-full py-6 bg-sky-500/10 border border-sky-500/30 text-[12px] font-mono uppercase tracking-[0.5em] font-black hover:bg-sky-500 transition-all">
            Descargar Reporte IA
          </button>
        </div>
      </div>

      {/* PROJECT TRACKER */}
      <section className="space-y-12">
        <h3 className="text-[14px] font-mono text-sky-500 uppercase tracking-[0.6em] font-black">Portafolio de Activos Prioritarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {assets.map((asset) => (
            <div key={asset.id} className="aero-panel p-12 space-y-8 hover:border-sky-500 transition-all group cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[12px] font-mono text-sky-500 font-black tracking-widest block mb-2 uppercase">{asset.status}</span>
                  <h4 className="text-3xl font-black uppercase font-outfit group-hover:text-sky-400 transition-colors">{asset.name}</h4>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-sky-500 font-mono">{asset.yield}</span>
                  <p className="text-[12px] font-mono text-slate-600 font-bold uppercase tracking-widest mt-1">Impacto: {asset.impact}</p>
                </div>
              </div>
              <p className="text-base text-slate-400 font-light italic leading-relaxed">{asset.detail}</p>
              <div className="pt-6 border-t border-sky-500/10 flex gap-4">
                <button className="flex-grow py-4 bg-sky-500 text-white text-[12px] font-mono uppercase tracking-widest font-black">Ver Detalles</button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
