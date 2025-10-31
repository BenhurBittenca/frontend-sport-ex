# Configuração de Modalidades SportEx

✅ **Sistema de Modalidades IMPLEMENTADO e FUNCIONANDO!**

Este documento explica como configurar as diferentes modalidades esportivas no sistema.

## 🎯 Funcionalidades Implementadas

- ✅ Seletor visual de modalidades na página principal
- ✅ API que suporta múltiplas modalidades via query parameter
- ✅ Design responsivo e moderno com gradientes específicos por modalidade
- ✅ Troca dinâmica de dados sem recarregar a página
- ✅ Compatibilidade total com código existente

## 📊 Estrutura da Planilha

A planilha do Google Sheets deve conter múltiplas abas, uma para cada modalidade:

### Abas Disponíveis

1. **eventos_corrida** - Aba com eventos de corrida (GID: 672877934) ✅
2. **eventos_ciclismo** - Aba com eventos de ciclismo (criar e obter GID)
3. **eventos_triatlo** - Aba com eventos de triatlo (criar e obter GID)

## 🔑 Obtendo o GID de cada Aba

Cada aba no Google Sheets possui um identificador único chamado GID. Para obter o GID:

1. Abra a planilha no Google Sheets
2. Clique na aba desejada
3. Olhe na URL do navegador
4. O GID está no formato: `gid=XXXXXXXXX`

**Exemplo de URL:**
```
https://docs.google.com/spreadsheets/d/13_EmYHqmjJd9tvp6iihAaKKgRxnOi9gwSIwavgfCn0Y/edit#gid=672877934
                                                                                               └─────────┘
                                                                                                   GID
```

## ⚙️ Configuração das Variáveis de Ambiente

Crie ou atualize o arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# ID da Planilha Principal
SPREADSHEET_ID=13_EmYHqmjJd9tvp6iihAaKKgRxnOi9gwSIwavgfCn0Y

# GIDs das Abas por Modalidade
CORRIDA_GID=672877934
CICLISMO_GID=SEU_GID_CICLISMO_AQUI
TRIATLO_GID=SEU_GID_TRIATLO_AQUI

# Variável legada (opcional, para compatibilidade)
GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/13_EmYHqmjJd9tvp6iihAaKKgRxnOi9gwSIwavgfCn0Y/export?format=csv&gid=672877934
```

## 📋 Estrutura das Colunas na Planilha

Todas as abas devem seguir a mesma estrutura de colunas:

| Coluna | Descrição | Formato | Obrigatório |
|--------|-----------|---------|-------------|
| DATA | Data do evento | `DD/MM/YYYY` (ex: 26/10/2025) | Sim |
| CIDADE | Cidade onde ocorre o evento | Texto | Sim |
| NOME DO EVENTO | Nome do evento/competição | Texto | Sim |
| DISTANCIA | Distância do evento | Texto (ex: 5km, 10km, 42km) | Sim |
| LINK | URL para inscrição/informações | URL completa | Sim |
| SIGLA | Sigla do estado | 2 letras (ex: SP, RJ, MG) | Sim |

### Observações sobre as Colunas

- As colunas são **case-insensitive** (maiúsculas/minúsculas não importam)
- Nomes alternativos são aceitos para compatibilidade:
  - `NOME DO EVENTO` ou `NOME DA CORRIDA`
  - `SIGLA` ou `ESTADO`

### ⚠️ IMPORTANTE: Formato de Data

**O campo DATA deve estar no formato `DD/MM/YYYY`**

- ✅ Correto: `26/10/2025`, `01/12/2025`, `15/03/2026`
- ❌ Errado: `26.10.2025`, `26/10/25`, `2025-10-26`

**Filtro Automático:**
- O sistema **automaticamente remove eventos passados**
- Apenas eventos com data >= hoje são exibidos
- Você pode deixar eventos antigos na planilha, eles não aparecerão no frontend

📖 Veja mais em: [FILTRO_DATAS.md](./FILTRO_DATAS.md)

## 🔌 Usando a API

A API `/api/races` suporta múltiplas modalidades através de query parameters:

```typescript
// Buscar eventos de corrida
fetch('/api/races?modalidade=corrida')

// Buscar eventos de ciclismo
fetch('/api/races?modalidade=ciclismo')

// Buscar eventos de triatlo
fetch('/api/races?modalidade=triatlo')

// Sem modalidade = padrão é corrida
fetch('/api/races')
```

### Como funciona na interface

O componente `ModalidadeTabs` permite que o usuário selecione visualmente a modalidade desejada. Quando uma modalidade é selecionada, a página automaticamente busca os dados da modalidade correspondente usando a API acima.

## 📝 Exemplo de Resposta da API

```json
[
  {
    "data": "15/12/2024",
    "cidade": "São Paulo",
    "nomeDoEvento": "Maratona de São Paulo",
    "distancia": "42km",
    "link": "https://exemplo.com/inscricao",
    "estado": "SP",
    "modalidade": "corrida"
  }
]
```

## 🚀 Próximos Passos para Ativar Ciclismo e Triatlo

1. **Criar as abas** `eventos_ciclismo` e `eventos_triatlo` na planilha do Google Sheets
2. **Obter os GIDs** de cada nova aba (veja instruções acima)
3. **Atualizar** o arquivo `.env.local` com os novos GIDs:
   ```env
   CICLISMO_GID=SEU_GID_AQUI
   TRIATLO_GID=SEU_GID_AQUI
   ```
4. **Preencher** as abas com os dados dos eventos (mesma estrutura de colunas)
5. **Reiniciar** o servidor Next.js (`npm run dev`)
6. **Testar** clicando nas abas de Ciclismo e Triatlo na interface

## 🔍 Testando

### Testando a Interface

Acesse `http://localhost:3000` e:
1. Veja as 3 abas de modalidades (Corrida, Ciclismo, Triatlo)
2. Clique em cada aba para trocar de modalidade
3. Os dados devem carregar automaticamente

### Testando a API diretamente

Você também pode testar a API diretamente no navegador:

```
http://localhost:3000/api/races?modalidade=corrida
http://localhost:3000/api/races?modalidade=ciclismo
http://localhost:3000/api/races?modalidade=triatlo
```

## ⚠️ Importante

- Mantenha o `SPREADSHEET_ID` sempre atualizado
- Cada aba deve ter as mesmas colunas
- Os GIDs nunca mudam, mesmo se você renomear a aba
- Certifique-se de que a planilha está com permissão de leitura pública
- **Modalidades sem GID configurado mostram mensagem "Em Breve" ao invés de erro** ✅

## 🎨 Experiência do Usuário

### Quando GID não está configurado
- ✅ Não quebra a aplicação
- ✅ Mostra mensagem amigável "Em Breve"
- ✅ Inclui instruções para administradores
- ✅ Emoji grande da modalidade

### Quando aba está vazia
- ✅ Retorna array vazio
- ✅ Mostra "Nenhum evento cadastrado"
- ✅ Sugere voltar em breve

### Filtragem Automática
- ✅ Linhas vazias são filtradas automaticamente
- ✅ Eventos sem nome ou cidade são ignorados
- ✅ Dados inválidos não quebram a aplicação

