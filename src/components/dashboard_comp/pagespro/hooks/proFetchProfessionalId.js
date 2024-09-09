// hooks/useFetchProfessionalId.js
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import Notiflix from "notiflix";

const useFetchProfessionalId = () => {
  const [professionalId, setProfessionalId] = useState(null);
  const user = useContext(UserContext);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      console.error("User object is not defined");
      return;
    }

    const fetchProfessionalId = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/professionals_pro",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response from professionals_pro API:", response.data);

        const professionals = response.data || [];
        const professional = professionals.find((p) => p.user_id === user.id);
        if (professional) {
          setProfessionalId(professional.id);
          console.log("Professional ID set to:", professional.id);
        } else {
          Notiflix.Notify.failure(
            "Aucun professionnel trouvé pour l'utilisateur actuel"
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'ID du professionnel",
          error
        );
        Notiflix.Notify.failure(
          "Erreur lors de la récupération de l'ID du professionnel"
        );
      }
    };

    fetchProfessionalId();
  }, [user, token]);

  return professionalId;
};

export default useFetchProfessionalId;
