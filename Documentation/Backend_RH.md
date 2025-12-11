📊 Résumé de ce qui a été créé :

Backend (APIs) ✅

- GET /api/rh - Liste tous les profils RH avec filtres
  (expertise, prix, recherche, statut actif)
- GET /api/rh/[id] - Récupère un profil RH spécifique avec
  compteurs (consultations, favoris)
- POST /api/rh - Crée un nouveau profil RH (statut inactif par  
  défaut, nécessite validation admin)
- PUT /api/rh/[id] - Met à jour un profil RH existant
- DELETE /api/rh/[id] - Supprime un profil RH (bonus)
