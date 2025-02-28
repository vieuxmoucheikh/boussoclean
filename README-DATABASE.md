# Documentation Base de Données Boussoclean

Ce document décrit la structure et l'utilisation de la base de données PostgreSQL pour le site Boussoclean.

## Technologie

- **PostgreSQL** : Système de gestion de base de données relationnelle
- **pg** : Module Node.js pour interagir avec PostgreSQL via des requêtes SQL directes

## Structure de la Base de Données

### Tables Principales

- **User** : Utilisateurs du système
- **Account** : Comptes d'authentification liés aux utilisateurs
- **Session** : Sessions d'authentification des utilisateurs
- **Service** : Services proposés par l'entreprise
- **Reservation** : Réservations effectuées par les utilisateurs
- **ReservationItem** : Services inclus dans une réservation
- **Devis** : Devis générés pour les clients
- **DevisItem** : Services inclus dans un devis
- **Avis** : Avis clients sur les services
- **Contact** : Messages de contact envoyés via le formulaire

### Schéma

Le schéma complet de la base de données est défini dans le fichier `prisma/schema.sql`. Ce fichier contient toutes les définitions de tables, contraintes et relations.

## Configuration de la Base de Données

### Prérequis

1. PostgreSQL installé et en cours d'exécution
2. Une base de données créée pour l'application

### Variables d'Environnement

```
DATABASE_URL=postgresql://username:password@localhost:5432/boussoclean
```

### Initialisation de la Base de Données

Pour initialiser la base de données, exécutez les scripts SQL suivants :

1. Créez les tables avec `schema.sql` :
   ```bash
   psql -U username -d boussoclean -f prisma/schema.sql
   ```

2. Ajoutez les données initiales avec `seed.sql` :
   ```bash
   psql -U username -d boussoclean -f prisma/seed.sql
   ```

Alternativement, utilisez le script batch `update_db.bat` qui contient les instructions pour exécuter ces commandes.

## Accès à la Base de Données

### Utilitaire de Connexion

Le fichier `src/lib/db.ts` contient les fonctions utilitaires pour se connecter à la base de données et exécuter des requêtes SQL :

```typescript
import { Pool } from 'pg';

// Création du pool de connexions
const getPool = () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  return pool;
};

// Exécution d'une requête SQL
const query = async (text: string, params: any[] = []) => {
  const pool = getPool();
  try {
    return await pool.query(text, params);
  } catch (error) {
    console.error('Erreur lors de l'exécution de la requête SQL:', error);
    throw error;
  }
};

export { getPool, query };
```

### Utilisation dans les API Routes

Les routes API utilisent les fonctions `getPool` et `query` pour interagir avec la base de données :

```typescript
import { query } from '@/lib/db';

// Exemple de requête SELECT
const userSql = 'SELECT * FROM "User" WHERE email = $1';
const userResult = await query(userSql, [email]);
const user = userResult.rows[0];

// Exemple de requête INSERT
const insertSql = 'INSERT INTO "User" (id, name, email) VALUES ($1, $2, $3) RETURNING *';
const result = await query(insertSql, [id, name, email]);
```

## API Routes Implémentées

### Authentification
- `POST /api/auth/[...nextauth]` : Gestion de l'authentification via NextAuth.js

### Services
- `GET /api/services` : Récupération de tous les services
- `GET /api/services/[id]` : Récupération d'un service spécifique

### Réservations
- `GET /api/reservations` : Récupération des réservations
- `POST /api/reservations` : Création d'une nouvelle réservation
- `GET /api/reservations/[id]` : Récupération d'une réservation spécifique
- `PATCH /api/reservations/[id]` : Mise à jour d'une réservation
- `DELETE /api/reservations/[id]` : Suppression d'une réservation

### Calculateur de Prix
- `POST /api/calculateur` : Calcul du prix en fonction des services sélectionnés

### Avis
- `GET /api/avis` : Récupération des avis publiés
- `POST /api/avis` : Soumission d'un nouvel avis

### Contact
- `POST /api/contact` : Envoi d'un message via le formulaire de contact

### Utilisateurs
- `GET /api/user/reservations` : Récupération des réservations de l'utilisateur connecté
- `GET /api/user/reservations/[id]` : Récupération d'une réservation spécifique de l'utilisateur

### Administration
- `GET /api/admin/dashboard` : Statistiques du tableau de bord
- `GET /api/admin/services` : Gestion des services (admin)
- `POST /api/admin/services` : Création d'un nouveau service
- `GET /api/admin/services/[id]` : Détails d'un service
- `PATCH /api/admin/services/[id]` : Mise à jour d'un service
- `DELETE /api/admin/services/[id]` : Suppression d'un service
- `GET /api/admin/users` : Gestion des utilisateurs
- `POST /api/admin/users` : Création d'un nouvel utilisateur
- `GET /api/admin/users/[id]` : Détails d'un utilisateur
- `PATCH /api/admin/users/[id]` : Mise à jour d'un utilisateur
- `DELETE /api/admin/users/[id]` : Suppression d'un utilisateur
- `GET /api/admin/avis` : Gestion des avis
- `GET /api/admin/contact` : Gestion des messages de contact
- `GET /api/admin/contact/[id]` : Détails d'un message de contact
- `PATCH /api/admin/contact/[id]` : Mise à jour d'un message de contact
- `DELETE /api/admin/contact/[id]` : Suppression d'un message de contact

## Transactions

Pour les opérations qui nécessitent plusieurs requêtes atomiques, utilisez des transactions :

```typescript
import { getPool } from '@/lib/db';

const pool = getPool();
const client = await pool.connect();

try {
  // Démarrer la transaction
  await client.query('BEGIN');
  
  // Exécuter plusieurs requêtes
  await client.query('INSERT INTO...');
  await client.query('UPDATE...');
  
  // Valider la transaction
  await client.query('COMMIT');
} catch (error) {
  // Annuler la transaction en cas d'erreur
  await client.query('ROLLBACK');
  throw error;
} finally {
  // Libérer le client
  client.release();
}
```

## Modèles de Données

### User

```sql
CREATE TABLE "User" (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  emailVerified TIMESTAMP,
  image TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Reservation

```sql
CREATE TABLE "Reservation" (
  id TEXT PRIMARY KEY,
  date TIMESTAMP NOT NULL,
  statut TEXT NOT NULL,
  montantTotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  adresse TEXT NOT NULL,
  codePostal TEXT NOT NULL,
  ville TEXT NOT NULL,
  commentaire TEXT,
  userId TEXT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES "User"(id) ON DELETE CASCADE
);
```

## Requêtes Communes

### Récupérer les Réservations d'un Utilisateur

```sql
SELECT 
  r.*, 
  ri.id as item_id, ri.quantite, ri.prix, ri."serviceId",
  s.id as service_id, s.nom as service_nom
FROM "Reservation" r
LEFT JOIN "ReservationItem" ri ON r.id = ri."reservationId"
LEFT JOIN "Service" s ON ri."serviceId" = s.id
WHERE r."userId" = $1
ORDER BY r."createdAt" DESC;
```

### Créer une Nouvelle Réservation avec Services

```sql
-- 1. Insérer la réservation
INSERT INTO "Reservation" (
  id, date, statut, montantTotal, adresse, "codePostal", ville, commentaire, "userId"
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;

-- 2. Insérer les éléments de réservation
INSERT INTO "ReservationItem" (
  id, "reservationId", "serviceId", quantite, prix
)
VALUES ($1, $2, $3, $4, $5);

-- 3. Mettre à jour le montant total
UPDATE "Reservation"
SET "montantTotal" = $1
WHERE id = $2;
```

## Migration depuis Prisma

L'application a été migrée de Prisma ORM vers des requêtes SQL directes pour plus de flexibilité et de contrôle. Les avantages de cette approche incluent :

1. **Performance** : Optimisation des requêtes SQL spécifiques
2. **Flexibilité** : Contrôle total sur les requêtes et les transactions
3. **Transparence** : Visibilité complète des opérations de base de données

## Maintenance

### Sauvegardes

Pour sauvegarder la base de données :

```bash
pg_dump -U username -d boussoclean > backup.sql
```

### Restauration

Pour restaurer la base de données à partir d'une sauvegarde :

```bash
psql -U username -d boussoclean < backup.sql
```

## Dépannage

### Problèmes de Connexion

1. Vérifiez que PostgreSQL est en cours d'exécution
2. Vérifiez que la variable d'environnement `DATABASE_URL` est correctement configurée
3. Vérifiez que l'utilisateur a les permissions nécessaires

### Erreurs de Requête

Les erreurs de requête sont journalisées dans la console. Vérifiez :

1. La syntaxe SQL
2. Les types de données
3. Les contraintes de clé étrangère
