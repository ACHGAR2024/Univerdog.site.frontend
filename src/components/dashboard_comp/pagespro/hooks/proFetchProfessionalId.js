import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";

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
          setProfessionalId(professional.id);
          //("Professional ID set to:", professional.id);
        } else {
          console.log("Professional not found");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'ID du professionnel",
          error
        );
      }
    };

    fetchProfessionalId();
  }, [user, token]);

  return professionalId;
};

export default useFetchProfessionalId;
