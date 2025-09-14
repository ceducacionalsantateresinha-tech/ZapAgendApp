"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { explainConceptAction } from "@/app/actions";
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
import { BookOpen, Loader2 } from "lucide-react";

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
          Explicando...
        </>
      ) : (
        <>
          <BookOpen className="mr-2 h-4 w-4" />
          Explicar Conceito
        </>
      )}
    </Button>
  );
}

export default function ConceptExplainerPage() {
  const [state, formAction] = useActionState(explainConceptAction, initialState);

  return (
    <>
      <PageHeader title="Explicador de Conceitos" />
      <main className="flex-1 p-4 md:p-8">
        <div className="grid gap-8 md:grid-cols-1 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Explicador de Conceitos com IA</CardTitle>
              <CardDescription>
                Digite um conceito, tópico ou termo que você deseja entender melhor. A IA irá gerar uma explicação simples e clara.
              </CardDescription>
            </CardHeader>
            <form action={formAction}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="concept">Conceito</Label>
                  <Input
                    id="concept"
                    name="concept"
                    placeholder="Ex: Inteligência Artificial, Buraco Negro, Blockchain"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <SubmitButton />
              </CardFooter>
            </form>
          </Card>

          {state.message && (
             <Card className="flex flex-col">
             <CardHeader>
               <CardTitle className="font-headline">Explicação da IA</CardTitle>
               <CardDescription>
                 Abaixo está a explicação gerada para o conceito solicitado.
               </CardDescription>
             </CardHeader>
             <CardContent className="flex-1">
               <div className="bg-muted p-4 rounded-md h-full min-h-[150px] text-sm text-muted-foreground whitespace-pre-wrap">
                {state.message}
               </div>
             </CardContent>
           </Card>
          )}
        </div>
      </main>
    </>
  );
}
