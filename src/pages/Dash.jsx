import { useState, useEffect } from "react";
import axios from "../config/axiosConfig"; // Make sure the Axios instance is configured correctly
import { useNavigate } from "react-router-dom";

function Dash() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Token non disponible");
          navigate("/login"); // Redirect to login page if no token is available
          return;
        }

        // Configure the headers for the request
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // Call the API to get the user's information
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
        navigate("/login"); // Redirect to login page in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    // Clear the token from localStorage and redirect to the login page
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
