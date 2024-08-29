import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import DarkModeToggle from "./DarkModeToggle";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Nav = ({ isAuthenticated }) => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleLogout = () => {
    logout(navigate);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-opacity-30 bg-slate-700 pr-5 fixed w-full text-xs poetsen-one-regular z-50">
        <div className="flex items-center text-orange_univerdog text-lg text-bold">
          <Link
            to="/"
            className={`${location.pathname === "/" ? "hover:text-white" : ""}`}
          >
            <img src="/src/images/logo.png" alt="logo" className="w-20" />
          </Link>
          <span className={location.pathname === "/" ? "invisible" : ""}>
            UniverDog
          </span>
        </div>

        <div className="hidden md:flex gap-4 h-12 items-center">
          <Link
            to="/"
            className={`text-gray-300 hover:text-white text-xs ${
              location.pathname === "/" ? "nav-active" : ""
            }`}
          >
            Accueil
          </Link>
          <Link
            to="/about"
            className={`text-gray-300 hover:text-white text-xs ${
              location.pathname === "/about" ? "nav-active" : ""
            }`}
          >
            A propos
          </Link>
          <Link
            to="/contact"
            className={`text-gray-300 hover:text-white text-xs ${
              location.pathname === "/contact" ? "nav-active" : ""
            }`}
          >
            Contact
          </Link>
          {/* ... other links ... */}
          <DarkModeToggle />

          {/* Conditional rendering for authentication */}
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={`text-gray-300 hover:text-white text-xs ${
                  location.pathname === "/dashboard" ? "nav-active" : ""
                }`}
              >
                Tableau de bord
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white text-xs"
              >
                Deconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-gray-300 hover:text-white text-xs ${
                  location.pathname === "/login" ? "nav-active" : ""
                }`}
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className={`text-gray-300 hover:text-white text-xs ${
                  location.pathname === "/register" ? "nav-active" : ""
                }`}
              >
                Inscription
              </Link>
            </>
          )}
        </div>

        {/* The mobile menu burger */}
        <div className="md:hidden pt-1 pr-0 z-50 hover:animate-spin">
          <button
            className="navbar-burger flex items-center text-white p-3 hover:text-orange-400"
            onClick={toggleMenu}
          >
            <svg
              className="block h-5 w-5 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        {/* The mobile menu */}
        {showMenu && (
          <>
            <div
              className="fixed inset-0 bg-gray-800 opacity-75 z-40"
              onClick={closeMenu}
            ></div>
            <div className="fixed top-0 right-0 w-3/4 max-w-xs h-full z-50 transform transition-transform ease-in-out duration-300 bg-slate-700 bg-opacity-30 p-6 rounded-l-lg">
              <Link
                to="/"
                className={`text-xs block px-4 py-2 text-white bg-gray-800 hover:bg-gray-300 hover:text-sky-600 ${
                  location.pathname === "/" ? "nav-active" : ""
                }`}
                onClick={closeMenu}
              >
                Accueil
              </Link>
              <Link
                to="/about"
                className={`text-xs block px-4 py-2 text-white bg-gray-800 hover:bg-gray-300 hover:text-sky-600 ${
                  location.pathname === "/about" ? "nav-active" : ""
                }`}
                onClick={closeMenu}
              >
                A propos de nous
              </Link>
              <Link
                to="/contact"
                className={`text-xs block px-4 py-2 text-white bg-gray-800 hover:bg-gray-300 hover:text-sky-600 ${
                  location.pathname === "/contact" ? "nav-active" : ""
                }`}
                onClick={closeMenu}
              >
                Contact
              </Link>
              <Link
                to="/login"
                className={`text-xs block px-4 py-2 text-white bg-gray-800 hover:bg-gray-300 hover:text-sky-600 ${
                  location.pathname === "/login" ? "nav-active" : ""
                }`}
                onClick={closeMenu}
              >
                Connexion
              </Link>
            </div>
          </>
        )}
      </nav>
    </>
  );
}

Nav.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Nav;
