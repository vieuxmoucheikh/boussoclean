'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  // Map error codes to user-friendly messages
  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'CredentialsSignin':
        return 'Email ou mot de passe incorrect.';
      case 'OAuthAccountNotLinked':
        return 'Cet email est déjà associé à un autre compte. Veuillez vous connecter avec la méthode utilisée précédemment.';
      case 'EmailSignin':
        return 'Une erreur est survenue lors de l\'envoi du lien de connexion. Veuillez réessayer.';
      case 'SessionRequired':
        return 'Vous devez être connecté pour accéder à cette page.';
      case 'AccessDenied':
        return 'Vous n\'avez pas les droits nécessaires pour accéder à cette page.';
      default:
        return 'Une erreur est survenue lors de l\'authentification. Veuillez réessayer.';
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur d'authentification</h2>
      <p className="text-gray-700 mb-6">{getErrorMessage(error)}</p>
      <div className="flex flex-col space-y-4">
        <Link 
          href="/auth/signin" 
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-center"
        >
          Retour à la page de connexion
        </Link>
        <Link 
          href="/" 
          className="text-blue-600 py-2 px-4 rounded hover:text-blue-800 transition text-center"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen pb-16">
      {/* Header */}
      <div className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Erreur d'authentification</h1>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={<div className="text-center">Chargement...</div>}>
          <ErrorContent />
        </Suspense>
      </div>
    </main>
  );
}
