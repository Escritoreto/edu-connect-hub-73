import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Heart, Calendar, MapPin, BookOpen, GraduationCap, FileText, Banknote, CheckCircle2, School, Lightbulb, User, MessageSquare, Star, FileImage, Camera, Trash2, XCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from
"@/components/ui/alert-dialog";
import { PaymentInfoCard } from "@/components/PaymentInfoCard";
import { MyProjectsSection } from "@/components/profile/MyProjectsSection";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ptBR } from "date-fns/locale";
import { MessagesPanel } from "@/components/MessagesPanel";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { favorites } = useFavorites();

  const [profile, setProfile] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileEditAllowed, setProfileEditAllowed] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [scholarshipRequests, setScholarshipRequests] = useState<any[]>([]);
  const [universityRequests, setUniversityRequests] = useState<any[]>([]);
  const [isLoadingScholarships, setIsLoadingScholarships] = useState(true);
  const [cvDownloads, setCvDownloads] = useState<any[]>([]);
  const [isLoadingCvDownloads, setIsLoadingCvDownloads] = useState(true);
  const [markingPaidId, setMarkingPaidId] = useState<string | null>(null);
  const [uploadingReceiptId, setUploadingReceiptId] = useState<string | null>(null);
  const [myReview, setMyReview] = useState<any>(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [favoritePublications, setFavoritePublications] = useState<any[]>([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);
  const [myProjectsCount, setMyProjectsCount] = useState(0);
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());
  const [selectedScholarships, setSelectedScholarships] = useState<Set<string>>(new Set());
  const [deletingSelected, setDeletingSelected] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  const linkUnlinkedRecords = async (userId: string, email: string) => {
    await supabase.from("course_enrollments").update({ user_id: userId }).eq("email", email).is("user_id", null);
    await supabase.from("scholarship_requests").update({ user_id: userId }).eq("email", email).is("user_id", null);
  };

  useEffect(() => {
    if (user) {
      const init = async () => {
        if (user.email) await linkUnlinkedRecords(user.id, user.email);
        fetchProfile();
        fetchEnrolledCourses();
        fetchScholarshipRequests();
        fetchCvDownloads();
        fetchMyReview();
        fetchFavoritePublications();
        fetchMyProjectsCount();
      };
      init();
    }
  }, [user]);

  const fetchMyProjectsCount = async () => {
    if (!user) return;
    const { count } = await supabase.from("projects").select("id", { count: "exact", head: true }).eq("creator_id", user.id);
    setMyProjectsCount(count || 0);
  };

  const fetchEnrolledCourses = async () => {
    if (!user) return;
    setIsLoadingCourses(true);
    const { data, error } = await supabase.
    from("course_enrollments").
    select(`*, publications:publication_id (id, title, image_url, value, category)`).
    eq("user_id", user.id).
    order("created_at", { ascending: false });
    if (!error && data) setEnrolledCourses(data);
    setIsLoadingCourses(false);
  };

  const fetchScholarshipRequests = async () => {
    if (!user) return;
    setIsLoadingScholarships(true);
    const { data, error } = await supabase.
    from("scholarship_requests").
    select(`*, publications:publication_id (id, title, image_url, country, category)`).
    eq("user_id", user.id).
    order("created_at", { ascending: false });
    if (!error && data) {
      setScholarshipRequests(data.filter((r: any) => r.publications?.category !== "university"));
      setUniversityRequests(data.filter((r: any) => r.publications?.category === "university"));
    }
    setIsLoadingScholarships(false);
  };

  const fetchCvDownloads = async () => {
    if (!user) return;
    setIsLoadingCvDownloads(true);
    const { data, error } = await supabase.from("cv_downloads").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    if (!error && data) setCvDownloads(data);
    setIsLoadingCvDownloads(false);
  };

  const fetchMyReview = async () => {
    if (!user) return;
    const { data } = await supabase.from("site_reviews").select("*").eq("user_id", user.id).maybeSingle();
    if (data) {
      setMyReview(data);
      setReviewText(data.text);
      setReviewRating(data.rating);
    }
  };

  const fetchFavoritePublications = async () => {
    if (!user) return;
    setIsLoadingFavorites(true);
    const { data: favs } = await supabase.from("user_favorites").select("publication_id").eq("user_id", user.id);
    if (favs && favs.length > 0) {
      const ids = favs.map((f: any) => f.publication_id);
      const { data: pubs } = await supabase.from("publications").select("*").in("id", ids);
      if (pubs) setFavoritePublications(pubs);
    }
    setIsLoadingFavorites(false);
  };

  const submitReview = async () => {
    if (!user || !reviewText.trim()) return;
    setIsSubmittingReview(true);
    if (myReview) {
      const { error } = await supabase.from("site_reviews").update({ text: reviewText, rating: reviewRating }).eq("id", myReview.id);
      if (!error) {
        toast({ title: "Avaliação atualizada!" });
        fetchMyReview();
      }
    } else {
      const { error } = await supabase.from("site_reviews").insert({ user_id: user.id, text: reviewText, rating: reviewRating });
      if (!error) {
        toast({ title: "Avaliação enviada!", description: "Será exibida após aprovação do administrador." });
        fetchMyReview();
      } else {
        toast({ title: "Erro ao enviar avaliação", description: error.message, variant: "destructive" });
      }
    }
    setIsSubmittingReview(false);
  };

  const fetchProfile = async () => {
    if (!user) return;
    setIsLoadingProfile(true);
    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (error) {
      toast({ title: "Erro ao carregar perfil", description: error.message, variant: "destructive" });
    } else {
      setProfile(data);
      setFullName(data.full_name || "");
      setPhone((data as any).phone || "");
      setProfileEditAllowed((data as any).profile_edit_allowed || false);
      setAvatarPreview(data.avatar_url || "");
    }
    setIsLoadingProfile(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "Arquivo muito grande", description: "A imagem deve ter no máximo 5MB", variant: "destructive" });
        return;
      }
      // Convert to blob to handle camera photos properly
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setAvatarFile(file);
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile || !user) return null;
    const fileExt = avatarFile.name.split(".").pop() || "jpg";
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from("avatars").upload(fileName, avatarFile, { upsert: true });
    if (uploadError) throw uploadError;
    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(fileName);
    return publicUrl;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    try {
      let avatarUrl = profile?.avatar_url;
      if (avatarFile) avatarUrl = await uploadAvatar();
      const updateData: any = { avatar_url: avatarUrl };
      if (profileEditAllowed) {
        updateData.full_name = fullName;
        updateData.phone = phone;
        updateData.profile_edit_allowed = false;
      }
      const { error } = await supabase.from("profiles").update(updateData).eq("id", user.id);
      if (error) throw error;
      toast({ title: "Perfil atualizado!", description: "Suas informações foram salvas com sucesso." });
      setAvatarFile(null);
      fetchProfile();
    } catch (error: any) {
      toast({ title: "Erro ao salvar perfil", description: error.message, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const markAsPaid = async (id: string, type: "course" | "scholarship") => {
    setMarkingPaidId(id);
    const table = type === "course" ? "course_enrollments" : "scholarship_requests";
    const { error } = await supabase.from(table).update({ payment_status: "paid" } as any).eq("id", id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Marcado como pago!", description: "O administrador será notificado para confirmar." });
      if (type === "course") fetchEnrolledCourses();else
      fetchScholarshipRequests();
    }
    setMarkingPaidId(null);
  };

  const uploadReceipt = async (id: string, type: "course" | "scholarship", file: File) => {
    if (!user) return;
    setUploadingReceiptId(id);
    try {
      const ext = file.name.split('.').pop() || "jpg";
      const filePath = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("payment-receipts").upload(filePath, file);
      if (uploadError) throw uploadError;
      // Use the path directly since bucket is private
      const receiptUrl = filePath;

      const table = type === "course" ? "course_enrollments" : "scholarship_requests";
      const { error } = await supabase.from(table).update({ receipt_url: receiptUrl, payment_status: "paid" } as any).eq("id", id);
      if (error) throw error;

      toast({ title: "Comprovativo enviado!", description: "O administrador será notificado para confirmar o pagamento." });
      if (type === "course") fetchEnrolledCourses();else
      fetchScholarshipRequests();
    } catch (error: any) {
      toast({ title: "Erro ao enviar comprovativo", description: error.message, variant: "destructive" });
    }
    setUploadingReceiptId(null);
  };

  const renderPaymentSection = (item: any, type: "course" | "scholarship", isFree?: boolean) => {
    if (item.status !== "approved") return null;
    if (isFree) return <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs"><CheckCircle2 className="h-3 w-3 mr-1" />Gratuito</Badge>;

    return (
      <>
        <PaymentInfoCard type={type} publicationTitle={item.publications?.title} coursePrice={item.publications?.value} />
        {item.payment_status === "confirmed" ?
        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs"><CheckCircle2 className="h-3 w-3 mr-1" />Pagamento Confirmado</Badge> :
        item.payment_status === "paid" ?
        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-xs"><Banknote className="h-3 w-3 mr-1" />Aguardando Confirmação</Badge> :

        <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="text-amber-600 border-amber-500/30 hover:bg-amber-50 dark:hover:bg-amber-950/30 text-xs h-7" onClick={(e) => {e.stopPropagation();markAsPaid(item.id, type);}} disabled={markingPaidId === item.id}>
              {markingPaidId === item.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <><Banknote className="h-3 w-3 mr-1" />Pago</>}
            </Button>
            <label className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
              <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => {const f = e.target.files?.[0];if (f) uploadReceipt(item.id, type, f);}} />
              <span className="inline-flex items-center gap-1 text-xs h-7 px-2 rounded border border-primary/30 text-primary hover:bg-primary/5 cursor-pointer">
                {uploadingReceiptId === item.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <><Upload className="h-3 w-3" />Enviar Recibo</>}
              </span>
            </label>
          </div>
        }
      </>);

  };

  const toggleCourseSelection = (id: string) => {
    setSelectedCourses((prev) => {const n = new Set(prev);n.has(id) ? n.delete(id) : n.add(id);return n;});
  };
  const toggleScholarshipSelection = (id: string) => {
    setSelectedScholarships((prev) => {const n = new Set(prev);n.has(id) ? n.delete(id) : n.add(id);return n;});
  };
  const deleteSelectedCourses = async () => {
    setDeletingSelected(true);
    for (const id of selectedCourses) {
      await supabase.from("course_enrollments").delete().eq("id", id);
    }
    toast({ title: `${selectedCourses.size} inscrição(ões) cancelada(s)` });
    setSelectedCourses(new Set());
    fetchEnrolledCourses();
    setDeletingSelected(false);
  };
  const deleteSelectedScholarships = async () => {
    setDeletingSelected(true);
    for (const id of selectedScholarships) {
      await supabase.from("scholarship_requests").delete().eq("id", id);
    }
    toast({ title: `${selectedScholarships.size} solicitação(ões) cancelada(s)` });
    setSelectedScholarships(new Set());
    fetchScholarshipRequests();
    setDeletingSelected(false);
  };

  if (loading || isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>);

  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatarPreview} />
              <AvatarFallback className="text-lg">{fullName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{fullName || "Meu Perfil"}</h1>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <BookOpen className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold">{enrolledCourses.length}</div>
              <div className="text-xs text-muted-foreground">Cursos</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <GraduationCap className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold">{scholarshipRequests.length}</div>
              <div className="text-xs text-muted-foreground">Bolsas</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <School className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold">{universityRequests.length}</div>
              <div className="text-xs text-muted-foreground">Universidades</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => navigate("/profile?tab=projects")}>
              <Lightbulb className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold">{myProjectsCount}</div>
              <div className="text-xs text-muted-foreground">Projetos</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <Heart className="h-5 w-5 text-destructive mx-auto mb-1" />
              <div className="text-lg font-bold">{favorites.length}</div>
              <div className="text-xs text-muted-foreground">Favoritos</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <FileText className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold">{cvDownloads.length}</div>
              <div className="text-xs text-muted-foreground">CVs</div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue={searchParams.get("tab") || "profile"} className="w-full">
            <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted p-1 rounded-lg">
              <TabsTrigger value="profile" className="flex-1 min-w-[100px] text-xs sm:text-sm"><User className="h-4 w-4 mr-1" />Perfil</TabsTrigger>
              <TabsTrigger value="courses" className="flex-1 min-w-[100px] text-xs sm:text-sm"><BookOpen className="h-4 w-4 mr-1" />Cursos</TabsTrigger>
              <TabsTrigger value="scholarships" className="flex-1 min-w-[100px] text-xs sm:text-sm"><GraduationCap className="h-4 w-4 mr-1" />Bolsas</TabsTrigger>
              <TabsTrigger value="universities" className="flex-1 min-w-[100px] text-xs sm:text-sm"><School className="h-4 w-4 mr-1" />Universidades</TabsTrigger>
              <TabsTrigger value="cvs" className="flex-1 min-w-[100px] text-xs sm:text-sm"><FileText className="h-4 w-4 mr-1" />CVs</TabsTrigger>
              <TabsTrigger value="projects" className="flex-1 min-w-[100px] text-xs sm:text-sm"><Lightbulb className="h-4 w-4 mr-1" />Projetos</TabsTrigger>
              <TabsTrigger value="favorites" className="flex-1 min-w-[100px] text-xs sm:text-sm"><Heart className="h-4 w-4 mr-1" />Favoritos</TabsTrigger>
              <TabsTrigger value="review" className="flex-1 min-w-[100px] text-xs sm:text-sm"><Star className="h-4 w-4 mr-1" />Avaliação</TabsTrigger>
              <TabsTrigger value="messages" className="flex-1 min-w-[100px] text-xs sm:text-sm"><MessageSquare className="h-4 w-4 mr-1" />Mensagens</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    Atualize suas informações de perfil
                    {profileEditAllowed &&
                    <Badge className="ml-2 bg-green-500/10 text-green-600 border-green-500/20">Edição liberada pelo administrador</Badge>
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarPreview} />
                        <AvatarFallback>{fullName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex gap-2">
                          <Label htmlFor="avatar" className="cursor-pointer">
                            <div className="flex items-center gap-2 text-sm text-primary hover:underline">
                              <Upload className="h-4 w-4" />Galeria
                            </div>
                          </Label>
                          <Input id="avatar" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                          <Label htmlFor="avatar-camera" className="cursor-pointer">
                            

                            
                          </Label>
                          <Input id="avatar-camera" type="file" accept="image/*" capture="user" className="hidden" onChange={handleAvatarChange} />
                        </div>
                        <p className="text-xs text-muted-foreground">PNG, JPG ou WEBP (máx. 5MB)</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nome Completo</Label>
                      <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Digite seu nome completo" disabled={!profileEditAllowed} className={!profileEditAllowed ? "bg-muted" : ""} />
                      {!profileEditAllowed && fullName &&
                      <p className="text-xs text-muted-foreground">Para alterar o nome, solicite ao administrador via mensagens.</p>
                      }
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Número de Celular</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Digite seu número de celular" disabled={!profileEditAllowed} className={!profileEditAllowed ? "bg-muted" : ""} />
                      {!profileEditAllowed && phone &&
                      <p className="text-xs text-muted-foreground">Para alterar o número, solicite ao administrador via mensagens.</p>
                      }
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={user?.email || ""} disabled className="bg-muted" />
                      <p className="text-xs text-muted-foreground">O email não pode ser alterado</p>
                    </div>
                    <Button type="submit" disabled={isSaving} className="w-full">
                      {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Salvando...</> : "Salvar Alterações"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" />Cursos Inscritos</CardTitle>
                      <CardDescription>Cursos em que você se inscreveu</CardDescription>
                    </div>
                    {selectedCourses.size > 0 &&
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive" disabled={deletingSelected}>
                            {deletingSelected ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Trash2 className="h-4 w-4 mr-1" />}
                            Cancelar ({selectedCourses.size})
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancelar {selectedCourses.size} inscrição(ões)?</AlertDialogTitle>
                            <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Voltar</AlertDialogCancel>
                            <AlertDialogAction onClick={deleteSelectedCourses} className="bg-destructive text-destructive-foreground">Confirmar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    }
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingCourses ?
                  <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div> :
                  enrolledCourses.length === 0 ?
                  <div className="text-center py-8 text-muted-foreground">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <p>Você ainda não se inscreveu em nenhum curso</p>
                      <Button variant="outline" className="mt-4" onClick={() => navigate("/courses")}>Explorar Cursos</Button>
                    </div> :

                  <div className="space-y-4">
                      {enrolledCourses.map((enrollment: any) =>
                    <div key={enrollment.id} className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                          <Checkbox
                        checked={selectedCourses.has(enrollment.id)}
                        onCheckedChange={() => toggleCourseSelection(enrollment.id)}
                        className="mt-1" />
                      
                          <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate(`/publication/${enrollment.publication_id}`)}>
                            <div className="flex items-start gap-3">
                              {enrollment.publications?.image_url &&
                          <img src={enrollment.publications.image_url} alt={enrollment.publications.title} className="w-16 h-16 object-cover rounded" />
                          }
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-foreground line-clamp-1">{enrollment.publications?.title}</h3>
                                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                                  {enrollment.publications?.value && <span className="font-medium text-primary">{enrollment.publications.value}</span>}
                                  <Badge variant={enrollment.status === "approved" ? "default" : enrollment.status === "pending" ? "secondary" : "destructive"} className="text-xs">
                                    {enrollment.status === "pending" ? "Pendente" : enrollment.status === "approved" ? "Aprovado" : enrollment.status}
                                  </Badge>
                                  {renderPaymentSection(enrollment, "course")}
                                  <span className="text-xs">Inscrito em {format(new Date(enrollment.created_at), "dd/MM/yyyy", { locale: ptBR })}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    )}
                    </div>
                  }
                </CardContent>
              </Card>
            </TabsContent>

            {/* Scholarships Tab */}
            <TabsContent value="scholarships">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-primary" />Bolsas Solicitadas</CardTitle>
                      <CardDescription>Bolsas de estudo que você solicitou orientação</CardDescription>
                    </div>
                    {selectedScholarships.size > 0 &&
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive" disabled={deletingSelected}>
                            {deletingSelected ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Trash2 className="h-4 w-4 mr-1" />}
                            Cancelar ({selectedScholarships.size})
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancelar {selectedScholarships.size} solicitação(ões)?</AlertDialogTitle>
                            <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Voltar</AlertDialogCancel>
                            <AlertDialogAction onClick={deleteSelectedScholarships} className="bg-destructive text-destructive-foreground">Confirmar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    }
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingScholarships ?
                  <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div> :
                  scholarshipRequests.length === 0 ?
                  <div className="text-center py-8 text-muted-foreground">
                      <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <p>Você ainda não solicitou orientação para nenhuma bolsa</p>
                      <Button variant="outline" className="mt-4" onClick={() => navigate("/scholarships")}>Explorar Bolsas</Button>
                    </div> :

                  <div className="space-y-4">
                      {scholarshipRequests.map((request: any) => {
                      const isFree = request.publications?.country?.toLowerCase()?.includes("moçambique") || request.publications?.country?.toLowerCase()?.includes("mozambique");
                      return (
                        <div key={request.id} className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                            <Checkbox
                            checked={selectedScholarships.has(request.id)}
                            onCheckedChange={() => toggleScholarshipSelection(request.id)}
                            className="mt-1" />
                          
                            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate(`/publication/${request.publication_id}`)}>
                              <div className="flex items-start gap-3">
                                {request.publications?.image_url &&
                              <img src={request.publications.image_url} alt={request.publications.title} className="w-16 h-16 object-cover rounded" />
                              }
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-foreground line-clamp-1">{request.publications?.title}</h3>
                                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                                    {request.publications?.country &&
                                  <div className="flex items-center gap-1"><MapPin className="h-3 w-3" /><span>{request.publications.country}</span></div>
                                  }
                                    <Badge variant={request.status === "approved" ? "default" : request.status === "pending" ? "secondary" : "destructive"} className="text-xs">
                                      {request.status === "pending" ? "Pendente" : request.status === "approved" ? "Aprovado" : request.status === "rejected" ? "Rejeitado" : request.status}
                                    </Badge>
                                    {renderPaymentSection(request, "scholarship", isFree)}
                                    <span className="text-xs">Solicitado em {format(new Date(request.created_at), "dd/MM/yyyy", { locale: ptBR })}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>);

                    })}
                    </div>
                  }
                </CardContent>
              </Card>
            </TabsContent>

            {/* Universities Tab - NOW WITH PAYMENT */}
            <TabsContent value="universities">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><School className="h-5 w-5 text-primary" />Universidades Solicitadas</CardTitle>
                  <CardDescription>Universidades privadas que você solicitou informações</CardDescription>
                </CardHeader>
                <CardContent>
                  {universityRequests.length === 0 ?
                  <div className="text-center py-8 text-muted-foreground">
                      <School className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <p>Você ainda não solicitou informações sobre nenhuma universidade</p>
                      <Button variant="outline" className="mt-4" onClick={() => navigate("/universities")}>Explorar Universidades</Button>
                    </div> :

                  <div className="space-y-4">
                      {universityRequests.map((request: any) =>
                    <div key={request.id} className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => navigate(`/publication/${request.publication_id}`)}>
                          {request.publications?.image_url &&
                      <img src={request.publications.image_url} alt={request.publications.title} className="w-16 h-16 object-cover rounded" />
                      }
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground line-clamp-1">{request.publications?.title}</h3>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                              {request.publications?.country &&
                          <div className="flex items-center gap-1"><MapPin className="h-3 w-3" /><span>{request.publications.country}</span></div>
                          }
                              <Badge variant={request.status === "approved" ? "default" : request.status === "pending" ? "secondary" : "destructive"} className="text-xs">
                                {request.status === "pending" ? "Pendente" : request.status === "approved" ? "Aprovado" : request.status === "rejected" ? "Rejeitado" : request.status}
                              </Badge>
                              {renderPaymentSection(request, "scholarship")}
                              <span className="text-xs">Solicitado em {format(new Date(request.created_at), "dd/MM/yyyy", { locale: ptBR })}</span>
                            </div>
                          </div>
                        </div>
                    )}
                    </div>
                  }
                </CardContent>
              </Card>
            </TabsContent>

            {/* CVs Tab */}
            <TabsContent value="cvs">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />Histórico de CVs e Cartas</CardTitle>
                  <CardDescription>Currículos e cartas de motivação que você gerou</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingCvDownloads ?
                  <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div> :
                  cvDownloads.length === 0 ?
                  <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <p>Você ainda não baixou nenhum currículo ou carta</p>
                      <div className="flex gap-3 justify-center mt-4">
                        <Button variant="outline" onClick={() => navigate("/cv-builder")}>Criar Currículo</Button>
                        <Button variant="outline" onClick={() => navigate("/motivation-letter")}>Criar Carta</Button>
                      </div>
                    </div> :

                  <div className="space-y-3">
                      {cvDownloads.map((dl: any) =>
                    <div key={dl.id} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                          <FileText className="h-8 w-8 text-primary shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm">{dl.cv_name}</p>
                            <p className="text-xs text-muted-foreground">Modelo: {dl.template_name}</p>
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {format(new Date(dl.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                          </span>
                        </div>
                    )}
                    </div>
                  }
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              {user && <MyProjectsSection userId={user.id} />}
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-destructive" />Meus Favoritos</CardTitle>
                  <CardDescription>Publicações que você salvou como favoritas</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingFavorites ?
                  <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div> :
                  favoritePublications.length === 0 ?
                  <div className="text-center py-8 text-muted-foreground">
                      <Heart className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <p>Você ainda não tem favoritos</p>
                      <Button variant="outline" className="mt-4" onClick={() => navigate("/scholarships")}>Explorar Bolsas</Button>
                    </div> :

                  <div className="space-y-4">
                      {favoritePublications.map((pub: any) =>
                    <div key={pub.id} className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => navigate(`/publication/${pub.id}`)}>
                          {pub.image_url && <img src={pub.image_url} alt={pub.title} className="w-16 h-16 object-cover rounded" />}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground line-clamp-1">{pub.title}</h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <Badge variant="secondary" className="text-xs capitalize">{pub.category}</Badge>
                              {pub.country && <span className="text-xs">{pub.country}</span>}
                            </div>
                          </div>
                        </div>
                    )}
                    </div>
                  }
                </CardContent>
              </Card>
            </TabsContent>

            {/* Review Tab */}
            <TabsContent value="review">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-secondary" />Avaliar o UpMentor</CardTitle>
                  <CardDescription>
                    Partilhe a sua experiência com a plataforma. Após aprovação, será exibida na página inicial.
                    {myReview &&
                    <Badge variant={myReview.status === "approved" ? "default" : myReview.status === "pending" ? "secondary" : "destructive"} className="ml-2">
                        {myReview.status === "approved" ? "Aprovada" : myReview.status === "pending" ? "Pendente" : "Rejeitada"}
                      </Badge>
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Classificação</Label>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) =>
                      <button key={star} type="button" onClick={() => setReviewRating(star)}>
                          <Star className={`h-6 w-6 cursor-pointer transition-colors ${star <= reviewRating ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>Sua avaliação</Label>
                    <Textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Conte como a UpMentor ajudou na sua jornada..." className="mt-2" rows={4} />
                  </div>
                  <Button onClick={submitReview} disabled={isSubmittingReview || !reviewText.trim()}>
                    {isSubmittingReview ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {myReview ? "Atualizar Avaliação" : "Enviar Avaliação"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages">
              {user && <MessagesPanel currentUserId={user.id} />}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>);

};

export default Profile;