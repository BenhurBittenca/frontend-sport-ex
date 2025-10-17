import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import { Race } from '@/types/race';

export async function GET() {
  try {
    const sheetUrl = process.env.GOOGLE_SHEET_URL || 'https://docs.google.com/spreadsheets/d/13_EmYHqmjJd9tvp6iihAaKKgRxnOi9gwSIwavgfCn0Y/export?format=csv&gid=672877934';
    
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
          const races: Race[] = results.data.map((row: any) => ({
            data: row['DATA'] || row['data'] || '',
            cidade: row['CIDADE'] || row['cidade'] || '',
            nomeDaCorrida: row['NOME DA CORRIDA'] || row['nomeDaCorrida'] || '',
            distancia: row['DISTANCIA'] || row['distancia'] || '',
            link: row['LINK'] || row['link'] || '',
          }));

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


