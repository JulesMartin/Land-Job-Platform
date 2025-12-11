# 🎯 GUIDE DE RÉFÉRENCE - LandJobPlatform

_Fichier de référence à consulter avant chaque étape de développement_

---

## 📌 VISION DU PROJET

**Nom** : LandJobPlatform
**Type** : Plateforme RH + Réservation externe (Calendly)
**Objectif MVP** : Annuaire de professionnels RH + Mise en relation simple

---

## ⚠️ PÉRIMÈTRE STRICT (À NE JAMAIS DÉPASSER)

### ✅ CE QU'ON FAIT

- Profils RH consultables (bio, expertise, prix, lien Calendly)
- Système d'authentification utilisateurs
- Listing RH avec filtres (expertise, prix)
- Page profil RH individuelle
- Embed Calendly pour réservation
- Dashboard RH (édition profil)
- Dashboard utilisateur (favoris + historique)
- Panel admin simple (activation profils RH)
- Log des consultations (ConsultationLog)

### ❌ CE QU'ON NE FAIT PAS

- ❌ Paiements (pas de Stripe)
- ❌ Commissions
- ❌ Calendrier interne (uniquement Calendly externe)
- ❌ Messagerie interne
- ❌ Système de notation/avis (hors MVP)

---

## 🛠️ STACK TECHNIQUE

### Framework & Langage

- **Next.js 15.3.3** (App Router compatible)
- **TypeScript 5.8.3**
- **React 18.3.1**

### Base de données

- **PostgreSQL** (Neon DB recommandé)
- **Prisma 6.9.0** (ORM)
- **@prisma/client 6.9.0**

### Styling

- **TailwindCSS**

### Authentification

- **NextAuth.js 4.24.11** (pas v5)
- **@next-auth/prisma-adapter 1.0.7**
- **bcryptjs 3.0.2** (hash passwords, compatible Windows)

### Validation & Formulaires

- **Formik 2.4.6**
- **Yup 1.6.1** (ou Zod 3.25.64)

### Email

- **Pas de gestion email dans le MVP** (pas de Nodemailer, pas de @react-email/components)

### Sécurité

- **react-google-recaptcha 3.1.0**
- **micromatch 4.0.8** (middleware patterns)

### Utilitaires

- **cookies-next 6.0.0**
- **react-hot-toast 2.5.2** (notifications)

### Package Manager

- **pnpm** (imposé)

---

## 🗄️ MODÈLES DE DONNÉES PRISMA

### Modèles NextAuth (obligatoires)

```prisma
- Account (OAuth providers)
- Session (si strategy = "database")
- VerificationToken (Magic Links, Email verification)
- User (core user model)
```

### Modèles Métier (à créer)

```prisma
- User (étendu)
  - id, name, email, emailVerified, password, image
  - invalid_login_attempts, lockedAt (account lockout)
  - createdAt, updatedAt

- RHProfile (nouveau modèle)
  - id, userId, bio, expertise[], priceRange
  - calendlyLink, isActive (admin approval)
  - createdAt, updatedAt

- ConsultationLog (tracking)
  - id, userId, rhProfileId, timestamp

- Favorite (optionnel)
  - id, userId, rhProfileId, createdAt

- Team (multi-tenant, si besoin)
  - id, name, slug, domain, defaultRole

- TeamMember
  - id, teamId, userId, role (OWNER/ADMIN/MEMBER)

- Invitation
  - id, teamId, email, token, expires, invitedBy
```

### Enums

```prisma
enum Role {
  ADMIN
  OWNER
  MEMBER
}

enum Expertise {
  RECRUITMENT
  TALENT_ACQUISITION
  HR_CONSULTING
  COACHING
  TRAINING
}
```

---

## 🔐 AUTHENTIFICATION - POINTS CLÉS

### Configuration .env requise

```bash
# NextAuth
NEXTAUTH_URL=http://localhost:4002
NEXTAUTH_SECRET=<générer avec: openssl rand -base64 32>
NEXTAUTH_SESSION_STRATEGY=jwt  # ou "database"

# Database
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DB_NAME

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@yourapp.com

# OAuth (optionnel)
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Security
CONFIRM_EMAIL=false  # true pour forcer confirmation email
MAX_LOGIN_ATTEMPTS=5
RECAPTCHA_SITE_KEY=...
RECAPTCHA_SECRET_KEY=...
```

### Providers à activer

- ✅ Credentials (email/password) - OBLIGATOIRE
- ✅ Magic Links (optionnel)
- ✅ OAuth GitHub/Google (optionnel)

### Sécurité implémentée

- ✅ bcrypt hash (12 rounds)
- ✅ Account lockout après 5 tentatives
- ✅ reCAPTCHA v2 sur login/signup
- ✅ CSRF tokens automatiques
- ✅ Email verification (optionnel)
- ✅ Security headers (CSP, etc.)

### Fichiers NextAuth essentiels

```
lib/
  ├── nextAuth.ts          # Configuration NextAuth
  ├── auth.ts              # hashPassword, verifyPassword
  ├── session.ts           # getSession helper
  ├── accountLock.ts       # Account lockout logic
  └── prisma.ts            # Prisma client singleton

pages/api/auth/
  ├── [...nextauth].ts     # NextAuth handler
  ├── join.ts              # Signup endpoint
  ├── forgot-password.ts   # Password reset request
  ├── reset-password.ts    # Password reset submit
  └── unlock-account.ts    # Account unlock

middleware.ts              # Route protection
```

---

## 📋 ROADMAP (7 JOURS)

### ✅ J3 - Modèle RH + API

- [ ] API POST /api/rh (créer profil RH)
- [ ] API PUT /api/rh/:id (éditer profil RH)
- [ ] API GET /api/rh (listing avec filtres)
- [ ] API GET /api/rh/:id (profil individuel)
- [ ] Formulaire "Devenir RH" (frontend)

### ✅ J4 - Page Listing RH

- [ ] Créer composant RHCard
- [ ] Page /rh avec listing
- [ ] Filtres (expertise, prix)
- [ ] Pagination (optionnel)
- [ ] Recherche par nom (optionnel)

### ✅ J5 - Page Profil RH + Calendly

- [ ] Page /rh/[id] (profil individuel)
- [ ] Embed Calendly avec lien dynamique
- [ ] Créer modèle ConsultationLog
- [ ] Logger chaque visite de profil RH
- [ ] Bouton "Ajouter aux favoris" (optionnel)

### ✅ J6 - Dashboards

- [ ] Dashboard RH (/dashboard/rh)
  - Éditer profil
  - Voir statistiques consultations
- [ ] Dashboard Utilisateur (/dashboard/user)
  - Historique consultations
  - Favoris RH

### ✅ J7 - Admin + Déploiement

- [ ] Panel admin (/admin)
  - Liste profils RH en attente
  - Bouton activer/désactiver
- [ ] Responsive mobile (TailwindCSS)
- [ ] Cleanup code
- [ ] Variables d'environnement Vercel
- [ ] Déploiement Vercel

---

## 🚀 COMMANDES UTILES

### Prisma

```bash
# Générer client Prisma (après modif schema)
pnpm prisma generate

# Push schema vers DB (dev uniquement)
pnpm prisma db push

# Créer migration (recommandé en prod)
pnpm prisma migrate dev --name nom_migration

# Ouvrir Prisma Studio (GUI database)
pnpm prisma studio

# Reset DB (⚠️ supprime données)
pnpm prisma migrate reset
```

### Next.js

```bash
# Dev server
pnpm dev

# Build production
pnpm build

# Start production
pnpm start
```

### Installation packages

```bash
# Toujours utiliser pnpm
pnpm add <package>
pnpm add -D <package>  # dev dependency
```

---

## 🎯 WORKFLOW DE DÉVELOPPEMENT

### Avant chaque feature

1. **Lire ce fichier** pour vérifier le périmètre
2. **Vérifier la roadmap** (quel jour ?)
3. **Checker le schéma Prisma** (modèles OK ?)
4. **Identifier les fichiers à créer/modifier**

### Pendant le développement

1. **Respecter le périmètre strict** (pas de feature hors scope)
2. **Utiliser pnpm** pour toute installation
3. **Tester au fur et à mesure** (ne pas accumuler)
4. **Logger les erreurs** (console.log / toast)

### Après chaque feature

1. **Tester manuellement**
2. **Vérifier responsive** (mobile/desktop)
3. **Commit Git** (messages clairs)
4. **Mettre à jour la roadmap** (cocher les tâches)

---

## ⚠️ PIÈGES À ÉVITER

### NextAuth

- ❌ Ne pas utiliser NextAuth v5 (prendre v4.24.11)
- ❌ Ne pas oublier `NEXTAUTH_SECRET` dans .env
- ❌ `allowDangerousEmailAccountLinking: true` = risque sécurité (désactiver si besoin)

### Prisma

- ❌ Toujours faire `pnpm prisma generate` après modif schema
- ❌ Ne pas commit `node_modules/` ni `.env`
- ❌ Utiliser `prisma db push` en dev, `prisma migrate` en prod

### Windows

- ✅ Utiliser `bcryptjs` (pas `bcrypt` natif)
- ✅ Utiliser pnpm (plus rapide que npm)

### Performance

- ❌ Ne pas fetch tous les RH sans pagination (si > 50)
- ❌ Ne pas oublier `@@index` dans Prisma (userId, etc.)

---

## 📊 ARCHITECTURE FICHIERS (À CRÉER)

```
LandJobPlatform/
├── prisma/
│   └── schema.prisma          # Schéma DB complet
├── lib/
│   ├── prisma.ts              # Client Prisma singleton
│   ├── nextAuth.ts            # Config NextAuth
│   ├── auth.ts                # hashPassword, verifyPassword
│   ├── session.ts             # getSession helper
│   └── accountLock.ts         # Account lockout
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth].ts
│   │   │   ├── join.ts
│   │   │   ├── forgot-password.ts
│   │   │   └── reset-password.ts
│   │   └── rh/
│   │       ├── index.ts       # GET /api/rh (list)
│   │       ├── [id].ts        # GET /api/rh/:id
│   │       └── create.ts      # POST /api/rh
│   ├── auth/
│   │   ├── login.tsx
│   │   └── join.tsx
│   ├── rh/
│   │   ├── index.tsx          # Listing RH
│   │   └── [id].tsx           # Profil RH
│   ├── dashboard/
│   │   ├── rh.tsx             # Dashboard RH
│   │   └── user.tsx           # Dashboard utilisateur
│   └── admin/
│       └── index.tsx          # Panel admin
├── components/
│   ├── RHCard.tsx             # Card profil RH
│   ├── Navbar.tsx             # Navigation
│   └── Layout.tsx             # Layout global
├── middleware.ts              # Protection routes
├── .env                       # Variables environnement
└── GUIDE_REFERENCE.md         # CE FICHIER
```

---

## 🎨 COMPOSANTS RÉUTILISABLES (À CRÉER)

### UI Components

- `<RHCard />` - Carte profil RH (listing)
- `<FilterBar />` - Filtres (expertise, prix)
- `<CalendlyEmbed />` - Embed Calendly
- `<DashboardLayout />` - Layout dashboard
- `<ProtectedRoute />` - HOC protection auth

### Form Components

- `<InputWithLabel />` - Input + label + error
- `<SelectField />` - Select dropdown
- `<TextareaField />` - Textarea
- `<Button />` - Bouton réutilisable

---

## 📝 CHECKLIST AVANT DÉPLOIEMENT

### Sécurité

- [ ] NEXTAUTH_SECRET généré (openssl rand -base64 32)
- [ ] Variables .env Vercel configurées
- [ ] reCAPTCHA activé (login + signup)
- [ ] Security headers activés (middleware)
- [ ] CONFIRM_EMAIL=true (si requis)

### Performance

- [ ] Images optimisées (Next.js Image)
- [ ] Pagination listing RH (si > 50)
- [ ] Index Prisma sur userId, rhProfileId
- [ ] ISR ou SSG pour pages statiques

### Fonctionnel

- [ ] Tous les flows testés (signup, login, logout)
- [ ] Dashboard RH fonctionnel
- [ ] Dashboard utilisateur fonctionnel
- [ ] Admin panel activation profils OK
- [ ] Calendly embed fonctionne
- [ ] Logs consultation stockés

### UX

- [ ] Responsive mobile/desktop
- [ ] Messages d'erreur clairs
- [ ] Loading states (boutons, formulaires)
- [ ] Toast notifications (succès/erreur)

---

## 🔗 RESSOURCES

### Documentation

- Next.js : https://nextjs.org/docs
- NextAuth.js : https://next-auth.js.org/
- Prisma : https://www.prisma.io/docs
- Tailwind CSS : https://tailwindcss.com/docs

### Outils

- Neon DB : https://neon.tech/
- Vercel : https://vercel.com/
- Calendly : https://calendly.com/

---

**🎯 RÈGLE D'OR** : Avant chaque nouvelle tâche, relire ce fichier pour rester aligné sur le périmètre et la roadmap.
