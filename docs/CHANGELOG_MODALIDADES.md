# Changelog - Sistema SportEx

## 🎉 Versão 2.1 - Filtro Automático de Datas

**Data:** 31 de Outubro de 2025

### ✨ Nova Funcionalidade

#### Filtro de Eventos Futuros
- **Filtro automático** que remove eventos passados
- **Formato de data:** `DD/MM/YYYY` (ex: 26/10/2025)
- **Lógica:** Mostra apenas eventos com data >= hoje
- **Eficiente:** Filtro feito no backend (API)
- **Seguro:** Valida datas antes de comparar

#### Detalhes Técnicos
- Função `parseEventDate()` - Parseia datas no formato DD/MM/YYYY
- Função `isFutureEvent()` - Verifica se evento é futuro
- Filtro aplicado junto com filtros de validação
- Logs no console para debug

#### Benefícios
- ✅ Não precisa remover eventos passados manualmente da planilha
- ✅ Interface sempre mostra apenas eventos relevantes
- ✅ Datas inválidas não quebram o sistema
- ✅ Performance otimizada (filtro no backend)

---

## 🎉 Versão 2.0 - Sistema de Múltiplas Modalidades

**Data:** 31 de Outubro de 2025

### ✨ Novas Funcionalidades

#### 1. Seletor Visual de Modalidades
- **Componente:** `ModalidadeTabs`
- **Localização:** Topo da página principal, antes dos filtros de estado
- **Funcionalidades:**
  - 3 botões grandes e visuais: 🏃 Corrida, 🚴 Ciclismo, 🏊 Triatlo
  - Gradientes específicos por modalidade (laranja para corrida, teal para ciclismo, roxo para triatlo)
  - Animações suaves de transição
  - Indicador visual da modalidade ativa
  - Design responsivo (mobile, tablet e desktop)

#### 2. API Atualizada
- **Rota:** `/api/races` (mantida, agora com suporte a modalidades)
- **Novo parâmetro:** `?modalidade=corrida|ciclismo|triatlo`
- **Comportamento:** 
  - Sem parâmetro = retorna corrida (compatibilidade com código antigo)
  - Com parâmetro = retorna a modalidade específica
- **Validação:** Retorna erro 400 para modalidades inválidas
- **Feedback:** Mensagem clara quando GID não está configurado

#### 3. Tipos TypeScript Atualizados
- **Novo tipo:** `Modalidade = 'corrida' | 'ciclismo' | 'triatlo'`
- **Interface Race:** Agora inclui campo `modalidade`
- **Interface Event:** Criada para uso futuro (mais genérica)
- **100% type-safe:** Todo o código é tipado

### 🎨 Melhorias de UX/UI

1. **Textos Genéricos**
   - "corridas" → "eventos" em todo o site
   - "corredores" → "atletas" no footer
   - Mensagens adaptadas para todas as modalidades

2. **Design Coerente**
   - Segue o mesmo padrão visual do `StateTabs`
   - Usa as cores da marca (laranja e teal)
   - Efeitos glassmorphism e backdrop-blur
   - Animações suaves e profissionais

3. **Indicadores Visuais**
   - Badge "Selecionado" na modalidade ativa
   - Card informativo mostrando modalidade atual
   - Status "Ativo" com indicador verde piscante

### 🏗️ Arquitetura

#### Componentes Criados
- `components/ModalidadeTabs.tsx` - Seletor de modalidades

#### Componentes Modificados
- `app/page.tsx` - Adicionado estado de modalidade e integração com API
- `app/api/races/route.ts` - Suporte a múltiplas modalidades via query param

#### Tipos Modificados
- `types/race.ts` - Adicionado tipo `Modalidade` e campo `modalidade`

### 📁 Organização do Projeto

#### Documentação Movida para `docs/`
Todos os arquivos `.md` foram organizados na pasta `docs/`:
- Documentação de setup e configuração
- Guias de branding e design
- Documentação de melhorias e próximos passos
- **NOVO:** `CONFIGURACAO_MODALIDADES.md` - Guia completo do sistema de modalidades

#### Limpeza
- ❌ Removida pasta `/api/events` (não utilizada)
- ❌ Removido `pnpm-lock.yaml` (conflito com npm)
- ❌ Removido `GUIA_MIGRACAO_EVENTOS.md` (já implementado)

### 🔧 Configuração

#### Variáveis de Ambiente Necessárias

```env
# Obrigatório (já configurado)
SPREADSHEET_ID=13_EmYHqmjJd9tvp6iihAaKKgRxnOi9gwSIwavgfCn0Y
CORRIDA_GID=672877934

# Opcional (para ativar outras modalidades)
CICLISMO_GID=SEU_GID_AQUI
TRIATLO_GID=SEU_GID_AQUI
```

### ✅ Compatibilidade

- ✅ **100% retrocompatível** com código existente
- ✅ Chamadas antigas para `/api/races` continuam funcionando
- ✅ Todos os componentes existentes funcionam sem alteração
- ✅ Zero breaking changes

### 📊 Status Atual

| Modalidade | Status | GID Configurado | Aba na Planilha |
|------------|--------|-----------------|-----------------|
| 🏃 Corrida | ✅ Funcionando | ✅ Sim (672877934) | ✅ eventos_corrida |
| 🚴 Ciclismo | ⚠️ Aguardando GID | ❌ Não | ❌ Criar aba |
| 🏊 Triatlo | ⚠️ Aguardando GID | ❌ Não | ❌ Criar aba |

### 🚀 Como Ativar Ciclismo e Triatlo

1. Abra a planilha do Google Sheets
2. Crie as abas `eventos_ciclismo` e `eventos_triatlo`
3. Copie a estrutura de colunas da aba `eventos_corrida`
4. Obtenha o GID de cada aba (veja na URL quando a aba estiver aberta)
5. Adicione os GIDs no `.env.local`
6. Reinicie o servidor (`npm run dev`)
7. Pronto! As modalidades estarão ativas

### 📚 Documentação Atualizada

- ✅ `docs/CONFIGURACAO_MODALIDADES.md` - Guia completo
- ✅ `docs/ENV_EXAMPLE.md` - Exemplos de configuração
- ✅ `docs/README.md` - Índice atualizado
- ✅ Este changelog

### 🎯 Próximas Melhorias Sugeridas

- [ ] Adicionar contador específico de eventos por modalidade no hero
- [ ] Criar badge de "Nova modalidade" quando ciclismo/triatlo forem ativados
- [ ] Adicionar transição animada entre trocas de modalidade
- [ ] Persistir última modalidade selecionada no localStorage
- [ ] Adicionar filtro de modalidade no SearchBar

---

**Desenvolvido com ❤️ mantendo as melhores práticas de UI/UX e Next.js**

