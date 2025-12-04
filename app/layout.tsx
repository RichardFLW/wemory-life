import type { Metadata } from "next";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wemory Life",
  description: "Base Next.js propre pour démarrer ton projet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 border-b border-foreground/10 bg-background/70 backdrop-blur">
            <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
              <Link
                href="/"
                className="text-base font-semibold tracking-tight text-foreground"
              >
                Wemory Life
              </Link>
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-foreground/50"
              >
                <LogIn className="h-4 w-4" />
                Se connecter / S'inscrire
              </Link>
            </div>
          </header>
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
