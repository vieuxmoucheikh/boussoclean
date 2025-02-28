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

### 2. Développement des Pages et Composants (EN COURS)
- [x] Développer les composants de mise en page (Header, Footer)
- [x] Créer la page d'accueil
- [x] Créer la page des services
- [x] Créer la page des tarifs
- [x] Créer la page de contact
- [x] Créer la page "À propos"
- [x] Créer la page des réalisations
- [x] Créer la page des avis clients
- [ ] Créer la page de réservation
- [ ] Créer les composants UI de base avec shadcn/ui

### 3. Configuration de la Base de Données (À FAIRE)
- [ ] Créer un compte Supabase et un nouveau projet
- [ ] Configurer les tables dans Supabase selon le schéma Prisma
- [ ] Récupérer les informations de connexion pour le fichier .env

### 4. Configuration de l'Authentification (À FAIRE)
- [ ] Configurer NextAuth.js avec l'adaptateur Prisma
- [ ] Créer les pages de connexion/inscription
- [ ] Implémenter la gestion des sessions

### 5. Développement des Fonctionnalités Clés (À FAIRE)
- [ ] Calculateur de tarifs interactif
- [ ] Formulaire de devis rapide
- [ ] Chatbot intégré
- [ ] Système de réservation en ligne
- [ ] Galerie avant/après
- [ ] Espace avis clients

### 6. Déploiement (À FAIRE)
- [ ] Créer un dépôt GitHub pour le projet
- [ ] Connecter le dépôt à Vercel
- [ ] Configurer les variables d'environnement dans Vercel
- [ ] Déployer l'application

## État Actuel du Projet (28/02/2025)

### Pages Développées
1. **Page d'accueil (page.tsx)**
   - Section hero avec appel à l'action
   - Section avantages
   - Section services principaux
   - Section témoignages
   - Section appel à l'action final

2. **Page des services (services/page.tsx)**
   - Présentation détaillée de tous les services de nettoyage
   - Sections pour chaque type de service (canapés, matelas, tapis, etc.)
   - Descriptions des processus de nettoyage
   - Boutons d'appel à l'action pour les devis

3. **Page des tarifs (tarifs/page.tsx)**
   - Liste des prix pour chaque service
   - Informations sur les remises pour services multiples
   - Informations sur les traitements supplémentaires

4. **Page de contact (contact/page.tsx)**
   - Formulaire de contact
   - Informations de contact de l'entreprise
   - Section FAQ
   - Carte de la zone de service

5. **Page À propos (a-propos/page.tsx)**
   - Histoire de l'entreprise
   - Mission et valeurs
   - Présentation de l'équipe
   - Certifications et engagements

6. **Page des réalisations (realisations/page.tsx)**
   - Galerie de travaux avant/après
   - Filtres par type de service
   - Témoignage en vedette
   - Pagination

7. **Page des avis clients (avis/page.tsx)**
   - Affichage des témoignages clients
   - Système de notation avec étoiles
   - Filtres par type de service
   - Pagination
   - Formulaire pour laisser un avis

### Pages et Fonctionnalités à Développer
1. **Page de réservation (reservation/page.tsx)**
   - Calendrier de disponibilité
   - Formulaire de réservation
   - Sélection des services
   - Paiement en ligne

2. **Fonctionnalités Backend**
   - Authentification utilisateur
   - Gestion des devis
   - Système de réservation
   - Stockage des avis clients
   - API pour le calculateur de tarifs

3. **Intégrations**
   - Intégration de paiement
   - Intégration de calendrier
   - Notifications par email
   - Chatbot pour assistance client

### Prochaines Étapes Immédiates
1. Créer la page de réservation
2. Configurer la base de données Supabase
3. Implémenter l'authentification utilisateur
4. Développer les fonctionnalités backend pour les formulaires
5. Connecter les pages aux données réelles provenant de la base de données

### Notes Techniques
- Le schéma Prisma est défini mais n'est pas encore connecté à une base de données
- Les formulaires sont créés mais ne sont pas encore fonctionnels (pas de backend)
- Les images sont actuellement des placeholders et devront être remplacées par des images réelles
- L'authentification n'est pas encore implémentée
- La page des avis clients est créée avec des données statiques mais n'est pas encore connectée à la base de données pour la gestion dynamique des avis

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

## Variables d'Environnement (.env)

Créez un fichier `.env` à la racine du projet avec les informations suivantes:

```
# Base de données
DATABASE_URL="postgresql://postgres:[MOT_DE_PASSE]@[URL_PROJET].supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[ID_PROJET].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[CLÉ_ANON]

# NextAuth
NEXTAUTH_SECRET=[GÉNÉREZ_UNE_CHAÎNE_ALÉATOIRE]
NEXTAUTH_URL=http://localhost:3000
```

## Commandes Utiles

- Démarrer le serveur de développement: `npm run dev`
- Générer le client Prisma: `npx prisma generate`
- Pousser les changements vers la base de données: `npx prisma db push`
- Construire l'application pour la production: `npm run build`
- Démarrer l'application en production: `npm start`
