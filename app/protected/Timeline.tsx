"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpDown,
  Baby,
  Clock3,
  Plus,
  School2,
  Sparkles,
} from "lucide-react";

type TimelineItem = {
  title: string;
  time: string;
  meta?: string;
  description: string;
  sortKey: number;
  centered?: boolean;
  icon?: LucideIcon;
};

export function Timeline() {
  const [ascending, setAscending] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [customEvents, setCustomEvents] = useState<TimelineItem[]>([]);
  const [form, setForm] = useState({
    title: "",
    displayDate: "",
    sortDate: "",
    meta: "",
    description: "",
    icon: "sparkles" as keyof typeof iconMap,
  });

  const iconMap: Record<string, LucideIcon> = {
    baby: Baby,
    school: School2,
    sparkles: Sparkles,
    clock: Clock3,
  };

  const baseEvents: TimelineItem[] = useMemo(
    () => [
      {
        title: "Naissance",
        time: "25 Septembre 1992",
        meta: "17h28",
        description: "Un moment fondateur à placer au cœur de ta frise.",
        sortKey: Date.parse("1992-09-25T17:28:00Z"),
        centered: true,
        icon: Baby,
      },
      {
        title: "Entrée à l'école maternelle Les Sablons",
        time: "Septembre 1995",
        meta: "Isbergues",
        description: "Premier pas à l'école, une étape clé de l'enfance.",
        sortKey: Date.parse("1995-09-01T00:00:00Z"),
        icon: School2,
      },
      {
        title: "Sortie de l'école maternelle Les Sablons",
        time: "Juillet 1998",
        meta: "Isbergues",
        description: "Fin de la maternelle, prêt pour la suite du parcours.",
        sortKey: Date.parse("1998-07-01T00:00:00Z"),
        icon: School2,
      },
      {
        title: "Point de départ",
        time: "2022",
        description:
          "Débute ton récit ici : une idée, une rencontre, un lancement.",
        sortKey: Date.parse("2022-01-01T00:00:00Z"),
        icon: Sparkles,
      },
      {
        title: "Étape marquante",
        time: "2023",
        description: "Décris un jalon important, un pivot ou une réussite.",
        sortKey: Date.parse("2023-01-01T00:00:00Z"),
        icon: Sparkles,
      },
      {
        title: "Aujourd'hui",
        time: "2024",
        description:
          "Situation actuelle ou prochaine étape : ce qui vient ensuite.",
        sortKey: Date.parse("2024-01-01T00:00:00Z"),
        icon: Clock3,
      },
    ],
    []
  );

  const events = useMemo(
    () => [...baseEvents, ...customEvents],
    [baseEvents, customEvents]
  );

  const sorted = useMemo(
    () =>
      [...events].sort((a, b) =>
        ascending ? a.sortKey - b.sortKey : b.sortKey - a.sortKey
      ),
    [ascending, events]
  );

  return (
    <section className="w-full max-w-5xl space-y-8 text-center">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">
          Frise chronologique
        </p>
        <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
          Ton histoire, centralisée dans ton espace privé.
        </h2>
        <p className="text-lg text-foreground/70">
          Ajoute ou remplace les entrées ci-dessous pour raconter ton parcours.
          La ligne verticale est centrée, chaque événement reste lisible sur le
          fond à points.
        </p>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={() => setAscending((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-4 py-2 text-sm font-medium text-foreground/80 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-foreground/20 hover:text-foreground"
          >
            <ArrowUpDown className="h-4 w-4" />
            {ascending ? "Ordre chronologique" : "Ordre inverse"}
          </button>
          <button
            type="button"
            aria-label="Ajouter un événement"
            onClick={() => setModalOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-foreground/50"
          >
            <Plus className="h-5 w-5" />
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
                  <div
                    className={`flex items-center gap-2 ${
                      item.centered ? "justify-center" : ""
                    }`}
                  >
                    {item.icon ? (
                      <item.icon className="h-5 w-5 text-foreground/70" />
                    ) : null}
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <div
                    className={`mt-1 flex flex-wrap items-center gap-2 text-sm font-medium text-foreground/60 ${
                      item.centered ? "justify-center" : ""
                    }`}
                  >
                    <span>{item.time}</span>
                    {item.meta ? (
                      <span className="inline-flex items-center gap-2">
                        <span
                          aria-hidden
                          className="h-1 w-1 rounded-full bg-foreground/30"
                        />
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

      {modalOpen ? (
        <div className="fixed inset-0 z-20 flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Fermer la fenêtre"
            onClick={() => setModalOpen(false)}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />
          <div className="relative z-30 w-full max-w-lg rounded-2xl border border-foreground/15 bg-background p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Ajouter un événement
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full p-1 text-foreground/60 transition hover:bg-foreground/5 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/50"
              >
                ✕
              </button>
            </div>
            <form
              className="space-y-4 text-left"
              onSubmit={(e) => {
                e.preventDefault();
                if (!form.title || !form.sortDate) return;
                const sortValue = Date.parse(form.sortDate);
                if (Number.isNaN(sortValue)) return;
                const Icon = iconMap[form.icon] ?? Sparkles;
                const display =
                  form.displayDate.trim() ||
                  new Date(form.sortDate).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  });
                const newItem: TimelineItem = {
                  title: form.title.trim(),
                  time: display,
                  meta: form.meta.trim() || undefined,
                  description:
                    form.description.trim() || "Nouvel événement ajouté.",
                  sortKey: sortValue,
                  icon: Icon,
                };
                setCustomEvents((prev) => [...prev, newItem]);
                setForm({
                  title: "",
                  displayDate: "",
                  sortDate: "",
                  meta: "",
                  description: "",
                  icon: "sparkles",
                });
                setModalOpen(false);
              }}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm text-foreground/80">
                  Titre
                  <input
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    className="rounded-lg border border-foreground/15 bg-background/80 px-3 py-2 text-foreground shadow-sm focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/30"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-foreground/80">
                  Lieu / Meta (optionnel)
                  <input
                    value={form.meta}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, meta: e.target.value }))
                    }
                    className="rounded-lg border border-foreground/15 bg-background/80 px-3 py-2 text-foreground shadow-sm focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/30"
                  />
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm text-foreground/80">
                  Date affichée (optionnel)
                  <input
                    placeholder="Ex. 12 mars 2010"
                    value={form.displayDate}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, displayDate: e.target.value }))
                    }
                    className="rounded-lg border border-foreground/15 bg-background/80 px-3 py-2 text-foreground shadow-sm focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/30"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-foreground/80">
                  Date pour le tri
                  <input
                    type="date"
                    required
                    value={form.sortDate}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, sortDate: e.target.value }))
                    }
                    className="rounded-lg border border-foreground/15 bg-background/80 px-3 py-2 text-foreground shadow-sm focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/30"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1 text-sm text-foreground/80">
                Description
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="rounded-lg border border-foreground/15 bg-background/80 px-3 py-2 text-foreground shadow-sm focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/30"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm text-foreground/80">
                Icône
                <select
                  value={form.icon}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      icon: e.target.value as keyof typeof iconMap,
                    }))
                  }
                  className="rounded-lg border border-foreground/15 bg-background/80 px-3 py-2 text-foreground shadow-sm focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/30"
                >
                  <option value="baby">Naissance</option>
                  <option value="school">École</option>
                  <option value="sparkles">Moment clé</option>
                  <option value="clock">Aujourd'hui / futur</option>
                </select>
              </label>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-foreground/50"
                >
                  <Plus className="h-4 w-4" />
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
