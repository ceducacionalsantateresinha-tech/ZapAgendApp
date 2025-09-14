import { PlusCircle } from "lucide-react";
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

const templates: { title: string; content: string }[] = [];

export default function TemplatesPage() {
  return (
    <>
      <PageHeader title="Modelos de Mensagem">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Modelo
        </Button>
      </PageHeader>
      <main className="flex-1 p-4 md:p-8">
        {templates.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Nenhum modelo encontrado</h3>
              <p className="text-muted-foreground">Crie seu primeiro modelo de mensagem para começar.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.title}>
                <CardHeader>
                  <CardTitle className="font-headline text-lg">{template.title}</CardTitle>
                  <CardDescription>
                    Use variáveis como {"{{nome}}"} para personalizar.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
                    {template.content}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="ghost">Excluir</Button>
                  <Button>Editar</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  );
}