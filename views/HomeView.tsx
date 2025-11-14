
import React from 'react';
import { View } from '../types';
import { QUICK_LEGAL_FACTS } from '../constants';
import { BookOpenIcon, Square3Stack3DIcon, ChatBubbleLeftRightIcon, ShieldCheckIcon } from '../components/Icons';

interface HomeViewProps {
  setView: (view: View) => void;
}

const QuickAccessButton: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ title, description, icon, onClick }) => (
  <button
    onClick={onClick}
    className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4 w-full text-left hover:bg-gray-700 transition-colors duration-200"
  >
    <div className="bg-blue-500 p-3 rounded-full">{icon}</div>
    <div>
      <h3 className="font-bold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  </button>
);


export default function HomeView({ setView }: HomeViewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-blue-900/50 border border-blue-700 text-center p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-blue-300 mb-2">Conoce tus derechos, defiéndelos con la ley.</h2>
        <p className="text-blue-200">
          Esta herramienta te ayuda a entender y ejercer tus derechos constitucionales frente a la autoridad.
        </p>
      </div>

      <div className="space-y-4">
         <h3 className="text-lg font-semibold text-gray-300">Acceso Rápido</h3>
         <QuickAccessButton 
            title="Tus Derechos"
            description="Consulta los artículos clave de la constitución."
            icon={<BookOpenIcon className="w-6 h-6 text-white" />}
            onClick={() => setView('rights')}
         />
         <QuickAccessButton 
            title="Tarjeta Digital"
            description="Muestra tus derechos de forma clara y directa."
            icon={<Square3Stack3DIcon className="w-6 h-6 text-white" />}
            onClick={() => setView('card')}
         />
         <QuickAccessButton 
            title="Simulador de Interacción"
            description="Practica tus respuestas con un asistente de IA."
            icon={<ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />}
            onClick={() => setView('simulator')}
         />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-300">Datos Clave</h3>
        {QUICK_LEGAL_FACTS.map((fact, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-bold text-blue-400">{fact.title}</h4>
            <p className="text-gray-300 mt-1">{fact.content}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700 pt-6 mt-6">
         <div className="bg-gray-800 text-center p-4 rounded-lg italic">
            <ShieldCheckIcon className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <p className="text-yellow-200">
                “Usted juró proteger la Constitución, y la Constitución no le autoriza a detenerme sin motivo legal.”
            </p>
        </div>
      </div>
    </div>
  );
}
