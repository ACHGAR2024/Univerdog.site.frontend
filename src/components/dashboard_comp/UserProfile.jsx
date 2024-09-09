import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import DashboardContent from "./DashboardContent";
import DashboardAdminContent from "./DashboardAdminContent";
import DashboardProfessionnelContent from "./DashboardProfessionnelContent";

const UserProfile = () => {
  const { token } = useContext(AuthContext); // Make sure token is fetched correctly
  const user = useContext(UserContext);
  const [imageURL, setImageURL] = useState(null);
  
  useContext(AuthContext);
 

  useEffect(() => {
    if (user && user.image) {
      setImageURL(`http://127.0.0.1:8000${user.image}`);
    }
  }, [user]);

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex flex-col items-right ">
      <div className="bg-white shadow-lg mt-52 z-50 fixed top-0 right-0 rounded-md invisible ">
        <ul className="flex items-center">
          <li className="px-4 py-2">
            {imageURL && (
              <img
                src={imageURL}
                alt="Profil"
                className="w-10 h-10 rounded-full"
              />
            )}
          </li>
          <li className=" px-4 w-52">
            {user.role === "admin" ? (
              <span className="font-bold dark:text-gray-950">
                Bonjour Administrateur
              </span>
            ) : (
              <div className="dark:text-gray-950">
                <img
                  src={
                    user.google_id === null
                      ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      : user.image
                      ? `http://127.0.0.1:8000${user.image}`
                      : user.avatar
                  }
                  alt="professionnel"
                  className="w-6 h-6 rounded-full"
                />{" "}
                Bonjour {user.name}
              </div>
            )}
          </li>
        </ul>
      </div>

      {user.role === "admin" ? (
  <DashboardAdminContent user={user}  token={token}/>
) : user.role === "professionnel" ? (
  <DashboardProfessionnelContent user={user} token={token} />
) : (
  <DashboardContent user={user} token={token} /> // Ensure token is being passed
)}

    </div>
  );
};

export default UserProfile;
