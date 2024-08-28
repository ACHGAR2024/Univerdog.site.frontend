import { useState, useEffect } from "react";
import axios from "../config/axiosConfig"; // Assurez-vous que l'instance Axios est configurée correctement
import { useNavigate } from "react-router-dom";

function Dash() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Récupérer le token depuis le localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Token non disponible");
          navigate("/login"); // Redirige vers la page de connexion si pas de token
          return;
        }

        // Configurer les en-têtes pour la requête
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // Appeler l'API pour obtenir les informations de l'utilisateur
        const response = await axios.get("/user", { headers });
        setUser(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur",
          error
        );
        setError(
          "Erreur lors de la récupération des informations de l'utilisateur"
        );
        navigate("/login"); // Redirige vers la page de connexion en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    // Effacer le token du localStorage et rediriger vers la page de connexion
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return <div className="text-center p-28">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center p-28">Erreur: {error}</div>;
  }

  return (
    <div className="text-center p-28">
      {user ? (
        <div>
          <h1>Bienvenue, {user.name}!</h1>
          {user.avatar && <img src={user.avatar} alt="Avatar" />}
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      ) : (
        <p>Utilisateur non trouvé.</p>
      )}
    </div>
  );
}

export default Dash;
