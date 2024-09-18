import Nav from "../../components/nav_footer/Nav";
import Footer from "../../components/nav_footer/Footer";
import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
function Privacy() {
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
        <title>Politique de Confidentialité - UniverDog</title>
        <meta name="description" content="Consultez notre politique de confidentialité pour savoir comment nous collectons, utilisons et protégeons vos données personnelles sur UniverDog." />
        <meta property="og:title" content="Politique de Confidentialité - UniverDog" />
        <meta property="og:description" content="Découvrez comment UniverDog protège vos données personnelles conformément aux lois en vigueur." />
        <meta property="og:type" content="website" />
      </Helmet>
    </HelmetProvider>
       <Nav isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

    <header
      className="pt-16 flex w-full flex-col justify-center items-center poetsen-one-regular bg-gray-700 text-white dark:bg-black dark:text-dark_text"
      id="privacy"
    >
      <div className="w-full max-w-xl text-white px-3">
        <div className="privacy-container">
          <h1 className="privacy-title text-xl">
            <br />
            Politique de confidentialité
          </h1>

          <p className="privacy-text">
            <br />
            <br />
            Bienvenue sur notre site web !
            <br />
            Cette Politique de confidentialité décrit comment vos informations
            personnelles sont collectées, utilisées et partagées lorsque vous
            visitez ou faites un achat sur notre site web.
            <br />
            <br />
          </p>

          <ul className="privacy-list">
            <li className="privacy-list-item">
              <strong>1. Collecte d&#39;informations</strong>
              <br />
              Nous collectons des informations vous concernant lorsque vous
              utilisez notre site web, notamment des informations
              d&#39;identification personnelle telles que votre nom, adresse
              e-mail, adresse postale, numéro de téléphone et informations de
              paiement.
              <br />
              <br />
            </li>
            <li className="privacy-list-item">
              <strong>2. Utilisation des informations</strong>
              <br />
              Nous utilisons les informations collectées pour traiter vos
              commandes, communiquer avec vous, améliorer notre site web et à
              des fins marketing avec votre consentement.
              <br />
              <br />
            </li>
            <li className="privacy-list-item">
              <strong>3. Partage des informations</strong>
              <br />
              Nous partageons vos informations personnelles avec des tiers pour
              nous aider à utiliser vos informations, comme décrit ci-dessus.
              Par exemple, nous utilisons Shopify pour alimenter notre boutique
              en ligne.
              <br />
              <br />
            </li>
            <li className="privacy-list-item">
              <strong>4. Sécurité</strong>
              <br />
              Nous prenons des mesures raisonnables pour protéger vos
              informations personnelles contre la perte, le vol et l&#39;usage
              abusif, ainsi que contre l&#39;accès non autorisé, la divulgation,
              l&#39;altealtération et la destruction.
              <br />
              <br />
            </li>
            <li className="privacy-list-item">
              <strong>5. Vos droits</strong>
              <br />
              Si vous êtes un résident européen, vous avez le droit
              d&#39;accéder aux informations personnelles que nous détenons à
              votre sujet et de demander que vos informations personnelles
              soient corrigées, mises à jour ou supprimées.
              <br />
              <br />
            </li>
            <li className="privacy-list-item">
              <strong>6. Modifications</strong>
              <br />
              Nous pouvons mettre à jour cette politique de confidentialité de
              temps à autre afin de refléter, par exemple, des changements dans
              nos pratiques ou pour d&#39;autres raisons opérationnelles,
              légales ou réglementaires.
              <br />
              <br />
            </li>
            <li className="privacy-list-item">
              <strong>7. Nous contacter</strong>
              <br />
              Pour plus d&#39;informations sur nos pratiques de confidentialité,
              si vous avez des questions, ou si vous souhaitez faire une
              plainte, veuillez nous contacter par e-mail à{" "}
              <a href="mailto:contact@univerdog.fr">contact@univerdog.fr</a>.
              <br />
              <br />
              <br />
              <br />
              <br />
            </li>
          </ul>
        </div>
      </div>
    </header>

      <Footer />
    </>
  );
}

export default Privacy;
