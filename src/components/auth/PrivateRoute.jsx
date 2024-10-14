import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Render the component with the remaining props or redirect
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

// Define `element` as a React component
PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
