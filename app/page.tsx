'use client';

import { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import RaceCard from '@/components/RaceCard';
import SearchBar, { FilterValues } from '@/components/SearchBar';
import StateTabs from '@/components/StateTabs';
import ModalidadeTabs from '@/components/ModalidadeTabs';
import BackgroundSlider from '@/components/BackgroundSlider';
import { useLocation } from '@/hooks/useLocation';
import { Race, Modalidade } from '@/types/race';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [filters, setFilters] = useState<FilterValues>({
    cidade: '',
    nome: '',
    data: '',
    distancia: '',
    estado: '',
  });
  
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedModalidade, setSelectedModalidade] = useState<Modalidade>('corrida');
  
  // Buscar dados da API com modalidade selecionada
  const { data: races, error, isLoading } = useSWR<Race[]>(
    `/api/races?modalidade=${selectedModalidade}`,
    fetcher
  );
  const locationData = useLocation();

  // Auto-selecionar estado do usuário quando disponível
  useEffect(() => {
    if (locationData.estado && !selectedState && !filters.estado) {
      setSelectedState(locationData.estado);
      setFilters(prev => ({ ...prev, estado: locationData.estado || '' }));
    }
  }, [locationData.estado, selectedState, filters.estado]);

  const filteredRaces = useMemo(() => {
    if (!races) return [];
    
    return races.filter((race) => {
      const matchCidade = filters.cidade 
        ? race.cidade.toLowerCase().includes(filters.cidade.toLowerCase())
        : true;
      
      const matchNome = filters.nome
        ? race.nomeDaCorrida.toLowerCase().includes(filters.nome.toLowerCase())
        : true;
      
      const matchData = filters.data
        ? race.data.toLowerCase().includes(filters.data.toLowerCase())
        : true;
      
      const matchDistancia = filters.distancia
        ? race.distancia.toLowerCase().includes(filters.distancia.toLowerCase())
        : true;
      
      const matchEstado = filters.estado
        ? race.estado.toLowerCase().includes(filters.estado.toLowerCase())
        : true;
      
      return matchCidade && matchNome && matchData && matchDistancia && matchEstado;
    });
  }, [races, filters]);

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  // Função para lidar com seleção de estado
  const handleStateSelect = (state: string | null) => {
    setSelectedState(state);
    setFilters(prev => ({ ...prev, estado: state || '' }));
  };

  return (
    <main className="min-h-screen relative">
      {/* Background com imagens animadas */}
      <BackgroundSlider />

      {/* Hero Section */}
      <header className="relative z-20 pt-16 pb-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center animate-fadeInDown">
            {/* Logo SportEx */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-teal-500 blur-3xl opacity-60 animate-pulse-glow"></div>
                <div className="relative">
                  <img 
                    src="/images/sportex-logo.png" 
                    alt="SportEx Logo" 
                    className="w-48 h-32 object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Título */}
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl">
              <span className="bg-gradient-to-r from-orange-400 via-teal-400 to-orange-500 text-gradient bg-clip-text text-transparent">
                SportEx
              </span>
            </h1>
            
            {/* Subtítulo */}
            <p className="text-3xl md:text-4xl text-white font-black max-w-4xl mx-auto mb-6 drop-shadow-2xl">
              <span className="bg-gradient-to-r from-orange-300 via-teal-300 to-orange-400 text-gradient bg-clip-text text-transparent">
                Encontre sua próxima linha de chegada.
              </span>
            </p>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4 drop-shadow-lg font-semibold">
              Todas as provas, todas as modalidades, em um só lugar.
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto drop-shadow-lg">
              Descubra, planeje e viva o esporte com o SportEx
            </p>

            {/* Stats Badge */}
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <div className="bg-gradient-to-r from-orange-500/20 to-teal-500/20 backdrop-blur-lg border border-orange-300/30 rounded-full px-6 py-3">
                <span className="text-white/90 font-semibold">
                  ⚡ Atualizado em tempo real
                </span>
              </div>
              <div className="bg-gradient-to-r from-teal-500/20 to-orange-500/20 backdrop-blur-lg border border-teal-300/30 rounded-full px-6 py-3">
                <span className="text-white/90 font-semibold">
                  🏆 {races?.length || 0}+ eventos
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-20 container mx-auto max-w-7xl px-4 pb-20">
        {/* Modalidade Tabs - Seletor de Modalidades */}
        <ModalidadeTabs 
          selectedModalidade={selectedModalidade}
          onModalidadeSelect={setSelectedModalidade}
        />

        {/* State Tabs */}
        {!isLoading && !error && races && races.length > 0 && (
          <StateTabs 
            races={races} 
            selectedState={selectedState} 
            onStateSelect={handleStateSelect}
            userLocation={locationData}
          />
        )}

        {/* Search Bar com filtros separados */}
        <SearchBar filters={filters} onFilterChange={setFilters} />

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col justify-center items-center py-20 animate-fadeIn">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="mt-6 text-white text-lg font-semibold drop-shadow-lg">
              Carregando eventos incríveis...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/90 backdrop-blur-xl border border-red-300/30 rounded-2xl p-8 text-center shadow-2xl animate-fadeInUp">
            <svg
              className="w-16 h-16 text-white mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-white font-bold text-xl mb-2">Erro ao carregar eventos</p>
            <p className="text-white/90">
              Não foi possível carregar os dados. Tente novamente mais tarde.
            </p>
          </div>
        )}

        {/* Results Count */}
        {!isLoading && !error && races && (
          <div className="mb-8 text-center animate-fadeIn">
            <div className="inline-block bg-white/80 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-xl border border-white/30">
              {filteredRaces.length === 0 && hasActiveFilters ? (
                <p className="text-lg">
                  <span className="font-bold text-red-600">Nenhum evento encontrado</span>
                  <span className="text-gray-700"> com os filtros aplicados</span>
                </p>
              ) : (
                <p className="text-lg">
                  <span className="text-gray-700">Mostrando </span>
                  <span className="font-black text-3xl bg-gradient-to-r from-orange-600 to-teal-600 text-gradient bg-clip-text text-transparent">
                    {filteredRaces.length}
                  </span>
                  <span className="text-gray-700">
                    {' '}{filteredRaces.length === 1 ? 'evento' : 'eventos'}
                  </span>
                  {hasActiveFilters && (
                    <span className="text-gray-600 text-sm ml-2">
                      (filtrado de {races.length})
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Race Cards Grid */}
        {!isLoading && !error && filteredRaces.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRaces.map((race, index) => (
              <RaceCard key={index} race={race} index={index} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && races && races.length === 0 && (
          <div className="text-center py-20 animate-fadeInUp">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 max-w-lg mx-auto shadow-2xl border border-white/30">
              {selectedModalidade === 'corrida' ? (
                // Mensagem para corrida sem eventos
                <>
                  <svg
                    className="w-20 h-20 text-gray-400 mx-auto mb-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <p className="text-gray-800 text-xl font-bold">Nenhum evento cadastrado</p>
                  <p className="text-gray-600 mt-2">Volte em breve para novidades!</p>
                </>
              ) : (
                // Mensagem para modalidades ainda não configuradas
                <>
                  <div className="text-6xl mb-6">
                    {selectedModalidade === 'ciclismo' ? '🚴' : '🏊'}
                  </div>
                  <p className="text-gray-800 text-2xl font-bold mb-3">
                    {selectedModalidade === 'ciclismo' ? 'Ciclismo' : 'Triatlo'} em Breve!
                  </p>
                  <p className="text-gray-600 mb-4">
                    Estamos preparando eventos incríveis de {selectedModalidade === 'ciclismo' ? 'ciclismo' : 'triatlo'} para você.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left">
                    <p className="text-sm text-gray-700 font-medium mb-2">
                      💡 <strong>Para administradores:</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      1. Crie a aba <code className="bg-gray-200 px-2 py-1 rounded">eventos_{selectedModalidade}</code> na planilha<br />
                      2. Obtenha o GID da aba<br />
                      3. Configure <code className="bg-gray-200 px-2 py-1 rounded">{selectedModalidade.toUpperCase()}_GID</code> no .env.local<br />
                      4. Reinicie o servidor
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-20 bg-black/50 backdrop-blur-xl border-t border-white/10 text-white py-12 mt-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <img 
                  src="/images/sportex-logo.png" 
                  alt="SportEx Logo" 
                  className="w-24 h-16 object-contain drop-shadow-xl"
                />
              </div>
            </div>

            {/* Links sociais simulados */}
            <div className="flex justify-center gap-6 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                <span className="text-xl">📱</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                <span className="text-xl">💬</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                <span className="text-xl">📧</span>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-white/70 mb-2">
              © {new Date().getFullYear()} SportEx. Todos os direitos reservados.
            </p>
            <p className="text-white/50 text-sm">
              Desenvolvido com ❤️ para atletas apaixonados
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}


