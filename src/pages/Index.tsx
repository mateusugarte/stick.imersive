import { useState, FormEvent, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, Clock, MessageCircle, TrendingDown, Search, Zap, CalendarX, ShieldAlert, HeartPulse, ArrowRight } from "lucide-react";

const scrollToForm = () => {
  document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
};

const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
};

const CountdownTimer = () => {
  const target = useMemo(() => new Date("2026-03-05T20:00:00-03:00"), []);
  const t = useCountdown(target);
  const blocks = [
    { v: t.days, l: "Dias" },
    { v: t.hours, l: "Horas" },
    { v: t.minutes, l: "Min" },
    { v: t.seconds, l: "Seg" },
  ];

  return (
    <div className="flex gap-3 justify-center">
      {blocks.map((b, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="bg-card/50 border border-border/40 rounded-xl w-[4.2rem] h-[4.2rem] sm:w-20 sm:h-20 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
              {String(b.v).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground mt-1.5 uppercase tracking-widest">{b.l}</span>
        </div>
      ))}
    </div>
  );
};

const Badge = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 bg-accent/30 border border-border/30 rounded-full px-4 py-1.5 mb-6">
    {children}
  </div>
);

const Section = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`section-padding relative fade-section ${className}`}>
    {children}
  </section>
);

const HeroSection = () => (
  <section className="min-h-[100svh] flex flex-col items-center justify-center px-5 py-16 fade-section">
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
      <img src="/logo.png" alt="Logo" className="w-16 sm:w-20 mb-8" />

      <Badge>
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-widest">
          Ao vivo · 05 de Março · Gratuito
        </span>
      </Badge>

      <h1 className="font-display text-[2rem] sm:text-5xl md:text-6xl leading-[1.1] font-bold mb-5 text-foreground">
        Sua clínica pode estar{" "}
        <br className="hidden sm:block" />
        perdendo <span className="text-highlight">+R$33k</span>
      </h1>

      <p className="text-muted-foreground text-[15px] sm:text-lg max-w-md mb-3 font-light leading-relaxed">
        Erros silenciosos drenam seu faturamento todos os dias.
        Descubra quais são e como corrigi-los no diagnóstico ao vivo.
      </p>

      <p className="text-primary/60 text-xs font-medium mb-10 uppercase tracking-widest">
        100% gratuito · 30–40 minutos
      </p>

      <div className="mb-10">
        <CountdownTimer />
      </div>

      <button
        onClick={scrollToForm}
        className="w-full max-w-xs bg-primary hover:bg-primary/90 active:scale-[0.98] text-primary-foreground font-semibold text-sm uppercase tracking-wider py-4 px-8 rounded-full transition-all duration-150 flex items-center justify-center gap-2"
      >
        Garantir Minha Vaga
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </section>
);

const ProblemSection = () => {
  const items = [
    { icon: MessageCircle, text: "Clientes pedem valores à noite pelo WhatsApp" },
    { icon: CalendarX, text: "Querem agendar, mas não conseguem" },
    { icon: Check, text: "Estão prontas para decidir naquele momento" },
    { icon: Clock, text: "Precisam esperar até o dia seguinte" },
    { icon: TrendingDown, text: "Nesse intervalo, escolhem outra clínica" },
  ];

  return (
    <Section>
      <div className="max-w-2xl mx-auto">
        <Badge>
          <ShieldAlert className="w-3 h-3 text-primary" />
          <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-widest">O problema</span>
        </Badge>
        <h2 className="font-display text-[1.7rem] sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-10">
          O que acontece enquanto{" "}
          <span className="text-highlight">sua clínica está fechada?</span>
        </h2>

        <div className="flex flex-col gap-2.5">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 py-3.5 px-4 sm:px-5 rounded-xl bg-card/30 border border-border/30"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-accent/40 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-primary" strokeWidth={1.6} />
              </div>
              <p className="text-foreground/85 text-sm sm:text-base">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-card/30 border border-primary/10 p-6 sm:p-8 text-center mt-8">
          <p className="font-display text-lg sm:text-2xl font-bold text-foreground leading-snug">
            Clínicas já recuperaram{" "}
            <span className="text-highlight">+R$33.000</span>{" "}
            corrigindo falhas estruturais simples.
          </p>
        </div>
      </div>
    </Section>
  );
};

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
    <Section>
      <div className="max-w-2xl mx-auto">
        <Badge>
          <Search className="w-3 h-3 text-primary" />
          <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-widest">O diagnóstico</span>
        </Badge>
        <h2 className="font-display text-[1.7rem] sm:text-4xl md:text-5xl font-bold mb-10 text-foreground leading-tight">
          O que você vai <span className="text-highlight">descobrir</span>
        </h2>

        <div className="grid gap-2.5 sm:grid-cols-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl bg-card/30 border border-border/30"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-accent/40 flex items-center justify-center shrink-0 mt-0.5">
                <item.icon className="w-4 h-4 text-primary" strokeWidth={1.6} />
              </div>
              <p className="text-foreground/85 text-sm sm:text-base leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const FormSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;
    setLoading(true);
    const { error } = await supabase
      .from("event_registrations")
      .insert({ name: name.trim(), whatsapp: whatsapp.trim() });
    setLoading(false);
    if (error) {
      toast.error("Erro ao inscrever. Tente novamente.");
      return;
    }
    setSubmitted(true);
    toast.success("Inscrição realizada com sucesso!");
  };

  const inputClass =
    "w-full rounded-xl border border-border/40 bg-background/20 px-4 py-3.5 text-foreground placeholder:text-muted-foreground/25 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/10 transition-colors duration-150 text-sm";

  return (
    <Section id="formulario">
      <div className="max-w-sm mx-auto">
        {!submitted ? (
          <div className="bg-card/40 border border-border/30 rounded-2xl p-7 sm:p-9">
            <div className="text-center mb-7">
              <Badge>
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-widest">Vagas limitadas</span>
              </Badge>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2 text-foreground">
                Garanta sua vaga
              </h2>
              <p className="text-muted-foreground text-sm">
                05 de Março · Diagnóstico Estratégico ao vivo
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] uppercase tracking-widest font-medium text-muted-foreground mb-1.5">Nome</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome completo" required className={inputClass} />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-widest font-medium text-muted-foreground mb-1.5">WhatsApp</label>
                <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="(00) 00000-0000" required className={inputClass} />
              </div>
              <div className="pt-1.5">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 text-primary-foreground font-semibold text-sm uppercase tracking-wider py-4 px-8 rounded-full transition-all duration-150 flex items-center justify-center gap-2"
                >
                  {loading ? "Enviando..." : "Garantir Minha Vaga"}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-card/40 border border-border/30 rounded-2xl p-9 text-center animate-fade-in">
            <div className="w-12 h-12 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-5">
              <Check className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Inscrição confirmada!
            </h3>
            <p className="text-muted-foreground text-sm">
              Em breve você receberá as instruções no WhatsApp.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
};

const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />
    <ProblemSection />
    <DiagnosticSection />
    <FormSection />
    <footer className="text-center py-10">
      <p className="text-muted-foreground/40 text-xs tracking-widest">
        © 2026 Diagnóstico Estratégico · Todos os direitos reservados
      </p>
    </footer>
  </div>
);

export default Index;
