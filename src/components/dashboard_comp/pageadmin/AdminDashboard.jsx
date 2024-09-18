import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { UserContext } from "../../../context/UserContext";
import PropTypes from "prop-types";
import MessagesAdmin from "./MessagesAdmin";

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



const AdminDashboard = () => {
  const [countDogs, setCountDogs] = useState(0);
  const [countMessages, setCountMessages] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const [countPlaces, setCountPlaces] = useState(0);
  const [professionalsOnSite, setProfessionalsOnSite] = useState(0); // Initialisation à 0
  const [totalAppointments, setAppointmentsAwaiting] = useState(0); // Initialisation à 0
  const [Appointments, setAppointments] = useState(0); // Initialisation à 0

  const { token } = useContext(AuthContext);
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchDogCount = async () => {
      if (!user || !user.id) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/dogs", {
          headers: {
            
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        setCountDogs(response.data.length);
        //console.log("Count Places:", response.data.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des chiens", error);
      }
    };

    fetchDogCount();
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
        const responseuserPlaces = await axios.get("http://127.0.0.1:8000/api/places", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const userPlaces = responseuserPlaces.data.places;

        setCountPlaces(userPlaces.length);


        const userMessages = response.data;

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
    const fetchDashboardData = async () => {
    

      try {
        const professionalsResponse = await axios.get(
          "http://127.0.0.1:8000/api/professionals",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        setProfessionalsOnSite(professionalsResponse.data.length);
        
        const appointmentsResponse = await axios.get(
          `http://127.0.0.1:8000/api/appointments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        // Set the total number of appointments awaiting
        // Set the total number of appointments awaiting
        const awaitingAppointments = appointmentsResponse.data.filter(
          (appointment) => appointment.status === "En attente"
        );
        setAppointmentsAwaiting(awaitingAppointments.length);

        // Set the total number of appointments awaiting
        const totalAppointments = appointmentsResponse.data;
        setAppointments(totalAppointments.length);
  
        
  
      } catch (error) {
        console.error("Erreur lors de la création de la page", error);
      }
    };
  
    fetchMessagesCount();
    fetchDashboardData();
    fetchMessagesCount();
  }, [token, user]);


  
  return (
    <>
    <React.Fragment>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <a href="#mesplaces">
          <DashboardCard
            title="Total chiens"
            icon="fa fa-bolt"
            value={countDogs}
            color="text-blue-600"
          />
        </a>
        <DashboardCard
          title="Total Messages"
          icon="fa fa-envelope"
          value={countMessages}
          color="text-green-600"
        />
        <DashboardCard
          title="Total Lieux Favoris"
          icon="fa fa-star"
          value={favoriteCount}
          color="text-yellow-400"
        />
        <DashboardCard
          title="Total Signalements"
          icon="fa fa-flag"
          value={reportCount}
          color="text-red-600"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
        
         <DashboardCard2 
             title="Total Adresses" 
             value={countPlaces} 
             icon={{name: "fa-users", bg: "bg-blue-100", color: "text-blue-500"}}
             change={{text: "", color: "text-green-500"}}
         />
         <DashboardCard2 
             title="Total Rendez-vous" 
             value={Appointments}
             icon={{name: "fa-calendar", bg: "bg-green-100", color: "text-green-500"}}
             change={{text: "", color: "text-green-500"}}
         />
         {totalAppointments !== undefined && (
            <DashboardCard2
              title="Les RDV en attente"
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
      
  <MessagesAdmin />
      
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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


export default AdminDashboard;