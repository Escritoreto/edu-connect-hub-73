import { Link } from "react-router-dom";
import { GraduationCap, Facebook, Instagram, Mail, MapPin, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const TikTokIcon = ({ className }: {className?: string;}) =>
<svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.77a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.2z" />
  </svg>;

const WhatsAppIcon = ({ className }: {className?: string;}) =>
<svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>;


const Footer = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.
      from("site_settings").
      select("setting_key, setting_value");
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((s: any) => {map[s.setting_key] = s.setting_value;});
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
  const whatsapp = settings.whatsapp;

  // Build whatsapp link from number or existing link
  const getWhatsAppUrl = (value: string) => {
    if (value.startsWith("http")) return value;
    // Remove spaces, dashes, and + prefix, build wa.me link
    const cleaned = value.replace(/[\s\-\+]/g, "");
    return `https://wa.me/${cleaned}`;
  };

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
              {whatsapp &&
              <a href={getWhatsAppUrl(whatsapp)} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="WhatsApp">
                  <WhatsAppIcon className="h-4 w-4" />
                </a>
              }
              {facebook &&
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              }
              {instagram &&
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              }
              {youtube &&
              <a href={youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="YouTube">
                  <Youtube className="h-4 w-4" />
                </a>
              }
              {tiktok &&
              <a href={tiktok} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="TikTok">
                  <TikTokIcon className="h-4 w-4" />
                </a>
              }
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
              {whatsapp &&
              <li>
                  


                
                </li>
              }
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
            <Link to="/privacy" className="hover:text-secondary transition-colors">Política de Privacidade</Link>
            <Link to="/terms" className="hover:text-secondary transition-colors">Termos de Uso</Link>
            <Link to="/security" className="hover:text-secondary transition-colors">Segurança</Link>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;