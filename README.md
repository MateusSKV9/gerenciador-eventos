<h1 align="center" >📅 Gerenciador de Eventos 📅</h1>

<!-- <img src="preview.png" alt="Imagem do projeto" style="border: 1px solid #ccc; display: inline-block;" /> -->
<div style="border: 1px solid #ccc; display: inline-block;">
  <img src="preview.png" alt="Imagem do projeto" width="100%">
</div>

## ℹ️ Sobre
Este projeto é uma **aplicação web desenvolvida em React** para **criação e gerenciamento de eventos**.  
O objetivo foi construir uma solução prática para organização de compromissos e datas importantes, ao mesmo tempo em que foram aplicados conceitos avançados do **ecossistema React**, incluindo arquitetura por features, Context API, hooks personalizados e otimizações de performance.


#### 📍 Acesse o link: https://gerenciador-eventos-swart.vercel.app/

---

## 📋 Funcionalidades

- **Criação de eventos:** o usuário pode cadastrar novos eventos informando:

  - Nome
  - Data de expiração
  - Categoria (opcional)
  - Descrição (opcional)

- **Listagem de eventos:**

  - Visualização em **cards**
  - Visualização em **lista**
  - Pesistência de exibição via LocalStorage

- **Edição de eventos:** eventos cadastrados podem ser editados por meio de modal.

- **Exclusão de eventos:** remoção de eventos já cadastrados.

- **Visualização inteligente de tempo por evento:**
  - Exibição de tempo restante em **dias, semanas ou meses**
  - Alternância dinâmica da unidade de tempo por card
  - **Barra de progresso visual** baseada no tempo decorrido
  - **Cores dinâmicas** na barra conforme o nível de urgência (verde, amarelo, vermelho)


- **Gerenciamento de categorias:**

  - Criação de categorias
  - Listagem de categorias
  - Edição de categorias
  - Remoção de categorias
  - Associação de categorias aos eventos

- **Cálculo automático de tempo:**

  - Dias restantes até o evento
  - Dias decorridos desde a criação
  - Barra de regresso por evento

- **Ordenação de eventos:**
  - Sem ordenação
  - Menor prazo primeiro
  - Maior prazo primeiro
  - Nome (A → Z)
  - Nome (Z → A)

---

## 🛠️ Requisitos Técnicos

- **Validação básica de formulários:** prevenção de campos inválidos.
- **Responsividade:** layout adaptado para diferentes tamanhos de tela.
- **Cálculo dinâmico de datas:** lógica isolada em funções utilitárias.
- **Estado global:** gerenciamento centralizado via Context API.
- **Persistência de dados:** LocalStorage, permitindo operações CRUD persistentes.

---

## 🧠 Arquitetura e Padrões Utilizados

- **Arquitetura baseada em features:**  
  Organização do código por domínio (`events` e `categories`), facilitando manutenção e escalabilidade.

- **Componentização reutilizável:**  
  Componentes compartilhados centralizados em `shared/components`  
  (Button, Input, Modal, Select, ItemMenu, etc.)

- **Separação de responsabilidades:**

  - Lógica de negócio isolada em **hooks personalizados**
  - Estado global encapsulado em **Context Providers**
  - Funções puras em **utils**

- **Composição de componentes:**  
  Uso de um componente base/inteligente (`EventBase`) para alternar dinamicamente entre:

  - `EventCard`
  - `EventRow`

- **CSS Modules:**  
  Estilos escopados por componente, evitando conflitos globais.

---

## ⚛️ Hooks e Recursos do React

### Hooks nativos

- `useState` — gerenciamento de estado local
- `useEffect` — efeitos colaterais e sincronização
- `useMemo` — otimização de valores computados (ex: ordenação)
- `useCallback` — memoização de funções
- `useContext` — estado global compartilhado

### Hooks personalizados

- `useEvents` — gerenciamento completo de eventos (CRUD, regras de negócio)
- `useCategories` — controle e manipulação de categorias
- `useModal` — controle reutilizável de modais

---

## 🌐 Gerenciamento de Estado Global

- **Context API** utilizada para:
  - Compartilhamento de eventos
  - Compartilhamento de categorias
- Redução de **prop drilling** através de providers bem definidos
- Uso consciente de props quando o escopo é local e controlado

---

## 🧭 Roteamento e Navegação

- **React Router DOM** para controle de rotas da aplicação
- Uso de:
  - `useSearchParams` para passagem e captura de id via URL, possibilitando a edição correta de evento
- Separação clara entre **páginas** e **componentes**

---

## 📁 Estrutura de Pastas

A aplicação segue uma organização pensada para projetos escaláveis:

```text
src
 ┣ features
 ┃ ┣ categories
 ┃ ┗ events
 ┣ hooks
 ┣ providers
 ┣ shared
 ┃ ┣ components
 ┃ ┗ layout
 ┣ pages
 ┃ ┣ Categories
 ┃ ┗ Events
 ┣ utils
 ┃ ┗ date.js
```

## 🚀 Tecnologias Utilizadas

- **React** (Hooks, Context API, React Router)
- **JavaScript (ES6+)**
- **CSS Modules**
- **Vite**
- **LocalStorage**

---

## 📄 Licença

Este projeto está sob a licença **MIT**.
Consulte o arquivo `LICENSE` para mais informações.
