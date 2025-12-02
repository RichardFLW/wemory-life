export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-foreground">
      <section className="w-full max-w-2xl space-y-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">
          Base vierge
        </p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          Ton projet Next.js est prêt à être construit.
        </h1>
        <p className="text-lg text-foreground/70">
          Ajoute ton contenu, ta navigation et tes composants. Cette page est
          volontairement minimaliste pour te laisser repartir d'une base propre.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-foreground/70">
          <span className="rounded-full border border-foreground/10 px-3 py-2">
            app/page.tsx
          </span>
          <span className="rounded-full border border-foreground/10 px-3 py-2">
            app/globals.css
          </span>
          <span className="rounded-full border border-foreground/10 px-3 py-2">
            app/layout.tsx
          </span>
        </div>
      </section>
    </main>
  );
}
