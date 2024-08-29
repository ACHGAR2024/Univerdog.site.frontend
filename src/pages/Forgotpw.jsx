import { useState } from "react";
import axios from "axios";

function Forgotpw() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Afficher l'indicateur de chargement

    try {
      const response = await axios.post('/api/password/email', { email });
      alert('Email de réinitialisation envoyé');
      setMessage(response.data.message || "Un email de réinitialisation de mot de passe a été envoyé.");
      setErrorMessage("");
      // Redirection ou affichage d'un message de confirmation
    } catch (error) {
      if (error.response) {
        // Gérer les erreurs spécifiques du serveur
        switch (error.response.status) {
          case 422: // Validation error (ex: email invalide)
            setErrorMessage(error.response.data.errors.email[0]);
            break;
          case 404: // Email non trouvé
            setErrorMessage("Aucun compte trouvé avec cet email.");
            break;
          default:
            setErrorMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
        }
      } else {
        setErrorMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
      }
      console.error(error);
    } finally {
      setIsLoading(false); // Cacher l'indicateur de chargement
    }
  };

  return (
    <header
      className="flex w-full flex-col h-screen justify-center items-center poetsen-one-regular bg-cover bg-no-repeat dark:bg-gray-900"
      style={{ backgroundImage: `url('/src/images/dog-forgotpw.jpg')` }}
    >
      <div className="flex flex-col items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-black shadow-md rounded-md px-4 pt-4 pb-4 text-sm bg-opacity-60 dark:bg-gray-800 dark:text-white"
        >
          <h2 className="text-white text-lg font-bold mb-4 dark:text-white">
            Mot de passe oublié
          </h2>
          <h3 className="font-bold mb-2 text-xs text-jaune_univerdog_01 dark:text-yellow-400">
            Veuillez saisir votre adresse e-mail ici pour recevoir un e-mail de
            réinitialisation de mot de passe.
          </h3>
          <div className="mb-4">
            <label
              htmlFor="email_mot_de_passe_oublie"
              className="block text-gray-200 dark:text-gray-300"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <i className="fa fa-envelope-o fa-fw pr-1 dark:text-gray-400"></i>
              </span>
              <input
                id="email_mot_de_passe_oublie"
                type="email"
                autoComplete="off"
                className="form-control pl-10 p-2 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
              disabled={isLoading}
            >
              Envoyer
            </button>
          </div>
          {message && (
            <p className="text-green-500 text-center mt-2">{message}</p>
          )}
          {errorMessage && (
            <ul className="text-red-500 text-center mt-2 list-disc list-inside">
              {errorMessage.split("\n").map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </header>
  );
}

export default Forgotpw;
