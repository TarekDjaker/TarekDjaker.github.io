import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarek DJAKER - Portfolio",
  description: "Data Scientist • ML Engineer - Portfolio de Tarek DJAKER",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
