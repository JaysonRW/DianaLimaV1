import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface TrustSealBadgeProps {
  /**
   * 'hero-floating': Selo flutuante sobre a peça visual da Hero Section com fundo translúcido claro e flutuação suave GSAP.
   * 'footer': Selo institucional com tema escuro para o rodapé.
   */
  variant?: 'hero-floating' | 'footer';
}

/**
 * Componente de "Selo de Confiança" destacando o compromisso com a ética profissional
 * e a abordagem baseada em evidências científicas na neuroreabilitação.
 */
export const TrustSealBadge: React.FC<TrustSealBadgeProps> = ({
  variant = 'hero-floating',
}) => {
  if (variant === 'footer') {
    return (
      <div
        className="gsap-float-badge mt-4 inline-flex items-start gap-3.5 p-3.5 rounded-xl bg-white/10 border border-[#F9A8D4]/30 backdrop-blur-xs max-w-md shadow-sm"
        role="note"
        aria-label="Selo de Confiança: Ética Profissional e Prática Baseada em Evidências Científicas"
      >
        <div className="w-9 h-9 rounded-lg bg-[#6B1D57] border border-[#F9A8D4]/40 flex items-center justify-center shrink-0 text-[#F9A8D4]">
          <ShieldCheck className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-[#F9A8D4]">
            <span>Selo de Confiança Clínica</span>
          </div>
          <p className="text-xs text-[#F3E8FF] mt-0.5 leading-relaxed">
            Compromisso rigoroso com a <strong>ética profissional</strong> e intervenções pautadas em <strong>evidências científicas</strong> em neuroreabilitação.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="gsap-float-badge absolute bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4 z-20 sm:max-w-[310px] rounded-xl bg-white/95 backdrop-blur-md border border-[#E9D5FF] hc-surface p-3 sm:p-3.5 shadow-lg flex items-start gap-3"
      role="note"
      aria-label="Selo de Confiança: Ética Profissional e Prática Baseada em Evidências Científicas"
    >
      <div className="w-9 h-9 rounded-lg bg-[#FDF2F7] border border-[#E9D5FF] flex items-center justify-center shrink-0 text-[#6B1D57]">
        <ShieldCheck className="w-5 h-5" aria-hidden="true" />
      </div>
      <div className="text-left min-w-0">
        <div className="font-display text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#6B1D57]">
          Selo de Confiança & Rigor Clínico
        </div>
        <p className="text-xs text-[#2E1065] hc-muted mt-0.5 leading-snug">
          Compromisso com a <strong>ética profissional</strong> e abordagem baseada em <strong>evidências científicas</strong>.
        </p>
      </div>
    </div>
  );
};
