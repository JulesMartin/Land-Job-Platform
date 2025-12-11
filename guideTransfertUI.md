📋 RÉSUMÉ DU PROJET - UI_LandJob

Vue d'ensemble

my-better-t-app est une application Next.js moderne pour Evoke HR &  
 Immigration, une entreprise de conseil RH et services d'immigration au  
 Canada (Chilliwack, BC). Le site présente une interface utilisateur  
 sophistiquée avec des animations et un design bicolore unique.

---

🎨 Design & UX

Palette de couleurs principale

- Primary Dark Green: #0d4d4d (header, titres)
- Light Green: #c9d5c0 (accents chercheurs d'emploi)
- Golden Yellow: #ffd700 (CTA, accents recruteurs)
- Background: #f5f1e8 (header nav)
- Gray 50: Fond général

Fonctionnalités UI clés

1. Hero Section


    - Design bicolore split avec overlay
    - Image de fond professionnelle
    - Badge avec emoji 🍁
    - CTA proéminent

2. Split Toggle Section (composant signature)


    - Deux panneaux interactifs (Chercheurs d'emploi / Recruteurs)
    - Animation smooth avec Framer Motion
    - Expansion verticale des contenus
    - Auto-scroll lors du clic

3. Feature Cards (5 cartes)


    - Texte vertical sur hover
    - Animations de scale et shadow
    - Couleurs distinctives par carte
    - SVG icons

---

🛠 Stack Technique

Core

- Framework: Next.js 16.0.7 (App Router)
- React: 19.1.2
- TypeScript: 5.x
- Build Tool: Turborepo (monorepo)
- Package Manager: pnpm 10.24.0

Styling

- TailwindCSS: v4.1.10 avec @tailwindcss/postcss
- Animations: Framer Motion 12.23.26
- Animation Library: tw-animate-css 1.3.4
- Utilities: clsx, tailwind-merge, class-variance-authority

UI Components

- shadcn/ui: Composants réutilisables
  - Button, Card, Input, Label, Checkbox
  - Dropdown Menu, Skeleton
  - Sonner (toasts)
- Icons: Lucide React 0.546.0
- Theme: next-themes 0.4.6

State Management

- Forms: @tanstack/react-form 1.12.3
- Data Fetching: @tanstack/react-query 5.85.5

---

📁 Structure du Projet

my-better-t-app/
├── apps/
│ └── web/ # Application Next.js principale
│ ├── src/
│ │ ├── app/
│ │ │ ├── layout.tsx # Layout racine
│ │ │ └── page.tsx # Page d'accueil
│ │ ├── components/
│ │ │ ├── ui/ # Composants shadcn/ui
│ │ │ ├── header.tsx
│ │ │ ├── footer.tsx
│ │ │ ├── providers.tsx
│ │ │ └── ...
│ │ ├── lib/
│ │ │ └── utils.ts
│ │ └── index.css # Styles globaux + tokens
│ ├── public/
│ │ └── images/
│ │ └── hero-professional.webp
│ ├── package.json
│ ├── tsconfig.json
│ └── next.config.ts
├── package.json # Root package.json
├── pnpm-workspace.yaml
└── turbo.json

---

🔄 GUIDE DE TRANSFERT D'UI

Prérequis dans le projet cible

Avant de transférer les fichiers, assurez-vous que votre projet cible  
 a :

1. Dépendances requises

# Core dependencies

pnpm add next@^16.0.7 react@19.1.2 react-dom@19.1.2

# Styling

pnpm add tailwindcss@^4.1.10 @tailwindcss/postcss@^4.1.10
pnpm add tw-animate-css@^1.3.4
pnpm add clsx@^2.1.1 tailwind-merge@^3.3.1
pnpm add class-variance-authority@^0.7.1

# UI & Animations

pnpm add framer-motion@^12.23.26
pnpm add lucide-react@^0.546.0
pnpm add next-themes@^0.4.6
pnpm add sonner@^2.0.5

# Forms & State (optionnel si vous utilisez ces fonctionnalités)

pnpm add @tanstack/react-form@^1.12.3
pnpm add @tanstack/react-query@^5.85.5

# Dev dependencies

pnpm add -D typescript@^5
pnpm add -D @types/node@^20
pnpm add -D @types/react@19.2.2
pnpm add -D @types/react-dom@19.2.2

2. Configuration TypeScript

Le projet utilise TypeScript 5 avec une configuration stricte.

---

Étapes de transfert

ÉTAPE 1: Copier les styles globaux

1. Copiez apps/web/src/index.css vers votre projet
2. Importez-le dans votre layout.tsx ou \_app.tsx
3. Vérifiez que TailwindCSS v4 est correctement configuré

⚠️ IMPORTANT: Le fichier index.css contient :

- Les imports Tailwind v4
- Les variables CSS (design tokens) en oklch
- Le thème dark/light complet
- Les animations personnalisées

ÉTAPE 2: Copier les utilitaires

1. Copiez apps/web/src/lib/utils.ts
2. Assurez-vous que le path alias @/lib/utils fonctionne dans votre  
   tsconfig.json

ÉTAPE 3: Copier les composants UI shadcn/ui

Copiez tous les fichiers de apps/web/src/components/ui/ :

- button.tsx
- card.tsx
- checkbox.tsx
- dropdown-menu.tsx
- input.tsx
- label.tsx
- skeleton.tsx
- sonner.tsx
- split-toggle-section.tsx ⭐ (composant signature)

ÉTAPE 4: Copier les composants de layout

1. header.tsx - Navigation sticky avec logo
2. footer.tsx - Footer du site
3. providers.tsx - Providers React (theme, toasts)
4. theme-provider.tsx - Gestion du thème dark/light

ÉTAPE 5: Copier les assets

1. Créez le dossier public/images/
2. Copiez hero-professional.webp
3. Ajoutez vos propres images si nécessaire

ÉTAPE 6: Adapter le layout

1. Copiez apps/web/src/app/layout.tsx ou adaptez votre layout existant
2. Ajoutez le Header et Footer
3. Encapsulez avec <Providers>

ÉTAPE 7: Copier la page d'accueil (optionnel)

Si vous voulez reproduire exactement la même UI :

- Copiez apps/web/src/app/page.tsx
- Adaptez le contenu et les textes

---

Adaptation du code

Path Aliases

Assurez-vous que votre tsconfig.json contient :

{
"compilerOptions": {
"paths": {
"@/_": ["./src/_"]
}
}
}

Fonts

Le projet utilise les polices Google :

- Geist (variable: --font-geist-sans)
- Geist Mono (variable: --font-geist-mono)

Elles sont chargées dans layout.tsx via next/font/google.

Couleurs personnalisées

Si vous devez modifier les couleurs, éditez les variables CSS dans  
 index.css :

- Section :root pour le thème clair
- Section .dark pour le thème sombre

---

Vérifications post-transfert

✅ Checklist:

1. Toutes les dépendances npm sont installées
2. Le fichier index.css est importé
3. Les composants UI s'affichent correctement
4. Le Header est sticky en haut
5. Le thème dark/light fonctionne
6. Les animations Framer Motion fonctionnent
7. La Split Toggle Section s'anime correctement
8. Les images s'affichent
9. Aucune erreur TypeScript
10. Le build Next.js passe sans erreurs

---

Commandes utiles

# Développement

pnpm dev

# Build de production

pnpm build

# Vérification TypeScript

pnpm check-types

---

📦 LISTE COMPLÈTE DES FICHIERS À TRANSFÉRER

🎯 Fichiers essentiels (MUST HAVE)

Configuration & Styles

✅ apps/web/src/index.css
✅ apps/web/package.json (pour référence des dépendances)

Utilitaires

✅ apps/web/src/lib/utils.ts

Composants UI (shadcn/ui + custom)

✅ apps/web/src/components/ui/button.tsx
✅ apps/web/src/components/ui/card.tsx
✅ apps/web/src/components/ui/checkbox.tsx
✅ apps/web/src/components/ui/dropdown-menu.tsx
✅ apps/web/src/components/ui/input.tsx
✅ apps/web/src/components/ui/label.tsx
✅ apps/web/src/components/ui/skeleton.tsx
✅ apps/web/src/components/ui/sonner.tsx
⭐ apps/web/src/components/ui/split-toggle-section.tsx (COMPOSANT
SIGNATURE)

Composants de layout

✅ apps/web/src/components/header.tsx
✅ apps/web/src/components/footer.tsx
✅ apps/web/src/components/providers.tsx
✅ apps/web/src/components/theme-provider.tsx

Pages & Layouts

✅ apps/web/src/app/layout.tsx
✅ apps/web/src/app/page.tsx

Assets

✅ apps/web/public/images/hero-professional.webp

---

📋 Fichiers optionnels (selon vos besoins)

Composants additionnels (si présents dans votre exploration)

⚪ apps/web/src/components/loader.tsx
⚪ apps/web/src/components/mode-toggle.tsx
⚪ apps/web/src/components/split-toggle-example.tsx

Configuration (pour référence)

⚪ apps/web/tsconfig.json
⚪ apps/web/next.config.ts
⚪ turbo.json (si vous utilisez Turborepo)
⚪ pnpm-workspace.yaml (si monorepo)

---

📊 Résumé quantitatif

- Total fichiers essentiels: ~18 fichiers
- Total avec optionnels: ~22 fichiers
- Dépendances npm: ~15 packages principaux
- Taille estimée: ~500 KB (sans node_modules)

---

💡 Conseils finaux

1. Procédez étape par étape : Ne copiez pas tout d'un coup
2. Testez après chaque étape : Vérifiez que tout fonctionne
3. Adaptez le contenu : Les textes sont en français et spécifiques à  
   Evoke HR
4. Personnalisez les couleurs : Modifiez les variables CSS selon votre  
   brand
5. Optimisez les images : hero-professional.webp fait 182KB, optimisez  
   si nécessaire

---

● Voilà ! J'ai créé un guide complet pour vous.

📌 Ce que vous avez maintenant :

1. Résumé détaillé du projet - Architecture, technologies, design
   system
2. Guide de transfert étape par étape - Avec les commandes pnpm et les  
   vérifications
3. Liste complète des fichiers - Organisée par priorité (essentiels vs  
   optionnels)

🎯 Points clés à retenir :

- 18 fichiers essentiels à transférer minimum
- Le composant SplitToggleSection est la pièce maîtresse de l'UI
- Le design system utilise oklch pour les couleurs (moderne et
  performant)
- Tout fonctionne avec Next.js 16 et React 19
- Framer Motion gère les animations complexes

Vous pouvez copier-coller ce guide complet dans Claude Code sur votre  
 autre projet pour lui demander de reproduire l'UI !
