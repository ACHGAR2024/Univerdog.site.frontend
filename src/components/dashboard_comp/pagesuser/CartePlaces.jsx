import { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import TraceItineraire from "./TraceItineraire";
import { getCityCoordinates } from "../../../utils/geocode";
import { UserContext } from "../../../context/UserContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CartePlaces = ({ apiKey }) => {
  const userData = useContext(UserContext);
  const [termeRecherche, setTermeRecherche] = useState("");
  const [marqueurs, setMarqueurs] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [adresseDepart, setAdresseDepart] = useState("");
  const [coordDepart, setCoordDepart] = useState(null);
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    if (userData && userData.address) {
      setAdresseDepart(`${userData.address} ${userData.postal_code} le Mans`);
      
    }
  }, [userData]);

  useEffect(() => {
    const fetchCoordDepart = async () => {
      if (adresseDepart) {
        try {
          const { lat, lon } = await getCityCoordinates(adresseDepart);
          setCoordDepart([lat, lon]);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des coordonnées de départ",
            error
          );
        }
      }
    };
    fetchCoordDepart();
  }, [adresseDepart]);

  useEffect(() => {
    const fetchLieux = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/places");
        const lieuxData = response.data.places || [];

        const marqueursAvecCoordonnees = await Promise.all(
          lieuxData.map(async (lieu) => {
            try {
              if (lieu.address) {
                const { lat, lon } = await getCityCoordinates(lieu.address);
                return {
                  position: [lat, lon],
                  popup: `${lieu.title} - ${lieu.price}€`,
                  photo: lieu.photo,
                  address: lieu.address,
                  id: lieu.id,
                  title: lieu.title,
                  type: lieu.type,
                };
              }
              return null;
            } catch (error) {
              console.error(`Erreur pour ${lieu.address}: ${error.message}`);
              return null;
            }
          })
        );

        setMarqueurs(
          marqueursAvecCoordonnees.filter((marqueur) => marqueur !== null)
        );
      } catch (error) {
        console.error("Erreur lors de la récupération des lieux", error);
      }
    };

    fetchLieux();
  }, []);

  useEffect(() => {
    if (coordDepart && selectedMarker) {
      const fetchRoute = async () => {
        try {
          const response = await axios.get(
            `https://api.openrouteservice.org/v2/directions/driving-car`,
            {
              params: {
                api_key: apiKey,
                start: `${coordDepart[1]},${coordDepart[0]}`,
                end: `${selectedMarker.position[1]},${selectedMarker.position[0]}`,
              },
            }
          );

          setRouteData(response.data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de l'itinéraire:",
            error
          );
        }
      };

      fetchRoute();
    }
  }, [coordDepart, selectedMarker, apiKey]);

  const handleMarkerClick = (marqueur) => {
    setSelectedMarker(marqueur);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { lat, lon } = await getCityCoordinates(adresseDepart);
      setCoordDepart([lat, lon]);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des coordonnées de départ",
        error
      );
    }
  };

 
  const userHomeMarker = coordDepart
    ? {
        position: coordDepart,
        popup: adresseDepart === `${userData.address} ${userData.postal_code} le Mans` ? "Votre adresse" : "Nouvelle adresse",
        icon: new L.divIcon({
          html: adresseDepart === `${userData.address} ${userData.postal_code} le Mans` ?`<i class="fas fa-home text-2xl text-blue-700 mt-1 ml-1"></i>`:`<i class="fas fa-map-marker text-2xl text-red-700 mt-1 ml-2"></i>`,
          iconSize: [38, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
        }),
      }
    : null;

  return (
    <div
      style={{ position: "relative", height: "100%", width: "100%" }}
      className="z-0"
    >
      <form
        onSubmit={handleSubmit}
        className="w-3/5 text-xs absolute top-2 left-2/3 transform -translate-x-1/2 pb-4 pl-4 opacity-80 rounded border z-50 bg-white dark:bg-gray-800 text-black dark:text-white border-black dark:border-white"
        style={{ zIndex: 1000 }}
      >
        <input
          type="text"
          placeholder="Adresse de départ..."
          value={adresseDepart}
          onChange={(e) => setAdresseDepart(e.target.value)}
          className="text-xs mt-4 rounded border z-50 bg-white dark:bg-gray-800 text-black dark:text-white border-black dark:border-white p-2"
        />
        <button
          type="submit"
          className="text-xs p-1 m-1 bg-blue-500 text-white rounded ml-2"
        >
          Calculer l&apos;itinéraire
        </button><input
        type="text"
        placeholder="Rechercher..."
        value={termeRecherche}
        onChange={(e) => setTermeRecherche(e.target.value)}
        className="mt-4 md:ml-10 -ml-2  text-xs md:w-56 opacity-80 rounded border z-50 bg-white dark:bg-gray-800 text-black dark:text-white border-black dark:border-white"
        style={{ zIndex: 1000 }}
      />
      </form>

      

      <div className="flex flex-row">

        <div
          className="h-1/2 w-48 text-xs absolute  bottom-5 left-5 mb-4 mr-4 transform overflow-y-auto opacity-80 rounded border z-50 bg-white dark:bg-gray-800 text-black dark:text-white border-black dark:border-white"
          style={{ zIndex: 1000, maxHeight: "calc(100vh - 11rem)" }}
        >
          <div className="info-panel   border-b-4 text-center p-4 overflow-y-auto">
          {routeData?.features[0]?.properties ? (
            <div>
              <p>
                <strong>
                  <i className="fas fa-map-marker-alt"></i> Distance:
                </strong>{" "}
                {(
                  routeData.features[0].properties.summary.distance / 1000
                ).toFixed(2)}{" "}
                km
              </p>
              <p>
                <i className="fas fa-bicycle"></i>
                <strong> Durée:</strong>{" "}
                {(
                  routeData.features[0].properties.summary.duration / 60
                ).toFixed(2)}{" "}
                minutes
              </p>
            </div>
          ) : (
            <p className="text-red-500">Veuillez cliquer sur un lieu</p>
          )}
        </div>
          <ul className="list-disc ">
            
            {marqueurs
              .filter((lieu) =>
                lieu.title
                  .toLowerCase()
                  .includes(termeRecherche.toLowerCase())
              )
              .map((lieu) => (
                <li key={lieu.id} className="flex items-center border-b-2 ">
                  <img
                    className="h-10 w-10 m-2 object-cover rounded-lg animate-fadeIn"
                    src={`http://127.0.0.1:8000${lieu.photo}`}
                    alt={lieu.title}
                  />
                  <div>
                    <Link
                      to={`/fiche-place/${lieu.id}`}
                      className="text-md font-bold"
                    >
                      {lieu.title}
                    </Link>
                   
                  </div>
                   
                  
                </li>
              ))}
          </ul>
        </div>

        <MapContainer
          center={coordDepart || [48.00622, 0.19501]} 
          zoom={12}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {userHomeMarker && (
            <Marker
              position={userHomeMarker.position}
              icon={userHomeMarker.icon}
            >
              <Popup className="p-2">
                <div className="text-center">
                  <p>{userHomeMarker.popup}</p>
                </div>
              </Popup>
            </Marker>
          )}

          {marqueurs
            .filter((marqueur) =>
              marqueur.popup
                .toLowerCase()
                .includes(termeRecherche.toLowerCase())
            )
            .map((marqueur) => (
              <Marker
                key={marqueur.id}
                position={marqueur.position}
                icon={
                  new L.divIcon({
                    html: `<i class="ml-2 mt-1 fas fa-${
                      marqueur.type
                    } text-2xl text-${
                      ["red", "gray", "yellow", "green", "blue", "indigo"][
                        Math.floor(Math.random() * 6)
                      ]
                    }-700  dark:text-${
                      ["red", "gray", "yellow", "green", "blue", "indigo"][
                        Math.floor(Math.random() * 6)
                      ]
                    }-700"></i>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40],
                  })
                }
                eventHandlers={{
                  click: () => handleMarkerClick(marqueur),
                }}
              >
                <Popup className="p-2">
                  <div className="text-center">
                    <a
                      href={`/fiche-place/${marqueur.id}`}
                      className="text-md font-bold"
                    >
                      {marqueur.title}
                      <br />
                      <div className="flex items-center justify-center mt-3">
                        <img
                          className="h-10 object-cover rounded-lg animate-fadeIn"
                          src={`http://127.0.0.1:8000${marqueur.photo}`}
                          alt={marqueur.title}
                        />
                      </div>
                      <p className="mt-2 text-md font-semibold">
                        <i className="fas fa-map-marker-alt text-red-800 dark:text-red-400"></i>{" "}
                        {marqueur.address}
                      </p>
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}

          {coordDepart && selectedMarker && (
            <TraceItineraire routeData={routeData} />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

CartePlaces.propTypes = {
  apiKey: PropTypes.string,
};

export default CartePlaces;
