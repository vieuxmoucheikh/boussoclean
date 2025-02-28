import Link from 'next/link';

export default function ServiceNotFound() {
  return (
    <div className="min-h-screen">
      <section className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Service non trouvé</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Le service que vous recherchez n'existe pas ou a été déplacé.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Que souhaitez-vous faire ?</h2>
            <div className="flex flex-col space-y-4">
              <Link 
                href="/services" 
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition text-center"
              >
                Voir tous nos services
              </Link>
              <Link 
                href="/" 
                className="text-green-600 py-2 px-4 rounded hover:text-green-800 transition text-center"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
