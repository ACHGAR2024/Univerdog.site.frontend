import { useContext, /*useState*/  } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";

const SidebarAdmin = ({
  isSidebarOpen,
  setCurrentSection,
  currentSection,
  //toggleSidebar,
}) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  //const [isMobile] = useState(false);
  const handleLogout = () => {
    logout(navigate);
  };

  const handleNavigation = (section) => {
    setCurrentSection(section);
    //if (!isSidebarOpen) toggleSidebar();
  };
  return (
    <aside
      id="sidebar"
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="mt-5 pl-6">
        <div className="flex justify-center mb-5">
          <img
            src="src/images/logo.png"
            alt="UniverDog Logo"
            className=" mr-5 w-20 h-14 rounded-full"
          />
        </div>
        <nav className="space-y-1 text-xs">
          <button
            className={`${
              currentSection === "AdminDashboard"
                ? "css-1x3v3vy flex items-center px-2 py-2 rounded-lg"
                : "flex items-center hover:bg-gray-700 hover:dark:bg-slate-5000 px-2 py-2 rounded-lg transition duration-200"
            }`}
            
            onClick={() => {
              setCurrentSection("AdminDashboard");
              //if (!isMobile) toggleSidebar(false);
            }}
          >
            <i className="fas fa-magic fa-fw mr-1"></i>
            <span className={`${isSidebarOpen ? "inline" : "hidden"} ml-2`}>
              Actions rapides
            </span>
          </button>

          <button
            className={`${
              currentSection === "ListeCategories"
                ? "css-1x3v3vy flex items-center px-2 py-2 rounded-lg"
                : "flex items-center hover:bg-gray-700 hover:dark:bg-slate-500 px-2 py-2 rounded-lg transition duration-200"
            }`}
            onClick={() => {
              setCurrentSection("ListeCategories");
              //if (!isMobile) toggleSidebar(false);
            }}
          >
            <i className="fa fa-list fa-fw mr-2"></i>
            <span className={`${isSidebarOpen ? "inline" : "hidden"} ml-1`}>
              Catégories
            </span>
          </button>

          <button
            className={`${
              currentSection === "ListePlacesAdmin"
                ? "css-1x3v3vy flex items-center px-2 py-2 rounded-lg"
                : "flex items-center hover:bg-gray-700 hover:dark:bg-slate-500 px-2 py-2 rounded-lg transition duration-200"
            }`}
            onClick={() => handleNavigation("ListePlacesAdmin")}
          >
            <i className="fa-solid fa-map-location mr-2"></i>
            <span className={`${isSidebarOpen ? "inline" : "hidden"} ml-2`}>
              Lieux Professionnels
            </span>
          </button>

          <button
            className={`${
              currentSection === "UtilisateursAdmin"
                ? "css-1x3v3vy flex items-center px-2 py-2 rounded-lg"
                : "flex items-center hover:bg-gray-700 hover:dark:bg-slate-500 px-2 py-2 rounded-lg transition duration-200"
            }`}
            onClick={() => handleNavigation("UtilisateursAdmin")}
          >
            <i className="fa fa-users fa-fw mr-2"></i>
            <span className={`${isSidebarOpen ? "inline" : "hidden"} ml-2`}>
              Gestions utilisateurs
            </span>
          </button>

          <button
            className={`${
              currentSection === "ListEvents"
                ? "css-1x3v3vy flex items-center px-2 py-2 rounded-lg"
                : "flex items-center hover:bg-gray-700 hover:dark:bg-slate-500 px-2 py-2 rounded-lg transition duration-200"
            }`}
            onClick={() => handleNavigation("ListEvents")}
          >
            <i className="fa fa-sitemap fa-fw mr-2"></i>
            <span className={`${isSidebarOpen ? "inline" : "hidden"} ml-2`}>
              Événements
            </span>
          </button>
          <button
            className={`${
              currentSection === "ListeCategoriesProducts"
                ? "css-1x3v3vy flex items-center px-2 py-2 rounded-lg"
                : "flex items-center hover:bg-gray-700 hover:dark:bg-slate-500 px-2 py-2 rounded-lg transition duration-200"
            }`}
            onClick={() => {
              setCurrentSection("ListeCategoriesProducts");
              //if (!isMobile) toggleSidebar(false);
            }}
          >
            <i className="fa fa-list-alt fa-fw mr-2"></i>
            <span className={`${isSidebarOpen ? "inline" : "hidden"} ml-1`}>
              Catégories de produits
            </span>
          </button>

          <button
            className={`${
              currentSection === "ProductList"
                ? "css-1x3v3vy flex items-center px-2 py-2 rounded-lg"
                : "flex items-center hover:bg-gray-700 hover:dark:bg-slate-500 px-2 py-2 rounded-lg transition duration-200"
            }`}
            onClick={() => handleNavigation("ProductList")}
          >
            <i className="fa fa-shopping-cart fa-fw mr-2"></i>
            <span className={`${isSidebarOpen ? "inline" : "hidden"} ml-2`}>
              Produits phares
            </span>
          </button>

          <button
            className={`${
              currentSection === "Signalement"
                ? "css-1x3v3vy flex items-center px-2 py-2 rounded-lg"
                : "flex items-center hover:bg-gray-700 hover:dark:bg-slate-500 px-2 py-2 rounded-lg transition duration-200"
            }`}
            onClick={() => handleNavigation("Signalement")}
          >
            <i className="fa fa-bell fa-fw mr-2"></i>
            <span className={`${isSidebarOpen ? "inline" : "hidden"} ml-2`}>
              Signalements
            </span>
          </button>

          <button
            className={`${
              currentSection === "ListeReservationsAdmin"
                ? "css-1x3v3vy flex items-center px-2 py-2 rounded-lg"
                : "flex items-center hover:bg-gray-700 hover:dark:bg-slate-500 px-2 py-2 rounded-lg transition duration-200"
            }`}
            onClick={() => handleNavigation("ListeReservationsAdmin")}
          >
            <i className="fa fa-calendar fa-fw mr-2"></i>
            <span className={`${isSidebarOpen ? "inline" : "hidden"} ml-2`}>
              Lieux de réservations
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center py-2 px-2 text-white hover:bg-gray-700 hover:pr-6 rounded transition duration-200"
          >
            <i className="fa fa-sign-out fa-fw mr-2"></i>
            <span className={`${isSidebarOpen ? "inline" : "hidden"} ml-2`}>
              Quitter
            </span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

// Define prop types for validation
SidebarAdmin.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setCurrentSection: PropTypes.func.isRequired,
  currentSection: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default SidebarAdmin;
