# Système d'Authentification Boussoclean

Ce document décrit le système d'authentification implémenté pour le site Boussoclean.

## Technologies Utilisées

- **NextAuth.js** : Framework d'authentification pour Next.js
- **Prisma** : ORM pour interagir avec la base de données
- **bcrypt** : Bibliothèque pour le hachage des mots de passe

## Fonctionnalités

### Authentification

- Connexion par email/mot de passe
- Enregistrement de nouveaux utilisateurs
- Gestion des sessions avec JWT
- Protection des routes privées via middleware

### Gestion des Utilisateurs

- Profil utilisateur modifiable
- Changement de mot de passe
- Déconnexion

## Structure du Code

### Composants Principaux

- `src/lib/auth.ts` : Configuration de NextAuth.js
- `src/middleware.ts` : Middleware pour protéger les routes
- `src/app/api/auth/register/route.ts` : API pour l'enregistrement des utilisateurs
- `src/app/api/user/profile/route.ts` : API pour la gestion du profil utilisateur
- `src/hooks/useAuth.ts` : Hook personnalisé pour la gestion de l'authentification

### Pages d'Authentification

- `/auth/signin` : Page de connexion
- `/auth/signup` : Page d'inscription
- `/auth/signout` : Page de déconnexion
- `/auth/error` : Page d'erreur d'authentification

### Pages Protégées

- `/dashboard` : Tableau de bord utilisateur
- `/dashboard/profile` : Gestion du profil
- `/dashboard/reservations/[id]` : Détails d'une réservation

## Flux d'Authentification

1. **Inscription** :
   - L'utilisateur remplit le formulaire d'inscription
   - Le mot de passe est haché avec bcrypt
   - L'utilisateur et ses identifiants sont stockés dans la base de données

2. **Connexion** :
   - L'utilisateur entre son email et son mot de passe
   - Le mot de passe est vérifié avec bcrypt
   - Une session JWT est créée et stockée dans un cookie

3. **Protection des Routes** :
   - Le middleware vérifie la présence d'une session valide
   - Si l'utilisateur n'est pas authentifié, il est redirigé vers la page de connexion

4. **Déconnexion** :
   - La session est détruite
   - L'utilisateur est redirigé vers la page d'accueil

## Sécurité

- Les mots de passe sont hachés avec bcrypt
- Les sessions sont gérées via JWT avec une durée de validité de 30 jours
- Les routes sensibles sont protégées par middleware
- Les données sensibles ne sont jamais exposées au client

## Variables d'Environnement Requises

```
DATABASE_URL=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...
```

## Extension du Système

Pour ajouter de nouvelles fonctionnalités d'authentification :

1. **Nouveaux Providers** : Ajouter des providers dans `src/lib/auth.ts`
2. **Nouvelles Routes Protégées** : Ajouter les chemins dans `src/middleware.ts`
3. **Nouvelles Permissions** : Implémenter un système de rôles dans la base de données et adapter le middleware
