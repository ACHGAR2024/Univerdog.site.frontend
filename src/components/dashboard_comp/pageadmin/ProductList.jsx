import useAxiosInstance from './AxiosConfig';  // Importez le hook
import ProductForm from './ProductForm';
import { useState, useEffect, useCallback } from 'react';
import PropTypes from "prop-types";

const ProductList = () => {
    const axiosInstance = useAxiosInstance();  // Utilisez le hook pour obtenir l'instance
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [categories, setCategories] = useState([]);  // Définissez categories ici

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des produits", error);
        }
    }, [axiosInstance, setProducts]);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories", error);
        }
    }, [axiosInstance, setCategories]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Erreur lors de la suppression du produit", error);
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
    };

    const handleSuccess = () => {
        fetchProducts();
        setSelectedProduct(null);
    };

    return (
        <div
      id="products"
      className="text-xs bg-white dark:bg-zinc-400 dark:text-gray-900 rounded-lg shadow-md animate-slideIn mt-10 mb-8 p-9 md:p-9"
    >
            <h1 className="text-xl font-bold mb-4">Liste des produits</h1>
            <ProductForm product={selectedProduct} onSuccess={handleSuccess} categories={categories} />  {/* Passez categories */}
            <ul className="flex flex-col gap-4 text-xs">
                {products.map((product) => (
                    <li key={product.id} className="flex justify-between">
                        <div className="text-xs">
                            {product.name_product} - {product.price}€
                            <br />
                            {product.description_product}
                            <br />
                            <a href={product.affiliation_link} target="_blank" rel="noopener noreferrer">Lien d&apos;affiliation : {product.affiliation_link}</a>
                            <br />
                            Catégorie: {product.products_category_id}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(product)} className="bg-yellow-200 px-4 py-2 rounded-md flex items-center"><i className="fas fa-edit mr-2"></i>Modifier</button>
                            <button onClick={() => handleDelete(product.id)} className="bg-red-500 px-4 py-2 rounded-md flex items-center"><i className="fas fa-trash-alt mr-2"></i>Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

ProductList.propTypes = {
    categories: PropTypes.array.isRequired,
};

export default ProductList;
