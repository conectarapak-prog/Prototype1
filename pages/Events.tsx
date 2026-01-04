
import React from 'react';
import { CommunityEvent } from '../types';

const MOCK_EVENTS: CommunityEvent[] = [
  { id: '1', title: 'Feria Gastronómica Local', date: '15 de Mayo, 2024', location: 'Plaza Principal Rapak', description: 'Ven a disfrutar de los mejores platos típicos preparados por nuestros vecinos.', category: 'social' },
  { id: '2', title: 'Reunión de Seguridad Vecinal', date: '18 de Mayo, 2024', location: 'Centro Comunitario', description: 'Trataremos temas de vigilancia y nuevas cámaras en el sector norte.', category: 'meeting' },
  { id: '3', title: 'Operativo de Vacunación Mascotas', date: '22 de Mayo, 2024', location: 'Parque Los Pinos', description: 'Vacunación gratuita para perros y gatos. Trae a tu mascota con correa.', category: 'service' },
  { id: '4', title: 'Taller de Huertos Urbanos', date: '25 de Mayo, 2024', location: 'Bibloteca Municipal', description: 'Aprende a cultivar tus propios vegetales en espacios reducidos.', category: 'social' },
];

const Events: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Próximos Eventos</h1>
        <p className="text-slate-600 text-lg">Actividades y reuniones que no te puedes perder en el distrito.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_EVENTS.map(event => (
          <div key={event.id} className="flex bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all">
            <div className="w-32 bg-indigo-50 flex flex-col items-center justify-center border-r border-indigo-100 p-4">
              <span className="text-indigo-600 font-bold text-3xl">{event.date.split(' ')[0]}</span>
              <span className="text-indigo-400 text-sm uppercase font-semibold">{event.date.split(' ')[2]}</span>
            </div>
            <div className="p-8 flex-grow">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  event.category === 'social' ? 'bg-green-100 text-green-600' :
                  event.category === 'meeting' ? 'bg-orange-100 text-orange-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {event.category}
                </span>
                <span className="text-slate-400 text-sm">• {event.location}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{event.title}</h3>
              <p className="text-slate-600 mb-6">{event.description}</p>
              <button className="px-6 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all">
                Más Detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-white rounded-[3rem] p-10 border border-indigo-100 text-center">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">¿Quieres organizar un evento?</h3>
        <p className="text-slate-600 mb-8 max-w-xl mx-auto">Toda la comunidad puede proponer actividades. Envíanos tu propuesta y te ayudaremos con la difusión.</p>
        <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg">
          Proponer Evento
        </button>
      </div>
    </div>
  );
};

export default Events;
