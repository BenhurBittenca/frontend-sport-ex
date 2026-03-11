'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Race } from '@/types/race';

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
  races?: Race[];
}

const STATE_NAMES: Record<string, string> = {
  AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas', BA: 'Bahia',
  CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás',
  MA: 'Maranhão', MT: 'Mato Grosso', MS: 'Mato Grosso do Sul', MG: 'Minas Gerais',
  PA: 'Pará', PB: 'Paraíba', PR: 'Paraná', PE: 'Pernambuco', PI: 'Piauí',
  RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RS: 'Rio Grande do Sul',
  RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina', SP: 'São Paulo',
  SE: 'Sergipe', TO: 'Tocantins',
};

// Hook genérico para dropdown com portal
function usePortalDropdown(inputRef: React.RefObject<HTMLInputElement>) {
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const wrapRef = useRef<HTMLDivElement>(null);
  const portalId = useRef(`portal-${Math.random().toString(36).slice(2)}`);

  const openDropdown = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setStyle({ position: 'fixed', top: rect.bottom + 4, left: rect.left, width: rect.width, zIndex: 99999 });
    }
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const insideWrap = wrapRef.current?.contains(target);
      const insidePortal = document.getElementById(portalId.current)?.contains(target);
      if (!insideWrap && !insidePortal) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  return { open, setOpen, style, openDropdown, wrapRef, portalId: portalId.current };
}

export default function SearchBar({ filters, onFilterChange, races = [] }: SearchBarProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const cityInputRef = useRef<HTMLInputElement>(null);
  const stateInputRef = useRef<HTMLInputElement>(null);

  const city = usePortalDropdown(cityInputRef);
  const state = usePortalDropdown(stateInputRef);

  const handleChange = (field: keyof FilterValues, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const clearAll = () => {
    onFilterChange({ cidade: '', nome: '', data: '', distancia: '', estado: '' });
  };

  const hasFilters = Object.values(filters).some(v => v !== '');

  // Cidades únicas das corridas carregadas
  const uniqueCities = Array.from(
    new Set(races.map(r => r.cidade).filter(Boolean))
  ).sort();

  const filteredCities = filters.cidade
    ? uniqueCities.filter(c => c.toLowerCase().includes(filters.cidade.toLowerCase()))
    : uniqueCities;

  // Estados únicos das corridas, com nome completo
  const uniqueStates = Array.from(
    new Set(races.map(r => r.estado).filter(Boolean))
  ).sort();

  const filteredStates = filters.estado
    ? uniqueStates.filter(s =>
        s.toLowerCase().includes(filters.estado.toLowerCase()) ||
        (STATE_NAMES[s] || '').toLowerCase().includes(filters.estado.toLowerCase())
      )
    : uniqueStates;

  const inputClass =
    'w-full px-3 py-2.5 bg-black/25 border border-white/15 rounded-xl text-white text-sm ' +
    'placeholder-sportex-muted/60 focus:outline-none focus:border-sportex-orange/60 ' +
    'focus:ring-1 focus:ring-sportex-orange/40 transition-all duration-200';

  // Máscara DD/MM/AAAA aplicada ao digitar
  const handleDateMask = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 8);
    let masked = digits;
    if (digits.length > 4) masked = `${digits.slice(0,2)}/${digits.slice(2,4)}/${digits.slice(4)}`;
    else if (digits.length > 2) masked = `${digits.slice(0,2)}/${digits.slice(2)}`;
    handleChange('data', masked);
  };

  const ClearBtn = ({ field }: { field: keyof FilterValues }) =>
    filters[field] ? (
      <button type="button" onClick={() => handleChange(field, '')}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sportex-muted hover:text-white transition-colors">
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    ) : null;

  const Chevron = ({ isOpen }: { isOpen: boolean }) => (
    <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  // Portal genérico
  function DropdownPortal({
    id, open, style: s, items, selected, onSelect,
    renderItem,
  }: {
    id: string;
    open: boolean;
    style: React.CSSProperties;
    items: string[];
    selected: string;
    onSelect: (v: string) => void;
    renderItem?: (v: string) => React.ReactNode;
  }) {
    if (!mounted || !open || items.length === 0) return null;
    return createPortal(
      <ul id={id} style={s}
        className="bg-[#251A0E] border border-white/15 rounded-xl overflow-y-auto max-h-52 shadow-2xl scrollbar-thin">
        {items.map(item => (
          <li key={item}>
            <button type="button"
              onMouseDown={(e) => { e.preventDefault(); onSelect(item); }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors duration-150 ${
                selected === item ? 'bg-sportex-orange text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}>
              {renderItem ? renderItem(item) : item}
            </button>
          </li>
        ))}
      </ul>,
      document.body
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mb-8 animate-fadeIn">
      <div className="bg-black/25 backdrop-blur-md rounded-2xl p-6 border border-white/10">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-sportex-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Encontre Sua Próxima Corrida
          </h2>
          {hasFilters && (
            <button type="button" onClick={clearAll}
              className="text-sm text-sportex-orange hover:text-orange-400 font-semibold flex items-center gap-1.5 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Limpar Filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">

          {/* ── 1. Cidade ── */}
          <div ref={city.wrapRef} className="relative">
            <label className="block text-xs font-semibold text-sportex-muted mb-1.5 flex items-center gap-1">
              <svg className="w-4 h-4 text-sportex-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Cidade
            </label>
            <div className="relative">
              <input ref={cityInputRef} type="text" value={filters.cidade} autoComplete="off"
                onChange={(e) => { handleChange('cidade', e.target.value); city.openDropdown(); }}
                onFocus={city.openDropdown}
                placeholder="Buscar cidade..."
                className={`${inputClass} pr-8`} />
              {filters.cidade ? (
                <button type="button" onClick={() => { handleChange('cidade', ''); city.setOpen(false); }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sportex-muted hover:text-white transition-colors">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : (
                <button type="button"
                  onClick={() => city.open ? city.setOpen(false) : city.openDropdown()}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sportex-muted hover:text-white transition-colors">
                  <Chevron isOpen={city.open} />
                </button>
              )}
            </div>
            <DropdownPortal id={city.portalId} open={city.open} style={city.style}
              items={filteredCities} selected={filters.cidade}
              onSelect={(v) => { handleChange('cidade', v); city.setOpen(false); }} />
          </div>

          {/* ── 2. Estado (ao lado de Cidade) ── */}
          <div ref={state.wrapRef} className="relative">
            <label className="block text-xs font-semibold text-sportex-muted mb-1.5 flex items-center gap-1">
              <svg className="w-4 h-4 text-sportex-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              Estado
            </label>
            <div className="relative">
              <input ref={stateInputRef} type="text" value={filters.estado} autoComplete="off"
                onChange={(e) => { handleChange('estado', e.target.value); state.openDropdown(); }}
                onFocus={state.openDropdown}
                placeholder="Ex: SC, SP, RS..."
                className={`${inputClass} pr-8`} />
              {filters.estado ? (
                <button type="button" onClick={() => { handleChange('estado', ''); state.setOpen(false); }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sportex-muted hover:text-white transition-colors">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : (
                <button type="button"
                  onClick={() => state.open ? state.setOpen(false) : state.openDropdown()}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sportex-muted hover:text-white transition-colors">
                  <Chevron isOpen={state.open} />
                </button>
              )}
            </div>
            <DropdownPortal id={state.portalId} open={state.open} style={state.style}
              items={filteredStates} selected={filters.estado}
              onSelect={(v) => { handleChange('estado', v); state.setOpen(false); }}
              renderItem={(s) => (
                <span className="flex items-center gap-2">
                  <span className="font-bold w-7 shrink-0">{s}</span>
                  <span className="text-xs opacity-70 truncate">{STATE_NAMES[s] || s}</span>
                </span>
              )} />
          </div>

          {/* ── 3. Nome da Corrida ── */}
          <div>
            <label className="block text-xs font-semibold text-sportex-muted mb-1.5 flex items-center gap-1">
              <svg className="w-4 h-4 text-sportex-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Nome da Corrida
            </label>
            <div className="relative">
              <input type="text" value={filters.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
                placeholder="Ex: Maratona, 10K..."
                className={inputClass} />
              <ClearBtn field="nome" />
            </div>
          </div>

          {/* ── 4. Data ── */}
          <div>
            <label className="block text-xs font-semibold text-sportex-muted mb-1.5 flex items-center gap-1">
              <svg className="w-4 h-4 text-sportex-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Data
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.data}
                onChange={(e) => handleDateMask(e.target.value)}
                placeholder="DD/MM/AAAA"
                maxLength={10}
                className={inputClass}
              />
              <ClearBtn field="data" />
            </div>
          </div>

          {/* ── 5. Distância ── */}
          <div>
            <label className="block text-xs font-semibold text-sportex-muted mb-1.5 flex items-center gap-1">
              <svg className="w-4 h-4 text-sportex-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Distância
            </label>
            <div className="relative">
              <input type="text" value={filters.distancia}
                onChange={(e) => handleChange('distancia', e.target.value)}
                placeholder="Ex: 5K, 10K, 21K, 42K"
                className={inputClass} />
              <ClearBtn field="distancia" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
