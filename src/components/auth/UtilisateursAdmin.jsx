import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Notiflix from "notiflix";
import Notification from "../Notification";
import { useNavigate } from "react-router-dom";

const UtilisateursAdmin = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
      if (error.response) {
        console.error("Erreur:", error.response.data);
      }
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(users.filter((user) => user.id !== userId));
      //setNotification({ type: 'success', message: 'Utilisateur supprimé avec succès' });
      // Affichage dee message de succès avec Notiflix
      Notification.success("Utilisateur supprimé avec succès");

      // Rediriction de l'utilisateur vers une autre page après un court délai
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // Redirection après 2 secondes
    } catch (error) {
      //console.error('Erreur lors de la suppression de l\'utilisateur', error);
      //setNotification({ type: 'error', message: 'Erreur lors de la suppression de l\'utilisateur' });
      Notification.success("Erreur lors de la suppression de l'utilisateur");
      if (error.response) {
        console.error("Erreur:", error.response.data);
        Notification.error(error.response.data);
      }
    }
  };

  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
      "Oui",
      "Non",
      () => handleDelete(id),
      () => {},
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "#000",
        messageColor: "#000",
        buttonsFontSize: "16px",
        okButtonBackground: "#007bff",
        cancelButtonBackground: "#6c757d",
        okButtonColor: "#fff",
        cancelButtonColor: "#fff",
      }
    );
  };

  const handleRoleToggle = async (userId, currentRole) => {
    const newRole = currentRole === "user" ? "agent" : "user";
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/users/${userId}/role`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      Notification.success("Role mis à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle", error);
      Notification.error("Erreur lors de la mise à jour du rôle");
      if (error.response) {
        console.error("Erreur:", error.response.data);
        Notification.error(error.response.data);
      }
    }
  };

  return (
    <div
      id="utilisateurs"
      className="dark:text-gray-900  bg-white rounded-lg shadow-md animate-slideIn  pt-20 w-screen md:w-3/4 lg:w-2/3 xl:w-2/3 md:p-9"
    >
      <h1 className="text-2xl font-bold mb-6 dark:text-gray-800 pl-8">
        Gestion des utilisateurs
      </h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden ">
        <table className="divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rôle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={
                      user.image
                        ? `http://127.0.0.1:8000${user.image}`
                        : `https://ui-avatars.com/api/?name=${user.name}&background=random`
                    }
                    alt={user.name}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleRoleToggle(user.id, user.role)}
                      onMouseEnter={() =>
                        Notiflix.Notify.info("Changement de rôle", {
                          position: "center-top",
                          timeout: 1000,
                          clickToClose: true,
                          showOnlyTheLastOne: true,
                          pauseOnHover: true,
                          distance: "100px",
                          top: "100px",
                          width: "300px",
                        })
                      }
                      className="text-blue-600 hover:text-blue-900 ml-4"
                    >
                      <i className="fas fa-exchange-alt"></i>{" "}
                      {/* Icône pour le changement de rôle */}
                    </button>
                    <button
                      onClick={() => confirmDelete(user.id)}
                      className="text-red-600 hover:text-red-900 ml-4"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UtilisateursAdmin;
