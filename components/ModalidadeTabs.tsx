'use client';

import { Modalidade } from '@/types/race';

interface ModalidadeTabsProps {
  selectedModalidade: Modalidade;
  onModalidadeSelect: (modalidade: Modalidade) => void;
}

const MODALIDADES_CONFIG: Record<Modalidade, {
  label: string;
  description: string;
  icon: React.ReactNode;
}> = {
  corrida: {
    label: 'Corrida',
    description: 'Provas de corrida de rua, trail e pista',
    icon: (
      // Ícone ECG/heartbeat line (como no Figma)
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <polyline points="2,12 6,12 8,4 10,20 13,10 15,14 17,12 22,12" />
      </svg>
    ),
  },
  ciclismo: {
    label: 'Ciclismo',
    description: 'Provas de ciclismo de estrada e MTB',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="5.5" cy="16.5" r="3.5" />
        <circle cx="18.5" cy="16.5" r="3.5" />
        <path d="M15 7h-2l-3 9.5" />
        <path d="M9.5 9H12l3 7.5H9.5" />
        <circle cx="15" cy="6" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  triatlo: {
    label: 'Triathlon',
    description: 'Provas de triatlo e aquathlon',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M2 10c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
        <path d="M2 15c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
      </svg>
    ),
  },
};

export default function ModalidadeTabs({ selectedModalidade, onModalidadeSelect }: ModalidadeTabsProps) {
  return (
    <div className="w-full max-w-6xl mx-auto mb-8 animate-fadeInDown">
      {/* Título fora do container */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-white mb-1">
          Escolha sua Modalidade
        </h2>
        <p className="text-sportex-muted text-sm">
          Selecione o tipo de evento que você procura
        </p>
      </div>

      {/* Cards de Modalidades — soltos, sem container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(MODALIDADES_CONFIG) as Modalidade[]).map((modalidade) => {
            const config = MODALIDADES_CONFIG[modalidade];
            const isSelected = selectedModalidade === modalidade;

            return (
              <button
                key={modalidade}
                onClick={() => onModalidadeSelect(modalidade)}
                className={`relative group p-6 rounded-xl transition-all duration-300 text-left border ${
                  isSelected
                    ? 'bg-sportex-orange border-sportex-orange shadow-lg shadow-sportex-orange/30'
                    : 'bg-black/20 border-white/15 hover:border-white/35 hover:bg-black/30'
                }`}
              >
                {/* Ícone */}
                <div className={`mb-4 transition-transform duration-300 ${
                  isSelected ? 'text-white' : 'text-sportex-muted group-hover:text-white'
                }`}>
                  {config.icon}
                </div>

                {/* Nome */}
                <h3 className={`text-lg font-bold mb-1 ${
                  isSelected ? 'text-white' : 'text-white/80 group-hover:text-white'
                }`}>
                  {config.label}
                </h3>

                {/* Descrição */}
                <p className={`text-xs ${
                  isSelected ? 'text-white/80' : 'text-sportex-muted'
                }`}>
                  {config.description}
                </p>

                {/* Badge SELECIONADO */}
                {isSelected && (
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      Selecionado
                    </span>
                  </div>
                )}
              </button>
            );
        })}
      </div>
    </div>
  );
}
