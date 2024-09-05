import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Rendre le composant avec les props restants ou rediriger
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

// Définir `element` comme un composant React
PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired, // ElementType pour un composant React
};

export default PrivateRoute;
