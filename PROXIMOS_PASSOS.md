# 🎯 Próximos Passos - Após Atualizar Node.js

Após concluir a atualização do Node.js seguindo o `GUIA_ATUALIZAR_NODEJS.md`, siga estes passos:

---

## 📦 1. Limpar Instalação Anterior

Abra o PowerShell na pasta do projeto (`C:\front-scraping-runner`) e execute:

```bash
# Remove node_modules e package-lock.json se existirem
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue

# Limpa o cache do npm
npm cache clean --force
```

---

## ⚡ 2. Instalar Dependências

```bash
npm install
```

Agora **não deve dar nenhum erro**! Você verá algo como:

```
added 345 packages in 45s
```

---

## 🔐 3. Criar Arquivo .env.local

Execute no PowerShell:

```bash
echo GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/13_EmYHqmjJd9tvp6iihAaKKgRxnOi9gwSIwavgfCn0Y/export?format=csv&gid=672877934 > .env.local
```

Ou crie manualmente:
1. Crie um arquivo chamado `.env.local` na raiz do projeto
2. Adicione esta linha:
```
GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/13_EmYHqmjJd9tvp6iihAaKKgRxnOi9gwSIwavgfCn0Y/export?format=csv&gid=672877934
```

---

## 🚀 4. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

Você deve ver:

```
  ▲ Next.js 14.2.5
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.5s
```

---

## 🌐 5. Acessar a Aplicação

1. Abra seu navegador
2. Vá para: **http://localhost:3000**
3. Você deve ver a página de **Corridas de Rua**! 🎉

---

## ✨ O que você verá:

- **Header azul** com gradiente
- **Barra de busca** para filtrar corridas
- **Grid de cards** com as corridas
- Cada card mostra:
  - 📅 Data da corrida
  - 📍 Cidade
  - 🏃 Nome da corrida
  - 📏 Distância
  - 🔗 Link para mais informações

---

## 🧪 Testar Funcionalidades

### Busca
Digite na barra de busca:
- Nome de uma cidade (ex: "São Paulo")
- Distância (ex: "10k")
- Nome de corrida

Os cards serão filtrados em tempo real!

### Responsividade
Redimensione a janela do navegador:
- **Desktop**: 3 colunas de cards
- **Tablet**: 2 colunas
- **Mobile**: 1 coluna

---

## 📝 Comandos Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build

# Iniciar servidor de produção
npm start

# Executar linter
npm run lint
```

---

## 🎨 Personalizar o Projeto

### Alterar cores:
Edite `app/globals.css` para mudar o gradiente de fundo

### Alterar planilha:
Edite `.env.local` e coloque a URL da sua planilha

### Adicionar filtros:
Edite `components/SearchBar.tsx` e `app/page.tsx`

---

## ✅ Checklist Final

- [ ] Node.js atualizado para v18 ou v20
- [ ] `npm install` executado com sucesso
- [ ] Arquivo `.env.local` criado
- [ ] `npm run dev` rodando sem erros
- [ ] Página abrindo em http://localhost:3000
- [ ] Busca funcionando
- [ ] Cards aparecendo corretamente

---

## 🎉 Pronto!

Seu projeto está funcionando perfeitamente! Agora você pode:
- Desenvolver novas features
- Personalizar o design
- Fazer deploy (Vercel, Netlify, etc.)

Qualquer dúvida, é só avisar! 🚀


