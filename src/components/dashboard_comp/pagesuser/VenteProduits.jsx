

const VenteProduits = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 ml-10 flex items-center">
        <i className="fa-solid fa-store w-6 h-6 mr-2 text-orange-400"></i>
       &nbsp; Nos produits phares
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="dashboard-card p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGRvZyUyMGZvb2R8ZW58MHx8fHwxNjk0MjY2NzAz&ixlib=rb-4.0.3&q=80&w=400" 
            alt="Croquettes premium" 
            className="w-full h-48 object-cover mb-4 rounded"
          />
          <h3 className="text-xl font-bold mb-2 flex items-center dark:text-black">
            <i className="fa-solid fa-bone mr-2"></i>Croquettes premium
          </h3>
          <p className="text-gray-600 mb-4">Alimentation équilibrée pour chiens adultes</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full flex items-center justify-center">
            <i className="fa-solid fa-cart-plus mr-2"></i>Ajouter au panier
          </button>
        </div>

        <div className="dashboard-card p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
            alt="Jouet interactif" 
            className="w-full h-48 object-cover mb-4 rounded"
          />
          <h3 className="text-xl font-bold mb-2 flex items-center dark:text-black">
            <i className="fa-solid fa-paw mr-2"></i>Jouet interactif
          </h3>
          <p className="text-gray-600 mb-4">Stimule l&#39;intelligence de votre chien</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full flex items-center justify-center">
            <i className="fa-solid fa-cart-plus mr-2"></i>Ajouter au panier
          </button>
        </div>

        <div className="dashboard-card p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
            alt="Collier GPS" 
            className="w-full h-48 object-cover mb-4 rounded"
          />
          <h3 className="text-xl font-bold mb-2 flex items-center dark:text-black">
            <i className="fa-solid fa-map-marker-alt mr-2"></i>Collier GPS
          </h3>
          <p className="text-gray-600 mb-4">Suivez votre chien en temps réel</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full flex items-center justify-center">
            <i className="fa-solid fa-cart-plus mr-2"></i>Ajouter au panier
          </button>
        </div>

        <div className="dashboard-card p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden">
          <img 
            src=" https://images.unsplash.com/photo-1568572933382-74d440642117?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80" 
            alt="Shampoing naturel" 
            className="w-full h-48 object-cover mb-4 rounded"
          />
          <h3 className="text-xl font-bold mb-2 flex items-center dark:text-black">
            <i className="fa-solid fa-soap mr-2"></i>Shampoing naturel
          </h3>
          <p className="text-gray-600 mb-4">Pour un pelage doux et brillant</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full flex items-center justify-center">
            <i className="fa-solid fa-cart-plus mr-2"></i>Ajouter au panier
          </button>
        </div>

      </div>
    </div>
  );
};

export default VenteProduits;
