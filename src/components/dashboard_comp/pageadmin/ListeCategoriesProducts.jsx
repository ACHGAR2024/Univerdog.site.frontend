import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import Notiflix from "notiflix";

const ListeCategoriesProducts = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    name_product_cat: "",
  });
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/products-categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        setCategories(response.data || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api.univerdog.site/api/products-categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCategories(categories.filter((categorie) => categorie.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie", error);
    }
  };

  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer cette catégorie ?",
      "Oui",
      "Non",
      () => {
        handleDelete(id);
      },
      () => {}
    );
  };

  const handleSave = async () => {
    try {
      if (isEditMode) {
        await axios.put(
          `https://api.univerdog.site/api/products-categories/${currentCategory.id}`,
          currentCategory,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        await axios.post(
          "https://api.univerdog.site/api/products-categories",
          currentCategory,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
      setIsModalOpen(false);
      setCurrentCategory({ name_product_cat: "" });
      // Re-fetch categories
      const response = await axios.get(
        "https://api.univerdog.site/api/products-categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCategories(response.data || []);
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout/mise à jour de la catégorie",
        error
      );
    }
  };

  const openModal = (category = { name_product_cat: "" }) => {
    setCurrentCategory(category);
    setIsEditMode(!!category.id);
    setIsModalOpen(true);
  };

  return (
    <div
      id="categories"
      className="text-xs dark:bg-zinc-400 dark:text-gray-900 mt-8 bg-white rounded-lg shadow-md animate-slideIn mb-8 pt-5 w-screen md:p-9 sm:p-4"
    >
      <h1 className="text-xl font-bold mb-6 dark:text-gray-800 pl-8">
        Liste des catégories de produits
      </h1>

      <button
        onClick={() => openModal()}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Ajouter une catégorie
      </button>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4">
        <table className="divide-y divide-gray-200 ml-5 m-5">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
              <th className="py-3 px-6 text-left">Nom</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-xs font-light">
            {categories.map((categorie) => (
              <tr
                key={categorie.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  <span>{categorie.name_product_cat}</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      onClick={() => openModal(categorie)}
                      className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    >
                      <i className="fa fa-pencil"></i>
                    </button>
                    <button
                      onClick={() => confirmDelete(categorie.id)}
                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                    >
                      <i className="fa fa-trash-o"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "Modifier la catégorie" : "Ajouter une catégorie"}
            </h2>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Nom de la catégorie"
              value={currentCategory.name_product_cat}
              onChange={(e) =>
                setCurrentCategory({
                  ...currentCategory,
                  name_product_cat: e.target.value,
                })
              }
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {isEditMode ? "Modifier" : "Ajouter"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeCategoriesProducts;
