import { FileUp, PlusCircle } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const contacts = [
  { name: "João Silva", phone: "+55 11 98765-4321", tags: ["Cliente VIP", "São Paulo"] },
  { name: "Maria Oliveira", phone: "+55 21 91234-5678", tags: ["Lead", "Rio de Janeiro"] },
  { name: "Pedro Almeida", phone: "+55 31 99999-8888", tags: ["Parceiro"] },
  { name: "Ana Costa", phone: "+55 81 98888-7777", tags: ["Lead"] },
];

export default function ContactsPage() {
  return (
    <>
      <PageHeader title="Contatos">
        <div className="flex gap-2">
          <Button variant="outline">
            <FileUp className="mr-2 h-4 w-4" />
            Importar CSV
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Contato
          </Button>
        </div>
      </PageHeader>
      <main className="flex-1 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Sua Lista de Contatos</CardTitle>
            <CardDescription>
              Visualize e gerencie todos os seus contatos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.phone}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {contact.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
