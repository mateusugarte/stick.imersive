import { useState, FormEvent, useEffect, useRef } from "react";
import ScrollReveal from "../components/ScrollReveal";
import { EtheralShadow } from "../components/ui/etheral-shadow";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Clock, MessageCircle, TrendingDown, Search, Zap, CalendarX, ShieldAlert, HeartPulse, ArrowRight } from "lucide-react";

const scrollToForm = () => {
  document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
};

// Animated floating orbs background
const FloatingOrbs = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="floating-orb floating-orb-1" />
    <div className="floating-orb floating-orb-2" />
    <div className="floating-orb floating-orb-3" />
    <div className="floating-orb floating-orb-4" />
    <div className="floating-orb floating-orb-5" />
  </div>
);

// Countdown hook
const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
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
  const target = new Date("2025-03-05T20:00:00-03:00");
  const { days, hours, minutes, seconds } = useCountdown(target);

  const blocks = [
    { value: days, label: "Dias" },
    { value: hours, label: "Horas" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Seg" },
  ];

  return (
    <div className="flex gap-3 md:gap-4 justify-center">
      {blocks.map((b, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="bg-card/80 backdrop-blur border border-border rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-foreground tabular-nums">
              {String(b.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] md:text-xs text-muted-foreground mt-1.5 uppercase tracking-wider">{b.label}</span>
        </div>
      ))}
    </div>
  );
};

const HeroSection = () => (
  <section className="min-h-[95vh] flex flex-col items-center justify-center relative z-10 px-6">
    <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
      <img
        src="/logo.png"
        alt="Logo"
        className="w-20 md:w-24 mb-8 animate-fade-in"
      />
      <div className="inline-flex items-center gap-2 bg-accent/50 border border-border rounded-full px-4 py-1.5 mb-8 animate-fade-in">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          Ao vivo · 05 de Março · Gratuito
        </span>
      </div>
      <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] font-bold mb-6 animate-fade-up text-foreground">
        Sua clínica pode estar <br className="hidden md:block" />
        perdendo <span className="text-highlight">+R$33k</span>
      </h1>
      <p className="text-muted-foreground text-base md:text-lg max-w-lg mb-4 animate-fade-up font-light leading-relaxed" style={{ animationDelay: "0.15s" }}>
        Erros silenciosos drenam seu faturamento todos os dias.
        Descubra quais são e como corrigi-los no diagnóstico ao vivo.
      </p>
      <p className="text-primary/80 text-sm font-medium mb-10 animate-fade-up uppercase tracking-wider" style={{ animationDelay: "0.2s" }}>
        100% gratuito · Duração de 30–40 minutos
      </p>
      <div className="mb-10 animate-fade-up" style={{ animationDelay: "0.25s" }}>
        <CountdownTimer />
      </div>
      <button
        onClick={scrollToForm}
        className="group bg-primary text-primary-foreground font-medium text-sm uppercase tracking-wider px-10 py-4 rounded-lg hover:bg-primary/90 transition-all duration-300 animate-fade-up flex items-center gap-2"
        style={{ animationDelay: "0.35s" }}
      >
        Garantir Minha Vaga
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </section>
);

const ProblemScrollSection = () => {
  const problemItems = [
    { icon: MessageCircle, text: "Clientes pedem valores à noite pelo WhatsApp" },
    { icon: CalendarX, text: "Querem agendar, mas não conseguem" },
    { icon: Check, text: "Estão prontas para decidir naquele momento" },
    { icon: Clock, text: "Precisam esperar até o dia seguinte" },
    { icon: TrendingDown, text: "Nesse intervalo, escolhem outra clínica" },
  ];

  return (
    <div className="relative z-10">
      <ContainerScroll
        titleComponent={
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-accent/50 border border-border rounded-full px-4 py-1.5 mb-6">
              <ShieldAlert className="w-3 h-3 text-primary" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">O problema</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
              O que acontece enquanto{" "}
              <span className="text-highlight">sua clínica está fechada?</span>
            </h2>
          </div>
        }
      >
        <div className="flex flex-col space-y-3">
          {problemItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 py-4 px-5 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-primary" strokeWidth={2} />
              </div>
              <p className="text-foreground text-sm md:text-base">{item.text}</p>
            </motion.div>
          ))}

          <div className="relative rounded-xl bg-card/50 border border-primary/20 p-6 md:p-8 text-center overflow-hidden mt-4">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            <p className="font-display text-lg md:text-2xl font-bold text-foreground leading-snug relative z-10">
              Clínicas já recuperaram{" "}
              <span className="text-highlight">+R$33.000</span>{" "}
              corrigindo falhas estruturais simples.
            </p>
          </div>
        </div>
      </ContainerScroll>
    </div>
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
    <section className="section-padding border-t border-border relative z-10">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 bg-accent/50 border border-border rounded-full px-4 py-1.5 mb-6">
            <Search className="w-3 h-3 text-primary" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">O diagnóstico</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-16 text-foreground leading-tight">
            O que você vai <span className="text-highlight">descobrir</span>
          </h2>
        </ScrollReveal>

        <div className="grid gap-3 md:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-5 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center shrink-0 mt-0.5">
                <item.icon className="w-4 h-4 text-primary" strokeWidth={2} />
              </div>
              <p className="text-foreground text-sm md:text-base leading-relaxed">{item.text}</p>
            </motion.div>
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
    <section id="formulario" className="section-padding border-t border-border relative z-10">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {!submitted ? (
            <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-accent/50 border border-border rounded-full px-4 py-1.5 mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Vagas limitadas</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 text-foreground">
                  Garanta sua vaga
                </h2>
                <p className="text-muted-foreground text-sm">
                  05 de Março · Diagnóstico Estratégico ao vivo
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-muted-foreground mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    required
                    className="w-full rounded-lg border border-border bg-background/50 backdrop-blur px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-muted-foreground mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(00) 00000-0000"
                    required
                    className="w-full rounded-lg border border-border bg-background/50 backdrop-blur px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-medium text-sm uppercase tracking-wider py-4 rounded-lg hover:bg-primary/90 transition-all duration-300 mt-2 flex items-center justify-center gap-2 group"
                >
                  Garantir Minha Vaga
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-10 text-center">
              <div className="w-14 h-14 border border-primary/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Inscrição confirmada!
              </h3>
              <p className="text-muted-foreground text-sm">
                Em breve você receberá as instruções no WhatsApp.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <EtheralShadow
        color="rgba(180, 40, 80, 1)"
        animation={{ scale: 60, speed: 25 }}
        noise={{ opacity: 0.03, scale: 1 }}
      />
      <HeroSection />
      <ProblemScrollSection />
      <DiagnosticSection />
      <FormSection />
      <footer className="text-center py-8 border-t border-border relative z-10">
        <p className="text-muted-foreground text-xs tracking-wider">
          © 2026 Diagnóstico Estratégico · Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
};

export default Index;
