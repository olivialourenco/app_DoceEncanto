# 🍫 Brigaderia Doce Encanto

Um aplicativo React Native para uma brigaderia/doceria artesanal, com tema visual de confeitaria e funcionalidades completas de e-commerce.

## 📱 Funcionalidades

### 1. Música de Fundo
- Reprodução de música em loop ao iniciar o app
- Botão de toggle ON/OFF acessível em todas as telas
- Preferência salva no AsyncStorage

### 2. APIs Integradas (3 total)

#### API Customizada (Store API)
- Endpoint simulado que retorna informações da loja
- Produtos em destaque, horário de funcionamento, promoções

#### ViaCEP
- Busca de endereço por CEP brasileiro
- Auto-preenchimento de campos de endereço
- Tratamento de erros para CEPs inválidos

#### Correios (Simulação de Frete)
- Cálculo de frete baseado em CEP de origem/destino
- Opções: SEDEX, PAC, SEDEX 10
- Valores e prazos simulados

### 3. AsyncStorage
- Preferência de música (ON/OFF)
- Último CEP utilizado
- Backup local do carrinho e lista de desejos

### 4. Supabase
- **Produtos**: CRUD completo com categorias
- **Carrinho**: Adicionar, remover, atualizar quantidade
- **Lista de Desejos**: Toggle de favoritos

### 5. UI/UX - Tema Brigaderia
- Paleta de cores: chocolate, rosa pastel, creme
- Cards arredondados com sombras suaves
- Tipografia com fonte Montserrat
- Emojis temáticos de doces

## 🗂️ Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
│   ├── CartItemCard.tsx
│   ├── CategoryFilter.tsx
│   ├── FreteCalculator.tsx
│   ├── MusicToggle.tsx
│   ├── ProductCard.tsx
│   ├── Texto.tsx
│   └── WishlistItemCard.tsx
├── contexts/           # Contextos React
│   ├── CartContext.tsx
│   ├── MusicContext.tsx
│   └── WishlistContext.tsx
├── hooks/              # Hooks customizados
│   ├── useAsyncStorage.ts
│   └── useUserId.ts
├── screens/            # Telas do app
│   ├── AddressScreen.tsx
│   ├── CartScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ProductDetailsScreen.tsx
│   ├── ProductsScreen.tsx
│   └── WishlistScreen.tsx
├── services/           # Serviços de API
│   ├── cartService.ts
│   ├── cepService.ts
│   ├── freteService.ts
│   ├── productsService.ts
│   ├── storeApiService.ts
│   ├── supabaseClient.ts
│   └── wishlistService.ts
├── theme/              # Tema e estilos
│   └── index.ts
└── types/              # Tipos TypeScript
    └── index.ts
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Expo CLI
- Conta no Supabase

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/olivialourenco/app_aulamobile.git
cd app_mobile
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o Supabase:
   - Crie um projeto no [Supabase](https://supabase.com)
   - Execute o script `supabase/seed.sql` no SQL Editor
   - Atualize as credenciais em `src/services/supabaseClient.ts`

4. Inicie o app:
```bash
npm start
```

5. Escaneie o QR code com o Expo Go (Android/iOS)

## 🗄️ Configuração do Supabase

Execute o script SQL em `supabase/seed.sql` para criar as tabelas:
- `products` - Produtos da loja
- `cart_items` - Itens do carrinho
- `wishlist_items` - Lista de desejos

O script também insere dados de exemplo com brigadeiros, bolos, tortas, cookies e docinhos.

## 📦 Dependências Principais

- **React Native** + **Expo** - Framework mobile
- **TypeScript** - Tipagem estática
- **React Navigation** - Navegação (Tabs + Stack)
- **Supabase** - Backend as a Service
- **AsyncStorage** - Armazenamento local
- **Axios** - Requisições HTTP
- **Expo Audio** - Reprodução de áudio
- **React Native Paper** - Componentes UI

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Chocolate Brown | `#5D3A1A` | Cor primária |
| Pastel Pink | `#F8B4C4` | Cor de destaque |
| Cream | `#FFF8E7` | Fundo |
| White | `#FFFFFF` | Cards |

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

Feito com 💖 por Brigaderia Doce Encanto

