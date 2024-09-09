import "chart.js/auto";
import ListePlacesAdmin from "../../pages/ListePlacesAdmin";
import ListeCategories from "../../pages/ListeCategories";
import PropTypes from "prop-types";
import Signalement from "../../components/Signalement";
import UtilisateursAdmin from "./../auth/UtilisateursAdmin";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import ListeReservationsAdmin from "../../pages/ListeReservationsAdmin";
import ListEvents from "../../pages/ListEvents";
import { useNavigate } from "react-router-dom";

const DashboardCard = ({ title, value, icon, color }) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ${color} animate-slideIn`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
          {title}
        </p>
        <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
      <div className={`p-2 rounded-full bg-${color}-100 dark:bg-${color}-900`}>
        <i className={`${icon} text-${color}-600 dark:text-${color}-400`}></i>
      </div>
    </div>
  </div>
);

const QuickActions = () => (
  <div
    id="quick-actions"
    className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-slideIn pt-8 w-full md:w-2/4 lg:w-3/4 xl:w-3/4"
  >
    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
      Actions rapides
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <a
        href="/messages-management"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center flex items-center justify-center"
      >
        <i className="fas fa-envelope mr-2"></i> Voir mes messages
      </a>
      <a
        href="/deposer_categorie"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center flex items-center justify-center"
      >
        <i className="fas fa-plus-circle mr-2"></i> Nouvelle catégorie
      </a>
      <a
        href="/deposer_place"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center flex items-center justify-center"
      >
        <i className="fas fa-plus-circle mr-2"></i> Nouvelle place
      </a>
      <a
        href="/reservations-new"
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center flex items-center justify-center"
      >
        <i className="fas fa-plus-circle mr-2"></i> Nouveau lieu de réservation
      </a>
      <a
        href="/profil-user-update"
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center flex items-center justify-center"
      >
        <i className="fas fa-cog mr-2"></i> Paramètres
      </a>
      <a
        href="/"
        className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center flex items-center justify-center"
      >
        <i className="fas fa-home mr-2"></i> Page d&apos;accueil
      </a>
    </div>
  </div>
);

const DashboardAdminContent = () => {
  const [countPlaces, setCountPlaces] = useState(0);
  const [countMessages, setCountMessages] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { token } = useContext(AuthContext);
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchPlaceCount = async () => {
      if (!user || !user.id) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/places", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        setCountPlaces(response.data.places.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des places", error);
      }
    };

    fetchPlaceCount();
  }, [token, user]);

  useEffect(() => {
    const fetchMessagesCount = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        setCountMessages(response.data.length);

        const userFavoriteMessages = response.data.filter(
          (message) => message.is_favorite === 1
        );

        setFavoriteCount(userFavoriteMessages.length);

        const userReportedMessages = response.data.filter(
          (message) => message.is_report === 1
        );

        setReportCount(userReportedMessages.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages", error);
        if (error.response) {
          console.error("Erreur:", error.response.data);
        }
      }
    };

    fetchMessagesCount();
  }, [token]);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(navigate);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`sidebar fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-6">
          <img
            src="src/images/logo.png"
            alt="UniverDog Logo"
            className="w-20 h-20 mx-auto rounded-full mb-4 logo"
          />
          <h2 className="text-2xl font-bold text-white text-center mb-6 logo-text">
            UniverDog
          </h2>
          <nav className="space-y-4">
            {/* Dashboard Link */}
            <a
              href="#quick-actions"
              className="flex items-center py-2 px-2 text-white hover:bg-gray-700 hover:pr-6 rounded transition duration-200"
            >
              <i className="fas fa-magic fa-fw mr-2"></i>
              <span className="menu-text">Actions rapides</span>
            </a>

            {/* Places Link */}
            <a
              href="#places"
              className="flex items-center py-2 px-2 text-white hover:bg-gray-700 hover:pr-6 rounded transition duration-200"
            >
              <i className="fa fa-address-book fa-fw mr-2"></i>
              <span className="menu-text">Liste places</span>
            </a>

            {/* Users Link */}
            <a
              href="#users"
              className="flex items-center py-2 px-2 text-white hover:bg-gray-700 hover:pr-6 rounded transition duration-200"
            >
              <i className="fa fa-users fa-fw mr-2"></i>
              <span className="menu-text">Utilisateurs</span>
            </a>

            {/* Events Link */}
            <a
              href="#events"
              className="flex items-center py-2 px-2 text-white hover:bg-gray-700 hover:pr-6 rounded transition duration-200"
            >
              <i className="fa fa-sitemap fa-fw mr-2"></i>
              <span className="menu-text">Liste Evénements</span>
            </a>

            {/* Reports Link */}
            <a
              href="#signalements"
              className="flex items-center py-2 px-2 text-white hover:bg-gray-700 hover:pr-6 rounded transition duration-200"
            >
              <i className="fa fa-bell fa-fw mr-2"></i>
              <span className="menu-text">Signalements</span>
            </a>

            {/* Categories Link */}
            <a
              href="#categories"
              className="flex items-center py-2 px-2 text-white hover:bg-gray-700 hover:pr-6 rounded transition duration-200"
            >
              <i className="fa fa-list fa-fw mr-2"></i>
              <span className="menu-text">Gestion Catégories</span>
            </a>

            {/* Reservations Link */}
            <a
              href="#reservations"
              className="flex items-center py-2 px-2 text-white hover:bg-gray-700 hover:pr-6 rounded transition duration-200"
            >
              <i className="fa fa-address-book fa-fw mr-2"></i>
              <span className="menu-text">Lieux de Reservations</span>
            </a>

            {/* Settings Link - Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center py-2 px-2 text-white hover:bg-gray-700 hover:pr-6 rounded transition duration-200"
            >
              <i className="fa fa-sign-out mr-2"></i>
              <span className="menu-text">Quitter</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden dark:bg-gray-900 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Dashboard Admin
            </h1>
            <div className="flex items-center">
              {/* Notification Icon (Currently Non-Functional) */}
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring">
                <i className="fas fa-bell text-xl"></i>
              </button>

              {/* User Profile Icon (Displays User Image) */}
              <button className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring">
                <img
                  src={
                    user.google_id === null && user.image === null
                      ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      : user.image
                      ? `http://127.0.0.1:8000${user.image}`
                      : user.avatar
                  }
                  alt="professionnel"
                  className="w-8 h-8 rounded-full"
                />
              </button>
            </div>
          </div>
        </header>

        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          id="sidebarToggle"
          className="sidebar-toggle bg-gray-800 text-white p-2 rounded-full focus:outline-none absolute top-4 left-4 z-50"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-4">
            <DashboardCard
              title="Les places"
              icon="fa fa-bolt"
              value={countPlaces}
              color="text-blue-600"
            />
            <DashboardCard
              title="Messages"
              icon="fa fa-envelope"
              value={countMessages}
              color="text-green-600"
            />
            <DashboardCard
              title="Favoris"
              icon="fa fa-star"
              value={favoriteCount}
              color="text-yellow-500"
            />
            <DashboardCard
              title="Signalements"
              icon="fa fa-flag"
              value={reportCount}
              color="text-red-600"
            />
          </div>

          {/* Quick Actions Section */}
          <QuickActions />

          {/* Components for Different Sections */}
          <Signalement />
          <UtilisateursAdmin />
          <ListeCategories />
          <ListEvents />
          <ListeReservationsAdmin />
          <ListePlacesAdmin />
        </main>
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
};

export default DashboardAdminContent;
