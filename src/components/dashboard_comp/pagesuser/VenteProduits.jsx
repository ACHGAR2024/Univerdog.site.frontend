import { useState, useEffect } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const VenteProduits = () => {
  const [products, setProducts] = useState([]);
  const [productPhotos, setProductPhotos] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchProductPhotos = async () => {
      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/products-photos"
        );
        setProductPhotos(response.data);
      } catch (error) {
        console.error("Error fetching product photos:", error);
      }
    };

    const fetchProductCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/products-categories"
        );
        setProductCategories(response.data);
      } catch (error) {
        console.error("Error fetching product categories:", error);
      }
    };

    fetchProducts();
    fetchProductPhotos();
    fetchProductCategories();
  }, []);

  // Helper function to find the photo for a product
  const findProductPhoto = (productId) => {
    return productPhotos
      .filter((photo) => photo.product_id === productId)
      .map((photo) => photo.photo_name_product);
  };

  // Function to handle category button clicks
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.products_category_id === selectedCategory
      )
    : products;

  // Configuration de react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 ml-10 flex items-center dark:text-white">
        <i className="fa-solid fa-store w-6 h-6 mr-2 text-orange-400"></i>
        &nbsp; Nos produits phares
      </h2>

      {/* Boutons de catégories */}
      <div className="mb-4 flex flex-wrap gap-2 ml-10">
        {productCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`${
              selectedCategory === category.id
                ? "bg-blue-600"
                : "bg-zinc-900 text-white"
            } m-2 p-2 rounded-md w-24 h-24`}
          >
            <p className="text-white w-full h-full flex items-center justify-center dark:bg-gray-200 dark:text-gray-900 p-2 dark:rounded-xl">
              {category.name_product_cat}
            </p>
          </button>
        ))}
        {/* Bouton pour afficher tous les produits */}
        <button
          onClick={() => handleCategoryClick(null)}
          className={`${
            selectedCategory === null ? "bg-blue-600" : "bg-zinc-900 text-white"
          } m-2 p-2 rounded-md w-24 h-24`}
        >
          <p className="text-white w-full h-full flex items-center justify-center dark:bg-gray-200 dark:text-gray-900 p-2 dark:rounded-xl">
            Tous les produits
          </p>
        </button>
      </div>

      {/* Grille des produits filtrés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="dashboard-card p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden"
          >
            {/* Slider des images pour chaque produit */}
            <div className="relative h-32 mb-16">
              {findProductPhoto(product.id).length === 0 ? (
                <p>Aucune image disponible</p>
              ) : findProductPhoto(product.id).length === 1 ? (
                // Afficher directement l'image s'il n'y en a qu'une
                <div className="relative h-40 mb-1">
                  <img
                    className="w-full h-full object-cover rounded-lg animate-fadeIn"
                    src={`https://api.univerdog.site/storage/products_photos/${
                      findProductPhoto(product.id)[0]
                    }`}
                    alt={product.name_product}
                  />
                </div>
              ) : (
                // Utiliser le slider s'il y a plusieurs images
                <Slider {...settings}>
                  {findProductPhoto(product.id).map((photo, index) => (
                    <div key={index} className="relative h-40 mb-1">
                      <img
                        className="w-full h-full object-cover rounded-lg animate-fadeIn"
                        src={`https://api.univerdog.site/storage/products_photos/${photo}`}
                        alt={product.name_product}
                      />
                    </div>
                  ))}
                </Slider>
              )}
            </div>

            <h3 className="h-24 text-xl font-bold mb-2 flex items-center dark:text-black">
              {product.name_product}
            </h3>
            <p className="text-gray-600 mb-4 h-72">
              {product.description_product.substring(0, 700) + "..."}
            </p>
            <p className=" mb-4 text-xl text-orange-500">
              <i className="fa-solid fa-money-bill mr-2 mt-5  "></i>{" "}
              {product.price} €
            </p>
            <a
              href={product.affiliation_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full flex items-center justify-center">
                <i className="fa-solid fa-cart-plus mr-2"></i>Acheter
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenteProduits;
