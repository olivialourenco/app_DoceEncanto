# 🔧 Solução para Problema de Conexão Expo Go

## ⚠️ Problema
O Expo Go mostra: `Could not connect to the server` mesmo com URL correta (`exp://192.168.15.11:8084`)

## ✅ Soluções (tente na ordem):

### 1️⃣ **Abrir Firewall do Windows**

1. Pressione `Windows + R`
2. Digite: `wf.msc` e pressione Enter
3. Clique em **"Regras de Entrada"** (Inbound Rules) no lado esquerdo
4. Clique em **"Nova Regra"** (New Rule) no lado direito
5. Selecione **"Porta"** → Próximo
6. Selecione **"TCP"** e digite a porta: `8084` → Próximo
7. Selecione **"Permitir a conexão"** → Próximo
8. Marque todas as opções (Domínio, Privada, Pública) → Próximo
9. Nome: `Expo Metro Bundler` → Concluir

**Repita para a porta 8081 também!**

### 2️⃣ **Verificar se estão na mesma rede Wi-Fi**

- Computador e celular DEVEM estar na mesma rede Wi-Fi
- Verifique no celular: Configurações > Wi-Fi > Nome da rede
- Verifique no computador: `ipconfig` no terminal

### 3️⃣ **Desabilitar temporariamente o Antivírus**

Alguns antivírus bloqueiam conexões de rede. Desabilite temporariamente para testar.

### 4️⃣ **Usar Expo Go via QR Code na Web**

1. No terminal onde está rodando `expo start`, pressione `w` para abrir no navegador
2. Ou acesse: `http://localhost:8084`
3. Escaneie o QR code que aparece na página web

### 5️⃣ **Reiniciar tudo**

1. Feche completamente o Expo Go no celular
2. Pare o servidor Expo (Ctrl+C)
3. Execute: `npx expo start --clear`
4. Escaneie o QR code novamente

---

## 🆘 Se NADA funcionar:

Use o modo **Development Build** ou teste em um **emulador Android/iOS** ao invés do Expo Go.



