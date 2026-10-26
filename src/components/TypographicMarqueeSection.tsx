import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MARQUEE_PHRASES = [
  {
    text: 'CUIDAR É RECONHECER POTENCIAIS',
    style: 'display' as const,
  },
  {
    text: 'CADA PASSO IMPORTA',
    style: 'editorial' as const,
  },
  {
    text: 'NOVAS POSSIBILIDADES',
    style: 'display' as const,
  },
  {
    text: 'RESPEITO AO SEU RITMO',
    style: 'editorial' as const,
  },
  {
    text: 'NEUROREABILITAÇÃO NO LAR',
    style: 'display' as const,
  },
];

/**
 * Pequeno símbolo gráfico delicado (estrela de 4 pontas / nó sináptico orgânico)
 * para intercalar as frases na faixa tipográfica em movimento.
 */
const DelicateGraphicSymbol: React.FC<{ variant?: 'spark' | 'synapse' }> = ({
  variant = 'spark',
}) => {
  if (variant === 'synapse') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 sm:w-5 sm:h-5 text-[#9D174D]/75 shrink-0"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <circle
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeDasharray="2.5 2.5"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B1D57] shrink-0"
      aria-hidden="true"
    >
      <path
        d="M12 2.5C12.7 7.8 16.2 11.3 21.5 12C16.2 12.7 12.7 16.2 12 21.5C11.3 16.2 7.8 12.7 2.5 12C7.8 11.3 11.3 7.8 12 2.5Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
    </svg>
  );
};

/**
 * SEÇÃO 02 — FAIXA TIPOGRÁFICA EM MOVIMENTO
 * Faixa horizontal com movimento contínuo e delicado via GSAP, funcionando como
 * transição suave entre a abertura (Hero) e o conteúdo clínico (Pós-AVC).
 */
export const TypographicMarqueeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !trackRef.current) return;

    const ctx = gsap.context(() => {
      // Movimento contínuo, lento e sereno (-50% pois temos 2 blocos idênticos lado a lado)
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 42,
        ease: 'none',
        repeat: -1,
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.35, duration: 0.6 });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6 });
    }
  };

  const renderPhraseGroup = (groupKey: string) => (
    <div
      key={groupKey}
      className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12 shrink-0"
    >
      {MARQUEE_PHRASES.map((item, idx) => (
        <React.Fragment key={`${groupKey}-${idx}`}>
          <span
            className={
              item.style === 'display'
                ? 'font-display text-sm sm:text-base lg:text-lg font-bold tracking-[0.2em] text-[#3B1D54] uppercase whitespace-nowrap'
                : 'font-editorial italic text-base sm:text-lg lg:text-xl font-medium tracking-[0.1em] text-[#6B1D57] uppercase whitespace-nowrap'
            }
          >
            {item.text}
          </span>
          <DelicateGraphicSymbol
            variant={idx % 2 === 0 ? 'spark' : 'synapse'}
          />
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <section
      ref={containerRef}
      aria-label="Filosofia em movimento: Cuidar é reconhecer potenciais, cada passo importa, novas possibilidades"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden bg-gradient-to-r from-[#FDF2F7] via-[#FFF9FB] to-[#FAF5FF] border-y border-[#F3E3EC] hc-surface py-4 sm:py-5 select-none"
    >
      {/* Gradientes sutis nas extremidades laterais para suavizar a entrada e saída das palavras */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 z-10 bg-gradient-to-r from-[#FDF2F7] to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 z-10 bg-gradient-to-l from-[#FAF5FF] to-transparent"
        aria-hidden="true"
      />

      {/* Trilho horizontal contínuo */}
      <div ref={trackRef} className="flex items-center w-max will-change-transform">
        {renderPhraseGroup('track-a')}
        {renderPhraseGroup('track-b')}
      </div>
    </section>
  );
};
