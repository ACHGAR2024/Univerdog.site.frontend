import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { UserContext } from "../../../context/UserContext";
import Notification from "../../../components/Notification";
import { Link } from "react-router-dom";

const DeposerPlacePro = () => {
  const useridrecup = useContext(UserContext);
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: null,
    address: "",
    photo: null,
    latitude: "",
    longitude: "",
    type: "",
  });

  const [categories, setCategories] = useState([]);
  const [suggestedCities, setSuggestedCities] = useState([]);

  const specialityIcons = {
    Vétérinaire: "stethoscope",
    "Toiletteur canine": "bone",
    "Pension canine": "bed",
    "Cliniques vétérinaires": "medkit",
    "Magasins et centres commerciaux acceptant les chiens": "shopping-bag",
    "Hôtels et hébergements acceptant les chiens": "hotel",
    "Restaurants et cafés acceptant les chiens": "utensils",
    "Parcs à chiens": "tree",
    "Spas pour chiens": "spa",
    "Sentiers de randonnée": "hiking",
    "Plages autorisées aux chiens": "umbrella-beach",
    "Campings dog-friendly": "campground",
    "Clubs et écoles de dressage": "graduation-cap",
    "Aires de repos sur autoroutes": "gas-pump",

    // ...  other specialities and their icons
  };

  const [hoveredIcon, setHoveredIcon] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };

    if (token) {
      fetchCategories();
    }
  }, [token]);

  const handlePlaceSearch = async (e) => {
    const searchQuery = e.target.value;
    setFormData((prev) => ({
      ...prev,
      address: searchQuery,
    }));

    if (searchQuery.length >= 3) {
      try {
        const response = await axios.get(
          `https://api-adresse.data.gouv.fr/search/?q=${searchQuery}&limit=1`
        );
        setSuggestedCities(response.data.features || []);
        //("data adresse", response.data.features);
      } catch (error) {
        console.error("Erreur lors de la recherche adresse", error);
      }
    } else {
      setSuggestedCities([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //("MON USER ID:", useridrecup.id);

    if (!useridrecup.id) {
      console.error("Erreur : ID utilisateur non disponible");
      Notification.error("ID utilisateur non disponible");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("photo", formData.photo);
      formDataToSend.append("latitude", formData.latitude);
      formDataToSend.append("longitude", formData.longitude);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("user_id", useridrecup.id);

      formDataToSend.append("category_id", formData.category_id);

      const currentDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      formDataToSend.append("publication_date", currentDate);

      await axios.post(
        "https://api.univerdog.site/api/places",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Notification.success("Place ajoutée avec succès !");

      setFormData({
        title: "",
        description: "",
        price: "",
        category_id: null,
        address: "",
        photo: null,
        latitude: "",
        longitude: "",
        type: "",
      });
    } catch (error) {
      console.error(
        "Erreur lors de la création de la place :",
        error.response ? error.response.data : error.message
      );
      Notification.error("Erreur lors de la création de la place");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "category_id") {
      setFormData((prev) => ({
        ...prev,
        category_id: value,
        type:
          specialityIcons[
            categories.find((cat) => cat.id === value)?.name_cat
          ] || formData.type,
      }));
    } else if (name === "photo") {
      setFormData((prev) => ({
        ...prev,
        photo: e.target.files[0],
      }));
    } else if (name === "type" && type === "radio") {
      // For radio buttons, use the value and the checked value
      setFormData((prev) => ({
        ...prev,
        type: checked ? value : prev.type, // Update type if the button is checked
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-72 w-3/4 md:w-1/2 lg:w-3/5">
      <Link to="/dashboard">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4">
          <i className="fa-solid fa-arrow-left"></i> Retour
        </button>
      </Link>
      <h1 className="text-xl font-bold mb-8 text-black">
        Déposer un lieu professionnel
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Titre place, Nom de l&apos;établissement ou Nom de professionnel
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Titre de votre place"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Décrivez votre place en détail"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Prix
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Prix en euros"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category_id"
          >
            Catégorie
          </label>
          <select
            className="block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            id="category_id"
            name="category_id"
            onChange={handleChange}
            value={formData.category_id || ""}
          >
            <option value="">Sélectionnez une catégorie</option>{" "}
            {/* Empty option */}
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name_cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Adresse Complète
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Rechercher une adresse…"
            name="address"
            value={formData.address || ""}
            onChange={handlePlaceSearch}
            required
          />
          {suggestedCities.length > 0 && (
            <ul className="shadow border rounded mt-2 w-full bg-white">
              {suggestedCities.map((city) => (
                <li
                  key={city.properties.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      address: city.properties.label,
                      latitude: city.geometry.coordinates[1],
                      longitude: city.geometry.coordinates[0],
                    }));
                    setSuggestedCities([]);
                  }}
                >
                  {city.properties.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="latitude"
          >
            Latitude
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="latitude"
            type="text"
            placeholder="Format latitude xx.xxxxx"
            name="latitude"
            value={formData.latitude || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="longitude"
          >
            Longitude
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="longitude"
            type="text"
            placeholder="Format longitude xx.xxxxx"
            name="longitude"
            value={formData.longitude || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="photo"
          >
            Photo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="photo"
            type="file"
            name="photo"
            onChange={handleChange}
            accept="image/*"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Choisir une icône
          </label>
          <div className="flex flex-wrap">
            {Object.entries(specialityIcons).map(([key, value]) => (
              <div key={key} className="mr-2">
                <input
                  type="radio"
                  id={key}
                  name="type"
                  value={value}
                  onChange={handleChange}
                  checked={formData.type === value}
                  className="hidden"
                />
                <label
                  htmlFor={key}
                  className="flex items-center p-2 border rounded cursor-pointer"
                  style={{
                    backgroundColor:
                      formData.type === value ? "#3498db" : "#f1f1f1",
                  }}
                  onMouseOver={() => setHoveredIcon(key)}
                  onMouseOut={() => setHoveredIcon(null)}
                >
                  <i className={`fas fa-${value} text-lg mr-2`} />
                  {hoveredIcon === key && (
                    <span className="ml-2 text-xs text-gray-700">{key}</span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Déposer
        </button>
      </form>
    </div>
  );
};

export default DeposerPlacePro;
