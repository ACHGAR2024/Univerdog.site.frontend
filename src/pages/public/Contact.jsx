
import { useState, useEffect } from "react";
import Nav from "../../components/nav_footer/Nav";
import Footer from "../../components/nav_footer/Footer";
import { Helmet, HelmetProvider } from 'react-helmet-async';

function Contact() {
  // Simuler l'état d'authentification
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Remplacez ceci par votre logique réelle d'authentification
    const userIsAuthenticated = false; // Changez en fonction de votre logique
    setIsAuthenticated(userIsAuthenticated);
  }, []);

  const handleLogout = () => {
    // Implémentez la logique de déconnexion ici
    setIsAuthenticated(false);
    // Ajoutez la logique de déconnexion réelle si nécessaire
  };

  return (
    <>
    <HelmetProvider>
      <Helmet>
        <title>Contactez-nous - UniverDog</title>
        <meta name="description" content="Contactez-nous pour toute question ou information supplémentaire sur UniverDog." />
        <meta property="og:title" content="Contactez-nous - UniverDog" />
        <meta property="og:description" content="Utilisez notre formulaire de contact pour nous joindre directement." />
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
            className="w-96 max-w-md mx-auto bg-black shadow-md rounded-md px-4 pt-4 pb-4 text-xs bg-opacity-60 dark:bg-gray-800 dark:text-white"
          >
            <h2 className="text-white text-lg font-bold mb-4 dark:text-white">
              Contactez-nous
            </h2>
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
          <p className="text-gray-200 dark:text-gray-300">Aucune donnée personnelle n’est conservée par notre site via ce formulaire</p>
        </div>
      </header>
      <Footer />
    </>
  );
}

export default Contact;
