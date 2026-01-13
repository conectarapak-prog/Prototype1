
import React, { useState, useRef, useEffect } from 'react';
import { askCommunityAssistant } from '../geminiService';
import { ChatMessage } from '../types';

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '### TERMINAL DE INTELIGENCIA ESTRATÉGICA\nBienvenido al núcleo de procesamiento de activos Tarapacá. El sistema está listo para ejecutar auditorías de viabilidad técnica, mapeo de alianzas y análisis de riesgo ESG.\n\n| ESTADO: NÚCLEO SINCRONIZADO CON MERCADOS GLOBALES |' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async (customPrompt?: string) => {
    const messageToSend = customPrompt || input.trim();
    if (!messageToSend || loading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: messageToSend }]);
    setLoading(true);

    const response = await askCommunityAssistant(messageToSend, messages);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  const strategicPrompts = [
    { label: "Auditar Viabilidad", icon: "fa-chart-line", prompt: "Realiza una auditoría de viabilidad técnica y financiera profunda para un proyecto de economía circular en la Región de Tarapacá. Enfócate en el régimen Zofri, infraestructura portuaria y potencial de exportación de commodities secundarios." },
    { label: "Mapa de Alianzas", icon: "fa-network-wired", prompt: "Genera un mapa de alianzas estratégicas de alto nivel para un activo tecnológico en el norte de Chile, incluyendo entidades mineras, gubernamentales y hubs de inversión asiáticos." },
    { label: "Riesgos ESG", icon: "fa-leaf", prompt: "Analiza los riesgos ambientales, sociales y de gobernanza (ESG) para un activo de hidrógeno verde en el distrito Rapak, proyectando impacto a 10 años." }
  ];

  const exportToPDF = (text: string) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const date = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    const reportID = `CT-${Math.random().toString(36).substring(7).toUpperCase()}`;

    let contentHtml = `
      <html>
        <head>
          <title>Informe Estratégico - ${reportID}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
            body { font-family: 'Inter', sans-serif; padding: 60px; color: #1a1a1a; line-height: 1.6; }
            .header { border-bottom: 8px solid #14b8a6; padding-bottom: 30px; margin-bottom: 50px; display: flex; justify-content: space-between; align-items: baseline; }
            .logo { font-weight: 900; font-size: 32px; letter-spacing: -1px; }
            .logo span { color: #14b8a6; }
            .meta { font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 3px; }
            h3 { font-size: 28px; font-weight: 900; color: #14b8a6; text-transform: uppercase; margin-top: 50px; border-left: 6px solid #f59e0b; padding-left: 20px; }
            p { font-size: 16px; margin-bottom: 20px; text-align: justify; }
            .highlight { background: #f0fdfa; border-left: 6px solid #14b8a6; padding: 30px; font-style: italic; margin: 40px 0; color: #0f766e; font-size: 18px; }
            .footer { margin-top: 100px; padding-top: 20px; border-top: 1px solid #eee; font-size: 10px; color: #aaa; text-transform: uppercase; }
            strong { color: #000; font-weight: 900; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">CONECTARAPAK<span>.AI</span></div>
            <div class="meta">REGISTRO: ${reportID} | ${date}</div>
          </div>
          <div style="font-size: 56px; font-weight: 900; line-height: 1; margin-bottom: 50px; text-transform: uppercase;">Informe de <br/>Auditoría Estratégica</div>
          ${text.split('\n').map(line => {
            if (line.startsWith('###')) return `<h3>${line.replace('###', '')}</h3>`;
            if (line.startsWith('|')) return `<div class="highlight">${line.replace(/\|/g, '')}</div>`;
            return `<p>${line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
          }).join('')}
          <div class="footer">Este documento es propiedad de ConecTarapak y contiene información estratégica protegida por protocolos de confidencialidad regional.</div>
          <script>window.onload = () => { window.print(); window.close(); }</script>
        </body>
      </html>
    `;
    printWindow.document.write(contentHtml);
    printWindow.document.close();
  };

  const formatMessageText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        return (
          <div key={idx} className="my-10 p-10 bg-teal-500/[0.07] border-l-8 border-teal-500 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 p-4 text-[10px] font-mono text-teal-500/40 uppercase font-black tracking-[0.2em]">VARIABLE_CRÍTICA_DETECTADA</div>
            <p className="text-2xl md:text-3xl font-light text-teal-50 font-outfit italic leading-relaxed">
              {line.replace(/\|/g, '').trim()}
            </p>
          </div>
        );
      }
      
      if (line.trim().startsWith('###')) {
        return (
          <div key={idx} className="mt-20 mb-10">
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter flex items-end gap-8 leading-none">
              <span className="text-teal-500 font-mono text-base tracking-widest mb-2 opacity-50 underline decoration-teal-500/50 decoration-2 underline-offset-8">DATA_SEC_{idx}</span>
              {line.replace('###', '').trim()}
            </h3>
            <div className="h-[4px] w-full bg-gradient-to-r from-teal-500 via-white/10 to-transparent mt-6"></div>
          </div>
        );
      }

      return (
        <p key={idx} className="mb-8 text-xl md:text-2xl text-slate-300 leading-relaxed font-light text-justify max-w-[95%]">
          {line.split('**').map((part, pIdx) => 
            pIdx % 2 === 1 ? <strong key={pIdx} className="text-teal-400 font-black border-b-2 border-teal-500/30 px-1">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <div className="w-full mx-auto px-4 md:px-12 py-10 flex flex-col h-[calc(100vh-120px)]">
      <header className="mb-10 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="relative flex items-center justify-center">
              <span className="w-3 h-3 bg-teal-500 rounded-full animate-ping absolute"></span>
              <span className="w-3 h-3 bg-teal-500 rounded-full shadow-[0_0_15px_#14b8a6]"></span>
            </div>
            <span className="text-[14px] font-mono text-teal-500 uppercase tracking-[0.8em] font-black">Strategic Advisor Alpha v5.0</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none font-outfit">Núcleo de <span className="text-white/20 italic">Consultoría</span></h1>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="aero-panel px-10 py-5 border-white/10 hidden xl:block">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Carga de Datos</span>
            <div className="flex items-center gap-4">
               <div className="w-32 h-1 bg-white/5 overflow-hidden">
                  <div className="h-full bg-teal-500 w-3/4"></div>
               </div>
               <span className="text-sm font-black text-teal-500 uppercase font-mono">EN LÍNEA</span>
            </div>
          </div>
        </div>
      </header>

      {/* Comandos de Auditoría - Expandidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {strategicPrompts.map((sp, idx) => (
          <button 
            key={idx}
            onClick={() => handleSend(sp.prompt)}
            disabled={loading}
            className="aero-panel p-12 flex flex-col justify-between gap-16 border-white/5 hover:border-teal-500/50 hover:bg-teal-500/[0.04] transition-all text-left group tech-frame shadow-2xl overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-4 text-[9px] font-mono text-white/5 uppercase font-black">Cmd_0{idx+1}</div>
            <div className="w-20 h-20 border border-white/10 flex items-center justify-center text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-all duration-500 group-hover:scale-110">
              <i className={`fas ${sp.icon} text-3xl`}></i>
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.4em] font-black block mb-2 group-hover:text-teal-500 transition-colors">Protocolo de Impacto</span>
              <span className="text-2xl xl:text-3xl font-black uppercase tracking-tighter text-white group-hover:text-teal-400 transition-all leading-tight">{sp.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Terminal de Análisis - Ultra Ancho */}
      <div className="flex-grow flex flex-col bg-[#070b14] border border-white/5 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.6)] relative tech-frame">
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 md:p-16 xl:p-24 space-y-32 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`w-full ${msg.role === 'user' ? 'max-w-4xl' : 'max-w-[95%] xl:max-w-[92%]'}`}>
                
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center space-x-10">
                    <span className="text-[12px] font-mono uppercase text-teal-600 font-black tracking-[0.6em]">
                      {msg.role === 'user' ? 'ENTRADA_DE_AUDITORÍA' : 'RESULTADO_AUDITORÍA_INTEGRADA'}
                    </span>
                    <div className="h-[2px] w-64 bg-gradient-to-r from-teal-500/50 to-transparent"></div>
                  </div>
                  
                  {msg.role === 'model' && i > 0 && (
                    <button 
                      onClick={() => exportToPDF(msg.text)}
                      className="px-10 py-4 bg-white/5 border border-white/10 text-white text-[11px] font-mono uppercase tracking-[0.3em] font-black hover:bg-teal-500 hover:text-white transition-all flex items-center gap-4 shadow-xl"
                    >
                      <i className="fas fa-file-pdf text-lg"></i>
                      Generar Reporte Profesional
                    </button>
                  )}
                </div>
                
                <div className={`p-16 md:p-20 xl:p-24 border-white/5 relative shadow-inner tech-frame ${msg.role === 'user' ? 'bg-teal-500/[0.04] text-right ml-auto border-teal-500/20' : 'bg-[#0a0f1d]/60'}`}>
                  {msg.role === 'model' && (
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-teal-500 via-amber-500 to-teal-500 shadow-[2px_0_15px_rgba(20,184,166,0.5)]"></div>
                  )}
                  
                  <div className={`text-2xl xl:text-3xl leading-relaxed ${msg.role === 'user' ? 'text-white font-light italic' : 'text-slate-200'}`}>
                    {formatMessageText(msg.text)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex flex-col space-y-12 p-20 bg-white/[0.01] tech-frame max-w-6xl border-teal-500/20 shadow-2xl">
               <div className="flex items-center space-x-10 text-teal-500 font-mono text-[13px] uppercase tracking-[0.8em] font-black">
                <div className="relative">
                  <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <span className="animate-pulse">Sincronizando modelos de impacto regional...</span>
              </div>
              <div className="space-y-6">
                 <div className="h-2 bg-white/5 overflow-hidden relative rounded-full">
                    <div className="absolute inset-0 bg-teal-500 w-1/4 animate-[scan_2.5s_infinite_ease-in-out]"></div>
                 </div>
                 <div className="flex justify-between text-[11px] font-mono text-slate-600 uppercase tracking-widest font-black">
                   <span>DATA_NODES: INTEGRANDO_ZOFRI</span>
                   <span className="text-teal-500/50">CALCULANDO_KPI_ESG</span>
                   <span>ESTADO: PROCESANDO</span>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Barra de Comandos del Sistema - Ultra Ancho */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-16 border-t border-white/10 bg-[#0a0f1d] flex items-center gap-12 backdrop-blur-3xl relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
          <div className="flex-grow relative flex items-center px-8">
            <span className="text-teal-500 font-mono font-black text-4xl mr-12 tracking-tighter animate-pulse">{">"}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describa el activo o proyecto para iniciar el análisis técnico de impacto..."
              className="w-full bg-transparent py-10 text-3xl font-light text-white focus:outline-none focus:placeholder:opacity-0 transition-all placeholder:text-slate-700 placeholder:uppercase placeholder:text-[13px] placeholder:tracking-[0.8em]"
            />
          </div>
          <button 
            type="submit"
            disabled={loading || !input.trim()}
            className="group px-24 py-10 bg-teal-500 text-white text-[15px] font-mono uppercase tracking-[0.8em] font-black hover:bg-white hover:text-black disabled:bg-slate-800 disabled:text-slate-500 transition-all shadow-[0_0_80px_rgba(20,184,166,0.4)] relative overflow-hidden shrink-0"
          >
            <span className="relative z-10">Ejecutar Comando</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
          </button>
        </form>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(20, 184, 166, 0.2); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #14b8a6; }
      `}</style>
    </div>
  );
};

export default Assistant;
