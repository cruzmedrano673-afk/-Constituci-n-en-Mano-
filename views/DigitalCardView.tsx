
import React from 'react';

const RightsBlock: React.FC<{ color: string; text: string }> = ({ color, text }) => (
  <div className={`p-6 rounded-lg w-full flex items-center justify-center text-center shadow-lg ${color}`}>
    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">{text}</h2>
  </div>
);

export default function DigitalCardView() {
  return (
    <div className="flex flex-col h-full items-center justify-center space-y-4 animate-fade-in p-4">
      <RightsBlock color="bg-red-600" text="NO CONSIENTO INSPECCIONES" />
      <RightsBlock color="bg-blue-600" text="NO RESPONDO PREGUNTAS SIN UN ABOGADO" />
      <RightsBlock color="bg-yellow-600" text="LA PREVENCIÓN DEL DELITO NO JUSTIFICA SU DETENCIÓN" />
      <RightsBlock color="bg-green-600" text="USTED ESTÁ OBLIGADO A IDENTIFICARSE Y RESPETAR MIS DERECHOS" />
    </div>
  );
}
