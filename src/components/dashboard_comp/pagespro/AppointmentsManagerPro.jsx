import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { AuthContext } from "../../../context/AuthContext";
import useFetchProfessionalId from "./hooks/proFetchProfessionalId";
import Notiflix from "notiflix";

// API base URL
const BASE_URL = "https://api.univerdog.site/api/appointments";

// React component to manage appointments
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
        const response = await fetch("https://api.univerdog.site/api/dogs");
        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des données des chiens"
          );
        }
        const dogsData = await response.json();
        setDogs(dogsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des chiens:", error);
      }
    };

    if (professionalId) {
      loadAppointments();
      loadDogs();
    }
  }, [professionalId, token]);

  // Retrieve dog data
  useEffect(() => {
    const loadDogs = async () => {
      try {
        const response = await fetch("https://api.univerdog.site/api/dogs");
        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des données des chiens"
          );
        }
        const dogsData = await response.json();
        setDogs(dogsData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des chiens:",
          error
        );
      }
    };

    loadDogs();
  }, []);

  // Find dog by app.dog_id
  const getDogNameById = (dogId) => {
    const dog = dogs.find((d) => d.id === dogId);
    return dog ? dog.name_dog : "Inconnu"; // Return dog's name or 'Inconnu' if not found
  };
  const fetchAppointments = async (professionalId, token) => {
    try {
      const response = await axios.get(`${BASE_URL}_pro/${professionalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
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
          await updateAppointment(appointment.id, { status: "Annulé" }, token);
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
  // Function to update an appointment
  const updateAppointment = async (appointmentId, updatedData, token) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/${appointmentId}`,
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

  // Function to delete an appointment
  const deleteAppointment = async (appointmentId, token) => {
    try {
      await axios.delete(`${BASE_URL}/${appointmentId}`, {
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
    Notiflix.Confirm.show(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer cette réservation ?",
      "Oui",
      "Non",
      async () => {
        try {
          await deleteAppointment(id, token);
          setAppointments(appointments.filter((app) => app.id !== id));
          Notiflix.Notify.success("Rendez-vous supprimé avec succès");
        } catch (error) {
          console.error("Erreur lors de la suppression du rendez-vous:", error);
          Notiflix.Notify.failure("Échec de la suppression du rendez-vous");
        }
      },
      () => {
        // Action annulée
      },
      {
        width: "320px",
        borderRadius: "8px",
      }
    );
  };

  // Function to confirm an appointment
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

  // Function to cancel an appointment
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

  // Filter appointments based on search input
  const filteredAppointments = appointments.filter((app) => {
    return (
      app.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.dog_id.toString().includes(searchTerm) ||
      new Intl.DateTimeFormat("fr-FR")
        .format(new Date(app.date_appointment))
        .includes(searchTerm)
    );
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Gestion des Rendez-vous
      </h1>

      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher un rendez-vous"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Formulaire de mise à jour */}
      <div className="mb-6">
        <select
          value={selectedAppointmentId || ""}
          onChange={(e) => setSelectedAppointmentId(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Nouvelle raison"
            value={updatedReason}
            onChange={(e) => setUpdatedReason(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUpdateAppointment}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Modifier
          </button>
        </div>
      </div>

      {/* Liste des rendez-vous */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Heure
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 w-56">
                Statut
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Raison
              </th>

              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Chien
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Date de création
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((app) => (
              <tr
                key={app.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-sm">
                  {new Intl.DateTimeFormat("fr-FR").format(
                    new Date(app.date_appointment)
                  )}
                </td>
                <td className="px-4 py-3 text-sm">{app.time_appointment}</td>
                <td className="px-4 py-3 text-sm w-56">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      app.status === "En attente"
                        ? "bg-yellow-100 text-yellow-800"
                        : app.status === "Confirmé"
                        ? "bg-green-100 text-green-800"
                        : app.status === "Annulé"
                        ? "bg-red-100 text-red-800"
                        : ""
                    }`}
                  >
                    {app.status}
                  </span>
                  {app.status === "En attente" && (
                    <div className="mt-2 space-x-2">
                      <button
                        type="button"
                        className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                        onClick={() => handleConfirmAppointment(app.id)}
                      >
                        Confirmer
                      </button>
                      <button
                        type="button"
                        className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 mt-2"
                        onClick={() => handleCancelAppointment(app.id)}
                      >
                        Annuler
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">{app.reason}</td>
                <td className="px-4 py-3 text-sm">
                  {app.dog_id} - {getDogNameById(app.dog_id)}
                </td>
                <td className="px-4 py-3 text-sm">
                  {new Intl.DateTimeFormat("fr-FR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(app.created_at))}
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedAppointmentId(app.id);
                        setUpdatedReason(app.reason);
                      }}
                    >
                      <i className="fa fa-pencil mr-1" />
                      Modifier
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 border border-red-300 rounded-md text-red-600 hover:bg-red-100"
                      onClick={() => handleDeleteAppointment(app.id)}
                    >
                      <i className="fa fa-trash mr-1" />
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
  selectedProfessional: PropTypes.string,
};

export default AppointmentsManagerPro;