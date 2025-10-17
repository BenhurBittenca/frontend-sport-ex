# 🏃 Corridas de Rua

Uma aplicação Next.js 14 moderna para listar e filtrar corridas de rua no Brasil.

## ✨ Características

- ⚡ **Next.js 14** com App Router
- 🎨 **Tailwind CSS** para estilização moderna
- 📊 **SWR** para fetching de dados eficiente
- 🔍 **Busca em tempo real** por cidade, nome ou distância
- 📱 **Design responsivo** com gradientes azuis e cards brancos
- 🌐 **Integração com Google Sheets** para dados dinâmicos

## 🚀 Como Usar

### Pré-requisitos

- **Node.js 18+** instalado (recomendado: versão LTS mais recente)
- npm ou yarn

> ⚠️ **IMPORTANTE**: Se você ainda não atualizou o Node.js, veja o arquivo `GUIA_ATUALIZAR_NODEJS.md` para instruções detalhadas

### Instalação

1. Clone o repositório ou use os arquivos fornecidos

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env.local` na raiz do projeto com:
```
GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/13_EmYHqmjJd9tvp6iihAaKKgRxnOi9gwSIwavgfCn0Y/export?format=csv&gid=672877934
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📁 Estrutura do Projeto

```
├── app/
│   ├── api/
│   │   └── races/
│   │       └── route.ts          # API route para buscar dados do CSV
│   ├── globals.css               # Estilos globais com Tailwind
│   ├── layout.tsx                # Layout raiz da aplicação
│   └── page.tsx                  # Página principal
├── components/
│   ├── RaceCard.tsx              # Card individual de corrida
│   └── SearchBar.tsx             # Barra de busca
├── types/
│   └── race.ts                   # Tipos TypeScript
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎨 Design

- **Gradientes azuis** no header e botões
- **Cards brancos** com sombras suaves
- **Layout responsivo** que se adapta a diferentes tamanhos de tela
- **Animações suaves** em hover e transições
- **Ícones SVG** para melhor experiência visual

## 📊 Dados

Os dados são lidos de uma planilha pública do Google Sheets com as seguintes colunas:

- **DATA** - Data da corrida
- **CIDADE** - Cidade onde ocorre a corrida
- **NOME DA CORRIDA** - Nome do evento
- **DISTANCIA** - Distâncias disponíveis
- **LINK** - Link para mais informações

## 🔧 Tecnologias Utilizadas

- **Next.js 14.2.5** - Framework React com App Router
- **React 18.3** - Biblioteca para interfaces
- **TypeScript 5.5** - Tipagem estática
- **Tailwind CSS 3.4** - Framework CSS utilitário
- **SWR 2.2** - React Hooks para data fetching
- **PapaParse 5.4** - Parser de CSV

## 📝 Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa o linter
```

## 🌐 Deploy

Para fazer deploy da aplicação:

1. Faça build do projeto:
```bash
npm run build
```

2. Faça deploy em plataformas como:
   - **Vercel** (recomendado para Next.js)
   - **Netlify**
   - **AWS**
   - **Azure**
   - **Google Cloud**

## 📄 Licença

Este projeto é de código aberto e está disponível para uso livre.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

