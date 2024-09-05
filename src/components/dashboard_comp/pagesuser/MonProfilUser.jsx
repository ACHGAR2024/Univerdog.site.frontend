import { useContext, useState, useEffect } from 'react';

import { UserContext } from "../../../context/UserContext";

const MonProfilUser = () => {
  const [setImageURL] = useState(null);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(false);

  const user = useContext(UserContext);


  useEffect(() => {
    if (user && user.image) {
      setImageURL(`http://127.0.0.1:8000${user.image}`);
    }
  }, [user, user.image, setImageURL]);

  if (!user) {
    return <div>Chargement...</div>;
  }

  const handleEmailNotificationsChange = (event) => {
    setEmailNotifications(event.target.checked);
  };

  const handleAppNotificationsChange = (event) => {
    setAppNotifications(event.target.checked);
  };

  return (
    <>
      <div className="relative mb-8 ">
        <div className="h-64 bg-cover bg-center rounded-xl" style={{backgroundImage: `url(https://picsum.photos/seed/${user.id}/1200/400)`}}></div>
        <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 px-6 sm:px-12 flex flex-col sm:flex-row items-center">
          <img 
            src={
              user.google_id === null
                ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                : user.image
                ? `http://127.0.0.1:8000${user.image}`
                : user.avatar
            }
            alt="Photo de profil" 
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg" 
          />
          <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left bg-slate-300 bg-opacity-50 rounded-lg p-4 ">
            <h2 className="text-2xl font-bold text-gray-800 opacity-100">{user.name || "Nom de l'utilisateur"}</h2>
            <p className="text-gray-600 dark:text-white ">
              {user.role === "admin" ? "Administrateur" : user.role === "user" ? "Utilisateur" : user.role === "professionnel" || "Professionnel"}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-auto flex space-x-2">
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition duration-200">
              <i className="fas fa-desktop mr-2"></i>
              Application
            </button>
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition duration-200">
              <i className="fas fa-envelope mr-2"></i>
              Message
            </button>
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition duration-200">
              <i className="fas fa-cog mr-2"></i>
              Paramètres
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 dark:text-black">
        <div className="dashboard-card">
          <h3 className="text-xl font-semibold mb-4">
            <i className="fas fa-cogs mr-2"></i>
            Paramètres de la Plateforme
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">COMPTE</h4>
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  className="form-checkbox h-5 w-5 text-blue-600" 
                  checked={emailNotifications}
                  onChange={handleEmailNotificationsChange}
                />
                <span>Me notifier par e-mail lorsqu&apos;une personne me suit</span>
              </label>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">APPLICATION</h4>
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  className="form-checkbox h-5 w-5 text-blue-600" 
                  checked={appNotifications}
                  onChange={handleAppNotificationsChange}
                />
                <span>Nouvelle lancements et projets</span>
              </label>
            </div>
          </div>
        </div>
        <div className="dashboard-card ">
          <h3 className="text-xl font-semibold mb-4">
            <i className="fas fa-user-circle mr-2"></i>
            Informations du Profil
          </h3>
          <p className="text-gray-600 mb-4">
            Salut, je suis {user.name || "Nom de l'utilisateur"}. Décisions : Si vous ne pouvez pas décider, la réponse est non. Si deux chemins également difficiles, choisissez celui qui est le plus douloureux à court terme (l&apos;évitement de la douleur crée une illusion d&apos;égalité).
          </p>
          <div className="space-y-2">
            <p><i className="fas fa-user mr-2"></i><strong>Nom complet :</strong> {user.name || "Nom de l'utilisateur"}</p>
            <p><i className="fas fa-mobile-alt mr-2"></i><strong>Téléphone :</strong> {user.phone || "Non spécifié"}</p>
            <p><i className="fas fa-envelope mr-2"></i><strong>Email :</strong> {user.email || "Non spécifié"}</p>
            <p><i className="fas fa-map-marker-alt mr-2"></i><strong>Localisation :</strong> {user.address || "Non spécifié"}</p>
          </div>
          <button className="mt-4 text-blue-600 font-medium">
            <i className="fas fa-edit mr-2"></i>
            Modifier
          </button>
        </div>
      </div>
      <div className="dashboard-card mt-6 dark:text-black">
        <h3 className="text-xl font-semibold mb-4">
          <i className="fas fa-comments mr-2"></i>
          Conversations
        </h3>
        <div className="space-y-4">
          {[
            { name: "Sophie B.", message: "Bonjour ! J'ai besoin de plus d'informations..", img: "https://randomuser.me/api/portraits/women/44.jpg" },
            { name: "Anne Marie", message: "Travail impressionnant, pouvez-vous..", img: "https://randomuser.me/api/portraits/women/45.jpg" },
            { name: "Ivan", message: "Concernant les fichiers que je peux..", img: "https://randomuser.me/api/portraits/men/46.jpg" },
            { name: "Peterson", message: "Passez une excellente après-midi..", img: "https://randomuser.me/api/portraits/men/47.jpg" },
          ].map((conversation, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={conversation.img} alt={conversation.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium">{conversation.name}</p>
                  <p className="text-sm text-gray-600">{conversation.message}</p>
                </div>
              </div>
              <button className="text-blue-600 font-medium">
                <i className="fas fa-reply mr-1"></i>
                Répondre
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MonProfilUser;
