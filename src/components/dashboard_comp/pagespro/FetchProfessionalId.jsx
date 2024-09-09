import { useEffect, useRef } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext"; // Import the UserContext
import { AuthContext } from "../../../context/AuthContext"; // Import the AuthContext
import axios from "axios";
import Notiflix from "notiflix";

const FetchProfessionalId = () => {
  const professionalId = useRef(null);
  const user = useContext(UserContext); // Use the UserContext to access the user object
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      console.error("User object is not defined");
      return;
    }

    try {
      const response = axios.get(
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
        professionalId.current = professional.id;
        console.log("Professional ID set to:", professionalId.current);
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
  }, [user, token]);

  return professionalId;
};

export default FetchProfessionalId;
