# 📋 Instruções para Configurar o Repositório Git

## Passo 1: Renomear a pasta do projeto

Primeiro, feche o VS Code/Cursor e renomeie a pasta do projeto:

### Windows (PowerShell):
```powershell
cd C:\Users\ograc\app_mobile
Rename-Item -Path "appSilFazendoArte_25TB" -NewName "app_mobile"
```

### Windows (CMD):
```cmd
cd C:\Users\ograc\app_mobile
ren appSilFazendoArte_25TB app_mobile
```

## Passo 2: Navegar para a pasta renomeada

```bash
cd C:\Users\ograc\app_mobile\app_mobile
```

## Passo 3: Inicializar o repositório Git (se necessário)

```bash
# Remover configuração git antiga (se existir)
rm -rf .git

# Inicializar novo repositório
git init
```

## Passo 4: Configurar o repositório remoto

```bash
# Adicionar o repositório remoto
git remote add origin https://github.com/olivialourenco/app_aulamobile.git

# Verificar se foi adicionado corretamente
git remote -v
```

## Passo 5: Adicionar todos os arquivos

```bash
# Adicionar todos os arquivos ao staging
git add .

# Verificar status
git status
```

## Passo 6: Fazer o commit inicial

```bash
git commit -m "feat: Brigaderia Doce Encanto - App de confeitaria com React Native

- Tema visual de brigaderia/doceria (chocolate, rosa, creme)
- Música de fundo com toggle ON/OFF e persistência
- 3 APIs: Custom Store API, ViaCEP, Correios (frete)
- AsyncStorage para preferências e backup local
- Supabase para produtos, carrinho e lista de desejos
- CRUD completo de carrinho e wishlist
- Navegação com bottom tabs e stack navigator
- Telas: Home, Produtos, Detalhes, Carrinho, Favoritos, Endereço
- Cálculo de frete simulado
- Busca de CEP com auto-preenchimento"
```

## Passo 7: Enviar para o GitHub

```bash
# Se o repositório estiver vazio (primeira vez):
git branch -M main
git push -u origin main

# Se já existir conteúdo e você quer sobrescrever:
git push -u origin main --force
```

## 🔧 Comandos Completos (Copiar e Colar)

### Opção 1: Repositório vazio (recomendado)
```bash
cd C:\Users\ograc\app_mobile\app_mobile
rm -rf .git
git init
git remote add origin https://github.com/olivialourenco/app_aulamobile.git
git add .
git commit -m "feat: Brigaderia Doce Encanto - App de confeitaria com React Native"
git branch -M main
git push -u origin main
```

### Opção 2: Sobrescrever repositório existente
```bash
cd C:\Users\ograc\app_mobile\app_mobile
rm -rf .git
git init
git remote add origin https://github.com/olivialourenco/app_aulamobile.git
git add .
git commit -m "feat: Brigaderia Doce Encanto - App de confeitaria com React Native"
git branch -M main
git push -u origin main --force
```

## ⚠️ Notas Importantes

1. **Antes de fazer push com --force**: Certifique-se de que não há conteúdo importante no repositório remoto que você queira manter.

2. **Credenciais do Supabase**: Verifique se as credenciais em `src/services/supabaseClient.ts` estão corretas para o seu projeto Supabase.

3. **Configuração do Supabase**: Execute o script `supabase/seed.sql` no SQL Editor do Supabase antes de testar o app.

4. **Dependências**: Após clonar o repositório, execute `npm install` para instalar as dependências.

## 📱 Testando o App

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start

# Ou para plataformas específicas:
npm run android
npm run ios
npm run web
```



