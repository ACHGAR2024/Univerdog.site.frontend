import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import Sidebar from "./Sidebar";
import UserDashboard from "./pagesuser/UserDashboard";
import ProfilsDogs from "./pagesuser/ProfilsDogs";
import ServicesVeto from "./pagesuser/ServicesVeto";
import ProfessionnelsCanin from "./pagesuser/ProfessionnelsCanin";
import VenteProduits from "./pagesuser/VenteProduits";
import ConseilsIA from "./pagesuser/ConseilsIA";
import MonProfilUser from "./pagesuser/MonProfilUser";
import VoyagesChiens from "./pagesuser/VoyagesChiens";
import AdministrationDog from "./pagesuser/AdministrationDog";
import DarkModeToggle from "../DarkModeToggle";
import Carte from "./pagesuser/Carte";
import RdvPro from "./pagesuser/RdvPro";

const BASE_URL = "http://127.0.0.1:8000/api/appointments";

const DashboardContent = () => {
  const [appointmentsAwaiting, setAppointmentsAwaiting] = useState(0);
  const { token } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("userdashboard");
  const { logout } = useContext(AuthContext);
  const user = useContext(UserContext);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogout = () => {
    logout();
    window.location.reload();
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchTotalDogUsers = async () => {
      if (!user || !user.id) return;
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/dogs", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const dogsList = response.data
          .filter((dog) => dog.user_id === user.id)
          .map((dog) => ({ id: dog.id, name: dog.name_dog }));
        console.log("Liste des chiens de l'utilisateur", dogsList);
        fetchAppointments(dogsList);
      } catch (error) {
        console.error("Erreur lors de la création de la page", error);
      }
    };

    const fetchAppointments = async (dogsList) => {
      try {
        const response = await axios.get(`${BASE_URL}`);
        const appointmentsData = response.data;
        const awaitingAppointments = appointmentsData.filter(
          (appointment) =>
            appointment.status === "En attente" &&
            dogsList.some((dog) => dog.id === appointment.dog_id)
        );
        console.log("awaitingAppointments ==========>", awaitingAppointments);
        setAppointmentsAwaiting(awaitingAppointments.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous:", error);
      }
    };

    fetchTotalDogUsers();
  }, [user, token]);

  const renderContent = () => {
    switch (currentSection) {
      case "userdashboard":
        return <UserDashboard />;
      case "ProfilsDogs":
        return <ProfilsDogs />;
      case "ServicesVeto":
        return <ServicesVeto />;
      case "Carte":
        return <Carte />;
      case "ProfessionnelsCanin":
        return <ProfessionnelsCanin />;
      case "RdvPro":
        return <RdvPro />;
      case "VenteProduits":
        return <VenteProduits />;
      case "ConseilsIA":
        return <ConseilsIA />;
      case "AdministrationDog":
        return <AdministrationDog />;
      case "VoyagesChiens":
        return <VoyagesChiens />;
      case "MonProfilUser":
        return <MonProfilUser />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <React.Fragment>
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setCurrentSection={setCurrentSection}
        currentSection={currentSection}
      />
      <div className="relative mb-8 text-xs">
        <button
          onClick={toggleSidebar}
          className={`toggle-btn ${
            sidebarOpen ? "toggle-btn-open" : ""
          } bg-white p-2 rounded-full shadow-md focus:outline-none`}
        >
          <i
            className={`fas ${
              sidebarOpen ? "fa-times" : "fa-bars"
            } text-xl text-black`}
          ></i>
        </button>
        <main
          className={`flex-1 p-6 main-content ${
            sidebarOpen ? "main-content-shifted" : ""
          }`}
        >
          <header className="flex justify-between items-center mb-2 dark:text-white">
            <h1 className="text-xl font-bold pl-8 mr-2">Dashboard User</h1>
            <div className="flex items-center">
              <button className="relative" onClick={() => {
                  setCurrentSection("ServicesVeto");
                }}>
                <span className="bg-amber-400 text-black px-2 py-1 rounded-full text-xs absolute opacity-90">
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
                className="ml-4"
                onClick={() => {
                  setCurrentSection("MonProfilUser");
                }}
              >
                <img
                  src={
                    user.google_id === null
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
              <button
                onClick={handleLogout}
                className="ml-4"
              >
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
          <div>{renderContent()}</div>
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
