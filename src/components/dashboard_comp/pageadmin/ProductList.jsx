import { useState, useEffect, useCallback, useRef, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import ProductForm from "./ProductForm";
import AddPhotosProduct from "./AddPhotosProduct"; // Import the AddPhotosProduct component
import Notiflix from "notiflix";

const ProductList = () => {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // For editing
  const [isNewProduct, setIsNewProduct] = useState(false); // Flag to know if it's an add or update
  const [showAddPhotos, setShowAddPhotos] = useState(false); // Flag to show the add photos form
  const [productIdForPhotos, setProductIdForPhotos] = useState(null); // ID of the product to add photos to
  const [searchTerm, setSearchTerm] = useState(""); // State for search text

  const formRef = useRef(null); // Reference to ProductForm

  // Function to fetch products
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.univerdog.site/api/products",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
    }
  }, [token]);

  // Function to add a product
  const createProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        "https://api.univerdog.site/api/products",
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts([...products, response.data]);
    } catch (err) {
      console.error("Erreur lors de la création du produit", err);
    }
  };

  // Function to delete a product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.univerdog.site/api/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.error("Erreur lors de la suppression du produit", error);
    }
  };

  // Edit a product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsNewProduct(false); // This is an update, so flag to false
  };

  // Add a new product
  const handleAddNew = () => {
    setSelectedProduct(null); // Deselect the current product
    setIsNewProduct(true); // Indicates that a new product is being added
    formRef.current.resetForm(); // Call the form reset
  };

  // Add photos to a product
  const handleAddPhotos = (productId) => {
    setProductIdForPhotos(productId);
    setShowAddPhotos(true); // Show the add photos form
  };

  // Function to call on success of an operation (add or update)
  const handleSuccess = () => {
    fetchProducts();
    setSelectedProduct(null);
    setIsNewProduct(false); // Reset the flag after success
    setShowAddPhotos(false); // Hide the add photos form after adding photos
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.name_product.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer cette réservation ?",
      "Oui",
      "Non",
      () => handleDelete(id),
      null,
      {
        width: "320px",
        borderRadius: "8px",
      }
    );
  };
  return (
    <div className="product-list">
      <h2 className="text-xl font-bold">Liste des produits</h2>
      <button
        type="submit"
        className="btn-primary h-10 bg-slate-600 text-white rounded-md hover:bg-slate-900 px-5 m-5"
        onClick={handleAddNew}
      >
        Ajouter un produit
      </button>

      {/* Search field */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
      </div>

      {/* Form to add or edit a product */}
      {(selectedProduct !== null || isNewProduct) && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="flex justify-between items-center">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                ></h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150 mb-4"
                  onClick={() => {
                    setSelectedProduct(null);
                    setIsNewProduct(false);
                  }}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <ProductForm
                ref={formRef} // Pass the reference here
                product={selectedProduct}
                onSuccess={handleSuccess}
                isNewProduct={isNewProduct}
                createProduct={createProduct}
              />
            </div>
          </div>
        </div>
      )}

      <table className="table-auto w-full text-xs">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2 w-20">Prix</th>
            <th className="px-4 py-2">Actions</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Link affiliation</th>
            {/*<th className="px-4 py-2">Catégorie</th>*/}
          </tr>
        </thead>
        <tbody className="bg-white">
          {filteredProducts.map((product) => (
            <tr key={product.id} className="border-b border-gray-200">
              <td className="px-4 py-2">{product.name_product}</td>
              <td className="px-4 py-2">{product.price} €</td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-200 px-4 py-2 rounded-md flex items-center"
                  >
                    <i className="fas fa-edit mr-2"></i> Modifier
                  </button>
                  <button
                    onClick={() => confirmDelete(product.id)}
                    className="bg-red-500 px-4 py-2 rounded-md flex items-center"
                  >
                    <i className="fas fa-trash-alt mr-2"></i> Supprimer
                  </button>
                  <button
                    onClick={() => handleAddPhotos(product.id)}
                    className="bg-green-500 px-4 py-2 rounded-md flex items-center"
                  >
                    <i className="fas fa-camera mr-2"></i> Ajouter Photos
                  </button>
                </div>
              </td>
              <td className="px-4 py-2">{product.description_product.substring(0, 100)} ...</td>
              <td className="px-4 py-2">{product.affiliation_link.substring(0, 50)} ...</td>
              {/*<td className="px-4 py-2">{product.products_category_id}</td> */}
              <td className="px-4 py-2"></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add photos form */}
      {showAddPhotos && productIdForPhotos && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="flex justify-between items-center">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                ></h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                  onClick={() => {
                    setShowAddPhotos(false);
                    setProductIdForPhotos(null); // Reset the product ID
                  }}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <AddPhotosProduct
                productId={productIdForPhotos} // Passes productId to AddPhotosProduct component
                onSuccess={() => {
                  setShowAddPhotos(false); // Closes the form after success
                  setProductIdForPhotos(null); // Resets the product ID
                  fetchProducts(); // Refreshes the list of products
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
