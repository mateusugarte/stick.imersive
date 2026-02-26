import { useState, FormEvent, useRef } from "react";
import ScrollReveal from "../components/ScrollReveal";
import { Check, Clock, MessageCircle, TrendingDown, Search, Zap, CalendarX, ShieldAlert, HeartPulse } from "lucide-react";

const scrollToForm = () => {
  document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
};

const HeroSection = () => (
  <section className="section-padding flex flex-col items-center text-center max-w-4xl mx-auto min-h-[80vh] justify-center">
    <img
      src="/logo.png"
      alt="Logo"
      className="w-28 md:w-36 mb-10 animate-fade-in"
    />
    <h1 className="font-display text-3xl md:text-5xl lg:text-[3.4rem] leading-tight font-bold mb-6 animate-fade-up text-foreground">
      Sua clínica pode estar perdendo{" "}
      <span className="text-highlight">+de R$33k em faturamento</span>{" "}
      com erros silenciosos
    </h1>
    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
      Todos os dias, clínicas deixam de faturar porque existem erros silenciosos que ninguém dá a atenção necessária.
      O WhatsApp ser inativo por 24 horas é um exemplo — enquanto isso, outra clínica fecha o agendamento.
    </p>
    <button
      onClick={scrollToForm}
      className="bg-primary text-primary-foreground font-body font-semibold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-up"
      style={{ animationDelay: "0.4s" }}
    >
      Quero Participar do Diagnóstico
    </button>
  </section>
);

const ProblemSection = () => (
  <section className="bg-card section-padding">
    <div className="max-w-3xl mx-auto">
      <ScrollReveal>
        <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-10 text-foreground">
          O que acontece enquanto sua clínica está fechada?
        </h2>
      </ScrollReveal>

      <div className="space-y-6 mb-12">
        {[
          { icon: MessageCircle, text: "Clientes pedem valores à noite pelo WhatsApp." },
          { icon: CalendarX, text: "Querem agendar, mas não conseguem." },
          { icon: Check, text: "Estão prontas para decidir naquele momento." },
          { icon: Clock, text: "Mas precisam esperar até o dia seguinte." },
          { icon: TrendingDown, text: "Nesse intervalo, escolhem outra clínica." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 100}>
            <div className="flex items-start gap-4 bg-background rounded-2xl p-5 shadow-sm">
              <div className="bg-accent rounded-full p-2.5 shrink-0">
                <item.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <p className="text-foreground text-base md:text-lg">{item.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={200}>
        <div className="bg-accent rounded-3xl p-8 md:p-12 text-center">
          <p className="font-display text-2xl md:text-3xl font-bold text-highlight leading-snug">
            "Algumas clínicas podem recuperar até{" "}
            <span className="underline decoration-primary/40 underline-offset-4">R$33.000</span>{" "}
            em faturamento apenas corrigindo falhas estruturais simples."
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const DiagnosticSection = () => {
  const items = [
    { icon: TrendingDown, text: "Quanto sua clínica pode estar perdendo por mês" },
    { icon: ShieldAlert, text: "Dores silenciosas que comprometem a saúde do caixa" },
    { icon: MessageCircle, text: "Como a dor do WhatsApp é gerada" },
    { icon: Search, text: "Quando é realmente necessário buscar solução" },
    { icon: HeartPulse, text: "Quais outras falhas estruturais travam o crescimento" },
    { icon: Zap, text: "Como recuperar agendamentos perdidos" },
  ];

  return (
    <section className="section-padding max-w-3xl mx-auto">
      <ScrollReveal>
        <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-12 text-foreground">
          O que você vai descobrir no Diagnóstico
        </h2>
      </ScrollReveal>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, i) => (
          <ScrollReveal key={i} delay={i * 80}>
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-accent rounded-full p-2.5 shrink-0">
                <item.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <p className="text-foreground font-body">{item.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

const FormSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim() && whatsapp.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="formulario" className="bg-card section-padding">
      <div className="max-w-md mx-auto">
        <ScrollReveal>
          {!submitted ? (
            <div className="bg-background rounded-3xl p-8 md:p-10 shadow-lg">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-2 text-foreground">
                Garanta sua vaga no Diagnóstico Estratégico
              </h2>
              <p className="text-muted-foreground text-center mb-8 text-sm">
                Vagas limitadas. Preencha abaixo para participar.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Nome</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    required
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition font-body"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 font-body">WhatsApp</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(00) 00000-0000"
                    required
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition font-body"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-body font-semibold text-base py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  Quero Descobrir como Recuperar Meus Agendamentos
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-background rounded-3xl p-10 shadow-lg text-center">
              <div className="bg-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Inscrição realizada com sucesso!
              </h3>
              <p className="text-muted-foreground font-body">
                Em breve você receberá as instruções.
              </p>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ProblemSection />
      <DiagnosticSection />
      <FormSection />
      <footer className="text-center py-8 text-muted-foreground text-sm font-body">
        © 2026 Diagnóstico Estratégico para Clínicas de Estética. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Index;
