import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Banknote, Copy, CheckCircle2, CreditCard, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PaymentSettings {
  iban: string;
  iban_name: string;
  mpesa_number: string;
  mpesa_name: string;
  scholarship_price: string;
  currency: string;
  payment_note: string;
  credit_card_enabled: string;
}

interface PaymentInfoCardProps {
  type: "scholarship" | "course";
  publicationTitle?: string;
  coursePrice?: string | null;
}

export const PaymentInfoCard = ({ type, publicationTitle, coursePrice }: PaymentInfoCardProps) => {
  const [settings, setSettings] = useState<PaymentSettings | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from("payment_settings")
      .select("setting_key, setting_value");

    if (data) {
      const s: any = {};
      data.forEach((row: any) => {
        s[row.setting_key] = row.setting_value;
      });
      setSettings(s);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast({ title: "Copiado!", description: `${label} copiado para a área de transferência` });
    setTimeout(() => setCopied(null), 2000);
  };

  if (!settings) return null;

  const priceDisplay = type === "course" && coursePrice
    ? coursePrice
    : `${settings.scholarship_price} ${settings.currency}`;

  const creditCardEnabled = settings.credit_card_enabled === "true";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="text-amber-600 border-amber-500/30 hover:bg-amber-50 dark:hover:bg-amber-950/30"
          onClick={(e) => e.stopPropagation()}
        >
          <Banknote className="h-4 w-4 mr-1" />
          Ver Pagamento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5 text-amber-600" />
            Informações de Pagamento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              Valor: {priceDisplay}
            </Badge>
          </div>

          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual" className="flex items-center gap-1">
                <Banknote className="h-3.5 w-3.5" />
                Manual
              </TabsTrigger>
              <TabsTrigger value="card" className="flex items-center gap-1">
                <CreditCard className="h-3.5 w-3.5" />
                Cartão/Visa
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-3 mt-3">
              <div className="rounded-lg border border-border p-3 space-y-2">
                <p className="text-sm font-semibold text-foreground">Transferência Bancária (IBAN)</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome: {settings.iban_name}</p>
                    <p className="text-sm font-mono text-foreground">{settings.iban}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(settings.iban, "IBAN")}
                  >
                    {copied === "IBAN" ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-border p-3 space-y-2">
                <p className="text-sm font-semibold text-foreground">M-Pesa</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome: {settings.mpesa_name}</p>
                    <p className="text-sm font-mono text-foreground">{settings.mpesa_number}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(settings.mpesa_number, "M-Pesa")}
                  >
                    {copied === "M-Pesa" ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground italic">
                {settings.payment_note}
              </p>
            </TabsContent>

            <TabsContent value="card" className="mt-3">
              {creditCardEnabled ? (
                <div className="rounded-lg border border-border p-4 text-center space-y-3">
                  <CreditCard className="h-10 w-10 mx-auto text-primary" />
                  <p className="text-sm font-medium text-foreground">Pagamento por Cartão de Crédito/Visa</p>
                  <p className="text-xs text-muted-foreground">
                    Clique no botão abaixo para pagar com cartão de crédito ou débito.
                  </p>
                  <Button className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pagar com Cartão
                  </Button>
                </div>
              ) : (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-center space-y-3">
                  <AlertCircle className="h-10 w-10 mx-auto text-destructive/60" />
                  <p className="text-sm font-medium text-foreground">Método Indisponível</p>
                  <p className="text-xs text-muted-foreground">
                    O pagamento por cartão de crédito/visa está temporariamente indisponível. 
                    Por favor, utilize o método de pagamento manual (IBAN ou M-Pesa).
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
