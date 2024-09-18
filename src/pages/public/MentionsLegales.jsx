
import Nav from "../../components/nav_footer/Nav";
import Footer from "../../components/nav_footer/Footer";
import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
const MentionsLegales = () => {
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
        <title>Mentions Légales - UniverDog</title>
        <meta name="description" content="Consultez les mentions légales du site UniverDog, incluant les informations relatives à la gestion et l'utilisation de ce site." />
        <meta property="og:title" content="Mentions Légales - UniverDog" />
        <meta property="og:description" content="Informations légales sur l'utilisation du site UniverDog." />
        <meta property="og:type" content="website" />
      </Helmet>
    </HelmetProvider>
      <Nav  isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
    <header
      className="pt-16 flex w-full flex-col justify-center items-center poetsen-one-regular bg-gray-700 text-white dark:bg-black dark:text-dark_text"
      id="terms"
    >
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Mentions légales</h1>

      <p className="mb-4">
        UniverDog, 12, rue des Lilas, 72000 Le Mans, attache une importance
        particulière à la protection des données personnelles de ses utilisateurs. La
        présente Charte de Protection des Données Personnelles (CGPV) a pour
        objet de vous informer sur la manière dont nous collectons, traitons et
        protégeons vos données personnelles lorsque vous utilisez notre site web et
        nos services.
      </p>

      <h2 className="text-2xl font-bold mb-4">Informations légales</h2>
      <h4 className="text-lg font-bold mb-2 text-red-600">Un site web démo dans le cadre d&#39;un projet de fin de formation</h4>

      <ul className="list-disc ml-6">
        <li className="mb-2">
          <strong>Adresse:</strong> 12, rue des Lilas, 72000 Le Mans
        </li>
        <li className="mb-2">
          <strong>Téléphone:</strong> 09 58 45 48 47
        </li>
        <li className="mb-2">
          <strong>Email:</strong> contact@univerdog.site
        </li>
        <li className="mb-2">
          <strong>Numéro de SIRET:</strong> 812 345 678 00011 
        </li>
        <li className="mb-2">
          <strong>Responsable de la publication:</strong> Mr EL ACHGAR RACHID
        </li>
        <li className="mb-2">
          <strong>Hébergeur du site:</strong> HOSTING
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Propriété intellectuelle</h2>

      <p className="mb-4">
        Le contenu du site UniverDog, y compris les textes, les images, les
        vidéos et les logos, est protégé par les lois sur la propriété
        intellectuelle. Toute reproduction ou diffusion non autorisée de ce
        contenu est strictement interdite.
      </p>

      <h2 className="text-2xl font-bold mb-4">Données personnelles</h2>

      <p className="mb-4">
        UniverDog s&apos;engage à respecter la confidentialité de vos données
        personnelles. Pour en savoir plus sur notre politique de confidentialité,
        veuillez consulter la page dédiée sur notre site web.
      </p>

      <h2 className="text-2xl font-bold mb-4">Liens hypertextes</h2>

      <p className="mb-4">
        Le site UniverDog peut contenir des liens hypertextes vers d&apos;autres sites
        web. Nous ne sommes pas responsables du contenu de ces sites et vous
        encourageons à prendre connaissance de leurs propres mentions légales.
      </p>

      <h2 className="text-2xl font-bold mb-4">Responsabilité</h2>

      <p className="mb-4">
        UniverDog met tout en œuvre pour fournir des informations exactes et à
        jour sur son site web. Cependant, nous ne pouvons garantir
        l&apos;exhaustivité et la fiabilité de ces informations. Nous déclinons toute
        responsabilité pour les dommages directs ou indirects résultant de
        l&apos;utilisation de notre site web.
      </p>

      <h2 className="text-2xl font-bold mb-4">Règles concernant les commentaires
        et forums</h2>

      <p className="mb-4">
        Si votre site web comporte des commentaires ou des forums, ajoutez les
        éléments suivants :
      </p>

      <ul className="list-disc ml-6">
        <li className="mb-2">
          <strong>Comportement approprié:</strong> Les utilisateurs sont tenus de
          respecter un comportement respectueux et approprié dans les
          commentaires et les forums. Les messages à caractère diffamatoire,
          abusif, offensant, raciste, sexiste ou discriminatoire ne sont pas
          autorisés.
        </li>
        <li className="mb-2">
          <strong>Responsabilité des utilisateurs:</strong> UniverDog n&apos;est pas
          responsable du contenu des commentaires et des forums, qui reflètent
          uniquement l&apos;opinion de leurs auteurs. Les utilisateurs sont
          responsables de leurs propres publications.
        </li>
        <li className="mb-2">
          <strong>Modération:</strong> UniverDog se réserve le droit de modérer les
          commentaires et les forums, de supprimer les messages inappropriés et de
          bloquer les utilisateurs qui ne respectent pas les règles.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Modification des mentions légales</h2>

      <p className="mb-4">
        UniverDog se réserve le droit de modifier les présentes mentions légales
        à tout moment. Nous vous invitons à consulter régulièrement cette page
        pour prendre connaissance de toute modification.
      </p>

      <h2 className="text-2xl font-bold mb-4">Contact</h2>

      <p className="mb-4">
        Pour toute question concernant les mentions légales, veuillez nous
        contacter à l&apos;adresse email indiquée ci-dessus.
      </p>

      <p className="text-center">
        Copyright © 2024 UniverDog. Tous droits réservés.
      </p>
    </div>
    </header>
    <Footer />
    </>
  );
};

export default MentionsLegales;