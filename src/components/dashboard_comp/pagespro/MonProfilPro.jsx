import { useContext, useState, useEffect } from "react";

import { UserContext } from "../../../context/UserContext";
import UserProfileUpdate from "../../auth/UserProfileUpdate";
import MessagesManagement from "../../../pages/MessagesManagement";

const MonProfilPro = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);

  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

  const user = useContext(UserContext);

  useEffect(() => {
    if (user && user.image) {
      setImageUrl(`https://api.univerdog.site${user.image}`);
    }
  }, [user, user.image, user.id, imageUrl]);

  if (!user) {
    return <div>Chargement...</div>;
  }

  const handleEmailNotificationsChange = (event) => {
    setEmailNotifications(event.target.checked);
  };

  // Function to open the modal window
  const handleOpenUpdateProfileModal = () => {
    setShowUpdateProfileModal(true);
  };

  // Function to close the modal window
  const handleCloseUpdateProfileModal = () => {
    setShowUpdateProfileModal(false);
  };

  return (
    <>
      <div className="relative mb-8 ">
        <div
          className="h-64 bg-cover bg-center rounded-xl"
          style={{
            backgroundImage: `url(https://picsum.photos/seed/${user.id}/1200/400)`,
          }}
        ></div>
        <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 px-6 sm:px-12 flex flex-col sm:flex-row items-center">
          <img
            src={
              user.image === null
                ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                : user.image
                ? `https://api.univerdog.site${user.image}`
                : user.avatar
            }
            alt="Photo de profil"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left bg-slate-300 bg-opacity-50 rounded-lg p-4 ">
            <h2 className="text-2xl font-bold text-gray-800 opacity-100">
              {user.name || "Nom de l'utilisateur"}
            </h2>
            <p className="text-gray-600 dark:text-white ">
              {user.role === "admin"
                ? "Administrateur"
                : user.role === "user"
                ? "Utilisateur"
                : user.role === "professionnel" || "Professionnel"}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-auto flex space-x-2">
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition duration-200">
              <a href="#conversations">
                <i className="fas fa-envelope mr-2"></i>
                Messages
              </a>
            </button>
            {/* Replace Link with a button that opens the modal window */}
            <button
              onClick={handleOpenUpdateProfileModal} // Call the function to open the modal
              className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition duration-200"
            >
              <i className="fas fa-cog mr-2"></i>
              Paramètres
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-32 md:mt-20 dark:text-black">
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
                <span>Me notifier par e-mail</span>
              </label>
            </div>
          </div>
        </div>
        <div className="dashboard-card ">
          <h3 className="text-xl font-semibold mb-4">
            <i className="fas fa-user-circle mr-2"></i>
            Informations du Profil
          </h3>

          <div className="space-y-2">
            <p>
              <i className="fas fa-user mr-2"></i>
              <strong>Nom complet :</strong>{" "}
              {user.name || "Nom de l'utilisateur"}
            </p>
            <p>
              <i className="fas fa-mobile-alt mr-2"></i>
              <strong>Téléphone :</strong> {user.phone || "Non spécifié"}
            </p>
            <p>
              <i className="fas fa-envelope mr-2"></i>
              <strong>Email :</strong> {user.email || "Non spécifié"}
            </p>
            <p>
              <i className="fas fa-map-marker-alt mr-2"></i>
              <strong>Localisation :</strong> {user.address || "Non spécifié"}
            </p>
            <p>
              <i className="fas fa-map mr-2"></i>
              <strong>Code postale :</strong>{" "}
              {user.postal_code || "Non spécifié"}
            </p>
          </div>
          {/* You can also use the button to open the modal window here */}
          <button
            onClick={handleOpenUpdateProfileModal}
            className="mt-4 text-blue-600 font-medium"
          >
            <i className="fas fa-edit mr-2"></i>
            Modifier
          </button>
        </div>
      </div>
      <div className="dashboard-card mt-6 dark:text-black">
        <h3 className="text-xl font-semibold mb-4">
          <i className="fas fa-comments mr-2"></i>
          Messages
        </h3>
        <div id="conversations" className="space-y-4">
          <MessagesManagement />
        </div>
      </div>

      {/* Modal window for updating profile */}
      {showUpdateProfileModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              x
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 sm:p-6 ">
                <div className="flex justify-end">
                  {" "}
                  <button
                    onClick={handleCloseUpdateProfileModal}
                    className="mt-4 text-red-600 font-bold  rounded focus:outline-none focus:shadow-outline"
                  >
                    <i className="fas fa-times mr-2 text-2xl"></i>
                  </button>
                </div>
                {/* Content of the modal window */}
                <UserProfileUpdate />
                {/* Button to close the modal window */}
                <button
                  onClick={handleCloseUpdateProfileModal}
                  className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MonProfilPro;
