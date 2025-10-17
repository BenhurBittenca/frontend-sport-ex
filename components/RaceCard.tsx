import { Race } from '@/types/race';

interface RaceCardProps {
  race: Race;
  index: number;
}

export default function RaceCard({ race, index }: RaceCardProps) {
  return (
    <div 
      className="group bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 border border-white/30 hover:border-blue-400/50 transform hover:-translate-y-2 animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col h-full">
        {/* Data */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {race.data}
          </span>
        </div>

        {/* Nome da Corrida */}
        <h3 className="text-2xl font-extrabold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {race.nomeDaCorrida}
        </h3>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4" />

        {/* Cidade */}
        <div className="flex items-center text-gray-700 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors duration-300">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Cidade</p>
            <p className="font-semibold">{race.cidade}</p>
          </div>
        </div>

        {/* Distância */}
        <div className="flex items-center text-gray-700 mb-6 group-hover:text-blue-600 transition-colors duration-300">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors duration-300">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Distância</p>
            <p className="font-semibold text-lg">{race.distancia}</p>
          </div>
        </div>

        {/* Link */}
        <div className="mt-auto">
          {race.link && (
            <a
              href={race.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 via-blue-500 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                Ver Detalhes
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}



