-- Create the Service table
CREATE TABLE "Service" (
  "id" TEXT PRIMARY KEY,
  "nom" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "prix" DOUBLE PRECISION NOT NULL,
  "unite" TEXT,
  "image" TEXT,
  "categorie" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create the User table
CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT,
  "email" TEXT UNIQUE,
  "emailVerified" TIMESTAMP(3),
  "image" TEXT
);

-- Create the Devis table
CREATE TABLE "Devis" (
  "id" TEXT PRIMARY KEY,
  "nom" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "telephone" TEXT NOT NULL,
  "message" TEXT,
  "statut" TEXT NOT NULL DEFAULT 'NOUVEAU',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "userId" TEXT REFERENCES "User"("id") ON DELETE SET NULL
);

-- Create the DevisItem table
CREATE TABLE "DevisItem" (
  "id" TEXT PRIMARY KEY,
  "quantite" INTEGER NOT NULL,
  "prix" DOUBLE PRECISION NOT NULL,
  "devisId" TEXT NOT NULL REFERENCES "Devis"("id") ON DELETE CASCADE,
  "serviceId" TEXT NOT NULL REFERENCES "Service"("id")
);

-- Create the Reservation table
CREATE TABLE "Reservation" (
  "id" TEXT PRIMARY KEY,
  "dateService" TIMESTAMP(3) NOT NULL,
  "heureService" TEXT NOT NULL,
  "statut" TEXT NOT NULL DEFAULT 'confirmee',
  "montantTotal" DOUBLE PRECISION NOT NULL,
  "paiementStatus" TEXT NOT NULL DEFAULT 'en_attente',
  "adresse" TEXT NOT NULL,
  "codePostal" TEXT NOT NULL,
  "ville" TEXT NOT NULL,
  "commentaire" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "userId" TEXT NOT NULL REFERENCES "User"("id")
);

-- Create the ReservationItem table
CREATE TABLE "ReservationItem" (
  "id" TEXT PRIMARY KEY,
  "quantite" INTEGER NOT NULL,
  "prix" DOUBLE PRECISION NOT NULL,
  "reservationId" TEXT NOT NULL REFERENCES "Reservation"("id") ON DELETE CASCADE,
  "serviceId" TEXT NOT NULL REFERENCES "Service"("id")
);

-- Create the Realisation table
CREATE TABLE "Realisation" (
  "id" TEXT PRIMARY KEY,
  "titre" TEXT NOT NULL,
  "description" TEXT,
  "imageAvant" TEXT NOT NULL,
  "imageApres" TEXT NOT NULL,
  "categorie" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the Contact table
CREATE TABLE "Contact" (
  "id" TEXT PRIMARY KEY,
  "nom" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "telephone" TEXT,
  "message" TEXT NOT NULL,
  "lu" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the Avis table
CREATE TABLE "Avis" (
  "id" TEXT PRIMARY KEY,
  "note" INTEGER NOT NULL,
  "commentaire" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "userId" TEXT NOT NULL REFERENCES "User"("id")
);

-- Create NextAuth tables
CREATE TABLE "Account" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
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
  UNIQUE("provider", "providerAccountId")
);

CREATE TABLE "Session" (
  "id" TEXT PRIMARY KEY,
  "sessionToken" TEXT NOT NULL UNIQUE,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "expires" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "VerificationToken" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL,
  UNIQUE("identifier", "token")
);
