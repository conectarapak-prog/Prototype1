
import React, { useState } from 'react';

const ITEMS = [
  { id: '1', title: 'Bicicleta de Montaña', price: '$150', seller: 'Juan Pérez', category: 'Deportes', image: 'https://picsum.photos/400/300?bike' },
  { id: '2', title: 'Mesa de Comedor Madera', price: '$200', seller: 'Maria García', category: 'Hogar', image: 'https://picsum.photos/400/300?table' },
  { id: '3', title: 'Laptop HP 2022', price: '$450', seller: 'Carlos Ruiz', category: 'Electrónica', image: 'https://picsum.photos/400/300?laptop' },
  { id: '4', title: 'Colección de Libros', price: '$40', seller: 'Ana Belén', category: 'Libros', image: 'https://picsum.photos/400/300?books' },
  { id: '5', title: 'Plantas de Interior', price: '$15', seller: 'Lucía Domínguez', category: 'Jardín', image: 'https://picsum.photos/400/300?plant' },
  { id: '6', title: 'Cámara Fotográfica', price: '$300', seller: 'Roberto Sol', category: 'Electrónica', image: 'https://picsum.photos/400/300?camera' },
];

const CATEGORIES = ['Todos', 'Electrónica', 'Hogar', 'Deportes', 'Libros', 'Jardín'];

const Marketplace: React.FC = () => {
  const [filter, setFilter] = useState('Todos');

  const filteredItems = filter === 'Todos' ? ITEMS : ITEMS.filter(i => i.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Mercado Rapak</h1>
          <p className="text-slate-600">Apoya la economía local comprando a tus vecinos.</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg flex items-center space-x-2">
          <i className="fas fa-plus"></i>
          <span>Publicar Anuncio</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="relative h-48 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-indigo-600 font-bold text-sm">
                {item.price}
              </div>
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">{item.category}</span>
              <h3 className="text-lg font-bold text-slate-800 mt-1 mb-2">{item.title}</h3>
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs">
                    <i className="fas fa-user"></i>
                  </div>
                  <span className="text-sm text-slate-600">{item.seller}</span>
                </div>
                <button className="text-indigo-600 hover:text-indigo-700 font-bold text-sm">
                  Contactar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
