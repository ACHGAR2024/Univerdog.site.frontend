import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const GoogleLoginComponent = () => {
  const handleSuccess = (response) => {
    const token = response.credential;
    const user = jwt_decode(token);
    console.log("Utilisateur connecté avec succès : ", user);
    // Vous pouvez gérer l'utilisateur ici (par exemple, en le sauvegardant dans un état ou dans un contexte)
  };

  const handleError = () => {
    console.log("Erreur lors de la connexion");
  };

  return (
    <GoogleOAuthProvider clientId="505686323657-h36l1ttme6v4rev761odsejfgovehm04.apps.googleusercontent.com">
      <div>
        <h2>Connexion avec Google</h2>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
