import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { AuthContext } from "../../../context/AuthContext";
import useFetchProfessionalId from "./hooks/proFetchProfessionalId";

// API base URL
const BASE_URL = "http://127.0.0.1:8000/api/appointments";

// Composant React pour gérer les rendez-vous
const AppointmentsManagerPro = () => {
  const [appointments, setAppointments] = useState([]);
  const [updatedReason, setUpdatedReason] = useState(""); // State for reason input
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null); // Track selected appointment for update
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const { token } = useContext(AuthContext); // Get the token from AuthContext
  const professionalId = useFetchProfessionalId(); // Utilisation correcte du hook dans le composant
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointments(professionalId, token);
        setAppointments(data);
      } catch (error) {
        console.error("Erreur lors du chargement des rendez-vous:", error);
      }
    };
    const loadDogs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/dogs');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données des chiens');
        }
        const dogsData = await response.json();
        setDogs(dogsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des chiens:', error);
      }
    };

    if (professionalId) {
      loadAppointments();
      loadDogs();
    }
  }, [professionalId, token]);

// Récupération des données des chiens
useEffect(() => {
  const loadDogs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/dogs");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données des chiens");
      }
      const dogsData = await response.json();
      setDogs(dogsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données des chiens:", error);
    }
  };

  loadDogs();
}, []);

// Find dog by app.dog_id
const getDogNameById = (dogId) => {
  const dog = dogs.find((d) => d.id === dogId);
  return dog ? dog.name_dog : 'Inconnu'; // Return dog's name or 'Inconnu' if not found
};
  const fetchAppointments = async (professionalId, token) => {
    try {
      const response = await axios.get(
        `${BASE_URL}_pro/${professionalId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous:", error);
      throw error;
    }
  };
  useEffect(() => {
    const checkAppointments = async () => {
      const now = new Date();
      const appointmentsToCancel = appointments.filter(
        (appointment) =>
          new Date(appointment.date_appointment) < now &&
          appointment.status !== "Confirmé"
      );
      for (const appointment of appointmentsToCancel) {
        try {
          await updateAppointment(
            appointment.id,
            { status: "Annulé" },
            token
          );
        } catch (error) {
          console.error(
            "Erreur lors de la mise à jour du rendez-vous :",
            error
          );
        }
      }
    };
    checkAppointments();
  }, [appointments, token]);
  // Fonction pour mettre à jour un rendez-vous
  const updateAppointment = async (appointmentId, updatedData, token) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/${appointmentId}/`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rendez-vous:", error);
      throw error;
    }
  };

  // Fonction pour supprimer un rendez-vous
  const deleteAppointment = async (appointmentId, token) => {
    try {
      await axios.delete(`${BASE_URL}/${appointmentId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du rendez-vous:", error);
      throw error;
    }
  };

  const handleUpdateAppointment = async () => {
    if (!selectedAppointmentId || !updatedReason) return;

    try {
      const updatedAppointment = await updateAppointment(
        selectedAppointmentId,
        { reason: updatedReason },
        token
      );
      setAppointments(
        appointments.map((app) =>
          app.id === selectedAppointmentId ? updatedAppointment : app
        )
      );
      setUpdatedReason(""); // Reset input field after update
      setSelectedAppointmentId(null); // Reset selected appointment
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rendez-vous:", error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await deleteAppointment(id, token);
      setAppointments(appointments.filter((app) => app.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du rendez-vous:", error);
    }
  };

  // Fonction pour confirmer un rendez-vous
  const handleConfirmAppointment = async (id) => {
    try {
      const updatedAppointment = await updateAppointment(
        id,
        { status: "Confirmé" },
        token
      );
      setAppointments(
        appointments.map((app) => (app.id === id ? updatedAppointment : app))
      );
    } catch (error) {
      console.error("Erreur lors de la confirmation du rendez-vous:", error);
    }
  };

  // Fonction pour annuler un rendez-vous
  const handleCancelAppointment = async (id) => {
    try {
      const updatedAppointment = await updateAppointment(
        id,
        { status: "Annulé" },
        token
      );
      setAppointments(
        appointments.map((app) => (app.id === id ? updatedAppointment : app))
      );
    } catch (error) {
      console.error("Erreur lors de l'annulation du rendez-vous:", error);
    }
  };

  // Filtrer les rendez-vous en fonction de la recherche
  const filteredAppointments = appointments.filter((app) => {
    return (
      app.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.dog_id.toString().includes(searchTerm) ||
      new Intl.DateTimeFormat("fr-FR").format(
        new Date(app.date_appointment)
      ).includes(searchTerm)
    );
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-xs">
      <h1 className="text-xl font-bold ">Gestion des Rendez-vous</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Rechercher un rendez-vous"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg mx-5 my-5 w-1/2"
      />

      {/* Update Form */}
      <div>
        <select
          value={selectedAppointmentId || ""}
          onChange={(e) => setSelectedAppointmentId(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg mx-5 my-5"
        >
          <option value="" disabled>
            Sélectionner un rendez-vous
          </option>
          {appointments.map((app) => (
            <option key={app.id} value={app.id}>
              {new Intl.DateTimeFormat("fr-FR").format(
                new Date(app.date_appointment)
              )}{" "}
              - {app.reason}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nouvelle raison"
          value={updatedReason}
          onChange={(e) => setUpdatedReason(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg mx-5 my-5"
        />
        <button
          onClick={handleUpdateAppointment}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Modifier
        </button>
      </div>

      {/* Appointment List */}
      <div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Heure</th>
              <th>Raison</th>
              <th>Statut</th>
              <th>Chien</th>
              
              <th>Date de création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((app) => (
              <tr key={app.id} className="hover:bg-gray-100">
                <td>
                  {new Intl.DateTimeFormat("fr-FR").format(
                    new Date(app.date_appointment)
                  )}
                </td>
                <td>{app.time_appointment}</td>
                <td>{app.reason}</td>
                <td
                  className={
                    app.status === "En attente"
                      ? "text-yellow-500"
                      : app.status === "Confirmé"
                      ? "text-green-500"
                      : app.status === "Annulé"
                      ? "text-red-500"
                      : ""
                  }
                >
                  <div className="m-2">{app.status} </div>{" "}
                  <div className="mb-2">
                    {app.status === "En attente" && (
                      <>
                        <button
                          type="button"
                          className="bg-green-500 text-xs text-white p-1 rounded-md mr-2"
                          onClick={() => handleConfirmAppointment(app.id)}
                        >
                          Confirmer
                        </button>
                        <button
                          type="button"
                          className="bg-red-500 text-white p-1 rounded-md mr-2"
                          onClick={() => handleCancelAppointment(app.id)}
                        >
                          Annuler
                        </button>
                      </>
                    )}
                  </div>
                </td>
                <td>{app.dog_id} - {getDogNameById(app.dog_id)}</td>
               
                <td>
                  {new Intl.DateTimeFormat("fr-FR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(app.created_at))}
                </td>
                <td>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="flex items-center justify-center p-2 border rounded-md mr-2"
                      onClick={() => {
                        setSelectedAppointmentId(app.id);
                        setUpdatedReason(app.reason);
                      }}
                    >
                      <i className="fa fa-pencil mr-2" />
                      Mettre à jour
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center p-2 border rounded-md text-red-600"
                      onClick={() => handleDeleteAppointment(app.id)}
                    >
                      <i className="fa fa-trash mr-2" />
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

AppointmentsManagerPro.propTypes = {
  selectedProfessional: PropTypes.string, // Pas nécessaire si on utilise le hook pour obtenir l'ID professionnel
};

export default AppointmentsManagerPro;
