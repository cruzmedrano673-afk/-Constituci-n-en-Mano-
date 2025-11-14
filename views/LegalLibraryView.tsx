
import React from 'react';
import { LEGAL_LIBRARY_RESOURCES } from '../constants';

const getIconForType = (type: string) => {
    switch(type) {
        case 'Jurisprudencia': return '⚖️';
        case 'Caso Documentado': return '📰';
        case 'Procedimiento de Denuncia': return '✍️';
        default: return '📚';
    }
}

export default function LegalLibraryView() {
  return (
    <div className="space-y-6 animate-fade-in">
        <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="font-bold text-lg mb-2 text-gray-200">Biblioteca Legal</h2>
            <p className="text-gray-400">Recursos adicionales para profundizar en tus derechos y conocer los procedimientos para defenderlos.</p>
        </div>

        {LEGAL_LIBRARY_RESOURCES.map((resource, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-300 text-lg">
                   <span className="mr-2">{getIconForType(resource.type)}</span> {resource.title}
                </h3>
                <p className="text-gray-300 mt-2">{resource.content}</p>
            </div>
        ))}
    </div>
  );
}
