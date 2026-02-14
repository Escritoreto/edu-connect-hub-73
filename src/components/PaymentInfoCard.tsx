import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Banknote, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
