import type { Metadata } from "next";
import "./styles/main.scss";

export const metadata: Metadata = {
  title: "Marketplace de NFTs | StarSoft",
  description: "Esse é um desafio de Front-end fornecido pela StarSoft, onde utilizaremos Next.js",
  icons: {
    icon: "/faviconstarsoft.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={'antialiased'}>
        {children}
      </body>
    </html>
  );
}
