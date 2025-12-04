import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Timeline } from "./Timeline";

export async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth");
}

export default async function ProtectedPage() {
  let supabase;

  try {
    supabase = await createClient();
  } catch (error) {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-16 text-foreground">
        <p className="text-sm text-foreground/70">
          {error instanceof Error
            ? error.message
            : "Configuration Supabase manquante."}
        </p>
      </main>
    );
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-16 text-foreground">
        <p className="text-sm text-foreground/70">
          Erreur Supabase : {error.message}
        </p>
      </main>
    );
  }

  if (!user) {
    redirect("/auth");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16 text-foreground">
      <div className="w-full max-w-5xl space-y-12">
        <section className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">
            Espace privé
          </p>
          <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Bienvenue, {user.email}
          </h1>
          <p className="text-base text-foreground/70">
            Ta frise personnelle est accessible ici. Ajoute, inverse l'ordre ou
            personnalise tes événements. Seuls les utilisateurs connectés peuvent
            voir cette page.
          </p>
          <form action={signOut} className="flex justify-center pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-foreground/30"
            >
              Se déconnecter
            </button>
          </form>
        </section>

        <Timeline />
      </div>
    </main>
  );
}
