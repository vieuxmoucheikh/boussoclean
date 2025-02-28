import Link from "next/link";

export default function Realisations() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Réalisations</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Découvrez nos travaux de nettoyage avant/après et les transformations réalisées pour nos clients.
          </p>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300">
              Tous
            </button>
            <button className="bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-300">
              Canapés
            </button>
            <button className="bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-300">
              Matelas
            </button>
            <button className="bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-300">
              Tapis
            </button>
            <button className="bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-300">
              Voitures
            </button>
            <button className="bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-300">
              Mobilier
            </button>
          </div>
        </div>
      </section>

      {/* Galerie de Réalisations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Réalisation 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <div className="h-64 bg-gray-200 relative">
                  {/* Remplacer par une vraie image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image Avant/Après Canapé</div>
                </div>
                <div className="absolute top-4 left-4 bg-green-600 text-white text-sm font-medium px-2 py-1 rounded">
                  Canapé
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Nettoyage d'un canapé d'angle</h3>
                <p className="text-gray-600 mb-4">
                  Élimination de taches tenaces et d'odeurs sur un canapé d'angle en tissu beige.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Paris 16ème</span>
                  <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
                    Voir plus
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Réalisation 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <div className="h-64 bg-gray-200 relative">
                  {/* Remplacer par une vraie image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image Avant/Après Tapis</div>
                </div>
                <div className="absolute top-4 left-4 bg-green-600 text-white text-sm font-medium px-2 py-1 rounded">
                  Tapis
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Nettoyage d'un tapis persan</h3>
                <p className="text-gray-600 mb-4">
                  Restauration des couleurs et élimination des taches sur un tapis persan ancien.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Neuilly-sur-Seine</span>
                  <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
                    Voir plus
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Réalisation 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <div className="h-64 bg-gray-200 relative">
                  {/* Remplacer par une vraie image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image Avant/Après Matelas</div>
                </div>
                <div className="absolute top-4 left-4 bg-green-600 text-white text-sm font-medium px-2 py-1 rounded">
                  Matelas
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Nettoyage et désinfection de matelas</h3>
                <p className="text-gray-600 mb-4">
                  Élimination des acariens, taches et odeurs sur un matelas king size.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Paris 8ème</span>
                  <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
                    Voir plus
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Réalisation 4 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <div className="h-64 bg-gray-200 relative">
                  {/* Remplacer par une vraie image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image Avant/Après Voiture</div>
                </div>
                <div className="absolute top-4 left-4 bg-green-600 text-white text-sm font-medium px-2 py-1 rounded">
                  Voiture
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Nettoyage intérieur SUV</h3>
                <p className="text-gray-600 mb-4">
                  Nettoyage complet de l'intérieur d'un SUV familial, sièges, moquettes et plafond.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Boulogne-Billancourt</span>
                  <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
                    Voir plus
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Réalisation 5 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <div className="h-64 bg-gray-200 relative">
                  {/* Remplacer par une vraie image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image Avant/Après Fauteuil</div>
                </div>
                <div className="absolute top-4 left-4 bg-green-600 text-white text-sm font-medium px-2 py-1 rounded">
                  Mobilier
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Rénovation de fauteuils anciens</h3>
                <p className="text-gray-600 mb-4">
                  Nettoyage et ravivage des couleurs de deux fauteuils de style Louis XV.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Versailles</span>
                  <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
                    Voir plus
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Réalisation 6 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <div className="h-64 bg-gray-200 relative">
                  {/* Remplacer par une vraie image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image Avant/Après Moquette</div>
                </div>
                <div className="absolute top-4 left-4 bg-green-600 text-white text-sm font-medium px-2 py-1 rounded">
                  Tapis
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Nettoyage de moquette professionnelle</h3>
                <p className="text-gray-600 mb-4">
                  Nettoyage en profondeur de 120m² de moquette dans des bureaux d'entreprise.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">La Défense</span>
                  <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
                    Voir plus
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">1</button>
              <button className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
              <button className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">3</button>
              <button className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Témoignage en vedette */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <h3 className="text-xl font-semibold">Jean Dupont</h3>
                <div className="flex items-center">
                  <div className="text-yellow-400 mr-2">★★★★★</div>
                  <span className="text-gray-500">Propriétaire d'un hôtel boutique</span>
                </div>
              </div>
            </div>
            <blockquote className="text-gray-600 text-lg italic mb-6">
              "Boussoclean a transformé les 25 chambres de notre hôtel boutique. Tous les canapés, fauteuils et tapis ont retrouvé leur éclat d'origine. Le service était rapide, professionnel et le résultat est impressionnant. Nos clients remarquent la différence et nous font régulièrement des compliments. Je recommande vivement leurs services à tous les professionnels de l'hôtellerie."
            </blockquote>
            <Link
              href="/avis"
              className="text-green-600 font-medium hover:text-green-700 flex items-center"
            >
              Voir tous les témoignages
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Vous souhaitez des résultats similaires ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contactez-nous dès maintenant pour obtenir un devis gratuit et redonner vie à vos meubles et textiles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold text-lg transition-colors duration-300"
            >
              Demander un devis
            </Link>
            <Link
              href="/services"
              className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-md font-semibold text-lg transition-colors duration-300"
            >
              Découvrir nos services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
