"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20 text-foreground">
      <section className="w-full max-w-5xl space-y-10 text-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">
            Wemory Life
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Capture tes moments. Garde-les dans ton espace privé.
          </h1>
          <p className="text-lg text-foreground/70">
            Crée ta frise chronologique personnelle, sécurisée avec Supabase.
            Connecte-toi pour accéder à tes événements et les enrichir.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/auth"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-foreground/50"
          >
            Se connecter / S'inscrire
          </Link>
          <Link
            href="/protected"
            className="inline-flex items-center justify-center rounded-full border border-foreground/15 px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-foreground/30 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30"
          >
            Voir mon espace privé
          </Link>
        </div>

        <div className="mx-auto max-w-3xl rounded-2xl border border-foreground/10 bg-background/70 p-6 text-left shadow-sm backdrop-blur">
          <h2 className="text-lg font-semibold text-foreground">Comment ça marche</h2>
          <ul className="mt-3 space-y-2 text-foreground/70">
            <li>1. Crée un compte ou connecte-toi via Supabase.</li>
            <li>2. Accède à ton espace privé et ajoutes tes événements.</li>
            <li>3. Trie, inverse l'ordre, personnalise tes dates et descriptions.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
