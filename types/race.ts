export type Modalidade = 'corrida' | 'ciclismo' | 'triatlo';

export interface Event {
  data: string;
  cidade: string;
  nomeDoEvento: string;
  distancia: string;
  link: string;
  estado: string;
  modalidade: Modalidade;
}

// Mantém compatibilidade com código existente
export interface Race extends Omit<Event, 'nomeDoEvento'> {
  nomeDaCorrida: string;
}


