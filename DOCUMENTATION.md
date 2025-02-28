# Documentation du Projet Boussoclean

Ce document détaille la structure, les fonctionnalités et les étapes d'implémentation du site web Boussoclean, une entreprise de nettoyage basée à Paris et en Île-de-France.

## Stack Technique
- Next.js (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (PostgreSQL)
- NextAuth.js (avec adaptateur Supabase)
- Prisma ORM
- Vercel (hébergement)
- GitHub (contrôle de version)

## Structure du Projet
```
boussoclean/
├── prisma/
│   └── schema.prisma      # Schéma de la base de données
├── public/                # Fichiers statiques (images, etc.)
├── src/
│   ├── app/               # Pages de l'application (Next.js App Router)
│   │   ├── page.tsx       # Page d'accueil
│   │   ├── services/      # Page des services
│   │   ├── tarifs/        # Page des tarifs avec calculateur
│   │   ├── realisations/  # Galerie de réalisations
│   │   ├── avis/          # Avis clients
│   │   ├── a-propos/      # À propos de l'entreprise
│   │   ├── contact/       # Page de contact et devis
│   │   └── reservation/   # Système de réservation
│   ├── components/        # Composants réutilisables
│   │   ├── ui/            # Composants UI de base (shadcn/ui)
│   │   ├── layout/        # Composants de mise en page
│   │   ├── forms/         # Formulaires
│   │   ├── calculateur/   # Calculateur de tarifs
│   │   ├── galerie/       # Composants pour la galerie
│   │   └── chatbot/       # Chatbot intégré
│   └── lib/               # Utilitaires et fonctions
│       ├── db.ts          # Configuration de Prisma
│       ├── supabase.ts    # Configuration de Supabase
│       └── auth.ts        # Configuration de NextAuth.js
└── .env                   # Variables d'environnement (à créer)
```

## Étapes d'Implémentation

### 1. Préparation de l'Environnement (FAIT)
- [x] Création du projet Next.js avec TypeScript et Tailwind CSS
- [x] Installation des dépendances principales
- [x] Création du schéma Prisma
- [x] Configuration de Git et GitHub
- [x] Configuration de Supabase
- [x] Configuration de NextAuth.js

### 2. Configuration du Projet (EN COURS)
- [x] Mise en place de la structure des dossiers
- [x] Configuration de Tailwind CSS
- [x] Configuration de l'environnement de développement
- [x] Création des variables d'environnement (.env)
- [ ] Migration du schéma Prisma vers Supabase
- [ ] Configuration complète de l'authentification avec NextAuth.js

## Configuration des Services

### GitHub
- [x] Initialisation du dépôt Git local
- [x] Création du dépôt GitHub distant
- [x] Premier commit et push
- [x] Configuration du .gitignore

### Supabase
- [x] Création du projet Supabase
- [x] Obtention des clés API et URL
- [x] Configuration des variables d'environnement
- [ ] Migration du schéma de base de données
- [ ] Configuration des politiques de sécurité RLS (Row Level Security)
- [ ] Configuration des buckets pour le stockage des images

### NextAuth.js
- [x] Installation et configuration de base
- [x] Intégration avec Prisma
- [x] Configuration des pages d'authentification
- [ ] Test complet du flux d'authentification
- [ ] Configuration des callbacks et des hooks
- [ ] Mise en place de la protection des routes

### Vercel
- [ ] Création du projet sur Vercel
- [ ] Configuration des variables d'environnement sur Vercel
- [ ] Premier déploiement
- [ ] Configuration du domaine personnalisé
- [ ] Mise en place des prévisualisations pour les pull requests

## Problèmes Connus et Solutions

### Problème de connexion Prisma à Supabase
Nous avons rencontré des difficultés lors de la migration du schéma Prisma vers la base de données Supabase. Les commandes `prisma db push` et `prisma migrate dev` semblent avoir des problèmes de connexion.

**Solution potentielle :**
1. Vérifier que le format de l'URL de connexion est correct
2. S'assurer que l'utilisateur PostgreSQL a les droits suffisants
3. Vérifier les règles de pare-feu de Supabase
4. Essayer d'utiliser l'interface SQL de Supabase pour créer manuellement les tables si nécessaire

## Prochaines Étapes

1. **Finaliser la Configuration de la Base de Données**
   - Résoudre les problèmes de migration Prisma
   - Créer les tables nécessaires dans Supabase
   - Configurer les relations entre les tables

2. **Compléter le Système d'Authentification**
   - Tester le flux complet d'inscription et de connexion
   - Implémenter la gestion des sessions
   - Ajouter la récupération de mot de passe

3. **Développer les Fonctionnalités Principales**
   - Finaliser le système de réservation
   - Implémenter le calculateur de tarifs
   - Créer la galerie de réalisations
   - Développer le système d'avis clients

4. **Déploiement et Tests**
   - Déployer sur Vercel
   - Effectuer des tests de performance
   - Tester sur différents appareils et navigateurs
   - Optimiser le SEO

## SQL pour Initialiser la Base de Données

```sql
-- Création des tables pour NextAuth
CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "name" TEXT,
  "email" TEXT,
  "emailVerified" TIMESTAMP(3),
  "image" TEXT,
  
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Account" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INTEGER,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT,
  
  CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Session" (
  "id" TEXT NOT NULL,
  "sessionToken" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL,
  
  CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "VerificationToken" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL,
  
  CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier", "token")
);

-- Création des tables pour l'application
CREATE TABLE "Service" (
  "id" TEXT NOT NULL,
  "nom" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "prix" DOUBLE PRECISION NOT NULL,
  "unite" TEXT,
  "image" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  
  CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Devis" (
  "id" TEXT NOT NULL,
  "nom" TEXT NOT NULL,
  "prenom" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "telephone" TEXT NOT NULL,
  "adresse" TEXT,
  "codePostal" TEXT,
  "ville" TEXT,
  "datePreferee" TIMESTAMP(3),
  "message" TEXT,
  "statut" TEXT NOT NULL DEFAULT 'en_attente',
  "montantTotal" DOUBLE PRECISION,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "userId" TEXT,
  
  CONSTRAINT "Devis_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DevisItem" (
  "id" TEXT NOT NULL,
  "quantite" INTEGER NOT NULL,
  "prix" DOUBLE PRECISION NOT NULL,
  "devisId" TEXT NOT NULL,
  "serviceId" TEXT NOT NULL,
  
  CONSTRAINT "DevisItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Avis" (
  "id" TEXT NOT NULL,
  "note" INTEGER NOT NULL,
  "commentaire" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "userId" TEXT NOT NULL,
  
  CONSTRAINT "Avis_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Reservation" (
  "id" TEXT NOT NULL,
  "dateService" TIMESTAMP(3) NOT NULL,
  "heureService" TEXT NOT NULL,
  "statut" TEXT NOT NULL DEFAULT 'confirmee',
  "montantTotal" DOUBLE PRECISION NOT NULL,
  "paiementStatus" TEXT NOT NULL DEFAULT 'en_attente',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "userId" TEXT NOT NULL,
  
  CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ReservationItem" (
  "id" TEXT NOT NULL,
  "quantite" INTEGER NOT NULL,
  "prix" DOUBLE PRECISION NOT NULL,
  "reservationId" TEXT NOT NULL,
  "serviceId" TEXT NOT NULL,
  
  CONSTRAINT "ReservationItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Realisation" (
  "id" TEXT NOT NULL,
  "titre" TEXT NOT NULL,
  "description" TEXT,
  "imageAvant" TEXT NOT NULL,
  "imageApres" TEXT NOT NULL,
  "categorie" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT "Realisation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Contact" (
  "id" TEXT NOT NULL,
  "nom" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "telephone" TEXT,
  "message" TEXT NOT NULL,
  "lu" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- Ajout des contraintes de clé étrangère
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Devis" ADD CONSTRAINT "Devis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "DevisItem" ADD CONSTRAINT "DevisItem_devisId_fkey" FOREIGN KEY ("devisId") REFERENCES "Devis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DevisItem" ADD CONSTRAINT "DevisItem_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ReservationItem" ADD CONSTRAINT "ReservationItem_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReservationItem" ADD CONSTRAINT "ReservationItem_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Création des index
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- Insertion des services de base
INSERT INTO "Service" ("id", "nom", "description", "prix", "unite", "image", "createdAt", "updatedAt")
VALUES 
  ('srv_canape', 'Nettoyage de Canapé', 'Nettoyage professionnel et écologique de canapés avec injection-extraction pour éliminer taches et acariens.', 50.00, 'par place', '/images/services/canape.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  
  ('srv_matelas', 'Nettoyage de Matelas', 'Désinfection et nettoyage en profondeur de matelas pour éliminer acariens, bactéries et allergènes.', 40.00, 'par matelas', '/images/services/matelas.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  
  ('srv_tapis', 'Nettoyage de Tapis et Moquettes', 'Traitement professionnel de tapis et moquettes avec shampooing écologique et extraction.', 12.00, 'par m²', '/images/services/tapis.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  
  ('srv_voiture', 'Nettoyage Intérieur Voiture', 'Nettoyage complet des sièges, moquettes et surfaces intérieures de votre véhicule.', 80.00, 'par véhicule', '/images/services/voiture.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  
  ('srv_mobilier', 'Nettoyage de Mobilier', 'Traitement et nettoyage de meubles rembourrés et autres mobiliers d''intérieur.', 35.00, 'par pièce', '/images/services/mobilier.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  
  ('srv_rideaux', 'Nettoyage de Rideaux et Stores', 'Nettoyage spécialisé pour rideaux et stores avec traitement anti-poussière.', 15.00, 'par m²', '/images/services/rideaux.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```

## Configuration des Variables d'Environnement

Le fichier `.env` à la racine du projet doit contenir les variables suivantes :

```
# Prisma
DATABASE_URL=postgresql://postgres:[YOUR_DB_PASSWORD]@db.rebtybwqfrgllopaiyes.supabase.co:5432/postgres

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://rebtybwqfrgllopaiyes.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]

# NextAuth
NEXTAUTH_SECRET=[YOUR_NEXTAUTH_SECRET]
NEXTAUTH_URL=http://localhost:3000
```

Pour le déploiement en production, les variables d'environnement devront être configurées dans Vercel :
- `NEXTAUTH_URL` devra être mis à jour avec l'URL de production
- Les autres variables resteront les mêmes

## Configuration de NextAuth.js

Le fichier `src/lib/auth.ts` contient la configuration de NextAuth.js :

```typescript
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './db';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' }
      },
      async authorize(credentials) {
        // Logique d'authentification
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    newUser: '/auth/signup',
  },
  callbacks: {
    // Callbacks pour personnaliser les sessions et les JWT
  },
  secret: process.env.NEXTAUTH_SECRET,
};
```

## Schéma de Base de Données

Le schéma Prisma (`prisma/schema.prisma`) définit les modèles suivants :

1. **User** - Utilisateurs du système
2. **Account** - Comptes d'authentification liés aux utilisateurs
3. **Session** - Sessions utilisateur
4. **VerificationToken** - Tokens pour la vérification d'email
5. **Service** - Services proposés par l'entreprise
6. **Reservation** - Réservations des clients
7. **Realisation** - Réalisations/projets avec photos avant/après
8. **Avis** - Avis clients

Ces modèles sont liés entre eux par des relations définies dans le schéma Prisma.

## Commandes Utiles

- Démarrer le serveur de développement: `npm run dev`
- Générer le client Prisma: `npx prisma generate`
- Pousser les changements vers la base de données: `npx prisma db push`
- Construire l'application pour la production: `npm run build`
- Démarrer l'application en production: `npm start`
