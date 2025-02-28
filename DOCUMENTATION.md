# Documentation du Projet Boussoclean

Ce document détaille la structure, les fonctionnalités et les étapes d'implémentation du site web Boussoclean, une entreprise de nettoyage basée à Paris et en Île-de-France.

## Stack Technique
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- PostgreSQL (requêtes SQL directes)
- NextAuth.js
- Vercel (hébergement)

## Structure du Projet
```
boussoclean/
├── prisma/
│   ├── schema.sql         # Schéma SQL de la base de données
│   └── seed.sql           # Données initiales pour la base de données
├── public/                # Fichiers statiques (images, etc.)
├── src/
│   ├── app/               # Pages de l'application (Next.js App Router)
│   │   ├── page.tsx       # Page d'accueil
│   │   ├── services/      # Page des services
│   │   │   └── [id]/      # Page détaillée d'un service
│   │   ├── devis/         # Page de demande de devis
│   │   ├── auth/          # Pages d'authentification
│   │   │   ├── signin/    # Connexion
│   │   │   └── signup/    # Inscription
│   │   ├── dashboard/     # Espace client
│   │   │   ├── profile/   # Profil utilisateur
│   │   │   └── reservations/ # Gestion des réservations
│   │   ├── api/           # Routes API
│   │   │   ├── auth/      # API d'authentification
│   │   │   ├── services/  # API des services
│   │   │   ├── user/      # API utilisateur
│   │   │   └── reservations/ # API des réservations
│   ├── components/        # Composants réutilisables
│   │   ├── ui/            # Composants UI de base
│   │   ├── layout/        # Composants de mise en page
│   │   └── forms/         # Formulaires
│   └── lib/               # Utilitaires et fonctions
│       ├── db.ts          # Utilitaires pour les requêtes SQL
│       └── auth.ts        # Configuration de NextAuth.js
├── .env.local             # Variables d'environnement (à créer)
├── README.md              # Documentation générale
├── README-AUTH.md         # Documentation d'authentification
└── README-DATABASE.md     # Documentation de la base de données
```

## Base de Données

### Structure

La base de données PostgreSQL comprend les tables suivantes :

- **User** : Utilisateurs du système
- **Account** : Comptes d'authentification liés aux utilisateurs
- **Session** : Sessions utilisateur
- **VerificationToken** : Jetons de vérification pour la réinitialisation de mot de passe
- **Service** : Services proposés par l'entreprise
- **Reservation** : Réservations effectuées par les utilisateurs
- **ReservationItem** : Services inclus dans une réservation
- **Devis** : Devis générés pour les clients
- **DevisItem** : Services inclus dans un devis

### Connexion à la Base de Données

L'application utilise le module `pg` pour se connecter à PostgreSQL et exécuter des requêtes SQL directes :

```typescript
// src/lib/db.ts
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

### Exemples de Requêtes SQL

#### Récupération des Services

```sql
SELECT * FROM "Service" WHERE categorie = $1 ORDER BY nom ASC;
```

#### Création d'une Réservation

```sql
-- Dans une transaction
BEGIN;

-- Insérer la réservation
INSERT INTO "Reservation" (
  id, date, statut, montantTotal, adresse, "codePostal", ville, commentaire, "userId"
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;

-- Insérer les éléments de réservation
INSERT INTO "ReservationItem" (
  id, "reservationId", "serviceId", quantite, prix
)
VALUES ($1, $2, $3, $4, $5);

-- Mettre à jour le montant total
UPDATE "Reservation"
SET "montantTotal" = $1
WHERE id = $2;

COMMIT;
```

## Authentification

Le système d'authentification utilise NextAuth.js avec un adaptateur personnalisé pour PostgreSQL.

### Configuration

```typescript
// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { query } from './db';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Récupérer l'utilisateur par email
        const userSql = `
          SELECT u.*, a.id as account_id, a.access_token 
          FROM "User" u
          LEFT JOIN "Account" a ON u.id = a."userId" AND a.provider = 'credentials'
          WHERE u.email = $1
        `;
        
        const userResult = await query(userSql, [credentials.email]);
        
        if (userResult.rows.length === 0) {
          return null;
        }
        
        const user = userResult.rows[0];
        
        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(
          credentials.password, 
          user.access_token || ''
        );
        
        if (!isPasswordValid) {
          return null;
        }
        
        return {
          id: user.id,
          name: user.name,
          email: user.email
        };
      }
    })
  ],
  // Configuration supplémentaire...
};
```

## API Routes

### Services API

```typescript
// src/app/api/services/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let servicesSql = 'SELECT * FROM "Service"';
    const params: any[] = [];
    
    if (category) {
      servicesSql += ' WHERE categorie = $1';
      params.push(category);
    }
    
    servicesSql += ' ORDER BY nom ASC';
    
    const servicesResult = await query(servicesSql, params);
    return NextResponse.json(servicesResult.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des services' }, { status: 500 });
  }
}
```

### Réservations API

```typescript
// src/app/api/user/reservations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    
    const userEmail = session.user.email;
    
    if (!userEmail) {
      return NextResponse.json({ error: 'Email utilisateur non trouvé' }, { status: 400 });
    }
    
    // Récupérer l'ID de l'utilisateur
    const userSql = 'SELECT id FROM "User" WHERE email = $1';
    const userResult = await query(userSql, [userEmail]);
    
    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    const userId = userResult.rows[0].id;
    
    // Récupérer les réservations de l'utilisateur avec les services associés
    const reservationsSql = `
      SELECT 
        r.*, 
        ri.id as item_id, ri.quantite, ri.prix, ri."serviceId",
        s.id as service_id, s.nom as service_nom
      FROM "Reservation" r
      LEFT JOIN "ReservationItem" ri ON r.id = ri."reservationId"
      LEFT JOIN "Service" s ON ri."serviceId" = s.id
      WHERE r."userId" = $1
      ORDER BY r."createdAt" DESC
    `;
    
    const reservationsResult = await query(reservationsSql, [userId]);
    
    // Traiter les résultats pour regrouper par réservation
    const reservationsMap = new Map();
    
    // Logique de traitement des résultats...
    
    return NextResponse.json(Array.from(reservationsMap.values()));
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des réservations' }, { status: 500 });
  }
}
```

## Configuration du Projet

### Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```
DATABASE_URL=postgresql://username:password@localhost:5432/boussoclean
NEXTAUTH_SECRET=votre_secret_nextauth
NEXTAUTH_URL=http://localhost:3000
```

### Installation et Démarrage

1. Clonez le dépôt
2. Installez les dépendances : `npm install`
3. Configurez la base de données PostgreSQL
4. Exécutez les scripts SQL pour initialiser la base de données :
   ```bash
   psql -U username -d boussoclean -f prisma/schema.sql
   psql -U username -d boussoclean -f prisma/seed.sql
   ```
5. Démarrez le serveur de développement : `npm run dev`

## Déploiement

Le projet est configuré pour être déployé sur Vercel. Assurez-vous de configurer les variables d'environnement sur la plateforme Vercel.

## Ressources Supplémentaires

- [README.md](./README.md) - Documentation générale du projet
- [README-AUTH.md](./README-AUTH.md) - Documentation détaillée du système d'authentification
- [README-DATABASE.md](./README-DATABASE.md) - Documentation détaillée de la base de données
