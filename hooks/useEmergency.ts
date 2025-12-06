
// Fix: Import React to resolve the "Cannot find namespace 'React'" error.
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { EMERGENCY_SPEECH_TEXT } from '../constants';

export const useEmergency = (onStop: () => void) => {
  const [isRecording, setIsRecording] = useState(false);
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const locationWatcherIdRef = useRef<number | null>(null);

  const requestPermissions = useCallback(async () => {
    try {
      // Check permissions silently first
      const micPermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      const camPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
      const geoPermission = await navigator.permissions.query({ name: 'geolocation' as PermissionName });

      if (micPermission.state === 'denied' || camPermission.state === 'denied' || geoPermission.state === 'denied') {
        setError("Los permisos fueron denegados. Por favor, habilítalos en la configuración de tu navegador para usar el modo de emergencia.");
        setPermissionStatus('denied');
        return false;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setPermissionStatus('granted');
      return stream;
    } catch (err) {
      setError("Se necesitan permisos de cámara, micrófono y ubicación para el modo de emergencia.");
      setPermissionStatus('denied');
      console.error("Permission error:", err);
      return null;
    }
  }, []);

  const startEmergency = useCallback(async (previewRef: React.RefObject<HTMLVideoElement>) => {
    videoRef.current = previewRef.current;
    const stream = await requestPermissions();
    if (!stream) {
      return;
    }
    
    // Play audio message
    const utterance = new SpeechSynthesisUtterance(EMERGENCY_SPEECH_TEXT);
    utterance.lang = 'es-MX';
    speechSynthesis.speak(utterance);
    
    // Start Geolocation
    locationWatcherIdRef.current = navigator.geolocation.watchPosition(
      (pos) => setLocation(pos),
      (err) => console.warn(`Geolocation Error(${err.code}): ${err.message}`),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
    
    // Start Recording
    recordedChunksRef.current = [];
    try {
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (e) {
      console.error("MediaRecorder error:", e);
      setError("No se pudo iniciar la grabación. Tu navegador podría no ser compatible.");
    }
  }, [requestPermissions]);
  
  const stopEmergency = useCallback(() => {
    // Stop recording
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    // Stop camera/mic stream
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    // Stop Geolocation watcher
    if (locationWatcherIdRef.current !== null) {
      navigator.geolocation.clearWatch(locationWatcherIdRef.current);
    }
    
    setIsRecording(false);

    // Save files
    if (recordedChunksRef.current.length > 0) {
      const videoBlob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      const videoUrl = URL.createObjectURL(videoBlob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = videoUrl;
      a.download = `emergencia_${new Date().toISOString()}.webm`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(videoUrl);
      
      if (location) {
         const locationData = `Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}, Accuracy: ${location.coords.accuracy}m, Timestamp: ${new Date(location.timestamp).toISOString()}`;
         const locationBlob = new Blob([locationData], { type: 'text/plain' });
         const locationUrl = URL.createObjectURL(locationBlob);
         const aLoc = document.createElement('a');
         aLoc.style.display = 'none';
         aLoc.href = locationUrl;
         aLoc.download = `ubicacion_${new Date().toISOString()}.txt`;
         document.body.appendChild(aLoc);
         aLoc.click();
         window.URL.revokeObjectURL(locationUrl);
      }
    }
    
    onStop();
  }, [location, onStop]);
  
  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (isRecording) {
        stopEmergency();
      }
    };
  }, [isRecording, stopEmergency]);
  
  return { isRecording, location, error, startEmergency, stopEmergency, permissionStatus };
};