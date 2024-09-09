import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"; //, useNavigate
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import Notification from "../../components/Notification";
//import { useNavigate } from "react-router-dom";

const UserProfileUpdate = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
    first_name: "",
    address: "",
    postal_code: "",
    phone: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const { token } = useContext(AuthContext);
  const user = useContext(UserContext);
  const { id } = useParams();
//const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (response.data && response.data.data && response.data.data.user) {
          setUserData({
            name: response.data.data.user.name || "",
            email: response.data.data.user.email || "",
            password: "",
            image: null,
            first_name: response.data.data.user.first_name || "",
            address: response.data.data.user.address || "",
            postal_code: response.data.data.user.postal_code || "",
            phone: response.data.data.user.phone || "",
          });
        } else {
          console.error("User data not found or incorrect");
          Notification.error("User data not found or incorrect");
        }
      } catch (error) {
        console.error("Error fetching user information", error);
        Notification.error("Error fetching user information");
      }
    };

    fetchUser();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setUserData({ ...userData, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("first_name", userData.first_name);
      formData.append("address", userData.address);
      formData.append("postal_code", userData.postal_code);
      formData.append("phone", userData.phone);

      if (userData.password) {
        formData.append("password", userData.password);
      }
      if (userData.image) {
        formData.append("image", userData.image);
      }
      formData.append("_method", "PUT");

      const userId = String(user.id);

      if (!token) {
        throw new Error("Authentication token not defined");
      }

      console.log(
        "Submitting form with data:",
        Object.fromEntries(formData.entries())
      );

      const response = await axios.post(
        `http://127.0.0.1:8000/api/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);

      if (response.status === 200) {
        Notification.success("Compte modifié avec succès !");
        
        /*setTimeout(() => {
          navigate("/dashboard");
        }, 2000);*/

        const updatedUser = response.data.user;
        setUserData({
          name: updatedUser.name,
          email: updatedUser.email,
          password: "",
          image: null,
          first_name: updatedUser.first_name,
          address: updatedUser.address,
          postal_code: updatedUser.postal_code,
          phone: updatedUser.phone,
        });
        
          //navigate("/dashboard");
       
      } else {
        throw new Error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error updating user profile", error);
      Notification.error("Erreur lors de la mise à jour du profil utilisateur");
    }
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold  text-black dark:text-black">
        Modifier Profile
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        encType="multipart/form-data"
      >
        {/* Photo de profil /storage/images/avatar_1724322794.png */}
        <div className="text-right mb-4">
         
            { !userData.image ? (
              <img
                src={`http://127.0.0.1:8000${user.image}`}
                alt="Photo de profil"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
            ):(
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Photo de profil"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
            )}
              
         </div>

        <div className="mb-4">{/*"https://cdn-icons-png.flaticon.com/512/149/149071.png"*/}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nom
          </label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            disabled={userData.google_id ? true : false}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            disabled={userData.google_id ? true : false}
            value={userData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            disabled={userData.google_id ? true : false}
            value={userData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Champs supplémentaires */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="first_name"
          >
            Prénom
          </label>
          <input
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Adresse
          </label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="postal_code"
          >
            Code Postal
          </label>
          <input
            type="text"
            name="postal_code"
            value={userData.postal_code}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Numéro de téléphone
          </label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Image de Profil
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image preview"
              className="mt-4 w-24 rounded-xl"
            />
          )}
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileUpdate;
