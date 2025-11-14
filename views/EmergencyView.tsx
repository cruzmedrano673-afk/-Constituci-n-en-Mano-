
import React, { useEffect, useRef } from 'react';
import { useEmergency } from '../hooks/useEmergency';

interface EmergencyViewProps {
  onStop: () => void;
}

export default function EmergencyView({ onStop }: EmergencyViewProps) {
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const { isRecording, location, error, startEmergency, stopEmergency, permissionStatus } = useEmergency(onStop);

  useEffect(() => {
    if (permissionStatus !== 'denied') {
        startEmergency(videoPreviewRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionStatus]);


  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col p-4 text-white">
      <div className="w-full max-w-lg mx-auto flex flex-col h-full">
        <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-red-500 animate-pulse">MODO EMERGENCIA ACTIVO</h2>
            <p className="text-gray-300">Grabando audio, video y ubicación.</p>
        </div>

        <div className="relative w-full aspect-w-3 aspect-h-4 bg-black rounded-lg overflow-hidden flex-grow my-4">
          <video ref={videoPreviewRef} autoPlay muted className="object-cover w-full h-full"></video>
          <div className="absolute top-2 left-2 flex items-center bg-red-600 text-white px-2 py-1 rounded-md text-sm animate-pulse">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            REC
          </div>
        </div>
        
        {error && (
          <div className="bg-red-800 border border-red-600 text-red-200 p-3 rounded-lg mb-4 text-center">
            <p className="font-bold">Error de Permisos</p>
            <p>{error}</p>
          </div>
        )}
        
        <div className="bg-gray-800 p-3 rounded-lg mb-4 text-sm">
            <h3 className="font-bold text-gray-300 mb-1">Ubicación Actual:</h3>
            {location ? (
                <p className="text-green-400 font-mono">
                    Lat: {location.coords.latitude.toFixed(5)}, Lon: {location.coords.longitude.toFixed(5)}
                </p>
            ) : (
                <p className="text-yellow-400">Obteniendo ubicación...</p>
            )}
        </div>

        <button 
            onClick={stopEmergency} 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-lg transition-colors text-lg"
        >
            DETENER Y GUARDAR EVIDENCIA
        </button>
      </div>
    </div>
  );
}
