import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import PropTypes from 'prop-types';
const RoutingMachine = ({ from, to }) => {
  const map = useMap();

  L.Routing.control({
    waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
    lineOptions: {
      styles: [{ color: "#007bff", weight: 5 }], // Customize route line style
    },
    showAlternatives: true, // Show alternative routes
    altLineOptions: {
      styles: [{ color: "#6c757d", weight: 4 }], // Customize alternative route line style
    },
    router: L.Routing.mapbox("YOUR_MAPBOX_ACCESS_TOKEN"), // Replace with your Mapbox access token
  }).addTo(map);

  return null;
};
RoutingMachine.propTypes = {
    from: PropTypes.array.isRequired,
    to: PropTypes.array.isRequired,
  };
export default RoutingMachine;