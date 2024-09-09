import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import PropTypes from "prop-types";

const TraceItineraire = ({ routeData }) => {
  const map = useMap();

  useEffect(() => {
    if (!routeData) return;

    const coordinates = routeData.features[0]?.geometry?.coordinates;

    if (!coordinates) {
      console.error("Les coordonnées de l'itinéraire ne sont pas disponibles.");
      return;
    }

    const latLngs = coordinates.map((coord) => L.latLng(coord[1], coord[0]));

    const routeLine = L.polyline(latLngs, {
      color: "#6FA1EC",
      weight: 4,
    }).addTo(map);
    map.fitBounds(routeLine.getBounds());

    return () => {
      map.removeLayer(routeLine);
    };
  }, [routeData, map]);

  return null;
};

TraceItineraire.propTypes = {
  routeData: PropTypes.object,
};

export default TraceItineraire;
