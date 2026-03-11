'use client';

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
  const availableStates = Array.from(
    new Set(races.map(race => race.estado).filter(Boolean))
  ).sort();

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

  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <div className="bg-black/25 backdrop-blur-md rounded-2xl p-6 border border-white/10">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-sportex-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Explore Corridas por Estado
          </h2>

          {/* Indicador de localização */}
          {userLocation && !userLocation.isLoading && userLocation.estado && (
            <div className="flex items-center gap-1.5 text-xs text-sportex-muted">
              <svg className="w-3.5 h-3.5 text-sportex-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Detectado: {stateNames[userLocation.estado] || userLocation.estado}</span>
            </div>
          )}
        </div>

        {/* Filtros rápidos */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <button
            onClick={() => onStateSelect(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              selectedState === null
                ? 'bg-sportex-orange text-white'
                    : 'bg-black/20 text-sportex-muted border border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            Todas as Corridas
          </button>

          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold bg-sportex-bg text-sportex-muted border border-white/10`}>
            {currentYear}
          </span>
        </div>

        {/* Grid de estados */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-2">
          {availableStates.map((state) => {
            const raceCount = getRaceCountByState(state);
            const isUserState = userLocation?.estado === state;
            const isSelected = selectedState === state;

            return (
              <button
                key={state}
                onClick={() => onStateSelect(isSelected ? null : state)}
                className={`relative px-2 py-3 rounded-xl text-center transition-all duration-200 border ${
                  isSelected
                    ? 'bg-sportex-orange border-sportex-orange text-white shadow-md shadow-sportex-orange/20'
                    : 'bg-black/20 border-white/10 text-sportex-muted hover:border-white/30 hover:text-white'
                }`}
              >
                {/* Dot indicador de estado do usuário */}
                {isUserState && !isSelected && (
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-sportex-orange rounded-full border border-sportex-section"></div>
                )}

                <div className="text-xs font-bold leading-none mb-1">{state}</div>
                <div className="text-xs opacity-70 leading-none mb-1.5 hidden sm:block truncate px-1">
                  {stateNames[state] || state}
                </div>
                <div className={`text-xs font-bold px-1.5 py-0.5 rounded-full inline-block ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-sportex-muted'
                }`}>
                  {raceCount}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
