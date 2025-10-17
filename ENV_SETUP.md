# Configuração de Variáveis de Ambiente

Este projeto requer um arquivo `.env.local` na raiz do projeto.

## Como Configurar

Crie um arquivo chamado `.env.local` na raiz do projeto (no mesmo nível que `package.json`) com o seguinte conteúdo:

```
GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/13_EmYHqmjJd9tvp6iihAaKKgRxnOi9gwSIwavgfCn0Y/export?format=csv&gid=672877934
```

## Notas Importantes

- O arquivo `.env.local` **não deve** ser commitado no Git (já está no `.gitignore`)
- Se você quiser usar uma planilha diferente, substitua a URL pela URL de exportação CSV da sua planilha
- Para obter a URL de exportação CSV de uma planilha do Google Sheets:
  1. Abra sua planilha
  2. Vá em Arquivo → Fazer download → Valores separados por vírgula (.csv)
  3. Use o formato: `https://docs.google.com/spreadsheets/d/[ID_DA_PLANILHA]/export?format=csv&gid=[ID_DA_ABA]`

## Variável de Ambiente

- **GOOGLE_SHEET_URL**: URL completa para exportar a planilha do Google Sheets em formato CSV
  - Esta URL é usada pela API route em `/app/api/races/route.ts`
  - Se não for definida, a aplicação usará a URL padrão hardcoded no código


