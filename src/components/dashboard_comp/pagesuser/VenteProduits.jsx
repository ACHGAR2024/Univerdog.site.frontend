import { useState, useEffect } from 'react';
import axios from 'axios';

const VenteProduits = () => {
  const [products, setProducts] = useState([]);
  const [productPhotos, setProductPhotos] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchProductPhotos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products-photos');
        setProductPhotos(response.data);
      } catch (error) {
        console.error('Error fetching product photos:', error);
      }
    };

    const fetchProductCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products-categories');
        setProductCategories(response.data);
      } catch (error) {
        console.error('Error fetching product categories:', error);
      }
    };

    fetchProducts();
    fetchProductPhotos();
    fetchProductCategories();
  }, []);

  // Helper function to find the photo for a product
  const findProductPhoto = (productId) => {
    const photo = productPhotos.find((photo) => photo.product_id === productId);
    return photo ? photo.photo_name_product : null;
  };

  // Function to handle category button clicks
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.products_category_id === selectedCategory)
    : products;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 ml-10 flex items-center">
        <i className="fa-solid fa-store w-6 h-6 mr-2 text-orange-400"></i>
        &nbsp;  Nos produits phares
      </h2>

      {/* Category buttons */}
      <div className="mb-4 flex flex-wrap gap-2 ml-10">
        {productCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`bg-cover bg-center bg-no-repeat ${
              selectedCategory === category.id ? 'bg-blue-600' : 'bg-gray-300'
            } m-2 p-2 rounded-md w-24 h-24`}
            style={{
              backgroundImage: `url('https://picsum.photos/id/${Math.floor(
                Math.random() * 1000
              )}/200/300')`,
            }}
          >
            <p className="text-white w-full h-full flex items-center justify-center">
              {category.name_product_cat}
            </p>
          </button>
        ))}
        {/* Button to show all products */}
        <button
          onClick={() => handleCategoryClick(null)}
          className={`bg-cover bg-center bg-no-repeat ${
            selectedCategory === null ? 'bg-blue-600' : 'bg-gray-300'
          } m-2 p-2 rounded-md w-24 h-24`} 
          style={{
            backgroundImage: `url('https://picsum.photos/id/${Math.floor(
              Math.random() * 1000
            )}/200/300')`,
          }}
        >
          <p className="text-white w-full h-full flex items-center justify-center">
            Tous les produits
          </p>
        </button>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="dashboard-card p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={`/images/${findProductPhoto(product.id)}`}
              alt={product.name_product}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-xl font-bold mb-2 flex items-center dark:text-black">
              
              {product.name_product}
            </h3>
            <p className="text-gray-600 mb-4">{product.description_product}</p>
            <p className="text-gray-600 mb-4"><i className="fa-solid fa-money-bill mr-2"></i> {product.price} €</p>
            <a href={product.affiliation_link} target="_blank" rel="noopener noreferrer">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full flex items-center justify-center">
              <i className="fa-solid fa-cart-plus mr-2"></i>Ajouter au panier
           </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenteProduits;