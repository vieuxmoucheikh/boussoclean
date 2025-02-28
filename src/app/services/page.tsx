import Link from "next/link";

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

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
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
              <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                {/* Remplacer par une vraie image */}
                <div className="text-gray-400">Image Canapé</div>
              </div>
            </div>
          </div>

          {/* Matelas */}
          <div id="matelas" className="mb-20 scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                {/* Remplacer par une vraie image */}
                <div className="text-gray-400">Image Matelas</div>
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

          {/* Tapis et Moquettes */}
          <div id="tapis" className="mb-20 scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full">TAPIS & MOQUETTES</span>
                <h2 className="text-3xl font-bold mt-4 mb-6">Nettoyage de Tapis et Moquettes</h2>
                <p className="text-gray-600 mb-4">
                  Retrouvez l'éclat et la propreté de vos tapis et moquettes grâce à notre procédé d'extraction en profondeur. Nous traitons tous types de fibres avec des produits adaptés.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold mb-3">Notre méthode :</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Aspiration haute puissance pour éliminer les particules</li>
                    <li>Application de shampooing écologique</li>
                    <li>Extraction à l'eau chaude</li>
                    <li>Séchage accéléré</li>
                  </ol>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/tarifs#tapis"
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
              <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                {/* Remplacer par une vraie image */}
                <div className="text-gray-400">Image Tapis</div>
              </div>
            </div>
          </div>

          {/* Intérieur Voiture */}
          <div id="voiture" className="mb-20 scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                {/* Remplacer par une vraie image */}
                <div className="text-gray-400">Image Voiture</div>
              </div>
              <div className="order-1 md:order-2">
                <span className="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full">INTÉRIEUR VOITURE</span>
                <h2 className="text-3xl font-bold mt-4 mb-6">Nettoyage Intérieur Voiture</h2>
                <p className="text-gray-600 mb-4">
                  Redonnez à l'intérieur de votre véhicule sa propreté d'origine. Notre service complet traite sièges, moquettes, plafond et surfaces plastiques.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold mb-3">Ce que nous nettoyons :</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Sièges en tissu ou cuir</li>
                    <li>Moquettes et tapis</li>
                    <li>Plafond et garnitures</li>
                    <li>Surfaces plastiques et tableau de bord</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/tarifs#voiture"
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

          {/* Mobilier */}
          <div id="mobilier" className="mb-20 scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full">MOBILIER</span>
                <h2 className="text-3xl font-bold mt-4 mb-6">Nettoyage de Mobilier</h2>
                <p className="text-gray-600 mb-4">
                  Nous prenons soin de tous vos meubles rembourrés avec des techniques adaptées à chaque type de tissu et de matériau.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold mb-3">Types de mobilier traités :</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Fauteuils et chaises</li>
                    <li>Poufs et repose-pieds</li>
                    <li>Banquettes</li>
                    <li>Têtes de lit rembourrées</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/tarifs#mobilier"
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
              <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                {/* Remplacer par une vraie image */}
                <div className="text-gray-400">Image Mobilier</div>
              </div>
            </div>
          </div>

          {/* Rideaux et Stores */}
          <div id="rideaux" className="scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                {/* Remplacer par une vraie image */}
                <div className="text-gray-400">Image Rideaux</div>
              </div>
              <div className="order-1 md:order-2">
                <span className="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full">RIDEAUX & STORES</span>
                <h2 className="text-3xl font-bold mt-4 mb-6">Nettoyage de Rideaux et Stores</h2>
                <p className="text-gray-600 mb-4">
                  Nos techniques spécialisées permettent de nettoyer vos rideaux et stores sans les démonter, éliminant poussière, allergènes et taches.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold mb-3">Avantages :</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Nettoyage sur place sans démontage</li>
                    <li>Traitement anti-poussière</li>
                    <li>Élimination des allergènes</li>
                    <li>Respect des tissus délicats</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/tarifs#rideaux"
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

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
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
