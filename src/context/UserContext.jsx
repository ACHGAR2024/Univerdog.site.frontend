import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const fetchUser = async () => {
      if (!token) {
        //("______    ____      ______   ");
        //("|  _  |  |  _  |   |  ___ |  ");
        //("| | | |  | | | |   | |  __     ");
        //("| | | |  | | | |   | | |_ |  ");
        //("| |/ /   | |_| |   | |__| |  ");
        //("|___/    |_____|   |______/   ");
        //("       UniverDog");

        return;
      }

      // Configure headers for the request
      try {
        //("Authorization", `Bearer ${token}`);

        const response = await axios.get(
          "https://api.univerdog.site/api/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        );

        //("Response Data:", response.data);
        setUser(response.data.data.user);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations utilisateur",
          error
        );
      }
    };

    fetchUser();
  }, [token]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
