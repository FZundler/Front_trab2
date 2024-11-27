import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header"; // Certifique-se de que o Header seja o componente que você está utilizando
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "Music Store",
  description: "E-commerce loja - Instrumentos Pelotas - RS",
  keywords: ['Instrumentos', 'instrumento usados', 'instrumentos novos', 'produtos'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
