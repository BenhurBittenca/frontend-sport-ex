# Exemplo de Arquivo .env.local

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
# Configuração da Planilha Google Sheets
# ========================================

# ID da planilha principal (obtenha da URL da planilha)
SPREADSHEET_ID=13_EmYHqmjJd9tvp6iihAaKKgRxnOi9gwSIwavgfCn0Y

# GIDs das abas para cada modalidade
# Obtenha o GID olhando a URL quando a aba estiver aberta (gid=XXXXXXXXX)

# Aba: eventos_corrida
CORRIDA_GID=672877934

# Aba: eventos_ciclismo (preencha quando criar a aba)
CICLISMO_GID=

# Aba: eventos_triatlo (preencha quando criar a aba)
TRIATLO_GID=

# ========================================
# Variáveis Legadas (Opcional)
# ========================================

# URL completa da planilha (compatibilidade com código antigo)
GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/13_EmYHqmjJd9tvp6iihAaKKgRxnOi9gwSIwavgfCn0Y/export?format=csv&gid=672877934
```

## Como Usar

1. Copie o conteúdo acima
2. Crie um arquivo chamado `.env.local` na raiz do projeto
3. Cole o conteúdo
4. Atualize os valores conforme necessário
5. **IMPORTANTE:** O arquivo `.env.local` não deve ser commitado no Git (já está no .gitignore)

## Como Obter os GIDs

1. Abra sua planilha no Google Sheets
2. Clique na aba desejada
3. Olhe a URL do navegador
4. O GID aparece após `gid=` na URL

Exemplo: `https://docs.google.com/spreadsheets/d/ID_DA_PLANILHA/edit#gid=672877934`

O GID neste exemplo é: **672877934**

