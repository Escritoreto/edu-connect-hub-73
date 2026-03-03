import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, FileText, Globe } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const rotatingTexts = [
  "Encontre bolsas, cursos de inglês e mais em um só lugar. Prepare-se para estudar ou trabalhar no país e no exterior — e crie seu currículo gratuito em segundos.",
  "Ajudamos você a organizar a sua jornada de estudo na Europa, Ásia, América e África. Se você concluiu ensino médio ou ainda está cursando, nós ajudamos!"];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
  { icon: GraduationCap, value: 500, suffix: "+", label: "Bolsas Disponíveis" },
  { icon: Users, value: 2000, suffix: "+", label: "Estudantes Ativos" },
  { icon: Globe, value: 30, suffix: "+", label: "Países" },
  { icon: FileText, value: 12, suffix: "", label: "Modelos de CV" }];


  return (
    <section className="relative overflow-hidden bg-gradient-hero py-16 lg:py-28">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnptMCAxMGMwLTEuMS0uOS0yLTItMnMtMiAuOS0yIDIgLjkgMiAyIDIgMi0uOSAyLTJ6bTAgMTBjMC0xLjEtLjktMi0yLTJzLTIgLjktMiAyIC45IDIgMiAyIDItLjkgMi0yem0wIDEwYzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnpNMTYgMTZjMC0xLjEtLjktMi0yLTJzLTIgLjktMiAyIC45IDIgMiAyIDItLjkgMi0yem0wIDEwYzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnptMCAxMGMwLTEuMS0uOS0yLTItMnMtMiAuOS0yIDIgLjkgMiAyIDIgMi0uOSAyLTJ6bTAgMTBjMC0xLjEtLjktMi0yLTJzLTIgLjktMiAyIC45IDIgMiAyIDItLjkgMi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-primary-foreground leading-tight font-bold text-center lg:text-left">
              Onde seus sonhos começam,{" "}
              <span className="text-primary-foreground">a UpMentor</span> está presente
            </h1>

            <div className="h-20 sm:h-24 flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTextIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm sm:text-base lg:text-lg text-primary-foreground/85 leading-relaxed text-justify">

                  {rotatingTexts[currentTextIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button size="lg" variant="outline" asChild className="text-sm sm:text-base bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20 font-semibold shadow-lg">
                <Link to="/scholarships">Bolsas disponíveis</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-sm sm:text-base bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20">
                <Link to="/courses">Cursos disponíveis</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}>

            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              <img src={heroImage} alt="Students celebrating success" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            <motion.div
              className="absolute -top-4 -right-4 bg-background rounded-xl p-4 shadow-card"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>

              <div className="text-2xl font-bold text-primary">98%</div>
              <div className="text-xs text-muted-foreground">Taxa de Sucesso</div>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 bg-background rounded-xl p-4 shadow-card"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}>

              <div className="text-2xl font-bold text-secondary">4.9★</div>
              <div className="text-xs text-muted-foreground">Avaliação Média</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const { count, ref } = useCountUp(stat.value);
            return (
              <motion.div
                key={i}
                ref={ref}
                className="bg-background/10 backdrop-blur-md rounded-xl p-4 text-center border border-primary-foreground/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}>

                <stat.icon className="h-5 w-5 text-secondary mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-primary-foreground">
                  {count}{stat.suffix}
                </div>
                <div className="text-xs text-primary-foreground/70">{stat.label}</div>
              </motion.div>);

          })}
        </div>
      </div>
    </section>);

};

export default Hero;