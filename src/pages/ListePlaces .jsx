import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Notiflix from "notiflix";

const ListePlaces = () => {
  const [places, setPlaces] = useState([]);
  const { token } = useContext(AuthContext);
  const user = useContext(UserContext);

  const fetchPlaces = async () => {
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
  };

  useEffect(() => {
    const fetchPlaces = async () => {
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
    };

    fetchPlaces();
  }, [token]);

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
      },
      {
        // Additional configuration options (if needed)
      }
    );
  };

  // Filter places to only keep those that belong to the current user
  const userPlaces = places.filter(
    (place) => user && user.id === place.user_id
  );

  return (
    <div
      id="mesplaces"
      className="text-xs dark:bg-zinc-400 dark:text-gray-900 mt-8 bg-white rounded-lg shadow-md animate-slideIn mb-8 pt-5 w-screen md:p-9 sm:p-4"
    >
      <h2 className="text-xl font-bold mb-6 dark:text-gray-800 pl-8">
        Vos places récentes
      </h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
                <th className="px-6 py-3 text-left">Photo</th>
                <th className="px-6 py-3 text-center">Actions</th>
                <th className="px-6 py-3 text-left">Titre</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Prix</th>
                <th className="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-xs font-light">
              {userPlaces.map((place) => (
                <tr
                  key={place.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-6 py-3 text-left">
                    <span className="font-medium">
                      <img
                        src={`https://api.univerdog.site${place.photo}`}
                        alt={place.title}
                        className="w-16 h-16 rounded-lg object-cover hover:cursor-zoom-in"
                        onClick={() =>
                          window.open(
                            `https://api.univerdog.site${place.photo}`
                          )
                        }
                      />
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <div className="flex items-center justify-center space-x-4">
                      <Link
                        to={`/ajout-photos-place/${place.id}`}
                        className="transform hover:text-purple-500 hover:scale-110 transition duration-300"
                      >
                        <i className="fa fa-plus text-xl"></i>
                      </Link>
                      <Link
                        to={`/places/${place.id * 845}/photos`}
                        className="transform hover:text-blue-500 hover:scale-110 transition duration-300"
                      >
                        <i className="fa fa-image text-xl"></i>
                      </Link>
                      <Link
                        to={`/edit-place/${place.id}`}
                        className="transform hover:text-purple-500 hover:scale-110 transition duration-300"
                      >
                        <i className="fa fa-pencil text-xl"></i>
                      </Link>
                      <button
                        onClick={() => confirmDelete(place.id)}
                        className="transform hover:text-red-500 hover:scale-110 transition duration-300"
                      >
                        <i className="fa fa-trash-o text-xl"></i>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-left">
                    <a
                      href={`/fiche-place/${place.id}`}
                      className="font-medium text-blue-500 hover:underline"
                    >
                      <span>{place.title}</span>
                    </a>
                  </td>
                  <td className="px-6 py-3 text-left ">
                    <span className="font-medium hidden md:block">
                      {place.description}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-left ">
                    <span>{place.price}</span>
                  </td>
                  <td className="px-6 py-3 text-left">
                    <span>{place.publication_date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListePlaces;
