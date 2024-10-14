import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
const tab_cat_place = {
  Vétérinaire: "stethoscope",
  "Parcs à chiens": "tree",
  "Cliniques vétérinaires": "medkit",
  "Spas pour chiens": "spa",
  "Sentiers de randonnée": "hiking",
  "Plages autorisées aux chiens": "umbrella-beach",
  "Campings dog-friendly": "campground",
  "Restaurants et cafés acceptant les chiens": "utensils",
  "Magasins et centres commerciaux acceptant les chiens": "shopping-bag",
  "Clubs et écoles de dressage": "graduation-cap",
  "Toiletteur canine": "bone",
  "Aires de repos sur autoroutes": "gas-pump",
  "Hôtels et hébergements acceptant les chiens": "hotel",
};
const ProfessionnelsCanin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "";

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sortOrder, setSortOrder] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetching places
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const url = "https://api.univerdog.site/api/places";

        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        let filteredPlaces = response.data.places;
        if (category) {
          filteredPlaces = filteredPlaces.filter(
            (place) => place.type === category
          );
        }
        setPlaces(filteredPlaces);
      } catch (error) {
        console.error("Erreur lors de la récupération des places", error);
      }
    };

    fetchPlaces();
  }, [category]);

  // Fetching categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/categories",
          {
            headers: {
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

    fetchCategories();
  }, []);

  // Filtering and sorting places
  useEffect(() => {
    let result = places;

    if (searchTerm) {
      result = result.filter((place) =>
        place.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      const selectedCategory = categories.find((cat) => cat.id === category);
      if (selectedCategory) {
        result = result.filter(
          (place) => place.type === selectedCategory.name_cat
        );
      }
    }

    if (sortOrder) {
      result = result.sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
    }

    setFilteredPlaces(result);
  }, [searchTerm, sortOrder, places, category, categories]);

  // Handling category change
  const handleCategoryClick = (cat) => {
    setCategory(cat);
    navigate(`?category=${cat}`);
  };

  return (
    <div className="container mx-auto px-4 pt-2 mb-36">
      <div className="flex-col md:flex-row justify-between my-4 hidden md:block">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded mb-4 md:mb-0 mr-2"
        />
        <select
          value={category}
          onChange={(e) => handleCategoryClick(e.target.value)}
          className="p-2 border rounded mb-4 md:mb-0 mr-2 dark:text-gray-900"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={tab_cat_place[cat.name_cat]}>
              {cat.name_cat}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded mr-2 dark:text-gray-900"
        >
          <option value="">Trier par</option>
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
        <a href="/carte">
          <button className="bg-slate-400 hover:bg-slate-800 text-white p-2 rounded">
            Rechercher par carte
          </button>
        </a>
        <a href="/lieux-places">
          <button className="bg-slate-400 hover:bg-slate-800 text-white p-2 rounded m-2">
            Rechercher par lieu
          </button>
        </a>
      </div>

      <section className="py-15 mb-5 animate-slideIn mt-3">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(tab_cat_place[cat.name_cat])}
                className={`dark:text-gray-900 bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
                  category === tab_cat_place[cat.name_cat] ? "bg-gray-200" : ""
                }`}
              >
                <i
                  className={`fa fa-${
                    {
                      Vétérinaire: "stethoscope",
                      "Parcs à chiens": "tree",
                      "Cliniques vétérinaires": "medkit",
                      "Spas pour chiens": "spa",
                      "Sentiers de randonnée": "hiking",
                      "Plages autorisées aux chiens": "umbrella-beach",
                      "Campings dog-friendly": "campground",
                      "Restaurants et cafés acceptant les chiens": "utensils",
                      "Magasins et centres commerciaux acceptant les chiens":
                        "shopping-bag",
                      "Clubs et écoles de dressage": "graduation-cap",
                      "Toiletteur canine": "bone",
                      "Aires de repos sur autoroutes": "gas-pump",
                      "Hôtels et hébergements acceptant les chiens": "hotel",
                    }[cat.name_cat] || "question-circle"
                  } 
                  ${
                    {
                      Vétérinaire: "text-blue-600",
                      "Parcs à chiens": "text-green-600",
                      "Cliniques vétérinaires": "text-red-600",
                      "Spas pour chiens": "text-purple-600",
                      "Sentiers de randonnée": "text-yellow-600",
                      "Plages autorisées aux chiens": "text-blue-300",
                      "Campings dog-friendly": "text-green-300",
                      "Restaurants et cafés acceptant les chiens":
                        "text-yellow-300",
                      "Magasins et centres commerciaux acceptant les chiens":
                        "text-blue-300",
                      "Clubs et écoles de dressage": "text-red-600",
                      "Toiletteur canine": "text-green-300",
                      "Aires de repos sur autoroutes": "text-yellow-300",
                      "Hôtels et hébergements acceptant les chiens":
                        "text-blue-300",
                    }[cat.name_cat] || "text-gray-600"
                  } 
                  mb-4 text-3xl`}
                ></i>

                <h3 className="font-semibold">{cat.name_cat}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredPlaces.map((place) => (
          <Link key={place.id} to={`/fiche-place/${place.id}`}>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`https://api.univerdog.site${place.photo}`}
                  alt={place.title}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-4 bg-gradient-to-b from-slate-200 to-slate-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {place.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-accent font-bold text-gl">
                    {place.address}
                  </span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300">
                    Plus d&apos;infos
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default ProfessionnelsCanin;
