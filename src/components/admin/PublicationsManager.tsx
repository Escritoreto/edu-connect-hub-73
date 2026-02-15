import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Pencil, Trash2, Search, Eye } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Publication {
  id: string;
  title: string;
  category: "scholarship" | "job" | "course";
  country: string | null;
  status: string | null;
  views_count: number | null;
  is_featured: boolean | null;
  created_at: string;
  description: string;
  short_description: string | null;
  value: string | null;
  external_link: string | null;
}

const PublicationsManager = () => {
  const { toast } = useToast();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Edit form state
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editShortDescription, setEditShortDescription] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editIsFeatured, setEditIsFeatured] = useState(false);
  const [editExternalLink, setEditExternalLink] = useState("");

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar publicações",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setPublications(data || []);
    }
    setIsLoading(false);
  };

  const handleEdit = (publication: Publication) => {
    setEditingPublication(publication);
    setEditTitle(publication.title);
    setEditDescription(publication.description);
    setEditShortDescription(publication.short_description || "");
    setEditValue(publication.value || "");
    setEditStatus(publication.status || "Aberta");
    setEditIsFeatured(publication.is_featured || false);
    setEditExternalLink(publication.external_link || "");
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingPublication) return;
    setIsSaving(true);

    const { error } = await supabase
      .from("publications")
      .update({
        title: editTitle,
        description: editDescription,
        short_description: editShortDescription || null,
        value: editValue || null,
        status: editStatus,
        is_featured: editIsFeatured,
        external_link: editExternalLink || null,
      })
      .eq("id", editingPublication.id);

    if (error) {
      toast({
        title: "Erro ao atualizar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Publicação atualizada!",
        description: "As alterações foram salvas com sucesso.",
      });
      setIsEditDialogOpen(false);
      fetchPublications();
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("publications").delete().eq("id", id);

    if (error) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Publicação excluída",
        description: "A publicação foi removida com sucesso.",
      });
      fetchPublications();
    }
  };

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || pub.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      scholarship: "Bolsa",
      job: "Emprego",
      course: "Curso",
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      scholarship: "bg-blue-500/20 text-blue-400",
      job: "bg-green-500/20 text-green-400",
      course: "bg-purple-500/20 text-purple-400",
    };
    return colors[category] || "bg-gray-500/20 text-gray-400";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Publicações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="scholarship">Bolsas</SelectItem>
              <SelectItem value="course">Cursos</SelectItem>
              <SelectItem value="job">Empregos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Views</TableHead>
                <TableHead className="text-center">Destaque</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPublications.map((pub) => (
                <TableRow key={pub.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {pub.title}
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(pub.category)}>
                      {getCategoryLabel(pub.category)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={pub.status === "Aberta" ? "default" : "secondary"}>
                      {pub.status || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Eye className="h-3 w-3" />
                      {pub.views_count || 0}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {pub.is_featured ? (
                      <Badge className="bg-amber-500/20 text-amber-400">Sim</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(pub)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir "{pub.title}"? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(pub.id)}>
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPublications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhuma publicação encontrada
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Publicação</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Descrição Curta</Label>
                <Textarea
                  value={editShortDescription}
                  onChange={(e) => setEditShortDescription(e.target.value)}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Descrição Completa</Label>
                <Textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={6}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Valor</Label>
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Ex: Cobertura Total"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectItem value="Aberta">Aberta</SelectItem>
                      <SelectItem value="Fechada">Fechada</SelectItem>
                      <SelectItem value="Em breve">Em breve</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Link Externo</Label>
                <Input
                  value={editExternalLink}
                  onChange={(e) => setEditExternalLink(e.target.value)}
                  placeholder="https://exemplo.com"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editIsFeatured}
                  onChange={(e) => setEditIsFeatured(e.target.checked)}
                  className="h-4 w-4"
                />
                <Label htmlFor="featured">Publicação em destaque</Label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveEdit} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar Alterações"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PublicationsManager;
