'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthErrorPage() {
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
    <main className="min-h-screen pb-16">
      {/* Header */}
      <section className="bg-red-600 py-16 px-4 text-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Erreur d'authentification</h1>
          <p className="text-xl max-w-3xl">
            Une erreur est survenue lors de votre tentative de connexion.
          </p>
        </div>
      </section>

      {/* Error details */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-md">
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 border-l-4 border-red-500">
            <h2 className="text-2xl font-semibold mb-4">Détails de l'erreur</h2>
            <p className="text-gray-700 mb-6">{getErrorMessage(error)}</p>
            
            <div className="flex flex-col space-y-4">
              <Link href="/auth/signin" className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Retour à la page de connexion
              </Link>
              
              <Link href="/" className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Help section */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="container mx-auto max-w-md">
          <h3 className="text-lg font-medium mb-4 text-center">Besoin d'aide ?</h3>
          <p className="text-gray-600 text-center mb-4">
            Si le problème persiste, n'hésitez pas à nous contacter.
          </p>
          <div className="text-center">
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
              Contactez-nous
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
