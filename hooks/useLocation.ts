'use client';

import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  estado: string | null;
  cidade: string | null;
  error: string | null;
  isLoading: boolean;
}

// Mapeamento de coordenadas aproximadas para estados brasileiros
const ESTADO_COORDINATES: Record<string, { lat: [number, number], lng: [number, number] }> = {
  'AC': { lat: [-11.0, -7.0], lng: [-73.0, -66.0] },
  'AL': { lat: [-10.0, -8.0], lng: [-38.0, -35.0] },
  'AP': { lat: [0.0, 4.0], lng: [-54.0, -49.0] },
  'AM': { lat: [-15.0, 2.0], lng: [-74.0, -56.0] },
  'BA': { lat: [-18.0, -8.0], lng: [-46.0, -34.0] },
  'CE': { lat: [-7.0, -2.0], lng: [-41.0, -35.0] },
  'DF': { lat: [-16.0, -15.0], lng: [-48.0, -47.0] },
  'ES': { lat: [-21.0, -17.0], lng: [-41.0, -39.0] },
  'GO': { lat: [-19.0, -13.0], lng: [-51.0, -46.0] },
  'MA': { lat: [-7.0, -1.0], lng: [-48.0, -41.0] },
  'MT': { lat: [-18.0, -7.0], lng: [-61.0, -50.0] },
  'MS': { lat: [-24.0, -17.0], lng: [-58.0, -50.0] },
  'MG': { lat: [-23.0, -14.0], lng: [-51.0, -39.0] },
  'PA': { lat: [-8.0, 2.0], lng: [-58.0, -46.0] },
  'PB': { lat: [-8.0, -6.0], lng: [-38.0, -34.0] },
  'PR': { lat: [-26.0, -22.0], lng: [-54.0, -48.0] },
  'PE': { lat: [-10.0, -7.0], lng: [-41.0, -34.0] },
  'PI': { lat: [-11.0, -4.0], lng: [-45.0, -40.0] },
  'RJ': { lat: [-23.0, -20.0], lng: [-45.0, -40.0] },
  'RN': { lat: [-6.0, -4.0], lng: [-38.0, -35.0] },
  'RS': { lat: [-34.0, -27.0], lng: [-58.0, -49.0] },
  'RO': { lat: [-15.0, -7.0], lng: [-67.0, -59.0] },
  'RR': { lat: [0.0, 6.0], lng: [-65.0, -59.0] },
  'SC': { lat: [-29.0, -25.0], lng: [-54.0, -48.0] },
  'SP': { lat: [-25.0, -20.0], lng: [-53.0, -44.0] },
  'SE': { lat: [-11.0, -9.0], lng: [-38.0, -36.0] },
  'TO': { lat: [-13.0, -5.0], lng: [-49.0, -42.0] },
};

function getEstadoFromCoordinates(lat: number, lng: number): string | null {
  for (const [estado, coords] of Object.entries(ESTADO_COORDINATES)) {
    if (
      lat >= coords.lat[0] && lat <= coords.lat[1] &&
      lng >= coords.lng[0] && lng <= coords.lng[1]
    ) {
      return estado;
    }
  }
  return null;
}

export function useLocation() {
  const [locationData, setLocationData] = useState<LocationData>({
    latitude: null,
    longitude: null,
    estado: null,
    cidade: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationData(prev => ({
        ...prev,
        error: 'Geolocalização não é suportada por este navegador',
        isLoading: false,
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const estado = getEstadoFromCoordinates(latitude, longitude);
        
        // Tentar obter nome da cidade usando reverse geocoding
        let cidade = null;
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`
          );
          const data = await response.json();
          cidade = data.city || data.locality || null;
        } catch (error) {
          console.warn('Erro ao obter cidade:', error);
        }

        setLocationData({
          latitude,
          longitude,
          estado,
          cidade,
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage = 'Erro ao obter localização';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permissão de localização negada';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Localização indisponível';
            break;
          case error.TIMEOUT:
            errorMessage = 'Timeout ao obter localização';
            break;
        }

        setLocationData(prev => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutos
      }
    );
  }, []);

  return locationData;
}
