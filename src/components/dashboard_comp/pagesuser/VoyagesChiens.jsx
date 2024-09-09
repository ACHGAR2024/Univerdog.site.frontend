import { useState, useEffect } from 'react';
import axios from 'axios';

const VoyagesChiens = () => {
  const [voyages, setVoyages] = useState([]);

  useEffect(() => {
    const fetchVoyages = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/events');
        console.log('Response data:', response.data);
  
        // Access the 'events' array within the response data
        if (Array.isArray(response.data.events)) {
          const filteredVoyages = response.data.events.filter(
            (event) => event.type_event === 'voyage'
          );
          setVoyages(filteredVoyages);
        } else {
          console.error('API response.data.events is not an array:', response.data);
          // Handle the error appropriately
        }
      } catch (error) {
        console.error('Error fetching voyages:', error);
        // Handle the error appropriately
      }
    };
  
    fetchVoyages();
  }, []);

  return (
    <div>


      <h2 className="text-3xl font-bold mb-6 ml-10 flex items-center ">
        <i className="fa-solid fa-suitcase w-6 h-6 mr-2 text-orange-500  "></i>
        &nbsp; Voyages avec Chien
      </h2>
      
      <div className="dashboard-card mb-6 p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center dark:text-black">
          <i className="fa-solid fa-suitcase-rolling mr-2"></i>
          Nos prochaines excursions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 dark:text-black">
          {voyages.map((voyage) => (
            <div
              key={voyage.id}
              className="bg-white p-4 rounded-lg shadow transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <img
                src={voyage.photo_event}
                alt={voyage.title_event}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h4 className="font-bold mb-2">{voyage.title_event}</h4>
              <p className="text-sm text-gray-600 mb-2">
                {voyage.content_event}
              </p>
              <p className="text-sm font-bold mb-2">
                <i className="fa-solid fa-calendar-days mr-2"></i>
                Date: {new Date(voyage.event_date).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' })} - {new Date(voyage.event_end_date).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
              </p>
              <p className="text-sm font-bold mb-2">
                <i className="fa-solid fa-euro-sign mr-2"></i>
                Prix: {voyage.price_event}
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full flex items-center justify-center">
                <a href={voyage.link_event} target="_blank" rel="noopener noreferrer">
                <i className="fa-solid fa-calendar-check mr-2"></i>
                Réserver
                </a>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="dashboard-card p-6 shadow-lg rounded-lg dark:text-black">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <i className="fa-solid fa-paw mr-2"></i>
          Pourquoi voyager avec votre chien ?
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li><i className="fa-solid fa-check-circle mr-2 text-green-600"></i>Renforce le lien entre vous et votre compagnon</li>
          <li><i className="fa-solid fa-check-circle mr-2 text-green-600"></i>Découvrez des lieux adaptés aux chiens</li>
          <li><i className="fa-solid fa-check-circle mr-2 text-green-600"></i>Activités spécialement conçues pour les chiens</li>
          <li><i className="fa-solid fa-check-circle mr-2 text-green-600"></i>Rencontrez d&apos;autres propriétaires de chiens</li>
          <li><i className="fa-solid fa-check-circle mr-2 text-green-600"></i>Expériences inoubliables pour vous et votre animal</li>
        </ul>
      </div>
      
      <div className="dashboard-card mt-6 p-6 shadow-lg rounded-lg dark:text-black">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <i className="fa-solid fa-map-marked-alt mr-2"></i>
          Préparez votre voyage
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold mb-2"><i className="fa-solid fa-file-alt mr-2"></i>Documents nécessaires :</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>Carnet de santé à jour</li>
              <li>Passeport pour animal de compagnie (pour l&apos;étranger)</li>
              <li>Certificat de bonne santé (moins de 10 jours)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2"><i className="fa-solid fa-box-open mr-2"></i>À ne pas oublier :</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>Nourriture habituelle</li>
              <li>Gamelles et bouteille d&apos;eau</li>
              <li>Laisse et collier avec médaille d&apos;identification</li>
              <li>Sacs pour déjections</li>
              <li>Jouets préférés</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoyagesChiens;
