import React, { useState } from 'react';
import { Mail, Edit3, List, CheckCircle, Settings, LogOut, Camera, HeartHandshake } from 'lucide-react';
import { IMAGES } from '../constants';

export const UserProfileView = ({ navigate, setIsLoggedIn }: { navigate: (v: string) => void, setIsLoggedIn: (v: boolean) => void }) => {
  const [activeTab, setActiveTab] = useState('reports');

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('home');
  };

  return (
    <div className="flex-1 bg-surface-low py-8 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Profile */}
        <div className="bg-surface rounded-2xl p-6 md:p-8 shadow-sm border border-outline/10 flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold shrink-0">
            JP
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-serif font-bold text-text">Juan Pérez</h1>
            <p className="text-text-variant flex items-center justify-center md:justify-start gap-2 mt-1">
              <Mail size={16} /> juan.perez@ejemplo.com
            </p>
            <p className="text-sm text-text-muted mt-2">Miembro desde Marzo 2024</p>
          </div>
          <button className="flex items-center gap-2 border border-outline/30 px-4 py-2 rounded-xl text-sm font-medium hover:bg-surface-high transition-colors">
            <Edit3 size={16} /> Editar Perfil
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-2">
            <button onClick={() => setActiveTab('reports')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'reports' ? 'bg-primary/10 text-primary' : 'text-text-variant hover:bg-surface-high'}`}>
              <List size={18} /> Mis Reportes
            </button>
            <button onClick={() => setActiveTab('found')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'found' ? 'bg-primary/10 text-primary' : 'text-text-variant hover:bg-surface-high'}`}>
              <CheckCircle size={18} /> Encontradas
            </button>
            <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'text-text-variant hover:bg-surface-high'}`}>
              <Settings size={18} /> Configuración
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-error hover:bg-error/10 transition-colors mt-4">
              <LogOut size={18} /> Cerrar Sesión
            </button>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === 'reports' && (
              <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline/10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-serif font-bold text-text">Mis Reportes Activos</h2>
                  <button onClick={() => navigate('report')} className="text-sm font-medium text-primary hover:underline">
                    + Nuevo Reporte
                  </button>
                </div>
                {/* Mock list of reports */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border border-outline/20 rounded-xl hover:border-primary/30 transition-colors cursor-pointer" onClick={() => navigate('detail')}>
                    <div className="w-16 h-16 rounded-lg bg-surface-high overflow-hidden shrink-0">
                      <img src={IMAGES.petMax} alt="Max" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-text">Max</h3>
                      <p className="text-sm text-text-variant">Perro - Beagle • Perdido hace 2 días</p>
                    </div>
                    <div className="px-3 py-1 bg-error/10 text-error rounded-full text-xs font-bold">
                      Buscando
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 border border-outline/20 rounded-xl hover:border-primary/30 transition-colors cursor-pointer">
                    <div className="w-16 h-16 rounded-lg bg-surface-high overflow-hidden shrink-0 flex items-center justify-center text-text-muted">
                      <Camera size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-text">Luna</h3>
                      <p className="text-sm text-text-variant">Gato - Siames • Perdida hace 1 semana</p>
                    </div>
                    <div className="px-3 py-1 bg-error/10 text-error rounded-full text-xs font-bold">
                      Buscando
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'found' && (
              <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline/10">
                <h2 className="text-xl font-serif font-bold text-text mb-6">Mascotas Encontradas</h2>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <HeartHandshake size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2">Aún no has marcado mascotas como encontradas</h3>
                  <p className="text-text-variant text-sm max-w-md mx-auto">Cuando una de tus mascotas reportadas regrese a casa, podrás marcarla como encontrada y aparecerá aquí.</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline/10">
                <h2 className="text-xl font-serif font-bold text-text mb-6">Configuración de la Cuenta</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-text mb-3">Notificaciones</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded border-outline/30 focus:ring-primary" />
                        <span className="text-sm text-text-variant">Recibir alertas de mascotas perdidas cerca de mi ubicación</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded border-outline/30 focus:ring-primary" />
                        <span className="text-sm text-text-variant">Notificarme cuando alguien comente en mis reportes</span>
                      </label>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-outline/10">
                    <h3 className="text-sm font-bold text-error mb-3">Zona de Peligro</h3>
                    <button className="text-sm font-medium text-error border border-error/30 px-4 py-2 rounded-xl hover:bg-error/10 transition-colors">
                      Eliminar Cuenta
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
