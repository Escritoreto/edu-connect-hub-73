import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SiteSettingsManager = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_settings")
      .select("setting_key, setting_value");

    if (!error && data) {
      const map: Record<string, string> = {};
      data.forEach((s: any) => { map[s.setting_key] = s.setting_value; });
      setSettings(map);
    }
    setLoading(false);
  };

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const promises = Object.entries(settings).map(async ([key, value]) => {
        const { data } = await supabase
          .from("site_settings")
          .select("id")
          .eq("setting_key", key)
          .maybeSingle();

        if (data) {
          return supabase
            .from("site_settings")
            .update({ setting_value: value, updated_at: new Date().toISOString() })
            .eq("setting_key", key);
        } else {
          return supabase
            .from("site_settings")
            .insert({ setting_key: key, setting_value: value });
        }
      });
      await Promise.all(promises);
      toast({ title: "Definições salvas!", description: "As definições do site foram atualizadas." });
    } catch (error: any) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
      </div>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Definições do Site</CardTitle>
        <CardDescription className="text-slate-400">
          Gerencie a identidade visual e conteúdo do site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="branding" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-700/50">
            <TabsTrigger value="branding">Identidade</TabsTrigger>
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="social">Redes Sociais</TabsTrigger>
          </TabsList>

          <TabsContent value="branding" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Nome do Site</Label>
              <Input
                value={settings.site_name || ""}
                onChange={(e) => updateSetting("site_name", e.target.value)}
                placeholder="UpMentor"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Descrição do Site</Label>
              <Textarea
                value={settings.site_description || ""}
                onChange={(e) => updateSetting("site_description", e.target.value)}
                placeholder="Descrição breve do site..."
                rows={3}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Email de Contacto</Label>
                <Input
                  type="email"
                  value={settings.contact_email || ""}
                  onChange={(e) => updateSetting("contact_email", e.target.value)}
                  placeholder="contato@upmentor.com"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Telefone de Contacto</Label>
                <Input
                  value={settings.contact_phone || ""}
                  onChange={(e) => updateSetting("contact_phone", e.target.value)}
                  placeholder="+258 84 000 0000"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Título Principal (Hero)</Label>
              <Input
                value={settings.hero_title || ""}
                onChange={(e) => updateSetting("hero_title", e.target.value)}
                placeholder="Pronto para Transformar Seu Futuro?"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Subtítulo (Hero)</Label>
              <Textarea
                value={settings.hero_subtitle || ""}
                onChange={(e) => updateSetting("hero_subtitle", e.target.value)}
                placeholder="Subtítulo da página principal..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Texto Sobre Nós</Label>
              <Textarea
                value={settings.about_text || ""}
                onChange={(e) => updateSetting("about_text", e.target.value)}
                placeholder="Texto da página Sobre..."
                rows={6}
              />
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-slate-300">WhatsApp</Label>
              <Input
                value={settings.whatsapp || ""}
                onChange={(e) => updateSetting("whatsapp", e.target.value)}
                placeholder="+258 84 000 0000"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Facebook</Label>
              <Input
                value={settings.facebook || ""}
                onChange={(e) => updateSetting("facebook", e.target.value)}
                placeholder="https://facebook.com/upmentor"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Instagram</Label>
              <Input
                value={settings.instagram || ""}
                onChange={(e) => updateSetting("instagram", e.target.value)}
                placeholder="https://instagram.com/upmentor"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">YouTube</Label>
              <Input
                value={settings.youtube || ""}
                onChange={(e) => updateSetting("youtube", e.target.value)}
                placeholder="https://youtube.com/@upmentor"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">TikTok</Label>
              <Input
                value={settings.tiktok || ""}
                onChange={(e) => updateSetting("tiktok", e.target.value)}
                placeholder="https://tiktok.com/@upmentor"
              />
            </div>
          </TabsContent>
        </Tabs>

        <Button onClick={handleSave} disabled={saving} className="w-full mt-6">
          {saving ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Salvando...</>
          ) : (
            <><Save className="h-4 w-4 mr-2" />Salvar Definições</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SiteSettingsManager;
