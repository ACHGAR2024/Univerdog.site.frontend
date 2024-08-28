import { useState, useEffect } from "react";
import { googleLogout} from "@react-oauth/google";

function ProfilGoogle() {

  const [profile, setProfile, setMessage] = useState([]);



  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile)); // Load profile from localStorage
    }
  }, [setProfile]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    setMessage("Utilisateur déconnecté.");
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <div> Vous étes déconnecté. !!!</div>
      )}
    </div>
  );
}
export default ProfilGoogle;
