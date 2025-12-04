"use client";

import Link from "next/link";
import { LogIn, Mail, Shield } from "lucide-react";

export default function AuthPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16 text-foreground">
      <section className="w-full max-w-lg space-y-8 text-center">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">
            Accès
          </p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Se connecter / S'inscrire
          </h1>
          <p className="text-base text-foreground/70">
            Une simple ébauche de page d'authentification. Branche tes API ou
            fournisseurs tiers quand tu seras prêt.
          </p>
        </div>

        <div className="rounded-2xl border border-foreground/10 bg-background/80 p-6 text-left shadow-sm backdrop-blur">
          <form className="space-y-4">
            <label className="flex flex-col gap-2 text-sm text-foreground/80">
              Email
              <div className="flex items-center gap-2 rounded-xl border border-foreground/15 bg-background/80 px-3 py-2 shadow-sm focus-within:border-foreground/30 focus-within:ring-2 focus-within:ring-foreground/20">
                <Mail className="h-4 w-4 text-foreground/50" />
                <input
                  type="email"
                  required
                  placeholder="toi@exemple.com"
                  className="w-full bg-transparent text-foreground outline-none"
                />
              </div>
            </label>
            <label className="flex flex-col gap-2 text-sm text-foreground/80">
              Mot de passe
              <div className="flex items-center gap-2 rounded-xl border border-foreground/15 bg-background/80 px-3 py-2 shadow-sm focus-within:border-foreground/30 focus-within:ring-2 focus-within:ring-foreground/20">
                <Shield className="h-4 w-4 text-foreground/50" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-transparent text-foreground outline-none"
                />
              </div>
            </label>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-foreground/50"
            >
              <LogIn className="h-4 w-4" />
              Continuer
            </button>
            <p className="text-center text-xs text-foreground/60">
              Cette page est statique pour l'instant. Branche ton système
              d'authentification ici.
            </p>
          </form>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center text-sm font-medium text-foreground/70 transition hover:text-foreground"
        >
          ← Retour à la frise
        </Link>
      </section>
    </main>
  );
}
