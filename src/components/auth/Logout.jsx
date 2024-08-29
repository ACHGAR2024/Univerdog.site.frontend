/*import { useContext } from "react";
import axios from "../../config/axiosConfig";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";*/

const Logout = () => {
  /*const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      logout();
      navigate("/");
      console.log("Logout successful");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };*/
  return (
    /* <button
      onClick={(e) => {
        e.preventDefault();
        handleLogout();
      }}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Se déconnecter
    </button>*/
    <div></div>
  );
};

export default Logout;
