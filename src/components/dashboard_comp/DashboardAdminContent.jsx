import React from "react";
import "chart.js/auto";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import DarkModeToggle from "./../DarkModeToggle";

import Signalement from "./pageadmin/Signalement";

import ListePlacesAdmin from "./pageadmin/ListePlacesAdmin";
import ListeCategories from "./pageadmin/ListeCategories";
import ListeReservationsAdmin from "./pageadmin/ListeReservationsAdmin";
import ListEvents from "./pageadmin/ListEvents";

import UtilisateursAdmin from "./../auth/UtilisateursAdmin";
import ProductList from "./pageadmin/ProductList";

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
        href="/deposer_specialite"
        className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center flex items-center justify-center"
      >
        <i className="fas fa-plus-circle mr-2"></i> Nouvelle spécialité
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
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [countPlaces, setCountPlaces] = useState(0);
  const [countMessages, setCountMessages] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);

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

  React.useEffect(() => {
    const sidebar = document.getElementById("sidebar");
    const menuTexts = document.querySelectorAll(".menu-text");
    const logo = document.querySelector(".logo");
    const logoText = document.querySelector(".logo-text");

    if (isSidebarOpen) {
      sidebar.style.width = "256px";
      menuTexts.forEach((text) => (text.style.display = "inline"));
      logo.style.display = "block";
      logoText.style.display = "block";
    } else {
      sidebar.style.width = "80px";
      sidebar.style.transition = "width 0.3s ease-in-out";
      sidebar.style.paddingTop = "40px";
      sidebar.style.paddingRight = "60px";
      menuTexts.forEach((text) => (text.style.display = "none"));
      logo.style.display = "none";
      logoText.style.display = "none";
    }
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100  ">
      {/* Sidebar */}
      <aside
        id="sidebar"
        className=" sidebar fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 "
      >
        <div className="mt-5 pl-6">
          
          <h2 className="text-xl font-bold text-white text-center mb-6 logo-text">
            <img
            src="src/images/logo.png"
            alt="UniverDog Logo"
            className="w-28  mx-auto rounded-full mb-4 logo"
          />
          </h2>
          <nav className="space-y-1 text-xs">
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
              className="flex items-center py-2 px-2 text-white hover:bg-gray-700 hover:pr-1 rounded transition duration-200"
            >
              <i className="fa fa-sign-out mr-2"></i>
              <span className="menu-text ">Quitter</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden h-auto ${
          isSidebarOpen ? "ml-64" : "ml-20 "
        }`}
      >
        {/* Header */}

        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          id="sidebarToggle"
          className="fixed sidebar-toggle bg-gray-800 text-white p-2 rounded-full focus:outline-none  top-4 left-4 z-50"
        >
          <i className="fas fa-bars"></i>
        </button>
        <header className="bg-white shadow-sm dark:bg-slate-500 dark:text-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
              Dashboard Admin
            </h1>
            <div className="flex items-center">
              {/* Notification Icon (Currently Non-Functional) */}
              <button className="mr-2 text-gray-500 hover:text-gray-700  focus:outline-none focus:ring">
                <i className="fas fa-bell text-xl dark:text-gray-300 dark:hover:text-white"></i>
              </button>
<DarkModeToggle />
              {/* User Profile Icon (Displays User Image) */}
              <button className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring">
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
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white text-xs"
              >
                <i className="fas fa-sign-out-alt mr-1 ml-4 text-xl text-gray-950 hover:text-red-500 dark:text-white dark:hover:text-red-400"></i> 
              </button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-black p-4 pl-10">
          {/* Quick Actions */}
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
          <ProductList />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              {
                icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
                title: "Total Places",
                value: "248",
                color: "blue",
              },
              {
                icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                title: "Total Users",
                value: "12,361",
                color: "green",
              },
              {
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                title: "Events This Month",
                value: "42",
                color: "yellow",
              },
              {
                icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9",
                title: "Active Reports",
                value: "7",
                color: "red",
              },
            ].map((item, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center">
                  <div
                    className={`p-3 rounded-full bg-${item.color}-500 text-white mr-4`}
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
                        d={item.icon}
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      {item.title}
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid  gap-6 dark:text-white">
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
              <ul className="space-y-4">
                {[
                  { color: "blue", text: 'New place added: "Doggy Daycare"' },
                  {
                    color: "green",
                    text: 'User "JohnDoe" updated their profile',
                  },
                  {
                    color: "yellow",
                    text: 'New event created: "Puppy Playtime"',
                  },
                  {
                    color: "red",
                    text: 'Report resolved: "Inappropriate content"',
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span
                      className={`w-2 h-2 bg-${item.color}-500 rounded-full mr-2`}
                    ></span>
                    <span className="text-sm text-gray-600">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            

            {/* Components for Different Sections */}
            <Signalement />
            <UtilisateursAdmin />
            <ListeCategories />
            <ListEvents />
            <ListeReservationsAdmin />
            <ListePlacesAdmin />
          </div>
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
  categories : PropTypes.array.isRequired
};

export default DashboardAdminContent;
