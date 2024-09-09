import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import Notiflix from "notiflix"; 

const ListeSpecialty = () => {
  const [speciality, setspeciality] = useState([]);

  const { token } = useContext(AuthContext);

  useEffect(() => {
  

    const fetchSpeciality = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/speciality_spe", {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the token for authentication
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            setspeciality(response.data || []);
        } catch (error) {
            console.error("Erreur lors de la récupération des spécialités", error);
            Notiflix.Notify.failure("Erreur lors de la récupération des spécialités");
        }
    };

   
    fetchSpeciality();
}, [token]);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/speciality/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setspeciality(speciality.filter((specialite) => specialite.id !== id));
      Notiflix.Notify.success(`Spécialité ${id} supprimée.`);
    } catch (error) {
      console.error("Erreur lors de la suppression de la spécialité", error);
      Notiflix.Notify.failure("Erreur lors de la suppression de la spécialité");
    }
  };

  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer cette spécialité ?",
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
      id="speciality"
      className="text-xs dark:bg-zinc-400 dark:text-gray-900 mt-8 bg-white rounded-lg shadow-md animate-slideIn mb-8 pt-5 w-screen md:p-9 sm:p-4"
    >
      <h1 className="text-xl font-bold mb-6 dark:text-gray-800 pl-8">
        Liste de mes spécialités
      </h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {speciality.length > 0 ? (
          <table className="divide-y divide-gray-200 ml-5 m-5">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
                <th className="py-3 px-6 text-left">Nom</th>
               
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-xs font-light">
              {speciality.map((specialite) => (
                <tr
                  key={specialite.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">
                    <span>{specialite.name_speciality}</span>
                  </td>
                 
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      <button
                        onClick={() => confirmDelete(specialite.id)}
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
        ) : (
          <p className="ml-5 m-5">Aucune spécialité disponible</p>
        )}

    
      </div>
    </div>
  );
};

export default ListeSpecialty;