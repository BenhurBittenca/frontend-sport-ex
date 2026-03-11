'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
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
  const hasAutoSelected = useRef(false);
  
  // Buscar dados da API com modalidade selecionada
  const { data: races, error, isLoading } = useSWR<Race[]>(
    `/api/races?modalidade=${selectedModalidade}`,
    fetcher
  );
  const locationData = useLocation();

  // Auto-selecionar estado do usuário apenas na primeira detecção (não sobrescrever após o usuário limpar)
  useEffect(() => {
    if (locationData.estado && !hasAutoSelected.current) {
      hasAutoSelected.current = true;
      setSelectedState(locationData.estado);
      setFilters(prev => ({ ...prev, estado: locationData.estado || '' }));
    }
  }, [locationData.estado]);

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
        ? (() => {
            // Filtro em DD/MM/AAAA — compara contra DD/MM/YYYY e DD.MM da planilha
            const f = filters.data.replace(/\D/g, ''); // apenas dígitos digitados
            const r = race.data.replace(/[./]/g, '');  // remove separadores da planilha
            return r.startsWith(f);
          })()
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
              <img
                src="/images/sportex-logo.png"
                alt="SportEx Logo"
                className="w-28 h-28 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Título */}
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
              SportEx
            </h1>
            
            {/* Subtítulo principal */}
            <p className="text-2xl md:text-3xl text-white font-black max-w-4xl mx-auto mb-4 drop-shadow-2xl">
              Encontre sua próxima linha de chegada.
            </p>
            <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-2 drop-shadow-lg">
              Todas as provas, todas as modalidades, em um só lugar.
            </p>
            <p className="text-sm text-white/60 max-w-2xl mx-auto drop-shadow-lg mb-8">
              Descubra, planeje e viva o esporte com o SportEx
            </p>

            {/* Stats Pills */}
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="bg-black/30 border border-white/10 rounded-full px-6 py-2.5 flex items-center gap-2">
                <span className="text-white/90 font-medium text-sm">Atualizado em tempo real</span>
              </div>
              <div className="bg-black/30 border border-white/10 rounded-full px-6 py-2.5 flex items-center gap-2">
                <svg className="w-4 h-4 text-sportex-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="text-white/90 font-medium text-sm">{races?.length || 0}+ eventos</span>
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

        {/* Search Bar com filtros separados */}
        <SearchBar filters={filters} onFilterChange={setFilters} races={races} />

        {/* State Tabs */}
        {!isLoading && !error && races && races.length > 0 && (
          <StateTabs 
            races={races} 
            selectedState={selectedState} 
            onStateSelect={handleStateSelect}
            userLocation={locationData}
          />
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col justify-center items-center py-20 animate-fadeIn">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-sportex-orange"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-sportex-orange/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="mt-6 text-white text-lg font-semibold drop-shadow-lg">
              Carregando eventos incríveis...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-black/35 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 text-center animate-fadeInUp">
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
            <div className="inline-block bg-black/35 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/15">
              {filteredRaces.length === 0 && hasActiveFilters ? (
                <p className="text-lg text-white">
                  <span className="font-bold text-red-400">Nenhum evento encontrado</span>
                  <span className="text-sportex-muted"> com os filtros aplicados</span>
                </p>
              ) : (
                <p className="text-lg text-white">
                  <span className="text-sportex-muted">Mostrando </span>
                  <span className="font-black text-3xl text-sportex-orange">
                    {filteredRaces.length}
                  </span>
                  <span className="text-sportex-muted">
                    {' '}{filteredRaces.length === 1 ? 'evento' : 'eventos'}
                  </span>
                  {hasActiveFilters && (
                    <span className="text-sportex-muted text-sm ml-2">
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
            <div className="bg-black/35 backdrop-blur-sm rounded-3xl p-12 max-w-lg mx-auto border border-white/10">
              {selectedModalidade === 'corrida' ? (
                <>
                  <svg
                    className="w-20 h-20 text-sportex-muted mx-auto mb-6"
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
                  <p className="text-white text-xl font-bold">Nenhum evento cadastrado</p>
                  <p className="text-sportex-muted mt-2">Volte em breve para novidades!</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-sportex-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-9 h-9 text-sportex-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      {selectedModalidade === 'ciclismo' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17s1-4 9-4 9 4 9 4" />
                      )}
                    </svg>
                  </div>
                  <p className="text-white text-2xl font-bold mb-3">
                    {selectedModalidade === 'ciclismo' ? 'Ciclismo' : 'Triatlo'} em Breve!
                  </p>
                  <p className="text-sportex-muted">
                    Estamos preparando eventos incríveis de {selectedModalidade === 'ciclismo' ? 'ciclismo' : 'triatlo'} para você.
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-20 bg-black/50 backdrop-blur-md border-t border-white/10 text-white py-12 mt-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            {/* Logo ícone */}
            <div className="mb-6 flex justify-center">
              <img
                src="/images/sportex-logo.png"
                alt="SportEx Logo"
                className="w-16 h-16 object-contain drop-shadow-lg"
              />
            </div>

            {/* Copyright */}
            <p className="text-white/60 mb-2 text-sm">
              © {new Date().getFullYear()} SportEx. Todos os direitos reservados.
            </p>
            <p className="text-sportex-muted text-xs">
              Desenvolvido para atletas apaixonados
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}


