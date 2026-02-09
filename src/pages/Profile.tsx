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
import { Loader2, Upload, Heart, Calendar, MapPin, BookOpen, GraduationCap } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
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
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [scholarshipRequests, setScholarshipRequests] = useState<any[]>([]);
  const [isLoadingScholarships, setIsLoadingScholarships] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchEnrolledCourses();
      fetchScholarshipRequests();
    }
  }, [user]);

  const fetchEnrolledCourses = async () => {
    if (!user) return;
    
    setIsLoadingCourses(true);
    const { data, error } = await supabase
      .from("course_enrollments")
      .select(`
        *,
        publications:publication_id (
          id,
          title,
          image_url,
          value,
          category
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setEnrolledCourses(data);
    }
    setIsLoadingCourses(false);
  };

  const fetchScholarshipRequests = async () => {
    if (!user) return;
    
    setIsLoadingScholarships(true);
    const { data, error } = await supabase
      .from("scholarship_requests")
      .select(`
        *,
        publications:publication_id (
          id,
          title,
          image_url,
          country,
          category
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setScholarshipRequests(data);
    }
    setIsLoadingScholarships(false);
  };

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
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span>Cursos Inscritos</span>
                    </div>
                    <span className="font-semibold">{enrolledCourses.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span>Bolsas Solicitadas</span>
                    </div>
                    <span className="font-semibold">{scholarshipRequests.length}</span>
                  </div>
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

          {/* Enrolled Courses Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Cursos Inscritos
              </CardTitle>
              <CardDescription>
                Cursos em que você se inscreveu
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingCourses ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : enrolledCourses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Você ainda não se inscreveu em nenhum curso</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => navigate("/courses")}
                  >
                    Explorar Cursos
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {enrolledCourses.map((enrollment: any) => (
                    <div
                      key={enrollment.id}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/publication/${enrollment.publication_id}`)}
                    >
                      {enrollment.publications?.image_url && (
                        <img
                          src={enrollment.publications.image_url}
                          alt={enrollment.publications.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground line-clamp-1">
                          {enrollment.publications?.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                          {enrollment.publications?.value && (
                            <span className="font-medium text-primary">
                              {enrollment.publications.value}
                            </span>
                          )}
                          <Badge 
                            variant={enrollment.status === "approved" ? "default" : enrollment.status === "pending" ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {enrollment.status === "pending" ? "Pendente" : enrollment.status === "approved" ? "Aprovado" : enrollment.status}
                          </Badge>
                          <span className="text-xs">
                            Inscrito em {format(new Date(enrollment.created_at), "dd/MM/yyyy", { locale: ptBR })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Scholarship Requests Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Bolsas Solicitadas
              </CardTitle>
              <CardDescription>
                Bolsas de estudo que você solicitou orientação
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingScholarships ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : scholarshipRequests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Você ainda não solicitou orientação para nenhuma bolsa</p>
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
                  {scholarshipRequests.map((request: any) => (
                    <div
                      key={request.id}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/publication/${request.publication_id}`)}
                    >
                      {request.publications?.image_url && (
                        <img
                          src={request.publications.image_url}
                          alt={request.publications.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground line-clamp-1">
                          {request.publications?.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                          {request.publications?.country && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{request.publications.country}</span>
                            </div>
                          )}
                          <Badge 
                            variant={request.status === "approved" ? "default" : request.status === "pending" ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {request.status === "pending" ? "Pendente" : request.status === "approved" ? "Aprovado" : request.status === "rejected" ? "Rejeitado" : request.status}
                          </Badge>
                          <span className="text-xs">
                            Solicitado em {format(new Date(request.created_at), "dd/MM/yyyy", { locale: ptBR })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Favorites Section */}
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