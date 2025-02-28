import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }) {
  const service = await getService(params.id);
  
  if (!service) {
    return {
      title: 'Service non trouvé',
    };
  }
  
  return {
    title: `${service.nom} | Boussoclean`,
    description: service.description,
  };
}

// Get service data
async function getService(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/services/${id}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération du service:', error);
    return null;
  }
}

export default async function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = await getService(params.id);
  
  if (!service) {
    notFound();
  }
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.nom}</h1>
          <p className="text-xl max-w-3xl">
            Service professionnel de nettoyage par Boussoclean
          </p>
        </div>
      </section>
      
      {/* Service Detail Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative h-96 rounded-lg overflow-hidden">
              {service.image ? (
                <Image
                  src={service.image}
                  alt={service.nom}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Image non disponible</span>
                </div>
              )}
            </div>
            
            {/* Details */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Description</h2>
                <p className="text-gray-700 text-lg">{service.description}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Tarifs</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-xl">Prix</span>
                    <span className="text-2xl font-bold text-green-600">
                      {service.prix} €{service.unite ? ` ${service.unite}` : ''}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-2 text-sm">
                    * Les prix peuvent varier en fonction de l'état et de la complexité du travail
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 text-center"
                >
                  Demander un devis
                </Link>
                <Link
                  href="/services"
                  className="bg-white border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-md font-medium transition-colors duration-300 text-center"
                >
                  Tous les services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Autres services qui pourraient vous intéresser</h2>
          
          {/* This would ideally be a component that fetches related services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder for related services */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">Consultez nos autres services</h3>
              <p className="text-gray-600 mb-4">
                Découvrez notre gamme complète de services de nettoyage professionnel.
              </p>
              <Link
                href="/services"
                className="text-green-600 font-medium hover:text-green-700"
              >
                Voir tous les services →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
