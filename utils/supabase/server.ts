import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = async () => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Supabase URL/Anon Key manquants. Renseigne NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return typeof (cookieStore as any).getAll === "function"
          ? cookieStore.getAll()
          : [];
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            (cookieStore as any).set?.(name, value, options)
          );
        } catch {
          // Appelé côté serveur : Next gère la persistance via middleware ou routes.
        }
      },
    },
  });
};
