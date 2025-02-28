# Système d'Authentification Boussoclean

Ce document décrit le système d'authentification implémenté pour le site Boussoclean.

## Technologies Utilisées

- **NextAuth.js** : Framework d'authentification pour Next.js
- **PostgreSQL** : Base de données pour stocker les utilisateurs et les sessions
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
- `src/lib/db.ts` : Utilitaires pour les requêtes SQL à la base de données
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
   - L'utilisateur et ses identifiants sont stockés dans la base de données via des requêtes SQL

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

## Implémentation SQL

### Création d'un Utilisateur

```sql
-- Insérer un nouvel utilisateur
INSERT INTO "User" (id, name, email, "createdAt", "updatedAt")
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- Insérer les informations d'authentification
INSERT INTO "Account" (
  id, "userId", type, provider, "providerAccountId", 
  access_token, refresh_token, expires_at, token_type, scope, 
  id_token, session_state
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
```

### Vérification d'un Utilisateur

```sql
-- Récupérer un utilisateur par email
SELECT u.*, a.id as account_id, a.access_token 
FROM "User" u
LEFT JOIN "Account" a ON u.id = a."userId" AND a.provider = 'credentials'
WHERE u.email = $1;
```

### Mise à Jour du Profil Utilisateur

```sql
-- Mettre à jour le nom de l'utilisateur
UPDATE "User"
SET name = $1
WHERE id = $2
RETURNING id, name, email;

-- Mettre à jour le mot de passe
UPDATE "Account"
SET access_token = $1
WHERE id = $2;
```

## Sécurité

- Les mots de passe sont hachés avec bcrypt
- Les sessions sont gérées via JWT avec une durée de validité de 30 jours
- Les routes sensibles sont protégées par middleware
- Les données sensibles ne sont jamais exposées au client
- Les requêtes SQL utilisent des paramètres préparés pour éviter les injections SQL

## Variables d'Environnement Requises

```
DATABASE_URL=postgresql://username:password@localhost:5432/boussoclean
NEXTAUTH_SECRET=votre_secret_nextauth
NEXTAUTH_URL=http://localhost:3000
```

## Extension du Système

Pour ajouter de nouvelles fonctionnalités d'authentification :

1. **Nouveaux Providers** : Ajouter des providers dans `src/lib/auth.ts`
2. **Nouvelles Routes Protégées** : Ajouter les chemins dans `src/middleware.ts`
3. **Nouvelles Permissions** : Implémenter un système de rôles dans la base de données et adapter le middleware
