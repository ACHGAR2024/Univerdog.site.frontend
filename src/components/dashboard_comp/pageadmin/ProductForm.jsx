import {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";

const ProductForm = forwardRef(
  ({ product, onSuccess, isNewProduct, createProduct }, ref) => {
    const [formData, setFormData] = useState({
      name_product: "",
      price: "",
      description_product: "",
      affiliation_link: "",
      products_category_id: "",
    });

    const [categories, setCategories] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    const token = localStorage.getItem("token");

    const fetchCategories = useCallback(async () => {
      setIsLoadingCategories(true);
      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/products-categories",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      } finally {
        setIsLoadingCategories(false);
      }
    }, [token]);

    useEffect(() => {
      fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
      if (product) {
        setFormData({
          name_product: product.name_product || "",
          price: product.price || "",
          description_product: product.description_product || "",
          affiliation_link: product.affiliation_link || "",
          products_category_id: product.products_category_id || "",
        });
      }
    }, [product]);

    // Function to reset the form
    const resetForm = () => {
      setFormData({
        name_product: "",
        price: "",
        description_product: "",
        affiliation_link: "",
        products_category_id: "",
      });
    };

    // Expose the `resetForm` method via the reference
    useImperativeHandle(ref, () => ({
      resetForm,
    }));

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (isNewProduct) {
        // If it's a new product
        createProduct(formData);
        onSuccess();
      } else {
        // Otherwise, it's an update
        try {
          await axios.put(
            `https://api.univerdog.site/api/products/${product.id}`,
            formData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          onSuccess(); // Success of the update
        } catch (error) {
          console.error("Erreur lors de la mise à jour du produit", error);
        }
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="  mb-10 bg-white dark:bg-slate-500 shadow-md rounded-md p-4 space-y-4"
      >
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 pb-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isNewProduct ? "Ajouter un produit" : "Mettre à jour un produit"}
          </h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <i className="fas fa-tag text-gray-700 dark:text-gray-300"></i>
            <label className="text-sm font-medium">Nom du produit</label>
            <input
              type="text"
              name="name_product"
              value={formData.name_product}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-euro-sign text-gray-700 dark:text-gray-300"></i>
            <label className="text-sm font-medium">Prix</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-align-left text-gray-700 dark:text-gray-300"></i>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description_product"
              value={formData.description_product}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-link text-gray-700 dark:text-gray-300"></i>
            <label className="text-sm font-medium">
              Lien d&apos;affiliation
            </label>
            <input
              type="text"
              name="affiliation_link"
              value={formData.affiliation_link}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-folder text-gray-700 dark:text-gray-300"></i>
            <label className="text-sm font-medium">Catégorie</label>
            <select
              name="products_category_id"
              value={formData.products_category_id}
              onChange={handleChange}
              className="input-field"
              disabled={isLoadingCategories}
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name_product_cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end justify-end">
            <button
              type="submit"
              className="btn-primary h-10 bg-slate-600 text-white rounded-md hover:bg-slate-900 px-5"
            >
              {isNewProduct ? "Ajouter le produit" : "Mettre à jour"}
            </button>
          </div>
        </div>
      </form>
    );
  }
);

ProductForm.displayName = "ProductForm";

ProductForm.propTypes = {
  product: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
  isNewProduct: PropTypes.bool.isRequired,
  createProduct: PropTypes.func.isRequired,
};

export default ProductForm;
