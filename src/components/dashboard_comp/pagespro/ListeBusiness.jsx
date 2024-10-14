import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import Notiflix from "notiflix";

const ListeBusiness = () => {
  const prof_id = useRef(null);
  const [professionals, setProfessionals] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/professionals_pro",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token for authentication
              "Content-Type": "application/json",
            },
          }
        );
        setProfessionals(response.data || []);
        //(response.data.map((pro) => pro.id));
        prof_id.current = response.data.map((pro) => pro.id);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des professionnels",
          error
        );
        Notiflix.Notify.failure(
          "Erreur lors de la récupération des professionnels"
        );
      }
    };

    fetchProfessionals();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.univerdog.site/api/professionals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProfessionals(professionals.filter((p) => p.id !== id));
      Notiflix.Notify.success(`Professionnel ${id} supprimé.`);
    } catch (error) {
      console.error("Erreur lors de la suppression du professionnel", error);
      Notiflix.Notify.failure("Erreur lors de la suppression du professionnel");
    }
  };

  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer ce professionnel ?",
      "Oui",
      "Non",
      () => {
        handleDelete(id);
      },
      () => {
        // Action to take if the user cancels the deletion
      }
    );
  };

  return (
    <div
      id="business-list"
      className="text-xs dark:bg-zinc-400 dark:text-gray-900 mt-8 bg-white rounded-lg shadow-md animate-slideIn mb-8 pt-5 w-screen md:p-9 sm:p-4"
    >
      <h1 className="text-xl font-bold mb-6 dark:text-gray-800 pl-8">
        Liste des Sociétés
      </h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {professionals.length > 0 ? (
          <table className="divide-y divide-gray-200 ml-5 m-5 mt-8">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
                <th className="py-3 px-6 text-left">
                  Nom de l&apos;entreprise
                </th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-xs font-light">
              {professionals.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">
                    <span>{p.company_name}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span className="hidden sm:block ">
                      {p.description_pro}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <Link
                      to={`/edit-professional/${p.id}`}
                      className="mx-2 transform hover:text-purple-500 hover:scale-110 transition duration-300"
                    >
                      <i className="fa fa-edit text-xl"></i>
                    </Link>
                    <button
                      onClick={() => confirmDelete(p.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      <i className="fa fa-trash text-md"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="ml-5 m-5 mt-8">Aucun professionnel disponible</p>
        )}
      </div>
    </div>
  );
};

export default ListeBusiness;
