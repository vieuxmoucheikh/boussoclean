import Link from "next/link";

export default function Tarifs() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Tarifs</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Des prix transparents et compétitifs pour tous nos services de nettoyage professionnel.
          </p>
        </div>
      </section>

      {/* Tarifs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
              {/* Canapés */}
              <div id="canapes" className="scroll-mt-24">
                <div className="bg-green-600 text-white px-6 py-4">
                  <h2 className="text-xl font-bold">Nettoyage de Canapés</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Canapé 1 place</h3>
                      <p className="text-3xl font-bold text-green-600">59€</p>
                      <p className="text-gray-500 text-sm">Prix par unité</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Canapé 2 places</h3>
                      <p className="text-3xl font-bold text-green-600">79€</p>
                      <p className="text-gray-500 text-sm">Prix par unité</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Canapé 3 places</h3>
                      <p className="text-3xl font-bold text-green-600">99€</p>
                      <p className="text-gray-500 text-sm">Prix par unité</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Canapé d'angle</h3>
                      <p className="text-3xl font-bold text-green-600">129€</p>
                      <p className="text-gray-500 text-sm">Prix par unité</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    * Les prix peuvent varier en fonction de l'état du canapé et du type de tissu.
                  </p>
                  <Link
                    href="/contact"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300 inline-block"
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>

              {/* Matelas */}
              <div id="matelas" className="border-t border-gray-200 scroll-mt-24">
                <div className="bg-green-600 text-white px-6 py-4">
                  <h2 className="text-xl font-bold">Nettoyage de Matelas</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Matelas 1 personne</h3>
                      <p className="text-3xl font-bold text-green-600">49€</p>
                      <p className="text-gray-500 text-sm">Prix par unité</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Matelas 2 personnes</h3>
                      <p className="text-3xl font-bold text-green-600">79€</p>
                      <p className="text-gray-500 text-sm">Prix par unité</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Matelas King Size</h3>
                      <p className="text-3xl font-bold text-green-600">99€</p>
                      <p className="text-gray-500 text-sm">Prix par unité</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Traitement anti-acariens</h3>
                      <p className="text-3xl font-bold text-green-600">+15€</p>
                      <p className="text-gray-500 text-sm">Supplément</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    * Réduction de 10% pour le nettoyage de plusieurs matelas le même jour.
                  </p>
                  <Link
                    href="/contact"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300 inline-block"
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>

              {/* Tapis et Moquettes */}
              <div id="tapis" className="border-t border-gray-200 scroll-mt-24">
                <div className="bg-green-600 text-white px-6 py-4">
                  <h2 className="text-xl font-bold">Nettoyage de Tapis et Moquettes</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Tapis petit format</h3>
                      <p className="text-3xl font-bold text-green-600">39€</p>
                      <p className="text-gray-500 text-sm">Jusqu'à 2m²</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Tapis moyen format</h3>
                      <p className="text-3xl font-bold text-green-600">69€</p>
                      <p className="text-gray-500 text-sm">De 2m² à 5m²</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Tapis grand format</h3>
                      <p className="text-3xl font-bold text-green-600">99€</p>
                      <p className="text-gray-500 text-sm">Plus de 5m²</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Moquette</h3>
                      <p className="text-3xl font-bold text-green-600">15€/m²</p>
                      <p className="text-gray-500 text-sm">Prix au m²</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    * Tarif dégressif pour les grandes surfaces de moquette (plus de 20m²).
                  </p>
                  <Link
                    href="/contact"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300 inline-block"
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>

              {/* Intérieur Voiture */}
              <div id="voiture" className="border-t border-gray-200 scroll-mt-24">
                <div className="bg-green-600 text-white px-6 py-4">
                  <h2 className="text-xl font-bold">Nettoyage Intérieur Voiture</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Formule Standard</h3>
                      <p className="text-3xl font-bold text-green-600">89€</p>
                      <p className="text-gray-500 text-sm">Sièges + moquettes</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Formule Premium</h3>
                      <p className="text-3xl font-bold text-green-600">129€</p>
                      <p className="text-gray-500 text-sm">Standard + plafond + plastiques</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Traitement odeurs</h3>
                      <p className="text-3xl font-bold text-green-600">+20€</p>
                      <p className="text-gray-500 text-sm">Supplément</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Traitement cuir</h3>
                      <p className="text-3xl font-bold text-green-600">+30€</p>
                      <p className="text-gray-500 text-sm">Supplément</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    * Supplément de 20€ pour les SUV, monospaces et véhicules de grande taille.
                  </p>
                  <Link
                    href="/contact"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300 inline-block"
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>

              {/* Mobilier */}
              <div id="mobilier" className="border-t border-gray-200 scroll-mt-24">
                <div className="bg-green-600 text-white px-6 py-4">
                  <h2 className="text-xl font-bold">Nettoyage de Mobilier</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Fauteuil</h3>
                      <p className="text-3xl font-bold text-green-600">49€</p>
                      <p className="text-gray-500 text-sm">Prix par unité</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Chaise rembourrée</h3>
                      <p className="text-3xl font-bold text-green-600">25€</p>
                      <p className="text-gray-500 text-sm">Prix par unité</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Pouf</h3>
                      <p className="text-3xl font-bold text-green-600">29€</p>
                      <p className="text-gray-500 text-sm">Prix par unité</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Tête de lit</h3>
                      <p className="text-3xl font-bold text-green-600">39€</p>
                      <p className="text-gray-500 text-sm">Prix par unité</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    * Réduction de 10% à partir de 3 pièces nettoyées le même jour.
                  </p>
                  <Link
                    href="/contact"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300 inline-block"
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>

              {/* Rideaux et Stores */}
              <div id="rideaux" className="border-t border-gray-200 scroll-mt-24">
                <div className="bg-green-600 text-white px-6 py-4">
                  <h2 className="text-xl font-bold">Nettoyage de Rideaux et Stores</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Rideaux (petite fenêtre)</h3>
                      <p className="text-3xl font-bold text-green-600">39€</p>
                      <p className="text-gray-500 text-sm">Prix par fenêtre</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Rideaux (grande fenêtre)</h3>
                      <p className="text-3xl font-bold text-green-600">59€</p>
                      <p className="text-gray-500 text-sm">Prix par fenêtre</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Stores vénitiens</h3>
                      <p className="text-3xl font-bold text-green-600">29€</p>
                      <p className="text-gray-500 text-sm">Prix par store</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Stores à enrouleur</h3>
                      <p className="text-3xl font-bold text-green-600">35€</p>
                      <p className="text-gray-500 text-sm">Prix par store</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    * Tarifs dégressifs pour le nettoyage de plusieurs rideaux ou stores.
                  </p>
                  <Link
                    href="/contact"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300 inline-block"
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>
            </div>

            {/* Informations supplémentaires */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Informations importantes</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tous nos prix sont TTC et incluent le déplacement dans Paris et la petite couronne.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Supplément de 15€ pour les déplacements en grande couronne.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Nous proposons des forfaits sur mesure pour les entreprises et les professionnels.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Paiement par carte bancaire, espèces ou virement.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Garantie satisfaction : si vous n'êtes pas satisfait, nous revenons gratuitement.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Calculateur de prix */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'un devis personnalisé ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contactez-nous pour obtenir un devis gratuit et sans engagement adapté à vos besoins spécifiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-semibold text-lg transition-colors duration-300"
            >
              Demander un devis
            </Link>
            <Link
              href="tel:0123456789"
              className="bg-white border border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-md font-semibold text-lg transition-colors duration-300"
            >
              Appeler maintenant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
