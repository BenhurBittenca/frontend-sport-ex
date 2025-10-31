# Filtro de Datas - Eventos Futuros

## 📅 Implementação

O sistema automaticamente filtra eventos passados, mostrando apenas eventos **futuros ou do dia atual**.

## 🔧 Como Funciona

### Formato de Data Aceito

**Formato único:** `DD/MM/YYYY`

Exemplos válidos:
- ✅ `26/10/2025`
- ✅ `01/01/2026`
- ✅ `15/12/2025`

### Lógica de Filtragem

1. A API parseia a data do campo `DATA` de cada evento
2. Compara com a data atual (apenas dia, mês e ano - sem horário)
3. **Mantém** eventos onde `data do evento >= data de hoje`
4. **Remove** eventos onde `data do evento < data de hoje`

### Casos Especiais

| Situação | Comportamento |
|----------|---------------|
| Data inválida ou vazia | Evento é **mantido** (não filtrado) |
| Data de hoje | Evento é **mantido** |
| Data futura | Evento é **mantido** |
| Data passada | Evento é **removido** |

## 📝 Exemplo

Hoje: `31/10/2025`

```
Eventos na planilha:
- 26/10/2025 → ❌ Removido (passado)
- 31/10/2025 → ✅ Mantido (hoje)
- 15/11/2025 → ✅ Mantido (futuro)
- 01/01/2026 → ✅ Mantido (futuro)
- data inválida → ✅ Mantido (não conseguiu validar)
```

## 🎯 Benefícios

- ✅ **Automático:** Não precisa remover manualmente eventos passados
- ✅ **Eficiente:** Filtro feito na API (backend)
- ✅ **Seguro:** Valida datas antes de comparar
- ✅ **Claro:** Logs no console mostram quantos eventos foram retornados

## 💡 Para Administradores

### Mantendo a Planilha

Você pode:
- ✅ Deixar todos os eventos na planilha (passados e futuros)
- ✅ O sistema filtra automaticamente
- ✅ Eventos passados são ignorados na exibição

Ou pode:
- 🗑️ Remover eventos passados manualmente para manter a planilha organizada
- 📊 Mover eventos passados para outra aba de "histórico"

### Verificando o Filtro

Abra o console do servidor (`npm run dev`) e veja:
```
Retornando 15 eventos futuros para modalidade: corrida
```

Isso mostra quantos eventos passaram pelo filtro.

## ⚠️ Importante

- O formato da data DEVE ser `DD/MM/YYYY` (com barras)
- Anos com 4 dígitos são obrigatórios
- Datas inválidas não causam erros, apenas não são filtradas
- O filtro considera apenas a data (dia/mês/ano), sem horário

## 🔍 Exemplo de Código

```typescript
// Parseamento de data
"26/10/2025" → Date(2025, 9, 26) ✅
"invalid" → null (mantém evento) ✅

// Comparação
eventDate >= today → Mantém
eventDate < today → Remove
```

---

**Documentação atualizada em:** 31/10/2025

