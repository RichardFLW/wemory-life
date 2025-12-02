"use client";

import { useMemo, useState } from "react";

export default function Home() {
  const [ascending, setAscending] = useState(true);

  const events = useMemo(
    () => [
      {
        title: "Naissance",
        time: "25 Septembre 1992",
        meta: "17h28",
        description: "Un moment fondateur à placer au cœur de ta frise.",
        sortKey: Date.parse("1992-09-25T17:28:00Z"),
        centered: true,
      },
      {
        title: "Point de départ",
        time: "2022",
        description:
          "Débute ton récit ici : une idée, une rencontre, un lancement.",
        sortKey: Date.parse("2022-01-01T00:00:00Z"),
      },
      {
        title: "Étape marquante",
        time: "2023",
        description:
          "Décris un jalon important, un pivot ou une réussite.",
        sortKey: Date.parse("2023-01-01T00:00:00Z"),
      },
      {
        title: "Aujourd'hui",
        time: "2024",
        description:
          "Situation actuelle ou prochaine étape : ce qui vient ensuite.",
        sortKey: Date.parse("2024-01-01T00:00:00Z"),
      },
    ],
    []
  );

  const sorted = useMemo(
    () =>
      [...events].sort((a, b) =>
        ascending ? a.sortKey - b.sortKey : b.sortKey - a.sortKey
      ),
    [ascending, events]
  );

  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-foreground">
      <section className="w-full max-w-4xl space-y-8 text-center">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">
            Frise chronologique
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Moments clés au centre de la page.
          </h1>
          <p className="text-lg text-foreground/70">
            Ajoute ou remplace les entrées ci-dessous pour raconter ton histoire.
            La ligne verticale est centrée, chaque événement reste lisible sur le
            fond à points.
          </p>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setAscending((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-4 py-2 text-sm font-medium text-foreground/80 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-foreground/20 hover:text-foreground"
            >
              {ascending ? "Ordre chronologique" : "Ordre inverse"}
            </button>
          </div>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div
            aria-hidden
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foreground/15"
          />
          <ul className="space-y-12">
            {sorted.map((item) => (
              <li key={item.time} className="relative">
                <div
                  className={`flex items-start gap-4 ${
                    item.centered ? "justify-center text-center" : ""
                  }`}
                >
                  <div
                    aria-hidden
                    className="relative z-10 grid h-4 w-4 place-items-center rounded-full bg-foreground shadow-[0_0_0_10px_rgba(255,255,255,0.85)] backdrop-blur dark:shadow-[0_0_0_10px_rgba(0,0,0,0.85)]"
                  />
                  <div
                    className={`flex-1 rounded-2xl border border-foreground/10 bg-background/80 p-6 shadow-sm backdrop-blur ${
                      item.centered ? "max-w-xl text-center" : "text-left"
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <div
                      className={`mt-1 flex flex-wrap items-center gap-2 text-sm font-medium text-foreground/60 ${
                        item.centered ? "justify-center" : ""
                      }`}
                    >
                      <span>{item.time}</span>
                      {item.meta ? (
                        <span className="inline-flex items-center gap-2">
                          <span aria-hidden className="h-1 w-1 rounded-full bg-foreground/30" />
                          {item.meta}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-foreground/70">{item.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
