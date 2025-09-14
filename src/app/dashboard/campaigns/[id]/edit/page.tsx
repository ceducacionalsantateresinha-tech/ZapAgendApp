"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import type { Campaign } from "../../page";

// Fake data for phone numbers and message, since they are not stored in the campaign object
const FAKE_INITIAL_DATA = {
    phoneNumbers: `5511999998888
5521987654321
5531912345678`,
    message: "Esta é a sua mensagem de campanha. Personalize como quiser!"
}


export default function EditCampaignPage() {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [campaignName, setCampaignName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const id = params.id as string;

  useEffect(() => {
    if (id) {
      const existingCampaigns: Campaign[] = JSON.parse(
        localStorage.getItem("campaigns") || "[]"
      );
      const campaignToEdit = existingCampaigns.find((c) => c.id === id);
      if (campaignToEdit) {
        setCampaign(campaignToEdit);
        setCampaignName(campaignToEdit.name);
        // We don't store phone numbers or message, so we use fake data for now
        setPhoneNumbers(FAKE_INITIAL_DATA.phoneNumbers);
        setMessage(FAKE_INITIAL_DATA.message);
      } else {
         toast({
            variant: "destructive",
            title: "Campanha não encontrada",
            description: "Não foi possível encontrar a campanha para edição.",
        });
        router.push("/dashboard/campaigns");
      }
      setIsLoading(false);
    }
  }, [id, router, toast]);

  const handleSaveChanges = () => {
    if (!campaignName || !phoneNumbers || !message || !campaign) {
      toast({
        variant: "destructive",
        title: "Erro de Validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedCampaign: Campaign = {
        ...campaign,
        name: campaignName,
        recipients: phoneNumbers.split("\n").filter(Boolean).length,
      };

      const existingCampaigns: Campaign[] = JSON.parse(
        localStorage.getItem("campaigns") || "[]"
      );
      const updatedCampaigns = existingCampaigns.map((c) =>
        c.id === id ? updatedCampaign : c
      );

      localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
      
      toast({
        title: "Sucesso!",
        description: "Sua campanha foi atualizada.",
      });

      router.push("/dashboard/campaigns");

    } catch (error) {
       toast({
        variant: "destructive",
        title: "Erro ao Salvar",
        description: "Não foi possível salvar as alterações. Tente novamente.",
      });
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
        <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    )
  }

  return (
    <>
      <PageHeader title="Editar Campanha" />
      <main className="flex-1 p-4 md:p-8">
        <div className="grid gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                Detalhes da Campanha
              </CardTitle>
              <CardDescription>
                Altere as informações abaixo para editar sua campanha.
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
              <Button variant="outline" onClick={() => router.push('/dashboard/campaigns')}>Cancelar</Button>
              <Button onClick={handleSaveChanges} disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                    </>
                ) : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}
