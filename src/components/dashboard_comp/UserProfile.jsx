import { useEffect, useState, useContext, useCallback } from "react";

import { AuthContext } from "../../context/AuthContext";

import { UserContext } from "../../context/UserContext";
import DashboardContent from "./DashboardContent";
import DashboardAdminContent from "./DashboardAdminContent";
import DashboardProfessionnelContent from "./DashboardProfessionnelContent";

const base64UrlDecode = (str) => {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  // Add padding if necessary
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
};

const calculateRemainingTime = (token) => {
  if (!token) {
    console.error("Token is null or undefined");
    return 0;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    console.error("Token format incorrect");
    return 0;
  }

  const payload = base64UrlDecode(parts[1]);
  const expirationTime = payload.exp;
  if (isNaN(expirationTime)) {
    console.error("Expiration time is not a number");
    return 0;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const remainingTime = expirationTime - currentTime;
  return Math.max(0, Math.floor(remainingTime / 60));
};

const UserProfile = () => {
  const { token } = useContext(AuthContext); // Make sure token is fetched correctly
  const user = useContext(UserContext);
  const [imageURL, setImageURL] = useState(null);
  const { logout } = useContext(AuthContext);
  useContext(AuthContext);

  const handleLogout = useCallback(() => {
    logout();
    window.location.reload();
    window.location.href = "/";
  }, [logout]);

  useEffect(() => {
    if (user && user.image) {
      setImageURL(`https://api.univerdog.site${user.image}`);
    }
    if (token) {
      const remainingTime = calculateRemainingTime(token);
      if (remainingTime <= 0) {
        handleLogout();
      }
    }
  }, [user, token, handleLogout]);

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
                      ? `https://api.univerdog.site${user.image}`
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
      {/* token 
      <div className="flex items-center">
        <span className="ml-20 font-bold text-white dark:text-gray-100">
          Période de validité du token :{" "}
          {token ? "Token actif  " : "Token expiré  "}
        </span>
        {token && (
          <span className="dark:text-gray-950 text-white dark:bg-gray-100 bg-gray-900 rounded-md p-2 ml-4">
            Temps restant : {calculateRemainingTime(token)} minutes
          </span>
        )}
      </div>*/}

      {token &&
      JSON.parse(atob(token.split(".")[1])).exp - Date.now() / 1000 < 0 ? (
        handleLogout()
      ) : (
        <div>
          {user.role === "admin" ? (
            <DashboardAdminContent user={user} token={token} />
          ) : user.role === "professionnel" ? (
            <DashboardProfessionnelContent user={user} token={token} />
          ) : (
            <DashboardContent user={user} token={token} /> // Ensure token is being passed
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
