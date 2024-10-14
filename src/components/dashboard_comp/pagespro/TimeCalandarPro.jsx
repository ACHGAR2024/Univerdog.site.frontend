import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { AuthContext } from "../../../context/AuthContext";
import AvailabilityForm from "./AvailabilityForm";
import AvailabilityList from "./AvailabilityList";

import Notiflix from "notiflix";

const apiUrl = `https://api.univerdog.site/api/availability`;

function TimeCalandarPro() {
  const { token } = useContext(AuthContext);
  const [refreshKey, setRefreshKey] = useState(0);
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const professionalId = useRef(null);

  useEffect(() => {
    const fetchProfessionalId = async () => {
      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/professionals_pro",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const professionals = response.data || [];
        if (professionals.length > 0) {
          professionalId.current = professionals[0].id;
          fetchAvailabilities();
        } else {
          console.log("Professional not found");
        }
      } catch (error) {
        console.log("Error fetching professional ID", error);
      }
    };

    fetchProfessionalId();
  }, [token]);

  const fetchAvailabilities = async () => {
    if (!professionalId.current) return;

    try {
      const response = await axios.get(apiUrl);
      const filteredAvailabilities = Array.isArray(response.data)
        ? response.data.filter(
            (a) => a.professional_id === professionalId.current
          )
        : [];
      setAvailabilities(filteredAvailabilities);
      // Notify AvailabilityList of the updated availabilities
      setSelectedAvailability(null); // Reset selected availability
    } catch (error) {
      console.error("Error fetching availabilities", error.message);
      alert(
        "Unable to fetch availabilities. Please check the console for more details."
      );
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const addAvailability = async (availability) => {
    try {
      const response = await axios.post(
        apiUrl,
        { ...availability, professional_id: professionalId.current },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        console.log("Availability added successfully", response.data);
        fetchAvailabilities();
      } else {
        console.error(`Unexpected response code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding availability", error.message);
      alert(
        "Failed to add availability. Please check your input and try again."
      );
    }
  };

  const updateAvailability = async (id, updatedAvailability) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, updatedAvailability, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Availability updated successfully", response.data);
        fetchAvailabilities();
      } else {
        console.error(`Unexpected response code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating availability", error.message);
      alert(
        "Failed to update availability. Please check your input and try again."
      );
    }
  };

  const deleteAvailability = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAvailabilities();
    } catch (error) {
      console.error("Error deleting availability", error.message);
    }
  };

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold my-4 dark:text-white">
        Disponibilités
      </h2>

      {availabilities.length === 0 ? (
        <>
          <TimeCalandarPro_store
            onSubmit={handleRefresh}
            key={refreshKey}
            professionalId={professionalId.current}
          />
          <button
            onClick={fetchAvailabilities}
            className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600 mt-5"
          >
            <i className="fa-solid fa-rotate-right"></i> Rafraîchir la liste des
            disponibilités
          </button>
        </>
      ) : (
        <AvailabilityForm
          addAvailability={addAvailability}
          updateAvailability={updateAvailability}
          selectedAvailability={selectedAvailability}
          setSelectedAvailability={setSelectedAvailability}
        />
      )}
      <h2 className="text-xl font-semibold my-4 dark:text-white">
        Liste des Disponibilités
      </h2>

      <AvailabilityList
        availabilities={availabilities}
        setSelectedAvailability={setSelectedAvailability}
        deleteAvailability={deleteAvailability}
      />
    </div>
  );
}

const TimeCalandarPro_store = ({ onSubmit, professionalId }) => {
  const jours = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const { token } = useContext(AuthContext);

  const [horaires, setHoraires] = useState({
    Lundi: {
      matin: { debut: "", fin: "" },
      apresMidi: { debut: "", fin: "" },
      ferme: false,
    },
    Mardi: {
      matin: { debut: "", fin: "" },
      apresMidi: { debut: "", fin: "" },
      ferme: true,
    },
    Mercredi: {
      matin: { debut: "", fin: "" },
      apresMidi: { debut: "", fin: "" },
      ferme: true,
    },
    Jeudi: {
      matin: { debut: "", fin: "" },
      apresMidi: { debut: "", fin: "" },
      ferme: true,
    },
    Vendredi: {
      matin: { debut: "", fin: "" },
      apresMidi: { debut: "", fin: "" },
      ferme: true,
    },
    Samedi: {
      matin: { debut: "", fin: "" },
      apresMidi: { debut: "", fin: "" },
      ferme: true,
    },
    Dimanche: {
      matin: { debut: "", fin: "" },
      apresMidi: { debut: "", fin: "" },
      ferme: true,
    },
  });

  const handleHoraireChange = (jour, periode, type, valeur) => {
    console.log(
      `Changement pour ${jour}, période: ${periode}, type: ${type}, nouvelle valeur: ${valeur}`
    );
    setHoraires({
      ...horaires,
      [jour]: {
        ...horaires[jour],
        [periode]: {
          ...horaires[jour][periode],
          [type]: valeur,
        },
      },
    });
    console.log("Nouvel état des horaires :", horaires);
  };

  const handleFermeChange = (jour, valeur) => {
    console.log(`Changement de l'état "fermé" pour ${jour} : ${valeur}`);
    setHoraires({
      ...horaires,
      [jour]: {
        ...horaires[jour],
        ferme: valeur,
      },
    });
    console.log("Nouvel état des horaires :", horaires);
  };

  const handleSubmit = async () => {
    for (const jour of jours) {
      if (!horaires[jour].ferme) {
        const dayMapping = {
          Lundi: "Lundi",
          Mardi: "Mardi",
          Mercredi: "Mercredi",
          Jeudi: "Jeudi",
          Vendredi: "Vendredi",
          Samedi: "Samedi",
          Dimanche: "Dimanche",
        };

        const requestData = [
          {
            day: dayMapping[jour],
            start_time: horaires[jour].matin.debut,
            end_time: horaires[jour].matin.fin,
            professional_id: professionalId, // Use the passed professionalId prop
          },
          {
            day: dayMapping[jour],
            start_time: horaires[jour].apresMidi.debut,
            end_time: horaires[jour].apresMidi.fin,
            professional_id: professionalId, // Use the passed professionalId prop
          },
        ];

        try {
          for (const data of requestData) {
            if (data.start_time && data.end_time) {
              const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
              });

              if (!response.ok) {
                throw new Error(
                  `Erreur lors de l'envoi des données pour ${jour}: ${response.statusText}`
                );
              }

              const result = await response.json();
              console.log(`Données envoyées pour ${jour}:`, result);
              //setTimeout(() => window.location.reload(), 1500);
              Notiflix.Notify.success(`Données envoyées pour ${jour}:`);
            }
          }
          // Call the callback function to notify the parent
          if (onSubmit) {
            onSubmit(); // Call handleRefresh in the parent component to refresh the list
          }
        } catch (error) {
          console.error("Erreur lors de la soumission des horaires:", error);
        }
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="overflow-x-auto ml-24">
        {jours.map((jour) => (
          <div key={jour} className="mb-4">
            <label>
              <input
                type="checkbox"
                checked={horaires[jour].ferme}
                onChange={(e) => handleFermeChange(jour, e.target.checked)}
              />
              {` ${jour} : Fermé`}
            </label>
            {!horaires[jour].ferme && (
              <div className="mb-4 w-1/3">
                <div>
                  <label>Matin:</label>
                  <input
                    type="time"
                    value={horaires[jour].matin.debut}
                    onChange={(e) =>
                      handleHoraireChange(
                        jour,
                        "matin",
                        "debut",
                        e.target.value
                      )
                    }
                    className="w-full p-1 border rounded mb-2"
                  />
                  <input
                    type="time"
                    value={horaires[jour].matin.fin}
                    onChange={(e) =>
                      handleHoraireChange(jour, "matin", "fin", e.target.value)
                    }
                    className="w-full p-1 border rounded mb-2"
                  />
                </div>
                <div>
                  <label>Après-midi:</label>
                  <input
                    type="time"
                    value={horaires[jour].apresMidi.debut}
                    onChange={(e) =>
                      handleHoraireChange(
                        jour,
                        "apresMidi",
                        "debut",
                        e.target.value
                      )
                    }
                    className="w-full p-1 border rounded mb-2"
                  />
                  <input
                    type="time"
                    value={horaires[jour].apresMidi.fin}
                    onChange={(e) =>
                      handleHoraireChange(
                        jour,
                        "apresMidi",
                        "fin",
                        e.target.value
                      )
                    }
                    className="w-full p-1 border rounded"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="ml-44 bg-blue-500 text-white p-2 rounded"
        >
          Valider
        </button>
      </div>
    </div>
  );
};

TimeCalandarPro_store.propTypes = {
  onSubmit: PropTypes.func,
  professionalId: PropTypes.number,
};

export default TimeCalandarPro;
