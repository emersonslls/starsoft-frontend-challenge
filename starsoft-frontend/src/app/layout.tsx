// app/layout.tsx
import type { Metadata } from "next";
import "./styles/main.scss";
import ReactQueryProvider from '../providers/ReactQueryProvider'; 
import ReduxProvider from '../providers/ReduxProvider';

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
        <ReduxProvider>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
