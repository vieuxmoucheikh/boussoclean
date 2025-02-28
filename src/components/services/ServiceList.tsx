'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ServiceFilter from './ServiceFilter';

interface Service {
  id: string;
  nom: string;
  description: string;
  prix: number;
  unite: string;
  image: string | null;
  categorie: string | null;
}

export default function ServiceList() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/services');
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des services');
        }
        
        const data = await response.json();
        setServices(data);
        setFilteredServices(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (activeFilter) {
      setFilteredServices(services.filter(service => service.categorie === activeFilter));
    } else {
      setFilteredServices(services);
    }
  }, [activeFilter, services]);

  const handleFilterChange = (category: string | null) => {
    setActiveFilter(category);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative my-6" role="alert">
        <strong className="font-bold">Erreur: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (filteredServices.length === 0) {
    return (
      <div>
        <ServiceFilter onFilterChange={handleFilterChange} activeFilter={activeFilter} />
        <div className="text-center py-10">
          <p className="text-gray-600">
            {activeFilter 
              ? `Aucun service disponible dans la catégorie sélectionnée.` 
              : `Aucun service disponible pour le moment.`
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ServiceFilter onFilterChange={handleFilterChange} activeFilter={activeFilter} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link href={`/services/${service.id}`}>
              <div className="relative h-48 w-full">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.nom}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Image non disponible</span>
                  </div>
                )}
              </div>
            </Link>
            <div className="p-6">
              <Link href={`/services/${service.id}`}>
                <h3 className="text-xl font-bold mb-2 hover:text-green-600 transition-colors">{service.nom}</h3>
              </Link>
              <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-green-600 font-semibold">
                  {service.prix} € {service.unite && `(${service.unite})`}
                </span>
                <Link 
                  href={`/contact?service=${encodeURIComponent(service.nom)}`}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-300"
                >
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
