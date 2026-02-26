import { useState, FormEvent, useEffect, useMemo, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { EtheralShadow } from "../components/ui/etheral-shadow";
import { ShinyButton } from "../components/ui/shiny-button";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Clock, MessageCircle, TrendingDown, Search, Zap, CalendarX, ShieldAlert, HeartPulse, ArrowRight } from "lucide-react";

// Reduced sparkles for lighter feel
const FloatingSparkles = () => {
  const sparkles = useMemo(() => 
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 1,
      delay: Math.random() * 6,
      duration: Math.random() * 8 + 6,
      opacity: Math.random() * 0.3 + 0.05,
    }))
  , []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-primary/40"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            willChange: "opacity, transform",
          }}
          animate={{
            opacity: [0, s.opacity, 0],
            scale: [0.8, 1.1, 0.8],
            y: [0, -20, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const scrollToForm = () => {
  document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
};

// Shared animation variants for consistency
const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { delay, duration: 0.5, ease: "easeOut" as const },
  }),
};

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
  const target = useMemo(() => new Date("2026-03-05T20:00:00-03:00"), []);
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
        <motion.div
          key={i}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3 + i * 0.08}
          className="flex flex-col items-center"
        >
          <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-colors duration-300">
            <span className="text-2xl md:text-3xl font-bold text-foreground tabular-nums">
              {String(b.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] md:text-xs text-muted-foreground mt-1.5 uppercase tracking-wider">{b.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

const HeroSection = () => (
  <section className="min-h-[92vh] flex flex-col items-center justify-center relative z-10 px-6">
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
      <motion.img
        src="/logo.png"
        alt="Logo"
        className="w-20 md:w-24 mb-8"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      />
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0.15}
        className="inline-flex items-center gap-2 bg-accent/40 border border-border/50 rounded-full px-4 py-1.5 mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          Ao vivo · 05 de Março · Gratuito
        </span>
      </motion.div>
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.2}
        className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] font-bold mb-6 text-foreground"
      >
        Sua clínica pode estar <br className="hidden md:block" />
        perdendo <span className="text-highlight">+R$33k</span>
      </motion.h1>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.35}
        className="text-muted-foreground text-base md:text-lg max-w-lg mb-4 font-light leading-relaxed"
      >
        Erros silenciosos drenam seu faturamento todos os dias.
        Descubra quais são e como corrigi-los no diagnóstico ao vivo.
      </motion.p>
      <motion.p
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0.5}
        className="text-primary/70 text-sm font-medium mb-10 uppercase tracking-wider"
      >
        100% gratuito · Duração de 30–40 minutos
      </motion.p>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.6}
        className="mb-10"
      >
        <CountdownTimer />
      </motion.div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.75}
        className="w-full max-w-xs"
      >
        <ShinyButton onClick={scrollToForm}>
          Garantir Minha Vaga
          <ArrowRight className="w-4 h-4" />
        </ShinyButton>
      </motion.div>
    </div>
  </section>
);

const ProblemSection = () => {
  const problemItems = [
    { icon: MessageCircle, text: "Clientes pedem valores à noite pelo WhatsApp" },
    { icon: CalendarX, text: "Querem agendar, mas não conseguem" },
    { icon: Check, text: "Estão prontas para decidir naquele momento" },
    { icon: Clock, text: "Precisam esperar até o dia seguinte" },
    { icon: TrendingDown, text: "Nesse intervalo, escolhem outra clínica" },
  ];

  return (
    <section className="section-padding relative z-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-accent/40 border border-border/50 rounded-full px-4 py-1.5 mb-6"
        >
          <ShieldAlert className="w-3 h-3 text-primary" />
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">O problema</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.08, duration: 0.6, ease }}
          className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-12"
        >
          O que acontece enquanto{" "}
          <span className="text-highlight">sua clínica está fechada?</span>
        </motion.h2>

        <div className="flex flex-col space-y-3">
          {problemItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.45, ease }}
              viewport={{ once: true, margin: "-40px" }}
              className="flex items-center gap-4 py-4 px-5 rounded-xl bg-card/40 border border-border/40 hover:border-primary/20 hover:bg-card/60 transition-all duration-500 ease-out"
            >
              <div className="w-9 h-9 rounded-lg bg-accent/60 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-primary" strokeWidth={1.8} />
              </div>
              <p className="text-foreground/90 text-sm md:text-base">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.3, duration: 0.6, ease }}
          className="relative rounded-2xl bg-card/40 border border-primary/15 p-6 md:p-8 text-center overflow-hidden mt-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent pointer-events-none" />
          <p className="font-display text-lg md:text-2xl font-bold text-foreground leading-snug relative z-10">
            Clínicas já recuperaram{" "}
            <span className="text-highlight">+R$33.000</span>{" "}
            corrigindo falhas estruturais simples.
          </p>
        </motion.div>
      </div>
    </section>
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
    <section className="section-padding relative z-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-accent/40 border border-border/50 rounded-full px-4 py-1.5 mb-6"
        >
          <Search className="w-3 h-3 text-primary" />
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">O diagnóstico</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.08, duration: 0.6, ease }}
          className="font-display text-3xl md:text-5xl font-bold mb-12 text-foreground leading-tight"
        >
          O que você vai <span className="text-highlight">descobrir</span>
        </motion.h2>

        <div className="grid gap-3 md:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.45, ease }}
              viewport={{ once: true, margin: "-30px" }}
              className="flex items-start gap-4 p-5 rounded-xl bg-card/40 border border-border/40 hover:border-primary/20 hover:bg-card/60 transition-all duration-500 ease-out group"
            >
              <div className="w-9 h-9 rounded-lg bg-accent/60 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-500 ease-out">
                <item.icon className="w-4 h-4 text-primary" strokeWidth={1.8} />
              </div>
              <p className="text-foreground/90 text-sm md:text-base leading-relaxed">{item.text}</p>
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

  return (
    <section id="formulario" className="section-padding relative z-10">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true, margin: "-40px" }}
        >
          {!submitted ? (
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-10">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 bg-accent/40 border border-border/50 rounded-full px-4 py-1.5 mb-6"
                >
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Vagas limitadas</span>
                </motion.div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 text-foreground">
                  Garanta sua vaga
                </h2>
                <p className="text-muted-foreground text-sm">
                  05 de Março · Diagnóstico Estratégico ao vivo
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <label className="block text-xs uppercase tracking-wider font-medium text-muted-foreground mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    required
                    className="w-full rounded-xl border border-border/50 bg-background/30 backdrop-blur-sm px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/15 transition-all duration-300 text-sm"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.18, duration: 0.4 }}
                >
                  <label className="block text-xs uppercase tracking-wider font-medium text-muted-foreground mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(00) 00000-0000"
                    required
                    className="w-full rounded-xl border border-border/50 bg-background/30 backdrop-blur-sm px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/15 transition-all duration-300 text-sm"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="pt-2"
                >
                  <ShinyButton type="submit" disabled={loading}>
                    {loading ? "Enviando..." : "Garantir Minha Vaga"}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </ShinyButton>
                </motion.div>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
              className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 180, damping: 14 }}
                className="w-14 h-14 border border-primary/40 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Inscrição confirmada!
              </h3>
              <p className="text-muted-foreground text-sm">
                Em breve você receberá as instruções no WhatsApp.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <EtheralShadow
        color="hsl(340, 40%, 12%)"
        animation={{ scale: 50, speed: 25 }}
        noise={{ opacity: 0.015, scale: 1 }}
      />
      <FloatingSparkles />
      <HeroSection />
      <ProblemSection />
      <DiagnosticSection />
      <FormSection />
      <footer className="text-center py-10 relative z-10">
        <p className="text-muted-foreground/60 text-xs tracking-wider">
          © 2026 Diagnóstico Estratégico · Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
};

export default Index;
