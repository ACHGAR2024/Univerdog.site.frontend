import { useState } from "react";
import PropTypes from "prop-types";

function SearchForm({ onFormSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [city, setCity] = useState("");
  const [departement, setDepartement] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
    onFormSubmit({
      searchQuery,
      city: event.target.value,
      departement,
    });
  };

  const handleChangeDepartement = (event) => {
    setDepartement(event.target.value);
    onFormSubmit({
      searchQuery,
      city,
      departement: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setHasSearched(true);

    const apiUrl = `https://geo.api.gouv.fr/communes?codePostal=${searchQuery}&fields=nom,departement`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-row">
        <input
          type="text"
          placeholder="Entrez le code postal"
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={handleFormSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Rechercher
        </button>
      </div>

      {hasSearched && (
        <div className="mt-4">
          <div className="flex flex-row">
            <select
              value={city}
              onChange={handleChangeCity}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Sélectionner une commune</option>
              {results.map((result, index) => (
                <option key={index} value={result.nom}>
                  {result.nom}
                </option>
              ))}
            </select>
            <select
              value={departement}
              onChange={handleChangeDepartement}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Sélectionner un département</option>
              {results.map((result, index) => (
                <option key={index} value={result.departement.nom}>
                  {result.departement.nom}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

SearchForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
