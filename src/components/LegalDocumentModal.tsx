import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { OFFICIAL_WHATSAPP_DISPLAY } from './WhatsAppTriageModal';

export type LegalDocType = 'privacy' | 'terms' | null;

interface LegalDocumentModalProps {
  activeDoc: LegalDocType;
  onClose: () => void;
  onSelectDoc: (doc: 'privacy' | 'terms') => void;
}

export const LegalDocumentModal: React.FC<LegalDocumentModalProps> = ({
  activeDoc,
  onClose,
  onSelectDoc,
}) => {
  if (!activeDoc) return null;

  const isPrivacy = activeDoc === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1024]/70 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className="relative w-full max-w-3xl rounded-2xl bg-white border border-[#F3E3EC] hc-surface shadow-2xl p-6 sm:p-8 my-8 max-h-[88vh] flex flex-col">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#F3E3EC] shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6B1D57] uppercase tracking-wider">
              {isPrivacy ? (
                <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              ) : (
                <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
              )}
              <span>NEUROREABILITE · Diana Lima · Transparência e Ética</span>
            </div>
            <h2
              id="legal-modal-title"
              className="font-display text-xl sm:text-2xl font-bold text-[#1E1024] mt-1"
            >
              {isPrivacy ? 'Política de Privacidade e Proteção de Dados' : 'Termos e Condições de Uso'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-[#4A3556] hover:text-[#1E1024] hover:bg-[#FDF2F7] transition-colors cursor-pointer"
            aria-label="Fechar documento"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alternador entre Política de Privacidade e Termos de Uso */}
        <div className="flex items-center gap-2 pt-4 pb-2 shrink-0">
          <button
            type="button"
            onClick={() => onSelectDoc('privacy')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              isPrivacy
                ? 'bg-[#6B1D57] text-white'
                : 'bg-[#FDF2F7] text-[#3B1D54] hover:bg-[#F3E3EC]'
            }`}
          >
            Política de Privacidade
          </button>
          <button
            type="button"
            onClick={() => onSelectDoc('terms')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              !isPrivacy
                ? 'bg-[#6B1D57] text-white'
                : 'bg-[#FDF2F7] text-[#3B1D54] hover:bg-[#F3E3EC]'
            }`}
          >
            Termos de Uso
          </button>
        </div>

        {/* Conteúdo Rolável */}
        <div className="mt-3 pr-2 overflow-y-auto space-y-5 text-sm text-[#3B1D54] hc-muted leading-relaxed">
          {isPrivacy ? (
            <>
              <p>
                A <strong>NEUROREABILITE — Diana Lima</strong> valoriza a privacidade, o sigilo ético e a segurança das informações compartilhadas por pacientes, familiares, cuidadores e visitantes deste site, em conformidade com a <strong>Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD)</strong>.
              </p>

              <div>
                <h3 className="font-display text-base font-bold text-[#1E1024] mb-1">
                  1. Coleta e Finalidade das Informações
                </h3>
                <p>
                  Os dados informados voluntariamente no formulário de triagem (como nome, vínculo familiar, bairro/região e breve contexto da demanda) têm como única finalidade estruturar a mensagem inicial de atendimento que o próprio usuário envia via WhatsApp oficial ({OFFICIAL_WHATSAPP_DISPLAY}) para agendamento de avaliação domiciliar.
                </p>
              </div>

              <div>
                <h3 className="font-display text-base font-bold text-[#1E1024] mb-1">
                  2. Armazenamento e Sigilo Profissional
                </h3>
                <p>
                  Este site não comercializa nem compartilha dados pessoais com terceiros. Todas as informações clínicas ou familiares compartilhadas durante o contato direto e ao longo do acompanhamento psicopedagógico e neurocognitivo domiciliar são tratadas sob rigoroso sigilo ético profissional.
                </p>
              </div>

              <div>
                <h3 className="font-display text-base font-bold text-[#1E1024] mb-1">
                  3. Direitos do Titular dos Dados
                </h3>
                <p>
                  Você pode, a qualquer momento, solicitar informações, atualização ou exclusão de seus dados de contato diretamente pelo canal oficial de atendimento via WhatsApp ({OFFICIAL_WHATSAPP_DISPLAY}).
                </p>
              </div>
            </>
          ) : (
            <>
              <p>
                Estes Termos de Uso regulam o acesso e a utilização do site institucional de <strong>Diana Lima — Psicopedagoga Especialista em Neuroaprendizagem e Comunicação Alternativa</strong>.
              </p>

              <div>
                <h3 className="font-display text-base font-bold text-[#1E1024] mb-1">
                  1. Caráter Informativo e Educativo
                </h3>
                <p>
                  O conteúdo disponibilizado neste portal tem finalidade estritamente informativa sobre as práticas de reabilitação cognitiva pós-AVC, estimulação neurocognitiva, intervenção preventiva e terapêutica ao idoso e comunicação alternativa em modalidade domiciliar. Nenhuma informação do site substitui a avaliação presencial individualizada ou o acompanhamento médico especializado.
                </p>
              </div>

              <div>
                <h3 className="font-display text-base font-bold text-[#1E1024] mb-1">
                  2. Ética em Saúde e Ausência de Promessa de Resultado
                </h3>
                <p>
                  Em respeito à ética em saúde e às evidências científicas sobre neuroplasticidade, o acompanhamento terapêutico domiciliar visa estimular potencialidades, favorecer a autonomia funcional e promover qualidade de vida no ritmo singular de cada pessoa, sem promessas irreais ou garantias padronizadas de cura.
                </p>
              </div>

              <div>
                <h3 className="font-display text-base font-bold text-[#1E1024] mb-1">
                  3. Propriedade Intelectual
                </h3>
                <p>
                  A marca <strong>Diana Lima — Neuroaprendizagem</strong>, textos autorais, fotografias e materiais visuais deste site são protegidos por direitos autorais, sendo vedada sua reprodução comercial desautorizada.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="mt-6 pt-4 border-t border-[#F3E3EC] flex items-center justify-between gap-4 shrink-0">
          <span className="text-xs text-[#583E68] hc-muted">
            NEUROREABILITE — Diana Lima · Atendimento Domiciliar
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#6B1D57] hover:bg-[#521442] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer hc-primary-btn"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
