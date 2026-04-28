import React, { useState } from 'react';
import { Search, MapPin, ArrowLeft } from 'lucide-react';
import { IMAGES, MOCK_PETS_DATA } from '../constants';

export const LostPetsView = ({ navigate }: { navigate: (v: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = searchQuery.length > 0 
    ? MOCK_PETS_DATA.filter(pet => 
        pet.status === 'lost' && 
        pet.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const filteredPets = MOCK_PETS_DATA.filter(pet => 
    pet.status === 'lost' && (
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSuggestionClick = (name: string) => {
    setSearchQuery(name);
    setShowSuggestions(false);
  };

  return (
    <div className="flex-1 bg-surface-low py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-text mb-2">Mascotas Perdidas</h1>
            <p className="text-text-variant text-lg">Ayuda a estas mascotas a volver a casa.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
              <input 
                type="text" 
                placeholder="Buscar por nombre, raza..." 
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                className="w-full pl-10 pr-4 py-3 bg-surface border border-outline/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-text"
              />
              
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-outline/10 rounded-xl shadow-xl z-50 overflow-hidden">
                  {suggestions.map((pet) => (
                    <button
                      key={pet.id}
                      onClick={() => handleSuggestionClick(pet.name)}
                      className="w-full text-left px-4 py-3 hover:bg-surface-low flex items-center gap-3 transition-colors border-b border-outline/5 last:border-0"
                    >
                      <img src={pet.image} alt={pet.name} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <p className="text-sm font-bold text-text">{pet.name}</p>
                        <p className="text-xs text-text-variant">{pet.breed} • {pet.location}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => navigate('map')} className="bg-secondary-container text-primary px-6 py-3 rounded-xl font-bold hover:bg-surface-high transition-colors flex items-center gap-2 whitespace-nowrap">
              <MapPin size={20} /> Ver en Mapa
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPets.map((pet) => (
            <div key={pet.id} className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-outline/10 group cursor-pointer" onClick={() => navigate('detail')}>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={pet.image} 
                  alt={pet.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-error text-surface text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  Perdido
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-serif text-xl font-bold text-text">{pet.name}</h3>
                  <span className="text-xs font-medium text-text-muted bg-surface-high px-2 py-1 rounded-md">{pet.timeAgo}</span>
                </div>
                <p className="text-sm text-text-variant">{pet.type} • {pet.breed} • {pet.gender}</p>
                <div className="flex items-center gap-2 text-sm text-text-muted mt-2 pt-3 border-t border-outline/10">
                  <MapPin size={16} className="text-primary" />
                  <span className="truncate">{pet.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPets.length === 0 && (
          <div className="text-center py-20 bg-surface rounded-3xl border border-dashed border-outline/30">
            <p className="text-text-variant font-medium">No se encontraron mascotas que coincidan con tu búsqueda.</p>
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <button className="border border-outline/30 text-text-variant px-8 py-3 rounded-xl font-medium hover:bg-surface-high transition-colors">
            Cargar más mascotas
          </button>
        </div>
      </div>
    </div>
  );
};

