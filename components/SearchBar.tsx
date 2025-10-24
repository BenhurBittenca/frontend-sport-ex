'use client';

export interface FilterValues {
  cidade: string;
  nome: string;
  data: string;
  distancia: string;
  estado: string;
}

interface SearchBarProps {
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
}

export default function SearchBar({ filters, onFilterChange }: SearchBarProps) {
  const handleChange = (field: keyof FilterValues, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const clearAll = () => {
    onFilterChange({ cidade: '', nome: '', data: '', distancia: '', estado: '' });
  };

  const hasFilters = Object.values(filters).some(v => v !== '');

  return (
    <div className="w-full max-w-6xl mx-auto mb-12 animate-fadeIn">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtrar Corridas
          </h2>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-sm text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Limpar Filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Filtro: Cidade */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📍 Cidade
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.cidade}
                onChange={(e) => handleChange('cidade', e.target.value)}
                placeholder="Ex: São Paulo"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
              />
              {filters.cidade && (
                <button
                  onClick={() => handleChange('cidade', '')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filtro: Nome da Corrida */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🏃 Nome da Corrida
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
                placeholder="Ex: Maratona"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
              />
              {filters.nome && (
                <button
                  onClick={() => handleChange('nome', '')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filtro: Data */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📅 Data
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.data}
                onChange={(e) => handleChange('data', e.target.value)}
                placeholder="Ex: 2024"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
              />
              {filters.data && (
                <button
                  onClick={() => handleChange('data', '')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filtro: Distância */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📏 Distância
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.distancia}
                onChange={(e) => handleChange('distancia', e.target.value)}
                placeholder="Ex: 10k, 21k"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
              />
              {filters.distancia && (
                <button
                  onClick={() => handleChange('distancia', '')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filtro: Estado */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🗺️ Estado
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.estado}
                onChange={(e) => handleChange('estado', e.target.value)}
                placeholder="Ex: SP, RJ, MG"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
              />
              {filters.estado && (
                <button
                  onClick={() => handleChange('estado', '')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


