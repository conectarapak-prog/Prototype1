
import React, { useState, useRef, useEffect } from 'react';
import { askCommunityAssistant } from '../geminiService';
import { ChatMessage } from '../types';

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bienvenido al Centro de Estrategia Conectarapak. Estoy aquí para diseñar su tesis de inversión o refinar su modelo de negocio distrital.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await askCommunityAssistant(userMsg, messages);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  const generatePDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const date = new Date().toLocaleDateString();
    const sessionId = Math.random().toString(36).substring(7).toUpperCase();

    let contentHtml = `
      <html>
        <head>
          <title>Estrategia Conectarapak - ${sessionId}</title>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 60px; color: #000; line-height: 1.4; background: #fff; }
            .header { border-bottom: 4px solid #000; padding-bottom: 20px; margin-bottom: 50px; display: flex; justify-content: space-between; align-items: flex-end; }
            .logo { font-weight: 900; font-size: 32px; text-transform: uppercase; letter-spacing: -1px; }
            .meta { font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 2px; }
            .title { font-size: 50px; font-weight: 900; margin: 60px 0 40px; text-transform: uppercase; letter-spacing: -2px; line-height: 1; }
            .entry { margin-bottom: 40px; border-left: 1px solid #eee; padding-left: 30px; }
            .role { font-size: 9px; font-weight: 900; text-transform: uppercase; color: #0ea5e9; margin-bottom: 10px; letter-spacing: 3px; }
            .text { font-size: 15px; white-space: pre-wrap; color: #333; }
            .footer { margin-top: 100px; padding-top: 20px; border-top: 1px solid #eee; font-size: 9px; color: #999; text-transform: uppercase; letter-spacing: 1px; }
            strong { color: #000; background: #f0f0f0; padding: 0 4px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Conectarapak</div>
            <div class="meta">Doc Estrategia / ${sessionId} / ${date}</div>
          </div>
          <div class="title">Reporte <br/>Consultoría Estratégica</div>
          ${messages.map(msg => `
            <div class="entry">
              <div class="role">${msg.role === 'user' ? 'Consulta del Cliente' : 'Asesor Estratégico'}</div>
              <div class="text">${msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>
            </div>
          `).join('')}
          <div class="footer">
            Documento Estratégico Confidencial. Producido por Inteligencia Conectarapak.
          </div>
          <script>window.onload = () => { window.print(); window.close(); }</script>
        </body>
      </html>
    `;

    printWindow.document.write(contentHtml);
    printWindow.document.close();
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-12 flex flex-col h-[calc(100vh-140px)]">
      <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="space-y-4">
          <span className="text-[14px] font-mono text-sky-500 uppercase tracking-[0.6em] font-black">Interfaz Advisor v3.0</span>
          <h1 className="text-6xl font-black uppercase tracking-tighter leading-none">Consultoría <span className="text-white/20">Estratégica</span></h1>
        </div>
        
        <div className="flex items-center gap-6">
          {messages.length > 1 && (
            <button 
              onClick={generatePDF}
              className="px-12 py-5 bg-white text-black text-[12px] font-mono uppercase tracking-[0.4em] font-black hover:bg-sky-500 hover:text-white transition-all shadow-2xl"
            >
              Exportar PDF de Estrategia
            </button>
          )}
        </div>
      </header>

      <div className="flex-grow flex flex-col bg-white/5 border border-white/10 overflow-hidden shadow-2xl relative">
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-12 md:p-24 space-y-20">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] md:max-w-[70%]`}>
                <div className="flex items-center space-x-6 mb-6">
                   <span className="text-[12px] font-mono uppercase text-slate-500 font-black tracking-[0.4em]">
                    {msg.role === 'user' ? 'Sesión_Usuario' : 'Consultor_IA'}
                  </span>
                   <div className={`h-[1px] flex-grow ${msg.role === 'user' ? 'bg-sky-500/40' : 'bg-white/10'}`}></div>
                </div>
                <div className={`text-lg md:text-2xl font-light leading-relaxed ${msg.role === 'user' ? 'text-white font-medium italic' : 'text-slate-300'}`}>
                  {msg.text.split('\n').map((line, idx) => (
                    <p key={idx} className="mb-6">
                      {line.includes('**') ? 
                        line.split('**').map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-sky-400 font-black">{part}</strong> : part)
                        : line
                      }
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center space-x-6 text-sky-500 font-mono text-[11px] uppercase tracking-[0.5em] font-black">
              <span className="w-2 h-2 bg-sky-500 animate-ping"></span>
              <span>Procesando vectores de datos...</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="p-16 border-t border-white/5 bg-black/60 flex items-center gap-12">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Analizar tesis de inversión en energía..."
            className="flex-grow bg-transparent border-b-2 border-white/10 py-6 text-2xl font-light focus:outline-none focus:border-sky-600 transition-all placeholder:text-white/10 placeholder:uppercase placeholder:text-[12px] placeholder:tracking-[0.5em] placeholder:font-black"
          />
          <button 
            type="submit"
            disabled={loading || !input.trim()}
            className="text-[13px] font-mono uppercase tracking-[0.6em] font-black hover:text-sky-500 disabled:text-slate-800 transition-colors"
          >
            Ejecutar_Consulta
          </button>
        </form>
      </div>
    </div>
  );
};

export default Assistant;
