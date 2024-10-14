import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { UserContext } from "../../../context/UserContext";
import PropTypes from "prop-types";

import React from "react";

const DashboardCard = ({ title, name, icon, change }) => (
  <div className="dashboard-card">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-full ${icon.bg}`}>
        <i className={`fas ${icon.name} text-xl ${icon.color}`}></i>
      </div>
      <span className={`text-sm font-medium ${change.color}`}>
        {change.text}
      </span>
    </div>
    <h3 className="text-2xl font-bold mb-1 dark:text-black">{name}</h3>
    <p className=" text-sm dark:text-black">{title}</p>
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
  <div className="mt-4 bg-white rounded-lg shadow-md p-6 animate-slideIn">
    <h2 className="text-2xl font-bold mb-4 dark:text-black">Actions rapides</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <a
        href="/evenements"
        className="bg-blue-500 hover:bg-blue-600  font-bold py-2 px-4 rounded transition-colors duration-300 text-center"
      >
        <i className="fa fa-plus-circle fa-fw pr-1"></i> Evénements et séjours
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
  const [totalPatients, setUniqueDogs] = useState(0); // Initialisation à 0
  const [appointmentsThisWeek, setAppointmentsThisWeekConfirmed] = useState(0); // Initialisation à 0

  const [totalAppointments, setAppointmentsAwaiting] = useState(0); // Initialisation à 0

  const [totalProfessionals, setTotalProfessionals] = useState(0);
  const { token } = useContext(AuthContext);
  const user = useContext(UserContext);
  const [MyDogs, setMyDogs] = useState([]);

  useEffect(() => {
    const fetchTotalDogUsers = async () => {
      if (!user || !user.id) return;

      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/dogs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const MyDogs = response.data.filter((dog) => dog.user_id === user.id);
        setMyDogs(MyDogs);
        const totalDogs = response.data.filter(
          (dog) => dog.user_id === user.id
        ).length;
        setUniqueDogs(totalDogs);
        const dogsList = response.data
          .filter((dog) => dog.user_id === user.id)
          .map((dog) => ({ id: dog.id, name: dog.name_dog }));

        // Appel de fetchDashboardData avec dogsList
        fetchDashboardData(dogsList);
      } catch (error) {
        console.error("Erreur lors de la création de la page", error);
      }
    };

    const fetchDashboardData = async (dogsList) => {
      try {
        const appointmentsResponse = await axios.get(
          `https://api.univerdog.site/api/appointments`,
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
          (appointment) =>
            appointment.status === "En attente" &&
            dogsList.some((dog) => dog.id === appointment.dog_id)
        );

        setAppointmentsAwaiting(awaitingAppointments.length);

        // Set the total number of appointments this week confirmed
        const thisWeekConfirmedAppointments = appointmentsResponse.data.filter(
          (appointment) =>
            new Date(appointment.date_appointment).getWeekNumber() ===
              new Date().getWeekNumber() &&
            appointment.status === "Confirmé" &&
            dogsList.some((dog) => dog.id === appointment.dog_id)
        ).length;

        setAppointmentsThisWeekConfirmed(thisWeekConfirmedAppointments);
      } catch (error) {
        console.error("Erreur lors de la création de la page", error);
      }
    };

    const fetchTotalProfessionals = async () => {
      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/professionals",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        setTotalProfessionals(response.data.length);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre total de professionnels",
          error
        );
      }
    };
    fetchTotalProfessionals();
    // Assurez-vous d'appeler fetchTotalDogUsers au lieu de fetchDashboardData directement
    fetchTotalDogUsers();
  }, [token, user]);

  return (
    <>
      <React.Fragment>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
          {totalPatients !== undefined && (
            <DashboardCard2
              title="Mes Chiens"
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
            title="Mes RDV prochains"
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

          <DashboardCard2
            title="Professionnels sur le site"
            value={totalProfessionals}
            icon={{
              name: "fa-user-plus",
              bg: "bg-red-100",
              color: "text-red-500",
            }}
            change={{ text: "", color: "text-red-500" }}
          />
        </div>
        <QuickActions />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {MyDogs.map((dog) => (
            <DashboardCard
              key={dog.id}
              title={dog.sex}
              name={dog.name_dog}
              icon={{
                name: "fa-dog",
                bg: "bg-red-100",
                color: "text-red-500",
              }}
              change={{ text: "", color: "text-red-500" }}
            />
          ))}
        </div>
      </React.Fragment>
      <div></div>
    </>
  );
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

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
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

export default UserDashboard;
