import type { FC } from "react";

const WHATSAPP_NUMBER = "5522981132979"; // +55 22 98113-2979
const WHATSAPP_DISPLAY = "(22) 98113-2979";

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

function openWhatsApp(message: string) {
  const text = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  window.open(url, "_blank");
}

const App: FC = () => {
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
        <section className="flex flex-col md:flex-row gap-6 md:gap-8 bg-sky-50/95 rounded-2xl px-5 py-5 md:px-7 md:py-7">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 mb-2">
              Sua saúde é a nossa prioridade
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">
              Planos de saúde com{" "}
              <span className="text-blue-600">Thamiris Fonseca</span>
            </h1>
            <p className="text-sm md:text-base text-slate-600 mb-4 max-w-xl">
              Compare diversas operadoras e encontre o plano ideal para você,
              sua família ou empresa. Atendimento humanizado, transparente e sem
              burocracia.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-2">
              <button
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-emerald-50 shadow-lg shadow-emerald-600/50 hover:bg-emerald-700 transition"
                onClick={() =>
                  openWhatsApp(
                    "Olá, Thamiris! Gostaria de um orçamento de plano de saúde."
                  )
                }
              >
                Pedir orçamento pelo WhatsApp
              </button>
            </div>

            <p className="text-[0.75rem] text-slate-500">
              Atendimento online para toda a região. Cotação rápida e sem
              compromisso.
            </p>
          </div>

          <div className="flex-shrink-0 self-center md:self-auto">
            <div className="relative">
              <img
                src={"tata.jpg"}
                alt="Thamiris Fonseca - Especialista em Planos de Saúde"
                className="w-52 md:w-60 rounded-full border-[6px] border-emerald-500 shadow-2xl object-cover"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900 text-slate-50 px-4 py-2 rounded-full shadow-xl text-center">
                <p className="text-xs font-semibold leading-tight">
                  Thamiris Fonseca
                </p>
                <p className="text-[0.65rem] opacity-80 leading-tight">
                  Especialista em Planos de Saúde
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OPERADORAS */}
        <section className="mt-5 bg-sky-50/95 rounded-2xl px-5 py-4">
          <div className="mb-3">
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              Operadoras parceiras
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Trabalhamos com diversas operadoras de saúde, oferecendo opções
              para diferentes perfis e orçamentos. A Thamiris compara as
              coberturas e encontra o melhor custo-benefício para você.
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
              Como a Thamiris pode te ajudar
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Em poucos minutos você recebe simulações com as principais opções
              de planos disponíveis para o seu perfil.
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
                  className="w-full rounded-full border border-emerald-600 text-emerald-700 text-xs font-semibold py-2 hover:bg-emerald-600 hover:text-emerald-50 transition"
                  onClick={() =>
                    openWhatsApp(
                      `Olá, Thamiris! Tenho interesse em ${plan.title} e gostaria de um orçamento.`
                    )
                  }
                >
                  Quero um orçamento
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
              Thamiris Fonseca é{" "}
              <span className="font-semibold">
                especialista em planos de saúde
              </span>{" "}
              na <span className="font-semibold">MEDSAÚDE</span>, atuando com
              foco em pessoas físicas, famílias, autônomos e empresas.
            </p>
            <p>
              O atendimento é totalmente personalizado: ela entende sua
              necessidade, compara as opções entre as operadoras parceiras e
              apresenta as melhores alternativas de forma simples e clara.
            </p>
            <p>
              Você não precisa lidar com vários canais diferentes. A Thamiris
              acompanha você desde a cotação até depois da contratação, ajudando
              sempre que precisar.
            </p>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="mt-5 bg-slate-900 rounded-2xl px-5 py-5 text-slate-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-1">
              Quer receber uma simulação agora?
            </h2>
            <p className="text-sm text-slate-200 max-w-md">
              Clique no botão abaixo e fale diretamente com a Thamiris pelo
              WhatsApp. Sem compromisso.
            </p>
          </div>
          <button
            className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/60 hover:bg-emerald-400 transition"
            onClick={() =>
              openWhatsApp(
                "Oi, Thamiris! Quero comparar planos de saúde e receber uma simulação."
              )
            }
          >
            Falar com a Thamiris no WhatsApp
          </button>
        </section>

        {/* RODAPÉ */}
        <footer className="mt-4 text-center text-[0.75rem] text-cyan-50/95 space-y-1">
          <p>
            MEDSAÚDE • Especialista em Planos de Saúde – Thamiris Fonseca
          </p>
          <p className="opacity-90">
            CNPJ: <span className="font-medium">44.352.479/0001-09</span>
          </p>
          <p className="opacity-90">
            Sua saúde é a nossa prioridade. 
          </p>

          <div className="flex items-center justify-center gap-2 pt-2">
            <a
              href="https://www.instagram.com/med_saude_seguros/?igsh=MXgzeGwzd2VkZmoxYQ%3D%3D#"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram MEDSAÚDE"
              className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/90 text-pink-600 hover:bg-white transition"
            >
              {/* Ícone simples do Instagram (SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="currentColor"
              >
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm10 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
