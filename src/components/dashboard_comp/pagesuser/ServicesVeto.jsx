

const ServicesVeto = () => {
    return (
        <div>
           <h2 className="text-3xl font-bold mb-6 ml-10 flex items-center">
           <i className="fa-solid fa-heart-pulse text-red-600">&nbsp;</i>
                <span className="mr-2"> Services vétérinaires </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="dashboard-card p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center">
                        <i className="fa-solid fa-stethoscope text-red-600 mr-2"></i>
                        Consultation générale
                    </h3>
                    <p className="text-gray-600 mb-4">Examen complet de santé pour votre animal</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center">
                        <i className="fa-solid fa-calendar mr-2"></i>
                        Prendre RDV
                    </button>
                </div>
                <div className="dashboard-card p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center">
                        <i className="fa-solid fa-syringe text-red-600 mr-2"></i>
                        Vaccination
                    </h3>
                    <p className="text-gray-600 mb-4">Mise à jour des vaccins essentiels</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center">
                        <i className="fa-solid fa-calendar mr-2"></i>
                        Prendre RDV
                    </button>
                </div>
                <div className="dashboard-card p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center">
                        <i className="fa-solid fa-hospital text-red-600 mr-2"></i>
                        Chirurgie
                    </h3>
                    <p className="text-gray-600 mb-4">Interventions chirurgicales sur demande</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center">
                        <i className="fa-solid fa-phone mr-2"></i>
                        Contacter un spécialiste
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServicesVeto;
