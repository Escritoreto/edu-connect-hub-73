import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <GraduationCap className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            UpMentor
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/scholarships" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Bolsas de Estudo
          </Link>
          <Link to="/courses" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Cursos</Link>
          <Link to="/cv-builder" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Criar Currículo
          </Link>
          <Link to="/jobs" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Empregos
          </Link>
          <Link to="/blog" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Blog
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Sobre
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Entrar</Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/signup">Começar Agora</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden border-t border-border animate-slide-in">
          <nav className="container py-4 flex flex-col space-y-4">
            <Link to="/scholarships" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Bolsas de Estudo
            </Link>
            <Link to="/courses" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Cursos Online
            </Link>
            <Link to="/cv-builder" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Criar Currículo
            </Link>
            <Link to="/jobs" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Empregos
            </Link>
            <Link to="/blog" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Blog
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Sobre
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="ghost" asChild>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Entrar</Link>
              </Button>
              <Button variant="hero" asChild>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Começar Agora</Link>
              </Button>
            </div>
          </nav>
        </div>}
    </header>;
};
export default Header;