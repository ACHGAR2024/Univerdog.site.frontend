import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";

const RegisterForm = () => {
  const [checkedItems] = useState([]);
  const [locationData, setLocationData] = useState({
    city: "",
    departement: "",
  });

  useEffect(() => {
    console.log("checkedItems", checkedItems);
  }, [checkedItems]);

  const handleFormData = (data) => {
    console.log("data", data);
    setLocationData({
      city: data.city,
      departement: data.departement,
    });
  };

  return (
    <div className="UserEdit">
    
      <form>
        <h2>Vos Coordonnées</h2>

        <div className="group">
          <label htmlFor="city">Localisation</label>
          <SearchForm onFormSubmit={handleFormData} />
        </div>

        {locationData.city && (
          <div>
            <h3>Ville sélectionnée: {locationData.city}</h3>
          </div>
        )}
        {locationData.departement && (
          <div>
            <h3>Département sélectionné: {locationData.departement}</h3>
          </div>
        )}

        {/* Other form fields can go here */}

        <button type="submit" className="ml-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
          Soumettre
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
