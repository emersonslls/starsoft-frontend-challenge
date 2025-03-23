import type { Metadata } from "next";
import "./styles/main.scss";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const metadata: Metadata = {
  title: "Marketplace de NFTs | StarSoft",
  description: "Esse é um desafio de Front-end fornecido pela StarSoft, onde utilizaremos Next.js",
  icons: {
    icon: "/faviconstarsoft.ico",
  },
};

// Criando uma instância do QueryClient
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={'antialiased'}>
        {/* Envolvendo a aplicação com o QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
