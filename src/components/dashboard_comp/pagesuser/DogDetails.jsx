import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaPaw,
  FaDog,
  FaVenusMars,
  FaCalendarAlt,
  FaWeight,
  FaSyringe,
} from "react-icons/fa"; 

const DogDetails = () => {
  const { dogIdcrypted } = useParams();
  const [dog, setDog] = useState(null);
  const [dogPhoto, setDogPhoto] = useState(null);

  // Fonction pour décrypter l'ID du chien
  const decryptDogId = (dogIdcrypted) => {
    return Math.round(parseInt(dogIdcrypted) / 3456);
  };

  useEffect(() => {
    const fetchDogDetails = async () => {
      try {
        const dogId = decryptDogId(dogIdcrypted);
        const response = await fetch(`http://127.0.0.1:8000/api/dogs/${dogId}`);
        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des détails du chien"
          );
        }
        const data = await response.json();
        setDog(data);

        // Récupérer la photo du chien
        const photosResponse = await fetch(
          `http://127.0.0.1:8000/api/dogs-photos`
        );
        if (!photosResponse.ok) {
          throw new Error(
            "Erreur lors de la récupération de la photo du chien"
          );
        }
        const photosData = await photosResponse.json();
        const photo = photosData.find((photo) => photo.dog_id === dogId);
        setDogPhoto(photo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDogDetails();
  }, [dogIdcrypted]);

  if (!dog) {
    return <div>Chargement...</div>;
  }
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

    return `${age} ans ${months} mois`;
  };
  return (
    <div className="container w-2/3 mx-auto p-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center mb-6 ">
          <img
            src="../src/images/logo.png"
            alt="logo"
            className="mx-auto w-32 z-50"
          />
          <h2 className="text-2xl font-bold mb-4 text-center">UniverDog</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center mb-6">
            {dogPhoto && (
              <img
                src={`http://127.0.0.1:8000/storage/dogs_photos/${dogPhoto.photo_name_dog}`}
                alt={`Photo de ${dog.name_dog}`}
                className="mt-4 w-2/3 object-cover rounded-t-lg "
              />
            )}
          </div>
          <div className="flex flex-col items-left mt-10">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaDog className="mr-2" /> {dog.name_dog}
            </h2>
            <div className="flex items-center mt-2 text-gray-600">
              <FaPaw className="mr-2" /> {dog.breed}
            </div>
            <div className="flex items-center mt-2 text-gray-600">
              <FaVenusMars className="mr-2" />{" "}
              {dog.sex === "male" ? "Mâle" : "Femelle"}
            </div>
            <div className="flex items-center mt-2 text-gray-600">
              <FaCalendarAlt className="mr-2" /> Né le :  {new Date(dog.birth_date).toLocaleDateString("fr-FR")}
            </div>
            <div className="flex items-center mt-2 text-gray-600">
              <FaCalendarAlt className="mr-2" /> Age  : {calculateAge(dog.birth_date)} 
            </div>
            <div className="flex items-center mt-2 text-gray-600">
              <FaWeight className="mr-2" /> {dog.weight} kg
            </div>
          </div>{" "}
        </div> <p><FaSyringe className="mr-2  text-red-600" /><h3> Infos médicales et autres :</h3></p> 
        <div className="flex items-center p-8 mt-2 text-gray-600 bg-slate-200 rounded-md">
          
           {dog.medical_info}
        </div>
      </div>
    </div>
  );
};

export default DogDetails;
