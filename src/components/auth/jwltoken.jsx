import jwtDecode from "jwt-decode";
/*
const fetchUser = async () => {
    try {
      const response = await axios.get('https://api.univerdog.site/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Token expiré ou invalide');
        // Implémenter une logique de réauthentification ici
      } else {
        console.error(error.message);
      }
    }
  };
  */
function getToken() {
  return localStorage.getItem("access_token");
}

let getDecodedToken = () => {
  if (getToken()) {
    return jwtDecode(localStorage.getItem("access_token"));
  } else {
    return false;
  }
};

let getExpiryTime = () => {
  // Check if the token is valid and has not expired
  if (getDecodedToken() && !(getDecodedToken().exp * 1000 < Date.now())) {
    return true;
  } else {
    localStorage.removeItem("access_token");
  }
};

let getRoles = () => {
  // Test if there is a decoded token and if it has not expired
  if (getExpiryTime()) {
    return JSON.parse(getDecodedToken().roles).toString();
  } else {
    return false;
  }
};

let getEmail = () => {
  // Test if there is a decoded token and if it has not expired
  if (getExpiryTime()) {
    return getDecodedToken().email;
  } else {
    return false;
  }
};

let loggedAndAdmin = () => {
  // Check if there is a valid token and check if the role is that of an admin, respond true when it's true
  return !!(getExpiryTime() && getRoles() === "ROLE_ADMIN");
};

export default {
  getToken,
  getDecodedToken,
  getRoles,
  getEmail,
  loggedAndAdmin,
  getExpiryTime,
};
