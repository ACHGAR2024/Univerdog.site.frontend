import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import Notification from "../components/Notification";
import { Link } from "react-router-dom";

const DeposerSpecialty = () => {
  const navigate = useNavigate();
  const [formDataSpeciality, setFormDataSpeciality] = useState({
    name_speciality: "",
    professional_id: "",
  });
  const { token } = useContext(AuthContext);
  const user = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/categories"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };
    fetchCategories();
    // Fetch professionals and categories
    const fetchData = async () => {
      try {
        const [categoriesResponse, professionalsResponse] = await Promise.all([
          axios.get("https://api.univerdog.site/api/categories"),
          axios.get("https://api.univerdog.site/api/professionals"),
        ]);
        setCategories(categoriesResponse.data.categories);
        setProfessionals(professionalsResponse.data); // Assuming this returns an array
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      // Find the professional ID associated with the current user
      const userProfessional = professionals.find(
        (pro) => pro.user_id === user.id
      );
      if (userProfessional) {
        setFormDataSpeciality((prevData) => ({
          ...prevData,
          professional_id: userProfessional.id,
        }));
      }
    }
  }, [user, professionals]);

  const handleSubmitSpecialty = async (e) => {
    e.preventDefault();

    try {
      const formDataToSendSpecialty = new FormData();
      formDataToSendSpecialty.append(
        "name_speciality",
        formDataSpeciality.name_speciality
      );
      formDataToSendSpecialty.append(
        "professional_id",
        formDataSpeciality.professional_id
      );

      await axios.post(
        "https://api.univerdog.site/api/speciality",
        formDataToSendSpecialty,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Notification.success("Spécialité ajoutée avec succès !");
      navigate("/dashboard");

      setFormDataSpeciality({
        name_speciality: "",
        professional_id: "",
      });
    } catch (error) {
      console.error(
        "Erreur lors de la création de la spécialité :",
        error.response?.data || error.message
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataSpeciality({
      ...formDataSpeciality,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20 mb-72">
      {location.pathname !== "/dashboard" && (
        <Link to="/dashboard">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4">
            <i className="fa-solid fa-arrow-left"></i> Retour
          </button>
        </Link>
      )}
      <h1 className="text-3xl font-bold mb-8 text-black">
        Déposer une Spécialité
      </h1>
      <form
        onSubmit={handleSubmitSpecialty}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name_speciality"
          >
            Spécialité
          </label>
          <select
            name="name_speciality"
            value={formDataSpeciality.name_speciality || ""}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Choisissez une catégorie</option>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((categorie) => (
                <option key={categorie.id} value={categorie.name_cat}>
                  {categorie.name_cat || "Pas de nom"}
                </option>
              ))
            ) : (
              <option disabled>Chargement des catégories...</option>
            )}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ajouter Spécialité
        </button>
      </form>
    </div>
  );
};

export default DeposerSpecialty;
