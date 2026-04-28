import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { AuthView } from './views/AuthView';
import { UserProfileView } from './views/UserProfileView';
import { ReportPetView } from './views/ReportPetView';
import { LostPetsView } from './views/LostPetsView';
import { SuccessStoriesView } from './views/SuccessStoriesView';
import { PetDetailView } from './views/PetDetailView';

// Lazy load heavy components
const MapView = lazy(() => import('./views/MapView').then(module => ({ default: module.MapView })));

// Loading component for lazy views
const ViewLoader = () => (
  <div className="flex-1 flex flex-col items-center justify-center bg-surface-low p-10 min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
    <p className="text-text-variant font-medium animate-pulse">Cargando vista...</p>
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-text">
      <Navbar currentView={currentView} navigate={setCurrentView} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main className="flex-1 flex flex-col pt-16 md:pt-20">
        <Suspense fallback={<ViewLoader />}>
          {currentView === 'home' && <HomeView navigate={setCurrentView} />}
          {currentView === 'login' && <AuthView type="login" navigate={setCurrentView} setIsLoggedIn={setIsLoggedIn} />}
          {currentView === 'register' && <AuthView type="register" navigate={setCurrentView} setIsLoggedIn={setIsLoggedIn} />}
          {currentView === 'profile' && <UserProfileView navigate={setCurrentView} setIsLoggedIn={setIsLoggedIn} />}
          {currentView === 'report' && <ReportPetView navigate={setCurrentView} isLoggedIn={isLoggedIn} />}
          {currentView === 'lost-pets' && <LostPetsView navigate={setCurrentView} />}
          {currentView === 'success-stories' && <SuccessStoriesView />}
          {currentView === 'detail' && <PetDetailView navigate={setCurrentView} />}
          {currentView === 'map' && <MapView />}
        </Suspense>
      </main>
      {currentView !== 'map' && currentView !== 'login' && currentView !== 'register' && currentView !== 'profile' && <Footer />}
    </div>
  );
}
