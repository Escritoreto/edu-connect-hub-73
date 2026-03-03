import { Globe, BookOpen, FileText, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const features = [
  {
    icon: Globe,
    title: "Bolsas de Estudo Globais",
    description: "Acesse milhares de oportunidades de bolsas em universidades de todo o mundo. Filtros avançados por país, área e nível.",
    link: "/scholarships",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600&q=80",
  },
  {
    icon: BookOpen,
    title: "Cursos Online Certificados",
    description: "Aprenda Inglês, Educação Financeira e muito mais. Cursos gratuitos e pagos com certificado digital.",
    link: "/courses",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80",
  },
  {
    icon: FileText,
    title: "Gerador de Currículo",
    description: "Crie currículos profissionais em minutos. Modelos modernos e download em PDF para impressionar recrutadores.",
    link: "/cv-builder",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80",
  },
  {
    icon: TrendingUp,
    title: "Desenvolvimento de Carreira",
    description: "Artigos, dicas e orientação especializada para impulsionar seus estudos e crescimento profissional.",
    link: "/blog",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <motion.div
          className="text-center mb-14 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl lg:text-5xl font-bold text-foreground">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Desenvolva suas competências profissionais, gere CV em poucos cliques e encontre bolsas de estudo em único lugar
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative rounded-2xl border border-border shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={feature.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/60" />
              </div>

              {/* Content */}
              <div className="relative p-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 backdrop-blur-sm mb-5 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  {feature.description}
                </p>

                <Button variant="link" asChild className="p-0 h-auto font-semibold group-hover:gap-2 transition-all">
                  <Link to={feature.link}>
                    Explorar <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
