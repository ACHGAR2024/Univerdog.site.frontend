import PropTypes from "prop-types";
import { useEffect, useState } from "react";


const Sidebar = ({
  isOpen = false,
  toggleSidebar,
  setCurrentSection,
  currentSection,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth >= 768); // Définissez la largeur pour le mobile ici
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className={`sidebar ${isOpen ? "dark:bg-slate-200 dark:text-black" : "sidebar-hidden"}`}>
      <div className="p-3 dark:bg-slate-200 dark:text-black text-xs">
        <img src="src/images/logo.png" alt="logo" className="mx-auto w-20 z-50" />
        <h2 className="text-md font-bold mb-6 text-center">UniverDog</h2>
        <nav>
          <ul className="left-0">
            <li className="mb-1">
              <button
                className={`${
                  currentSection === "userdashboard"
                    ? "css-1x3v3vy flex items-center  px-4 py-2 rounded-lg"
                    : "flex items-center  hover:bg-gray-700 hover:dark:bg-slate-50 px-4 py-2 rounded-lg transition duration-200"
                }`}
                onClick={() => {
                  setCurrentSection("userdashboard");
                  if (!isMobile) toggleSidebar();
                }}
              >
                <i className="fa-solid fa-paw mr-3"></i>
                Tableau de bord
              </button>
            </li>
            <li className="mb-1">
              <button
                className={`${
                  currentSection === "ProfilsDogs"
                    ? "css-1x3v3vy flex items-center  px-4 py-2 rounded-lg"
                    : "flex items-center  hover:bg-gray-700 hover:dark:bg-slate-50 px-4 py-2 rounded-lg transition duration-200"
                }`}
                onClick={() => {
                  setCurrentSection("ProfilsDogs");
                  if (!isMobile) toggleSidebar();
                }}
              >
                <i className="fa-solid fa-shield-dog mr-3"></i>
                Mes chiens
              </button>
            </li>
            <li className="mb-1">
              <button
                className={`${
                  currentSection === "ServicesVeto"
                    ? "css-1x3v3vy flex items-center  px-4 py-2 rounded-lg"
                    : "flex items-center  hover:bg-gray-700 hover:dark:bg-slate-50 px-4 py-2 rounded-lg transition duration-200"
                }`}
                onClick={() => {
                  setCurrentSection("ServicesVeto");
                  if (!isMobile) toggleSidebar();
                }}
              >
                <i className="fa-solid fa-user-doctor mr-3"></i>
                Services Vétérinaires
              </button>
            </li>
            <li className="mb-1">
              <button
                className={`${
                  currentSection === "Carte"
                    ? "css-1x3v3vy flex items-center  px-4 py-2 rounded-lg"
                    : "flex items-center  hover:bg-gray-700 hover:dark:bg-slate-50 px-4 py-2 rounded-lg transition duration-200"
                }`}
                onClick={() => {
                  setCurrentSection("Carte");
                  if (!isMobile) toggleSidebar();
                }}
              >
                <i className="fa-solid fa-route mr-3"></i>
                Lieux utile
              </button>
            </li>
            <li className="mb-1">
              <button
                className={`${
                  currentSection === "ProfessionnelsCanin"
                    ? "css-1x3v3vy flex items-center  px-4 py-2 rounded-lg"
                    : "flex items-center  hover:bg-gray-700 hover:dark:bg-slate-50 px-4 py-2 rounded-lg transition duration-200"
                }`}
                onClick={() => {
                  setCurrentSection("ProfessionnelsCanin");
                  if (!isMobile) toggleSidebar();
                }}
              >
                <i className="fa-solid fa-route mr-3"></i>
                Professionnels canin
              </button>
            </li>
            <li className="mb-1">
              <button
                className={`${
                  currentSection === "VenteProduits"
                    ? "css-1x3v3vy flex items-center  px-4 py-2 rounded-lg"
                    : "flex items-center  hover:bg-gray-700 hover:dark:bg-slate-50 px-4 py-2 rounded-lg transition duration-200"
                }`}
                onClick={() => {
                  setCurrentSection("VenteProduits");
                  if (!isMobile) toggleSidebar();
                }}
              >
                <i className="fa-solid fa-bag-shopping mr-3"></i>
                Nos produits phares
              </button>
            </li>
            <li className="mb-1">
              <button
                className={`${
                  currentSection === "ConseilsIA"
                    ? "css-1x3v3vy flex items-center  px-4 py-2 rounded-lg"
                    : "flex items-center  hover:bg-gray-700 hover:dark:bg-slate-50 px-4 py-2 rounded-lg transition duration-200"
                }`}
                onClick={() => {
                  setCurrentSection("ConseilsIA");
                  if (!isMobile) toggleSidebar();
                }}
              >
                <i className="fas fa-language mr-3"></i>
                Conseils avec IA
              </button>
            </li>
            <li className="mb-1">
              <button
                className={`${
                  currentSection === "AdministrationDog"
                    ? "css-1x3v3vy flex items-center  px-4 py-2 rounded-lg"
                    : "flex items-center  hover:bg-gray-700 hover:dark:bg-slate-50 px-4 py-2 rounded-lg transition duration-200"
                }`}
                onClick={() => {
                  setCurrentSection("AdministrationDog");
                  if (!isMobile) toggleSidebar();
                }}
              >
                <i className="fa-solid fa-passport mr-3"></i>
                Aide Administrative
              </button>
            </li>
            <li className="mb-1">
              <button
                className={`${
                  currentSection === "VoyagesChiens"
                    ? "css-1x3v3vy flex items-center  px-4 py-2 rounded-lg"
                    : "flex items-center  hover:bg-gray-700 hover:dark:bg-slate-50 px-4 py-2 rounded-lg transition duration-200"
                }`}
                onClick={() => {
                  setCurrentSection("VoyagesChiens");
                  if (!isMobile) toggleSidebar();
                }}
              >
                <i className="fa-solid fa-plane mr-3"></i>
                Voyages avec chien
              </button>
            </li>
            <li className="mb-1">
              <button
                className={`${
                  currentSection === "MonProfilUser"
                    ? "css-1x3v3vy flex items-center  px-4 py-2 rounded-lg"
                    : "flex items-center  hover:bg-gray-700 hover:dark:bg-slate-50 px-4 py-2 rounded-lg transition duration-200"
                }`}
                onClick={() => {
                  setCurrentSection("MonProfilUser");
                  if (!isMobile) toggleSidebar();
                }}
              >
                <i className="fa-solid fa-user mr-3"></i>
                Mon profil
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  setCurrentSection: PropTypes.func.isRequired,
  currentSection: PropTypes.string.isRequired,
};

export default Sidebar;
