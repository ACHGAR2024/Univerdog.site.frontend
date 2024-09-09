import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
//import Notification from "../components/Notification";

const DeposerProfessional = () => {
  const navigate = useNavigate();
  const [formDataProfessional, setFormDataProfessional] = useState({
    company_name: "",
    description_pro: "",
    rates: "",
    user_id: "",
    place_id: "",
  });
  const { token } = useContext(AuthContext);
  const user = useContext(UserContext);
  const [professionals, setProfessionals] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Fetch professionals
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/professionals"
        );
        setProfessionals(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de professionnels:",
          error
        );
      }
    };
    fetchProfessionals();
  }, []);
  
  const fetchPlaces = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/places", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setPlaces(response.data.places || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des places", error);
    }
  };
    fetchPlaces();
  
  useEffect(() => {
    if (user) {
      // Find the professional ID associated with the current user
      const userProfessional = professionals.find(
        (pro) => pro.user_id === user.id
      );
      if (userProfessional) {
        setFormDataProfessional((prevData) => ({
          ...prevData,
          professional_id: userProfessional.id,
        }));
      }
    }
  }, [user, professionals]);

  const handleSubmitPro = async (e) => {
    e.preventDefault();

    // Ajoutez les valeurs manquantes ici si elles ne sont pas déjà présentes.
    const dataToSend = {
      ...formDataProfessional,
      user_id: user.id, // Assurez-vous que user.id est bien défini
      place_id: formDataProfessional.place_id, // Remplacez par une valeur correcte pour place_id
      rates: "0",
    };

    console.log("Données envoyées:", dataToSend); // Ajout du log pour le débogage

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/professionals",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newProfessional = response.data;
      setProfessionals([...professionals, newProfessional]);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout d'une societé professionnelle:",
        error
      );
    }
  };
  // Filtrer les places pour ne garder que celles qui appartiennent à l'utilisateur actuel
  const userPlaces = places.filter(
    (place) => user && user.id === place.user_id
  );
  return (
    <div className="container mx-auto px-4 py-8 mt-20 mb-72">
      <h1 className="text-3xl font-bold mb-8 text-black">
        Déposer une Societé
      </h1>
      <p className="text-gray-600 mb-4">
        
      </p>
      <form
        onSubmit={handleSubmitPro}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="company_name"
          >
            Nom Societé
          </label>
          <input
            name="company_name"
            value={formDataProfessional.company_name || ""}
            onChange={(e) =>
              setFormDataProfessional({
                ...formDataProfessional,
                company_name: e.target.value,
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label
            className="block text-gray-700 text-sm font-bold mb-2 mt-4"
            htmlFor="description_pro"
          >
            Description
          </label>
          <textarea
            name="description_pro"
            value={formDataProfessional.description_pro || ""}
            onChange={(e) =>
              setFormDataProfessional({
                ...formDataProfessional,
                description_pro: e.target.value,
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          ></textarea>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="place_id"
          >
            Lieu
          </label>
          <select
            name="place_id"
            value={formDataProfessional.place_id || ""}
            onChange={(e) =>
              setFormDataProfessional({
                ...formDataProfessional,
                place_id: e.target.value,
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Sélectionner un lieu</option>
            {userPlaces.map((place) => (
              <option key={place.id} value={place.id}>
                {place.title}
              </option>
            ))}
          </select>
        </div>

        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ajouter Societé
        </button>
      </form>
    </div>
  );
};

export default DeposerProfessional;
