import React, { useState, useContext } from "react";
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
import DarkModeToggle from "../DarkModeToggle"; // Importez le composant DarkModeToggle

const DashboardContent = () => {
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

  const renderContent = () => {
    switch (currentSection) {
      case "userdashboard":
        return <UserDashboard />;
      case "ProfilsDogs":
        return <ProfilsDogs />;
      case "ServicesVeto":
        return <ServicesVeto />;
      case "ProfessionnelsCanin":
        return <ProfessionnelsCanin />;
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
      <div className="relative mb-8">
        <button
          onClick={toggleSidebar}
          className={`toggle-btn ${
            sidebarOpen ? "toggle-btn-open" : ""
          } bg-white p-2 rounded-full shadow-md  hover: focus:outline-none`}
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
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold  pl-8 mr-2">Dashboard User</h1>
            <div className="flex items-center">
              <button className=" hover: transition duration-200">
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
                className="ml-4  hover:scale-125 transition duration-200"
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
              <div className="ml-4  hover: transition duration-200">
                <DarkModeToggle /> {/* Ajout du DarkModeToggle */}
              </div>
              <button
                onClick={handleLogout}
                className="ml-4  hover: transition duration-200"
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

          {/* Render the current section based on state */}
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
