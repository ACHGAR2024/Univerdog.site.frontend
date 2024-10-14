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
      setIsMobile(window.innerWidth >= 768); // Set mobile width here
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`sidebar ${
        isOpen ? "dark:bg-slate-300 dark:text-black" : "sidebar-hidden"
      }`}
    >
      <div className="p-3 dark:bg-slate-300 dark:text-black text-md">
        <a href="/">
          <img
            src="src/images/logo.png"
            alt="logo"
            className="mx-auto w-20 z-50"
          />
        </a>
        <h2 className="text-xl font-bold mb-6 text-center">UniverDog</h2>
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
                <i className="fa-solid fa-user-tie mr-3"></i>
                Tableau de bord
              </button>
            </li>

            <li className="mb-1">
              <button
                className={`${
                  currentSection === "DogsPro"
                    ? "css-1x3v3vy flex items-center  px-4 py-2 rounded-lg"
                    : "flex items-center  hover:bg-gray-700 hover:dark:bg-slate-50 px-4 py-2 rounded-lg transition duration-200"
                }`}
                onClick={() => {
                  setCurrentSection("DogsPro");
                  if (!isMobile) toggleSidebar();
                }}
              >
                <i className="fa-solid fa-dog mr-3"></i>
                Chiens
              </button>
            </li>
            <li className="mb-1">
              <button
                className={`${
                  currentSection === "AppointmentsPro"
                    ? "css-1x3v3vy flex items-center  px-4 py-2 rounded-lg"
                    : "flex items-center  hover:bg-gray-700 hover:dark:bg-slate-50 px-4 py-2 rounded-lg transition duration-200"
                }`}
                onClick={() => {
                  setCurrentSection("AppointmentsPro");
                  if (!isMobile) toggleSidebar();
                }}
              >
                <i className="fa-regular fa-calendar mr-3"></i>
                Calendrier RDV
              </button>
            </li>
            <li className="mb-1">
              <button
                className={`${
                  currentSection === "AppointmentsManagerPro"
                    ? "css-1x3v3vy flex items-center  px-4 py-2 rounded-lg"
                    : "flex items-center  hover:bg-gray-700 hover:dark:bg-slate-50 px-4 py-2 rounded-lg transition duration-200"
                }`}
                onClick={() => {
                  setCurrentSection("AppointmentsManagerPro");
                  if (!isMobile) toggleSidebar();
                }}
              >
                <i className="fa-regular fa-calendar-check mr-3"></i>
                Gestion RDV
              </button>
            </li>
            <li className="mb-1">
              <button
                className={`${
                  currentSection === "TimeCalandarPro"
                    ? "css-1x3v3vy flex items-center  px-4 py-2 rounded-lg"
                    : "flex items-center  hover:bg-gray-700 hover:dark:bg-slate-50 px-4 py-2 rounded-lg transition duration-200"
                }`}
                onClick={() => {
                  setCurrentSection("TimeCalandarPro");
                  if (!isMobile) toggleSidebar();
                }}
              >
                <i className="fa-solid fa-calendar-days mr-3"></i>
                Disponibilités
              </button>
            </li>
            <li className="mb-1">
              <button
                className={`${
                  currentSection === "MonProfilPro"
                    ? "css-1x3v3vy flex items-center  px-4 py-2 rounded-lg"
                    : "flex items-center  hover:bg-gray-700 hover:dark:bg-slate-50 px-4 py-2 rounded-lg transition duration-200"
                }`}
                onClick={() => {
                  setCurrentSection("MonProfilPro");
                  if (!isMobile) toggleSidebar();
                }}
              >
                <i className="fa-solid fa-id-card mr-3"></i>
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
