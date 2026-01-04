
import React, { useState } from 'react';

const Reports: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    category: 'Infraestructura',
    location: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ category: 'Infraestructura', location: '', description: '' });
      alert("¡Reporte enviado con éxito! Un equipo revisará tu caso.");
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-6">Centro de Reportes</h1>
          <p className="text-slate-600 text-lg mb-10">
            Ayúdanos a mantener Rapak en perfectas condiciones. Tu reporte llega directamente al equipo de mantenimiento del distrito.
          </p>

          <div className="space-y-6">
            <ReportStep 
              number="1" 
              title="Identifica el Problema" 
              desc="Toma una foto o describe claramente qué está sucediendo."
            />
            <ReportStep 
              number="2" 
              title="Ubica el Incidente" 
              desc="Indícanos la calle, referencia o usa tu ubicación actual."
            />
            <ReportStep 
              number="3" 
              title="Seguimiento" 
              desc="Recibe actualizaciones sobre el estado de tu reporte."
            />
          </div>
          
          <div className="mt-12 p-8 bg-indigo-50 rounded-3xl border border-indigo-100">
            <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
              <i className="fas fa-info-circle mr-2"></i>
              Estado de hoy
            </h4>
            <p className="text-indigo-600">
              Hoy se han resuelto <strong>12 reportes</strong> en el área. ¡Gracias por participar!
            </p>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-800 mb-8">Nuevo Reporte</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Categoría</label>
              <select 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option>Infraestructura (Baches, Aceras)</option>
                <option>Iluminación</option>
                <option>Basura y Limpieza</option>
                <option>Seguridad</option>
                <option>Otros</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Ubicación</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Calle, intersección o punto de referencia"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-700">
                  <i className="fas fa-location-crosshairs"></i>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Descripción</label>
              <textarea 
                rows={4}
                placeholder="Describe brevemente el incidente..."
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={submitted}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg disabled:bg-slate-300 transition-all"
            >
              {submitted ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i> Enviando...
                </span>
              ) : "Enviar Reporte"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ReportStep = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
  <div className="flex space-x-6">
    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center font-bold text-indigo-600 text-xl">
      {number}
    </div>
    <div>
      <h4 className="text-xl font-bold text-slate-800 mb-1">{title}</h4>
      <p className="text-slate-600">{desc}</p>
    </div>
  </div>
);

export default Reports;
