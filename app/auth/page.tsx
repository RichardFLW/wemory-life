"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Mail, Shield, UserPlus } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function AuthPage() {
  let supabase: ReturnType<typeof createClient> | null = null;
  let initError: string | null = null;

  try {
    supabase = createClient();
  } catch (error) {
    initError =
      error instanceof Error
        ? error.message
        : "Erreur de configuration Supabase.";
  }

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!supabase) {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-16 text-foreground">
        <p className="text-sm text-foreground/70">
          {initError ?? "Configuration Supabase manquante."}
        </p>
      </main>
    );
  }

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
            Connecté à Supabase : email + mot de passe. Ajoute tes providers
            sociaux ou règles de sécurité selon tes besoins.
          </p>
        </div>

        <div className="rounded-2xl border border-foreground/10 bg-background/80 p-6 text-left shadow-sm backdrop-blur">
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setMessage(null);
              setLoading(true);
              const { error } =
                mode === "login"
                  ? await supabase.auth.signInWithPassword({
                      email,
                      password,
                    })
                  : await supabase.auth.signUp({
                      email,
                      password,
                    });
              if (error) {
                setMessage(error.message);
              } else {
                setMessage(
                  mode === "login"
                    ? "Connexion réussie."
                    : "Compte créé. Vérifie ton email si la confirmation est requise."
                );
                router.replace("/protected");
                router.refresh();
              }
              setLoading(false);
            }}
          >
            <label className="flex flex-col gap-2 text-sm text-foreground/80">
              Email
              <div className="flex items-center gap-2 rounded-xl border border-foreground/15 bg-background/80 px-3 py-2 shadow-sm focus-within:border-foreground/30 focus-within:ring-2 focus-within:ring-foreground/20">
                <Mail className="h-4 w-4 text-foreground/50" />
                <input
                  type="email"
                  required
                  placeholder="toi@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-foreground outline-none"
                />
              </div>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setMode((m) => (m === "login" ? "signup" : "login"))
                }
                className="rounded-full border border-foreground/15 px-4 py-2 text-sm font-semibold text-foreground/80 transition hover:-translate-y-0.5 hover:border-foreground/30 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30"
              >
                {mode === "login" ? "Passer en inscription" : "Passer en connexion"}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-foreground/50 disabled:opacity-60"
              >
                {mode === "login" ? (
                  <LogIn className="h-4 w-4" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                {loading ? "Patiente..." : mode === "login" ? "Connexion" : "Inscription"}
              </button>
            </div>
            {message ? (
              <p className="text-sm text-foreground/70">{message}</p>
            ) : null}
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
