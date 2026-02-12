import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, Menu, X, LogOut, Settings, Heart, User } from "lucide-react";
import { NotificationBell } from "@/components/NotificationBell";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const {
    user,
    isAdmin,
    signOut
  } = useAuth();
  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);
  const fetchProfile = async () => {
    if (!user) return;
    const {
      data
    } = await supabase.from("profiles").select("avatar_url").eq("id", user.id).single();
    if (data?.avatar_url) {
      setAvatarUrl(data.avatar_url);
    }
  };
  return <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group border-0">
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
          <Link to="/blog" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Blog
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Sobre
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? <>
              <NotificationBell userId={user.id} />
              <Button variant="ghost" asChild>
                <Link to="/favorites">
                  <Heart className="h-4 w-4 mr-2" />
                  Favoritos
                </Link>
              </Button>
              {isAdmin && <Button variant="outline" asChild>
                  <Link to="/admin">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin
                  </Link>
                </Button>}
              <Button variant="ghost" size="icon" asChild>
                <Link to="/profile">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </Button>
              <Button variant="ghost" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </> : <>
              <Button variant="ghost" asChild>
                <Link to="/auth">Login</Link>
              </Button>
              <Button variant="hero" asChild>
                <Link to="/auth">Sign in</Link>
              </Button>
            </>}
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
            <Link to="/blog" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Blog
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Sobre
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              {user ? <>
                  <Button variant="ghost" asChild>
                    <Link to="/favorites" onClick={() => setIsMenuOpen(false)}>
                      <Heart className="h-4 w-4 mr-2" />
                      Favoritos
                    </Link>
                  </Button>
                  {isAdmin && <Button variant="outline" asChild>
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                        <Settings className="h-4 w-4 mr-2" />
                        Admin
                      </Link>
                    </Button>}
                  <Button variant="ghost" asChild>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      Perfil
                    </Link>
                  </Button>
                  <Button variant="ghost" onClick={() => {
              signOut();
              setIsMenuOpen(false);
            }}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </> : <>
                  <Button variant="ghost" asChild>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Entrar</Link>
                  </Button>
                  <Button variant="hero" asChild>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Começar Agora</Link>
                  </Button>
                </>}
            </div>
          </nav>
        </div>}
    </header>;
};
export default Header;