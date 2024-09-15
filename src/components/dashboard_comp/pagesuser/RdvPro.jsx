import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppointmentsUser from "./AppointmentsUser";
import AppointmentsManagerUser from "./AppointmentsManagerUser";
import { UserContext } from "../../../context/UserContext";
import Notiflix from "notiflix";

const RdvPro = () => {
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
          `http://127.0.0.1:8000/api/dogs_user/${user.id}`
        );
        setDogs(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des chiens:", error);
      }
    };

    const fetchSpecialty = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/speciality"
        );
        setSpecialties(response.data); // Correct : Utilisez la fonction setSpecialties pour mettre à jour l'état
      } catch (error) {
        console.error("Erreur lors de la sélection des spécialités:", error);
      }
    };

    const fetchProfessionals = async () => {
      try {
        const specialtyResponse = await axios.get(
          "http://127.0.0.1:8000/api/speciality"
        );
        const specialties = specialtyResponse.data;

        const vetSpecialties = specialties.filter(
          (specialty) =>
            specialty.name_speciality === "Clubs et écoles de dressage" ||
            specialty.name_speciality === "Toiletteur canine"
        );

        if (vetSpecialties.length === 0) {
          console.error("Aucune spécialité 'Vétérinaire' trouvée.");
          return;
        }

        const vetProfessionalIds = vetSpecialties.map(
          (specialty) => specialty.professional_id
        );

        const professionalsResponse = await axios.get(
          "http://127.0.0.1:8000/api/professionals"
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
          <i className="fa-solid fa-bone text-red-600 mr-2"></i>

          <span className="mr-2 dark:text-white">
            Prendre un rendez-vous avec spécialiste canine :{" "}
          </span>
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
            <button
              className="mb-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
              onClick={() => handleButtonClick("RDV SERVICE")}
            >
              <i className="fa-solid fa-calendar-plus mr-2"></i>
              Prendre RDV
            </button>
            <button
              onClick={handleButtonClickCrud}
              className="bg-green-500  text-white px-4 py-2 rounded hover:bg-green-600 flex items-center justify-center"
            >
              <i className="fa-solid fa-calendar mr-2"></i>
              Gérer mes rendez-vous
            </button>
          </div>
        </div>

        <div></div>
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

export default RdvPro;
