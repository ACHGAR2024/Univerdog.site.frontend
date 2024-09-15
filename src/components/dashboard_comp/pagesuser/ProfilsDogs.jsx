import { useContext, useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import PropTypes from "prop-types";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import {
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaTimes,
  FaDog,
  FaEye,
  FaEyeSlash,
  FaShareAlt,
  FaFilePdf,
} from "react-icons/fa";
import Notiflix from "notiflix";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const generateSecureQRCodeURL = (dogId) => {
  const dogIdcrypted = (dogId * 3456).toString();
  return `http://localhost:5174/dog/${dogIdcrypted}`;
};
const API_URL = "http://127.0.0.1:8000/api/dogs-photos";
const DOGS_API_URL = "http://127.0.0.1:8000/api/dogs";

const DogCard = ({ dog, onEdit, onDelete, photoUpdateKey }) => {
  const [showQR, setShowQR] = useState(false);
  const [dogPhotos, setDogPhotos] = useState([]);
  const qrCodeRef = useRef(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/dogs-photos`);

        if (!response.ok)
          throw new Error("Erreur lors de la récupération des photos du chien");

        const data = await response.json();
        const filteredPhotos = data.filter((photo) => photo.dog_id === dog.id);
        setDogPhotos(filteredPhotos);
      } catch (error) {
        console.error("Erreur lors de la récupération des photos :", error);
      }
    };

    fetchPhotos();
  }, [dog.id, photoUpdateKey]);

  const handleDeletePhoto = async (photoId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${photoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDogPhotos(dogPhotos.filter((photo) => photo.id !== photoId));
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Vous n'êtes pas autorisé à supprimer cette photo de chien.");
      } else {
        console.error(
          "Erreur lors de la suppression de la photo de chien:",
          error
        );
      }
    }
  };

  useEffect(() => {
    if (showQR) {
      const qrCodeURL = generateSecureQRCodeURL(dog.id);
      const canvas = document.getElementById(`qr-${dog.id}`);
      if (canvas) {
        QRCode.toCanvas(
          canvas,
          qrCodeURL,
          { width: 128, height: 128 },
          (error) => {
            if (error)
              console.error("Erreur lors de la génération du QR code:", error);
          }
        );
      }
    }
  }, [showQR, dog.id]);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    const d = today.getDate() - birthDateObj.getDate();
    if (m < 0 || (m === 0 && d < 0)) {
      age--;
    }

    let months;
    if (m < 0) {
      months = 12 + m;
    } else {
      months = m;
    }

    return `${age} ans et ${months} mois`;
  };
  const handleShare = () => {
    const qrCodeURL = generateSecureQRCodeURL(dog.id);
    if (navigator.share) {
      navigator
        .share({
          title: `QR Code pour ${dog.name_dog}`,
          url: qrCodeURL,
        })
        .then(() => console.log("QR Code partagé avec succès"))
        .catch((error) =>
          console.error("Erreur lors du partage du QR Code :", error)
        );
    } else {
      // Fallback pour les navigateurs qui ne supportent pas navigator.share
      console.log("Partage non supporté par ce navigateur.");
      // Vous pouvez copier le lien dans le presse-papiers ou afficher un message d'erreur
    }
  };

  const handleDownloadPDF = async () => {
    const input = qrCodeRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG", 10, 10);
    pdf.save(`qr-code-${dog.name_dog}.pdf`);
  };

  return (
    <div
      key={dog.id}
      className="flex flex-col items-center w-3/4 text-center ml-10"
    >
      <ul className="flex flex-wrap justify-center mt-5">
        {dogPhotos.length === 0 ? (
          <li className="flex space-x-4">
            <img
              src="src/images/avatar_dog.jpeg"
              alt="avatar dog"
              className="w-56 h-56 object-cover rounded-full border-4 border-gray-500 shadow-lg"
            />
          </li>
        ) : (
          dogPhotos.map((photo) => (
            <li key={photo.id} className="flex space-x-4 relative -mb-10 z-40">
              <img
                id="imgdog"
                src={`http://127.0.0.1:8000/storage/dogs_photos/${photo.photo_name_dog}?t=${photo.timestamp}`}
                alt={`Dog ${photo.dog_id}`}
                className="w-56 h-56 object-cover rounded-full border-4 border-orange-500 shadow-lg"
              />
              <div className="flex-col space-y-2 hidden">
                <p className="text-lg">Dog ID: {photo.dog_id}</p>
                <button
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className="bg-sky-100 shadow-gray-500 shadow-xl mt-2 w-full transform hover:scale-105 transition-transform duration-300 ease-in-out  rounded-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center">
            <FaDog className="mr-2" /> {dog.name_dog}
          </h3>
          
          <p className="text-gray-600 mb-4">
            <strong>Race:</strong> {dog.breed}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Date de naissance :</strong> {new Date(dog.birth_date).toLocaleDateString("fr-FR")}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Âge:</strong> {calculateAge(dog.birth_date)}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Poids:</strong> {dog.weight} kg
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Sexe:</strong> {dog.sex === "male" ? "Mâle" : dog.sex}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Informations médicales:</strong> {dog.medical_info}
          </p>
          
          

          <div className="flex justify-between items-center mb-4 p-8">
            <button
              onClick={() => onEdit(dog)}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <FaEdit className="mr-2" /> Modifier
            </button>
            <button
              onClick={() => onDelete(dog.id)}
              className="text-red-600 hover:text-red-800 flex items-center"
            >
              <FaTrashAlt className="mr-2" /> Supprimer
            </button>
           
          </div> 
          <button
            onClick={() => setShowQR(!showQR)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full mb-2 flex items-center justify-center"
          >
            {showQR ? (
              <>
                <FaEyeSlash className="mr-2" /> Masquer
              </>
            ) : (
              <>
                <FaEye className="mr-2" /> Afficher
              </>
            )}{" "}
            le QR Code
          </button>

          {showQR && (
            <>
              <div ref={qrCodeRef}>
                <div className="my-4 text-left">
                  <h2 className="text-xl font-bold mb-2">Code QR</h2>
                  <h3 className="text-lg">
                    Voici toutes les informations sur ma chienne{" "}
                    <span className="font-bold">
                      {dog.name_dog.toUpperCase()}
                    </span>
                  </h3>
                  <h4 className="text-lg">
                    n&apos;hésitez pas à les consulter !
                  </h4>
                 
                </div>
                <canvas
                  id={`qr-${dog.id}`}
                  className="qr-code mt-4 flex justify-center"
                ></canvas>
              </div>
              <div className="flex justify-center mt-2">
                <button
                  onClick={handleShare}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  <FaShareAlt className="mr-2" /> Partager
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  <FaFilePdf className="mr-2" /> Télécharger PDF
                </button>
                
              </div>
              <div className="flex justify-center mt-2">
              <p className="mt-2">
                    <a
                      href={generateSecureQRCodeURL(dog.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {dog.sex === "Femelle"
                        ? "Clique ici pour accéder à toutes les informations sur ma chienne "
                        : "Clique ici pour accéder à toutes les informations sur mon chien "}
                      {dog.name_dog.toUpperCase()} !
                    </a>
                  </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

DogCard.propTypes = {
  dog: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  photoUpdateKey: PropTypes.number.isRequired,
};

const ProfilsDogs = () => {
  const [dogs, setDogs] = useState([]);
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const closeModal = () => {
    setShowAddForm(false);
  };
  const [newDog, setNewDog] = useState({
    name_dog: "",
    breed: "",
    birth_date: "",
    weight: "",
    sex: "",
    medical_info: "",
    qr_code:"",
    user_id: user.id,
  });
  const [selectedDog, setSelectedDog] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editPhoto, setEditPhoto] = useState(false);
  const [photoUpdateKey, setPhotoUpdateKey] = useState(0);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch(DOGS_API_URL);
        if (!response.ok)
          throw new Error("Erreur lors de la récupération des données");

        const data = await response.json();
        const filteredDogs = data.filter((dog) => dog.user_id === user.id);

        const dogsWithPhotos = await Promise.all(
          filteredDogs.map(async (dog) => {
            try {
              const photosResponse = await fetch(API_URL);
              if (!photosResponse.ok)
                throw new Error("Erreur lors de la récupération des photos");

              const photosData = await photosResponse.json();
              const photosForDog = photosData.filter(
                (photo) => photo.dog_id === dog.id
              );
              return { ...dog, photos: photosForDog };
            } catch (error) {
              console.error(
                "Erreur lors de la récupération des photos:",
                error
              );
              return dog;
            }
          })
        );

        setDogs(dogsWithPhotos);
        setIsLoading(false);
      } catch (error) {
        setError("Erreur lors de la récupération des données");
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchDogs();
  }, [user.id]);

  const handleDelete = async (dogId) => {
    Notiflix.Confirm.show(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer ce chien ?",
      "Oui",
      "Non",
      async () => {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`${DOGS_API_URL}/${dogId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setDogs(dogs.filter((dog) => dog.id !== dogId));
          Notiflix.Notify.success("Profil de chien supprimé avec succès !");
        } catch (error) {
          if (error.response?.status === 401) {
            alert("Vous n'êtes pas autorisé à supprimer ce profil de chien.");
          } else {
            console.error(
              "Erreur lors de la suppression du profil de chien:",
              error
            );
          }
        }
      },
      () => {
        Notiflix.Notify.info("Suppression annulée");
      }
    );
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log("Form submitted");

    try {
      const token = localStorage.getItem("token");
      console.log("Token retrieved:", token);

      let dogData = { ...newDog };
      console.log("Dog data:", dogData);

      if (selectedDog) {
        console.log("Selected dog for update:", selectedDog);

        // Mise à jour des informations du chien
        const updateDogResponse = await axios.put(
          `${DOGS_API_URL}/${selectedDog.id}`,
          dogData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Dog update response:", updateDogResponse);

        // Si une nouvelle photo est sélectionnée pour modification
        if (editPhoto) {
          console.log("Photo edit mode enabled. Selected file:", selectedFile);

          // Extraction de l'ID de photo depuis selectedDog
          const photoId =
            selectedDog.photos && selectedDog.photos.length > 0
              ? selectedDog.photos[0].id
              : null;
          const photoUpdateUrl = `${API_URL}/${photoId}`;
          console.log("Photo update URL:", photoUpdateUrl);

          const formData = new FormData();
          formData.append("photo_name_dog", selectedFile);
          formData.append("dog_id", selectedDog.id);
          formData.append("_method", "PUT");
          console.log("FormData created for photo update:", formData);

          try {
            const photoUpdateResponse = await axios.post(
              photoUpdateUrl,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log("Photo update response:", photoUpdateResponse);

            // Mettre à jour l'état `dogs`
            const updatedDogs = dogs.map((dog) => {
              if (dog.id === selectedDog.id) {
                // Mettre à jour le nom de la photo et ajouter un timestamp
                const updatedPhotos = dog.photos.map((photo) => {
                  if (photo.id === photoId) {
                    return {
                      ...photo,
                      photo_name_dog: photoUpdateResponse.data.photo_name_dog,
                      timestamp: Date.now(),
                    };
                  }
                  return photo;
                });
                return { ...dog, photos: updatedPhotos };
              }
              return dog;
            });
            setDogs(updatedDogs);

            // Incrémenter photoUpdateKey
            setPhotoUpdateKey(Date.now());
          } catch (photoError) {
            console.error(
              "Erreur lors de la mise à jour de la photo:",
              photoError
            );
            console.error(
              "Full error details:",
              photoError.response ? photoError.response : photoError
            );
          }

          // Réinitialiser editPhoto après la mise à jour
          setEditPhoto(false);
          // ... après la mise à jour de l'image ...
          setDogs([...dogs]);
          console.log("editPhoto reset to false");
        }
      } else {
        console.log("Adding new dog");

        // Ajout d'un nouveau chien
        const response = await axios.post(DOGS_API_URL, dogData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("New dog add response:", response);

        // Si une photo est sélectionnée pour le nouveau chien
        if (selectedFile) {
          console.log("New photo selected for the new dog:", selectedFile);

          const formData = new FormData();
          formData.append("photo_name_dog", selectedFile);
          formData.append("dog_id", response.data.id);
          console.log("FormData created for new dog photo:", formData);

          try {
            const photoAddResponse = await axios.post(API_URL, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
            console.log("New dog photo add response:", photoAddResponse);
          } catch (photoError) {
            console.error(
              "Erreur lors de l'ajout de la photo du nouveau chien:",
              photoError
            );
            console.error(
              "Full error details:",
              photoError.response ? photoError.response : photoError
            );
          }
        }
      }

      // Mise à jour de la liste des chiens après ajout/mise à jour
      console.log("Fetching updated dog list");
      const updatedDogsResponse = await fetch(DOGS_API_URL);
      const updatedDogsData = await updatedDogsResponse.json();
      console.log("Updated dog list response:", updatedDogsData);
      setPhotoUpdateKey(Date.now());
      const filteredDogs = updatedDogsData.filter(
        (dog) => dog.user_id === user.id
      );
      console.log("Filtered dog list:", filteredDogs);

      setDogs(filteredDogs);
      setShowAddForm(false);
      console.log("Form closed, new dog data cleared");

      setNewDog({
        name_dog: "",
        breed: "",
        birth_date: "",
        weight: "",
        sex: "",
        medical_info: "",
        qr_code: generateSecureQRCodeURL(selectedDog.id),
        user_id: user.id,
      });
      setSelectedDog(null);
      setSelectedFile(null);
      setPhotoUpdateKey(Date.now());
      Notiflix.Notify.success(
        "Profil de chien ajouté ou modifié avec succès !"
      );
      console.log("Success notification sent");
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      console.error(
        "Full error details:",
        error.response ? error.response : error
      );
    }
    setPhotoUpdateKey(Date.now());
    //window.location.reload();
  };

  const handleEdit = (dog) => {
    setSelectedDog(dog);
    setNewDog(dog);
    setShowAddForm(true);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setEditPhoto(true); // Indique qu'une nouvelle photo est sélectionnée pour l'édition
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 dark:text-black">
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onEdit={handleEdit}
          onDelete={handleDelete}
          photoUpdateKey={photoUpdateKey} // Ajout de la clé de mise à jour
        />
      ))}

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-orange-500 text-white dark:text-white font-bold mt-8 py-4 px-4 rounded-md flex items-center justify-center hover:bg-orange-600 mx-auto"
      >
        {showAddForm ? (
          <FaTimes className="mr-2" />
        ) : (
          <FaPlus className="mr-2" />
        )}{" "}
        {showAddForm ? "Fermer le formulaire" : "Ajouter un nouveau chien"}
      </button>

      {showAddForm && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-300 relative">
            <button
              onClick={() => {
                closeModal();
                setShowAddForm(false);
                setSelectedDog(null);
                setSelectedFile(null);
                setNewDog({
                  name_dog: "",
                  breed: "",
                  birth_date: "",
                  weight: "",
                  sex: "",
                  medical_info: "",
                  qr_code: `https://univerdog.site/api/dog/${user.id}`,
                  user_id: user.id,
                });
              }}
              className="text-3xl pr-5 text-red-700 absolute top-2 right-2  hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"
            >
              ×
            </button>
            <form
              onSubmit={handleFormSubmit}
              className="mt-4"
              encType="multipart/form-data"
            >
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                {selectedDog
                  ? "Modifier le profil du chien"
                  : "Ajouter un nouveau chien"}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="name_dog"
                    className="block font-bold mb-2 dark:text-white"
                  >
                    Nom du chien:
                  </label>
                  <input
                    type="text"
                    id="name_dog"
                    value={newDog.name_dog}
                    onChange={(e) =>
                      setNewDog({ ...newDog, name_dog: e.target.value })
                    }
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="breed"
                    className="block font-bold mb-2 dark:text-white"
                  >
                    Race:
                  </label>
                  <input
                    type="text"
                    id="breed"
                    value={newDog.breed}
                    onChange={(e) =>
                      setNewDog({ ...newDog, breed: e.target.value })
                    }
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="birth_date"
                    className="block font-bold mb-2 dark:text-white"
                  >
                    Date de naissance:
                  </label>
                  <input
                    type="date"
                    id="birth_date"
                    value={newDog.birth_date}
                    onChange={(e) =>
                      setNewDog({ ...newDog, birth_date: e.target.value })
                    }
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="weight"
                    className="block font-bold mb-2 dark:text-white"
                  >
                    Poids:
                  </label>
                  <input
                    type="number"
                    id="weight"
                    value={newDog.weight}
                    onChange={(e) =>
                      setNewDog({ ...newDog, weight: e.target.value })
                    }
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="sex"
                    className="block font-bold mb-2 dark:text-white"
                  >
                    Sexe:
                  </label>
                  <select
                    id="sex"
                    value={selectedDog ? selectedDog.sex : newDog.sex}
                    onChange={(e) =>
                      setNewDog({ ...newDog, sex: e.target.value })
                    }
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  >
                    <option value="">Choisir un sexe</option>
                    <option value="male">Mâle</option>
                    <option value="Femelle">Femelle</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="medical_info"
                    className="block font-bold mb-2 dark:text-white"
                  >
                    Informations médicales:
                  </label>
                  <textarea
                    id="medical_info"
                    value={newDog.medical_info}
                    onChange={(e) =>
                      setNewDog({ ...newDog, medical_info: e.target.value })
                    }
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  ></textarea>
                </div>

                <div className="mb-4 col-span-2">
                  <label
                    htmlFor="photo_name_dog"
                    className="block font-bold mb-2 dark:text-white"
                  >
                    Photo:
                  </label>
                  <input
                    type="file"
                    id="photo_name_dog"
                    onChange={handleFileChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full dark:text-white"
                  />
                </div>
              </div>

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
                >
                  {selectedDog ? "Modifier le profil" : "Ajouter le profil"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilsDogs;
