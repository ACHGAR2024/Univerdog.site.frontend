import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { UserContext } from "../../../context/UserContext";
import PropTypes from "prop-types";
import ListePlaces from "../../../pages/ListePlaces ";

const DashboardCard = ({ title, icon, value, color }) => (
  <div
    className={`bg-white rounded-lg shadow-md p-6 ${color} animate-slideIn hover:shadow-lg transition-shadow duration-300`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium  uppercase">{title}</p>
        <p className="mt-1 text-3xl font-semibold">{value}</p>
      </div>
      <div
        className={`p-3 rounded-full ${color
          .replace("text-", "bg-")
          .replace("600", "100")}`}
      >
        <i className={`${icon} fa-2x ${color}`}></i>
      </div>
    </div>
  </div>
);
const DashboardCard2 = ({ title, value, icon, change }) => (
  <div className="dashboard-card">
      <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-full ${icon.bg}`}>
              <i className={`fas ${icon.name} text-xl ${icon.color}`}></i>
          </div>
          <span className={`text-sm font-medium ${change.color}`}>{change.text}</span>
      </div>
      <h3 className="text-2xl font-bold mb-1 dark:text-black">{value}</h3>
      <p className=" text-sm dark:text-black">{title}</p>
  </div>
);
const QuickActions = () => (
  <div className="mt-8 bg-white rounded-lg shadow-md p-6 animate-slideIn">
    <h2 className="text-2xl font-bold mb-4 dark:text-black">Actions rapides</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <a
        href="/dogs"
        className="bg-blue-500 hover:bg-blue-600  font-bold py-2 px-4 rounded transition-colors duration-300 text-center"
      >
        <i className="fa fa-plus-circle fa-fw pr-1"></i> Ajouter un chien
      </a>
      <a
        href="/messages-management"
        className="bg-green-500 hover:bg-green-600  font-bold py-2 px-4 rounded transition-colors duration-300 text-center"
      >
        <i className="fa fa-envelope fa-fw pr-1"></i> Voir mes messages
      </a>
      <a
        href="/profil-user-update"
        className="bg-yellow-500 hover:bg-yellow-600  font-bold py-2 px-4 rounded transition-colors duration-300 text-center"
      >
        <i className="fa fa-cog fa-fw pr-1"></i> Mettre a jour mes informations
      </a>
      <a
        href="/aide"
        className="bg-purple-500 hover:bg-purple-600  font-bold py-2 px-4 rounded transition-colors duration-300 text-center"
      >
        <i className="fa fa-question-circle fa-fw pr-1"></i> Aide
      </a>
    </div>
  </div>
);

const UserDashboard = () => {
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

        const userPlaces = response.data.places.filter(
          (place) => place.user_id === user.id
        );

        setCountPlaces(userPlaces.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des places", error);
      }
    };

    fetchPlaceCount();
  }, [token, user]);

  useEffect(() => {
    const fetchMessagesCount = async () => {
      if (!user || !user.id) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        ////console.log('Response Data:', response.data);
        ////console.log('User id:', user.id);

        // Récupérer toutes les places pour cet utilisateur
        const placesResponse = await axios.get(
          "http://127.0.0.1:8000/api/places",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        const userPlaces = placesResponse.data.places.filter(
          (place) => place.user_id === user.id
        );

        //console.log('User Places:', userPlaces);

        const userMessages = response.data.filter((message) =>
          userPlaces.some((place) => message.place_id === place.id)
        );

        //console.log('Filtered Messages:', userMessages);

        setCountMessages(userMessages.length);

        // Filtrer les messages favoris
        const userFavoriteMessages = userMessages.filter(
          (message) => message.is_favorite === 1
        );

        // Compter le nombre de messages favoris
        setFavoriteCount(userFavoriteMessages.length);

        // Filtrer les messages signaleés
        const userReportedMessages = userMessages.filter(
          (message) => message.is_report === 1
        );

        // Compter le nombre de messages signaleés
        setReportCount(userReportedMessages.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages", error);
        if (error.response) {
          console.error("Erreur:", error.response.data);
        }
      }
    };

    fetchMessagesCount();
  }, [token, user]);


  
  return (
    <>
    <React.Fragment>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <a href="#mesplaces">
          <DashboardCard
            title="Mes chiens"
            icon="fa fa-bolt"
            value={countPlaces}
            color="text-blue-600"
          />
        </a>
        <DashboardCard
          title="Messages"
          icon="fa fa-envelope"
          value={countMessages}
          color="text-green-600"
        />
        <DashboardCard
          title="Lieux Favoris"
          icon="fa fa-star"
          value={favoriteCount}
          color="text-yellow-400"
        />
        <DashboardCard
          title="Signalements"
          icon="fa fa-flag"
          value={reportCount}
          color="text-red-600"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
         <DashboardCard2 
             title="Total visiteurs de profil" 
             value="1,524" 
             icon={{name: "fa-users", bg: "bg-blue-100", color: "text-blue-500"}}
             change={{text: "+2.5%", color: "text-green-500"}}
         />
         <DashboardCard2 
             title="Rendez-vous cette semaine" 
             value="42" 
             icon={{name: "fa-calendar", bg: "bg-green-100", color: "text-green-500"}}
             change={{text: "+12%", color: "text-green-500"}}
         />
         <DashboardCard2 
             title="Mes Achats" 
             value="15,230 €" 
             icon={{name: "fa-euro-sign", bg: "bg-yellow-100", color: "text-yellow-500"}}
             change={{text: "+5.2%", color: "text-green-500"}}
         />
         <DashboardCard2 
             title="Professionnels sur le site" 
             value="38" 
             icon={{name: "fa-user-plus", bg: "bg-red-100", color: "text-red-500"}}
             change={{text: "-3.1%", color: "text-red-500"}}
         />
     </div>
      <QuickActions />
      <ListePlaces userId={user.id} />
    </React.Fragment>
     <div>
    
    
 </div>
 </>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
};

DashboardCard2.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bg: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  change: PropTypes.shape({
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserDashboard;
