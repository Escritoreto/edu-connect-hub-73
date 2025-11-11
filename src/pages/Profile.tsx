import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useFavorites } from "@/hooks/useFavorites";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Heart, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { favorites } = useFavorites();
  
  const [profile, setProfile] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setIsLoadingProfile(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      toast({
        title: "Erro ao carregar perfil",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setProfile(data);
      setFullName(data.full_name || "");
      setAvatarPreview(data.avatar_url || "");
    }
    setIsLoadingProfile(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "A imagem deve ter no máximo 5MB",
          variant: "destructive",
        });
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile || !user) return null;

    const fileExt = avatarFile.name.split(".").pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError, data } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatarFile, { upsert: true });

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    try {
      let avatarUrl = profile?.avatar_url;

      if (avatarFile) {
        avatarUrl = await uploadAvatar();
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          avatar_url: avatarUrl,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      });

      fetchProfile();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar perfil",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie suas informações pessoais e veja seu histórico
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    Atualize suas informações de perfil
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarPreview} />
                        <AvatarFallback>
                          {fullName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-center gap-2">
                        <Label htmlFor="avatar" className="cursor-pointer">
                          <div className="flex items-center gap-2 text-sm text-primary hover:underline">
                            <Upload className="h-4 w-4" />
                            Alterar foto
                          </div>
                        </Label>
                        <Input
                          id="avatar"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG ou WEBP (máx. 5MB)
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nome Completo</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Digite seu nome completo"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="bg-muted"
                      />
                      <p className="text-xs text-muted-foreground">
                        O email não pode ser alterado
                      </p>
                    </div>

                    <Button type="submit" disabled={isSaving} className="w-full">
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        "Salvar Alterações"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="h-4 w-4 text-destructive" />
                      <span>Favoritos</span>
                    </div>
                    <span className="font-semibold">{favorites.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Candidaturas</CardTitle>
              <CardDescription>
                Bolsas e cursos que você salvou nos favoritos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {favorites.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Heart className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Você ainda não salvou nenhuma oportunidade</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => navigate("/scholarships")}
                  >
                    Explorar Bolsas
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {favorites.map((fav: any) => (
                    <div
                      key={fav.id}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/publication/${fav.publication_id}`)}
                    >
                      {fav.publications?.image_url && (
                        <img
                          src={fav.publications.image_url}
                          alt={fav.publications.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground line-clamp-1">
                          {fav.publications?.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                          {fav.publications?.country && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{fav.publications.country}</span>
                            </div>
                          )}
                          {fav.publications?.deadline && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {format(new Date(fav.publications.deadline), "dd/MM/yyyy", {
                                  locale: ptBR,
                                })}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;