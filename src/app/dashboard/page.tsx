'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SignOutButton from '@/components/auth/SignOutButton';
import { useAuth } from '@/hooks/useAuth';

type Reservation = {
  id: string;
  date: string;
  heure: string;
  statut: string;
  services: { nom: string }[];
  montantTotal: number;
};

export default function Dashboard() {
  const { session, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch user's reservations if authenticated
    if (isAuthenticated) {
      const fetchReservations = async () => {
        try {
          const response = await fetch('/api/user/reservations');
          
          if (!response.ok) {
            throw new Error('Failed to fetch reservations');
          }
          
          const data = await response.json();
          setReservations(data);
        } catch (error) {
          console.error('Error fetching reservations:', error);
          setError('Impossible de récupérer vos réservations. Veuillez réessayer plus tard.');
        } finally {
          setIsLoadingData(false);
        }
      };
      
      fetchReservations();
    }
  }, [isAuthenticated]);
  
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
  
  return (
    <main className="min-h-screen pb-16">
      {/* Header */}
      <section className="bg-blue-600 py-16 px-4 text-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mon Espace Client</h1>
          <p className="text-xl max-w-3xl">
            Bienvenue {session?.user?.name}. Gérez vos réservations et accédez à vos informations personnelles.
          </p>
        </div>
      </section>
      
      {/* Dashboard Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* User Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Informations personnelles</h2>
                <p className="text-gray-600 mb-1">Nom: {session?.user?.name}</p>
                <p className="text-gray-600">Email: {session?.user?.email}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href="/dashboard/profile" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2">
                  Modifier mon profil
                </Link>
                <SignOutButton variant="secondary" />
              </div>
            </div>
          </div>
          
          {/* Reservations */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Mes réservations</h2>
              <Link href="/reservation" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Nouvelle réservation
              </Link>
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
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
            )}
            
            {reservations.length === 0 ? (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune réservation</h3>
                <p className="mt-1 text-gray-500">Vous n'avez pas encore effectué de réservation.</p>
                <div className="mt-6">
                  <Link href="/reservation" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Réserver maintenant
                  </Link>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Services
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{new Date(reservation.date).toLocaleDateString('fr-FR')}</div>
                          <div className="text-sm text-gray-500">{reservation.heure}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {reservation.services.map((service, index) => (
                              <span key={index}>
                                {service.nom}
                                {index < reservation.services.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{reservation.montantTotal.toFixed(2)} €</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${reservation.statut === 'confirmé' ? 'bg-green-100 text-green-800' : 
                              reservation.statut === 'en attente' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-gray-100 text-gray-800'}`}>
                            {reservation.statut.charAt(0).toUpperCase() + reservation.statut.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link href={`/dashboard/reservations/${reservation.id}`} className="text-blue-600 hover:text-blue-900">
                            Détails
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
