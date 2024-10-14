import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { UserContext } from "../../../context/UserContext";
import PropTypes from "prop-types";
import ListePlaces from "../../../pages/ListePlaces ";
import ListeSpecialty from "./ListeSpecialty";
import ListeBusiness from "./ListeBusiness";
import useFetchProfessionalId from "./hooks/proFetchProfessionalId";
import React from "react";

const DashboardCard = ({ title, icon, value, color }) => (
  <div
    className={`bg-white rounded-lg shadow-md p-6 ${color} animate-slideIn hover:shadow-lg transition-shadow duration-300`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium uppercase">{title}</p>
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
      <span className={`text-sm font-medium ${change.color}`}>
        {change.text}
      </span>
    </div>
    <h3 className="text-2xl font-bold mb-1 dark:text-black">{value}</h3>
    <p className=" text-sm dark:text-black">{title}</p>
  </div>
);

const QuickActions = () => (
  <div className="mt-8 bg-white rounded-lg shadow-md p-6 animate-slideIn">
    <h2 className="text-xl font-bold mb-4 dark:text-black">
      Veuillez suivre les étapes ci-dessous pour compléter votre profil
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <a
        href="/deposer_lieu_pro"
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center flex items-center justify-center"
      >
        <span className="text-xl bg-white text-black font-extrabold py-1 px-3 rounded-3xl mr-2">
          1
        </span>
        <i className="fas fa-plus-circle mr-2"></i> Nouvelle adresse
      </a>
      <a
        href="/deposer_professional"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center flex items-center justify-center"
      >
        <span className="text-xl bg-white text-black font-extrabold py-1 px-3 rounded-3xl mr-2">
          2
        </span>
        <i className="fa fa-plus-circle pr-1"></i> Societé
      </a>
      <a
        href="/deposer_specialite"
        className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center flex items-center justify-center"
      >
        <span className="text-xl bg-white text-black font-extrabold py-1 px-3 rounded-3xl mr-2">
          3
        </span>
        <i className="fas fa-plus-circle mr-2"></i> Nouvelle spécialité
      </a>
      <a
        href="/profil-pro-update"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center flex items-center justify-center"
      >
        <span className="text-xl bg-white text-black font-extrabold py-1 px-3 rounded-3xl mr-2">
          4
        </span>
        <i className="fa fa-cog fa-fw pr-1"></i> Mettre a jour mes informations
      </a>

      <a
        href="/messages-management"
        className="bg-green-500 hover:bg-green-600  font-bold py-2 px-4 rounded transition-colors duration-300 text-center"
      >
        <i className="fa fa-envelope fa-fw pr-1"></i> Voir mes messages
      </a>

      <a
        href="/aide_pro"
        className="bg-purple-500 hover:bg-purple-600  font-bold py-2 px-4 rounded transition-colors duration-300 text-center"
      >
        <i className="fa fa-question-circle fa-fw pr-1"></i> Aide
      </a>
    </div>
  </div>
);

const ProDashboard = () => {
  const [countPlaces, setCountPlaces] = useState(0);
  const [countMessages, setCountMessages] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);

  const [totalPatients, setUniqueDogs] = useState(0);
  const [appointmentsThisWeek, setAppointmentsThisWeekConfirmed] = useState(0);

  const [professionalsOnSite, setProfessionalsOnSite] = useState(0);
  const [totalAppointments, setAppointmentsAwaiting] = useState(0);

  const { token } = useContext(AuthContext);
  const user = useContext(UserContext);

  const professionalId = useFetchProfessionalId();

  useEffect(() => {
    const fetchPlaceCount = async () => {
      if (!user || !user.id) return;

      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/places",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

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
        const response = await axios.get(
          "https://api.univerdog.site/api/messages",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        const placesResponse = await axios.get(
          "https://api.univerdog.site/api/places",
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

        const userMessages = response.data.filter((message) =>
          userPlaces.some((place) => message.place_id === place.id)
        );

        setCountMessages(userMessages.length);

        const userFavoriteMessages = userMessages.filter(
          (message) => message.is_favorite === 1
        );

        setFavoriteCount(userFavoriteMessages.length);

        const userReportedMessages = userMessages.filter(
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

    const fetchDashboardData = async () => {
      if (!professionalId) return;

      try {
        const professionalsResponse = await axios.get(
          "https://api.univerdog.site/api/professionals",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        setProfessionalsOnSite(professionalsResponse.data.length);
        //("pro_id ==========>", professionalId);
        const appointmentsResponse = await axios.get(
          `https://api.univerdog.site/api/appointments_pro/${professionalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        // Set the total number of appointments awaiting
        const awaitingAppointments = appointmentsResponse.data.filter(
          (appointment) => appointment.status === "En attente"
        );
        setAppointmentsAwaiting(awaitingAppointments.length);

        // Set the total number of appointments this week confirmed
        const thisWeekConfirmedAppointments = appointmentsResponse.data.filter(
          (appointment) =>
            new Date(appointment.date_appointment).getWeekNumber() ===
              new Date().getWeekNumber() && appointment.status === "Confirmé"
        ).length;
        setAppointmentsThisWeekConfirmed(thisWeekConfirmedAppointments);

        // Set the total number of unique dogs
        const uniqueDogs = [
          ...new Set(
            appointmentsResponse.data.map((appointment) => appointment.dog_id)
          ),
        ];
        setUniqueDogs(uniqueDogs.length);
      } catch (error) {
        console.error("Erreur lors de la création de la page", error);
      }
    };

    fetchMessagesCount();
    fetchDashboardData();
  }, [token, professionalId, user]);

  return (
    <>
      <React.Fragment>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Mes adresses"
            icon="fa fa-map-location"
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
            title="Lieux Favoris"
            icon="fa fa-star"
            value={favoriteCount}
            color="text-yellow-600"
          />
          <DashboardCard
            title="Signalements"
            icon="fa fa-flag"
            value={reportCount}
            color="text-red-600"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
          {totalPatients !== undefined && (
            <DashboardCard2
              title="Total patients"
              value={totalPatients}
              icon={{
                name: "fa-dog",
                bg: "bg-blue-100",
                color: "text-blue-500",
              }}
              change={{ text: "", color: "text-green-500" }}
            />
          )}

          <DashboardCard2
            title="Mes RDV prochains de cette semaine"
            value={appointmentsThisWeek}
            icon={{
              name: "fa-calendar",
              bg: "bg-green-100",
              color: "text-green-500",
            }}
            change={{ text: "", color: "text-green-500" }}
          />

          {totalAppointments !== undefined && (
            <DashboardCard2
              title="RDV en attente"
              value={totalAppointments}
              icon={{
                name: "fa-bell",
                bg: "bg-yellow-100",
                color: "text-yellow-500",
              }}
              change={{ text: "", color: "text-green-500" }}
            />
          )}
          {professionalsOnSite !== undefined && (
            <DashboardCard2
              title="Professionnels sur le site"
              value={professionalsOnSite}
              icon={{
                name: "fa-user-plus",
                bg: "bg-red-100",
                color: "text-red-500",
              }}
              change={{ text: "", color: "text-red-500" }}
            />
          )}
        </div>
        <QuickActions />
        <ListeBusiness userId={user.id} />
        <ListeSpecialty userId={user.id} />

        <ListePlaces userId={user.id} />
      </React.Fragment>
      <div></div>
    </>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

DashboardCard2.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.shape({
    bg: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  change: PropTypes.shape({
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

Date.prototype.getWeekNumber = function () {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Set the date to the nearest Thursday (current date + 4 - current day number, making Sunday = 7)
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  // Get first day of the year
  const yearStart = new Date(date.getFullYear(), 0, 1);
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  return weekNo;
};

export default ProDashboard;
