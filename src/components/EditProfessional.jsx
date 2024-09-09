import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";

const EditProfessional = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const user = useContext(UserContext); // Get the current user context
  const [formDataProfessional, setFormDataProfessional] = useState({
    company_name: "",
    description_pro: "",
  });
  const [loading, setLoading] = useState(true); // Add a loading state to handle page load

  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/professionals/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const professionalData = response.data;

        // Check if the logged-in user is the owner of the professional data
        if (professionalData.user_id !== user.id) {
          navigate("/dashboard"); // Redirect to dashboard if not the owner
          return;
        }

        setFormDataProfessional(professionalData);
      } catch (error) {
        console.error("Erreur lors de la récupération du professionnel:", error);
        navigate("/dashboard"); // Redirect on error
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchProfessional();
  }, [id, token, user.id, navigate]);

  const handleSubmitPro = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/professionals/${id}`,
        formDataProfessional,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du professionnel:", error);
    }
  };

  if (loading) {
    return <div>Chargement...</div>; // Display a loading message while fetching data
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20 mb-72">
      <h1 className="text-3xl font-bold mb-8 text-black">Modifier la Société</h1>
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
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default EditProfessional;
