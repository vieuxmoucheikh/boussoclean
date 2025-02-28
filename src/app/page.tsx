import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-500 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-blue-500/80"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Nettoyage Écologique et Professionnel à Domicile
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Résultats garantis dès la première intervention !
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold text-lg transition-colors duration-300 text-center"
              >
                Obtenir un devis gratuit
              </Link>
              <Link
                href="/services"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-md font-semibold text-lg transition-colors duration-300 text-center"
              >
                Découvrir nos services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir Boussoclean ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Produits Écologiques</h3>
              <p className="text-gray-600">
                Nous utilisons uniquement des produits respectueux de l'environnement et sans danger pour votre famille et vos animaux.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Service Rapide</h3>
              <p className="text-gray-600">
                Intervention rapide et efficace, avec des résultats visibles immédiatement après le traitement.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Prix Compétitifs</h3>
              <p className="text-gray-600">
                Des tarifs transparents et compétitifs, adaptés à tous les budgets sans compromis sur la qualité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Nos Services</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Découvrez notre gamme complète de services de nettoyage professionnel pour tous vos besoins.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 bg-gray-200 relative">
                {/* Remplacer par une vraie image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image Canapé</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Nettoyage de Canapés</h3>
                <p className="text-gray-600 mb-4">
                  Redonnez vie à vos canapés avec notre service de nettoyage en profondeur qui élimine taches, odeurs et acariens.
                </p>
                <Link href="/services#canapes" className="text-green-600 font-medium hover:text-green-700 flex items-center">
                  En savoir plus
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 bg-gray-200 relative">
                {/* Remplacer par une vraie image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image Matelas</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Nettoyage de Matelas</h3>
                <p className="text-gray-600 mb-4">
                  Éliminez les allergènes, acariens et bactéries de votre matelas pour un sommeil plus sain et réparateur.
                </p>
                <Link href="/services#matelas" className="text-green-600 font-medium hover:text-green-700 flex items-center">
                  En savoir plus
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 bg-gray-200 relative">
                {/* Remplacer par une vraie image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image Tapis</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Nettoyage de Tapis et Moquettes</h3>
                <p className="text-gray-600 mb-4">
                  Retrouvez l'éclat et la propreté de vos tapis et moquettes grâce à notre procédé d'extraction en profondeur.
                </p>
                <Link href="/services#tapis" className="text-green-600 font-medium hover:text-green-700 flex items-center">
                  En savoir plus
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 inline-block"
            >
              Voir tous nos services
            </Link>
          </div>
        </div>
      </section>

      {/* Témoignages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Ce que nos clients disent</h2>
          <div className="flex justify-center mb-12">
            <div className="flex items-center">
              <span className="text-yellow-400 text-2xl mr-2">★★★★★</span>
              <span className="text-lg font-semibold">4.9/5</span>
              <span className="text-gray-500 ml-2">(basé sur 120 avis)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sophie Martin</h4>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600">
                "Service impeccable ! Mon canapé est comme neuf, toutes les taches ont disparu. Je recommande vivement Boussoclean pour leur professionnalisme et efficacité."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Thomas Dubois</h4>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600">
                "Équipe très professionnelle et ponctuelle. Le nettoyage de mon matelas a fait une différence incroyable pour mes allergies. Merci !"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Marie Leroy</h4>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600">
                "J'ai fait nettoyer ma moquette qui était très tachée après une fête. Le résultat est bluffant, on dirait qu'elle est neuve !"
              </p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/avis"
              className="text-green-600 font-medium hover:text-green-700 flex items-center justify-center"
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
          <h2 className="text-3xl font-bold mb-4">Prêt à redonner vie à vos meubles ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contactez-nous dès maintenant pour obtenir un devis gratuit et bénéficier de nos services de nettoyage professionnel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold text-lg transition-colors duration-300"
            >
              Demander un devis
            </Link>
            <Link
              href="tel:0123456789"
              className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-md font-semibold text-lg transition-colors duration-300"
            >
              Appeler maintenant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
