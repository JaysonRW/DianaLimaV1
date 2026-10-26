import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MessageCircle,
  Home,
  ClipboardCheck,
  HeartHandshake,
  Clock,
  ShieldCheck,
  Users,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HomeCareStepItem {
  number: string;
  shortTitle: string;
  stepTitle: string;
  subtitle: string;
  description: string;
  highlights: string[];
  badgeText: string;
  icon: React.ReactNode;
}

const STACKED_STEPS: HomeCareStepItem[] = [
  {
    number: '01',
    shortTitle: 'Acolhimento Inicial',
    stepTitle: '01. Acolhimento Inicial via WhatsApp',
    subtitle: 'Escuta atenta da história clínica e das necessidades da família',
    description:
      'Conversa inicial com o paciente ou familiar para compreender a história clínica, as demandas principais e agendar a primeira visita no horário mais tranquilo para a família.',
    highlights: [
      'Compreensão acolhedora do momento atual do paciente e da rotina da casa',
      'Definição do dia e turno mais confortáveis para a visita domiciliar',
      'Orientações prévias simples para que o familiar se sinta seguro',
    ],
    badgeText: 'Primeiro Contato Humanizado',
    icon: <MessageCircle className="w-5 h-5 text-[#6B1D57]" aria-hidden="true" />,
  },
  {
    number: '02',
    shortTitle: 'Avaliação no Lar',
    stepTitle: '02. Avaliação Neurocognitiva no Lar',
    subtitle: 'Observação cuidadosa no ambiente real, sem estresse de deslocamento',
    description:
      'Observação cuidadosa das capacidades preservadas, do funcionamento cognitivo e da dinâmica do ambiente doméstico, sem o estresse de deslocamento até consultórios.',
    highlights: [
      'Avaliação de memória, atenção, linguagem, percepção e práxis funcional',
      'Identificação das potencialidades remanescentes e interesses biográficos',
      'Análise do espaço doméstico para torná-lo facilitador da autonomia',
    ],
    badgeText: 'Conforto e Segurança Residencial',
    icon: <Home className="w-5 h-5 text-[#6B1D57]" aria-hidden="true" />,
  },
  {
    number: '03',
    shortTitle: 'Plano Individualizado',
    stepTitle: '03. Plano Terapêutico Individualizado',
    subtitle: 'Estratégias sob medida respeitando o ritmo biológico e emocional',
    description:
      'Elaboração de estratégias de reabilitação e estimulação sob medida, respeitando o ritmo biológico, emocional e os interesses reais da pessoa atendida.',
    highlights: [
      'Metas terapêuticas claras e conectadas ao dia a dia do paciente',
      'Materiais de estimulação cognitiva e Comunicação Alternativa adaptados',
      'Respeito integral ao tempo de resposta e à fadiga de cada indivíduo',
    ],
    badgeText: 'Planejamento sob Medida',
    icon: <ClipboardCheck className="w-5 h-5 text-[#6B1D57]" aria-hidden="true" />,
  },
  {
    number: '04',
    shortTitle: 'Intervenção e Família',
    stepTitle: '04. Intervenção Contínua e Orientação Familiar',
    subtitle: 'Sessões domiciliares regulares e parceria ativa com cuidadores',
    description:
      'Sessões domiciliares regulares aliadas a orientações práticas para que familiares e cuidadores saibam como estimular e apoiar a autonomia no dia a dia.',
    highlights: [
      'Sessões práticas de reabilitação e neuroplasticidade no conforto de casa',
      'Apoio e orientação empática para familiares e cuidadores formais',
      'Acompanhamento contínuo da evolução e adaptação constante dos estímulos',
    ],
    badgeText: 'Evolução e Apoio Contínuo',
    icon: <HeartHandshake className="w-5 h-5 text-[#6B1D57]" aria-hidden="true" />,
  },
];

interface HomeCareStackedSectionProps {
  onOpenTriage: (serviceName: string) => void;
}

export const HomeCareStackedSection: React.FC<HomeCareStackedSectionProps> = ({
  onOpenTriage,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !sectionRef.current || !pinWrapperRef.current) {
      return;
    }

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length < 4) return;

    const ctx = gsap.context(() => {
      // Estado inicial: Card 0 visível em primeiro plano; Cards 1, 2 e 3 posicionados abaixo do palco
      gsap.set(cards[0], {
        yPercent: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        zIndex: 10,
      });

      cards.slice(1).forEach((card, idx) => {
        gsap.set(card, {
          yPercent: 112,
          y: 0,
          scale: 1,
          opacity: 0,
          zIndex: 20 + idx * 10,
        });
      });

      // Timeline mestre com 3 transições (Etapa 1 -> 2, Etapa 2 -> 3, Etapa 3 -> 4)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: pinWrapperRef.current,
          start: 'top top+=68',
          end: '+=2400',
          scrub: 0.55,
          snap: {
            snapTo: [0, 1 / 3, 2 / 3, 1],
            duration: { min: 0.25, max: 0.55 },
            delay: 0.04,
            ease: 'power2.inOut',
          },
          onUpdate: (self) => {
            const index = Math.min(
              3,
              Math.max(0, Math.round(self.progress * 3))
            );
            setActiveStep(index);
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger || null;

      // Transição 1: Card 2 sobe e sobrepõe Card 1; Card 1 recua no topo
      tl.to(
        cards[1],
        {
          yPercent: 0,
          y: 18,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        },
        0
      ).to(
        cards[0],
        {
          scale: 0.94,
          y: -8,
          opacity: 0.72,
          duration: 1,
          ease: 'power2.out',
        },
        0
      );

      // Transição 2: Card 3 sobe e sobrepõe Card 2; Cards 1 e 2 recuam em profundidade
      tl.to(
        cards[2],
        {
          yPercent: 0,
          y: 36,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        },
        1
      )
        .to(
          cards[1],
          {
            scale: 0.95,
            y: 8,
            opacity: 0.76,
            duration: 1,
            ease: 'power2.out',
          },
          1
        )
        .to(
          cards[0],
          {
            scale: 0.9,
            y: -16,
            opacity: 0.48,
            duration: 1,
            ease: 'power2.out',
          },
          1
        );

      // Transição 3: Card 4 sobe e sobrepõe Card 3; Cards 1, 2 e 3 formam a pilha no topo
      tl.to(
        cards[3],
        {
          yPercent: 0,
          y: 54,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        },
        2
      )
        .to(
          cards[2],
          {
            scale: 0.96,
            y: 24,
            opacity: 0.8,
            duration: 1,
            ease: 'power2.out',
          },
          2
        )
        .to(
          cards[1],
          {
            scale: 0.92,
            y: 2,
            opacity: 0.54,
            duration: 1,
            ease: 'power2.out',
          },
          2
        )
        .to(
          cards[0],
          {
            scale: 0.88,
            y: -22,
            opacity: 0.34,
            duration: 1,
            ease: 'power2.out',
          },
          2
        );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Permite clicar nos indicadores de etapa na coluna esquerda para navegar diretamente até o card
  const handleSelectStepClick = (targetIndex: number) => {
    const st = scrollTriggerRef.current;
    if (st) {
      const targetProgress = targetIndex / 3;
      const targetScrollY = st.start + (st.end - st.start) * targetProgress;
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth',
      });
    } else {
      setActiveStep(targetIndex);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      aria-labelledby="heading-como-funciona"
      className="relative bg-white border-y border-[#F3E3EC] hc-surface"
    >
      {/* Contêiner Fixado (Pinned) durante o Scroll das 4 Etapas */}
      <div
        ref={pinWrapperRef}
        className="w-full min-h-[calc(100vh-4.5rem)] flex flex-col justify-center py-10 sm:py-14 px-4 sm:px-8"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* COLUNA ESQUERDA FIXA: Título, Navegador de Progresso (01 a 04) e Benefícios */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#6B1D57]">
                  <span>Conforto, Segurança e Rigor Clínico</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">
                    Etapa {activeStep + 1} de 4
                  </span>
                </div>

                <h2
                  id="heading-como-funciona"
                  className="gsap-section-heading font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E1024] mt-2 leading-tight"
                >
                  Como Funciona a Avaliação e a Reabilitação em Casa
                </h2>

                <p className="mt-3 text-sm sm:text-base text-[#4A3556] hc-muted leading-relaxed">
                  Role a página para acompanhar cada etapa da nossa jornada domiciliar. O cuidado no lar elimina barreiras de locomoção e transforma a residência em aliada direta da recuperação.
                </p>

                {/* Navegador Interativo das 4 Etapas Sincronizado com o Scroll */}
                <div
                  className="mt-6 space-y-2"
                  role="tablist"
                  aria-label="Etapas do atendimento domiciliar"
                >
                  {STACKED_STEPS.map((item, idx) => {
                    const isCurrent = activeStep === idx;
                    const isCompleted = idx < activeStep;
                    return (
                      <button
                        key={item.number}
                        type="button"
                        role="tab"
                        aria-selected={isCurrent}
                        onClick={() => handleSelectStepClick(idx)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                          isCurrent
                            ? 'bg-[#FDF2F7] border-[#6B1D57] shadow-2xs'
                            : isCompleted
                            ? 'bg-[#FFF9FB] border-[#E9D5FF] opacity-85 hover:opacity-100'
                            : 'bg-white border-[#F3E3EC] opacity-65 hover:opacity-95'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-display font-bold tabular-nums flex items-center justify-center shrink-0 transition-colors ${
                              isCurrent
                                ? 'bg-[#6B1D57] text-white'
                                : isCompleted
                                ? 'bg-[#E9D5FF] text-[#6B1D57]'
                                : 'bg-[#FDF2F7] text-[#583E68]'
                            }`}
                          >
                            {item.number}
                          </span>
                          <span
                            className={`text-xs sm:text-sm font-display truncate ${
                              isCurrent
                                ? 'font-bold text-[#1E1024]'
                                : 'font-medium text-[#3B1D54]'
                            }`}
                          >
                            {item.shortTitle}
                          </span>
                        </div>

                        <span className="text-[11px] font-semibold text-[#6B1D57] shrink-0">
                          {isCurrent
                            ? 'Em exibição'
                            : isCompleted
                            ? 'Concluída'
                            : 'Próxima'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pilares de Benefício Domiciliar Compactos na Base da Coluna Esquerda */}
              <div className="hidden sm:grid grid-cols-3 gap-3 mt-7 pt-6 border-t border-[#F3E3EC]">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E1024]">
                    <Clock
                      className="w-4 h-4 text-[#6B1D57] shrink-0"
                      aria-hidden="true"
                    />
                    <span>Zero Trânsito</span>
                  </div>
                  <p className="text-xs text-[#4A3556] hc-muted leading-snug">
                    Energia preservada para a sessão.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E1024]">
                    <ShieldCheck
                      className="w-4 h-4 text-[#6B1D57] shrink-0"
                      aria-hidden="true"
                    />
                    <span>Lar Seguro</span>
                  </div>
                  <p className="text-xs text-[#4A3556] hc-muted leading-snug">
                    Referências afetivas preservadas.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E1024]">
                    <Users
                      className="w-4 h-4 text-[#6B1D57] shrink-0"
                      aria-hidden="true"
                    />
                    <span>Família Junto</span>
                  </div>
                  <p className="text-xs text-[#4A3556] hc-muted leading-snug">
                    Orientação direta aos cuidadores.
                  </p>
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA: PALCO DE EMPILHAMENTO PROGRESSIVO DOS 4 CARDS */}
            <div className="lg:col-span-7">
              <div className="relative w-full h-[460px] sm:h-[470px] lg:h-[490px] flex items-start justify-center pt-4">
                {STACKED_STEPS.map((item, idx) => (
                  <article
                    key={item.number}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    className=" absolute inset-x-0 top-0 rounded-2xl bg-white border border-[#E2CED8] hc-surface shadow-xl p-6 sm:p-8 flex flex-col justify-between min-h-[390px] sm:min-h-[410px] origin-top will-change-transform"
                  >
                    {/* Topo do Card (Permanece visível na borda superior mesmo quando empilhado) */}
                    <div>
                      <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F3E3EC]">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2.5 py-1 rounded-lg bg-[#FDF2F7] border border-[#E9D5FF] font-display text-xs font-extrabold text-[#6B1D57] tabular-nums">
                            ETAPA {item.number} DE 04
                          </span>
                          <span className="text-xs font-semibold text-[#583E68] hc-muted hidden sm:inline">
                            · {item.badgeText}
                          </span>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-[#FDF2F7] border border-[#F3E3EC] flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                      </div>

                      {/* Corpo Principal do Card */}
                      <div className="mt-5">
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1E1024] leading-snug">
                          {item.stepTitle}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-[#6B1D57] mt-1">
                          {item.subtitle}
                        </p>
                        <p className="text-sm sm:text-base text-[#3B1D54] hc-muted mt-3.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Lista de Entregas Práticas desta Etapa */}
                      <div className="mt-5 pt-4 border-t border-[#F3E3EC]">
                        <ul className="space-y-2">
                          {item.highlights.map((highlight, hIdx) => (
                            <li
                              key={hIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A3556] hc-muted"
                            >
                              <CheckCircle2
                                className="w-4 h-4 text-[#6B1D57] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Rodapé do Card */}
                    <div className="mt-6 pt-4 border-t border-[#F3E3EC] flex items-center justify-between gap-4">
                      <span className="text-xs font-medium text-[#583E68] hc-muted">
                        No ritmo biológico, cognitivo e emocional do paciente
                      </span>

                      {idx === 3 ? (
                        <button
                          type="button"
                          onClick={() =>
                            onOpenTriage(
                              'Reabilitação Cognitiva Pós-AVC (Destaque)'
                            )
                          }
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6B1D57] hover:bg-[#521442] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer hc-primary-btn whitespace-nowrap shrink-0"
                        >
                          <span>Iniciar Etapa 01 no WhatsApp</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSelectStepClick(idx + 1)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B1D57] hover:underline cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <span>Role para Etapa 0{idx + 2}</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
