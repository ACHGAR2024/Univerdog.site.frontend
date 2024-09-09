import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes

const ProductForm = ({ product, onSuccess, categories }) => {  // Ajoutez categories
    const [formData, setFormData] = useState({
        name_product: '',
        price: '',
        description_product: '',
        affiliation_link: '',
        products_category_id: ''
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name_product: product.name_product || '',
                price: product.price || '',
                description_product: product.description_product || '',
                affiliation_link: product.affiliation_link || '',
                products_category_id: product.products_category_id || ''
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logique d'envoi des données
        onSuccess();
    };

    return (
        <>
        <div
      id="products"
      className="h-auto text-sm dark:bg-zinc-400 dark:text-gray-900 mt-8 bg-white rounded-lg shadow-md animate-slideIn  mb-8 pt-8 md:p-9 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4"
    >
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 md:w-1/2">
            <div className="flex items-center space-x-2">
                <i className="fas fa-tag fa-fw text-lg"></i>
                <input
                    type="text"
                    name="name_product"
                    value={formData.name_product}
                    onChange={handleChange}
                    placeholder="Nom du produit"
                    className="w-full px-2 py-1 border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
                />
            </div>

            <div className="flex items-center space-x-2">
                <i className="fas fa-euro-sign fa-fw text-lg"></i>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Prix"
                    className="w-full px-2 py-1 border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
                />
            </div>

            <div className="flex items-center space-x-2">
                <i className="fas fa-align-left fa-fw text-lg"></i>
                <textarea
                    name="description_product"
                    value={formData.description_product}
                    onChange={handleChange}
                    placeholder="Description du produit"
                    className="w-full px-2 py-1 border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
                />
            </div>

            <div className="flex items-center space-x-2">
                <i className="fas fa-link fa-fw text-lg"></i>
                <input
                    type="text"
                    name="affiliation_link"
                    value={formData.affiliation_link}
                    onChange={handleChange}
                    placeholder="Lien d'affiliation"
                    className="w-full px-2 py-1 border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
                />
            </div>

            <div className="flex items-center space-x-2">
                <i className="fas fa-list-ul fa-fw text-lg"></i>
                <select
                    name="products_category_id"
                    value={formData.products_category_id}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
                >
                    <option value="">Sélectionnez une catégorie</option>
                    {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((category) => (
                            <option value={category.id} key={category.id}>
                                {category.name_category}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>Aucune catégorie disponible</option>
                    )}
                </select>
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Enregistrer
            </button>
        </form>
        </div>
        </>
    );
};

// Validation des props
ProductForm.propTypes = {
    product: PropTypes.shape({
        name_product: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        description_product: PropTypes.string,
        affiliation_link: PropTypes.string,
        products_category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    onSuccess: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({  // Ajoutez la validation de prop
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name_category: PropTypes.string.isRequired
    })).isRequired
};

export default ProductForm;
