import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/icons';
import Image from "next/image";
import { placeHolderImages } from '@/lib/placeholder-images';

export default function LoginPage() {
  const loginImage = placeHolderImages.find(image => image.id === 'login-background');
  
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Logo className="h-10 w-10 text-primary" />
              <h1 className="text-3xl font-headline font-bold">
                ZapAgendApp
              </h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Entre para automatizar suas conversas no WhatsApp.
            </p>
          </div>
          <div className="grid gap-4">
            <Button variant="outline">
              Login com Google
            </Button>
            <Button>
              <Link href="/dashboard">Acessar Painel (Demo)</Link>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{' '}
            <Link href="#" className="underline">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        {loginImage && (
          <Image
            src={loginImage.imageUrl}
            alt={loginImage.description}
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.3] dark:grayscale"
            data-ai-hint={loginImage.imageHint}
          />
        )}
      </div>
    </div>
  );
}
