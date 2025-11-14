
import React, { useState, useCallback } from 'react';
import { View } from './types';
import HomeView from './views/HomeView';
import RightsView from './views/RightsView';
import DigitalCardView from './views/DigitalCardView';
import SimulatorView from './views/SimulatorView';
import LegalLibraryView from './views/LegalLibraryView';
import EmergencyView from './views/EmergencyView';
import BottomNav from './components/BottomNav';
import { ShieldCheckIcon } from './components/Icons';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isEmergencyActive, setEmergencyActive] = useState(false);

  const handleEmergencyStart = useCallback(() => {
    setEmergencyActive(true);
  }, []);

  const handleEmergencyStop = useCallback(() => {
    setEmergencyActive(false);
    setCurrentView('home');
  }, []);

  const renderView = () => {
    if (isEmergencyActive) {
      return <EmergencyView onStop={handleEmergencyStop} />;
    }
    switch (currentView) {
      case 'rights':
        return <RightsView />;
      case 'card':
        return <DigitalCardView />;
      case 'simulator':
        return <SimulatorView />;
      case 'library':
        return <LegalLibraryView />;
      case 'home':
      default:
        return <HomeView setView={setCurrentView} />;
    }
  };
  
  const getHeaderTitle = () => {
     if (isEmergencyActive) return "MODO EMERGENCIA ACTIVADO";
     switch (currentView) {
        case 'home': return "Constitución en Mano";
        case 'rights': return "Tus Derechos";
        case 'card': return "Tarjeta de Derechos";
        case 'simulator': return "Simulador de Interacción";
        case 'library': return "Biblioteca Legal";
        default: return "Constitución en Mano";
     }
  }

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-gray-900 text-gray-100">
      <header className="bg-gray-800 p-4 shadow-lg flex items-center justify-center sticky top-0 z-10">
         <ShieldCheckIcon className="h-8 w-8 text-blue-400 mr-3" />
        <h1 className={`text-xl font-bold ${isEmergencyActive ? 'text-red-500 animate-pulse' : 'text-white'}`}>
          {getHeaderTitle()}
        </h1>
      </header>

      <main className="flex-grow overflow-y-auto p-4 pb-24">
        {renderView()}
      </main>
      
      {!isEmergencyActive && (
         <BottomNav
            currentView={currentView}
            setView={setCurrentView}
            onEmergencyClick={handleEmergencyStart}
          />
      )}
    </div>
  );
}
