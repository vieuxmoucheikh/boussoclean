import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import ReservationForm from '@/components/forms/ReservationForm';

export const metadata: Metadata = {
  title: 'Réservation | Boussoclean',
  description: 'Réservez votre service de nettoyage professionnel à Paris et en Île-de-France',
};

export default function ReservationPage() {
  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="bg-blue-600 py-16 px-4 text-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Réservation en ligne</h1>
          <p className="text-xl max-w-3xl">
            Réservez votre service de nettoyage professionnel en quelques clics. 
            Choisissez les services, la date et l'heure qui vous conviennent.
          </p>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Planifiez votre rendez-vous</h2>
            
            {/* Information Notice */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-800">
                    Cette fonctionnalité de réservation est en cours de développement. 
                    Pour l'instant, veuillez remplir le formulaire ci-dessous et nous vous contacterons rapidement.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Reservation Form */}
            <ReservationForm />
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold mb-8 text-center">Questions fréquentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-3">Comment fonctionne le système de réservation ?</h3>
              <p className="text-gray-700">
                Sélectionnez les services dont vous avez besoin, choisissez une date et une heure qui vous conviennent, 
                puis remplissez vos coordonnées. Nous vous confirmerons rapidement votre réservation par email.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-3">Puis-je modifier ma réservation ?</h3>
              <p className="text-gray-700">
                Oui, vous pouvez modifier ou annuler votre réservation jusqu'à 24 heures avant le rendez-vous prévu.
                Pour cela, contactez-nous par téléphone ou email.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-3">Comment se déroule le paiement ?</h3>
              <p className="text-gray-700">
                Pour l'instant, le paiement s'effectue sur place après le service. Nous acceptons les espèces, 
                les chèques et les cartes bancaires. Le paiement en ligne sera bientôt disponible.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-3">Quelle est votre zone d'intervention ?</h3>
              <p className="text-gray-700">
                Nous intervenons à Paris et dans toute l'Île-de-France. Des frais de déplacement peuvent 
                s'appliquer selon votre localisation exacte.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-semibold mb-4">Besoin d'un devis personnalisé ?</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Pour des besoins spécifiques ou des demandes sur mesure, notre équipe est à votre disposition
            pour vous établir un devis gratuit et sans engagement.
          </p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-lg text-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300">
            Demander un devis
          </Link>
        </div>
      </section>
    </main>
  );
}
