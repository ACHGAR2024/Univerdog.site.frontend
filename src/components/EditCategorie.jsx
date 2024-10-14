import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";

const EditCategorieForm = () => {
  const { id } = useParams();
  const [categorie, setCategorie] = useState({ name_cat: "" });
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const user = useContext(UserContext);
  useEffect(() => {
    const fetchCategorie = async () => {
      try {
        const response = await axios.get(
          `https://api.univerdog.site/api/categories/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        

        if (response.data && response.data.category) {
          setCategorie({ name_cat: response.data.category.name_cat }); // update the state with category data
        } else {
          console.error("Données de catégorie non trouvées ou incorrectes");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la catégorie", error);
      }
    };

    if (token) {
      fetchCategorie();
    } else {
      console.error("Token non disponible");
    }
  }, [id, token]);

  const handleChange = (e) => {
    setCategorie({ ...categorie, [e.target.name]: e.target.value });
  };

  if (categorie && user && user.role !== "admin") {
    return <div>Vous n êtes pas autorisé à modifier cette place.</div>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://api.univerdog.site/api/categories/${id}`,
        categorie,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      // Display success message with Notiflix
      Notification.success("Category updated successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // Redirect after 2 seconds // Redirect to the dashboard page after update
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la catégorie", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20 mb-72 w-1/3">
      <h1 className="text-3xl font-bold mb-8 text-black">Modifier catégorie</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name_cat"
          >
            Nom de la catégorie
          </label>
          <input
            type="text"
            name="name_cat"
            value={categorie.name_cat}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default EditCategorieForm;
