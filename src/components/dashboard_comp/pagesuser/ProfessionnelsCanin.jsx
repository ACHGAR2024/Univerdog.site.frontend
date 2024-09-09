import { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

const ProfessionnelsCanin = () => {
  const [professionals, setProfessionals] = useState([]);
  const [places, setPlaces] = useState([]);
  const [specialities, setSpecialities] = useState([]);

  useEffect(() => {
    const fetchProfessionalsAndPlaces = async () => {
      try {
        const [professionalsResponse, placesResponse, specialitiesResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/professionals'),
          axios.get('http://127.0.0.1:8000/api/places'),
          axios.get('http://127.0.0.1:8000/api/speciality'), // Fetch specialities
        ]);

        setProfessionals(professionalsResponse.data);
        console.log('Professionals:', professionalsResponse.data);
        setPlaces(placesResponse.data);
        console.log('Places:', placesResponse.data);
        setSpecialities(specialitiesResponse.data);
        console.log('Specialities:', specialitiesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProfessionalsAndPlaces();
  }, []);

  const findPlaceForProfessional = (placeId) => {
    // Access the 'places' array within the 'places' object
    if (Array.isArray(places.places) && places.places.length > 0) {
      const place = places.places.find((place) => place.id === placeId);
      return place || null;
    } else {
      return null;
    }
  };

  const findSpecialitiesForProfessional = (professionalId) => {
    return specialities.filter((speciality) => speciality.professional_id === professionalId);
  };

  return (
    <div className=' dark:text-black'>
      <h2 className="text-3xl font-bold mb-6 ml-10 flex items-center dark:text-white">
        <i className="fa-solid fa-dog w-6 h-6 mr-2 text-orange-500"></i>
        &nbsp; Professionnels canins
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionals.map((professional) => {
          const place = findPlaceForProfessional(professional.place_id);
          const professionalSpecialities = findSpecialitiesForProfessional(professional.id);

          return (
            <div
              key={professional.id}
              className="dashboard-card p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={place ? `http://127.0.0.1:8000${place.photo}` : 'https://via.placeholder.com/150'}
                alt={professional.company_name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2 text-center dark:text-black">
                {professional.company_name}
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                {professional.description_pro}
              </p>
 {/* Display specialities if available */}
 {professionalSpecialities.length > 0 && (
                <div className="mt-2">
                  <p className="text-gray-600 mb-2 text-center font-bold">
                    Spécialités:
                  </p>
                  
                    {professionalSpecialities.map((speciality) => (
                      <p key={speciality.id} className="text-orange-500 text-center">{speciality.name_speciality}</p>
                    ))}
                 
                </div>
              )}
              {/* Display place information if available */}
              {place && (
                <div className="mt-4">
                  <div className="flex items-center justify-center my-4">
                    <i className="fa-solid fa-map-location text-orange-500 pr-2"></i>
                    <div className="text-center">{place.title}</div>
                  </div>
                  <div className="flex items-center justify-center my-4">
                    <i className="fa-solid fa-map-pin text-orange-500 pr-2"></i>
                    <div className="text-center">{place.address}</div>
                  </div>
                  <div className="flex items-center justify-center my-4">
                    <i className="fa-solid fa-crosshairs text-orange-500 pr-2"></i>
                    <div className="text-center">{place.latitude} {place.longitude}</div>
                  </div>
                  {/* Assuming you have postal_code in your places data */}
                  <div className="flex items-center justify-center my-4">
                    <i className="fa-solid fa-mail-bulk text-orange-500 pr-2"></i>
                    <div className="text-center">{place.postal_code}</div>
                  </div>
                  <div className="text-center text-orange-500">
                    <a
                      href={`https://www.google.com/maps/place/${place.latitude},${place.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Voir sur Google Maps
                    </a>
                  </div>
                </div>
              )}

              {/* Assuming you have a rating field in your API data */}
              <div className="text-center my-8">
              <StarRatings
              
                rating={
                  Math.round((parseFloat(professional.rates) || 0) * 2) / 2
                }
                starRatedColor="orange"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="2px"
              /> &nbsp; &nbsp;{professional.rates}
</div>
              <button className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full flex items-center justify-center mt-2">
                <i className="fa-solid fa-eye mr-2"></i>Voir profil
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfessionnelsCanin;