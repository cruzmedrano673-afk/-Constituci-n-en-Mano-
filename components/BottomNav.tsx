
import React from 'react';
import { View } from '../types';
import { HomeIcon, BookOpenIcon, Square3Stack3DIcon, ChatBubbleLeftRightIcon, ShieldExclamationIcon } from './Icons';

interface BottomNavProps {
  currentView: View;
  setView: (view: View) => void;
  onEmergencyClick: () => void;
}

const NavButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

export default function BottomNav({ currentView, setView, onEmergencyClick }: BottomNavProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-gray-800 border-t border-gray-700 shadow-2xl">
      <div className="flex h-16">
        <NavButton label="Inicio" icon={<HomeIcon className="w-6 h-6" />} isActive={currentView === 'home'} onClick={() => setView('home')} />
        <NavButton label="Derechos" icon={<BookOpenIcon className="w-6 h-6" />} isActive={currentView === 'rights'} onClick={() => setView('rights')} />
        
        <div className="flex items-center justify-center w-1/4">
             <button
                onClick={onEmergencyClick}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 flex flex-col items-center justify-center transition-transform transform hover:scale-110 shadow-lg -mt-6 border-4 border-gray-800"
                aria-label="Activar modo emergencia"
            >
                <ShieldExclamationIcon className="w-7 h-7" />
                <span className="text-xs font-bold">S.O.S</span>
            </button>
        </div>
        
        <NavButton label="Tarjeta" icon={<Square3Stack3DIcon className="w-6 h-6" />} isActive={currentView === 'card'} onClick={() => setView('card')} />
        <NavButton label="Simulador" icon={<ChatBubbleLeftRightIcon className="w-6 h-6" />} isActive={currentView === 'simulator'} onClick={() => setView('simulator')} />
      </div>
    </footer>
  );
}
