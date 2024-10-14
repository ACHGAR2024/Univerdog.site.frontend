import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { AuthContext } from "../../../context/AuthContext";
import Notiflix from "notiflix";

// API base URL
const BASE_URL = "https://api.univerdog.site/api/appointments";

// Function to fetch appointments
const fetchAppointments = async (professionalId, token) => {
  try {
    const response = await axios.get(
      `https://api.univerdog.site/api/appointments_pro/${professionalId}`,
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

// React component to manage appointments
const AppointmentsManagerUser = ({ selectedProfessional, selectedDog }) => {
  const [appointments, setAppointments] = useState([]);
  const [updatedReason, setUpdatedReason] = useState(""); // State for reason input
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null); // Track selected appointment for update
  const { token } = useContext(AuthContext); // Get the token from AuthContext

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointments(selectedProfessional, token);
        setAppointments(data);
      } catch (error) {
        console.error("Erreur lors du chargement des rendez-vous:", error);
      }
    };

    if (selectedProfessional) {
      loadAppointments();
    }
  }, [selectedProfessional, token]);

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
        } catch (error) {
          console.error("Erreur lors de la suppression du rendez-vous:", error);
          Notiflix.Notify.failure("Échec de la suppression du rendez-vous");
        }
      },
      () => {
        // Remove action
      },
      {
        width: "320px",
        borderRadius: "8px",
      }
    );
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Gestion des Rendez-vous
      </h1>

      {/* Update Form */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Modification raison"
          value={updatedReason}
          onChange={(e) => setUpdatedReason(e.target.value)}
          className="w-2/3 border border-gray-300 p-3 rounded-lg mr-4  focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleUpdateAppointment}
          className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Modifier
        </button>
      </div>

      {/* Appointment List */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Heure</th>
              <th className="px-4 py-2 text-left">Raison</th>
              <th className="px-4 py-2 text-left w-24">Statut</th>
              <th className="px-4 py-2 text-left">Date de création</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments
              .filter((app) => app.dog_id == selectedDog)
              .map((app) => (
                <tr key={app.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {new Intl.DateTimeFormat("fr-FR").format(
                      new Date(app.date_appointment)
                    )}
                  </td>
                  <td className="px-4 py-3">{app.time_appointment}</td>
                  <td className="px-4 py-3">{app.reason}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      app.status === "En attente"
                        ? "text-yellow-500"
                        : app.status === "Confirmé"
                        ? "text-green-500"
                        : app.status === "Annulé"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {app.status}
                  </td>
                  <td className="px-4 py-3">
                    {new Intl.DateTimeFormat("fr-FR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(app.created_at))}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                        className="flex items-center justify-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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

AppointmentsManagerUser.propTypes = {
  selectedProfessional: PropTypes.string.isRequired,
  selectedDog: PropTypes.any.isRequired,
};

export default AppointmentsManagerUser;