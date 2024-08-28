import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
{
  /* Import the navigation bar at the top */
}
function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  {
    /* Toggle the menu on click */
  }
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  {
    /* Close the menu on click */
  }
  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      {/* The navigation bar at the top */}
      <nav className="flex justify-between items-center bg-opacity-30 bg-slate-700 pr-5 fixed w-full text-xs poetsen-one-regular z-50">
        {/* The logo and the menu icon */}
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

        {/* The menu items */}
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
          <div className="arrow-right-start-on-rectangle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-orange_univerdog animate-pulse hover:text-jaune_univerdog_01 hover:animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </div>
          <Link
            to="/login"
            className={`text-gray-300 hover:text-white text-xs ${
              location.pathname === "/login" ? "nav-active" : ""
            }`}
          >
            Connexion
          </Link>
          <Link
            to="/signup"
            className={`text-gray-300 hover:text-white text-xs ${
              location.pathname === "/signup" ? "nav-active" : ""
            }`}
          >
            Inscription
          </Link>
          <Link
            to="/logout"
            className={`text-gray-300 hover:text-white text-xs ${
              location.pathname === "/logout" ? "nav-active" : ""
            }`}
          >
            Deconnexion
          </Link>
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

export default Nav;
