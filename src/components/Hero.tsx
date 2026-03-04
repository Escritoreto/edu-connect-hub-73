import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, FileText, Globe } from "lucide-react";
import headerHero from "@/assets/header-hero.jpg";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const useCountUp = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          tick();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
};

const Hero = () => {
  const stats = [
    { icon: GraduationCap, value: 500, suffix: "+", label: "Bolsas Disponíveis" },
    { icon: Users, value: 2000, suffix: "+", label: "Estudantes Ativos" },
    { icon: Globe, value: 30, suffix: "+", label: "Países" },
    { icon: FileText, value: 12, suffix: "", label: "Modelos de CV" },
  ];

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${headerHero})` }}
      />
      <div className="absolute inset-0 bg-foreground/60" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white leading-tight font-bold text-center lg:text-left">
              Onde seus sonhos começam,{" "}
              <span className="text-secondary">a UpMentor</span> está presente
            </h1>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed text-center lg:text-left max-w-lg">
              Encontre bolsas, cursos e oportunidades globais. Crie seu currículo profissional em segundos.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button size="lg" asChild className="text-sm sm:text-base font-semibold shadow-elegant">
                <Link to="/scholarships">Bolsas disponíveis</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-sm sm:text-base border-white text-white hover:bg-white/10">
                <Link to="/courses">Cursos disponíveis</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative hidden lg:flex justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div
              className="bg-background rounded-xl p-4 shadow-card border border-border"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-2xl font-bold text-primary">98%</div>
              <div className="text-xs text-muted-foreground">Taxa de Sucesso</div>
            </motion.div>
            <motion.div
              className="absolute -bottom-12 -left-8 bg-background rounded-xl p-4 shadow-card border border-border"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="text-2xl font-bold text-secondary">4.9★</div>
              <div className="text-xs text-muted-foreground">Avaliação Média</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div className="mt-10 lg:mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const { count, ref } = useCountUp(stat.value);
            return (
              <motion.div
                key={i}
                ref={ref}
                className="bg-background/90 backdrop-blur-sm rounded-xl p-4 text-center border border-border shadow-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-foreground">
                  {count}{stat.suffix}
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
