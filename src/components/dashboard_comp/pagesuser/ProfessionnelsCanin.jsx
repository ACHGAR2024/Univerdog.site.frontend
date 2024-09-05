

const ProfessionnelsCanin = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 ml-10 flex items-center">
        <i className="fa-solid fa-dog w-6 h-6 mr-2 text-orange-500"></i>
        &nbsp;Professionnels canins
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="dashboard-card p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden">
          <img 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
            alt="Dr. Smith" 
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-bold mb-2 text-center dark:text-black">
            <i className="fa-solid fa-user-md mr-2"></i>Dr. Smith
          </h3>
          <p className="text-gray-600 mb-4 text-center">Vétérinaire généraliste</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full flex items-center justify-center">
            <i className="fa-solid fa-eye mr-2"></i>Voir profil
          </button>
        </div>
        
        <div className="dashboard-card p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden">
          <img 
            src="https://randomuser.me/api/portraits/women/44.jpg" 
            alt="Lisa Brown" 
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-bold mb-2 text-center dark:text-black">
            <i className="fa-solid fa-paw mr-2"></i>Lisa Brown
          </h3>
          <p className="text-gray-600 mb-4 text-center">Comportementaliste canin</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full flex items-center justify-center">
            <i className="fa-solid fa-eye mr-2"></i>Voir profil
          </button>
        </div>

        <div className="dashboard-card p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden">
          <img 
            src="https://randomuser.me/api/portraits/men/36.jpg" 
            alt="Mike Johnson" 
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-bold mb-2 text-center dark:text-black">
            <i className="fa-solid fa-scissors mr-2"></i>Mike Johnson
          </h3>
          <p className="text-gray-600 mb-4 text-center">Toiletteur professionnel</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full flex items-center justify-center">
            <i className="fa-solid fa-eye mr-2"></i>Voir profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionnelsCanin;
