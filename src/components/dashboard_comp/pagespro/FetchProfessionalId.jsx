import { useEffect, useRef } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const FetchProfessionalId = () => {
  const professionalId = useRef(null);
  const user = useContext(UserContext);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      console.error("User object is not defined");
      return;
    }

    try {
      const response = axios.get(
        "https://api.univerdog.site/api/professionals_pro",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      //("Response from professionals_pro API:", response.data);

      const professionals = response.data || [];
      const professional = professionals.find((p) => p.user_id === user.id);
      if (professional) {
        professionalId.current = professional.id;
        //("Professional ID set to:", professionalId.current);
      } else {
        console.log("Professional not found");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'ID du professionnel",
        error
      );
    }
  }, [user, token]);

  return professionalId;
};

export default FetchProfessionalId;
