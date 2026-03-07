import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, CheckCircle, XCircle, Clock, BookOpen, Mail, Phone, MapPin, Trash2, Banknote, FileImage, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Enrollment {
  id: string;
  user_id: string;
  publication_id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: string;
  payment_status: string | null;
  receipt_url: string | null;
  created_at: string;
  publications: {
    id: string;
    title: string;
    value: string | null;
  } | null;
}

const EnrollmentsManager = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [receiptUrls, setReceiptUrls] = useState<Record<string, string>>({});
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deletingBulk, setDeletingBulk] = useState(false);
  const { toast } = useToast();

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const toggleSelectAll = () => {
    const filtered = filterStatus === "all" ? enrollments : enrollments.filter(e => e.status === filterStatus);
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map(e => e.id)));
    }
  };
  const deleteBulk = async () => {
    setDeletingBulk(true);
    for (const id of selectedIds) {
      await supabase.from("course_enrollments").delete().eq("id", id);
    }
    toast({ title: `${selectedIds.size} inscrição(ões) eliminada(s)` });
    setSelectedIds(new Set());
    fetchEnrollments();
    setDeletingBulk(false);
  };

  useEffect(() => {
    fetchEnrollments();
    cleanupOldRecords();
  }, []);

  const cleanupOldRecords = async () => {
    await supabase.rpc("cleanup_old_requests");
  };

  const getSignedReceiptUrl = async (path: string): Promise<string> => {
    // If it's already a full URL, return it
    if (path.startsWith("http")) return path;
    // Otherwise get a signed URL for private bucket
    const { data } = await supabase.storage.from("payment-receipts").createSignedUrl(path, 3600);
    return data?.signedUrl || path;
  };

  const fetchEnrollments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("course_enrollments")
      .select(`*, publications:publication_id (id, title, value)`)
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Erro ao carregar inscrições", description: error.message, variant: "destructive" });
    } else {
      const items = (data || []) as Enrollment[];
      setEnrollments(items);
      // Pre-fetch signed URLs for receipts
      const urls: Record<string, string> = {};
      for (const e of items) {
        if (e.receipt_url) {
          urls[e.id] = await getSignedReceiptUrl(e.receipt_url);
        }
      }
      setReceiptUrls(urls);
    }
    setLoading(false);
  };

  const updateStatus = async (enrollmentId: string, newStatus: string) => {
    setUpdatingId(enrollmentId);
    const enrollment = enrollments.find(e => e.id === enrollmentId);
    const { error } = await supabase.from("course_enrollments").update({ status: newStatus }).eq("id", enrollmentId);

    if (error) {
      toast({ title: "Erro ao atualizar status", description: error.message, variant: "destructive" });
    } else {
      if (enrollment?.user_id && (newStatus === "approved" || newStatus === "rejected")) {
        const statusText = newStatus === "approved" ? "aprovada" : "rejeitada";
        const courseName = enrollment.publications?.title || "curso";
        await supabase.from("notifications").insert({
          user_id: enrollment.user_id,
          title: `Inscrição ${statusText}!`,
          message: `A sua inscrição no curso "${courseName}" foi ${statusText}.`,
          link: "/profile?tab=courses",
        });
      }
      toast({ title: "Status atualizado!" });
      fetchEnrollments();
    }
    setUpdatingId(null);
  };

  const approvePayment = async (enrollmentId: string) => {
    setUpdatingId(enrollmentId);
    const enrollment = enrollments.find(e => e.id === enrollmentId);
    const { error } = await supabase.from("course_enrollments").update({ payment_status: "confirmed" }).eq("id", enrollmentId);
    if (error) {
      toast({ title: "Erro ao aprovar pagamento", description: error.message, variant: "destructive" });
    } else {
      if (enrollment?.user_id) {
        await supabase.from("notifications").insert({
          user_id: enrollment.user_id,
          title: "Pagamento confirmado!",
          message: `O pagamento do curso "${enrollment.publications?.title}" foi confirmado.`,
          link: "/profile?tab=courses",
        });
      }
      toast({ title: "Pagamento aprovado!" });
      fetchEnrollments();
    }
    setUpdatingId(null);
  };

  const deleteEnrollment = async (enrollmentId: string) => {
    const { error } = await supabase.from("course_enrollments").delete().eq("id", enrollmentId);
    if (error) {
      toast({ title: "Erro ao eliminar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Inscrição eliminada!" });
      fetchEnrollments();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20"><CheckCircle className="h-3 w-3 mr-1" />Aprovado</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20"><XCircle className="h-3 w-3 mr-1" />Rejeitado</Badge>;
      default:
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
    }
  };

  const filteredEnrollments = filterStatus === "all" ? enrollments : enrollments.filter(e => e.status === filterStatus);
  const stats = {
    total: enrollments.length,
    pending: enrollments.filter(e => e.status === "pending").length,
    approved: enrollments.filter(e => e.status === "approved").length,
    rejected: enrollments.filter(e => e.status === "rejected").length,
  };

  if (loading) {
    return <div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold">{stats.total}</div><p className="text-xs text-muted-foreground">Total</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold text-yellow-600">{stats.pending}</div><p className="text-xs text-muted-foreground">Pendentes</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold text-green-600">{stats.approved}</div><p className="text-xs text-muted-foreground">Aprovados</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold text-red-600">{stats.rejected}</div><p className="text-xs text-muted-foreground">Rejeitados</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" />Inscrições em Cursos</CardTitle>
              <CardDescription>Gerencie as inscrições dos usuários nos cursos</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {selectedIds.size > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive" disabled={deletingBulk}>
                      {deletingBulk ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Trash2 className="h-4 w-4 mr-1" />}
                      Eliminar ({selectedIds.size})
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Eliminar {selectedIds.size} inscrição(ões)?</AlertDialogTitle>
                      <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={deleteBulk} className="bg-destructive text-destructive-foreground">Eliminar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filtrar por status" /></SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="approved">Aprovados</SelectItem>
                  <SelectItem value="rejected">Rejeitados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredEnrollments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Nenhuma inscrição encontrada</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10"><Checkbox checked={selectedIds.size === filteredEnrollments.length && filteredEnrollments.length > 0} onCheckedChange={toggleSelectAll} /></TableHead>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Pagamento</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell><Checkbox checked={selectedIds.has(enrollment.id)} onCheckedChange={() => toggleSelect(enrollment.id)} /></TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{enrollment.name}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{enrollment.city}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium line-clamp-1">{enrollment.publications?.title || "Curso removido"}</p>
                          {enrollment.publications?.value && <p className="text-xs text-primary">{enrollment.publications.value}</p>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs"><Mail className="h-3 w-3" /><a href={`mailto:${enrollment.email}`} className="hover:underline">{enrollment.email}</a></div>
                          <div className="flex items-center gap-1 text-xs"><Phone className="h-3 w-3" /><a href={`tel:+258${enrollment.phone}`} className="hover:underline">+258 {enrollment.phone}</a></div>
                        </div>
                      </TableCell>
                      <TableCell><span className="text-sm text-muted-foreground">{format(new Date(enrollment.created_at), "dd/MM/yyyy", { locale: ptBR })}</span></TableCell>
                      <TableCell>{getStatusBadge(enrollment.status)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {receiptUrls[enrollment.id] && (
                            <a href={receiptUrls[enrollment.id]} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                              <FileImage className="h-3 w-3" />Ver Recibo <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          {enrollment.payment_status === "confirmed" ? (
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/20"><CheckCircle className="h-3 w-3 mr-1" />Confirmado</Badge>
                          ) : enrollment.payment_status === "paid" ? (
                            <div className="flex items-center gap-2">
                              <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20"><Banknote className="h-3 w-3 mr-1" />Pago</Badge>
                              <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50 text-xs h-7" onClick={() => approvePayment(enrollment.id)} disabled={updatingId === enrollment.id}>
                                {updatingId === enrollment.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <>Aprovar</>}
                              </Button>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {enrollment.status !== "approved" && (
                            <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50" onClick={() => updateStatus(enrollment.id, "approved")} disabled={updatingId === enrollment.id}>
                              {updatingId === enrollment.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                            </Button>
                          )}
                          {enrollment.status !== "rejected" && (
                            <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50" onClick={() => updateStatus(enrollment.id, "rejected")} disabled={updatingId === enrollment.id}>
                              {updatingId === enrollment.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
                            </Button>
                          )}
                          {enrollment.status !== "pending" && (
                            <Button size="sm" variant="outline" onClick={() => updateStatus(enrollment.id, "pending")} disabled={updatingId === enrollment.id}>
                              {updatingId === enrollment.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Clock className="h-4 w-4" />}
                            </Button>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Eliminar inscrição?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta ação não pode ser desfeita. A inscrição de {enrollment.name} será permanentemente eliminada.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteEnrollment(enrollment.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollmentsManager;
