📋 Documentation - Résolution des erreurs de déploiement Vercel

🚨 Problème Initial

URL avec erreur 404 : https://land-job-platform-5a238y9ns-jules-projects-4bdb74f2.vercel.app/

Symptômes :

- ✅ Build réussit localement
- ❌ Erreurs 404 sur Vercel après déploiement
- ❌ Pas d'erreurs de build apparentes

---

🔍 Erreurs Rencontrées & Solutions

Erreur #1 : Incompatibilité Types React

Erreur :
@types/react: ^19 installé
react: ^18.3.1 installé

Cause : Mismatch entre la version de React et ses types TypeScript

Solution :
// app/package.json - devDependencies
{
"@types/react": "^18", // ✅ était ^19
"@types/react-dom": "^18" // ✅ était ^19
}

Fichiers modifiés :

- app/package.json (lignes 37-38)

---

Erreur #2 : Framer Motion non transpilé

Erreur :
Module build failed with Framer Motion

Cause : Next.js 15 ne transpile pas automatiquement Framer Motion 12.x

Solution :
// app/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
transpilePackages: ["framer-motion"],
};

export default nextConfig;

Fichiers modifiés :

- app/next.config.ts

---

Erreur #3 : authOptions non exporté

Erreur du build Vercel :
Type error: Module '"@/app/api/auth/[...nextauth]/route"' declares 'authOptions' locally, but it is not exported.

./app/api/packages/[id]/route.ts:3:10

> 3 | import { authOptions } from '@/app/api/auth/[...nextauth]/route';

Cause : Import incorrect de authOptions depuis un fichier qui ne l'exporte pas

État du code :
// ❌ AVANT - app/api/packages/[id]/route.ts
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// app/api/auth/[...nextauth]/route.ts importe depuis @/lib/nextAuth
// mais ne ré-exporte PAS authOptions

Solution :
// ✅ APRÈS - app/api/packages/[id]/route.ts
import { authOptions } from '@/lib/nextAuth';

// ✅ APRÈS - app/api/packages/route.ts
import { authOptions } from '@/lib/nextAuth';

Fichiers modifiés :

- app/api/packages/[id]/route.ts (ligne 3)
- app/api/packages/route.ts (ligne 3)

---

Erreur #4 : Import motion/react invalide

Erreur :
Module not found: Can't resolve 'motion/react'
./components/ui/split-toggle-section.tsx

Cause : motion/react est l'API de Framer Motion 11.x, pas compatible avec 12.x

Solution :
// ✅ UTILISER L'IMPORT CLASSIQUE pour Framer Motion 12.x
import { motion, AnimatePresence } from "framer-motion";

Fichiers modifiés :

- app/components/ui/split-toggle-section.tsx (ligne 4)

---

Erreur #5 : Type TypeScript inference error

Erreur :
./app/rh/create/page.tsx:177:62
Type error: Argument of type 'string' is not assignable to parameter of type 'never'.

> 177 | checked={values.expertise.includes(option.value)}

Cause : TypeScript infère expertise: [] comme type never[] au lieu de string[]

Solution :
// ❌ AVANT
<Formik
initialValues={{
      bio: '',
      expertise: [],  // TypeScript infère never[]
      priceRange: '',
      calendlyLink: '',
    }}

>

// ✅ APRÈS
<Formik
initialValues={{
      bio: '',
      expertise: [] as string[],  // Type explicite
      priceRange: '',
      calendlyLink: '',
    }}

>

Fichiers modifiés :

- app/rh/create/page.tsx (ligne 128)

---

Erreur #6 : Prisma types non générés sur Vercel

Erreur :
Type error: Module '"@prisma/client"' has no exported member 'Expertise'.
./app/api/rh/[id]/route.ts:3:10

Cause : Sur Vercel, les scripts postinstall de Prisma sont ignorés pour des raisons de sécurité. Les types TypeScript générés par Prisma ne sont donc pas disponibles lors du build.

Warning Vercel :
Ignored build scripts: @prisma/client@6.9.0, @prisma/engines@6.9.0, prisma@6.9.0

Solution :
// ✅ APRÈS - app/package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "prisma generate"  // ← Ajouter cette ligne
  }
}

Explication : Le script postinstall force la génération des types Prisma après chaque installation de packages, même sur Vercel.

Fichiers modifiés :

- app/package.json (ajout du script postinstall)

---

✅ Configuration Finale

Package.json

{
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "postinstall": "prisma generate"
},
"dependencies": {
"framer-motion": "^12.23.26",
"next": "15.3.6",
"react": "^18.3.1",
"react-dom": "^18.3.1",
"@prisma/client": "6.9.0",
"prisma": "6.9.0"
},
"devDependencies": {
"@types/react": "^18",
"@types/react-dom": "^18"
}
}

next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
transpilePackages: ["framer-motion"],
};

export default nextConfig;

Variables d'environnement Vercel

À configurer sur le Dashboard Vercel :

Settings → Environment Variables :

NEXTAUTH_URL=https://land-job-platform.vercel.app
NEXTAUTH_SECRET=t9qetrHFnzyM7lzNpDMrDfu+na5pZ53jXONPshGGhFA=
DATABASE_URL=postgresql://neondb_owner:npg_so9E5pvMkXCD@ep-hidden-scene-ab18g15i-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require
NEXTAUTH_SESSION_STRATEGY=jwt
MAX_LOGIN_ATTEMPTS=5
CONFIRM_EMAIL=false

Settings → General :

- Root Directory : app

---

🎯 Checklist de Déploiement

Avant le Push

- Types React correspondants (^18 avec React 18.x)
- next.config.ts configuré avec transpilePackages
- Imports corrects (authOptions depuis @/lib/nextAuth)
- Types explicites dans Formik (as string[])
- Build local réussi (pnpm build)

Sur Vercel

- Root Directory = app
- Variables d'environnement configurées
- NEXTAUTH_URL pointe vers l'URL de production
- DATABASE_URL configuré

Après le Déploiement

- Vérifier l'URL de production
- Tester l'authentification
- Vérifier les animations Framer Motion

---

📚 Ressources Utiles

Framer Motion + Next.js 15 :

- https://github.com/vercel/next.js/discussions/72228
- https://github.com/framer/motion/issues/2854

TypeScript + Formik :

- Toujours typer explicitement les arrays vides : [] as Type[]

NextAuth Configuration :

- authOptions doit être exporté depuis un fichier centralisé (@/lib/nextAuth)
- Ne pas importer depuis les route handlers

---

🔧 Commandes Essentielles

# Build local

cd app
pnpm install
pnpm build

# Générer NEXTAUTH_SECRET

node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Git

git add .
git commit -m "Fix authOptions import and Framer Motion compatibility"  
 git push

---

Date : 2025-12-13
Stack : Next.js 15.3.6 + Framer Motion 12.23.26 + NextAuth 4.24.11
Plateforme : Vercel
