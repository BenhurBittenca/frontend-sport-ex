# Melhorias de UX - Filtros por Estado e Localização

## 🎯 Objetivo
Melhorar a experiência do usuário na página inicial com foco na navegação por estados e detecção automática de localização.

## ✨ Funcionalidades Implementadas

### 1. **Detecção Automática de Localização**
- Hook personalizado `useLocation` que detecta a localização do usuário
- Mapeamento de coordenadas para estados brasileiros
- Auto-seleção do estado quando a localização é detectada
- Fallback gracioso quando a localização não está disponível

### 2. **Filtro por Estado**
- Campo de estado adicionado ao SearchBar
- Integração com a API para buscar corridas por estado
- Filtro automático baseado na localização detectada

### 3. **Abas por Estados**
- Componente `StateTabs` com navegação visual por estados
- Contador de corridas por estado
- Destaque do estado do usuário
- Interface responsiva com grid adaptativo

### 4. **Melhorias na API**
- Campo `estado` adicionado à interface `Race`
- Processamento do campo estado da planilha Google Sheets
- Suporte a diferentes formatos de coluna (ESTADO/estado)

## 🏗️ Arquitetura

### Novos Arquivos:
- `hooks/useLocation.ts` - Hook para detecção de localização
- `components/StateTabs.tsx` - Componente de abas por estados

### Arquivos Modificados:
- `app/page.tsx` - Integração dos novos componentes
- `components/SearchBar.tsx` - Adição do filtro de estado
- `types/race.ts` - Interface atualizada com campo estado
- `app/api/races/route.ts` - Processamento do campo estado

## 🎨 UX/UI Melhorias

### 1. **Fluxo de Entrada Otimizado**
- Usuário chega na página e automaticamente vê corridas do seu estado
- Indicação visual clara do estado detectado
- Opção de mudar para outros estados facilmente

### 2. **Navegação Intuitiva**
- Abas visuais com contadores de corridas
- Estados organizados em grid responsivo
- Destaque especial para o estado do usuário

### 3. **Feedback Visual**
- Indicadores de carregamento da localização
- Mensagens de erro amigáveis
- Animações suaves nas transições

## 🔧 Como Funciona

### Detecção de Localização:
1. Solicita permissão de geolocalização
2. Converte coordenadas para estado brasileiro
3. Auto-seleciona o estado detectado
4. Aplica filtro automaticamente

### Navegação por Estados:
1. Extrai estados únicos das corridas
2. Cria abas com contadores
3. Permite seleção rápida por estado
4. Sincroniza com filtros de busca

### Integração com Filtros:
1. Estado selecionado atualiza filtro automaticamente
2. Filtros de busca funcionam em conjunto
3. Limpeza de filtros reseta seleção de estado

## 🚀 Benefícios

- **Experiência Personalizada**: Usuário vê corridas relevantes imediatamente
- **Navegação Eficiente**: Abas facilitam exploração por estados
- **Redução de Fricção**: Menos cliques para encontrar corridas próximas
- **Engajamento**: Interface mais interativa e visualmente atrativa

## 📱 Responsividade

- Grid adaptativo para diferentes tamanhos de tela
- Abas organizadas em colunas responsivas
- Interface otimizada para mobile e desktop
- Componentes que se ajustam automaticamente

## 🔒 Privacidade

- Localização processada apenas no cliente
- Sem armazenamento de dados de localização
- Permissão solicitada de forma transparente
- Fallback quando localização não está disponível
