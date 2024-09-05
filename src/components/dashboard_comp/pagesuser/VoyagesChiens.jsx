

const VoyagesChiens = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 ml-10 flex items-center ">
        <i className="fa-solid fa-suitcase w-6 h-6 mr-2 text-orange-500  "></i>
        &nbsp; Voyages pour Chiens
      </h2>
      
      <div className="dashboard-card mb-6 p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center dark:text-black">
          <i className="fa-solid fa-suitcase-rolling mr-2"></i>
          Nos prochaines excursions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 dark:text-black">
          <div className="bg-white p-4 rounded-lg shadow transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Plage Canine" className="w-full h-40 object-cover rounded-lg mb-4" />
           
            <h4 className="font-bold mb-2  ">Week-end à la plage</h4>
            <p className="text-sm text-gray-600 mb-2">Profitez d&apos;un week-end en bord de mer avec votre compagnon à quatre pattes.</p>
            <p className="text-sm font-bold mb-2"><i className="fa-solid fa-calendar-days mr-2"></i>Date: 15-17 Juillet 2023</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full flex items-center justify-center">
              <i className="fa-solid fa-calendar-check mr-2"></i>
              Réserver
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Montagne Canine" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h4 className="font-bold mb-2">Randonnée en montagne</h4>
            <p className="text-sm text-gray-600 mb-2">Une escapade en montagne pour les chiens sportifs et leurs maîtres.</p>
            <p className="text-sm font-bold mb-2"><i className="fa-solid fa-calendar-days mr-2"></i>Date: 5-7 Août 2023</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full flex items-center justify-center">
              <i className="fa-solid fa-calendar-check mr-2"></i>
              Réserver
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Plage Canine" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h4 className="font-bold mb-2">Camping nature</h4>
            <p className="text-sm text-gray-600 mb-2">Un séjour en pleine nature pour se reconnecter avec votre chien.</p>
            <p className="text-sm font-bold mb-2"><i className="fa-solid fa-calendar-days mr-2"></i>Date: 22-24 Septembre 2023</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full flex items-center justify-center">
              <i className="fa-solid fa-calendar-check mr-2"></i>
              Réserver
            </button>
          </div>
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
