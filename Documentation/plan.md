# 📋 PLAN DE DÉVELOPPEMENT - LandJobPlatform

## État actuel du projet

✅ **Infrastructure de base**
- Next.js 15.3.6 installé et configuré
- TailwindCSS configuré
- TypeScript configuré
- Prisma 6.9.0 installé

✅ **Base de données**
- Schéma Prisma complet avec tous les modèles
- RHProfile, ConsultationLog, Favorite créés
- Enums Role et Expertise définis
- NextAuth models (User, Account, Session, VerificationToken)

✅ **Authentification (NextAuth)**
- Configuration NextAuth (lib/nextAuth.ts)
- Helpers auth (lib/auth.ts, lib/session.ts)
- Account lockout (lib/accountLock.ts)
- API auth/[...nextauth] et auth/join

---

## 📅 ROADMAP D'IMPLÉMENTATION

### ✅ J1-J2 : Setup initial (COMPLÉTÉ)
- [x] Initialisation Next.js
- [x] Configuration Prisma
- [x] Modèles de données
- [x] Authentification NextAuth

### ✅ J3 : Modèle RH + API (COMPLÉTÉ)

**Backend (APIs)**
- [x] API GET /api/rh (listing avec filtres)
- [x] API GET /api/rh/[id] (profil individuel)
- [x] API POST /api/rh (créer profil RH)
- [x] API PUT /api/rh/[id] (éditer profil RH)
- [x] API DELETE /api/rh/[id] (supprimer profil - bonus)

**Frontend**
- [x] Formulaire "Devenir RH" (/rh/create)
- [x] Validation Formik + Yup
- [x] Lien "Devenir RH" dans la navbar

**Base de données**
- [x] Client Prisma généré
- [x] Schéma poussé vers la DB

---

### ✅ J4 : Page Listing RH (COMPLÉTÉ)
- [x] Composant RHCard
- [x] Page /rh (listing)
- [x] Filtres (expertise, prix)
- [x] Recherche par nom

---

### ✅ J5 : Page Profil RH + Calendly (COMPLÉTÉ)
- [x] Page /rh/[id] (profil individuel)
- [x] Embed Calendly
- [x] Logger consultations (ConsultationLog)
- [x] Bouton favoris (optionnel)

---

### ✅ J6 : Dashboards (COMPLÉTÉ)

**Backend (APIs)**
- [x] API GET /api/dashboard/rh/stats (statistiques RH)
- [x] API GET /api/dashboard/user/consultations (historique utilisateur)

**Frontend**
- [x] Page /dashboard (redirection automatique)
- [x] Dashboard RH (/dashboard/rh)
  - Éditer profil
  - Statistiques consultations
  - Consultations récentes
- [x] Dashboard Utilisateur (/dashboard/user)
  - Historique consultations
  - Favoris RH
  - Retirer favoris

---

### 🔄 J7 : Admin + Déploiement (PROCHAINE ÉTAPE)
- [ ] Panel admin (/admin)
  - Liste profils RH en attente
  - Activer/désactiver profils
- [ ] Responsive mobile
- [ ] Cleanup code
- [ ] Déploiement Vercel

---

## 🎯 PROCHAINES ÉTAPES (J7)

1. Créer le Panel Admin (/admin)
   - Liste des profils RH en attente de validation
   - Bouton activer/désactiver profils
   - Filtres et recherche
2. Optimisations finales
   - Vérifier responsive mobile
   - Cleanup code
   - Préparation déploiement Vercel

---

## 📝 NOTES
- Utiliser pnpm pour toute installation
- Toujours référencer GUIDE_REFERENCE.md avant chaque feature
- Respecter strictement le périmètre MVP (pas de features hors scope)
