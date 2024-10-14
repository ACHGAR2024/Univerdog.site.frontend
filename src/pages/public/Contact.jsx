import { useState, useEffect } from "react";
import Nav from "../../components/nav_footer/Nav";
import Footer from "../../components/nav_footer/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";

function Contact() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(null); // Initialisé à null
  const [errorMessage, setErrorMessage] = useState(null); // Initialisé à null

  useEffect(() => {
    const userIsAuthenticated = false; // Vérifiez l'authentification ici
    setIsAuthenticated(userIsAuthenticated);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Réinitialiser les messages d'erreur et de succès
    setErrorMessage(null);
    setSuccessMessage(null);

    if (message.length < 10) {
      setErrorMessage("Le message doit contenir au moins 10 caractères.");
      return;
    }

    const formData = {
      name: name.trim(),
      email: "mail@api.univerdog.site",
      subject: subject.trim(),
      message: `
      Mail Expediteur: 
      <${email.trim()}> 
    
      Messge: 
    
      ${message.trim()}
      `,
    };
    try {
      const response = await axios.post(
        "https://api.univerdog.site/api/contact",
        formData,
        {
          headers: {
            // "Content-Type": "application/json", // Déjà inclus par défaut dans axios
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Votre message a été envoyé avec succès !");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        throw new Error(
          "Une erreur s'est produite lors de l'envoi du message."
        );
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          "Une erreur s'est produite lors de l'envoi du message."
        );
      }
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Contactez-nous - UniverDog</title>
          <meta
            name="description"
            content="Contactez-nous pour toute question ou information supplémentaire sur UniverDog."
          />
          <meta property="og:title" content="Contactez-nous - UniverDog" />
          <meta
            property="og:description"
            content="Utilisez notre formulaire de contact pour nous joindre directement."
          />
          <meta property="og:type" content="website" />
        </Helmet>
      </HelmetProvider>
      <Nav isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <header
        className="text-xs flex w-full flex-col h-screen justify-center items-center poetsen-one-regular bg-cover bg-no-repeat dark:bg-gray-900"
        style={{ backgroundImage: `url('/src/images/dog-contact.webp')` }}
      >
        <div className="flex flex-col items-center justify-center h-screen">
          <form
            onSubmit={handleSubmit}
            className="w-96 max-w-md mx-auto bg-black shadow-md rounded-md px-4 pt-4 pb-4 text-xs bg-opacity-60 dark:bg-gray-800 dark:text-white"
          >
            <h2 className="text-white text-lg font-bold mb-4 dark:text-white">
              Contactez-nous
            </h2>
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-200 dark:text-gray-300"
              >
                Nom
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
                className="form-control pl-2 p-1 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email_contact"
                className="block text-gray-200 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email_contact"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                className="form-control pl-2 p-1 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-gray-200 dark:text-gray-300"
              >
                Sujet
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                autoComplete="off"
                className="form-control pl-2 p-1 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-200 dark:text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-control pl-2 p-1 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
              >
                Envoyer
              </button>
            </div>
          </form>
          <p className="text-gray-200 dark:text-gray-300">
            Aucune donnée personnelle n’est conservée par notre site via ce
            formulaire
          </p>
        </div>
      </header>
      <Footer />
    </>
  );
}

export default Contact;
