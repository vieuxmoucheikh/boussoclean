import React from 'react';
import { Metadata } from 'next';
import SignUpForm from '@/components/forms/SignUpForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Créer un compte | Boussoclean',
  description: 'Créez votre compte pour bénéficier de remises et suivre vos réservations',
};

export default function SignUpPage() {
  return (
    <main className="min-h-screen pb-16">
      {/* Header */}
      <section className="bg-blue-600 py-16 px-4 text-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Créer un compte</h1>
          <p className="text-xl max-w-3xl">
            Rejoignez Boussoclean pour bénéficier d'offres exclusives et faciliter vos prochaines réservations.
          </p>
        </div>
      </section>

      {/* Sign Up Form */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-md">
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Créez votre compte</h2>
            
            <SignUpForm />
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-2">Déjà un compte ?</p>
              <Link href="/auth/signin" className="text-blue-600 hover:text-blue-800 font-medium">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold mb-8 text-center">Avantages de votre compte</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Remises Fidélité</h3>
              <p className="text-gray-600">Bénéficiez de remises exclusives sur vos prochaines prestations.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Suivi des Réservations</h3>
              <p className="text-gray-600">Consultez l'historique et le statut de toutes vos réservations.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Réservation Simplifiée</h3>
              <p className="text-gray-600">Réservez plus rapidement avec vos informations pré-enregistrées.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
