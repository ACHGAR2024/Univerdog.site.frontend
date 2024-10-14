import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppointmentsUser from "./AppointmentsUser";
import AppointmentsManagerUser from "./AppointmentsManagerUser";
import { UserContext } from "../../../context/UserContext";
import Notiflix from "notiflix";

const ServicesVeto = () => {
  const [showAppointments, setShowAppointments] = useState(false);
  const [showAppointmentsCrud, setShowAppointmentsCrud] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [firstSelect, setFirstSelect] = useState("");
  const [secondSelect, setSecondSelect] = useState("");
  const [dogs, setDogs] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [specialties, setSpecialties] = useState([]); // Déclaré correctement

  const user = useContext(UserContext);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get(
          `https://api.univerdog.site/api/dogs_user/${user.id}`
        );
        setDogs(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des chiens:", error);
      }
    };

    const fetchSpecialty = async () => {
      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/speciality"
        );
        setSpecialties(response.data); // Correct : Utilisez la fonction setSpecialties pour mettre à jour l'état
      } catch (error) {
        console.error("Erreur lors de la sélection des spécialités:", error);
      }
    };

    const fetchProfessionals = async () => {
      try {
        const specialtyResponse = await axios.get(
          "https://api.univerdog.site/api/speciality"
        );
        const specialties = specialtyResponse.data;

        const vetSpecialties = specialties.filter(
          (specialty) =>
            specialty.name_speciality === "Vétérinaire" ||
            specialty.name_speciality === "Cliniques vétérinaires"
        );

        if (vetSpecialties.length === 0) {
          console.error("Aucune spécialité 'Vétérinaire' trouvée.");
          return;
        }

        const vetProfessionalIds = vetSpecialties.map(
          (specialty) => specialty.professional_id
        );

        const professionalsResponse = await axios.get(
          "https://api.univerdog.site/api/professionals"
        );
        const allProfessionals = professionalsResponse.data;

        const vetProfessionals = allProfessionals.filter((professional) =>
          vetProfessionalIds.includes(professional.id)
        );

        setProfessionals(vetProfessionals);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des professionnels:",
          error
        );
      }
    };

    fetchSpecialty();
    fetchProfessionals();
    fetchDogs();
  }, [user.id, setSpecialties, setProfessionals, setDogs]);

  const handleButtonClick = (serviceType) => {
    if (!firstSelect || !secondSelect) {
      Notiflix.Notify.warning(
        "Veuillez selectionner un chien et un vétérinaire"
      );
      return;
    }
    setSelectedService(serviceType);
    setShowAppointments(true);
    setShowAppointmentsCrud(false);
  };

  const handleButtonClickCrud = () => {
    if (!firstSelect || !secondSelect) {
      Notiflix.Notify.warning(
        "Veuillez selectionner un chien et un vétérinaire"
      );
      return;
    }
    setShowAppointmentsCrud(true);
    setShowAppointments(false);
  };

  return (
    <div>
      <div>
        <h2 className="text-xl font-bold ml-10 flex items-center">
          <i className="fa-solid fa-heart-pulse text-red-600 mr-2"></i>

          <span className="mr-2 dark:text-white">Services vétérinaires </span>
        </h2>
        <div className="p-4 flex items-center">
          <div>
            <select
              id="firstSelect"
              value={firstSelect}
              onChange={(e) => setFirstSelect(e.target.value)}
              className="border p-2 mx-4"
            >
              <option value="">Sélectionnez un chien</option>
              {dogs.map((dog) => (
                <option key={dog.id} value={dog.id}>
                  {dog.name_dog}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              id="secondSelect"
              value={secondSelect}
              onChange={(e) => setSecondSelect(e.target.value)}
              className="border p-2"
            >
              <option value="">Sélectionnez un professionnel</option>
              {professionals.map((professional) => (
                <option key={professional.id} value={professional.id}>
                  Vétérinaire -{professional.company_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="dashboard-card p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden">
            <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center">
              <i className="fa-solid fa-stethoscope text-red-600 mr-2"></i>
              Consultation générale
            </h3>
            <p className="text-gray-600 mb-4">
              Examen complet de santé pour votre animal
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
              onClick={() => handleButtonClick("Consultation générale")}
            >
              <i className="fa-solid fa-calendar mr-2"></i>
              Prendre RDV
            </button>
          </div>
          <div className="dashboard-card p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden">
            <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center">
              <i className="fa-solid fa-syringe text-red-600 mr-2"></i>
              Vaccination
            </h3>
            <p className="text-gray-600 mb-4">
              Mise à jour des vaccins essentiels
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
              onClick={() => handleButtonClick("Vaccination")}
            >
              <i className="fa-solid fa-calendar mr-2"></i>
              Prendre RDV
            </button>
          </div>
          <div className="dashboard-card p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden">
            <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center">
              <i className="fa-solid fa-hospital text-red-600 mr-2"></i>
              Chirurgie
            </h3>
            <p className="text-gray-600 mb-4">
              Interventions chirurgicales sur demande
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
              onClick={() => handleButtonClick("Chirurgie demande appel")}
            >
              <i className="fa-solid fa-phone mr-2"></i>
              Demander d être appelé par un spécialiste
            </button>
          </div>
        </div>

        <div>
          <button
            onClick={handleButtonClickCrud}
            className="bg-green-500 mb-5 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center justify-center"
          >
            Gérer mes rendez-vous
          </button>
        </div>
      </div>

      {showAppointments && (
        <div className="">
          <AppointmentsUser
            selectedService={selectedService}
            selectedDog={firstSelect}
            selectedProfessional={secondSelect}
          />
        </div>
      )}

      {showAppointmentsCrud && (
        <div className="">
          <AppointmentsManagerUser
            selectedProfessional={secondSelect}
            selectedDog={firstSelect}
          />
        </div>
      )}

      <select className="mb-4 invisible">
        <option value="">Sélectionnez une specialité</option>
        {specialties.map((specialty) => (
          <option key={specialty.id} value={specialty.id}>
            {specialty.name_speciality}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ServicesVeto;
