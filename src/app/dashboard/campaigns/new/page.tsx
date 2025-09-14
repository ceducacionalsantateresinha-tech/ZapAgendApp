"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Info, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Campaign } from "../page";

export default function NewCampaignPage() {
  const [campaignName, setCampaignName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSchedule = () => {
    if (!campaignName || !phoneNumbers || !message) {
      toast({
        variant: "destructive",
        title: "Erro de Validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newCampaign: Campaign = {
        name: campaignName,
        status: "Agendado",
        recipients: phoneNumbers.split("\n").filter(Boolean).length,
        scheduledAt: new Date().toLocaleDateString("pt-BR", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
      };

      const existingCampaigns: Campaign[] = JSON.parse(
        localStorage.getItem("campaigns") || "[]"
      );
      localStorage.setItem(
        "campaigns",
        JSON.stringify([...existingCampaigns, newCampaign])
      );
      
      toast({
        title: "Sucesso!",
        description: "Sua campanha foi agendada.",
      });

      router.push("/dashboard/campaigns");

    } catch (error) {
       toast({
        variant: "destructive",
        title: "Erro ao Agendar",
        description: "Não foi possível salvar a campanha. Tente novamente.",
      });
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <PageHeader title="Criar Nova Campanha" />
      <main className="flex-1 p-4 md:p-8">
        <div className="grid gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                Detalhes da Campanha
              </CardTitle>
              <CardDescription>
                Preencha as informações abaixo para criar sua campanha de
                mensagens.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="campaignName">Nome da Campanha</Label>
                <Input
                  id="campaignName"
                  placeholder="Ex: Campanha de Lançamento"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumbers">Números de Telefone</Label>
                <Textarea
                  id="phoneNumbers"
                  placeholder="Cole os números de telefone aqui, um por linha."
                  className="min-h-[150px]"
                  value={phoneNumbers}
                  onChange={(e) => setPhoneNumbers(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Use o formato internacional, ex: 5511999998888.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  placeholder="Digite a mensagem que você deseja enviar."
                  className="min-h-[150px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Você pode usar variáveis como {"{{nome}}"} para personalizar.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" disabled>Salvar como Rascunho</Button>
              <Button onClick={handleSchedule} disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Agendando...
                    </>
                ) : "Agendar Envio"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}
