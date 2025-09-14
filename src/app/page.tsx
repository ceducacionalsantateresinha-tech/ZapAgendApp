import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/dashboard');
  
  // O conteúdo abaixo não será renderizado devido ao redirecionamento,
  // mas é mantido como um fallback.
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <p>Redirecionando para o painel...</p>
    </div>
  );
}
