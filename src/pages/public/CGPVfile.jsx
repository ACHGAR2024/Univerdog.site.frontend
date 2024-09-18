
import Nav from "../../components/nav_footer/Nav";
import Footer from "../../components/nav_footer/Footer";
import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
const CGPVfile = () => {
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
        <title>Charte de Protection des Données Personnelles - UniverDog</title>
        <meta name="description" content="Découvrez comment UniverDog protège vos données personnelles conformément à la législation en vigueur." />
        <meta property="og:title" content="Charte de Protection des Données Personnelles - UniverDog" />
        <meta property="og:description" content="Informations sur la protection des données et le respect de la vie privée chez UniverDog." />
        <meta property="og:type" content="website" />
      </Helmet>
    </HelmetProvider>
      <Nav  isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
    <header
      className="p-8 pt-16 flex w-full flex-col justify-center items-center poetsen-one-regular bg-gray-700 text-white dark:bg-black dark:text-dark_text"
      id="terms"
    >
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Charte de Protection des Données
        Personnelles (CGPV)</h1>

      <h2 className="text-2xl font-bold mb-4">Préambule</h2>
      <h4 className="text-lg font-bold mb-2 text-red-600">Un site web démo dans le cadre d&#39;un projet de fin de formation</h4>

      <p className="mb-4">
        UniverDog, 12, rue des Lilas, 72000 Le Mans, attache une importance
        particulière à la protection des données personnelles de ses
        utilisateurs. La présente Charte de Protection des Données Personnelles
        (CGPV) a pour objet de vous informer sur la manière dont nous
        collectons, traitons et protégeons vos données personnelles lorsque vous
        utilisez notre site web et nos services.
      </p>

      <h2 className="text-2xl font-bold mb-4">Données collectées</h2>

      <p className="mb-4">
        Les données personnelles que nous collectons peuvent inclure, mais ne
        sont pas limitées à :
      </p>

      <ul className="list-disc ml-6">
        <li className="mb-2">
          <strong>Données d&apos;identification:</strong> Nom, prénom, adresse email,
          numéro de téléphone, adresse postale.
        </li>
        <li className="mb-2">
          <strong>Données relatives à votre animal:</strong> Nom de l&apos;animal,
          race, âge, sexe, poids, photo, suivi de santé, allergies, médicaments,
          activité physique, comportement.
        </li>
        <li className="mb-2">
          <strong>Données de navigation:</strong> Adresse IP, type de
          navigateur, système d&apos;exploitation, pages visitées, actions effectuées
          sur le site.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Finalités du traitement des
        données</h2>

      <p className="mb-4">
        Les données personnelles que nous collectons sont utilisées pour les
        finalités suivantes :
      </p>

      <ul className="list-disc ml-6">
        <li className="mb-2">
          <strong>Fournir et améliorer nos services:</strong> Gérer les comptes
          utilisateurs, personnaliser l&apos;expérience utilisateur, fournir des
          services adaptés à vos besoins.
        </li>
        <li className="mb-2">
          <strong>Communiquer avec vous:</strong> Répondre à vos demandes, vous
          envoyer des informations sur nos services, des newsletters, des
          promotions.
        </li>
        <li className="mb-2">
          <strong>Gérer les relations avec les clients:</strong> Traiter vos
          commandes, gérer les paiements, assurer le suivi de vos achats.
        </li>
        <li className="mb-2">
          <strong>Améliorer notre site web et nos services:</strong> Analyser les
          données de navigation pour améliorer l&apos;ergonomie et la performance de
          notre site, identifier les tendances et les besoins des utilisateurs.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Base légale du traitement</h2>

      <p className="mb-4">
        Le traitement de vos données personnelles est basé sur les fondements
        juridiques suivants:
      </p>

      <ul className="list-disc ml-6">
        <li className="mb-2">
          <strong>Consentement:</strong> Vous nous avez donné votre consentement
          explicite pour le traitement de vos données personnelles.
        </li>
        <li className="mb-2">
          <strong>Exécution du contrat:</strong> Le traitement de vos données est
          nécessaire à l&apos;exécution d&apos;un contrat auquel vous êtes partie.
        </li>
        <li className="mb-2">
          <strong>Intérêt légitime:</strong> Le traitement de vos données est
          nécessaire pour nos intérêts légitimes, tels que l&apos;amélioration de
          nos services et la communication avec nos utilisateurs.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Sécurité des données</h2>

      <p className="mb-4">
        UniverDog s&apos;engage à prendre toutes les mesures techniques et
        organisationnelles nécessaires pour assurer la sécurité et la
        confidentialité de vos données personnelles et les protéger contre tout
        accès non autorisé, toute modification, divulgation ou destruction.
      </p>

      <h2 className="text-2xl font-bold mb-4">Partage de vos données</h2>

      <p className="mb-4">
        Nous pouvons partager vos données personnelles avec des tiers dans les
        cas suivants :
      </p>

      <ul className="list-disc ml-6">
        <li className="mb-2">
          <strong>Prestataires de services:</strong> Des prestataires de
          services qui nous aident à fournir nos services, tels que des
          hébergeurs de données, des fournisseurs de services de paiement, des
          agences de marketing.
        </li>
        <li className="mb-2">
          <strong>Obligations légales:</strong> Nous pouvons être tenus de partager
          vos données personnelles avec des autorités compétentes si la loi
          l&apos;exige.
        </li>
        <li className="mb-2">
          <strong>Fusion ou acquisition:</strong> En cas de fusion, d&apos;acquisition
          ou de vente de notre entreprise, vos données personnelles peuvent être
          transférées au nouvel acquéreur.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Vos droits</h2>

      <p className="mb-4">
        Vous disposez des droits suivants concernant vos données personnelles:
      </p>

      <ul className="list-disc ml-6">
        <li className="mb-2">
          <strong>Droit d&apos;accès:</strong> Vous avez le droit d&apos;accéder à vos
          données personnelles et de demander une copie de celles-ci.
        </li>
        <li className="mb-2">
          <strong>Droit de rectification:</strong> Vous avez le droit de rectifier
          des données personnelles inexactes ou incomplètes.
        </li>
        <li className="mb-2">
          <strong>Droit à l&apos;effacement (droit à l&apos;oubli):</strong> Vous avez le
          droit de demander l&apos;effacement de vos données personnelles, sous
          réserve de certaines exceptions.
        </li>
        <li className="mb-2">
          <strong>Droit à la limitation du traitement:</strong> Vous avez le droit
          de demander la limitation du traitement de vos données personnelles.
        </li>
        <li className="mb-2">
          <strong>Droit à la portabilité des données:</strong> Vous avez le droit
          de recevoir vos données personnelles dans un format structuré,
          couramment utilisé et lisible par machine.
        </li>
        <li className="mb-2">
          <strong>Droit d&apos;opposition:</strong> Vous avez le droit de vous opposer
          au traitement de vos données personnelles, notamment au profilage.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Contact</h2>

      <p className="mb-4">
        Pour exercer vos droits ou pour toute question relative à la
        protection de vos données personnelles, veuillez nous contacter à
        l&apos;adresse email suivante : contact@univerdog.site.
      </p>

      <h2 className="text-2xl font-bold mb-4">Modifications de la CGPV</h2>

      <p className="mb-4">
        UniverDog se réserve le droit de modifier la présente CGPV à tout
        moment. Nous vous invitons à consulter régulièrement cette page pour
        prendre connaissance des dernières mises à jour.
      </p>

      <h2 className="text-2xl font-bold mb-4">Date de dernière mise à jour</h2>

      <p className="mb-4">
        La présente CGPV a été mise à jour pour la dernière fois le
        18/09/2024.
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

export default CGPVfile;