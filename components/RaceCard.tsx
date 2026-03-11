import { Race } from '@/types/race';

interface RaceCardProps {
  race: Race;
  index: number;
}

export default function RaceCard({ race, index }: RaceCardProps) {
  return (
    <div
      className="group bg-black/35 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-sportex-orange/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sportex-orange/10 animate-fadeInUp overflow-hidden"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="p-5 flex flex-col h-full">
        {/* Badge data com ícone calendário */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 bg-sportex-orange text-white text-xs font-bold px-3 py-1.5 rounded-md">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {race.data}
          </span>
        </div>

        {/* Nome da Corrida */}
        <h3 className="text-base font-bold text-white mb-4 line-clamp-2 group-hover:text-sportex-orange transition-colors duration-200 leading-snug">
          {race.nomeDaCorrida}
        </h3>

        {/* Divisor */}
        <div className="w-full h-px bg-white/10 mb-4" />

        {/* Cidade */}
        <div className="flex items-center gap-2.5 text-sportex-muted mb-3">
          <svg className="w-4 h-4 text-sportex-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm text-white/80">{race.cidade}</span>
        </div>

        {/* Distância */}
        <div className="flex items-center gap-2.5 text-sportex-muted mb-5">
          <svg className="w-4 h-4 text-sportex-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span className="text-sm text-white/80">{race.distancia}</span>
        </div>

        {/* Botão Ver Detalhes */}
        <div className="mt-auto">
          {race.link ? (
            <a
              href={race.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full bg-sportex-orange hover:bg-orange-600 text-white font-semibold text-sm py-2.5 px-5 rounded-xl transition-all duration-200 gap-2 group/btn"
            >
              Ver Detalhes
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ) : (
            <div className="inline-flex items-center justify-center w-full bg-white/10 text-sportex-muted text-sm py-2.5 px-5 rounded-xl cursor-not-allowed">
              Sem link disponível
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
