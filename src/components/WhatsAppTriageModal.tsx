import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Copy, Check, Home, UserCheck, Sparkles, ArrowRight } from 'lucide-react';

export interface TriageModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const SERVICE_OPTIONS = [
  'Reabilitação Cognitiva Pós-AVC (Destaque)',
  'Estimulação Cognitiva',
  'Intervenção Preventiva e Terapêutica ao Idoso',
  'Estimulação Neurocognitiva — Paralisia Cerebral',
  'Comunicação Alternativa',
  'Avaliação Domiciliar Geral / Outra Demanda',
];

export const OFFICIAL_WHATSAPP_NUMBER = '554195500888';
export const OFFICIAL_WHATSAPP_DISPLAY = '(41) 9550-0888';

export const WhatsAppTriageModal: React.FC<TriageModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [contactName, setContactName] = useState('');
  const [relationship, setRelationship] = useState('Familiar / Cuidador(a)');
  const [selectedService, setSelectedService] = useState(
    initialService || SERVICE_OPTIONS[0]
  );
  const [neighborhood, setNeighborhood] = useState('');
  const [preferredPeriod, setPreferredPeriod] = useState('Manhã');
  const [notes, setNotes] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState(OFFICIAL_WHATSAPP_NUMBER);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    const savedPhone = localStorage.getItem('neuroreabilite_whatsapp_number');
    if (savedPhone && savedPhone !== '5511999999999') {
      setWhatsappPhone(savedPhone);
    } else {
      setWhatsappPhone(OFFICIAL_WHATSAPP_NUMBER);
      localStorage.setItem('neuroreabilite_whatsapp_number', OFFICIAL_WHATSAPP_NUMBER);
    }
  }, []);

  if (!isOpen) return null;

  const handlePhoneSave = (newPhone: string) => {
    const cleaned = newPhone.replace(/\D/g, '');
    const finalPhone = cleaned || OFFICIAL_WHATSAPP_NUMBER;
    setWhatsappPhone(finalPhone);
    localStorage.setItem('neuroreabilite_whatsapp_number', finalPhone);
    setIsEditingPhone(false);
  };

  const buildWhatsAppMessage = () => {
    const namePart = contactName.trim() ? `Meu nome é *${contactName.trim()}* (${relationship}).` : `Sou ${relationship} de um paciente.`;
    const locationPart = neighborhood.trim()
      ? `\n• *Região/Bairro para atendimento domiciliar:* ${neighborhood.trim()}`
      : '';
    const notesPart = notes.trim()
      ? `\n• *Breve contexto do paciente:* ${notes.trim()}`
      : '';

    return (
      `Olá, Diana Lima! Acessei o site *NEUROREABILITE* e gostaria de agendar uma Avaliação Domiciliar.\n\n` +
      `${namePart}\n` +
      `• *Especialidade de interesse:* ${selectedService}` +
      `${locationPart}\n` +
      `• *Turno de preferência:* ${preferredPeriod}` +
      `${notesPart}\n\n` +
      `Podemos conversar sobre a disponibilidade para o atendimento em domicílio?`
    );
  };

  const formattedMessage = buildWhatsAppMessage();
  const encodedMessage = encodeURIComponent(formattedMessage);
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;

  const handleCopyMessage = async () => {
    if (!contactName.trim()) {
      setErrorMessage('Por favor, informe seu nome para personalizar a apresentação.');
      return;
    }
    setErrorMessage('');
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleProceedToWhatsApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!contactName.trim()) {
      e.preventDefault();
      setErrorMessage('Por favor, informe seu nome antes de iniciar a conversa no WhatsApp.');
      return;
    }
    setErrorMessage('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1024]/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="triage-modal-title"
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-[#F3E3EC] hc-surface shadow-xl p-6 sm:p-8 my-8">
        {/* Cabeçalho do Modal */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#F3E3EC]">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#5B21B6]">
              <Home className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>NEUROREABILITE · Diana Lima · Atendimento em Domicílio</span>
            </div>
            <h2
              id="triage-modal-title"
              className="font-display text-xl sm:text-2xl font-bold text-[#1E1024] mt-1"
            >
              Agende uma Avaliação Domiciliar via WhatsApp
            </h2>
            <p className="text-sm text-[#4A3556] hc-muted mt-1">
              Preencha os dados básicos abaixo para estruturarmos sua mensagem de primeiro contato com acolhimento e agilidade.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-[#4A3556] hover:text-[#1E1024] hover:bg-[#FDF2F7] transition-colors cursor-pointer"
            aria-label="Fechar janela de agendamento"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário de Triagem */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <label
              htmlFor="triage-name"
              className="block text-xs font-semibold text-[#1E1024] mb-1.5"
            >
              Seu Nome Completo *
            </label>
            <input
              id="triage-name"
              type="text"
              value={contactName}
              onChange={(e) => {
                setContactName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Ex: Maria Helena Oliveira"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2CED8] bg-[#FFF9FB] text-[#1E1024] focus:outline-none focus:ring-2 focus:ring-[#5B21B6] focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="triage-relation"
              className="block text-xs font-semibold text-[#1E1024] mb-1.5"
            >
              Seu Vínculo com o Paciente
            </label>
            <select
              id="triage-relation"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2CED8] bg-[#FFF9FB] text-[#1E1024] focus:outline-none focus:ring-2 focus:ring-[#5B21B6] focus:bg-white"
            >
              <option value="Familiar / Cuidador(a)">Familiar / Cuidador(a)</option>
              <option value="Filho(a) ou Cônjuge">Filho(a) ou Cônjuge</option>
              <option value="Próprio(a) Paciente">Sou o(a) próprio(a) paciente</option>
              <option value="Profissional de Saúde Encaminhador">Profissional de Saúde</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="triage-service"
              className="block text-xs font-semibold text-[#1E1024] mb-1.5"
            >
              Especialidade ou Demanda Principal
            </label>
            <select
              id="triage-service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2CED8] bg-[#FFF9FB] text-[#1E1024] focus:outline-none focus:ring-2 focus:ring-[#5B21B6] focus:bg-white"
            >
              {SERVICE_OPTIONS.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="triage-neighborhood"
              className="block text-xs font-semibold text-[#1E1024] mb-1.5"
            >
              Bairro / Região (Para Visita Domiciliar)
            </label>
            <input
              id="triage-neighborhood"
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              placeholder="Informe seu bairro ou cidade"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2CED8] bg-[#FFF9FB] text-[#1E1024] focus:outline-none focus:ring-2 focus:ring-[#5B21B6] focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="triage-period"
              className="block text-xs font-semibold text-[#1E1024] mb-1.5"
            >
              Turno Preferencial
            </label>
            <select
              id="triage-period"
              value={preferredPeriod}
              onChange={(e) => setPreferredPeriod(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2CED8] bg-[#FFF9FB] text-[#1E1024] focus:outline-none focus:ring-2 focus:ring-[#5B21B6] focus:bg-white"
            >
              <option value="Manhã">Período da Manhã</option>
              <option value="Tarde">Período da Tarde</option>
              <option value="Flexível (Manhã ou Tarde)">Flexível (Manhã ou Tarde)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="triage-notes"
              className="block text-xs font-semibold text-[#1E1024] mb-1.5"
            >
              Breve relato sobre as necessidades atuais (Opcional)
            </label>
            <textarea
              id="triage-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Meu pai teve um AVC há 2 meses e buscamos estímulo de memória e linguagem em casa..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E2CED8] bg-[#FFF9FB] text-[#1E1024] focus:outline-none focus:ring-2 focus:ring-[#5B21B6] focus:bg-white"
            />
          </div>
        </div>

        {errorMessage && (
          <div className="mt-4 p-3 rounded-xl bg-[#FDF2F7] border border-[#DB2777] text-xs font-medium text-[#9D174D]">
            {errorMessage}
          </div>
        )}

        {/* Pré-visualização da Mensagem */}
        <div className="mt-5 p-4 rounded-xl bg-[#FDF2F7] border border-[#F3E3EC]">
          <div className="flex items-center justify-between text-xs text-[#583E68] mb-1.5">
            <span className="font-semibold text-[#5B21B6]">
              Prévia da mensagem para Diana Lima:
            </span>
            {!isEditingPhone ? (
              <button
                type="button"
                onClick={() => setIsEditingPhone(true)}
                className="text-xs underline hover:text-[#5B21B6] cursor-pointer"
              >
                WhatsApp: {OFFICIAL_WHATSAPP_DISPLAY} (Alterar)
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  defaultValue={whatsappPhone}
                  onBlur={(e) => handlePhoneSave(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePhoneSave(e.currentTarget.value);
                  }}
                  placeholder="554195500888"
                  className="px-2 py-0.5 text-xs bg-white border border-[#5B21B6] rounded"
                />
              </div>
            )}
          </div>
          <p className="text-xs text-[#2E1065] whitespace-pre-line leading-relaxed font-sans">
            {formattedMessage}
          </p>
        </div>

        {/* Ações de Conversão */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopyMessage}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#D8B4FE] bg-[#FAF5FF] text-[#5B21B6] hover:bg-[#F3E8FF] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#5B21B6]" />
                <span>Mensagem Copiada!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Mensagem Pronta</span>
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleProceedToWhatsApp}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-sm font-semibold shadow-sm transition-colors hc-primary-btn whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enviar no WhatsApp da Especialista</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const FloatingWhatsAppButton: React.FC = () => {
  const directMessage = encodeURIComponent(
    'Olá, Diana Lima! Acessei o site NEUROREABILITE e gostaria de conversar sobre o atendimento domiciliar.'
  );
  const directWhatsappHref = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${directMessage}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
      <a
        href={directWhatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        title={`WhatsApp: ${OFFICIAL_WHATSAPP_DISPLAY}`}
        aria-label={`Conversar diretamente no WhatsApp de Diana Lima: ${OFFICIAL_WHATSAPP_DISPLAY}`}
        className="animate-whatsapp-pulse flex items-center justify-center w-12 h-12 rounded-full bg-[#15803D] hover:bg-[#166534] text-white shadow-md border border-white/25 transition-colors cursor-pointer hc-primary-btn"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-white"
          aria-hidden="true"
        >
          <path d="M12.031 2C6.508 2 2.023 6.485 2.023 12.008c0 1.766.461 3.49 1.337 5.012L2 22l5.122-1.343a9.967 9.967 0 0 0 4.909 1.298h.004c5.522 0 10.007-4.485 10.007-10.007 0-2.674-1.041-5.188-2.932-7.079A9.946 9.946 0 0 0 12.031 2Zm5.847 14.324c-.246.693-1.43 1.326-1.996 1.411-.513.077-1.163.11-1.878-.117-.434-.138-.99-.324-1.703-.632-2.999-1.295-4.958-4.316-5.108-4.516-.15-.2-1.219-1.622-1.219-3.095 0-1.473.772-2.197 1.046-2.496.275-.3.6-.375.8-.375.2 0 .4.002.574.011.184.009.431-.07.674.514.249.6.848 2.072.923 2.222.075.15.125.325.025.524-.1.2-.15.325-.3.5-.15.174-.314.39-.449.524-.15.15-.306.312-.131.612.175.3.777 1.282 1.668 2.077 1.146 1.022 2.112 1.338 2.412 1.488.3.15.474.125.649-.075.175-.2.749-.874.949-1.174.2-.3.4-.25.674-.15.275.1 1.747.824 2.047.974.3.15.499.225.574.35.075.125.075.724-.171 1.417Z" />
        </svg>
      </a>
    </div>
  );
};

