import jwtDecode from "jwt-decode";
/*
const fetchUser = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user', {
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
function getToken(){
    return localStorage.getItem('access_token');
}

let getDecodedToken = () => {
    if (getToken()) {
        return jwtDecode(localStorage.getItem('access_token'));
    } else {
        return false
    }
}

let getExpiryTime = () => {
    // Check si le token est valide et n'a pas expiré
    if (getDecodedToken() && !(getDecodedToken().exp * 1000 < Date.now())) {
        console.log('Token valide');
        return true
    } else {
        console.log('Token expiré, suppression du token en local storage');
        localStorage.removeItem('access_token')
    }
}

let getRoles = () => {
    // On teste si il y a un token décodé et si il n'a pas expiré
    if (getExpiryTime()) {
        // la valeur de base est un tableau dans un string, on le parse pour faire sauter le string et
        // on le tostring pour faire sauter le tableau, comme ça on a seulement la valeur  wwwww
        return JSON.parse(getDecodedToken().roles).toString();
    } else {
        return false
    }
}

let getEmail = () => {
    // On teste si il y a un token décodé et si il n'a pas expiré
    if (getExpiryTime()) {
        return getDecodedToken().email;
    } else {
        return false
    }
}

let loggedAndAdmin = () => {
    // Check si il y a un token valide et check si le rôle est celui d'un admin, répond true quand c'est vrai
    return !!(getExpiryTime() && getRoles() === 'ROLE_ADMIN');
}


export default { getToken, getDecodedToken, getRoles, getEmail, loggedAndAdmin, getExpiryTime}