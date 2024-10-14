import { useState, useEffect } from "react";
import axios from "axios";
import Notiflix from "notiflix";

const ProfessionalIdComponent = () => {
  const [professionalId, setProfessionalId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/professionals_pro"
        );
        //("Réponse de l'API:", response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          setProfessionalId(response.data[0]?.id || null);
        } else {
          const errorMessage = "Aucun professionnel trouvé";
          console.error(errorMessage);
          setError(errorMessage);
        }
      } catch (error) {
        const errorMessage = `Erreur lors de la récupération des professionnels: ${error.message}. Status Code: ${error.response?.status}`;
        console.error(errorMessage);
        Notiflix.Notify.failure(errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      <h1>ID Professionnel</h1>
      {professionalId !== null ? (
        <p>ID Professionnel: {professionalId}</p>
      ) : (
        <p>Aucun ID professionnel disponible</p>
      )}
    </div>
  );
};

export default ProfessionalIdComponent;
