import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, CheckCircle, XCircle, Clock, GraduationCap, Mail, Phone, MapPin, MessageSquare, Trash2, Banknote } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ScholarshipRequest {
  id: string;
  user_id: string;
  publication_id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string | null;
  status: string;
  payment_status: string | null;
  created_at: string;
  publications: {
    id: string;
    title: string;
    country: string | null;
  } | null;
}

const ScholarshipRequestsManager = () => {
  const [requests, setRequests] = useState<ScholarshipRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
    cleanupOldRecords();
  }, []);

  const cleanupOldRecords = async () => {
    await supabase.rpc("cleanup_old_requests");
  };

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("scholarship_requests")
      .select(`*, publications:publication_id (id, title, country)`)
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Erro ao carregar solicitações", description: error.message, variant: "destructive" });
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (requestId: string, newStatus: string) => {
    setUpdatingId(requestId);
    const request = requests.find(r => r.id === requestId);
    const { error } = await supabase.from("scholarship_requests").update({ status: newStatus }).eq("id", requestId);

    if (error) {
      toast({ title: "Erro ao atualizar status", description: error.message, variant: "destructive" });
    } else {
      if (request?.user_id && (newStatus === "approved" || newStatus === "rejected" || newStatus === "contacted")) {
        const statusMap: Record<string, string> = { approved: "aprovada", rejected: "rejeitada", contacted: "em análise" };
        const statusText = statusMap[newStatus] || newStatus;
        const scholarshipName = request.publications?.title || "bolsa";
        await supabase.from("notifications").insert({
          user_id: request.user_id,
          title: `Solicitação ${statusText}!`,
          message: `A sua solicitação de orientação para "${scholarshipName}" foi ${statusText}.`,
          link: "/profile",
        });
      }
      toast({ title: "Status atualizado!" });
      fetchRequests();
    }
    setUpdatingId(null);
  };

  const approvePayment = async (requestId: string) => {
    setUpdatingId(requestId);
    const request = requests.find(r => r.id === requestId);
    const { error } = await supabase.from("scholarship_requests").update({ payment_status: "confirmed" }).eq("id", requestId);
    if (error) {
      toast({ title: "Erro ao aprovar pagamento", description: error.message, variant: "destructive" });
    } else {
      if (request?.user_id) {
        await supabase.from("notifications").insert({
          user_id: request.user_id,
          title: "Pagamento confirmado!",
          message: `O pagamento da bolsa "${request.publications?.title}" foi confirmado.`,
          link: "/profile",
        });
      }
      toast({ title: "Pagamento aprovado!" });
      fetchRequests();
    }
    setUpdatingId(null);
  };

  const deleteRequest = async (requestId: string) => {
    const { error } = await supabase.from("scholarship_requests").delete().eq("id", requestId);
    if (error) {
      toast({ title: "Erro ao eliminar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Solicitação eliminada!" });
      fetchRequests();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20"><CheckCircle className="h-3 w-3 mr-1" />Aprovado</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20"><XCircle className="h-3 w-3 mr-1" />Rejeitado</Badge>;
      case "contacted":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20"><MessageSquare className="h-3 w-3 mr-1" />Contactado</Badge>;
      default:
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
    }
  };

  const filteredRequests = filterStatus === "all" ? requests : requests.filter(r => r.status === filterStatus);
  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    contacted: requests.filter(r => r.status === "contacted").length,
    approved: requests.filter(r => r.status === "approved").length,
    rejected: requests.filter(r => r.status === "rejected").length,
  };

  if (loading) {
    return <div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold">{stats.total}</div><p className="text-xs text-muted-foreground">Total</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold text-yellow-600">{stats.pending}</div><p className="text-xs text-muted-foreground">Pendentes</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold text-blue-600">{stats.contacted}</div><p className="text-xs text-muted-foreground">Contactados</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold text-green-600">{stats.approved}</div><p className="text-xs text-muted-foreground">Aprovados</p></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-2xl font-bold text-red-600">{stats.rejected}</div><p className="text-xs text-muted-foreground">Rejeitados</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5" />Solicitações de Orientação</CardTitle>
              <CardDescription>Gerencie as solicitações de orientação para bolsas de estudo</CardDescription>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filtrar por status" /></SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="contacted">Contactados</SelectItem>
                <SelectItem value="approved">Aprovados</SelectItem>
                <SelectItem value="rejected">Rejeitados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Nenhuma solicitação encontrada</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidato</TableHead>
                    <TableHead>Bolsa</TableHead>
                    <TableHead>Contacto</TableHead>
                     <TableHead>Data</TableHead>
                     <TableHead>Status</TableHead>
                     <TableHead>Pagamento</TableHead>
                     <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{request.name}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{request.city}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium line-clamp-1">{request.publications?.title || "Bolsa removida"}</p>
                          {request.publications?.country && <p className="text-xs text-primary">{request.publications.country}</p>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs"><Mail className="h-3 w-3" /><a href={`mailto:${request.email}`} className="hover:underline">{request.email}</a></div>
                          <div className="flex items-center gap-1 text-xs"><Phone className="h-3 w-3" /><a href={`tel:+258${request.phone}`} className="hover:underline">+258 {request.phone}</a></div>
                          {request.message && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 text-xs px-2"><MessageSquare className="h-3 w-3 mr-1" />Ver mensagem</Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Mensagem de {request.name}</DialogTitle>
                                  <DialogDescription>Solicitação para: {request.publications?.title}</DialogDescription>
                                </DialogHeader>
                                <div className="mt-4 p-4 bg-muted rounded-lg"><p className="whitespace-pre-wrap">{request.message}</p></div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </TableCell>
                      <TableCell><span className="text-sm text-muted-foreground">{format(new Date(request.created_at), "dd/MM/yyyy", { locale: ptBR })}</span></TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        {request.payment_status === "confirmed" ? (
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/20"><CheckCircle className="h-3 w-3 mr-1" />Confirmado</Badge>
                        ) : request.payment_status === "paid" ? (
                          <div className="flex items-center gap-2">
                            <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20"><Banknote className="h-3 w-3 mr-1" />Pago</Badge>
                            <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50 text-xs h-7" onClick={() => approvePayment(request.id)} disabled={updatingId === request.id}>
                              {updatingId === request.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <>Aprovar</>}
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {request.status === "pending" && (
                            <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50" onClick={() => updateStatus(request.id, "contacted")} disabled={updatingId === request.id}>
                              {updatingId === request.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageSquare className="h-4 w-4" />}
                            </Button>
                          )}
                          {request.status !== "approved" && (
                            <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50" onClick={() => updateStatus(request.id, "approved")} disabled={updatingId === request.id}>
                              {updatingId === request.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                            </Button>
                          )}
                          {request.status !== "rejected" && (
                            <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50" onClick={() => updateStatus(request.id, "rejected")} disabled={updatingId === request.id}>
                              {updatingId === request.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
                            </Button>
                          )}
                          {request.status !== "pending" && (
                            <Button size="sm" variant="outline" onClick={() => updateStatus(request.id, "pending")} disabled={updatingId === request.id}>
                              {updatingId === request.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Clock className="h-4 w-4" />}
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
                                <AlertDialogTitle>Eliminar solicitação?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta ação não pode ser desfeita. A solicitação de {request.name} será permanentemente eliminada.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteRequest(request.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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

export default ScholarshipRequestsManager;
