import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Forgotpw() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show the loading indicator

    try {
      const response = await axios.post(
        "https://api.univerdog.site/api/forgotpw/" + email
      );

      //(response.data); // Display the response data
      setMessage(
        response.data.message ||
          "An email to reset your password has been sent. Valid for 60 minutes."
      );
      setErrorMessage("");
      // Redirect or display a confirmation message
    } catch (error) {
      if (error.response) {
        // Handle server specific errors
        switch (error.response.status) {
          case 422: // Validation error (ex: invalid email)
            setErrorMessage(error.response.data.errors.email[0]);
            console.error(error);
            break;
          case 404: // Email not found
            setErrorMessage(
              "Aucun compte n'a été associé avec cette adresse e-mail."
            );
            console.error(error);
            break;
          default:
            setErrorMessage(
              "Une erreur est survenue. Veuillez réessayer plus tard."
            );
        }
      } else {
        setErrorMessage(
          "Une erreur est survenue. Veuillez réessayer plus tard."
        );
      }
      console.error(error);
    } finally {
      setIsLoading(false); // Hide the loading indicator
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
              {isLoading ? (
                <img
                  src="/src/images/icons8-sablier.gif"
                  alt="Loading"
                  className="w-6 h-6 inline-block"
                />
              ) : (
                "Envoyer"
              )}
            </button>
            <Link to="/">
              <button
                type="button"
                className="mt-3 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full"
              >
                Retour
              </button>
            </Link>
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
