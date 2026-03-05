import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, CreditCard } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const PaymentSettingsManager = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    iban: "",
    iban_name: "",
    mpesa_number: "",
    mpesa_name: "",
    scholarship_price: "",
    currency: "MT",
    payment_note: "",
    credit_card_enabled: "false",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from("payment_settings")
      .select("setting_key, setting_value");

    if (data) {
      const s: any = { ...settings };
      data.forEach((row: any) => {
        if (row.setting_key in s) {
          s[row.setting_key] = row.setting_value;
        }
      });
      setSettings(s);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      for (const [key, value] of Object.entries(settings)) {
        const { data } = await supabase
          .from("payment_settings")
          .select("id")
          .eq("setting_key", key)
          .maybeSingle();

        if (data) {
          await supabase
            .from("payment_settings")
            .update({ setting_value: value, updated_at: new Date().toISOString() })
            .eq("setting_key", key);
        } else {
          await supabase
            .from("payment_settings")
            .insert({ setting_key: key, setting_value: value });
        }
      }

      toast({
        title: "Configurações salvas!",
        description: "As informações de pagamento foram atualizadas.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Configurações de Pagamento</CardTitle>
        <CardDescription className="text-slate-400">
          Edite as informações de pagamento exibidas aos usuários após aprovação
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Credit Card Toggle */}
        <div className="rounded-lg border border-slate-600 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-amber-400" />
              <div>
                <p className="text-sm font-medium text-white">Pagamento por Cartão de Crédito/Visa</p>
                <p className="text-xs text-slate-400">
                  {settings.credit_card_enabled === "true" 
                    ? "Ativado — os usuários podem ver a opção de cartão" 
                    : "Desativado — será mostrado como indisponível aos usuários"}
                </p>
              </div>
            </div>
            <Switch
              checked={settings.credit_card_enabled === "true"}
              onCheckedChange={async (checked) => {
                const newValue = checked ? "true" : "false";
                setSettings({ ...settings, credit_card_enabled: newValue });
                // Auto-save toggle immediately
                const { data } = await supabase
                  .from("payment_settings")
                  .select("id")
                  .eq("setting_key", "credit_card_enabled")
                  .maybeSingle();
                if (data) {
                  await supabase
                    .from("payment_settings")
                    .update({ setting_value: newValue, updated_at: new Date().toISOString() })
                    .eq("setting_key", "credit_card_enabled");
                } else {
                  await supabase
                    .from("payment_settings")
                    .insert({ setting_key: "credit_card_enabled", setting_value: newValue });
                }
                toast({
                  title: checked ? "Cartão ativado" : "Cartão desativado",
                  description: "Alteração salva automaticamente.",
                });
              }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Nome do titular (IBAN)</Label>
            <Input
              value={settings.iban_name}
              onChange={(e) => setSettings({ ...settings, iban_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">IBAN</Label>
            <Input
              value={settings.iban}
              onChange={(e) => setSettings({ ...settings, iban: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Nome M-Pesa</Label>
            <Input
              value={settings.mpesa_name}
              onChange={(e) => setSettings({ ...settings, mpesa_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Número M-Pesa</Label>
            <Input
              value={settings.mpesa_number}
              onChange={(e) => setSettings({ ...settings, mpesa_number: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Preço Assistência Bolsa</Label>
            <Input
              value={settings.scholarship_price}
              onChange={(e) => setSettings({ ...settings, scholarship_price: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Moeda</Label>
            <Input
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-slate-300">Nota de Pagamento</Label>
          <Textarea
            value={settings.payment_note}
            onChange={(e) => setSettings({ ...settings, payment_note: e.target.value })}
            rows={3}
          />
        </div>

        <Button onClick={handleSave} disabled={isSaving} className="w-full">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentSettingsManager;
