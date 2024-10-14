import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Notiflix from "notiflix";
import Notification from "../../../components/Notification";
import { AuthContext } from "../../../context/AuthContext";

const ListEvents = () => {
  const [events, setEvents] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/events"
        );
        setEvents(response.data.events || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.univerdog.site/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      Notification.success("Événement supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement:", error);
      Notification.error(
        "Erreur lors de la suppression de l'événement. Veuillez réessayer."
      );
    }
  };

  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer cet événement ?",
      "Oui",
      "Non",
      () => handleDelete(id),
      () => {},
      {
        width: "320px",
        borderRadius: "8px",
      }
    );
  };

  return (
    <div
      id="events"
      className="dark:bg-zinc-400 text-xs dark:text-gray-900 mt-8 bg-white rounded-lg shadow-md animate-slideIn mb-8 pt-8 md:p-9"
    >
      <h2 className="text-xl font-bold mb-4 ml-8">Liste des événements</h2>
      <Link
        to="/event-new"
        className="ml-12 mb-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        <i className="fa fa-plus-circle fa-fw pr-1"></i> Ajouter un événement
      </Link>
      <div className="overflow-x-auto">
        <table className="table-auto bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
              <th className="py-3 px-6 text-left">Photo</th>
              <th className="py-3 px-6 text-left">Titre</th>
              <th className="py-3 px-6 text-center">Actions</th>
              <th className="py-3 px-6 text-left w-20">Description</th>
              <th className="py-3 px-6 text-left">Adresse</th>
              <th className="py-3 px-6 text-left">Date de début</th>
              <th className="py-3 px-6 text-left">Date de fin</th>
              <th className="py-3 px-6 text-left">Tarifs</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-xs font-light">
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  <img
                    src={`https://api.univerdog.site${event.photo_event}`}
                    alt={event.title_event}
                    className="w-8 h-8 rounded-full"
                  />
                </td>
                <td className="py-3 px-6 text-left">
                  {event.title_event.substring(0, 10) +
                    (event.title_event.length > 10 ? "..." : "")}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <Link
                      to={`/edit-event/${event.id}`}
                      className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    >
                      <i className="fa fa-pencil"></i>
                    </Link>
                    <button
                      onClick={() => confirmDelete(event.id)}
                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                    >
                      <i className="fa fa-trash-o"></i>
                    </button>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  {event.content_event.substring(0, 10) +
                    (event.content_event.length > 10 ? "..." : "")}
                </td>
                <td className="py-3 px-6 text-left w-20">
                  {event.address_event}
                </td>
                <td className="py-3 px-6 text-left">{event.event_date}</td>
                <td className="py-3 px-6 text-left">{event.event_end_date}</td>
                <td className="py-3 px-6 text-left">{event.price_event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEvents;
