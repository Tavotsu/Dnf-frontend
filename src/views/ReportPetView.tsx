import React, { useState } from 'react';
import { Camera, MapPin, Calendar, Clock, FileText, AlertCircle, Info } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom Marker for the last seen location
const lastSeenIcon = L.divIcon({
  className: 'custom-leaflet-icon',
  html: `<div class="w-8 h-8 bg-error rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const LocationMarker = ({ position, setPosition }: { position: [number, number], setPosition: (p: [number, number]) => void }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} icon={lastSeenIcon} /> : null;
};

export const ReportPetView = ({ isLoggedIn, navigate }: { isLoggedIn: boolean, navigate: (v: string) => void }) => {
  const [position, setPosition] = useState<[number, number]>([-41.4693, -72.9424]);
  
  if (!isLoggedIn) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface-low p-6">
        <div className="bg-surface max-w-md w-full p-8 rounded-2xl shadow-sm text-center border border-outline/10">
          <AlertCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-text mb-2">Inicia sesión para reportar</h2>
          <p className="text-text-variant mb-6">Necesitas una cuenta para poder publicar el reporte de una mascota perdida y recibir notificaciones.</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => navigate('login')} className="bg-primary text-surface px-6 py-2 rounded-xl font-bold hover:opacity-90 transition-opacity">
              Iniciar Sesión
            </button>
            <button onClick={() => navigate('register')} className="border border-primary text-primary px-6 py-2 rounded-xl font-bold hover:bg-primary/10 transition-colors">
              Registrarse
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-surface-low py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-text mb-4">Reportar Mascota Perdida</h1>
          <p className="text-text-variant text-lg">Proporciona la mayor cantidad de detalles posible para ayudar a la comunidad a encontrarla.</p>
        </div>

        <form className="bg-surface rounded-3xl p-8 md:p-10 shadow-sm border border-outline/10 space-y-8" onSubmit={(e) => { e.preventDefault(); navigate('profile'); }}>
          {/* Photos */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-text flex items-center gap-2 border-b border-outline/20 pb-2">
              <Camera className="text-primary" /> Fotos de la mascota
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-square rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 flex flex-col items-center justify-center text-primary cursor-pointer hover:bg-primary/10 transition-colors">
                <Camera size={32} className="mb-2" />
                <span className="text-sm font-medium">Añadir foto</span>
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square rounded-2xl border border-outline/20 bg-surface-high flex items-center justify-center text-text-muted">
                  <span className="text-xs">Opcional</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted">Sube fotos claras y recientes. Una buena foto aumenta las posibilidades de encontrarla.</p>
          </section>

          {/* Basic Info */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-text flex items-center gap-2 border-b border-outline/20 pb-2">
              <FileText className="text-primary" /> Información Básica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Nombre de la mascota</label>
                <input type="text" required className="w-full px-4 py-3 bg-background border border-outline/30 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-shadow" placeholder="Ej. Max" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Tipo de mascota</label>
                <select required className="w-full px-4 py-3 bg-background border border-outline/30 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-shadow appearance-none">
                  <option value="">Selecciona un tipo</option>
                  <option value="dog">Perro</option>
                  <option value="cat">Gato</option>
                  <option value="bird">Ave</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Raza (Opcional)</label>
                <input type="text" className="w-full px-4 py-3 bg-background border border-outline/30 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-shadow" placeholder="Ej. Beagle" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Color principal</label>
                <input type="text" required className="w-full px-4 py-3 bg-background border border-outline/30 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-shadow" placeholder="Ej. Blanco con manchas marrones" />
              </div>
            </div>
          </section>

          {/* Location & Time */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-text flex items-center gap-2 border-b border-outline/20 pb-2">
              <MapPin className="text-primary" /> Dónde y Cuándo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-text">Referencia de ubicación</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input type="text" required className="w-full pl-10 pr-4 py-3 bg-background border border-outline/30 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-shadow" placeholder="Ej. Parque Central, cerca de la fuente" />
                </div>
              </div>

              {/* Mini Map Picker */}
              <div className="md:col-span-2 space-y-3">
                <label className="text-sm font-medium text-text flex items-center gap-2">
                  Selecciona la ubicación exacta en el mapa <Info size={14} className="text-text-muted" />
                </label>
                <div className="h-64 rounded-2xl overflow-hidden border border-outline/20 shadow-inner relative">
                  <MapContainer 
                    center={position} 
                    zoom={15} 
                    scrollWheelZoom={false}
                    className="w-full h-full z-0"
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationMarker position={position} setPosition={setPosition} />
                  </MapContainer>
                  <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-bold text-text-variant shadow-sm z-[500] border border-outline/10">
                    LAT: {position[0].toFixed(4)} | LON: {position[1].toFixed(4)}
                  </div>
                </div>
                <p className="text-xs text-text-muted">Haz clic en el mapa para mover el pin al lugar exacto del extravío.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Fecha de extravío</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input type="date" required className="w-full pl-10 pr-4 py-3 bg-background border border-outline/30 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-shadow" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Hora aproximada</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input type="time" className="w-full pl-10 pr-4 py-3 bg-background border border-outline/30 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-shadow" />
                </div>
              </div>
            </div>
          </section>

          {/* Additional Details */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-text flex items-center gap-2 border-b border-outline/20 pb-2">
              <AlertCircle className="text-primary" /> Detalles Adicionales
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Características distintivas o médicas</label>
                <textarea rows={3} className="w-full px-4 py-3 bg-background border border-outline/30 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-shadow resize-none" placeholder="Ej. Tiene un collar rojo, cojea de la pata trasera derecha, necesita medicación..."></textarea>
              </div>
            </div>
          </section>

          <div className="pt-6 border-t border-outline/20 flex justify-end gap-4">
            <button type="button" onClick={() => navigate('home')} className="px-6 py-3 rounded-xl font-bold text-text-variant hover:bg-surface-high transition-colors">
              Cancelar
            </button>
            <button type="submit" className="bg-primary text-surface px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-md shadow-primary/20">
              Publicar Reporte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
