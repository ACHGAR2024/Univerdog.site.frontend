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
import useFetchProfessionalId from "./pagespro/hooks/proFetchProfessionalId";

const BASE_URL = "https://api.univerdog.site/api/appointments_pro";

const DashboardProfessionnelContent = () => {
  const professionalId = useFetchProfessionalId();
  const [appointments, setAppointments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("ProDashboard");
  const [appointmentsAwaiting, setAppointmentsAwaiting] = useState(0);
  const { logout } = useContext(AuthContext);
  const user = useContext(UserContext);
  const [isLoadingProfessionalId, setIsLoadingProfessionalId] = useState(true); // Loading state

  // Function to fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (professionalId !== null) {
          // Check that professionalId is loaded
          const response = await axios.get(`${BASE_URL}/${professionalId}`);
          const appointmentsData = response.data;

          // Filter and count awaiting appointments
          const awaitingCount = appointmentsData.filter(
            (appointment) => appointment.status === "En attente"
          ).length;

          setAppointments(appointmentsData); // Store all appointments
          setAppointmentsAwaiting(awaitingCount); // Store the number of awaiting appointments
        }
      } catch (error) {
        console.error("Error when fetching appointments:", error);
      }
    };

    // Call the fetchAppointments function
    fetchAppointments();
  }, [professionalId]);

  useEffect(() => {
    // Load professionalId
    const fetchProId = async () => {
      setIsLoadingProfessionalId(false);
    };

    fetchProId();
  }, []);

  useEffect(() => {
    if (!isLoadingProfessionalId) {
      // Only launch the fetch if professionalId is loaded
    }
  }, [professionalId, isLoadingProfessionalId, appointments, setAppointments]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogout = () => {
    logout();
    window.location.href = "/";
    //(appointments);
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
              <button
                onClick={() => {
                  setCurrentSection("AppointmentsManagerPro");
                }}
                className="relative hover: transition duration-200 mr-2"
              >
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
                      ? `https://api.univerdog.site${user.image}`
                      : user.avatar
                  }
                  alt="User avatar"
                  className="w-10 h-10 rounded-full"
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

          {/* Main content */}
          {renderContent()}
        </main>
      </div>
    </React.Fragment>
  );
};

DashboardProfessionnelContent.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
  }).isRequired,
};

export default DashboardProfessionnelContent;
