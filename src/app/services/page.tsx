import Link from "next/link";
import Image from "next/image";
import ServiceList from "@/components/services/ServiceList";

export const metadata = {
  title: 'Nos Services de Nettoyage | Boussoclean',
  description: 'Découvrez nos services professionnels de nettoyage à Paris et en Île-de-France. Canapés, matelas, tapis, voitures et plus encore.',
};

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Services de Nettoyage</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Des solutions professionnelles et écologiques pour tous vos besoins de nettoyage à Paris et en Île-de-France.
          </p>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Nos services les plus demandés</h2>
          
          {/* Canapés */}
          <div id="canapes" className="mb-20 scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full">CANAPÉS</span>
                <h2 className="text-3xl font-bold mt-4 mb-6">Nettoyage de Canapés</h2>
                <p className="text-gray-600 mb-4">
                  Nos experts redonnent vie à vos canapés grâce à notre procédé de nettoyage en profondeur. Nous éliminons taches, odeurs et acariens pour un résultat impeccable.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold mb-3">Notre processus en 3 étapes :</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Inspection et pré-traitement des taches</li>
                    <li>Injection-extraction avec produits écologiques</li>
                    <li>Séchage rapide et contrôle qualité</li>
                  </ol>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/tarifs#canapes"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 text-center"
                  >
                    Voir les tarifs
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-white border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-md font-medium transition-colors duration-300 text-center"
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image 
                  src="/images/services/canape.jpg" 
                  alt="Nettoyage de canapé" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Matelas */}
          <div id="matelas" className="mb-20 scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 relative h-80 rounded-lg overflow-hidden">
                <Image 
                  src="/images/services/matelas.jpg" 
                  alt="Nettoyage de matelas" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <span className="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full">MATELAS</span>
                <h2 className="text-3xl font-bold mt-4 mb-6">Nettoyage de Matelas</h2>
                <p className="text-gray-600 mb-4">
                  Éliminez les allergènes, acariens et bactéries de votre matelas pour un sommeil plus sain et réparateur. Notre traitement en profondeur assainit complètement votre literie.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold mb-3">Avantages :</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Réduction des allergènes et acariens</li>
                    <li>Élimination des taches et odeurs</li>
                    <li>Prolongation de la durée de vie du matelas</li>
                    <li>Amélioration de la qualité du sommeil</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/tarifs#matelas"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 text-center"
                  >
                    Voir les tarifs
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-white border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-md font-medium transition-colors duration-300 text-center"
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Tous nos services</h2>
          <ServiceList />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'un service personnalisé ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Nous proposons également des solutions sur mesure pour répondre à vos besoins spécifiques.
          </p>
          <Link
            href="/contact"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-semibold text-lg transition-colors duration-300 inline-block"
          >
            Contactez-nous
          </Link>
        </div>
      </section>
    </div>
  );
}
