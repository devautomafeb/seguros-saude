import type { FC } from "react";

declare global {
  interface Window {
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

const WHATSAPP_NUMBER = "5522981132979"; // +55 22 98113-2979
const WHATSAPP_DISPLAY = "(22) 98113-2979";

/* =========================
   WHATSAPP + CONVERSÃO (Google Ads)
   - A conversão "Pedir estimativa do custo" fica no index.html (gtag_report_conversion)
   - Aqui só chamamos a função no clique e redirecionamos para o WhatsApp
   ========================= */
function openWhatsApp(message: string) {
  const text = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

  // Dispara a conversão e redireciona (callback do snippet faz o redirect)
  if (typeof window !== "undefined" && typeof window.gtag_report_conversion === "function") {
    window.gtag_report_conversion(url);
    return;
  }

  // Fallback caso o gtag ainda não tenha carregado
  window.open(url, "_blank", "noopener,noreferrer");
}

/* =========================
   DADOS
   ========================= */
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
};

const plans: Plan[] = [
  {
    id: 1,
    title: "Plano Individual ou Familiar",
    text: "Ideal para quem busca proteção para si e para a família, com diferentes faixas de preços e redes credenciadas.",
  },
  {
    id: 2,
    title: "Plano Empresarial / MEI",
    text: "Condições especiais para CNPJ e MEI, com possibilidade de incluir colaboradores e dependentes.",
  },
  {
    id: 3,
    title: "Planos para Idosos",
    text: "Opções focadas na terceira idade, com atenção especial a hospitais, clínicas e exames essenciais.",
  },
];

/* =========================
   APP
   ========================= */
const App: FC = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl bg-gradient-to-br from-cyan-500 to-emerald-400 rounded-3xl p-5 md:p-7 shadow-2xl text-slate-900">
        {/* TOP BAR */}
        <header className="flex items-center justify-between gap-4 mb-5 text-cyan-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur">
              ❤
            </div>
            <div className="leading-tight">
              <p className="text-[0.8rem] font-bold tracking-[0.18em] uppercase">
                MEDSAÚDE
              </p>
              <p className="text-[0.75rem] opacity-90">
                Especialista em Planos de Saúde
              </p>
            </div>
          </div>

          <button
            className="rounded-full border border-white/70 bg-white/15 px-4 py-2 text-[0.8rem] font-medium backdrop-blur hover:bg-white/25 transition"
            onClick={() =>
              openWhatsApp(
                "Olá, Thamiris! Vi seu site e quero informações sobre planos de saúde."
              )
            }
          >
            Falar no WhatsApp
          </button>
        </header>

        {/* HERO */}
        <section className="flex flex-col md:flex-row gap-6 bg-sky-50/95 rounded-2xl px-6 py-6">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 mb-2">
              Sua saúde é a nossa prioridade
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold mb-3">
              Planos de saúde com{" "}
              <span className="text-blue-600">Thamiris Fonseca</span>
            </h1>

            <p className="text-sm md:text-base text-slate-600 mb-4 max-w-xl">
              Compare diversas operadoras e encontre o plano ideal para você,
              sua família ou empresa. Atendimento humanizado, transparente e sem
              burocracia.
            </p>

            <button
              className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-emerald-700 transition"
              onClick={() =>
                openWhatsApp(
                  "Olá, Thamiris! Gostaria de uma estimativa do custo / orçamento de um plano de saúde."
                )
              }
            >
              Pedir orçamento pelo WhatsApp
            </button>

            <p className="mt-2 text-[0.75rem] text-slate-500">
              WhatsApp: <span className="font-medium">{WHATSAPP_DISPLAY}</span>
            </p>
          </div>

          <div className="self-center">
            <img
              src="tata.jpg"
              alt="Thamiris Fonseca - Especialista em Planos de Saúde"
              className="w-56 rounded-full border-[6px] border-emerald-500 shadow-xl object-cover"
            />
          </div>
        </section>

        {/* OPERADORAS */}
        <section className="mt-5 bg-sky-50/95 rounded-2xl px-5 py-4">
          <h2 className="text-lg font-semibold mb-2">Operadoras parceiras</h2>
          <div className="flex flex-wrap gap-2">
            {operators.map((op) => (
              <span
                key={op}
                className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border"
              >
                {op}
              </span>
            ))}
          </div>
        </section>

        {/* PLANOS */}
        <section className="mt-5 bg-sky-50/95 rounded-2xl px-5 py-4">
          <h2 className="text-lg font-semibold mb-3">
            Como a Thamiris pode te ajudar
          </h2>

          <div className="grid md:grid-cols-3 gap-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-xl p-4 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold text-sm mb-2">{plan.title}</h3>
                  <p className="text-xs text-slate-600 mb-4">{plan.text}</p>
                </div>

                <button
                  className="rounded-full border border-emerald-600 text-emerald-700 text-xs font-semibold py-2 hover:bg-emerald-600 hover:text-white transition"
                  onClick={() =>
                    openWhatsApp(
                      `Olá, Thamiris! Tenho interesse em ${plan.title} e gostaria de uma estimativa do custo / orçamento.`
                    )
                  }
                >
                  Quero um orçamento
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="mt-5 bg-slate-900 rounded-2xl px-6 py-6 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">
              Quer receber uma simulação agora?
            </h2>
            <p className="text-sm text-slate-200">
              Clique no botão abaixo e fale diretamente com a Thamiris.
            </p>
          </div>

          <button
            className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-lg hover:bg-emerald-400 transition"
            onClick={() =>
              openWhatsApp(
                "Oi, Thamiris! Quero comparar planos de saúde e receber uma simulação (estimativa de custo)."
              )
            }
          >
            Falar no WhatsApp
          </button>
        </section>

        {/* RODAPÉ */}
        <footer className="mt-4 text-center text-[0.75rem] text-cyan-50">
          <p>MEDSAÚDE • Thamiris Fonseca</p>
          <p>CNPJ: 44.352.479/0001-09</p>
          <p>Sua saúde é a nossa prioridade.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
