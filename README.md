# Wemory Life

Projet Next.js (App Router, TypeScript, Tailwind v4) prêt à être personnalisé.

## Démarrer

```bash
npm run dev
```

Ouvre http://localhost:3000 puis commence à éditer `app/page.tsx`.

## Points d'entrée utiles

- `app/layout.tsx` : métadonnées et layout global.
- `app/globals.css` : styles globaux et tokens de couleur/typo.
- `app/page.tsx` : page d'accueil minimaliste à remplacer par ton contenu.
- `app/auth/page.tsx` : formulaire connecté à Supabase (login / inscription).
- `app/todos/page.tsx` : exemple de requête côté serveur sur la table `todos`.
- `app/protected/page.tsx` : page privée protégée (redirige vers `/auth` si non connecté).

## Supabase

1. Ajoute dans `.env.local` :
   - `NEXT_PUBLIC_SUPABASE_URL=...`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
2. Redémarre le serveur (`npm run dev`).
3. La page `/auth` utilise `@/utils/supabase/client` (browser) pour s'authentifier.
4. La page `/todos` utilise `@/utils/supabase/server` pour lire `todos` côté serveur.
