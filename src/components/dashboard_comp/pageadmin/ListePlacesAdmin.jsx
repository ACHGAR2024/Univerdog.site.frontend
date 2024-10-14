import { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import Notiflix from "notiflix";

const ListePlacesAdmin = () => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const { token } = useContext(AuthContext);

  const fetchPlaces = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.univerdog.site/api/places",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setPlaces(response.data.places || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des places", error);
    }
  }, [token]);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.univerdog.site/api/places/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setPlaces(places.filter((place) => place.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la place", error);
    }

    try {
      await axios.delete(`https://api.univerdog.site/api/places/${id}/photos`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      fetchPlaces();
    } catch (error) {
      console.error(
        "Erreur lors de la suppression des photos de la place",
        error
      );
    }
  };

  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer cette place ?",
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

  // Filter places according to search term
  const filteredPlaces = places.filter(
    (place) =>
      place.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      id="places"
      className="text-xs dark:bg-zinc-400 dark:text-gray-900 mt-8 bg-white rounded-lg shadow-md animate-slideIn mb-8 pt-8 md:p-9"
    >
      <h1 className="text-xl font-bold mb-6 dark:text-gray-800 pl-8">
        Gestion des lieux pour chien
      </h1>

      {/* Search field */}
      <div className="mb-4 px-8">
        <input
          type="text"
          placeholder="Rechercher un lieu par titre ou description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden ">
        <table className="divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
              <th className="py-3 px-6 text-left">Photo</th>
              <th className="py-3 px-6 text-left">Titre</th>
              <th className="py-3 px-6 text-center">Actions</th>
              <th className="py-3 px-6 text-center">Prix</th>
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-left">Description</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-xs font-light">
            {filteredPlaces.map((place) => (
              <tr
                key={place.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">
                    <img
                      src={`https://api.univerdog.site${place.photo}`}
                      alt={place.title}
                      className="w-20 h-20 rounded-lg object-cover hover:cursor-zoom-in"
                      onClick={() =>
                        window.open(`https://api.univerdog.site${place.photo}`)
                      }
                    />
                  </span>
                </td>
                <td className="py-3 px-6 text-left">
                  <Link
                    to={`/fiche-place/${place.id}`}
                    className="font-medium text-blue-500 hover:underline"
                  >
                    <span>{place.title.substring(0, 20)}...</span>
                  </Link>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <Link
                      to={`/edit-place/${place.id}`}
                      className="transform hover:text-purple-500 hover:scale-110 transition duration-300"
                    >
                      <i className="fa fa-pencil mr-2"></i>
                    </Link>
                    <Link
                      to={`/ajout-photos-place/${place.id}`}
                      className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    >
                      <i className="fa fa-image"></i>
                    </Link>
                    <button
                      onClick={() => confirmDelete(place.id)}
                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                    >
                      <i className="fa fa-trash-o"></i>
                    </button>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <span>{place.price}</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <span>
                    {new Intl.DateTimeFormat("fr-FR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(place.publication_date))}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <span className="font-medium">
                    {place.description.substring(0, 20)}...
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListePlacesAdmin;
