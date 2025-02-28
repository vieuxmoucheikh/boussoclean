import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AvisPage() {
  // Ces données seraient normalement récupérées depuis la base de données
  const avis = [
    {
      id: '1',
      nom: 'Sophie Martin',
      note: 5,
      commentaire: 'Service impeccable ! Mon canapé est comme neuf, toutes les taches ont disparu. Je recommande vivement Boussoclean pour leur professionnalisme et efficacité.',
      date: '15 février 2025',
      service: 'Nettoyage de Canapé'
    },
    {
      id: '2',
      nom: 'Thomas Dubois',
      note: 5,
      commentaire: 'Équipe très professionnelle et ponctuelle. Le nettoyage de mon matelas a fait une différence incroyable pour mes allergies. Merci !',
      date: '10 février 2025',
      service: 'Nettoyage de Matelas'
    },
    {
      id: '3',
      nom: 'Marie Leroy',
      note: 5,
      commentaire: 'J\'ai fait nettoyer ma moquette qui était très tachée après une fête. Le résultat est bluffant, on dirait qu\'elle est neuve !',
      date: '5 février 2025',
      service: 'Nettoyage de Tapis/Moquettes'
    },
    {
      id: '4',
      nom: 'Pierre Durand',
      note: 4,
      commentaire: 'Très satisfait du nettoyage de mon canapé en cuir. Les techniciens sont arrivés à l\'heure et ont fait un travail soigné. Je retire une étoile car le séchage a pris plus de temps que prévu.',
      date: '28 janvier 2025',
      service: 'Nettoyage de Canapé'
    },
    {
      id: '5',
      nom: 'Camille Petit',
      note: 5,
      commentaire: 'Service client exceptionnel ! J\'ai eu un problème après le nettoyage et l\'équipe est revenue immédiatement pour le résoudre. Très professionnels.',
      date: '20 janvier 2025',
      service: 'Nettoyage de Rideaux'
    },
    {
      id: '6',
      nom: 'Lucas Bernard',
      note: 5,
      commentaire: 'Le nettoyage de l\'intérieur de ma voiture a dépassé mes attentes. Ils ont réussi à enlever des taches que je pensais permanentes. Bravo !',
      date: '15 janvier 2025',
      service: 'Nettoyage Intérieur Voiture'
    },
  ];

  // Fonction pour afficher les étoiles selon la note
  const renderStars = (note: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < note ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* En-tête de la page */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Avis de nos clients</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez ce que nos clients disent de nos services de nettoyage écologique professionnel.
          </p>
          <div className="flex justify-center mt-6">
            <div className="flex items-center">
              <span className="text-yellow-400 text-2xl mr-2">★★★★★</span>
              <span className="text-lg font-semibold">4.9/5</span>
              <span className="text-gray-500 ml-2">(basé sur 120 avis)</span>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md">Tous les avis</button>
          <button className="bg-white text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md border border-gray-300">Canapés</button>
          <button className="bg-white text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md border border-gray-300">Matelas</button>
          <button className="bg-white text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md border border-gray-300">Tapis/Moquettes</button>
          <button className="bg-white text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md border border-gray-300">Voiture</button>
          <button className="bg-white text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md border border-gray-300">Autres</button>
        </div>

        {/* Liste des avis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {avis.map((avis) => (
            <div key={avis.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">{avis.nom}</h4>
                  <div className="text-xl">{renderStars(avis.note)}</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">&quot;{avis.commentaire}&quot;</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{avis.service}</span>
                <span>{avis.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mb-12">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              Précédent
            </button>
            <button className="px-3 py-2 rounded-md bg-green-600 text-white">1</button>
            <button className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">2</button>
            <button className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">3</button>
            <button className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              Suivant
            </button>
          </nav>
        </div>

        {/* Formulaire pour laisser un avis */}
        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Partagez votre expérience</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="nom"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Votre email"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                Service utilisé
              </label>
              <select
                id="service"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Sélectionnez un service</option>
                <option value="canape">Nettoyage de Canapé</option>
                <option value="matelas">Nettoyage de Matelas</option>
                <option value="tapis">Nettoyage de Tapis/Moquettes</option>
                <option value="voiture">Nettoyage Intérieur Voiture</option>
                <option value="mobilier">Nettoyage de Mobilier</option>
                <option value="rideaux">Nettoyage de Rideaux et Stores</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Votre note
              </label>
              <div className="flex text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="text-gray-300 hover:text-yellow-400 focus:outline-none"
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="commentaire" className="block text-sm font-medium text-gray-700 mb-1">
                Votre commentaire
              </label>
              <textarea
                id="commentaire"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                placeholder="Partagez votre expérience avec notre service..."
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-300"
              >
                Soumettre mon avis
              </button>
            </div>
          </form>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-green-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Prêt à essayer nos services ?</h2>
          <p className="text-lg mb-6">
            Contactez-nous dès maintenant pour obtenir un devis gratuit et bénéficier de notre expertise.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-green-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition-colors duration-300"
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </div>
  );
}
