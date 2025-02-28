'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

type ReservationDetail = {
  id: string;
  date: string;
  heure: string;
  statut: string;
  montantTotal: number;
  adresse: string;
  codePostal: string;
  ville: string;
  commentaire?: string;
  services: {
    id: string;
    nom: string;
    prix: number;
    description: string;
  }[];
};

export default function ReservationDetailPage() {
  const { session, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();
  const reservationId = params.id as string;
  
  const [reservation, setReservation] = useState<ReservationDetail | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch reservation details if authenticated
    if (isAuthenticated && reservationId) {
      const fetchReservationDetails = async () => {
        try {
          const response = await fetch(`/api/user/reservations/${reservationId}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch reservation details');
          }
          
          const data = await response.json();
          setReservation(data);
        } catch (error) {
          console.error('Error fetching reservation details:', error);
          setError('Impossible de récupérer les détails de la réservation. Veuillez réessayer plus tard.');
        } finally {
          setIsLoadingData(false);
        }
      };
      
      fetchReservationDetails();
    }
  }, [isAuthenticated, reservationId]);
  
  if (isLoading || isLoadingData) {
    return (
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </main>
    );
  }
  
  if (error) {
    return (
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link href="/dashboard" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Retour au tableau de bord
            </Link>
          </div>
        </div>
      </main>
    );
  }
  
  if (!reservation) {
    return (
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">Réservation introuvable</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link href="/dashboard" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Retour au tableau de bord
            </Link>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen pb-16">
      {/* Header */}
      <section className="bg-blue-600 py-16 px-4 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Détails de la réservation</h1>
              <p className="text-xl max-w-3xl">
                Réservation du {new Date(reservation.date).toLocaleDateString('fr-FR')} à {reservation.heure}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/dashboard" className="inline-flex items-center px-4 py-2 border border-white rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                Retour au tableau de bord
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Reservation Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Status Banner */}
            <div className={`px-6 py-4 ${
              reservation.statut === 'confirmé' ? 'bg-green-500' : 
              reservation.statut === 'en attente' ? 'bg-yellow-500' : 
              'bg-gray-500'
            } text-white`}>
              <div className="flex items-center">
                <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {reservation.statut === 'confirmé' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : reservation.statut === 'en attente' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
                <span className="text-lg font-semibold">
                  Statut: {reservation.statut.charAt(0).toUpperCase() + reservation.statut.slice(1)}
                </span>
              </div>
            </div>
            
            {/* Reservation Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Informations de la réservation</h2>
                  <dl className="space-y-2">
                    <div className="flex">
                      <dt className="w-1/3 font-medium text-gray-500">Date:</dt>
                      <dd className="w-2/3 text-gray-900">{new Date(reservation.date).toLocaleDateString('fr-FR')}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-1/3 font-medium text-gray-500">Heure:</dt>
                      <dd className="w-2/3 text-gray-900">{reservation.heure}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-1/3 font-medium text-gray-500">Adresse:</dt>
                      <dd className="w-2/3 text-gray-900">
                        {reservation.adresse}<br />
                        {reservation.codePostal} {reservation.ville}
                      </dd>
                    </div>
                    {reservation.commentaire && (
                      <div className="flex">
                        <dt className="w-1/3 font-medium text-gray-500">Commentaire:</dt>
                        <dd className="w-2/3 text-gray-900">{reservation.commentaire}</dd>
                      </div>
                    )}
                  </dl>
                </div>
                
                {/* Right Column */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Service
                          </th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Prix
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reservation.services.map((service) => (
                          <tr key={service.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              <div className="font-medium">{service.nom}</div>
                              <div className="text-gray-500 text-xs mt-1">{service.description}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                              {service.prix.toFixed(2)} €
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            Total
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                            {reservation.montantTotal.toFixed(2)} €
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                  {reservation.statut === 'en attente' && (
                    <button
                      type="button"
                      className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() => {
                        if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
                          // Handle cancellation logic
                          alert('Fonctionnalité à implémenter');
                        }
                      }}
                    >
                      Annuler la réservation
                    </button>
                  )}
                  <Link
                    href={`/reservation/modify/${reservationId}`}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Modifier la réservation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
