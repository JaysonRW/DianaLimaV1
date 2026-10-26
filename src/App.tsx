import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  MapPin,
  MessageCircle,
  Brain,
  HeartHandshake,
  Sparkles,
  MessageSquareHeart,
  GraduationCap,
  CheckCircle2,
  ChevronDown,
  Edit3,
  RotateCcw,
  Save,
  Eye,
  ArrowRight,
  Clock,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { BrandLogoLockup } from './components/BrandLogoLockup';
import { HeroHomeCareIllustration, NeuroplasticityVisualCard } from './components/ClinicalVisuals';
import { HomeCareStackedSection } from './components/HomeCareStackedSection';
import { NeuralParallaxBackdrop } from './components/NeuralParallaxBackdrop';
import { TrustSealBadge } from './components/TrustSealBadge';
import { TypographicMarqueeSection } from './components/TypographicMarqueeSection';
import {
  WhatsAppTriageModal,
  FloatingWhatsAppButton,
  OFFICIAL_WHATSAPP_DISPLAY,
  OFFICIAL_WHATSAPP_NUMBER,
} from './components/WhatsAppTriageModal';
import { LegalDocumentModal, LegalDocType } from './components/LegalDocumentModal';

gsap.registerPlugin(ScrollTrigger);

const OFFICIAL_LOGO_PATH = '/assets/aistudio/Logos-DianaLima_4914af5c.png';

interface SecondaryService {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  clinicalFocus: string[];
  whoIsItFor: string;
  icon: React.ReactNode;
}

const SECONDARY_SERVICES: SecondaryService[] = [
  {
    id: 'estimulacao-cognitiva',
    number: '01',
    title: 'Estimulação Cognitiva',
    subtitle: 'Fortalecimento de funções mentais e autonomia funcional',
    summary:
      'Intervenções estruturadas e personalizadas para exercitar memória, atenção, linguagem, percepção e funções executivas de forma integrada às atividades do cotidiano.',
    clinicalFocus: [
      'Exercícios de memória operacional, autobiográfica e prospectiva',
      'Treino de atenção sustentada, foco e velocidade de processamento',
      'Estratégias práticas para organização da rotina no ambiente doméstico',
    ],
    whoIsItFor:
      'Adultos e idosos que percebem queixas de esquecimento, lentidão de raciocínio ou desejam preservar a vitalidade cognitiva.',
    icon: <Brain className="w-5 h-5 text-[#6B1D57]" aria-hidden="true" />,
  },
  {
    id: 'intervencao-idoso',
    number: '02',
    title: 'Intervenção Preventiva e Terapêutica ao Idoso',
    subtitle: 'Envelhecimento ativo, dignidade e preservação da identidade',
    summary:
      'Acompanhamento dedicado à reserva cognitiva na longevidade e ao manejo humanizado de condições neurodegenerativas no conforto e segurança do lar.',
    clinicalFocus: [
      'Prevenção do declínio cognitivo e fortalecimento da reserva neural',
      'Atividades significativas alinhadas à biografia e aos interesses do idoso',
      'Orientação contínua a familiares e cuidadores para um ambiente acolhedor',
    ],
    whoIsItFor:
      'Idosos em busca de envelhecimento saudável ou com diagnóstico de Comprometimento Cognitivo Leve (CCL) e demências.',
    icon: <HeartHandshake className="w-5 h-5 text-[#6B1D57]" aria-hidden="true" />,
  },
  {
    id: 'paralisia-cerebral',
    number: '03',
    title: 'Estimulação Neurocognitiva para pessoas com Paralisia Cerebral',
    subtitle: 'Potencialização de capacidades e neuroaprendizagem adaptada',
    summary:
      'Plano terapêutico que valoriza as potencialidades singulares de cada indivíduo, adaptando recursos sensoriais, motores e cognitivos ao seu ritmo biológico.',
    clinicalFocus: [
      'Adaptação de materiais pedagógicos e cognitivos para acessibilidade motora',
      'Estímulo do raciocínio lógico, percepção visuoespacial e aprendizagem',
      'Promoção da participação ativa na dinâmica familiar e social',
    ],
    whoIsItFor:
      'Crianças, jovens e adultos com Paralisia Cerebral que necessitam de suporte especializado em neuroaprendizagem no domicílio.',
    icon: <Sparkles className="w-5 h-5 text-[#6B1D57]" aria-hidden="true" />,
  },
  {
    id: 'comunicacao-alternativa',
    number: '04',
    title: 'Comunicação Alternativa',
    subtitle: 'Voz, expressão e vínculo para além da fala convencional',
    summary:
      'Implementação de recursos de Comunicação Aumentativa e Alternativa (CAA) para restituir a capacidade de expressão, escolha e interação com a família.',
    clinicalFocus: [
      'Confecção de pranchas de comunicação personalizadas de baixa e alta tecnologia',
      'Treinamento empático junto à família e cuidadores no ambiente real da casa',
      'Redução da frustração comunicativa após AVC, PC ou condições neurológicas',
    ],
    whoIsItFor:
      'Pessoas com restrições temporárias ou permanentes na fala oral que precisam se comunicar com clareza e autonomia.',
    icon: <MessageSquareHeart className="w-5 h-5 text-[#6B1D57]" aria-hidden="true" />,
  },
];

const HOME_CARE_STEPS = [
  {
    step: '01. Acolhimento Inicial via WhatsApp',
    description:
      'Conversa inicial com o paciente ou familiar para compreender a história clínica, as demandas principais e agendar a primeira visita no horário mais tranquilo para a família.',
  },
  {
    step: '02. Avaliação Neurocognitiva no Lar',
    description:
      'Observação cuidadosa das capacidades preservadas, do funcionamento cognitivo e da dinâmica do ambiente doméstico, sem o estresse de deslocamento até consultórios.',
  },
  {
    step: '03. Plano Terapêutico Individualizado',
    description:
      'Elaboração de estratégias de reabilitação e estimulação sob medida, respeitando o ritmo biológico, emocional e os interesses reais da pessoa atendida.',
  },
  {
    step: '04. Intervenção Contínua e Orientação Familiar',
    description:
      'Sessões domiciliares regulares aliadas a orientações práticas para que familiares e cuidadores saibam como estimular e apoiar a autonomia no dia a dia.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Por que o atendimento em domicílio faz tanta diferença na neuroreabilitação?',
    answer:
      'Para pacientes pós-AVC, idosos ou pessoas com condições neurológicas, o deslocamento no trânsito e a espera em ambientes clínicos impessoais geram fadiga física e ansiedade, o que reduz o rendimento cognitivo. Em casa, o paciente sente-se seguro e acolhido, permitindo trabalhar habilidades diretamente conectadas à sua rotina real.',
  },
  {
    question: 'Quando devemos iniciar a Reabilitação Cognitiva após um AVC?',
    answer:
      'Quanto mais cedo o estímulo especializado e respeitoso for iniciado após a estabilização clínica, maiores são os benefícios da neuroplasticidade — a capacidade do cérebro de reorganizar rotas neurais e reconstruir conexões. Contudo, mesmo em fases crônicas, o estímulo cognitivo promove ganhos importantes de qualidade de vida e autonomia.',
  },
  {
    question: 'A família pode acompanhar e participar do processo terapêutico?',
    answer:
      'Sim, a participação familiar é um pilar fundamental do trabalho de Diana Lima. O atendimento domiciliar permite orientar familiares e cuidadores de forma prática e empática sobre como se comunicar, organizar o ambiente e valorizar as conquistas diárias do paciente.',
  },
  {
    question: 'Como funciona a Comunicação Alternativa para quem tem dificuldade de fala?',
    answer:
      'A Comunicação Aumentativa e Alternativa (CAA) utiliza pranchas visuais, símbolos, letras ou recursos adaptados para que a pessoa possa expressar desejos, sentimentos, dores e pensamentos mesmo quando a fala oral está comprometida, resgatando sua autonomia e dignidade perante a família.',
  },
];

const DEFAULT_ABOUT_BIO = {
  leadParagraph:
    'Com trajetória dedicada à interface entre cognição, afeto e reabilitação humana, Diana Lima atua oferecendo suporte especializado a pessoas que enfrentam desafios neurológicos e às suas famílias, levando ciência e sensibilidade diretamente para o ambiente domiciliar.',
  secondParagraph:
    'Como Psicopedagoga Especialista em Neuroaprendizagem e Comunicação Alternativa, sua prática clínica parte de uma premissa inegociável: enxergar a pessoa integralmente, muito além do diagnóstico ou da limitação momentânea. Cada plano terapêutico é desenhado a partir da biografia, das memórias afetivas e das capacidades remanescentes do paciente.',
  thirdParagraph:
    'No acompanhamento domiciliar pós-AVC, no cuidado preventivo e terapêutico ao idoso e na estimulação neurocognitiva na Paralisia Cerebral, seu compromisso é transformar o lar em um espaço seguro de descoberta, expressão e reconstrução de possibilidades.',
  experienceHighlight: 'Atendimento Clínico Domiciliar · Foco no Paciente e na Família',
};

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Acessibilidade Visual (WCAG AAA)
  const [fontScale, setFontScale] = useState<number>(1);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  // Modal de Triagem WhatsApp
  const [isTriageOpen, setIsTriageOpen] = useState<boolean>(false);
  const [triageService, setTriageService] = useState<string>(
    'Reabilitação Cognitiva Pós-AVC (Destaque)'
  );

  // Modal de Política de Privacidade e Termos de Uso
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>(null);

  // Detalhe expandido na vitrine de serviços secundários
  const [activeServiceId, setActiveServiceId] = useState<string>(SECONDARY_SERVICES[0].id);

  // FAQ Acordeão
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Seção "Sobre Mim" Editável (Preparada para texto final da cliente)
  const [aboutBio, setAboutBio] = useState(DEFAULT_ABOUT_BIO);
  const [isEditingBio, setIsEditingBio] = useState<boolean>(false);
  const [bioDraft, setBioDraft] = useState(DEFAULT_ABOUT_BIO);
  const [bioSavedNotice, setBioSavedNotice] = useState<boolean>(false);

  // Inicialização do Smooth Scroll (Lenis) sincronizado ao GSAP ScrollTrigger + Animações Clínicas Suaves
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // 1. Entrada serena e acolhedora da Hero Section (Blur-in + Deslocamento Vertical Suave)
      gsap.fromTo(
        '.gsap-hero-item',
        { y: 28, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.05,
          stagger: 0.13,
          ease: 'power3.out',
          clearProps: 'transform,opacity,filter',
        }
      );

      gsap.fromTo(
        '.gsap-hero-visual',
        { y: 34, opacity: 0, scale: 0.98, filter: 'blur(14px)' },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.25,
          delay: 0.18,
          ease: 'power3.out',
          clearProps: 'transform,opacity,filter',
        }
      );

      // 2. Animação contínua orgânica nos símbolos de neuroplasticidade (compositor-only: transform & opacity)
      gsap.to('.gsap-float-badge', {
        y: -7,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.gsap-pulse-ring', {
        scale: 1.06,
        opacity: 0.55,
        transformOrigin: 'center center',
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.gsap-synapse-node', {
        y: -4,
        duration: 2.4,
        stagger: 0.35,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 3. ScrollTrigger: Destaque Primário Pós-AVC + Desenho Progressivo de Conexões SVG
      gsap.fromTo(
        '.gsap-pos-avc-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#pos-avc',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity',
        }
      );

      gsap.fromTo(
        '.gsap-neuro-card',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#pos-avc',
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity',
        }
      );

      // Linhas abstratas de neuroplasticidade surgindo conforme o usuário rola a página
      gsap.fromTo(
        '.gsap-neuro-line',
        { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0.2 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          stagger: 0.18,
          ease: 'none',
          scrollTrigger: {
            trigger: '#pos-avc',
            start: 'top 80%',
            end: 'bottom 55%',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        '.gsap-neuro-node',
        { scale: 0, opacity: 0, transformOrigin: 'center center' },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.08,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: '#pos-avc',
            start: 'top 75%',
            end: 'center 50%',
            scrub: 1,
          },
        }
      );

      // 4. ScrollTrigger: Cards da Vitrine de Especialidades
      gsap.fromTo(
        '.gsap-service-card',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#especialidades',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          clearProps: 'opacity',
        }
      );

      // 5. ScrollTrigger: 4 Etapas do Atendimento no Lar
      gsap.fromTo(
        '.gsap-step-card',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#como-funciona',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity',
        }
      );

      // 6. ScrollTrigger: Seção Sobre Mim e Credenciais
      gsap.fromTo(
        '.gsap-about-block',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#sobre-mim',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity',
        }
      );

      // 7. ScrollTrigger: Perguntas Frequentes (FAQ)
      gsap.fromTo(
        '.gsap-faq-item',
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#duvidas',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity',
        }
      );

      // 8. Revelação suave (fade-in + movimento ascendente) para todos os títulos de seção (H2) sincronizada com Lenis & ScrollTrigger
      const sectionHeadings = gsap.utils.toArray<HTMLElement>(
        '.gsap-section-heading'
      );
      sectionHeadings.forEach((heading) => {
        gsap.fromTo(
          heading,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            clearProps: 'transform,opacity',
          }
        );
      });

      // Atualiza cálculos de posição após pinos de seção para sincronia perfeita com Lenis
      ScrollTrigger.refresh();
    }, rootRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Função para rolagem suave via Lenis ao clicar nos links de âncora
  const handleSmoothAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetSelector: string
  ) => {
    if (lenisRef.current) {
      e.preventDefault();
      lenisRef.current.scrollTo(targetSelector, { offset: -72, duration: 1.2 });
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--a11y-scale', String(fontScale));
  }, [fontScale]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    const savedBio = localStorage.getItem('neuroreabilite_diana_bio');
    if (savedBio) {
      try {
        const parsed = JSON.parse(savedBio);
        setAboutBio(parsed);
        setBioDraft(parsed);
      } catch {
        // Mantém texto padrão
      }
    }
  }, []);

  const openTriageWithService = (serviceName: string) => {
    setTriageService(serviceName);
    setIsTriageOpen(true);
  };

  // Hover performático via GSAP (scale: 1.02) em coesão com o ScrollTrigger de entrada (overwrite: 'auto')
  const handleServiceCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.to(e.currentTarget, {
      scale: 1.02,
      duration: 0.32,
      ease: 'power2.out',
      overwrite: 'auto',
      force3D: true,
    });
  };

  const handleServiceCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.28,
      ease: 'power2.out',
      overwrite: 'auto',
      force3D: true,
    });
  };

  const handleSaveBio = () => {
    setAboutBio(bioDraft);
    localStorage.setItem('neuroreabilite_diana_bio', JSON.stringify(bioDraft));
    setIsEditingBio(false);
    setBioSavedNotice(true);
    setTimeout(() => setBioSavedNotice(false), 3500);
  };

  const handleResetBio = () => {
    setBioDraft(DEFAULT_ABOUT_BIO);
    setAboutBio(DEFAULT_ABOUT_BIO);
    localStorage.removeItem('neuroreabilite_diana_bio');
    setIsEditingBio(false);
  };

  return (
    <div ref={rootRef} className="min-h-screen flex flex-col bg-[#FFF9FB] text-[#1E1024]">
      {/* 1. TOP BAR CONTRACT (3 Zonas Limpas: Marca 1 linha — Links de Navegação — 1 CTA Primário) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#F3E3EC] hc-surface">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-8 py-4">
          {/* Zona 1: Logo Horizontal Oficial Diana Lima */}
          <a
            href="#inicio"
            onClick={(e) => handleSmoothAnchorClick(e, '#inicio')}
            aria-label="Início — Diana Lima"
            className="inline-flex items-center shrink-0 h-11 sm:h-12 overflow-hidden"
          >
            <img
              src="/assets/aistudio/Logos-propagou__1__29cc1f42.png"
              alt="Logo Diana Lima"
              referrerPolicy="no-referrer"
              className="h-24 sm:h-28 w-auto max-w-none object-contain mix-blend-multiply pointer-events-none"
            />
          </a>

          {/* Zona 2: 4-5 links de navegação concisos em linha única com Smooth Scroll */}
          <nav
            aria-label="Navegação Principal"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#3B1D54]"
          >
            <a
              href="#pos-avc"
              onClick={(e) => handleSmoothAnchorClick(e, '#pos-avc')}
              className="hover:text-[#6B1D57] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Pós-AVC
            </a>
            <a
              href="#especialidades"
              onClick={(e) => handleSmoothAnchorClick(e, '#especialidades')}
              className="hover:text-[#6B1D57] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Especialidades
            </a>
            <a
              href="#como-funciona"
              onClick={(e) => handleSmoothAnchorClick(e, '#como-funciona')}
              className="hover:text-[#6B1D57] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Atendimento no Lar
            </a>
            <a
              href="#sobre-mim"
              onClick={(e) => handleSmoothAnchorClick(e, '#sobre-mim')}
              className="hover:text-[#6B1D57] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Sobre Mim
            </a>
            <a
              href="#duvidas"
              onClick={(e) => handleSmoothAnchorClick(e, '#duvidas')}
              className="hover:text-[#6B1D57] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Dúvidas
            </a>
          </nav>

          {/* Zona 3: 1 Ação Primária */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                openTriageWithService('Reabilitação Cognitiva Pós-AVC (Destaque)')
              }
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#6B1D57] hover:bg-[#521442] rounded-xl transition-colors cursor-pointer hc-primary-btn whitespace-nowrap shrink-0"
            >
              Agendar Avaliação
            </button>
          </div>
        </div>
      </header>

      <main id="inicio" className="flex-1">
        {/* Barra utilitária de Acessibilidade Visual WCAG 2.1 AAA */}
        <div className="bg-[#FDF2F7] border-b border-[#F3E3EC] hc-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-4 text-xs text-[#3B1D54]">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#6B1D57] shrink-0" aria-hidden="true" />
              <span>
                <strong>Diana Lima</strong> · Psicopedagoga Especialista em Neuroaprendizagem e Comunicação Alternativa
              </span>
            </div>

            {/* Controles Interativos de Acessibilidade */}
            <div
              className="flex items-center gap-3"
              role="region"
              aria-label="Controles de Acessibilidade Visual"
            >
              <span className="text-[#583E68] hc-muted hidden sm:inline">
                Acessibilidade de Leitura:
              </span>
              <div className="flex items-center gap-1 p-0.5 bg-white rounded-lg border border-[#E2CED8]">
                <button
                  type="button"
                  onClick={() => setFontScale(1)}
                  className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    fontScale === 1
                      ? 'bg-[#6B1D57] text-white'
                      : 'text-[#3B1D54] hover:bg-[#FDF2F7]'
                  }`}
                  aria-label="Tamanho de fonte padrão"
                >
                  A 100%
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale(1.12)}
                  className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    fontScale === 1.12
                      ? 'bg-[#6B1D57] text-white'
                      : 'text-[#3B1D54] hover:bg-[#FDF2F7]'
                  }`}
                  aria-label="Aumentar fonte em 12 por cento"
                >
                  A+ 112%
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale(1.22)}
                  className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    fontScale === 1.22
                      ? 'bg-[#6B1D57] text-white'
                      : 'text-[#3B1D54] hover:bg-[#FDF2F7]'
                  }`}
                  aria-label="Aumentar fonte em 22 por cento"
                >
                  A++ 122%
                </button>
              </div>

              <button
                type="button"
                onClick={() => setHighContrast(!highContrast)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  highContrast
                    ? 'bg-[#1E1024] text-white border-[#1E1024]'
                    : 'bg-white text-[#3B1D54] border-[#E2CED8] hover:bg-[#FDF2F7]'
                }`}
                aria-pressed={highContrast}
              >
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Alto Contraste AAA</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. HERO SECTION (Padrão F-Pattern / Z-Pattern, Logo Oficial Reestruturada, Modalidade Domiciliar e Títulos Oficiais) */}
        <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Coluna Esquerda: Hierarquia de Marca, Modalidade Domiciliar, H1, H2 e CTA */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Bloco superior com a Logo Oficial anexada e reestruturada (Seção 2.2 do Briefing) */}
                  <div className="gsap-hero-item flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-7 mb-7 border-b border-[#F3E3EC]">
                    <BrandLogoLockup size="md" allowToggleVariant />

                    {/* Componente Dedicado de Modalidade Domiciliar (Seção 1.2 do Briefing) */}
                    <div className="flex items-start sm:items-center gap-3 max-w-sm">
                      <div className="w-10 h-10 rounded-xl bg-[#FDF2F7] border border-[#F3E3EC] flex items-center justify-center shrink-0 text-[#6B1D57]">
                        <MapPin className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <p className="text-sm font-medium text-[#2E1065] leading-snug">
                        Atendimento humanizado e especializado no conforto e segurança do seu lar
                      </p>
                    </div>
                  </div>

                  {/* SUB-HEADLINE / CONCEITO CHAVE (H2 - Seção 3.1) */}
                  <h2 className="gsap-hero-item font-display text-xs sm:text-sm font-bold tracking-[0.16em] text-[#6B1D57] uppercase mb-3">
                    NEUROREABILITAÇÃO, CUIDADO E RECUPERAÇÃO
                  </h2>

                  {/* HEADLINE PRINCIPAL (H1 - Seção 3.1) */}
                  <h1 className="gsap-hero-item font-display text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#1E1024] leading-[1.18] tracking-tight">
                    REABILITAÇÃO COGNITIVA E ESTIMULAÇÃO NEUROCOGNITIVA PARA PESSOAS COM CONDIÇÕES NEUROLÓGICAS.
                  </h1>

                  <p className="gsap-hero-item mt-5 text-base sm:text-lg text-[#3B1D54] hc-muted leading-relaxed max-w-2xl">
                    Um plano terapêutico individualizado que valoriza as capacidades remanescentes e estimula o potencial de desenvolvimento no ambiente acolhedor da própria residência — sem o desgaste do deslocamento clínico.
                  </p>
                </div>

                {/* Diretriz de CTA da Hero Section */}
                <div className="gsap-hero-item mt-8 pt-6 border-t border-[#F3E3EC]">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        openTriageWithService('Reabilitação Cognitiva Pós-AVC (Destaque)')
                      }
                      className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-[#6B1D57] hover:bg-[#521442] text-white font-display font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer hc-primary-btn whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                      <span>Agende uma Avaliação Domiciliar via WhatsApp</span>
                    </button>

                    <a
                      href="#pos-avc"
                      onClick={(e) => handleSmoothAnchorClick(e, '#pos-avc')}
                      className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl border border-[#E2CED8] bg-white hover:bg-[#FDF2F7] text-[#3B1D54] font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Conhecer Especialidades</span>
                      <ArrowRight className="w-4 h-4 text-[#6B1D57]" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Metadados limpos sem pílulas estáticas */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#583E68] hc-muted">
                    <span>Atendimento Exclusivamente Domiciliar</span>
                    <span aria-hidden="true">·</span>
                    <span>Acompanhamento Individualizado</span>
                    <span aria-hidden="true">·</span>
                    <span>Suporte e Orientação à Família</span>
                  </div>
                </div>
              </div>

              {/* Coluna Direita: Ilustração Clínica com Símbolo Oficial + Citação da Filosofia Terapêutica */}
              <div className="lg:col-span-5 flex">
                <HeroHomeCareIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 02 — FAIXA TIPOGRÁFICA EM MOVIMENTO (Transição entre abertura e conteúdo clínico) */}
        <TypographicMarqueeSection />

        {/* 3. BLOCO DE DESTAQUE PRIMÁRIO IMERSIVO: REABILITAÇÃO COGNITIVA PÓS-AVC (Fundo Vinho Profundo + Composição Abstrata Progressiva) */}
        <section
          id="pos-avc"
          aria-labelledby="heading-pos-avc"
          className="relative py-20 sm:py-28 px-4 sm:px-8 bg-gradient-to-br from-[#3A0D2E] via-[#2C0A24] to-[#1D0618] text-white border-b border-[#521442] overflow-hidden"
        >
          {/* Luzes sutis de atmosfera no fundo vinho profundo */}
          <div
            className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#9D174D]/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Narrativa Principal Pós-AVC com Tipografia Clara e Compensação Óptica */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="gsap-pos-avc-item flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#F9A8D4]">
                    <span>Especialidade Principal</span>
                    <span aria-hidden="true">·</span>
                    <span>Reabilitação Cognitiva Pós-AVC</span>
                  </div>

                  {/* Título Oficial Solicitado */}
                  <h2
                    id="heading-pos-avc"
                    className="gsap-section-heading font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 leading-[1.15] tracking-tight"
                  >
                    Reconstruir possibilidades após um AVC.
                  </h2>

                  {/* Descrição Oficial Solicitada */}
                  <p className="gsap-pos-avc-item mt-6 text-lg sm:text-xl text-[#FCE7F3] leading-relaxed font-normal tracking-[0.01em]">
                    Cuidado individualizado para estimular habilidades cognitivas e favorecer novas conexões, contribuindo para a qualidade de vida de pessoas após um AVC e com outras condições neurológicas.
                  </p>

                  {/* Pilares práticos do cuidado Pós-AVC adaptados para o fundo escuro */}
                  <div className="gsap-pos-avc-item grid grid-cols-1 sm:grid-cols-2 gap-6 mt-9 pt-8 border-t border-white/15">
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2
                        className="w-5 h-5 text-[#F9A8D4] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-display text-base font-semibold text-white tracking-wide">
                          Estímulo no Ritmo de Cada Pessoa
                        </h3>
                        <p className="text-sm text-[#F3E8FF]/80 mt-1 leading-relaxed">
                          Atividades estruturadas para exercitar atenção, memória e expressão verbal ou alternativa, respeitando o tempo individual.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <CheckCircle2
                        className="w-5 h-5 text-[#F9A8D4] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-display text-base font-semibold text-white tracking-wide">
                          Vivência Funcional no Próprio Lar
                        </h3>
                        <p className="text-sm text-[#F3E8FF]/80 mt-1 leading-relaxed">
                          Intervenção integrada ao ambiente doméstico e orientação empática à família, sem o desgaste do deslocamento.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Solicitado */}
                <div className="gsap-pos-avc-item mt-10 pt-7 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      openTriageWithService('Reabilitação Cognitiva Pós-AVC (Destaque)')
                    }
                    className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-[#FDF2F7] hover:bg-white text-[#3A0D2E] font-display font-bold text-sm sm:text-base shadow-lg transition-all cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-5 h-5 text-[#6B1D57] shrink-0" aria-hidden="true" />
                    <span>Conversar sobre reabilitação pós-AVC</span>
                    <ArrowRight className="w-4 h-4 text-[#6B1D57] shrink-0" aria-hidden="true" />
                  </button>

                  <span className="text-xs sm:text-sm text-[#F3E8FF]/75">
                    Atendimento domiciliar humanizado e individualizado
                  </span>
                </div>
              </div>

              {/* Composição Abstrata de Neuroplasticidade com Desenho Progressivo no Scroll */}
              <div className="lg:col-span-5 flex">
                <NeuroplasticityVisualCard />
              </div>
            </div>
          </div>
        </section>

        {/* 4. VITRINE DOS DEMAIS SERVIÇOS ESPECIALIZADOS (Seção 3.3 - Com Fundo Parallax de Cérebro e Neurônios) */}
        <section
          id="especialidades"
          aria-labelledby="heading-especialidades"
          className="relative py-16 sm:py-24 px-4 sm:px-8 bg-[#FFF9FB] overflow-hidden"
        >
          {/* Fundo Parallax em 3 camadas: Hemisférios Cerebrais, Rede de Neurônios e Sinapses */}
          <NeuralParallaxBackdrop variant="full" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="text-xs sm:text-sm font-semibold text-[#6B1D57]">
                Pilares Complementares de Atuação Clínica
              </div>
              <h2
                id="heading-especialidades"
                className="gsap-section-heading font-display text-2xl sm:text-3xl font-bold text-[#1E1024] mt-2"
              >
                Demais Serviços Especializados em Domicílio
              </h2>
              <p className="mt-3 text-base text-[#4A3556] hc-muted">
                Selecione qualquer área abaixo para visualizar como o acompanhamento é estruturado no lar para cada perfil de necessidade.
              </p>
            </div>

            {/* Grid Responsiva dos 4 Cards Secundários */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {SECONDARY_SERVICES.map((service) => {
                const isSelected = activeServiceId === service.id;
                return (
                  <div
                    key={service.id}
                    onMouseEnter={handleServiceCardMouseEnter}
                    onMouseLeave={handleServiceCardMouseLeave}
                    className={`gsap-service-card rounded-2xl p-6 sm:p-7 transition-[background-color,border-color,box-shadow] duration-300 will-change-transform hover:shadow-lg border backdrop-blur-xs hc-surface flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white/90 border-[#6B1D57] shadow-sm'
                        : 'bg-white/75 border-[#F3E3EC] hover:bg-white/92 hover:border-[#D8B4FE]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-semibold text-[#6B1D57] tabular-nums">
                          {service.number}. Especialidade Clínica
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-[#FDF2F7] border border-[#F3E3EC] flex items-center justify-center">
                          {service.icon}
                        </div>
                      </div>

                      <h3 className="font-display text-lg sm:text-xl font-bold text-[#1E1024] mt-3">
                        {service.title}
                      </h3>

                      <p className="text-xs sm:text-sm font-medium text-[#6B1D57] mt-1">
                        {service.subtitle}
                      </p>

                      <p className="text-sm text-[#3B1D54] hc-muted mt-3 leading-relaxed">
                        {service.summary}
                      </p>

                      {/* Detalhamento expansível limpo */}
                      <div className="mt-5 pt-4 border-t border-[#F3E3EC]">
                        <div className="text-xs font-semibold text-[#1E1024] mb-2">
                          Focos da intervenção domiciliar:
                        </div>
                        <ul className="space-y-1.5">
                          {service.clinicalFocus.map((item, idx) => (
                            <li
                              key={idx}
                              className="text-xs sm:text-sm text-[#4A3556] hc-muted flex items-start gap-2"
                            >
                              <span className="text-[#6B1D57] font-bold" aria-hidden="true">
                                ·
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#F3E3EC] flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveServiceId(service.id)}
                        className="text-xs font-semibold text-[#4A3556] hover:text-[#1E1024] cursor-pointer whitespace-nowrap shrink-0"
                      >
                        {isSelected ? 'Especialidade em Foco' : 'Destacar Card'}
                      </button>

                      <button
                        type="button"
                        onClick={() => openTriageWithService(service.title)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#D8B4FE] hover:bg-[#6B1D57] hover:text-white hover:border-[#6B1D57] text-[#6B1D57] text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Agendar nesta área</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ponto de Ancoragem e Conversão de Fechamento (Seção 3.3 do Briefing) */}
            <div className="gsap-service-card mt-12 rounded-2xl bg-[#FDF2F7] border border-[#E9D5FF] hc-surface p-6 sm:p-9 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="text-xs font-semibold text-[#6B1D57]">
                  Atendimento Domiciliar Personalizado
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1E1024] mt-1">
                  Cada família possui uma rotina e uma necessidade única.
                </h3>
                <p className="text-sm sm:text-base text-[#4A3556] hc-muted mt-1.5">
                  Converse diretamente com Diana Lima para entender como adaptar as sessões ao ritmo e ao lar do seu familiar.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  openTriageWithService('Avaliação Domiciliar Geral / Outra Demanda')
                }
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#6B1D57] hover:bg-[#521442] text-white font-display font-bold text-sm sm:text-base shadow-sm transition-colors cursor-pointer hc-primary-btn whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Entre em Contato e Tire suas Dúvidas sobre o Atendimento Domiciliar</span>
              </button>
            </div>
          </div>
        </section>

        {/* 5. COMO FUNCIONA A JORNADA DE ATENDIMENTO NO LAR (Empilhamento Progressivo em Tela Única via GSAP + Smooth Scroll) */}
        <HomeCareStackedSection onOpenTriage={openTriageWithService} />

        {/* 6. SEÇÃO "SOBRE MIM" E CREDENCIAIS OFICIAIS (Seção 4.1 e 4.2 do Briefing - Com Fundo Parallax Sutil de Neurônios) */}
        <section
          id="sobre-mim"
          aria-labelledby="heading-sobre-mim"
          className="relative py-16 sm:py-24 px-4 sm:px-8 bg-[#FFF9FB] overflow-hidden"
        >
          <NeuralParallaxBackdrop variant="subtle" />

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Cabeçalho da Seção Sobre Mim com Titulação Técnica Oficial Obrigatória (Seção 4.1) */}
            <div className="gsap-about-block pb-8 mb-10 border-b border-[#F3E3EC] flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#6B1D57]">
                  <GraduationCap className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>
                    Psicopedagoga Especialista em Neuroaprendizagem e Comunicação Alternativa
                  </span>
                </div>
                <h2
                  id="heading-sobre-mim"
                  className="gsap-section-heading font-display text-2xl sm:text-4xl font-bold text-[#1E1024] mt-2"
                >
                  Sobre Diana Lima
                </h2>
              </div>

              {/* Botão para editar/personalizar a narrativa biográfica final quando enviada pela cliente */}
              <div className="flex items-center gap-3">
                {bioSavedNotice && (
                  <span className="text-xs font-semibold text-[#6B1D57]">
                    Texto biográfico atualizado!
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setBioDraft(aboutBio);
                    setIsEditingBio(!isEditingBio);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D8B4FE] bg-white hover:bg-[#FDF2F7] text-[#6B1D57] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>
                    {isEditingBio ? 'Cancelar Edição' : 'Personalizar Texto Biográfico'}
                  </span>
                </button>
              </div>
            </div>

            {/* Grid Editorial Long-Form da Seção Sobre Mim */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Coluna Identidade Oficial, Foto Original Diana Lima e Selo de Credenciais */}
              <div className="gsap-about-block lg:col-span-5">
                <div className="rounded-2xl bg-white border border-[#F3E3EC] hc-surface p-6 sm:p-8 shadow-xs">
                  {/* 1. Topo: Exibição da Logo Oficial */}
                  <div className="flex flex-col items-center justify-center text-center pb-5 border-b border-[#F3E3EC]">
                    <div className="w-48 h-32 overflow-hidden flex items-center justify-center">
                      <img
                        src={OFFICIAL_LOGO_PATH}
                        alt="Logotipo Oficial Diana Lima — Neuroaprendizagem"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain scale-125 mix-blend-multiply"
                      />
                    </div>
                  </div>

                  {/* 2. Meio: Foto Original da Especialista Diana Lima com Filtros Editoriais e Enquadramento Perfeito */}
                  <div className="my-6">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#E9D5FF] bg-[#FDF2F7] shadow-sm group">
                      <img
                        src="/assets/aistudio/image_99bd5027.png"
                        alt="Diana Lima — Psicopedagoga Especialista em Neuroaprendizagem e Comunicação Alternativa"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        style={{
                          /* Enquadra perfeitamente o rosto e o jaleco bordado, ocultando as bordas desfocadas da imagem original */
                          objectPosition: '36% 18%',
                          transform: 'scale(1.16)',
                          filter: 'contrast(1.05) brightness(1.03) saturate(1.06)',
                        }}
                      />
                      {/* Filtro de luz editorial clínica suave e vinheta sutil na base */}
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2E1065]/55 via-transparent to-[#FDF2F7]/10 mix-blend-multiply opacity-75"
                        aria-hidden="true"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/30 rounded-2xl"
                        aria-hidden="true"
                      />
                      {/* Legenda sutil sobreposta na base da foto */}
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-[#1E1024]/85 via-[#1E1024]/45 to-transparent text-left">
                        <p className="font-display text-sm sm:text-base font-bold text-white leading-snug">
                          Diana Lima
                        </p>
                        <p className="text-xs text-[#FCE7F3] mt-0.5 leading-snug">
                          Psicopedagoga Especialista em Neuroaprendizagem e Comunicação Alternativa
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 3. Abaixo: Informações e Destaques de Credibilidade */}
                  <div className="space-y-3 text-xs sm:text-sm text-[#3B1D54] hc-muted pt-2">
                    <div className="flex items-center justify-between py-2 border-b border-[#F3E3EC]">
                      <span className="font-semibold text-[#1E1024]">Foco Principal</span>
                      <span>Reabilitação Cognitiva Pós-AVC</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[#F3E3EC]">
                      <span className="font-semibold text-[#1E1024]">Formação Técnica</span>
                      <span>Neuroaprendizagem & CAA</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="font-semibold text-[#1E1024]">Modalidade</span>
                      <span>Atendimento Domiciliar Humanizado</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna Conteúdo Long-Form + Bloco de Citação Destacado */}
              <div className="gsap-about-block lg:col-span-7">
                {!isEditingBio ? (
                  <div className="rounded-2xl bg-white border border-[#F3E3EC] hc-surface p-6 sm:p-10 space-y-6 shadow-xs">
                    <div className="text-xs font-semibold text-[#6B1D57]">
                      {aboutBio.experienceHighlight}
                    </div>

                    <p className="text-base sm:text-lg text-[#1E1024] leading-relaxed font-medium">
                      {aboutBio.leadParagraph}
                    </p>

                    <p className="text-base text-[#3B1D54] hc-muted leading-relaxed">
                      {aboutBio.secondParagraph}
                    </p>

                    {/* Bloco de Citação Destacado */}
                    <blockquote className="rounded-xl bg-[#FDF2F7] border border-[#F3E3EC] p-6 my-6">
                      <p className="font-editorial italic text-lg sm:text-xl text-[#2E1065] leading-relaxed">
                        “Cada pessoa carrega sua própria história. Meu trabalho é valorizar suas capacidades e estimular seu desenvolvimento, respeitando seu ritmo e suas necessidades.”
                      </p>
                      <footer className="mt-3 text-xs font-semibold text-[#6B1D57]">
                        Diana Lima — Psicopedagoga Especialista em Neuroaprendizagem e Comunicação Alternativa
                      </footer>
                    </blockquote>

                    <p className="text-base text-[#3B1D54] hc-muted leading-relaxed">
                      {aboutBio.thirdParagraph}
                    </p>

                    <div className="pt-6 border-t border-[#F3E3EC] flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          openTriageWithService('Avaliação Domiciliar Geral / Outra Demanda')
                        }
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6B1D57] hover:bg-[#521442] text-white text-sm font-semibold transition-colors cursor-pointer hc-primary-btn whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>Conversar com Diana Lima via WhatsApp</span>
                      </button>

                      <span className="text-xs text-[#583E68] hc-muted">
                        Estrutura pronta para atualização imediata da narrativa biográfica
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Editor in-loco para inserção rápida do texto definitivo da cliente */
                  <div className="rounded-2xl bg-white border border-[#6B1D57] p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#F3E3EC]">
                      <h3 className="font-display text-base font-bold text-[#1E1024]">
                        Editar Narrativa Biográfica ("Sobre Mim")
                      </h3>
                      <button
                        type="button"
                        onClick={handleResetBio}
                        className="inline-flex items-center gap-1 text-xs text-[#583E68] hover:text-[#1E1024] cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restaurar texto padrão</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1024] mb-1">
                        Subtítulo / Destaque de Experiência
                      </label>
                      <input
                        type="text"
                        value={bioDraft.experienceHighlight}
                        onChange={(e) =>
                          setBioDraft({ ...bioDraft, experienceHighlight: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E2CED8] bg-[#FFF9FB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1024] mb-1">
                        1º Parágrafo (Abertura e Trajetória)
                      </label>
                      <textarea
                        rows={3}
                        value={bioDraft.leadParagraph}
                        onChange={(e) =>
                          setBioDraft({ ...bioDraft, leadParagraph: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E2CED8] bg-[#FFF9FB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1024] mb-1">
                        2º Parágrafo (Formação e Abordagem Humanizada)
                      </label>
                      <textarea
                        rows={3}
                        value={bioDraft.secondParagraph}
                        onChange={(e) =>
                          setBioDraft({ ...bioDraft, secondParagraph: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E2CED8] bg-[#FFF9FB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1024] mb-1">
                        3º Parágrafo (Compromisso com Pacientes e Famílias)
                      </label>
                      <textarea
                        rows={3}
                        value={bioDraft.thirdParagraph}
                        onChange={(e) =>
                          setBioDraft({ ...bioDraft, thirdParagraph: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E2CED8] bg-[#FFF9FB]"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsEditingBio(false)}
                        className="px-4 py-2 rounded-xl border border-[#E2CED8] text-xs font-semibold text-[#3B1D54] cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveBio}
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#6B1D57] text-white text-xs font-semibold cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Publicar Texto na Seção</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 7. PERGUNTAS FREQUENTES (FAQ INTERATIVO) */}
        <section
          id="duvidas"
          aria-labelledby="heading-faq"
          className="py-16 sm:py-24 px-4 sm:px-8 bg-white border-t border-[#F3E3EC] hc-surface"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs sm:text-sm font-semibold text-[#6B1D57]">
                Esclarecimentos para Familiares e Pacientes
              </div>
              <h2
                id="heading-faq"
                className="gsap-section-heading font-display text-2xl sm:text-3xl font-bold text-[#1E1024] mt-2"
              >
                Perguntas Frequentes sobre o Atendimento Domiciliar
              </h2>
            </div>

            <div className="mt-10 space-y-4">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="gsap-faq-item rounded-2xl bg-[#FFF9FB] border border-[#F3E3EC] hc-surface overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FDF2F7]/60 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-base sm:text-lg font-bold text-[#1E1024]">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#6B1D57] shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#3B1D54] hc-muted leading-relaxed border-t border-[#F3E3EC]/60">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* 8. RODAPÉ INSTITUCIONAL (Seção 2.2 e 4.1 - Logotipo Oficial Reestruturado + Titulação Acadêmica Oficial Obrigatória) */}
      <footer className="bg-[#1E1024] text-white border-t border-[#3B1D54]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/15">
            {/* Coluna 1: Logotipo Oficial Reestruturado e Titulação Completa */}
            <div className="md:col-span-5 flex flex-col items-start">
              <BrandLogoLockup size="sm" inverted />

              {/* Titulação Acadêmica e Técnica Oficial Obrigatória no Rodapé (Seção 4.1) */}
              <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10 max-w-md">
                <p className="text-xs uppercase tracking-wider text-[#F9A8D4] font-semibold">
                  Qualificação e Titulação Oficial
                </p>
                <p className="text-sm sm:text-base font-medium text-white mt-1">
                  🎓 Psicopedagoga Especialista em Neuroaprendizagem e Comunicação Alternativa
                </p>
              </div>

              {/* Selo de Confiança Flutuante no Rodapé */}
              <TrustSealBadge variant="footer" />

              <p className="text-xs sm:text-sm text-[#E9D5FF] mt-4 max-w-md leading-relaxed">
                Atendimento humanizado e especializado no conforto e segurança do seu lar, valorizando as capacidades e respeitando o ritmo de cada pessoa.
              </p>
            </div>

            {/* Coluna 2: Mapa de Navegação com Smooth Scroll */}
            <div className="md:col-span-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#F9A8D4]">
                Mapa do Site
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-[#F3E8FF]">
                <li>
                  <a
                    href="#inicio"
                    onClick={(e) => handleSmoothAnchorClick(e, '#inicio')}
                    className="hover:text-white transition-colors"
                  >
                    Início e Proposta Domiciliar
                  </a>
                </li>
                <li>
                  <a
                    href="#pos-avc"
                    onClick={(e) => handleSmoothAnchorClick(e, '#pos-avc')}
                    className="hover:text-white transition-colors"
                  >
                    Reabilitação Cognitiva Pós-AVC
                  </a>
                </li>
                <li>
                  <a
                    href="#especialidades"
                    onClick={(e) => handleSmoothAnchorClick(e, '#especialidades')}
                    className="hover:text-white transition-colors"
                  >
                    Demais Especialidades Clínicas
                  </a>
                </li>
                <li>
                  <a
                    href="#como-funciona"
                    onClick={(e) => handleSmoothAnchorClick(e, '#como-funciona')}
                    className="hover:text-white transition-colors"
                  >
                    Etapas do Atendimento no Lar
                  </a>
                </li>
                <li>
                  <a
                    href="#sobre-mim"
                    onClick={(e) => handleSmoothAnchorClick(e, '#sobre-mim')}
                    className="hover:text-white transition-colors"
                  >
                    Sobre Diana Lima
                  </a>
                </li>
                <li>
                  <a
                    href="#duvidas"
                    onClick={(e) => handleSmoothAnchorClick(e, '#duvidas')}
                    className="hover:text-white transition-colors"
                  >
                    Perguntas Frequentes
                  </a>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Chamada Direta para Avaliação Domiciliar */}
            <div className="md:col-span-4">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#F9A8D4]">
                Agendamento Domiciliar
              </h3>
              <p className="mt-4 text-sm text-[#E9D5FF] leading-relaxed">
                Agende uma avaliação inicial no conforto da residência do paciente ou tire suas dúvidas diretamente pelo WhatsApp oficial:
              </p>
              {/* Chamada Direta para Avaliação Domiciliar e Redes Sociais */}
              <div className="mt-4 flex flex-col items-start gap-2.5">
                <a
                  href={`https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#F9A8D4] hover:text-white transition-colors tabular-nums"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>WhatsApp Oficial: {OFFICIAL_WHATSAPP_DISPLAY}</span>
                </a>

                {/* Rede Social Oficial: Somente Instagram */}
                <a
                  href="https://www.instagram.com/dianalimaneuroaprendizagem/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram profissional de Diana Lima (@dianalimaneuroaprendizagem)"
                  className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/8 hover:bg-white/15 border border-white/15 text-xs sm:text-sm font-medium text-[#F3E8FF] hover:text-white transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-[#F9A8D4] shrink-0"
                    aria-hidden="true"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>@dianalimaneuroaprendizagem</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() =>
                  openTriageWithService('Reabilitação Cognitiva Pós-AVC (Destaque)')
                }
                className="mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#6B1D57] hover:bg-[#521442] text-white font-display font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Agende uma Avaliação Domiciliar via WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-[#D8B4FE]">
            <p className="text-center lg:text-left">
              © {new Date().getFullYear()} NEUROREABILITE — Diana Lima. Todos os direitos reservados.
            </p>

            {/* Links Diretos de Governança e Transparência */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#F3E8FF]">
              <button
                type="button"
                onClick={() => setActiveLegalDoc('privacy')}
                className="hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
              >
                Política de Privacidade
              </button>
              <span className="text-white/30" aria-hidden="true">
                •
              </span>
              <button
                type="button"
                onClick={() => setActiveLegalDoc('terms')}
                className="hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
              >
                Termos de Uso
              </button>
              <span className="text-white/30" aria-hidden="true">
                •
              </span>
              <a
                href="https://www.instagram.com/dianalimaneuroaprendizagem/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Acessar Instagram oficial de Diana Lima"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 text-[#F9A8D4] shrink-0"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante de WhatsApp Oficial Fixo no Canto Inferior Direito */}
      <FloatingWhatsAppButton />

      {/* Modal de Triagem e Direcionamento para WhatsApp */}
      <WhatsAppTriageModal
        isOpen={isTriageOpen}
        onClose={() => setIsTriageOpen(false)}
        initialService={triageService}
      />

      {/* Modal Institucional de Política de Privacidade e Termos de Uso */}
      <LegalDocumentModal
        activeDoc={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
        onSelectDoc={(doc) => setActiveLegalDoc(doc)}
      />
    </div>
  );
}
