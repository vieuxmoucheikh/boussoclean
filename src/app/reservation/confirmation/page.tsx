import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Réservation Confirmée | Boussoclean',
  description: 'Votre réservation de service de nettoyage a été envoyée avec succès.',
};

export default function ReservationConfirmationPage() {
  return (
    <main className="min-h-screen pb-16">
      {/* Confirmation Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white shadow-lg rounded-lg p-8 md:p-12">
            <svg className="h-24 w-24 text-green-500 mx-auto mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Réservation Envoyée avec Succès !</h1>
            
            <p className="text-xl text-gray-700 mb-8">
              Nous avons bien reçu votre demande de réservation. 
              Un email de confirmation vous a été envoyé à l'adresse que vous avez fournie.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-left mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Notre équipe va examiner votre demande et vous contactera dans les plus brefs délais 
                    pour confirmer les détails de votre réservation. Si vous ne recevez pas de confirmation 
                    dans les 24 heures ouvrées, n'hésitez pas à nous contacter.
                  </p>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Et maintenant ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 border rounded-lg">
                <div className="h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full mx-auto mb-3">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Vérifiez vos emails</h3>
                <p className="text-gray-600">Vous recevrez un email de confirmation avec tous les détails.</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full mx-auto mb-3">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Attendez notre appel</h3>
                <p className="text-gray-600">Nous vous contacterons pour confirmer les détails de votre réservation.</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full mx-auto mb-3">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Préparez-vous</h3>
                <p className="text-gray-600">La veille, nous vous rappellerons pour confirmer le rendez-vous.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-base text-center">
                Retour à l'accueil
              </Link>
              <Link href="/services" className="px-6 py-3 bg-white border border-blue-600 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 text-blue-600 font-medium rounded-lg text-base text-center">
                Découvrir nos services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
