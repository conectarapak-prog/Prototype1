
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { askCommunityAssistant } from '../geminiService';

interface BMCBlockData {
  draft: string;
  summary: string;
  loading: boolean;
  connections: string[];
}

interface BMCBlockProps {
  number: number;
  title: string;
  placeholder: string;
  data: BMCBlockData;
  onChange: (val: string) => void;
  onAnalyze: () => void;
}

const BMCBlock: React.FC<BMCBlockProps> = ({ number, title, placeholder, data, onChange, onAnalyze }) => (
  <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm p-6 flex flex-col space-y-6 animate-in fade-in duration-500 relative">
    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-rose-500"></div>
    
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold text-sm">
        {number}
      </div>
      <h4 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h4>
    </div>

    <div className="flex items-center gap-2">
      <span className="text-[9px] font-mono text-slate-400 font-black uppercase tracking-widest">CONECTADO:</span>
      <div className="flex flex-wrap gap-1">
        {data.connections.map((conn, i) => (
          <span key={i} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[8px] font-mono text-slate-500 flex items-center gap-1">
            {conn} <i className="fas fa-link text-[6px]"></i>
          </span>
        ))}
      </div>
    </div>

    <div className="bg-cyan-50/50 border border-cyan-100 rounded-xl p-4 space-y-2">
      <span className="text-[9px] font-mono text-cyan-500 font-black uppercase tracking-widest block">RESUMEN CONSOLIDADO</span>
      <p className="text-[11px] text-slate-500 font-medium italic">
        {data.summary || "Aún no has equipado un resumen."}
      </p>
    </div>

    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-mono text-slate-400 font-black uppercase tracking-widest">DATOS CRUDOS (BORRADOR)</span>
      </div>
      <textarea 
        value={data.draft}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-24 p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-600 text-xs placeholder:text-slate-300 resize-none shadow-inner"
      ></textarea>
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-mono text-slate-400 font-bold">{data.draft.length} / 5,000</span>
        <button 
          onClick={onAnalyze}
          disabled={!data.draft || data.loading}
          className="px-6 py-2 bg-sky-300 text-white rounded-lg font-black text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 hover:bg-sky-400 transition-all shadow-md shadow-sky-500/10 disabled:opacity-50"
        >
          <i className={`fas ${data.loading ? 'fa-spinner fa-spin' : 'fa-bolt'}`}></i>
          {data.loading ? 'ANALIZANDO...' : 'Auditar & Refinar'}
        </button>
      </div>
    </div>
  </div>
);

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState<'Bitácora' | 'Investigación' | 'Informes' | 'Comentarios'>('Investigación');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  
  // Fix: Defined 'tools' array and 'handleOpenTool' function to resolve reference errors
  const tools = [
    { 
      id: 'BMC', 
      title: 'Business Model Canvas', 
      desc: 'Visualiza y refina tu modelo de negocio con auditoría IA en tiempo real.', 
      icon: 'fa-table-cells', 
      gradient: 'from-amber-400 to-orange-500', 
      status: 'ACTIVO' 
    },
    { 
      id: 'SWOT', 
      title: 'Análisis FODA / SWOT', 
      desc: 'Detección algorítmica de amenazas externas y fortalezas del ecosistema.', 
      icon: 'fa-shield-halved', 
      gradient: 'from-sky-400 to-indigo-500', 
      status: 'PRÓXIMAMENTE' 
    },
    { 
      id: 'ESG', 
      title: 'Reporte de Impacto ESG', 
      desc: 'Métricas de cumplimiento ambiental y social para inversores institucionales.', 
      icon: 'fa-leaf', 
      gradient: 'from-teal-400 to-emerald-500', 
      status: 'PRÓXIMAMENTE' 
    }
  ];

  const handleOpenTool = (toolId: string) => {
    if (toolId === 'BMC') {
      setSelectedTool('BMC');
    } else {
      alert("Esta herramienta está bajo protocolos de desarrollo avanzado. Estará disponible próximamente.");
    }
  };

  // Estado BMC
  const [businessContext, setBusinessContext] = useState('');
  const [viewMode, setViewMode] = useState<'compacta' | 'ampliada'>('compacta');
  const [bmcData, setBmcData] = useState<Record<number, BMCBlockData>>({
    1: { draft: '', summary: '', loading: false, connections: ['Propuestas', 'Fuentes'] },
    2: { draft: '', summary: '', loading: false, connections: ['Segmentos', 'Canales'] },
    3: { draft: '', summary: '', loading: false, connections: ['Segmentos', 'Canales'] },
    4: { draft: '', summary: '', loading: false, connections: ['Propuestas', 'Segmentos'] },
    5: { draft: '', summary: '', loading: false, connections: ['Segmentos', 'Propuestas'] },
    6: { draft: '', summary: '', loading: false, connections: ['Propuestas', 'Recursos'] },
    7: { draft: '', summary: '', loading: false, connections: ['Actividades', 'Propuestas'] },
    8: { draft: '', summary: '', loading: false, connections: ['Actividades', 'Recursos'] },
    9: { draft: '', summary: '', loading: false, connections: ['Recursos', 'Actividades'] },
  });

  const [finalSynthesis, setFinalSynthesis] = useState({ content: '', loading: false });

  // Fix: Explicitly cast to BMCBlockData array to ensure type safety for .summary access
  const progress = useMemo(() => {
    const completed = (Object.values(bmcData) as BMCBlockData[]).filter(b => b.summary !== '').length;
    return Math.round((completed / 9) * 100);
  }, [bmcData]);

  const handleBlockAudit = async (num: number) => {
    setBmcData(prev => ({ ...prev, [num]: { ...prev[num], loading: true } }));
    
    const blockTitles: Record<number, string> = {
      1: 'Segmentos de Cliente', 2: 'Propuestas de Valor', 3: 'Relaciones con Clientes',
      4: 'Canales', 5: 'Fuentes de Ingresos', 6: 'Actividades Clave',
      7: 'Recursos Clave', 8: 'Socios Clave', 9: 'Estructura de Costes'
    };

    const prompt = `Actúa como un Auditor Estratégico Senior. Analiza este bloque del Business Model Canvas:
    BLOQUE: ${blockTitles[num]}
    CONTEXTO: ${businessContext}
    BORRADOR: ${bmcData[num].draft}
    
    Proporciona un resumen consolidado profesional de máximo 20 palabras que capture la esencia de este bloque refinado.`;

    try {
      const result = await askCommunityAssistant(prompt, []);
      setBmcData(prev => ({ ...prev, [num]: { ...prev[num], summary: result, loading: false } }));
    } catch (e) {
      setBmcData(prev => ({ ...prev, [num]: { ...prev[num], loading: false } }));
    }
  };

  const handleFinalSynthesis = async () => {
    setFinalSynthesis(prev => ({ ...prev, loading: true }));
    // Fix: Explicitly cast entries to [string, BMCBlockData][] for type-safe summary access
    const prompt = `Genera una Síntesis Final Ejecutiva para el Business Model Canvas basado en los siguientes bloques analizados:
    ${(Object.entries(bmcData) as [string, BMCBlockData][]).map(([num, data]) => `${num}: ${data.summary}`).join('\n')}
    
    Crea un resumen de alto impacto de 100 palabras para inversores.`;
    
    try {
      const result = await askCommunityAssistant(prompt, []);
      setFinalSynthesis({ content: result, loading: false });
    } catch (e) {
      setFinalSynthesis({ content: 'Error generando síntesis.', loading: false });
    }
  };

  if (selectedTool === 'BMC') {
    return (
      <div className="bg-[#f8fafc] min-h-screen py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Header BMC */}
          <div className="flex flex-col items-center space-y-8">
            <button 
              onClick={() => setSelectedTool(null)}
              className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-mono font-black uppercase tracking-widest text-amber-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
            >
              <i className="fas fa-arrow-left"></i> Volver al Proyecto
            </button>

            <div className="text-center space-y-2">
              <h1 className="text-7xl font-black text-amber-500/40 font-outfit tracking-tighter drop-shadow-sm">Cerebro 2.1</h1>
              <p className="text-slate-500 font-medium tracking-wide">Business Model Canvas • Embudo de Validación</p>
            </div>

            <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-6 aero-panel p-6 rounded-[2rem] border-white shadow-xl bg-white/40">
              <div className="flex items-center gap-6 flex-grow max-w-md">
                <span className="text-slate-400 font-medium whitespace-nowrap">Progreso: <span className="text-slate-800 font-black">{progress}%</span></span>
                <div className="flex-grow h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-slate-200 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-mono font-black uppercase tracking-widest text-amber-600 flex items-center gap-2 shadow-sm">
                  <i className="fas fa-save"></i> Guardar
                </button>
                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                   <button 
                    onClick={() => setViewMode('compacta')}
                    className={`px-4 py-2 rounded-md text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-2 transition-all ${viewMode === 'compacta' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-500'}`}>
                    <i className="fas fa-th"></i> Compacta
                  </button>
                   <button 
                    onClick={() => setViewMode('ampliada')}
                    className={`px-4 py-2 rounded-md text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-2 transition-all ${viewMode === 'ampliada' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-500'}`}>
                    <i className="fas fa-expand"></i> Ampliada
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contexto BMC */}
          <section className="bg-white rounded-[2rem] border border-slate-200 p-10 space-y-6 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 text-xl shadow-inner">
                <i className="fas fa-brain"></i>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Contexto del Negocio</h3>
                <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-200">
                   Alimenta todos los bloques
                </span>
              </div>
            </div>
            <textarea 
              value={businessContext}
              onChange={(e) => setBusinessContext(e.target.value)}
              placeholder="Describe tu negocio: industria, mercado objetivo, visión, misión, antecedentes clave..."
              className="w-full h-24 p-6 bg-white border border-amber-400/40 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-amber-500/5 text-slate-700 text-sm placeholder:text-slate-300 shadow-inner resize-none transition-all"
            ></textarea>
          </section>

          {/* Grid BMC */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-8">
              <BMCBlock 
                number={1} title="Segmentos de Cliente" 
                placeholder="Define tus segmentos: demografía, psicografía, comportamientos..."
                data={bmcData[1]} onChange={(v) => setBmcData(prev => ({...prev, 1: {...prev[1], draft: v}}))}
                onAnalyze={() => handleBlockAudit(1)}
              />
              <BMCBlock 
                number={3} title="Relaciones con Clientes" 
                placeholder="Estrategias de relación: personal, autoservicio..."
                data={bmcData[3]} onChange={(v) => setBmcData(prev => ({...prev, 3: {...prev[3], draft: v}}))}
                onAnalyze={() => handleBlockAudit(3)}
              />
              <BMCBlock 
                number={6} title="Actividades Clave" 
                placeholder="Actividades críticas: producción, marketing..."
                data={bmcData[6]} onChange={(v) => setBmcData(prev => ({...prev, 6: {...prev[6], draft: v}}))}
                onAnalyze={() => handleBlockAudit(6)}
              />
            </div>

            <div className="space-y-8">
              <BMCBlock 
                number={2} title="Propuestas de Valor" 
                placeholder="Define tu propuesta única: qué problema resuelves..."
                data={bmcData[2]} onChange={(v) => setBmcData(prev => ({...prev, 2: {...prev[2], draft: v}}))}
                onAnalyze={() => handleBlockAudit(2)}
              />
              <BMCBlock 
                number={5} title="Fuentes de Ingresos" 
                placeholder="Modelos de ingresos: venta, suscripción..."
                data={bmcData[5]} onChange={(v) => setBmcData(prev => ({...prev, 5: {...prev[5], draft: v}}))}
                onAnalyze={() => handleBlockAudit(5)}
              />
              <BMCBlock 
                number={8} title="Socios Clave" 
                placeholder="Partnerships estratégicos: proveedores, alianzas..."
                data={bmcData[8]} onChange={(v) => setBmcData(prev => ({...prev, 8: {...prev[8], draft: v}}))}
                onAnalyze={() => handleBlockAudit(8)}
              />
            </div>

            <div className="space-y-8">
              <BMCBlock 
                number={4} title="Canales" 
                placeholder="Canales de comunicación y distribución..."
                data={bmcData[4]} onChange={(v) => setBmcData(prev => ({...prev, 4: {...prev[4], draft: v}}))}
                onAnalyze={() => handleBlockAudit(4)}
              />
              <BMCBlock 
                number={7} title="Recursos Clave" 
                placeholder="Recursos críticos: tecnología, talento..."
                data={bmcData[7]} onChange={(v) => setBmcData(prev => ({...prev, 7: {...prev[7], draft: v}}))}
                onAnalyze={() => handleBlockAudit(7)}
              />
              <BMCBlock 
                number={9} title="Estructura de Costes" 
                placeholder="Estructura de costos: fijos, variables..."
                data={bmcData[9]} onChange={(v) => setBmcData(prev => ({...prev, 9: {...prev[9], draft: v}}))}
                onAnalyze={() => handleBlockAudit(9)}
              />
            </div>
          </div>

          {/* Síntesis Final BMC */}
          <section className="bg-white rounded-[2rem] border border-slate-200 p-10 shadow-sm overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-200 via-teal-200 to-amber-200 opacity-50"></div>
            
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 text-2xl shadow-inner border border-emerald-100">
                  <i className="fas fa-file-signature"></i>
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-slate-800 tracking-tighter">Síntesis Final del BMC</h3>
                  <p className="text-slate-500 font-medium">Genera un resumen ejecutivo de tu modelo de negocio</p>
                </div>
              </div>

              {finalSynthesis.content ? (
                <div className="w-full max-w-4xl p-8 bg-slate-50 rounded-2xl border border-slate-100 text-left animate-in slide-in-from-bottom-4 duration-700">
                  <p className="text-slate-600 leading-relaxed font-light italic">{finalSynthesis.content}</p>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-slate-400 text-sm italic">
                  <i className="fas fa-info-circle"></i>
                  <span>Completa al menos 5 bloques para generar la síntesis</span>
                </div>
              )}

              {/* Fix: Added explicit cast to BMCBlockData[] to resolve 'unknown' type error in filtering */}
              <button 
                onClick={handleFinalSynthesis}
                disabled={(Object.values(bmcData) as BMCBlockData[]).filter(b => b.summary !== '').length < 5 || finalSynthesis.loading}
                className="px-12 py-5 bg-gradient-to-r from-amber-300 via-teal-300 to-cyan-300 text-white rounded-2xl font-black text-[13px] font-mono uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all flex items-center gap-3 disabled:opacity-30 disabled:grayscale disabled:scale-100"
              >
                <i className={`fas ${finalSynthesis.loading ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'}`}></i>
                {finalSynthesis.loading ? 'GENERANDO...' : 'Generar Síntesis Final'}
              </button>
            </div>
          </section>

        </div>
      </div>
    );
  }

  // Visualización estándar del detalle del proyecto
  return (
    <div className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 py-16 space-y-16 animate-in slide-in-from-bottom-8 duration-700">
      
      {/* Top Bar Navigation */}
      <div className="flex justify-between items-center">
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-8 py-3 aero-panel border-white/10 text-[11px] font-mono uppercase tracking-widest font-black hover:bg-white hover:text-black transition-all flex items-center gap-3"
        >
          <i className="fas fa-arrow-left"></i>
          Volver al Hub
        </button>
        <span className="bg-teal-500 text-white px-6 py-2 rounded-full text-[10px] font-mono font-black uppercase tracking-[0.3em] shadow-[0_0_20px_#14b8a6]">
          Activo
        </span>
      </div>

      {/* Project Header */}
      <header className="space-y-4">
        <h1 className="text-7xl md:text-8xl font-black font-outfit text-amber-500 uppercase tracking-tighter leading-none">
          Patitas de la calle
        </h1>
        <p className="text-2xl text-slate-400 font-light italic uppercase tracking-widest">
          Ayudar a los animales de la calle
        </p>
      </header>

      {/* Project Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Recaudado / Meta', val: '$0 / $2.000.000', icon: 'fa-dollar-sign', color: 'text-amber-500' },
          { label: 'Contribuyentes', val: '0', icon: 'fa-users', color: 'text-sky-500' },
          { label: 'Días restantes', val: '46', icon: 'fa-clock', color: 'text-rose-500' },
          { label: 'Ubicación', val: 'Alto Hospicio', icon: 'fa-location-dot', color: 'text-teal-500' }
        ].map((stat, i) => (
          <div key={i} className="aero-panel p-8 flex items-center gap-6 tech-frame">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl bg-white/5 border border-white/5 ${stat.color}`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black mb-1">{stat.label}</p>
              <p className="text-2xl font-black font-outfit leading-none">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Strategy Lab Section */}
      <section className="aero-panel p-12 md:p-16 tech-frame bg-[#0f172a]/40 space-y-16">
        <div className="space-y-4">
          <h2 className="text-5xl font-black font-outfit uppercase tracking-tighter leading-none">Laboratorio de Estrategia</h2>
          <p className="text-slate-500 text-lg uppercase tracking-widest font-light">
            El espacio donde las ideas se convierten en planes de acción validados
          </p>
        </div>

        {/* Strategy Sub-tabs */}
        <div className="aero-panel p-1.5 flex flex-wrap rounded-xl border-white/10 shadow-2xl overflow-hidden">
          {['Bitácora', 'Investigación', 'Informes', 'Comentarios'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab as any)}
              className={`flex-grow px-8 py-5 text-[11px] font-mono uppercase tracking-[0.4em] font-black transition-all flex items-center justify-center gap-4 ${
                activeSubTab === tab 
                ? 'bg-amber-500 text-white shadow-xl translate-y-[-2px]' 
                : 'text-slate-500 hover:text-white'
              }`}
            >
              <i className={`fas ${
                tab === 'Bitácora' ? 'fa-book-open' : 
                tab === 'Investigación' ? 'fa-magnifying-glass' : 
                tab === 'Informes' ? 'fa-file-lines' : 'fa-comments'
              }`}></i>
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="py-8 animate-in fade-in duration-1000">
          {activeSubTab === 'Investigación' ? (
            <div className="space-y-12">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-black">Progreso del combo</span>
                <span className="text-[11px] font-mono text-slate-500 font-black">0%</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500/20 w-0 transition-all duration-1000"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                {/* Fix: Iterating over defined 'tools' list */}
                {tools.map((tool) => (
                  <div key={tool.id} className="bg-white/95 rounded-[2rem] p-10 flex flex-col items-start gap-8 shadow-2xl hover:translate-y-[-8px] transition-all duration-500 border border-white/10 group">
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl text-white shadow-xl bg-gradient-to-br ${tool.gradient}`}>
                      <i className={`fas ${tool.icon}`}></i>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black font-outfit text-slate-800 uppercase tracking-tighter leading-none group-hover:text-amber-500 transition-colors">
                        {tool.title}
                      </h3>
                      <div className="inline-block bg-amber-500/10 text-amber-600 px-4 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-widest border border-amber-500/20">
                        {tool.status}
                      </div>
                      <p className="text-slate-500 text-lg font-light leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>

                    {/* Fix: Added call to 'handleOpenTool' function */}
                    <button 
                      onClick={() => handleOpenTool(tool.id)}
                      className="w-full py-5 bg-amber-500 text-white rounded-2xl font-black text-[13px] font-mono uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg hover:shadow-amber-500/20"
                    >
                      Abrir Herramienta
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-24 flex flex-col items-center text-center space-y-10">
              <div className="w-40 h-40 bg-white/5 rounded-full flex items-center justify-center text-7xl text-amber-500/20 border border-white/5">
                <i className={`fas ${
                    activeSubTab === 'Bitácora' ? 'fa-book' : 
                    activeSubTab === 'Informes' ? 'fa-chart-pie' : 'fa-message'
                  }`}></i>
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-black font-outfit uppercase tracking-tighter">{activeSubTab} del Proyecto</h3>
                <p className="text-slate-500 text-xl font-light max-w-2xl mx-auto italic">
                  {activeSubTab === 'Bitácora' && 'Resumen de los avances y decisiones clave del proyecto.'}
                  {activeSubTab === 'Informes' && 'Métricas financieras y estados de ejecución de capital en tiempo real.'}
                  {activeSubTab === 'Comentarios' && 'Retroalimentación de la red de mentores e inversores estratégicos.'}
                </p>
              </div>
              <button className="px-12 py-5 bg-teal-500 text-white font-mono text-[12px] uppercase tracking-[0.6em] font-black hover:bg-white hover:text-black transition-all glow-teal shadow-2xl flex items-center gap-4">
                <i className="fas fa-plus"></i>
                Nueva Entrada en {activeSubTab}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
