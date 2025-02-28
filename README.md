This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Boussoclean - Site d'Entreprise de Nettoyage

Ce projet est un site web complet pour une entreprise de nettoyage, permettant aux clients de consulter les services, demander des devis et gérer leurs réservations.

## Documentation Spécifique

- [Documentation d'Authentification](./README-AUTH.md) - Détails sur le système d'authentification
- [Documentation Base de Données](./README-DATABASE.md) - Structure et utilisation de la base de données PostgreSQL

## Technologies Utilisées

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: API Routes Next.js
- **Base de Données**: PostgreSQL avec requêtes SQL directes
- **Authentification**: NextAuth.js

## Configuration Requise

### Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```
DATABASE_URL=postgresql://username:password@localhost:5432/boussoclean
NEXTAUTH_SECRET=votre_secret_nextauth
NEXTAUTH_URL=http://localhost:3000
```

### Base de Données

1. Installez PostgreSQL
2. Créez une base de données nommée `boussoclean`
3. Exécutez les scripts SQL pour initialiser la base de données :
   ```bash
   psql -U username -d boussoclean -f prisma/schema.sql
   psql -U username -d boussoclean -f prisma/seed.sql
   ```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Fonctionnalités

- **Page d'Accueil**: Présentation de l'entreprise et des services
- **Services**: Catalogue des services proposés avec détails et tarifs
- **Demande de Devis**: Formulaire pour demander un devis personnalisé
- **Authentification**: Inscription et connexion des utilisateurs
- **Espace Client**: Gestion du profil et des réservations
- **Administration**: Gestion des services et des réservations (à venir)

## Structure du Projet

- `src/app/page.tsx`: Page d'accueil
- `src/app/services/page.tsx`: Page des services
- `src/app/devis/page.tsx`: Formulaire de demande de devis
- `src/app/auth/`: Pages d'authentification
- `src/app/dashboard/`: Espace client
- `src/app/api/`: Routes API
- `src/components/`: Composants réutilisables
- `src/lib/`: Utilitaires et configuration
- `prisma/`: Fichiers SQL pour la base de données

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
