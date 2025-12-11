# 🔓 Activer manuellement un profil RH

**Contexte** : Par défaut, les profils RH créés ont `isActive: false` et nécessitent une validation admin. Le panel admin sera disponible à J7.

---

## ✅ MÉTHODE RECOMMANDÉE : Prisma Studio

### Étapes :

1. **Ouvrir Prisma Studio** (interface visuelle pour la DB) :
   ```bash
   pnpm prisma studio
   ```

2. **Dans le navigateur** (s'ouvre automatiquement à `http://localhost:5555`) :
   - Cliquer sur le modèle **RHProfile** dans la barre latérale
   - Trouver votre profil RH dans la liste
   - Cliquer sur la ligne du profil
   - Changer le champ **isActive** de `false` à `true`
   - Cliquer sur **"Save 1 change"** (bouton vert en haut à droite)

3. **Rafraîchir votre page** `/dashboard/rh` pour voir le changement

---

## 🛠️ MÉTHODE ALTERNATIVE 1 : Modifier l'API temporairement

Si vous voulez que tous les nouveaux profils RH soient automatiquement actifs :

### Fichier à modifier : `app/api/rh/route.ts`

**Ligne 48-54** (méthode POST) :
```typescript
// AVANT (isActive: false par défaut)
const rhProfile = await prisma.rhProfile.create({
  data: {
    userId,
    bio,
    expertise,
    priceRange,
    calendlyLink,
    isActive: false, // ❌ Nécessite validation admin
  },
});

// APRÈS (isActive: true par défaut)
const rhProfile = await prisma.rhProfile.create({
  data: {
    userId,
    bio,
    expertise,
    priceRange,
    calendlyLink,
    isActive: true, // ✅ Actif immédiatement
  },
});
```

⚠️ **Attention** : Cette modification affecte TOUS les nouveaux profils RH. À supprimer une fois le panel admin créé.

---

## 🛠️ MÉTHODE ALTERNATIVE 2 : SQL Direct

Si vous avez accès à votre base de données PostgreSQL :

```sql
-- Activer TOUS les profils RH
UPDATE "RHProfile" SET "isActive" = true;

-- Activer un profil RH spécifique (remplacer <user_email>)
UPDATE "RHProfile"
SET "isActive" = true
WHERE "userId" = (SELECT id FROM "User" WHERE email = '<user_email>');
```

---

## 🎯 Vérification

Après activation, vérifiez :
1. ✅ Le badge sur `/dashboard/rh` affiche "✓ Profil actif" (vert)
2. ✅ Votre profil apparaît dans le listing `/rh`
3. ✅ Les utilisateurs peuvent vous ajouter en favoris

---

## 📝 Note

Le panel admin (J7) permettra d'activer/désactiver les profils RH depuis l'interface web sans manipulation manuelle.
