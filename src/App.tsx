import type { FC } from "react";
import { useMemo, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const WHATSAPP_NUMBER = "5522981132979"; // +55 22 98113-2979
const WHATSAPP_DISPLAY = "(22) 98113-2979";
const SERVICE_REGION = "Estado do Rio de Janeiro (RJ)";

/**
 * Se você tiver o label de conversão do Google Ads, coloque aqui.
 * Exemplo: "AW-17306386716/nX7YCMehgNQbEJyCqrxA"
 * Se não tiver, pode deixar vazio "".
 */
const SEND_TO = "AW-17306386716/nX7YCMehgNQbEJyCqrxA"; // <-- coloque aqui quando souber

const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const operators: string[] = [
  "SulAmérica",
  "Porto Seguro",
  "Ampla Saúde",
  "Prevent Senior",
  "Unimed",
  "Leve Saúde",
  "MedSênior",
  "Bradesco Saúde",
  "Klini",
  "Cemeru",
  "Amil",
  "Saúde Assim",
  "Integral Saúde Caberj",
  "Blue Med",
  "Grupo NotreDame Intermédica",
  "Memorial Saúde",
  "Ônix Saúde",
  "HSMed",
];

type Plan = {
  id: number;
  title: string;
  text: string;
  cta: string;
};

const plans: Plan[] = [
  {
    id: 1,
    title: "Plano Individual ou Familiar",
    text: "Ideal para quem busca proteção para si e para a família, com faixas de preço e redes credenciadas diferentes.",
    cta: "Quero cotar plano individual/familiar",
  },
  {
    id: 2,
    title: "Plano Empresarial / MEI",
    text: "Condições especiais para CNPJ e MEI, com possibilidade de incluir colaboradores e dependentes.",
    cta: "Quero cotar plano MEI/empresa",
  },
  {
    id: 3,
    title: "Planos para Idosos",
    text: "Opções focadas na terceira idade, com atenção especial a hospitais, clínicas e exames essenciais.",
    cta: "Quero cotar plano para idoso",
  },
];

function trackAndOpenWhatsApp(message: string) {
  const url = buildWhatsAppUrl(message);

  // Se tiver gtag + label, tenta registrar conversão e depois abre.
  if (
    typeof window !== "undefined" &&
    typeof window.gtag === "function" &&
    SEND_TO.trim().length > 0
  ) {
    window.gtag("event", "conversion", {
      send_to: SEND_TO,
      event_callback: () => window.open(url, "_blank", "noopener,noreferrer"),
    });

    // fallback: abre mesmo se o callback não rodar rápido
    setTimeout(() => window.open(url, "_blank", "noopener,noreferrer"), 700);
    return;
  }

  // Sem gtag/label: só abre
  window.open(url, "_blank", "noopener,noreferrer");
}

const App: FC = () => {
  // Pré-qualificação
  const [perfil, setPerfil] = useState<"Pessoa Física" | "MEI/Empresa" | "">("");
  const [cidade, setCidade] = useState("");
  const [idade, setIdade] = useState("");
  const [objetivo, setObjetivo] = useState<
    "Cotar agora" | "Trocar e pagar menos" | "Manter rede/hospital" | ""
  >("");

  const canSend = useMemo(() => {
    return perfil !== "" && cidade.trim().length >= 2;
  }, [perfil, cidade]);

  const baseMessage = useMemo(() => {
    const cidadeLimpa = cidade.trim();
    const idadeLimpa = idade.trim();
    const objetivoTxt = objetivo ? `Objetivo: ${objetivo}. ` : "";

    const idadeTxt = idadeLimpa ? `Idade: ${idadeLimpa}. ` : "";

    return `Olá, Thamiris! Quero uma cotação de plano de saúde. ${objetivoTxt}Perfil: ${perfil || "—"}. Cidade: ${cidadeLimpa || "—"} (RJ). ${idadeTxt}Pode me orientar com as melhores opções e custo-benefício?`;
  }, [perfil, cidade, idade, objetivo]);

  function sendToWhatsApp(customExtra?: string) {
    const msg = customExtra ? `${baseMessage}\n\n${customExtra}` : baseMessage;
    trackAndOpenWhatsApp(msg);
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl bg-gradient-to-br from-cyan-500 to-emerald-400 rounded-3xl p-5 md:p-7 shadow-2xl text-slate-900">
        {/* TOP BAR */}
        <header className="flex items-center justify-between gap-4 mb-5 text-cyan-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur">
              <span className="text-base">❤</span>
            </div>
            <div className="leading-tight">
              <p className="text-[0.8rem] font-bold tracking-[0.18em] uppercase">
                MEDSAÚDE
              </p>
              <p className="text-[0.75rem] opacity-90">
                Planos de Saúde • {SERVICE_REGION}
              </p>
            </div>
          </div>

          <button
            onClick={() => sendToWhatsApp("Quero atendimento agora, por favor.")}
            className="rounded-full border border-white/70 bg-white/15 px-4 py-2 text-[0.8rem] font-medium backdrop-blur hover:bg-white/25 transition text-center"
            type="button"
          >
            Falar no WhatsApp
          </button>
        </header>

        {/* BLOCO DE CONVERSÃO (ACIMA DA DOBRA) */}
        <section className="bg-white/95 rounded-2xl px-5 py-5 md:px-7 md:py-7 shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 mb-2">
            Cotação rápida • Sem compromisso
          </p>

          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">
            Cotação de plano de saúde em poucos minutos no WhatsApp
          </h1>

          <p className="text-sm md:text-base text-slate-600 mb-4 max-w-2xl">
            Atendimento para todo o <span className="font-semibold">{SERVICE_REGION}</span>.
            A Thamiris compara operadoras, cobertura e rede para encontrar o melhor custo-benefício.
          </p>

          {/* Mini bullets */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              "Pessoa Física / Familiar",
              "MEI / Empresarial",
              "Idosos",
              "Troca para pagar menos",
              "Rede/hospital que você precisa",
            ].map((b) => (
              <span
                key={b}
                className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-100"
              >
                {b}
              </span>
            ))}
          </div>

          {/* Pré-qualificação */}
          <div className="grid gap-3 md:grid-cols-4 items-end">
            <div className="md:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Seu perfil
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPerfil("Pessoa Física")}
                  className={`flex-1 px-3 py-2 rounded-xl border text-xs font-semibold transition ${
                    perfil === "Pessoa Física"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  PF
                </button>
                <button
                  type="button"
                  onClick={() => setPerfil("MEI/Empresa")}
                  className={`flex-1 px-3 py-2 rounded-xl border text-xs font-semibold transition ${
                    perfil === "MEI/Empresa"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  MEI/Empresa
                </button>
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Cidade (RJ)
              </label>
              <input
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                placeholder="Ex: Niterói"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Idade (opcional)
              </label>
              <input
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                placeholder="Ex: 32"
                inputMode="numeric"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Objetivo (opcional)
              </label>
              <select
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
              >
                <option value="">Selecione…</option>
                <option value="Cotar agora">Cotar agora</option>
                <option value="Trocar e pagar menos">Trocar e pagar menos</option>
                <option value="Manter rede/hospital">Manter rede/hospital</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => sendToWhatsApp()}
              disabled={!canSend}
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-emerald-50 shadow-lg shadow-emerald-600/40 hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Quero cotar agora no WhatsApp
            </button>

            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-900">Dica:</span> quanto mais dados você mandar, mais rápida fica a simulação.
              <span className="block mt-1">
                Atendimento via WhatsApp: <span className="font-semibold text-slate-900">{WHATSAPP_DISPLAY}</span>
              </span>
            </div>
          </div>
        </section>

        {/* HERO (mantido, mas mais direto) */}
        <section className="mt-5 flex flex-col md:flex-row gap-6 md:gap-8 bg-sky-50/95 rounded-2xl px-5 py-5 md:px-7 md:py-7">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 mb-2">
              {SERVICE_REGION}
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">
              Planos de saúde com <span className="text-blue-600">Thamiris Fonseca</span>
            </h2>

            <p className="text-sm md:text-base text-slate-600 mb-4 max-w-xl">
              Simulações com as principais operadoras e opções para Pessoa Física, MEI e empresas.
              Atendimento transparente e sem burocracia.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => sendToWhatsApp("Tenho interesse e quero simulação com melhor custo-benefício.")}
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-emerald-50 shadow-lg shadow-emerald-600/50 hover:bg-emerald-700 transition text-center"
              >
                Pedir simulação pelo WhatsApp
              </button>

              <button
                type="button"
                onClick={() => sendToWhatsApp("Quero trocar de plano e reduzir valor mensal.")}
                className="inline-flex items-center justify-center rounded-full border border-emerald-600 px-5 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-600 hover:text-emerald-50 transition text-center"
              >
                Quero pagar menos
              </button>
            </div>

            <p className="text-[0.75rem] text-slate-500 mt-3">
              Envie: cidade (RJ), idade e se é PF/MEI. A Thamiris retorna com 2–3 opções recomendadas.
            </p>
          </div>

          <div className="flex-shrink-0 self-center md:self-auto">
            <div className="relative">
              <img
                src={"tata.jpg"}
                alt="Thamiris Fonseca - Corretora de Planos de Saúde"
                className="w-52 md:w-60 rounded-full border-[6px] border-emerald-500 shadow-2xl object-cover"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900 text-slate-50 px-4 py-2 rounded-full shadow-xl text-center">
                <p className="text-xs font-semibold leading-tight">Thamiris Fonseca</p>
                <p className="text-[0.65rem] opacity-80 leading-tight">
                  Consultora de Planos de Saúde
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="mt-5 bg-sky-50/95 rounded-2xl px-5 py-4">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
            Como funciona (em 3 passos)
          </h2>

          <div className="grid gap-3 md:grid-cols-3">
            {[
              {
                t: "1) Você chama no WhatsApp",
                d: "Envie sua cidade (RJ), idade e se é PF/MEI/Empresa.",
              },
              {
                t: "2) A Thamiris simula e compara",
                d: "Ela checa operadoras, cobertura, rede e custo-benefício.",
              },
              {
                t: "3) Você recebe 2–3 opções",
                d: "Você escolhe a melhor e ela acompanha o processo.",
              },
            ].map((x) => (
              <div key={x.t} className="bg-white rounded-xl p-3 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">{x.t}</p>
                <p className="text-xs text-slate-600 mt-1">{x.d}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => sendToWhatsApp("Quero começar agora. Pode me orientar?")}
            className="mt-4 w-full rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-emerald-50 shadow-lg shadow-emerald-600/40 hover:bg-emerald-700 transition text-center"
          >
            Começar agora no WhatsApp
          </button>
        </section>

        {/* OPERADORAS */}
        <section className="mt-5 bg-sky-50/95 rounded-2xl px-5 py-4">
          <div className="mb-3">
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              Operadoras parceiras
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Opções para diferentes perfis e orçamentos no {SERVICE_REGION}.
              A Thamiris compara coberturas e rede para encontrar o melhor custo-benefício.
            </p>
          </div>

          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {operators.map((op) => (
                <span
                  key={op}
                  className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-100"
                >
                  {op}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PLANOS */}
        <section className="mt-5 bg-sky-50/95 rounded-2xl px-5 py-4">
          <div className="mb-3">
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              O que você quer cotar?
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Clique no tipo de plano e fale com a Thamiris no WhatsApp.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.id}
                className="bg-white rounded-xl p-3 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-slate-600 mb-3">{plan.text}</p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    sendToWhatsApp(
                      `Tenho interesse em: ${plan.title}. Quero simulação para ${cidade ? `${cidade} (RJ)` : "RJ"}.`
                    )
                  }
                  className="w-full rounded-full border border-emerald-600 text-emerald-700 text-xs font-semibold py-2 hover:bg-emerald-600 hover:text-emerald-50 transition text-center"
                >
                  {plan.cta}
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* SOBRE */}
        <section className="mt-5 bg-sky-50/95 rounded-2xl px-5 py-4">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
            Sobre a Thamiris Fonseca
          </h2>
          <div className="space-y-2 text-sm text-slate-600">
            <p>
              Thamiris Fonseca é consultora na{" "}
              <span className="font-semibold">MEDSAÚDE</span>, especializada em
              planos de saúde para pessoas físicas, famílias, autônomos, MEI e
              empresas no {SERVICE_REGION}.
            </p>
            <p>
              Atendimento personalizado: ela entende sua necessidade, compara as
              opções entre as operadoras e apresenta alternativas de forma simples
              e clara.
            </p>
            <p>
              Acompanhamento do início ao pós-contratação (dúvidas, rede, uso e orientações).
            </p>
          </div>

          <button
            type="button"
            onClick={() => sendToWhatsApp("Quero tirar uma dúvida rápida e entender as melhores opções.")}
            className="mt-4 w-full rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-emerald-50 shadow-lg shadow-emerald-600/40 hover:bg-emerald-700 transition text-center"
          >
            Falar com a Thamiris no WhatsApp
          </button>
        </section>

        {/* CTA FINAL */}
        <section className="mt-5 bg-slate-900 rounded-2xl px-5 py-5 text-slate-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-1">
              Quer receber uma simulação agora?
            </h2>
            <p className="text-sm text-slate-200 max-w-md">
              Clique no botão e envie sua cidade (RJ), idade e se é PF/MEI.
              Sem compromisso.
            </p>
          </div>

          <button
            type="button"
            onClick={() => sendToWhatsApp("Quero simulação agora. Me diga quais dados você precisa.")}
            className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/60 hover:bg-emerald-400 transition text-center"
          >
            Chamar no WhatsApp agora
          </button>
        </section>

        {/* RODAPÉ */}
        <footer className="mt-4 text-center text-[0.75rem] text-cyan-50/95">
          <p>MEDSAÚDE Corretora de Seguros • {SERVICE_REGION}</p>
          <p className="mt-1 opacity-90">
            Atendimento via WhatsApp: {WHATSAPP_DISPLAY}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
