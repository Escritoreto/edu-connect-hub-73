import { Link } from "react-router-dom";
import { GraduationCap, Facebook, Instagram, Mail, MapPin, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.77a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.2z" />
  </svg>
);

const Footer = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("setting_key, setting_value");
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((s: any) => { map[s.setting_key] = s.setting_value; });
        setSettings(map);
      }
    };
    fetchSettings();
  }, []);

  const siteName = settings.site_name || "UpMentor";
  const contactEmail = settings.contact_email || "contato@upmentor.com";
  const facebook = settings.facebook;
  const instagram = settings.instagram;
  const youtube = settings.youtube;
  const tiktok = settings.tiktok;

  return (
    <footer className="bg-foreground text-background/80">
      <div className="container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <GraduationCap className="h-8 w-8 text-secondary transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold text-background">{siteName}</span>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed">
              {settings.site_description || "Conectando estudantes a oportunidades globais de educação e carreira."}
            </p>
            <div className="flex space-x-3 pt-2">
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {youtube && (
                <a href={youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="YouTube">
                  <Youtube className="h-4 w-4" />
                </a>
              )}
              {tiktok && (
                <a href={tiktok} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="TikTok">
                  <TikTokIcon className="h-4 w-4" />
                </a>
              )}
              <a href={`mailto:${contactEmail}`} className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Plataforma */}
          <div>
            <h3 className="font-semibold mb-4 text-background">Plataforma</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/scholarships" className="text-background/60 hover:text-secondary transition-colors">Bolsas de Estudo</Link></li>
              <li><Link to="/universities" className="text-background/60 hover:text-secondary transition-colors">Universidades</Link></li>
              <li><Link to="/courses" className="text-background/60 hover:text-secondary transition-colors">Cursos Online</Link></li>
              
              <li><Link to="/cv-builder" className="text-background/60 hover:text-secondary transition-colors">Criar Currículo</Link></li>
              <li><Link to="/projects" className="text-background/60 hover:text-secondary transition-colors">Projetos</Link></li>
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
                {contactEmail}
              </li>
              {settings.contact_phone && (
                <li className="flex items-center gap-2 text-background/60">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {settings.contact_phone}
                </li>
              )}
              <li className="flex items-center gap-2 text-background/60">
                <MapPin className="h-4 w-4 shrink-0" />
                Moçambique
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-background/40">
          <p>&copy; {new Date().getFullYear()} {siteName}. Todos os direitos reservados.</p>
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
