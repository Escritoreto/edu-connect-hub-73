import { Link } from "react-router-dom";
import { GraduationCap, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <GraduationCap className="h-8 w-8 text-secondary transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold text-background">UpMentor</span>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed">
              Conectando estudantes a oportunidades globais de educação e carreira.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="mailto:contato@upmentor.com" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Plataforma */}
          <div>
            <h3 className="font-semibold mb-4 text-background">Plataforma</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/scholarships" className="text-background/60 hover:text-secondary transition-colors">Bolsas de Estudo</Link></li>
              <li><Link to="/courses" className="text-background/60 hover:text-secondary transition-colors">Cursos Online</Link></li>
              <li><Link to="/cv-builder" className="text-background/60 hover:text-secondary transition-colors">Criar Currículo</Link></li>
              <li><Link to="/blog" className="text-background/60 hover:text-secondary transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="font-semibold mb-4 text-background">Suporte</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-background/60 hover:text-secondary transition-colors">Sobre Nós</Link></li>
              <li><Link to="/auth" className="text-background/60 hover:text-secondary transition-colors">Criar Conta</Link></li>
              <li><Link to="/auth" className="text-background/60 hover:text-secondary transition-colors">Entrar</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold mb-4 text-background">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-background/60">
                <Mail className="h-4 w-4 shrink-0" />
                contato@upmentor.com
              </li>
              <li className="flex items-center gap-2 text-background/60">
                <MapPin className="h-4 w-4 shrink-0" />
                Moçambique
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-background/40">
          <p>&copy; {new Date().getFullYear()} UpMentor. Todos os direitos reservados.</p>
          <div className="flex space-x-6">
            <Link to="/about" className="hover:text-secondary transition-colors">Política de Privacidade</Link>
            <Link to="/about" className="hover:text-secondary transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
