import type { Metadata } from "next";
import "./styles/main.scss";
import ReactQueryProvider from '../providers/ReactQueryProvider'; 

export const metadata: Metadata = {
  title: "Marketplace de NFTs | StarSoft",
  description: "Esse é um desafio de Front-end fornecido pela StarSoft, onde utilizaremos Next.js",
  icons: {
    icon: "/faviconstarsoft.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Usando o ReactQueryProvider para fornecer o cliente do React Query */}
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
