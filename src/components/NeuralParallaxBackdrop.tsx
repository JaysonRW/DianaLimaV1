import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NeuralParallaxBackdropProps {
  /**
   * 'full': Exibe o background oficial Cérebro Neural em Tons Pastel (/assets/aistudio/C_rebro_Neural_em_Tons_Pastel_1e485de7.png)
   * com efeito parallax suave sincronizado ao GSAP ScrollTrigger e Lenis.
   * 'subtle': Exibe uma versão ainda mais leve para seções complementares.
   */
  variant?: 'full' | 'subtle';
}

const PASTEL_BRAIN_BG_PATH =
  '/assets/aistudio/C_rebro_Neural_em_Tons_Pastel_1e485de7.png';

export const NeuralParallaxBackdrop: React.FC<NeuralParallaxBackdropProps> = ({
  variant = 'full',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !containerRef.current || !imageLayerRef.current)
      return;

    const ctx = gsap.context(() => {
      // Movimento parallax vertical suave da imagem de fundo conforme o scroll
      gsap.fromTo(
        imageLayerRef.current,
        { yPercent: -8, scale: 1.08 },
        {
          yPercent: 8,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
    >
      {/* Camada da Imagem de Background Oficial com Parallax */}
      <div
        ref={imageLayerRef}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <img
          src={PASTEL_BRAIN_BG_PATH}
          alt=""
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-right sm:object-center ${
            variant === 'full' ? 'opacity-95' : 'opacity-45'
          }`}
        />
      </div>

      {/* Suavização nas bordas superior e inferior para transição perfeita entre as seções */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#FFF9FB] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FFF9FB] to-transparent" />
    </div>
  );
};
