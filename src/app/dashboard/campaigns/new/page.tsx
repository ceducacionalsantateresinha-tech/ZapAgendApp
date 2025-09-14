"use client";

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
import { Info } from "lucide-react";

export default function NewCampaignPage() {
  return (
    <>
      <PageHeader title="Criar Nova Campanha" />
      <main className="flex-1 p-4 md:p-8">
        <div className="grid gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Detalhes da Campanha</CardTitle>
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumbers">Números de Telefone</Label>
                <Textarea
                  id="phoneNumbers"
                  placeholder="Cole os números de telefone aqui, um por linha."
                  className="min-h-[150px]"
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
                />
                 <p className="text-xs text-muted-foreground">
                  Você pode usar variáveis como {"{{nome}}"} para personalizar.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Salvar como Rascunho</Button>
                <Button>Agendar Envio</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}
