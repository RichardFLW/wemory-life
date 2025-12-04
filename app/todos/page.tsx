import { createClient } from "@/utils/supabase/server";

export default async function TodosPage() {
  let supabase;

  try {
    supabase = await createClient();
  } catch (error) {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-16 text-foreground">
        <p className="text-sm text-foreground/70">
          {error instanceof Error ? error.message : "Erreur de configuration Supabase."}
        </p>
      </main>
    );
  }

  const { data: todos, error } = await supabase.from("todos").select("*");

  if (error) {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-16 text-foreground">
        <p className="text-sm text-foreground/70">
          Erreur Supabase : {error.message}
        </p>
      </main>
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16 text-foreground">
      <section className="w-full max-w-2xl space-y-6 text-center">
        <h1 className="text-3xl font-semibold text-foreground">
          Todos Supabase
        </h1>
        <ul className="space-y-2 text-left text-foreground/80">
          {(todos ?? []).length ? (
            todos!.map((todo: any) => (
              <li
                key={todo.id ?? JSON.stringify(todo)}
                className="rounded-lg border border-foreground/10 bg-background/80 px-4 py-3"
              >
                {typeof todo === "string"
                  ? todo
                  : todo.title ?? JSON.stringify(todo)}
              </li>
            ))
          ) : (
            <li className="rounded-lg border border-foreground/10 bg-background/80 px-4 py-3">
              Aucun todo.
            </li>
          )}
        </ul>
      </section>
    </main>
  );
}
