import React from 'react';
import { Metadata } from 'next';
import SignInForm from '@/components/forms/SignInForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Connexion | Boussoclean',
  description: 'Connectez-vous à votre compte pour gérer vos services de nettoyage',
};

export default function SignInPage() {
  return (
    <main className="min-h-screen pb-16">
      {/* Header */}
      <section className="bg-blue-600 py-16 px-4 text-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Connexion</h1>
          <p className="text-xl max-w-3xl">
            Connectez-vous à votre espace client pour gérer vos rendez-vous et accéder à vos factures.
          </p>
        </div>
      </section>

      {/* Sign In Form */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-md">
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Accéder à votre compte</h2>
            
            <SignInForm />
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-2">Pas encore de compte ?</p>
              <Link href="/auth/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
