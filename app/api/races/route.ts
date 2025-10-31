import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse';
import { Race, Modalidade } from '@/types/race';

// Mapeamento de GIDs para cada modalidade
const SHEET_GIDS: Record<Modalidade, string> = {
  corrida: process.env.CORRIDA_GID || '672877934',
  ciclismo: process.env.CICLISMO_GID || '',
  triatlo: process.env.TRIATLO_GID || '',
};

const SPREADSHEET_ID = process.env.SPREADSHEET_ID || '13_EmYHqmjJd9tvp6iihAaKKgRxnOi9gwSIwavgfCn0Y';

/**
 * Parseia data no formato DD/MM/YYYY
 * Retorna null se a data for inválida
 */
function parseEventDate(dateStr: string): Date | null {
  if (!dateStr) return null;

  // Aceita "/" como separador: DD/MM/YYYY
  const parts = dateStr.split('/');
  
  if (parts.length !== 3) return null;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Mês é 0-indexed no JS
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  
  const date = new Date(year, month, day);
  
  // Validar se a data é válida
  if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
    return null;
  }
  
  return date;
}

/**
 * Verifica se o evento é futuro (data >= hoje)
 */
function isFutureEvent(dateStr: string): boolean {
  const eventDate = parseEventDate(dateStr);
  if (!eventDate) return true; // Se não conseguir parsear, mantém o evento
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Zera horas para comparar só a data
  
  return eventDate >= today;
}

export async function GET(request: NextRequest) {
  try {
    // Pegar modalidade da query string (default: corrida)
    const searchParams = request.nextUrl.searchParams;
    const modalidade = (searchParams.get('modalidade') || 'corrida') as Modalidade;

    // Validar modalidade
    if (!['corrida', 'ciclismo', 'triatlo'].includes(modalidade)) {
      return NextResponse.json(
        { error: 'Modalidade inválida. Use: corrida, ciclismo ou triatlo' },
        { status: 400 }
      );
    }

    const gid = SHEET_GIDS[modalidade];
    
    // Se não tem GID configurado, retorna array vazio ao invés de erro
    if (!gid) {
      console.warn(`GID não configurado para modalidade: ${modalidade}`);
      return NextResponse.json([]);
    }

    const sheetUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${gid}`;
    
    const response = await fetch(sheetUrl, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch spreadsheet data');
    }

    const csvText = await response.text();

    return new Promise<NextResponse>((resolve) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const races: Race[] = results.data
            .map((row: any) => ({
              data: row['DATA'] || row['data'] || '',
              cidade: row['CIDADE'] || row['cidade'] || '',
              nomeDaCorrida: row['NOME DO EVENTO'] || row['NOME DA CORRIDA'] || row['nomeDaCorrida'] || '',
              distancia: row['DISTANCIA'] || row['distancia'] || '',
              link: row['LINK'] || row['link'] || '',
              estado: row['SIGLA'] || row['sigla'] || row['ESTADO'] || row['estado'] || '',
              modalidade: modalidade,
            }))
            // Filtrar linhas vazias ou inválidas
            .filter((race) => race.nomeDaCorrida && race.cidade)
            // Filtrar apenas eventos futuros (data >= hoje)
            .filter((race) => isFutureEvent(race.data));

          console.log(`Retornando ${races.length} eventos futuros para modalidade: ${modalidade}`);
          resolve(NextResponse.json(races));
        },
        error: (error: Error) => {
          console.error('CSV parsing error:', error);
          resolve(
            NextResponse.json(
              { error: 'Failed to parse CSV data' },
              { status: 500 }
            )
          );
        },
      });
    });
  } catch (error) {
    console.error('Error fetching races:', error);
    return NextResponse.json(
      { error: 'Failed to fetch race data' },
      { status: 500 }
    );
  }
}


