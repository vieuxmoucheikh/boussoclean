import Link from "next/link";

export default function APropos() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">À Propos de Boussoclean</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Découvrez notre histoire, nos valeurs et notre engagement pour un nettoyage écologique et efficace.
          </p>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                {/* Remplacer par une vraie image */}
                <div className="text-gray-400">Image Fondateur</div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
                <p className="text-gray-600 mb-4">
                  Boussoclean a été fondée en 2018 par Mohamed Bousso, passionné par l'écologie et l'innovation dans le domaine du nettoyage. Après plusieurs années d'expérience dans le secteur, Mohamed a constaté que de nombreux services de nettoyage utilisaient des produits chimiques nocifs pour l'environnement et la santé.
                </p>
                <p className="text-gray-600">
                  C'est ainsi qu'est née Boussoclean, avec une mission claire : proposer des services de nettoyage professionnels et efficaces tout en respectant l'environnement et la santé de nos clients. Depuis, notre entreprise n'a cessé de croître, tout en restant fidèle à ses valeurs fondatrices.
                </p>
              </div>
            </div>

            {/* Notre Mission */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-center">Notre Mission</h2>
              <div className="bg-gray-50 p-8 rounded-lg">
                <p className="text-gray-600 text-center text-xl italic">
                  "Offrir des services de nettoyage d'excellence avec des produits écologiques, pour un intérieur sain et un environnement préservé."
                </p>
              </div>
            </div>

            {/* Nos Valeurs */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Nos Valeurs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Écologie</h3>
                  <p className="text-gray-600">
                    Nous utilisons exclusivement des produits écologiques et biodégradables pour préserver notre planète et votre santé.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Qualité</h3>
                  <p className="text-gray-600">
                    Nous nous engageons à fournir un service d'excellence avec des résultats visibles dès la première intervention.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Confiance</h3>
                  <p className="text-gray-600">
                    Nous établissons des relations durables avec nos clients basées sur la transparence, l'honnêteté et le respect.
                  </p>
                </div>
              </div>
            </div>

            {/* Notre Équipe */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Notre Équipe</h2>
              <p className="text-gray-600 text-center mb-8">
                Boussoclean, c'est avant tout une équipe de professionnels passionnés et formés aux techniques de nettoyage les plus avancées.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-64 bg-gray-200 relative">
                    {/* Remplacer par une vraie image */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">Photo Équipe 1</div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-1">Mohamed Bousso</h3>
                    <p className="text-green-600 mb-4">Fondateur & Directeur</p>
                    <p className="text-gray-600">
                      Expert en techniques de nettoyage écologique avec plus de 10 ans d'expérience dans le secteur.
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-64 bg-gray-200 relative">
                    {/* Remplacer par une vraie image */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">Photo Équipe 2</div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-1">Sophie Martin</h3>
                    <p className="text-green-600 mb-4">Responsable Clientèle</p>
                    <p className="text-gray-600">
                      Passionnée par la satisfaction client et le service de qualité, Sophie veille à ce que chaque intervention réponde à vos attentes.
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-64 bg-gray-200 relative">
                    {/* Remplacer par une vraie image */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">Photo Équipe 3</div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-1">Thomas Dubois</h3>
                    <p className="text-green-600 mb-4">Expert Technique</p>
                    <p className="text-gray-600">
                      Spécialiste des techniques de nettoyage avancées, Thomas forme et supervise nos équipes d'intervention.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nos Certifications */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Nos Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                  <div className="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center mr-4">
                    {/* Remplacer par un vrai logo */}
                    <div className="text-gray-400 text-xs">Logo Cert 1</div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Certification Éco-Responsable</h3>
                    <p className="text-gray-600 text-sm">
                      Nos produits et méthodes respectent les normes environnementales les plus strictes.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                  <div className="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center mr-4">
                    {/* Remplacer par un vrai logo */}
                    <div className="text-gray-400 text-xs">Logo Cert 2</div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Certification Qualité Service</h3>
                    <p className="text-gray-600 text-sm">
                      Notre engagement pour l'excellence et la satisfaction client est reconnu par les organismes professionnels.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                  <div className="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center mr-4">
                    {/* Remplacer par un vrai logo */}
                    <div className="text-gray-400 text-xs">Logo Cert 3</div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Certification Sécurité</h3>
                    <p className="text-gray-600 text-sm">
                      Nos techniques et produits sont testés et approuvés pour garantir la sécurité de votre foyer.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                  <div className="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center mr-4">
                    {/* Remplacer par un vrai logo */}
                    <div className="text-gray-400 text-xs">Logo Cert 4</div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Certification Formation</h3>
                    <p className="text-gray-600 text-sm">
                      Tous nos techniciens sont formés et certifiés aux dernières techniques de nettoyage professionnel.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nos Engagements */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center">Nos Engagements</h2>
              <div className="bg-gray-50 p-8 rounded-lg">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-semibold mb-1">Satisfaction garantie</h3>
                      <p className="text-gray-600">
                        Si vous n'êtes pas satisfait de notre service, nous revenons gratuitement pour rectifier le travail.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-semibold mb-1">Respect de l'environnement</h3>
                      <p className="text-gray-600">
                        Nous utilisons uniquement des produits biodégradables et écologiques pour minimiser notre impact environnemental.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-semibold mb-1">Transparence totale</h3>
                      <p className="text-gray-600">
                        Nos tarifs sont clairs et sans surprise. Vous savez exactement ce que vous payez avant l'intervention.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-semibold mb-1">Formation continue</h3>
                      <p className="text-gray-600">
                        Nous investissons dans la formation régulière de nos équipes pour rester à la pointe des techniques de nettoyage.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-semibold mb-1">Soutien aux initiatives locales</h3>
                      <p className="text-gray-600">
                        Nous soutenons activement les initiatives environnementales et sociales dans notre communauté.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à nous faire confiance ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Découvrez la différence Boussoclean et rejoignez nos clients satisfaits.
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
