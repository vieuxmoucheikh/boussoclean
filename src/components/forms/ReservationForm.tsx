'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type Service = {
  id: string;
  nom: string;
  prix: number;
  unite: string | null;
};

const DEFAULT_SERVICES: Service[] = [
  { id: 'srv_canape', nom: 'Nettoyage de Canapé', prix: 50, unite: 'par place' },
  { id: 'srv_matelas', nom: 'Nettoyage de Matelas', prix: 40, unite: 'par matelas' },
  { id: 'srv_tapis', nom: 'Nettoyage de Tapis et Moquettes', prix: 12, unite: 'par m²' },
  { id: 'srv_voiture', nom: 'Nettoyage Intérieur Voiture', prix: 80, unite: 'par véhicule' },
  { id: 'srv_mobilier', nom: 'Nettoyage de Mobilier', prix: 35, unite: 'par pièce' },
  { id: 'srv_rideaux', nom: 'Nettoyage de Rideaux et Stores', prix: 15, unite: 'par m²' }
];

type ReservationFormProps = {
  services?: Service[];
};

export default function ReservationForm({ services: initialServices }: ReservationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState<Service[]>(initialServices || DEFAULT_SERVICES);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    codePostal: '',
    ville: '',
    date: '',
    heure: '',
    message: '',
    selectedServices: [] as string[]
  });
  
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  
  // Fetch services from API if no initial services provided
  useEffect(() => {
    if (!initialServices) {
      const fetchServices = async () => {
        try {
          const response = await fetch('/api/services');
          
          if (!response.ok) {
            throw new Error('Failed to fetch services');
          }
          
          const data = await response.json();
          if (data && data.length > 0) {
            setServices(data);
          }
        } catch (error) {
          console.error('Error fetching services:', error);
          // Fall back to default services if fetch fails
        }
      };
      
      fetchServices();
    }
  }, [initialServices]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const serviceId = e.target.value;
    const isChecked = e.target.checked;
    
    if (isChecked) {
      setFormData({
        ...formData,
        selectedServices: [...formData.selectedServices, serviceId]
      });
    } else {
      setFormData({
        ...formData,
        selectedServices: formData.selectedServices.filter(id => id !== serviceId)
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple validation
    if (formData.selectedServices.length === 0) {
      setFormError('Veuillez sélectionner au moins un service');
      return;
    }
    
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Send data to API
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la soumission');
      }
      
      const data = await response.json();
      
      setFormSuccess('Votre demande de réservation a été envoyée avec succès. Nous vous contacterons rapidement pour confirmer votre rendez-vous.');
      
      // Redirect to confirmation page after a short delay
      setTimeout(() => {
        router.push('/reservation/confirmation');
      }, 2000);
      
      // Reset form 
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        adresse: '',
        codePostal: '',
        ville: '',
        date: '',
        heure: '',
        message: '',
        selectedServices: []
      });
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setFormError(error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Form Error */}
      {formError && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{formError}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Form Success */}
      {formSuccess && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{formSuccess}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-gray-900">Vos coordonnées</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
            <input 
              type="text" 
              id="nom" 
              name="nom" 
              value={formData.nom}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              required 
            />
          </div>
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom</label>
            <input 
              type="text" 
              id="prenom" 
              name="prenom" 
              value={formData.prenom}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              required 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              required 
            />
          </div>
          <div>
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Téléphone</label>
            <input 
              type="tel" 
              id="telephone" 
              name="telephone" 
              value={formData.telephone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              required 
            />
          </div>
        </div>
      </div>
      
      {/* Address */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-gray-900">Adresse d'intervention</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">Adresse</label>
            <input 
              type="text" 
              id="adresse" 
              name="adresse" 
              value={formData.adresse}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              required 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="codePostal" className="block text-sm font-medium text-gray-700">Code postal</label>
              <input 
                type="text" 
                id="codePostal" 
                name="codePostal" 
                value={formData.codePostal}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                required 
              />
            </div>
            <div>
              <label htmlFor="ville" className="block text-sm font-medium text-gray-700">Ville</label>
              <input 
                type="text" 
                id="ville" 
                name="ville" 
                value={formData.ville}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                required 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Service Selection */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-gray-900">Services souhaités</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div key={service.id} className="relative border rounded-lg p-4 flex items-start">
              <input 
                id={service.id} 
                name="services" 
                value={service.id} 
                type="checkbox" 
                checked={formData.selectedServices.includes(service.id)}
                onChange={handleServiceChange}
                className="h-4 w-4 mt-1 border-gray-300 rounded text-blue-600 focus:ring-blue-500" 
              />
              <label htmlFor={service.id} className="ml-3 block text-sm font-medium text-gray-700">
                {service.nom}
                <span className="block text-sm text-gray-500">{service.prix}€ {service.unite}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Date and Time Selection */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-gray-900">Date et heure souhaitées</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input 
              type="date" 
              id="date" 
              name="date" 
              value={formData.date}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              required 
            />
          </div>
          <div>
            <label htmlFor="heure" className="block text-sm font-medium text-gray-700">Heure</label>
            <select 
              id="heure" 
              name="heure" 
              value={formData.heure}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
              required
            >
              <option value="">Sélectionnez une heure</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Additional Information */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Informations complémentaires</label>
        <textarea 
          id="message" 
          name="message" 
          rows={4} 
          value={formData.message}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-center">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-lg w-full sm:w-auto text-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Traitement en cours...' : 'Réserver mon service'}
        </button>
      </div>
    </form>
  );
}
