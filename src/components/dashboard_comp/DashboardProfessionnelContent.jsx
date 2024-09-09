import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import SidebarPro from "./SidebarPro";
import MonProfilPro from "./pagespro/MonProfilPro";
import ProDashboard from "./pagespro/ProDashboard";
import DogsPro from "./pagespro/DogsPro";
import AppointmentsPro from "./pagespro/AppointmentsPro";
import TimeCalandarPro from "./pagespro/TimeCalandarPro";
import AppointmentsManagerPro from "./pagespro/AppointmentsManagerPro";
import DarkModeToggle from "../DarkModeToggle";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/appointments_pro";
const professionalId = 7; // à ajuster dynamiquement si besoin

const DashboardContent = () => {
  const [appointments, setAppointments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("ProDashboard");
  const [appointmentsAwaiting, setAppointmentsAwaiting] = useState(0); // Pour stocker le nombre de RDV en attente
  const { logout } = useContext(AuthContext);
  const user = useContext(UserContext);

  // Fonction pour récupérer les rendez-vous
  const fetchAppointments = async (professionalId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${professionalId}`);
      const appointmentsData = response.data;

      // Filtrer et compter les rendez-vous en attente
      const awaitingCount = appointmentsData.filter(
        (appointment) => appointment.status === "En attente"
      ).length;

      setAppointments(appointmentsData); // Stocker tous les rendez-vous
      setAppointmentsAwaiting(awaitingCount); // Stocker le nombre de RDV en attente
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous:", error);
    }
  };

  useEffect(() => {
    fetchAppointments(professionalId);
  }, []); // Exécuter la récupération des RDV au chargement du composant

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogout = () => {
    logout();
    window.location.href = "/";
    console.log(appointments);
  };

  const renderContent = () => {
    switch (currentSection) {
      case "ProDashboard":
        return <ProDashboard />;
      case "MonProfilPro":
        return <MonProfilPro />;
      case "DogsPro":
        return <DogsPro />;
      case "AppointmentsManagerPro":
        return <AppointmentsManagerPro />;
      case "TimeCalandarPro":
        return <TimeCalandarPro />;
      case "AppointmentsPro":
        return <AppointmentsPro />;
      default:
        return <ProDashboard />;
    }
  };

  return (
    <React.Fragment>
      <SidebarPro
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setCurrentSection={setCurrentSection}
        currentSection={currentSection}
      />
      <div className="relative mb-8 ">
        <button
          onClick={toggleSidebar}
          className={`toggle-btn ${
            sidebarOpen ? "toggle-btn-open" : ""
          } bg-white p-2 rounded-full shadow-md hover: focus:outline-none`}
        >
          <i
            className={`fas ${
              sidebarOpen ? "fa-times" : "fa-bars"
            } text-xl text-black`}
          ></i>
        </button>
        <main
          className={`flex-1 p-6 main-content dark:bg-slate-900   ${
            sidebarOpen ? "main-content-shifted" : ""
          }`}
        >
          <header className="flex justify-between items-center mb-8 dark:text-white">
            <h1 className="text-2xl font-bold pl-8 mr-2">
              Dashboard Professionnelle
            </h1>
            <div className="flex items-center">
              <button className="relative hover: transition duration-200">
                <span className="bg-amber-400 text-black px-2 py-1 rounded-full text-xs absolute  opacity-90">
                  {appointmentsAwaiting}
                </span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <button
                className="ml-4 hover:scale-125 transition duration-200"
                onClick={() => setCurrentSection("MonProfilPro")}
              >
                <img
                  src={
                    user.image === null
                      ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      : user.image
                      ? `http://127.0.0.1:8000${user.image}`
                      : user.avatar
                  }
                  alt="User avatar"
                  className="w-8 h-8 rounded-full"
                />
              </button>
              <div className="ml-4">
                <DarkModeToggle />
              </div>
              <button onClick={handleLogout} className="ml-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </header>

          {/* Contenu principal */}
          {renderContent()}
        </main>
      </div>
    </React.Fragment>
  );
};

DashboardContent.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
  }).isRequired,
};

export default DashboardContent;
