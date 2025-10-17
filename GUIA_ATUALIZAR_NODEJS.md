# 📦 Guia Completo: Atualizar Node.js no Windows

Este guia vai te ajudar a atualizar do Node.js 14.15.1 para a versão mais recente (18 ou 20).

---

## 📋 Passo a Passo Completo

### ✅ PASSO 1: Verificar Versão Atual

Abra o **PowerShell** ou **Prompt de Comando** e digite:

```bash
node --version
```

Deve mostrar: `v14.15.1`

---

### 📥 PASSO 2: Baixar Node.js Mais Recente

1. **Acesse o site oficial:**
   - Abra seu navegador
   - Vá para: **https://nodejs.org/**

2. **Escolha a versão:**
   - Você verá duas opções:
     - **LTS (Long Term Support)** - Recomendado ✅
     - **Current** - Versão mais nova (opcional)
   
3. **Baixe o instalador:**
   - Clique no botão verde da versão **LTS**
   - Isso vai baixar um arquivo `.msi` (exemplo: `node-v20.18.0-x64.msi`)
   - Aguarde o download completar

---

### 🔧 PASSO 3: Desinstalar Node.js Antigo (Opcional mas Recomendado)

Para evitar conflitos, é melhor desinstalar a versão antiga primeiro:

1. **Abra o Painel de Controle:**
   - Pressione `Windows + R`
   - Digite: `control`
   - Pressione `Enter`

2. **Vá em Programas:**
   - Clique em **"Programas e Recursos"** ou **"Desinstalar um programa"**

3. **Desinstale o Node.js:**
   - Procure por **"Node.js"** na lista
   - Clique com o botão direito → **Desinstalar**
   - Siga as instruções na tela
   - **Reinicie o computador** após a desinstalação

---

### 🚀 PASSO 4: Instalar Nova Versão do Node.js

1. **Execute o instalador:**
   - Vá na pasta de Downloads
   - Dê duplo clique no arquivo `.msi` que você baixou
   - Se aparecer o controle de conta de usuário, clique em **"Sim"**

2. **Siga o assistente de instalação:**
   - **Welcome:** Clique em **"Next"**
   - **License Agreement:** Marque **"I accept"** → Clique em **"Next"**
   - **Destination Folder:** Deixe o padrão → Clique em **"Next"**
   - **Custom Setup:** Deixe tudo marcado (incluindo "Add to PATH") → Clique em **"Next"**
   - **Tools for Native Modules:** (Opcional) Pode deixar desmarcado → Clique em **"Next"**
   - **Ready to Install:** Clique em **"Install"**
   - Aguarde a instalação completar
   - **Completed:** Clique em **"Finish"**

3. **Reinicie o terminal:**
   - **Feche todos** os terminais/PowerShell/CMD abertos
   - Isso é importante para carregar as novas variáveis de ambiente

---

### ✔️ PASSO 5: Verificar Nova Instalação

1. **Abra um novo PowerShell ou Prompt de Comando**

2. **Verifique a versão do Node.js:**
   ```bash
   node --version
   ```
   Deve mostrar algo como: `v20.18.0` ou `v18.20.0`

3. **Verifique a versão do npm:**
   ```bash
   npm --version
   ```
   Deve mostrar algo como: `10.8.2` ou superior

Se ambos os comandos mostrarem as versões corretas, **sucesso!** ✅

---

### 🏃 PASSO 6: Instalar o Projeto

Agora que o Node.js está atualizado, vamos instalar o projeto:

1. **Navegue até a pasta do projeto:**
   ```bash
   cd C:\front-scraping-runner
   ```

2. **Limpe instalações anteriores (se houver):**
   ```bash
   # Se existir node_modules e package-lock.json, remova:
   Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue
   ```

3. **Limpe o cache do npm:**
   ```bash
   npm cache clean --force
   ```

4. **Instale as dependências:**
   ```bash
   npm install
   ```
   
   Isso deve instalar sem erros agora! ⚡

5. **Crie o arquivo .env.local:**
   ```bash
   echo GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/13_EmYHqmjJd9tvp6iihAaKKgRxnOi9gwSIwavgfCn0Y/export?format=csv&gid=672877934 > .env.local
   ```

6. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

7. **Abra no navegador:**
   - Vá para: **http://localhost:3000**
   - Você deve ver a página de corridas de rua! 🎉

---

## 🔍 Solução de Problemas

### Problema: "node não é reconhecido como um comando"

**Solução:**
1. Reinicie o computador
2. Ou adicione manualmente ao PATH:
   - Pressione `Windows + Pause/Break`
   - Clique em **"Configurações avançadas do sistema"**
   - Clique em **"Variáveis de Ambiente"**
   - Na seção "Variáveis do sistema", encontre **"Path"**
   - Clique em **"Editar"**
   - Adicione: `C:\Program Files\nodejs\`
   - Clique em **"OK"** em todas as janelas
   - Reinicie o terminal

### Problema: Erro de permissão durante instalação

**Solução:**
- Execute o PowerShell ou CMD como **Administrador**
- Clique com botão direito → **"Executar como administrador"**

### Problema: npm install ainda dá erro

**Solução:**
```bash
# Limpe tudo e tente novamente
npm cache clean --force
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

---

## 📊 Resumo Visual

```
┌─────────────────────────────────────────┐
│  ANTES: Node.js v14.15.1 ❌            │
│         (Incompatível com Next.js 14)   │
└─────────────────────────────────────────┘
                  ↓
         [Download + Instalação]
                  ↓
┌─────────────────────────────────────────┐
│  DEPOIS: Node.js v20.x.x ✅            │
│          (Compatível com tudo!)         │
└─────────────────────────────────────────┘
                  ↓
         [npm install + npm run dev]
                  ↓
┌─────────────────────────────────────────┐
│  🎉 PROJETO FUNCIONANDO! 🎉            │
│  http://localhost:3000                  │
└─────────────────────────────────────────┘
```

---

## ✨ Benefícios da Atualização

- ✅ Compatibilidade total com Next.js 14
- ✅ Performance melhorada
- ✅ Recursos modernos do JavaScript
- ✅ Correções de segurança
- ✅ Suporte a longo prazo (LTS)

---

## 🆘 Precisa de Ajuda?

Se tiver qualquer problema durante a atualização, me avise qual erro apareceu e em qual passo você está!

Boa sorte! 🚀

