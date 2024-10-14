import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import Notification from "../../../components/Notification";
import { UserContext } from "../../../context/UserContext";
import PropTypes from "prop-types";

const AddPhotosProduct = ({ productId }) => {
  const { token } = useContext(AuthContext);
  const user = useContext(UserContext);

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [productPhotos, setProductPhotos] = useState([]);

  // Retrieve photos of the specific product
  useEffect(() => {
    //("product photos...", productId);
    const fetchProductPhotos = async () => {
      try {
        const response = await axios.get(
          `https://api.univerdog.site/api/products-photos`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        //("Fetched photos:", response.data);

        setProductPhotos(
          response.data.filter((photo) => photo.product_id === productId)
        );
      } catch (error) {
        setError("Erreur lors de la sélection des photos du produit.");
        console.error("Error fetching photos:", error);
      }
    };
    fetchProductPhotos();
  }, [productId, token]);
console.log(error);
  // Handle photo change
  const handlePhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    setPhoto(selectedFile);

    const filePreview = URL.createObjectURL(selectedFile);
    setPhotoPreview(filePreview);
  };

  // Remove the selected photo

  // Submit the form to add a photo

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    if (!photo) {
      Notification.error("Veuillez sélectionner une photo.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("product_id", productId);
    formDataToSend.append("photo_name_product", photo);

    try {
      const response = await axios.post(
        `https://api.univerdog.site/api/products-photos`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Notification.success("Photo ajoutée avec succès !");
      setPhoto(null);
      setPhotoPreview(null);

      // Add the new photo to the productPhotos state
      const newPhoto = response.data; // Make sure the response contains the added photo
      setProductPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
    } catch (error) {
      console.error(
        "Erreur lors de l'upload de la photo :",
        error.response ? error.response.data : error.message
      );
      Notification.error("Erreur lors de l'upload de la photo");
    }
  };

  // Retrieve product information
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://api.univerdog.site/api/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        //("Fetched product:", response.data.product);
        setProduct(response.data.product);
      } catch (error) {
        setError("Erreur lors de la récupération du produit.");
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId, token]);

  // Check user authorization
  if (product && user && user.id !== product.user_id) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20 mb-72 w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-black">
          You are not authorized to modify this product.
        </h2>
      </div>
    );
  }

  // delete product photo
  const handleRemovePhoto = async (photoId) => {
    try {
      await axios.delete(
        `https://api.univerdog.site/api/products-photos/${photoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProductPhotos(productPhotos.filter((photo) => photo.id !== photoId));
      Notification.success("Photo supprimée avec succès !");
      setPhoto(null);
      setPhotoPreview(null);
    } catch (error) {
      console.error("Erreur lors de la suppression de la photo", error);
      Notification.error("Erreur lors de la suppression de la photo");
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-center">
        {Array.isArray(productPhotos) && productPhotos.length > 0 ? (
          productPhotos.map((photoproduct) => (
            <div key={photoproduct.id} className="m-4">
              <img
                src={`https://api.univerdog.site/storage/products_photos/${photoproduct.photo_name_product}`}
                alt={photoproduct.photo_name_product}
                className="w-20 h-20 rounded-xl"
              />
              <button
                onClick={() => handleRemovePhoto(photoproduct.id)}
                className="text-red-500 hover:text-red-700 absolute -mt-3 -ml-1"
              >
                <i className="fas fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Aucune photo pour ce produit.
          </p>
        )}
      </div>
      <h2 className="text-xl font-bold mb-2 text-black">
        Ajouter une photo à ce produit
      </h2>
      <form
        onSubmit={handlePhotoSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="photos"
          >
            Photo
          </label>
          <span className="block text-red-500 text-md mb-2">
            <i className="fa fa-info-circle" aria-hidden="true"></i> Vous pouvez
            sélectionner un fichier,
            <span className="text-sky-500">
              {" "}
              Seuls les formats jpeg, png, jpg, gif, svg, webp sont autorisés.
            </span>{" "}
          </span>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="photo_name_product"
            type="file"
            name="photo_name_product"
            onChange={handlePhotoChange}
            accept="image/*"
          />
        </div>
        <div className="mb-4">
          {photoPreview && (
            <div className="relative inline-block mr-4">
              <img
                src={photoPreview}
                alt="Prévisualisation"
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
              >
                X
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ajouter la photo
        </button>
      </form>
    </div>
  );
};

AddPhotosProduct.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default AddPhotosProduct;
