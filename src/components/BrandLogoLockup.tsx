import React from 'react';

interface BrandLogoLockupProps {
  size?: 'sm' | 'md' | 'lg';
  inverted?: boolean;
  variant?: 'restructured' | 'full-image';
  allowToggleVariant?: boolean;
}

const OFFICIAL_LOGO_PATH = '/assets/aistudio/Logos-DianaLima_4914af5c.png';

/**
 * Exibe a logo oficial completa da especialista Diana Lima de forma livre (sem caixa/box ao redor
 * e sem os textos duplicados ou botão de alternância abaixo).
 */
export const BrandLogoLockup: React.FC<BrandLogoLockupProps> = ({
  size = 'md',
  inverted = false,
}) => {
  const imageDimensions = {
    sm: 'h-24 sm:h-28 w-auto',
    md: 'h-32 sm:h-40 w-auto',
    lg: 'h-44 sm:h-52 w-auto',
  }[size];

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${
        inverted
          ? 'bg-white rounded-2xl px-5 py-3 shadow-md border border-[#F3E3EC]'
          : ''
      }`}
      aria-label="Logotipo Oficial Diana Lima"
    >
      <img
        src={OFFICIAL_LOGO_PATH}
        alt="Logotipo Oficial Diana Lima"
        referrerPolicy="no-referrer"
        className={`${imageDimensions} object-contain pointer-events-none transition-transform duration-300 hover:scale-[1.02] ${
          inverted ? '' : 'mix-blend-multiply'
        }`}
      />
    </div>
  );
};
