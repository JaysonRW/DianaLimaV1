# Plano de Implementação: Jornada no Lar em Tela Única com Empilhamento de Cards (GSAP Scroll-Pinning)

Atualização arquitetural e interativa da seção **"Como Funciona a Avaliação e a Reabilitação em Casa"** (`#como-funciona`), transformando a grade estática de 4 colunas em uma experiência imersiva de tela única fixa (*Pinned Viewport*), onde cada movimento do scroll empilha suavemente as etapas `01` a `04` com profundidade tridimensional sutil.

## User Review & Critical Decisions

> [!IMPORTANT]
> As decisões abaixo consolidam suas escolhas para o comportamento visual e interativo da seção:

- **Disposição em Tela Dividida Fixa (Confirmado)**: Durante a rolagem pela seção, a tela permanece ancorada (*pinned*). À **esquerda**, ficam fixos o título da seção, a proposta de conforto domiciliar, um indicador de progresso ativo (`Etapa 01 → 04`) e os 3 pilares de benefício (Zero Estresse de Deslocamento, Ambiente Familiar e Integração com Cuidadores). À **direita**, fica o palco onde os 4 cards das etapas sobem e se sobrepõem um a um.
- **Empilhamento com Profundidade / Deck Stack (Confirmado)**: O usuário inicia visualizando o **Card da Etapa 01**. Ao rolar o mouse, o **Card da Etapa 02** desliza de baixo para cima sobrepondo o primeiro, enquanto o Card 01 recua levemente (`scale: 0.94`, deslocamento superior sutil de `14px` por nível e leve redução de brilho/opacidade), mantendo a aba superior das etapas anteriores visível no topo da pilha até completar a **Etapa 04**.

---

## 1. Overview & Core Concept

- **O Que Faz**: Guia o familiar ou paciente pelas 4 fases do atendimento domiciliar de Diana Lima em uma única tela interativa controlada pelo scroll (ou por clique direto nos indicadores de etapa).
- **Por Que Melhora a Experiência**: Em vez de apresentar 4 blocos de texto simultâneos que competem pela atenção, a leitura torna-se sequencial, cadenciada e envolvente, refletindo o próprio conceito de *"respeitar o ritmo e cada etapa do processo terapêutico"*.

---

## 2. User Experience & Visual Design

### Fluxo de Interação (Passo a Passo no Scroll)
1. **Entrada na Seção (`#como-funciona`)**: Assim que a seção atinge o centro da tela, o `ScrollTrigger` fixa o contêiner (`pin: true`). O **Card 01 (Acolhimento Inicial via WhatsApp)** já está 100% visível em primeiro plano, e o indicador lateral marca a etapa `01 / 04`.
2. **1º Scroll $\rightarrow$ Etapa 02 (Avaliação Neurocognitiva no Lar)**: O Card 01 recua suavemente para o topo da pilha (`scale(0.94)`), e o Card 02 sobe suavemente assumindo o foco principal. A barra lateral atualiza o indicador ativo para a Etapa 02.
3. **2º Scroll $\rightarrow$ Etapa 03 (Plano Terapêutico Individualizado)**: O Card 02 recua sobre o Card 01, e o Card 03 entra em destaque.
4. **3º Scroll $\rightarrow$ Etapa 04 (Intervenção Contínua e Orientação Familiar)**: O Card 04 assume o topo da pilha, exibindo também um botão de ação rápida para iniciar a conversa no WhatsApp. Ao concluir a leitura da Etapa 04, o próximo scroll libera suavemente a tela para a seção **"Sobre Diana Lima"**.

### Identidade Visual dos Cards Empilhados
- **Superfícies e Contraste**: Cada card possui fundo sólido (`#FFFFFF` alternando sutis detalhes em `#FFF9FB` e `#FDF2F7`), borda refinada (`#E9D5FF`) e sombra suave para destacar a separação física entre o card da frente e os cards empilhados atrás.
- **Cabeçalho de Índice Visível na Pilha**: O topo de cada card traz a identificação clara da etapa (`Etapa 01`, `Etapa 02`, `Etapa 03`, `Etapa 04`) para que, mesmo quando recuado no empilhamento, o usuário perceba visualmente a camada acumulada.
- **Acessibilidade e Navegação Direta**: Além da rolagem do mouse, o painel esquerdo contará com botões clicáveis das 4 etapas (permitindo saltar diretamente para qualquer etapa) e respeitará `prefers-reduced-motion` e o modo de **Alto Contraste AAA**.

---

## 3. Key Product Decisions & Trade-Offs

- **Decisão 1: GSAP Timeline com `pin: true` e `scrub` Suavizado + `snap` Inteligente**
  - *Abordagem Escolhida*: Uma timeline GSAP dedicada no componente `HomeCareStackedSection`, utilizando `pin: true`, `scrub: 0.6` (integrado ao Lenis Smooth Scroll) e `snap: 1 / 3` para que cada movimento da roda do mouse estabilize confortavelmente na etapa correspondente, sem deixar um card "parado no meio do caminho".
  - *Por quê*: Garante que o usuário sinta controle preciso etapa por etapa (1 $\rightarrow$ 2 $\rightarrow$ 3 $\rightarrow$ 4) com fluidez cinematográfica.
- **Decisão 2: Animação Exclusiva de Propriedades de Compositor (`transform` e `opacity`)**
  - *Abordagem Escolhida*: Os cards ficam posicionados de forma absoluta dentro do palco direito, e o GSAP anima exclusivamente `yPercent`, `y`, `scale` e `opacity`.
  - *Por quê*: Mantém 60fps constantes sem recalcular o layout da página durante o scroll e evita conflitos de altura com as seções seguintes (`#sobre-mim` e `#duvidas`).

---

## 4. Technical Architecture & Data Strategy

### Diagrama de Arquitetura da Seção Empilhada

```
┌──────────────────────────────────────────────────────────────────────────────┐
│           Seção #como-funciona (GSAP ScrollTrigger Pin Container)            │
│                     [Duração de Scroll: ~280vh | 4 Etapas]                   │
├───────────────────────────────────┬──────────────────────────────────────────┤
│   COLUNA ESQUERDA (Fixa 5 cols)   │      COLUNA DIREITA (Palco 7 cols)       │
│                                   │                                          │
│ • Kicker & Título H2              │  ┌────────────────────────────────────┐  │
│ • Descrição da Jornada            │  │ Etapa 01 (scale: 0.91, y: 0px)     │  │
│                                   │  ├────────────────────────────────────┤  │
│ • Navegador de Progresso (01-04): │  │ Etapa 02 (scale: 0.94, y: 16px)    │  │
│   [●] 01. Acolhimento Inicial     │  ├────────────────────────────────────┤  │
│   [●] 02. Avaliação no Lar        │  │ Etapa 03 (scale: 0.97, y: 32px)    │  │
│   [●] 03. Plano Individualizado   │  ├────────────────────────────────────┤  │
│   [○] 04. Intervenção e Família   │  │                                    │  │
│                                   │  │   ETAPA 04 EM FOCO (scale: 1.0)    │  │
│ • 3 Pilares Operacionais:         │  │   - Ícone + Número da Etapa        │  │
│   - Zero Estresse de Deslocamento │  │   - Título & Explicação Detalhada  │  │
│   - Ambiente Familiar e Seguro    │  │   - Destaques Práticos no Lar      │  │
│   - Integração com Cuidadores     │  │   - Botão de Ação WhatsApp         │  │
│                                   │  └────────────────────────────────────┘  │
└───────────────────────────────────┴──────────────────────────────────────────┘
```

### Mapeamento de Estado e Interatividade
- **Componente Dedicado (`HomeCareStackedSection.tsx`)**: Encapsula a lógica de `ScrollTrigger` da seção `#como-funciona`, mantendo o `App.tsx` limpo e garantindo `ScrollTrigger.refresh()` automático para não afetar as animações das seções posteriores.
- **Sincronização de Índice Ativo (`activeStepIndex`)**: O callback `onUpdate` do `ScrollTrigger` atualiza o indicador visual de qual etapa (`0` a `3`) está em foco no momento, iluminando o passo correspondente na coluna esquerda e atualizando a barra de progresso vertical.
