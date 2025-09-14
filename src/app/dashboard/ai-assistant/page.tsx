"use client";

import { useActionState, useFormStatus } from "react-dom";
import { generatePersonalizedMessage } from "@/app/actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Clipboard, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Gerando...
        </>
      ) : (
        <>
          <Bot className="mr-2 h-4 w-4" />
          Gerar Mensagem
        </>
      )}
    </Button>
  );
}

export default function AiAssistantPage() {
  const [state, formAction] = useActionState(
    generatePersonalizedMessage,
    initialState
  );
  const { toast } = useToast();

  const handleCopyToClipboard = () => {
    if (state.success && state.message) {
      navigator.clipboard.writeText(state.message);
      toast({
        title: "Copiado!",
        description: "A mensagem foi copiada para a área de transferência.",
      });
    }
  };

  useEffect(() => {
    if (!state.success && state.message) {
      toast({
        variant: 'destructive',
        title: 'Erro de Geração',
        description: state.message,
      })
    }
  }, [state, toast]);

  return (
    <>
      <PageHeader title="Assistente com IA" />
      <main className="flex-1 p-4 md:p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Personalize sua Mensagem</CardTitle>
              <CardDescription>
                Preencha os detalhes abaixo para a IA criar uma mensagem
                personalizada e eficaz.
              </CardDescription>
            </CardHeader>
            <form action={formAction}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactContext">Contexto do Contato</Label>
                  <Textarea
                    id="contactContext"
                    name="contactContext"
                    placeholder="Ex: João é um cliente antigo, interessado em nosso novo produto X. Tivemos uma reunião semana passada."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="messageGoal">Objetivo da Mensagem</Label>
                  <Input
                    id="messageGoal"
                    name="messageGoal"
                    placeholder="Ex: Agendar uma demonstração do produto X."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desiredTone">Tom da Mensagem</Label>
                  <Select name="desiredTone" defaultValue="Amigável">
                    <SelectTrigger id="desiredTone">
                      <SelectValue placeholder="Selecione o tom" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Amigável">Amigável</SelectItem>
                      <SelectItem value="Profissional">Profissional</SelectItem>
                      <SelectItem value="Formal">Formal</SelectItem>
                      <SelectItem value="Humorístico">Humorístico</SelectItem>
                      <SelectItem value="Empático">Empático</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="draftMessage">Rascunho (Opcional)</Label>
                  <Textarea
                    id="draftMessage"
                    name="draftMessage"
                    placeholder="Se tiver um rascunho, insira aqui para a IA aprimorá-lo."
                  />
                </div>
              </CardContent>
              <CardFooter>
                <SubmitButton />
              </CardFooter>
            </form>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">Sugestão da IA</CardTitle>
              <CardDescription>
                Aqui está a mensagem personalizada gerada para você.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="bg-muted p-4 rounded-md h-full min-h-[200px] text-sm text-muted-foreground whitespace-pre-wrap">
                {state.success ? state.message : "Aguardando geração..."}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={handleCopyToClipboard}
                disabled={!state.success}
              >
                <Clipboard className="mr-2 h-4 w-4" />
                Copiar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}
