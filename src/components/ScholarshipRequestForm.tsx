import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { GraduationCap, Send } from "lucide-react";
import CreateAccountAfterSubmit from "./CreateAccountAfterSubmit";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  email: z.string().email("Email inválido").max(255, "Email muito longo"),
  phone: z.string().min(9, "Contacto deve ter pelo menos 9 dígitos").max(20, "Contacto muito longo"),
  city: z.string().min(2, "Cidade é obrigatória").max(100, "Nome da cidade muito longo"),
  message: z.string().max(1000, "Mensagem muito longa").optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ScholarshipRequestFormProps {
  scholarshipTitle: string;
  scholarshipId: string;
}

const mozambiqueCities = [
  "Maputo", "Matola", "Beira", "Nampula", "Chimoio", "Nacala",
  "Quelimane", "Tete", "Lichinga", "Pemba", "Xai-Xai", "Maxixe",
  "Inhambane", "Gurué", "Cuamba", "Outra",
];

const ScholarshipRequestForm = ({ scholarshipTitle, scholarshipId }: ScholarshipRequestFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtherCity, setIsOtherCity] = useState(false);
  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ email: string; name: string; recordId: string } | null>(null);
  const { user } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", city: "", message: "" },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const { data: inserted, error } = await supabase
        .from("scholarship_requests")
        .insert({
          user_id: user?.id || null,
          publication_id: scholarshipId,
          name: data.name,
          email: data.email,
          phone: data.phone,
          city: data.city,
          message: data.message || null,
          status: "pending",
        })
        .select("id")
        .single();

      if (error) throw error;
      
      toast({
        title: "Solicitação enviada!",
        description: `Sua solicitação de orientação para "${scholarshipTitle}" foi enviada.`,
      });

      // If user is not logged in, prompt account creation
      if (!user && inserted) {
        setSubmittedData({ email: data.email, name: data.name, recordId: inserted.id });
        setShowAccountDialog(true);
      }
      
      form.reset();
    } catch (error: any) {
      toast({
        title: "Erro ao enviar solicitação",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAccountCreated = async (userId: string) => {
    if (!submittedData) return;
    // Link the request to the new user
    await supabase
      .from("scholarship_requests")
      .update({ user_id: userId })
      .eq("id", submittedData.recordId);
  };

  const handleCityChange = (value: string) => {
    if (value === "Outra") {
      setIsOtherCity(true);
      form.setValue("city", "");
    } else {
      setIsOtherCity(false);
      form.setValue("city", value);
    }
  };

  return (
    <>
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2 text-xl">
            <GraduationCap className="h-5 w-5 text-primary" />
            Solicitar Orientação
          </CardTitle>
          <CardDescription>
            Preencha os dados abaixo para solicitar orientação sobre esta bolsa
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl><Input placeholder="Seu nome completo" {...field} className="bg-background" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" placeholder="seu.email@exemplo.com" {...field} className="bg-background" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Contacto (Telefone)</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <span className="flex items-center px-3 bg-muted rounded-md text-sm text-muted-foreground border border-input">+258</span>
                      <Input type="tel" placeholder="84 123 4567" {...field} className="bg-background" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  {!isOtherCity ? (
                    <Select onValueChange={handleCityChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background"><SelectValue placeholder="Selecione sua cidade" /></SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover">
                        {mozambiqueCities.map((city) => (<SelectItem key={city} value={city}>{city}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <FormControl>
                      <div className="flex gap-2">
                        <Input placeholder="Digite o nome da sua cidade" {...field} className="bg-background" />
                        <Button type="button" variant="outline" size="sm" onClick={() => { setIsOtherCity(false); form.setValue("city", ""); }}>Voltar</Button>
                      </div>
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem (Opcional)</FormLabel>
                  <FormControl><Textarea placeholder="Descreva suas dúvidas ou necessidades específicas..." {...field} className="bg-background" rows={4} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <Button type="submit" className="w-full mt-6" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "A enviar..." : (<><Send className="h-4 w-4 mr-2" />Solicitar Orientação</>)}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {submittedData && (
        <CreateAccountAfterSubmit
          open={showAccountDialog}
          onOpenChange={setShowAccountDialog}
          email={submittedData.email}
          fullName={submittedData.name}
          onAccountCreated={handleAccountCreated}
        />
      )}
    </>
  );
};

export default ScholarshipRequestForm;
