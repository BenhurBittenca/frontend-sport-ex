'use client';

import { useState } from 'react';

interface StateTabsProps {
  races: any[];
  selectedState: string | null;
  onStateSelect: (state: string | null) => void;
  userLocation?: {
    estado: string | null;
    isLoading: boolean;
    error: string | null;
  };
}

export default function StateTabs({ races, selectedState, onStateSelect, userLocation }: StateTabsProps) {
  // Extrair estados únicos das corridas
  const availableStates = Array.from(
    new Set(races.map(race => race.estado).filter(Boolean))
  ).sort();

  // Estados brasileiros com nomes completos
  const stateNames: Record<string, string> = {
    'AC': 'Acre',
    'AL': 'Alagoas',
    'AP': 'Amapá',
    'AM': 'Amazonas',
    'BA': 'Bahia',
    'CE': 'Ceará',
    'DF': 'Distrito Federal',
    'ES': 'Espírito Santo',
    'GO': 'Goiás',
    'MA': 'Maranhão',
    'MT': 'Mato Grosso',
    'MS': 'Mato Grosso do Sul',
    'MG': 'Minas Gerais',
    'PA': 'Pará',
    'PB': 'Paraíba',
    'PR': 'Paraná',
    'PE': 'Pernambuco',
    'PI': 'Piauí',
    'RJ': 'Rio de Janeiro',
    'RN': 'Rio Grande do Norte',
    'RS': 'Rio Grande do Sul',
    'RO': 'Rondônia',
    'RR': 'Roraima',
    'SC': 'Santa Catarina',
    'SP': 'São Paulo',
    'SE': 'Sergipe',
    'TO': 'Tocantins',
  };

  const getRaceCountByState = (state: string) => {
    return races.filter(race => race.estado === state).length;
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            🏃‍♂️ Explore Corridas por Estado
          </h2>
          
          {/* Indicador de localização */}
          {userLocation && (
            <div className="flex items-center gap-2">
              {userLocation.isLoading ? (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                  Detectando localização...
                </div>
              ) : userLocation.error ? (
                <div className="flex items-center gap-2 text-sm text-orange-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Localização indisponível
                </div>
              ) : userLocation.estado ? (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Detectado: {stateNames[userLocation.estado] || userLocation.estado}
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Aba "Todos" */}
        <div className="mb-4">
          <button
            onClick={() => onStateSelect(null)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
              selectedState === null
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            🏆 Todas as Corridas
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">
              {races.length}
            </span>
          </button>
        </div>

        {/* Abas dos Estados */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
          {availableStates.map((state) => {
            const raceCount = getRaceCountByState(state);
            const isUserState = userLocation?.estado === state;
            const isSelected = selectedState === state;
            
            return (
              <button
                key={state}
                onClick={() => onStateSelect(state)}
                className={`relative px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex flex-col items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : isUserState
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {/* Indicador de estado do usuário */}
                {isUserState && !isSelected && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                )}
                
                <div className="text-sm font-bold">{state}</div>
                <div className="text-xs opacity-80">
                  {stateNames[state] || state}
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                  isSelected || isUserState 
                    ? 'bg-white/20' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {raceCount} corrida{raceCount !== 1 ? 's' : ''}
                </div>
              </button>
            );
          })}
        </div>

        {/* Estado selecionado destacado */}
        {selectedState && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {selectedState}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">
                  {stateNames[selectedState] || selectedState}
                </h3>
                <p className="text-sm text-gray-600">
                  {getRaceCountByState(selectedState)} corrida{getRaceCountByState(selectedState) !== 1 ? 's' : ''} encontrada{getRaceCountByState(selectedState) !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={() => onStateSelect(null)}
                className="ml-auto text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
