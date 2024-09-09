import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { AuthContext } from "../../../context/AuthContext";

// API base URL
const BASE_URL = "http://127.0.0.1:8000/api/appointments";

// Fonction pour récupérer les rendez-vous
const fetchAppointments = async (professionalId, token) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/appointments_pro/${professionalId}/`,
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

// Composant React pour gérer les rendez-vous
const AppointmentsManagerUser = ({ selectedProfessional, selectedDog, }) => {
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
    try {
      await deleteAppointment(id, token);
      setAppointments(appointments.filter((app) => app.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du rendez-vous:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-bold ">Gestion des Rendez-vous</h1>

      {/* Update Form */}
      <div>
        
        <input
          type="text"
          placeholder="Modification raison"
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
              <th>Professionnel</th>
              <th>Date de création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments
              .filter((app) => app.dog_id == selectedDog)
              .map((app) => (
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
                    {app.status}
                  </td>
                  <td>{app.dog_id}</td>
                  <td>{app.professional_id}</td>
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

AppointmentsManagerUser.propTypes = {
  selectedProfessional: PropTypes.string.isRequired,
  selectedDog: PropTypes.any.isRequired,
};

export default AppointmentsManagerUser;
