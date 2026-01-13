
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Project } from '../types';

const MY_PROJECTS: Project[] = [
  { 
    id: 'patitas-1', 
    title: 'Patitas de la calle', 
    creator: 'Gean Karlo', 
    description: 'Ayudar a los animales de la calle', 
    category: 'Medio Ambiente', 
    goal: 2000000, 
    raised: 1200000, 
    investors: 37, 
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=800', 
    status: 'active',
    minInvestment: 50,
    daysLeft: 46,
    valuation: 5000000,
    returnEstimate: 'Social',
    riskLevel: 'Bajo',
    milestones: [],
    team: []
  },
  { 
    id: 'eco-2', 
    title: 'Recicla Tara', 
    creator: 'Gean Karlo', 
    description: 'Sistema de reciclaje industrial para Iquique', 
    category: 'Sostenibilidad', 
    goal: 800000, 
    raised: 600000, 
    investors: 14, 
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800', 
    status: 'active',
    minInvestment: 100,
    daysLeft: 12,
    valuation: 2000000,
    returnEstimate: '10%',
    riskLevel: 'Moderado',
    milestones: [],
    team: []
  }
];

const Dashboard: React.FC = () => {
  const [role, setRole] = useState<'Emprendedor' | 'Donador'>('Emprendedor');
  const [activeTab, setActiveTab] = useState<'Mis Proyectos' | 'Contribuciones' | 'Logros'>('Mis Proyectos');
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 py-16 space-y-12">
      
      {/* Header - Mi Hub */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black font-outfit text-amber-500 uppercase tracking-tighter">Mi Hub - {role}</h1>
          <p className="text-slate-400 text-lg">
            Bienvenido, <span className="text-white font-bold">Gean Karlo</span>. Aquí comienza tu viaje de la idea al impacto.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="aero-panel p-1.5 flex rounded-full border-white/10 shadow-xl">
            <button 
              onClick={() => setRole('Emprendedor')}
              className={`px-8 py-3 rounded-full text-[11px] font-mono uppercase tracking-widest font-black transition-all flex items-center gap-3 ${role === 'Emprendedor' ? 'bg-teal-500 text-white shadow-[0_0_20px_#14b8a6]' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fas fa-briefcase"></i>
              Emprendedor
            </button>
            <button 
              onClick={() => setRole('Donador')}
              className={`px-8 py-3 rounded-full text-[11px] font-mono uppercase tracking-widest font-black transition-all flex items-center gap-3 ${role === 'Donador' ? 'bg-[#1e293b] text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fas fa-heart"></i>
              Donador
            </button>
          </div>
          
          <Link to="/onboarding" className="aero-panel px-8 py-4 bg-white text-black text-[11px] font-mono uppercase tracking-widest font-black hover:bg-teal-500 hover:text-white transition-all shadow-xl flex items-center gap-3">
            <i className="fas fa-plus"></i>
            Nuevo Proyecto
          </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: 'fa-chart-line', label: 'Proyectos Activos', val: '2', color: 'text-sky-400', bg: 'bg-sky-400/10' },
          { icon: 'fa-dollar-sign', label: 'Total Objetivo', val: '$1.800.000', color: 'text-amber-400', bg: 'bg-amber-400/10' },
          { icon: 'fa-users', label: 'Proyectos Totales', val: '2', color: 'text-teal-400', bg: 'bg-teal-400/10' },
          { icon: 'fa-medal', label: 'Logros', val: '2/4', color: 'text-rose-400', bg: 'bg-rose-400/10' }
        ].map((stat, i) => (
          <div key={i} className="aero-panel p-8 flex items-center gap-6 tech-frame hover:translate-y-[-4px] transition-transform">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${stat.bg} ${stat.color} border border-white/5`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black mb-1">{stat.label}</p>
              <p className="text-3xl font-black font-outfit leading-none">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="space-y-8 pt-8">
        <div className="flex border-b border-white/5 gap-2">
          {['Mis Proyectos', 'Contribuciones', 'Logros'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-10 py-4 text-[11px] font-mono uppercase tracking-[0.3em] font-black transition-all relative ${activeTab === tab ? 'text-teal-400 bg-teal-500/5' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-teal-500 shadow-[0_0_10px_#14b8a6]"></div>}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8">
          {activeTab === 'Mis Proyectos' && MY_PROJECTS.map((project) => (
            <div key={project.id} className="aero-panel p-10 tech-frame bg-white/[0.02] flex flex-col md:flex-row gap-12 group transition-all">
              <div className="md:w-64 h-48 overflow-hidden rounded-xl border border-white/5 shrink-0">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>

              <div className="flex-grow space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-4xl font-black font-outfit uppercase tracking-tighter leading-none">{project.title}</h3>
                    <p className="text-slate-500 text-lg font-light">{project.description}</p>
                  </div>
                  <span className="bg-teal-500/10 text-teal-500 px-4 py-1.5 rounded-full text-[10px] font-mono font-black uppercase tracking-widest border border-teal-500/20">
                    Activo
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="bg-sky-500 text-white px-5 py-1.5 rounded-full text-[9px] font-mono font-black uppercase tracking-[0.3em]">
                    {project.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-4">
                  <div className="space-y-3">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Progreso</p>
                    <div className="h-4 bg-slate-900 rounded-full overflow-hidden flex shadow-inner border border-white/5">
                      <div 
                        className="h-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all duration-1000" 
                        style={{ width: `${(project.raised/project.goal) * 100}%` }}
                      ></div>
                      <div className="flex-grow bg-sky-500 opacity-30"></div>
                    </div>
                    <p className="text-sm font-black font-mono text-slate-300">
                      ${project.raised.toLocaleString()} / <span className="text-slate-600">${project.goal.toLocaleString()}</span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Contribuyentes</p>
                    <p className="text-3xl font-black font-outfit">{project.investors}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Días restantes</p>
                    <p className="text-3xl font-black font-outfit">{project.daysLeft}</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button 
                    onClick={() => navigate(`/project-detail/${project.id}`)}
                    className="px-10 py-4 bg-white/5 border border-white/10 text-white text-[11px] font-mono uppercase tracking-widest font-black hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all flex items-center gap-3"
                  >
                    <i className="fas fa-eye"></i>
                    Ver
                  </button>
                  <button className="px-10 py-4 bg-white/5 border border-white/10 text-white text-[11px] font-mono uppercase tracking-widest font-black hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all flex items-center gap-3">
                    <i className="fas fa-pencil"></i>
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}

          {activeTab !== 'Mis Proyectos' && (
            <div className="py-24 text-center space-y-4 opacity-30">
              <i className="fas fa-folder-open text-6xl"></i>
              <p className="text-xl font-mono uppercase tracking-widest">Aún no hay datos en esta sección</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
