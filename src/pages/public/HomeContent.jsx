import { useState, useEffect } from "react";
import { Carousel } from "flowbite-react";
import Nav from "../../components/nav_footer/Nav";
import Footer from "../../components/nav_footer/Footer";
import { FaAndroid, FaApple } from "react-icons/fa"; // Importez les icônes
function HomeContent() {
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRefuseCookies = () => {
    setShowModal(false);
    // Save refusal in localStorage with a 12 months validity
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 12); // 12 months validity
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        accepted: false,
        expirationDate: expirationDate.toISOString(),
      })
    );
  };

  const handleManagePreferences = () => {
    // Redirect to cookie preferences page
    window.location.href = "/cookie_preferences";
  };

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
      const consentData = JSON.parse(consent);
      const expirationDate = new Date(consentData.expirationDate);
      if (expirationDate > new Date()) {
        setShowModal(false);
      }
    }
  }, []);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowModal(true);
    }

    const userIsAuthenticated = false;
    setIsAuthenticated(userIsAuthenticated);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleConsent = () => {
    // Save consent in localStorage with a 12 months validity
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 12); // 12 months validity
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        accepted: true,
        expirationDate: expirationDate.toISOString(),
      })
    );

    setShowModal(false);
  };

  return (
    <>
      <Nav isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      {/* Cookie Consent Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h3 className="font-bold text-lg mb-4 text-gray-950">Cookies</h3>
            <p className="text-sm mb-4 text-gray-950">
              Nous utilisons des cookies pour améliorer <br />
              votre expérience. En continuant à utiliser notre site, <br />
              vous acceptez notre politique de cookies.
            </p>
            <button
              className="mr-2 bg-orange_univerdog hover:bg-jaune_univerdog_01 hover:text-black text-white font-bold py-2 px-4 rounded"
              onClick={handleConsent}
            >
              J&#39;accepte
            </button>
            <button
              className="mr-2 bg-red-500 hover:bg-jaune_univerdog_01 hover:text-black text-white font-bold py-2 px-4 rounded"
              onClick={handleRefuseCookies}
            >
              Refuser
            </button>
            <button
              className="bg-gray-300 text-gray-950 hover:bg-red-500  font-bold py-2 px-4 rounded"
              onClick={handleManagePreferences}
            >
              Gérer les préférences
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header
        className="flex w-full flex-col h-screen justify-center poetsen-one-regular z-0"
        style={{
          backgroundImage: `url('/src/images/dog-accueil.webp')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <section className="relative isolate w-full grid grid-cols-1 md:grid-cols-2 min-h-min">
          {/* Text Div */}
          <div className="flex flex-col justify-center text-left p-6 order-1 md:order-none mt-14 ml-14">
            <h1 className="font-headline text-5xl text-orange-500 mx-auto w-full font-semibold text-violet caret-amber-600 ">
              UniverDog
            </h1>
            <h2 className="font-headline text-xl text-balance mx-auto w-full font-semibold text-gray-300">
              Site Web Dédié Aux Chiens
            </h2>
            <p className="mx-auto px-0 text-sm font-normal content text-white font-headline w-full m-8">
              Le site internet qui vise à offrir une plateforme complète pour
              les propriétaires de chiens et les professionnels du secteur
              canin.
            </p>
            {/* Button Partez explorer */}
            <a href="/login">
              <p className="ml-auto mr-28 text-right w-full">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 mr-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                  Partez explorer
                </button>
              </p>
            </a>
          </div>

          {/* Carousel Div */}
          <div className="order-2 md:order-none w-full p-0 xl:pr-72">
            <div className="xs:w-80 w-96 h-72 sm:h-72 xl:h-72 2xl:h-72 mx-auto md:ml-15 xl:ml-44 lg:ml-30 ">
              <Carousel
                onSlideChange={(index) => console.log("onSlideChange()", index)}
              >
                {/* Carousel Items */}
                {[
                  {
                    src: "/src/images/menu/box_01.jpeg",
                    alt: "Toilettage et Coiffure de chiens",
                    title: "Toilettage et Coiffure",
                    description: "Réserver des services de toilettage en ligne",
                  },
                  {
                    src: "/src/images/menu/box_02.jpeg",
                    alt: "Vente de Produits pour Chiens",
                    title: "Vente de Produits pour Chiens",
                    description: "Boutique en Ligne et Promotions Spéciales",
                  },
                  {
                    src: "/src/images/menu/box_03.jpeg",
                    alt: "Services Vétérinaires",
                    title: "Services Vétérinaires",
                    description: "Prendre rendez-vous en ligne",
                  },
                  {
                    src: "/src/images/menu/box_04.jpeg",
                    alt: "Localisation de Services",
                    title: "Localisation de Services",
                    description: "Trouver des services locaux",
                  },
                  {
                    src: "/src/images/menu/box_05.jpeg",
                    alt: "Formation et Éducation",
                    title: "Formation et Éducation",
                    description: "Cours de dressage pour chiens",
                  },
                  {
                    src: "/src/images/menu/box_06.jpeg",
                    alt: "Service de Garde pour chien",
                    title: "Service de Garde",
                    description:
                      "Service de garde pour chiens en cas d'absence",
                  },
                  {
                    src: "/src/images/menu/box_07.jpeg",
                    alt: "Aide Administrative",
                    title: "Aide Administrative",
                    description:
                      "Gestion des Dossiers Médicaux et Administrative",
                  },
                  {
                    src: "/src/images/menu/box_08.jpeg",
                    alt: "Voyages pour Chiens",
                    title: "Voyages pour Chiens",
                    description: "Destinations Adaptées aux Chiens",
                  },
                  {
                    src: "/src/images/menu/box_09.jpeg",
                    alt: "Conseils en Intelligence Artificielle",
                    title: "Conseils en Intelligence Artificielle",
                    description: "Assistance en IA",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex h-full items-center justify-center"
                  >
                    <a href="#">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full bg-cover"
                      />
                      <div className="absolute bottom-10 left-0 w-full h-13 bg-black bg-opacity-30 flex items-end justify-center">
                        <div className="text-white">
                          <h2 className="text-xl font-bold text-amber-400">
                            {item.title}
                          </h2>
                          <p className="text-sm">{item.description}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </section>

        {/* Alerte "Site en construction" */}
        <div className="mt-4 bottom-0 left-0 right-0 z-50 bg-yellow-400 text-black py-2 px-4 text-center font-bold shadow-md">
          <p className="animate-pulse">🚧 Site en construction 🚧</p>
        </div>
        {/* Bannière pour les applications mobiles */}
        <div className="mt-4 bottom-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-0 text-white py-2 px-4 text-center font-bold shadow-md flex justify-center items-center space-x-4">
          <p>Applications mobiles </p>
          <FaAndroid className="text-2xl text-green-500" />
          <FaApple className="text-2xl text-gray-300" />
          <p> bientôt disponibles !</p>
        </div>
      </header>

      <Footer />
    </>
  );
}

export default HomeContent;
