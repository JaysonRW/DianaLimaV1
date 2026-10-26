import React from 'react';
import { TrustSealBadge } from './TrustSealBadge';

const OFFICIAL_LOGO_PATH = '/assets/aistudio/Logos-DianaLima_4914af5c.png';

/**
 * Peças visuais interativas com classes preparadas para animações GSAP (float, pulse sináptico e parallax suave)
 * integradas ao símbolo cerebral oficial da especialista Diana Lima.
 */

export const HeroHomeCareIllustration: React.FC = () => {
  return (
    <div className="gsap-hero-visual relative w-full h-full min-h-[420px] lg:min-h-[500px] rounded-2xl bg-gradient-to-br from-[#FDF2F7] via-[#FFF9FB] to-[#F5F0FF] border border-[#F3E3EC] hc-surface p-5 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xs">
      {/* Topo Discreto do Card com a Logo Oficial da Diana Lima */}
      <div className="flex items-center justify-between gap-4 pb-3.5 mb-4 border-b border-[#F3E3EC]">
        <img
          src={OFFICIAL_LOGO_PATH}
          alt="Logo Diana Lima"
          referrerPolicy="no-referrer"
          className="h-11 sm:h-12 w-auto object-contain mix-blend-multiply opacity-90"
        />
        <span className="text-xs font-medium text-[#6B1D57] tracking-wide">
          Prática Clínica Real · Estimulação & CAA
        </span>
      </div>

      {/* Imagem Principal da Sessão de Reabilitação Cognitiva e Comunicação Alternativa + Selo de Confiança Flutuante */}
      <div className="relative w-full flex-1 min-h-[260px] sm:min-h-[310px] rounded-xl overflow-hidden border border-[#E9D5FF] bg-[#FDF2F7] shadow-xs group">
        <img
          src="/assets/aistudio/image_3dcec16c.png"
          alt="Diana Lima conduzindo sessão de reabilitação cognitiva e comunicação alternativa com paciente"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{
            /* Foca na interação entre Diana Lima, o paciente e a prancha cognitiva na mesa */
            objectPosition: '28% 48%',
            transform: 'scale(1.08)',
            filter: 'contrast(1.05) brightness(1.03) saturate(1.04)',
          }}
        />
        {/* Gradiente sutil de harmonização com a paleta da marca */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1E1024]/50 via-transparent to-[#FDF2F7]/10"
          aria-hidden="true"
        />

        {/* Selo de Confiança Flutuante na Hero Section */}
        <TrustSealBadge variant="hero-floating" />
      </div>

      {/* Citação da Filosofia Terapêutica Oficial integrada à peça visual */}
      <blockquote className="mt-4 pt-4 border-t border-[#F3E3EC]">
        <p className="font-editorial italic text-[#2E1065] text-sm sm:text-base leading-relaxed">
          “Cada pessoa carrega sua própria história. Meu trabalho é valorizar suas capacidades e estimular seu desenvolvimento, respeitando seu ritmo e suas necessidades.”
        </p>
        <footer className="mt-2 flex items-center justify-between text-xs text-[#583E68] hc-muted">
          <span className="font-semibold text-[#6B1D57]">Diana Lima</span>
          <span aria-hidden="true">·</span>
          <span>Filosofia de Atendimento Humanizado</span>
        </footer>
      </blockquote>
    </div>
  );
};

export const NeuroplasticityVisualCard: React.FC = () => {
  return (
    <div className="gsap-neuro-card relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-2xl bg-[#24091D]/90 border border-[#F9A8D4]/20 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl">
      {/* Brilho ambiental abstrato de fundo */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#9D174D]/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#C084FC]/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-medium tracking-[0.14em] uppercase text-[#F9A8D4]">
            Neuroplasticidade & Caminhos Cognitivos
          </span>
          <h3 className="font-display text-lg sm:text-xl font-semibold text-white mt-1">
            Construção Progressiva de Novas Conexões
          </h3>
        </div>
        <span className="text-xs text-[#F3E8FF]/70 hidden sm:inline">
          Estímulo Contínuo
        </span>
      </div>

      {/* Composição Abstrata de Conexões SVG que se desenham conforme a rolagem */}
      <div className="relative z-10 my-4 flex-1 flex items-center justify-center">
        <svg
          viewBox="0 0 500 310"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto max-h-[270px]"
          role="img"
          aria-label="Composição abstrata representando a formação progressiva de novas conexões e caminhos cognitivos"
        >
          <defs>
            <linearGradient id="pathwayGrad1" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#F9A8D4" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#F472B6" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#E9D5FF" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="pathwayGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C084FC" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#F9A8D4" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="pathwayGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#F3E8FF" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Trilhas de base sutis (estado latente antes do estímulo) */}
          <path
            d="M 36 225 C 125 220, 155 110, 248 145 C 340 180, 380 75, 464 85"
            stroke="#FFFFFF"
            strokeOpacity="0.08"
            strokeWidth="1.5"
          />
          <path
            d="M 48 95 C 140 85, 175 205, 265 160 C 355 115, 395 215, 460 195"
            stroke="#FFFFFF"
            strokeOpacity="0.08"
            strokeWidth="1.5"
          />
          <path
            d="M 85 265 C 165 245, 210 185, 248 145 C 288 105, 345 65, 425 45"
            stroke="#FFFFFF"
            strokeOpacity="0.08"
            strokeWidth="1.5"
          />

          {/* Linhas SVG de conexão progressiva que surgem no scroll (GSAP draw paths) */}
          <path
            d="M 36 225 C 125 220, 155 110, 248 145 C 340 180, 380 75, 464 85"
            stroke="url(#pathwayGrad1)"
            strokeWidth="2.8"
            strokeLinecap="round"
            pathLength="1"
            className="gsap-neuro-line"
          />
          <path
            d="M 48 95 C 140 85, 175 205, 265 160 C 355 115, 395 215, 460 195"
            stroke="url(#pathwayGrad2)"
            strokeWidth="2.4"
            strokeLinecap="round"
            pathLength="1"
            className="gsap-neuro-line"
          />
          <path
            d="M 85 265 C 165 245, 210 185, 248 145 C 288 105, 345 65, 425 45"
            stroke="url(#pathwayGrad3)"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength="1"
            className="gsap-neuro-line"
          />
          <path
            d="M 135 55 C 195 95, 215 125, 248 145 C 295 170, 330 235, 410 255"
            stroke="url(#pathwayGrad1)"
            strokeWidth="1.8"
            strokeLinecap="round"
            pathLength="1"
            className="gsap-neuro-line"
          />
          <path
            d="M 160 175 C 200 165, 225 155, 265 160 C 310 165, 345 130, 385 125"
            stroke="#FDE68A"
            strokeOpacity="0.75"
            strokeWidth="1.6"
            strokeDasharray="4 4"
            strokeLinecap="round"
            pathLength="1"
            className="gsap-neuro-line"
          />

          {/* Anéis abstratos de ressonância nos pontos de encontro */}
          <circle
            cx="248"
            cy="145"
            r="26"
            stroke="#F9A8D4"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            className="gsap-pulse-ring"
          />
          <circle
            cx="248"
            cy="145"
            r="44"
            stroke="#E9D5FF"
            strokeOpacity="0.18"
            strokeWidth="1"
            strokeDasharray="3 5"
            className="gsap-pulse-ring"
          />

          {/* Nós luminosos de conexão (surgem progressivamente conforme as linhas avançam) */}
          <g className="gsap-neuro-node">
            <circle cx="36" cy="225" r="5" fill="#F9A8D4" />
            <circle cx="36" cy="225" r="10" stroke="#F9A8D4" strokeOpacity="0.35" strokeWidth="1.5" />
          </g>
          <g className="gsap-neuro-node">
            <circle cx="48" cy="95" r="4.5" fill="#C084FC" />
          </g>
          <g className="gsap-neuro-node">
            <circle cx="135" cy="55" r="4" fill="#F3E8FF" />
          </g>
          <g className="gsap-neuro-node">
            <circle cx="160" cy="175" r="5" fill="#F472B6" />
            <circle cx="160" cy="175" r="9" stroke="#F472B6" strokeOpacity="0.3" strokeWidth="1.2" />
          </g>
          <g className="gsap-neuro-node">
            <circle cx="248" cy="145" r="7" fill="#FFF9FB" />
            <circle cx="248" cy="145" r="13" stroke="#F9A8D4" strokeOpacity="0.65" strokeWidth="2" />
          </g>
          <g className="gsap-neuro-node">
            <circle cx="265" cy="160" r="5" fill="#FDE68A" />
          </g>
          <g className="gsap-neuro-node">
            <circle cx="385" cy="125" r="5.5" fill="#F9A8D4" />
            <circle cx="385" cy="125" r="10" stroke="#F9A8D4" strokeOpacity="0.3" strokeWidth="1.2" />
          </g>
          <g className="gsap-neuro-node">
            <circle cx="425" cy="45" r="4.5" fill="#E9D5FF" />
          </g>
          <g className="gsap-neuro-node">
            <circle cx="464" cy="85" r="6" fill="#FDE68A" />
            <circle cx="464" cy="85" r="12" stroke="#FDE68A" strokeOpacity="0.4" strokeWidth="1.5" />
          </g>
          <g className="gsap-neuro-node">
            <circle cx="460" cy="195" r="5" fill="#F9A8D4" />
          </g>
          <g className="gsap-neuro-node">
            <circle cx="410" cy="255" r="4.5" fill="#C084FC" />
          </g>
        </svg>
      </div>

      {/* Legenda Conceitual Sutil */}
      <div className="relative z-10 grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
        <div>
          <span className="block font-display font-semibold text-[#F9A8D4]">
            Estímulo
          </span>
          <span className="text-[#F3E8FF]/75">Prática guiada no lar</span>
        </div>
        <div>
          <span className="block font-display font-semibold text-[#F9A8D4]">
            Conexão
          </span>
          <span className="text-[#F3E8FF]/75">Novas rotas cognitivas</span>
        </div>
        <div>
          <span className="block font-display font-semibold text-[#F9A8D4]">
            Autonomia
          </span>
          <span className="text-[#F3E8FF]/75">Sentido no cotidiano</span>
        </div>
      </div>
    </div>
  );
};

