import Link from "next/link";

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactez-nous</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Nous sommes à votre disposition pour répondre à toutes vos questions et vous proposer un devis gratuit.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Informations de contact */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Téléphone</h3>
                      <p className="text-gray-600 mb-1">01 23 45 67 89</p>
                      <p className="text-gray-500 text-sm">Du lundi au samedi, 8h-20h</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-gray-600">contact@boussoclean.fr</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Adresse</h3>
                      <p className="text-gray-600 mb-1">123 Avenue des Champs-Élysées</p>
                      <p className="text-gray-600">75008 Paris, France</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-2xl font-bold mb-6">Zone d'intervention</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-4">
                      Nous intervenons à Paris et dans toute l'Île-de-France :
                    </p>
                    <ul className="grid grid-cols-2 gap-2 text-gray-600">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Paris (75)
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Seine-et-Marne (77)
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Yvelines (78)
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Essonne (91)
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Hauts-de-Seine (92)
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Seine-Saint-Denis (93)
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Val-de-Marne (94)
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Val-d'Oise (95)
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-2xl font-bold mb-6">Horaires d'intervention</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex justify-between">
                        <span>Lundi - Vendredi</span>
                        <span className="font-medium">8h - 20h</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Samedi</span>
                        <span className="font-medium">9h - 18h</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Dimanche</span>
                        <span className="font-medium">Fermé</span>
                      </li>
                    </ul>
                    <p className="mt-4 text-sm text-gray-500">
                      * Possibilité d'intervention en dehors de ces horaires sur demande.
                    </p>
                  </div>
                </div>
              </div>

              {/* Formulaire de contact */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom *
                      </label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Service souhaité
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Sélectionnez un service</option>
                      <option value="canapes">Nettoyage de canapés</option>
                      <option value="matelas">Nettoyage de matelas</option>
                      <option value="tapis">Nettoyage de tapis et moquettes</option>
                      <option value="voiture">Nettoyage intérieur voiture</option>
                      <option value="mobilier">Nettoyage de mobilier</option>
                      <option value="rideaux">Nettoyage de rideaux et stores</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-1">
                      Adresse d'intervention
                    </label>
                    <input
                      type="text"
                      id="adresse"
                      name="adresse"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required
                    ></textarea>
                  </div>
                  <div className="flex items-start">
                    <input
                      id="rgpd"
                      name="rgpd"
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                      required
                    />
                    <label htmlFor="rgpd" className="ml-2 block text-sm text-gray-700">
                      J'accepte que mes données soient traitées pour permettre à Boussoclean de me recontacter. *
                    </label>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-300"
                    >
                      Envoyer ma demande
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                      * Champs obligatoires
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Nous trouver</h2>
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              {/* Remplacer par une vraie carte Google Maps */}
              <div className="text-gray-400">Carte Google Maps</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Questions fréquentes</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">Combien de temps dure une intervention ?</h3>
              <p className="text-gray-600">
                La durée varie selon le service et la surface à traiter. Pour un canapé standard, comptez environ 1h à 1h30. Pour un matelas, environ 45 minutes. Nous vous indiquons la durée estimée lors de la prise de rendez-vous.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">Quel est le temps de séchage après nettoyage ?</h3>
              <p className="text-gray-600">
                Grâce à notre méthode d'extraction puissante, le temps de séchage est généralement de 2 à 4 heures pour les canapés et matelas, et de 4 à 6 heures pour les tapis et moquettes, selon les conditions ambiantes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">Vos produits sont-ils sans danger pour les enfants et animaux ?</h3>
              <p className="text-gray-600">
                Absolument. Nous utilisons exclusivement des produits écologiques et biodégradables, sans danger pour les enfants, les animaux domestiques et les personnes sensibles ou allergiques.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">Proposez-vous des devis gratuits ?</h3>
              <p className="text-gray-600">
                Oui, tous nos devis sont gratuits et sans engagement. Vous pouvez nous contacter par téléphone, email ou via notre formulaire en ligne pour obtenir un devis personnalisé.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
