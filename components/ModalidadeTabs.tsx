'use client';

import { Modalidade } from '@/types/race';

interface ModalidadeTabsProps {
  selectedModalidade: Modalidade;
  onModalidadeSelect: (modalidade: Modalidade) => void;
}

const MODALIDADES_CONFIG: Record<Modalidade, {
  label: string;
  emoji: string;
  color: string;
  description: string;
}> = {
  corrida: {
    label: 'Corrida',
    emoji: '🏃',
    color: 'from-orange-500 to-amber-600',
    description: 'Provas de corrida de rua, trail e pista'
  },
  ciclismo: {
    label: 'Ciclismo',
    emoji: '🚴',
    color: 'from-teal-500 to-cyan-600',
    description: 'Provas de ciclismo de estrada e MTB'
  },
  triatlo: {
    label: 'Triatlo',
    emoji: '🏊',
    color: 'from-purple-500 to-pink-600',
    description: 'Provas de triatlo e aquathlon'
  }
};

export default function ModalidadeTabs({ selectedModalidade, onModalidadeSelect }: ModalidadeTabsProps) {
  return (
    <div className="w-full max-w-6xl mx-auto mb-8 animate-fadeInDown">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20">
        {/* Título */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Escolha sua Modalidade
          </h2>
          <p className="text-gray-600 text-sm">
            Selecione o tipo de evento que você procura
          </p>
        </div>

        {/* Abas de Modalidades */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(MODALIDADES_CONFIG) as Modalidade[]).map((modalidade) => {
            const config = MODALIDADES_CONFIG[modalidade];
            const isSelected = selectedModalidade === modalidade;
            
            return (
              <button
                key={modalidade}
                onClick={() => onModalidadeSelect(modalidade)}
                className={`relative group p-6 rounded-xl transition-all duration-300 transform ${
                  isSelected
                    ? `bg-gradient-to-br ${config.color} text-white shadow-2xl scale-105`
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:shadow-lg hover:scale-105 hover:from-gray-100 hover:to-gray-50'
                }`}
              >
                {/* Efeito de brilho quando selecionado */}
                {isSelected && (
                  <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl animate-pulse-glow"></div>
                )}
                
                <div className="relative">
                  {/* Emoji grande */}
                  <div className={`text-6xl mb-3 transform transition-transform duration-300 ${
                    isSelected ? 'scale-110' : 'group-hover:scale-110'
                  }`}>
                    {config.emoji}
                  </div>
                  
                  {/* Nome da modalidade */}
                  <h3 className={`text-2xl font-black mb-2 ${
                    isSelected ? 'text-white' : 'text-gray-800'
                  }`}>
                    {config.label}
                  </h3>
                  
                  {/* Descrição */}
                  <p className={`text-sm font-medium ${
                    isSelected ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    {config.description}
                  </p>

                  {/* Indicador de seleção */}
                  {isSelected && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Selecionado
                      </span>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>

                {/* Borda animada quando hover */}
                {!isSelected && (
                  <div className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gradient bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Informação da modalidade selecionada */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${MODALIDADES_CONFIG[selectedModalidade].color} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
              {MODALIDADES_CONFIG[selectedModalidade].emoji}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 text-lg">
                {MODALIDADES_CONFIG[selectedModalidade].label}
              </h3>
              <p className="text-sm text-gray-600">
                Visualizando eventos de {MODALIDADES_CONFIG[selectedModalidade].label.toLowerCase()}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-gray-700">Ativo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

