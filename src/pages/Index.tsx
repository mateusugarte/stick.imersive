import { useState, FormEvent } from "react";
import ScrollReveal from "../components/ScrollReveal";
import { Check, Clock, MessageCircle, TrendingDown, Search, Zap, CalendarX, ShieldAlert, HeartPulse, ArrowDown } from "lucide-react";

const scrollToForm = () => {
  document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
};

const HeroSection = () => (
  <section className="section-padding flex flex-col items-center text-center max-w-5xl mx-auto min-h-[90vh] justify-center relative">
    <img
      src="/logo.png"
      alt="Logo"
      className="w-20 md:w-24 mb-16 animate-fade-in opacity-80"
    />
    <p className="uppercase tracking-[0.3em] text-muted-foreground text-xs md:text-sm font-body font-medium mb-8 animate-fade-in">
      Diagnóstico Estratégico para Clínicas de Estética
    </p>
    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-semibold mb-8 animate-fade-up text-foreground">
      Sua clínica pode estar perdendo{" "}
      <span className="text-highlight italic">+R$33k</span>{" "}
      <br className="hidden md:block" />
      em faturamento
    </h1>
    <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-14 animate-fade-up font-body font-light leading-relaxed" style={{ animationDelay: "0.2s" }}>
      Erros silenciosos drenam seu faturamento todos os dias. 
      Enquanto seu WhatsApp está inativo, outra clínica fecha o agendamento.
    </p>
    <button
      onClick={scrollToForm}
      className="bg-primary text-primary-foreground font-body font-medium text-sm uppercase tracking-[0.15em] px-12 py-4 rounded-none hover:opacity-90 transition-opacity duration-300 animate-fade-up"
      style={{ animationDelay: "0.4s" }}
    >
      Participar do Diagnóstico
    </button>
    <div className="absolute bottom-12 animate-fade-in" style={{ animationDelay: "1s" }}>
      <ArrowDown className="w-5 h-5 text-muted-foreground/50 animate-bounce" />
    </div>
  </section>
);

const ProblemSection = () => (
  <section className="section-padding border-t border-border">
    <div className="max-w-3xl mx-auto">
      <ScrollReveal>
        <p className="uppercase tracking-[0.25em] text-muted-foreground text-xs font-body font-medium text-center mb-4">
          O problema
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-center mb-16 text-foreground leading-tight">
          O que acontece enquanto <br className="hidden md:block" />
          <span className="italic text-highlight">sua clínica está fechada?</span>
        </h2>
      </ScrollReveal>

      <div className="space-y-4 mb-20">
        {[
          { icon: MessageCircle, text: "Clientes pedem valores à noite pelo WhatsApp" },
          { icon: CalendarX, text: "Querem agendar, mas não conseguem" },
          { icon: Check, text: "Estão prontas para decidir naquele momento" },
          { icon: Clock, text: "Precisam esperar até o dia seguinte" },
          { icon: TrendingDown, text: "Nesse intervalo, escolhem outra clínica" },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 80}>
            <div className="flex items-center gap-5 py-5 px-6 border-b border-border/60 group hover:bg-accent/30 transition-colors duration-300">
              <item.icon className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
              <p className="text-foreground text-base md:text-lg font-body font-light">{item.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={200}>
        <div className="text-center py-12 md:py-16 border-t border-b border-border">
          <p className="font-display text-2xl md:text-4xl font-semibold text-foreground leading-snug max-w-2xl mx-auto">
            Algumas clínicas podem recuperar até{" "}
            <span className="text-highlight italic">R$33.000</span>{" "}
            corrigindo falhas estruturais simples.
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
    { icon: HeartPulse, text: "Quais falhas estruturais travam o crescimento" },
    { icon: Zap, text: "Como recuperar agendamentos perdidos" },
  ];

  return (
    <section className="section-padding bg-card border-t border-border">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="uppercase tracking-[0.25em] text-muted-foreground text-xs font-body font-medium text-center mb-4">
            O diagnóstico
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-center mb-16 text-foreground leading-tight">
            O que você vai <span className="italic">descobrir</span>
          </h2>
        </ScrollReveal>

        <div className="grid gap-0 md:grid-cols-2">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div className="flex items-start gap-4 p-6 md:p-8 border-b border-border/60 md:even:border-l">
                <item.icon className="w-4 h-4 text-primary shrink-0 mt-1" strokeWidth={1.5} />
                <p className="text-foreground font-body font-light text-base leading-relaxed">{item.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
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
    <section id="formulario" className="section-padding border-t border-border">
      <div className="max-w-md mx-auto">
        <ScrollReveal>
          {!submitted ? (
            <div className="text-center">
              <p className="uppercase tracking-[0.25em] text-muted-foreground text-xs font-body font-medium mb-4">
                Inscreva-se
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-3 text-foreground">
                Garanta sua vaga
              </h2>
              <p className="text-muted-foreground text-sm mb-12 font-body font-light">
                Vagas limitadas para o Diagnóstico Estratégico
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground mb-2 font-body">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    required
                    className="w-full border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-body text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground mb-2 font-body">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(00) 00000-0000"
                    required
                    className="w-full border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-body text-base"
                  />
                </div>
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-body font-medium text-sm uppercase tracking-[0.15em] py-4 rounded-none hover:opacity-90 transition-opacity duration-300"
                  >
                    Quero Recuperar Meus Agendamentos
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-12 h-12 border border-primary rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Inscrição realizada
              </h3>
              <p className="text-muted-foreground font-body font-light text-base">
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
      <footer className="text-center py-10 border-t border-border">
        <p className="text-muted-foreground text-xs font-body tracking-wider uppercase">
          © 2026 Diagnóstico Estratégico · Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
};

export default Index;
