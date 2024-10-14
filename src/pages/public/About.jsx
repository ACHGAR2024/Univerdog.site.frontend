import "../../index.css";
import HeroSection from "../../components/HeroSection";
import Section from "../../components/Section";
import Nav from "../../components/nav_footer/Nav";
import Footer from "../../components/nav_footer/Footer";
import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

function About() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>À Propos - UniverDog</title>
          <meta
            name="description"
            content="Découvrez l'histoire et la mission d'UniverDog, la plateforme dédiée aux chiens et à leurs propriétaires."
          />
          <meta property="og:title" content="À Propos - UniverDog" />
          <meta
            property="og:description"
            content="En savoir plus sur UniverDog, le site qui connecte les propriétaires de chiens et les professionnels."
          />
          <meta property="og:type" content="website" />
        </Helmet>

        <Nav isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <div className="bg-gray-700 text-white dark:bg-black dark:text-dark_text">
          {" "}
          {/* Apply dark mode classes */}
          <header className="flex w-full pt-20 flex-col justify-center items-center">
            <div className="text-white">
              <HeroSection />
              <Section
                title="Gestion d'informations et QR code"
                content="Créer un profil complet et personnalisé pour votre meilleur ami canin : nom, race, âge, sexe, poids, photo, suivi de santé, allergies, médicaments, activité physique, comportement, et plus.
              et qui permet par la suite de créer automatiquement des codes QR qui peuvent offrir plusieurs avantages notamment en matière d'identification, de sécurité et de gestion des informations."
                imageUrl="/src/images/dog-004.jpg"
              />
              <Section
                title="Conseils en Intelligence Artificielle pour Chiens"
                content="Nous mettrons en place un service de conseil en IA pour aider les propriétaires de chiens à surveiller la santé de leur animal, à suivre les habitudes alimentaires, etc. Nous développerons des applications ou des dispositifs basés sur l’IA pour améliorer la vie des chiens et de leurs propriétaires."
                imageUrl="/src/images/menu/box_09.jpeg"
              />
              <Section
                title="Services Vétérinaires"
                content="Les propriétaires de chiens pourront prendre rendez-vous en ligne avec des vétérinaires partenaires pour des consultations, des vaccinations et des soins de santé. Nous mettrons en place un système pour répondre aux urgences des propriétaires de chiens à toute heure."
                imageUrl="/src/images/menu/box_03.jpeg"
              />
              <Section
                title="Toilettage et Coiffure"
                content="Les propriétaires de chiens pourront réserver des services de toilettage en ligne. Ils pourront choisir parmi des options telles que bain, coupe de griffes, coiffure, etc. Nous proposerons des forfaits de toilettage réguliers pour que les chiens restent propres et soignés."
                imageUrl="/src/images/menu/box_01.jpeg"
              />
              <Section
                title="Service de Garde"
                content="Nous offrirons un service de garde pour les chiens lorsque leurs propriétaires sont absents. L’environnement sera sûr et amusant pour les chiens."
                imageUrl="/src/images/menu/box_06.jpeg"
              />
              <Section
                title="Formation et Éducation"
                content="Nous proposerons des cours de dressage pour chiens, des séances d’obéissance et des conseils en comportement. Des ateliers spécifiques seront organisés pour les propriétaires de chiots."
                imageUrl="/src/images/menu/box_05.jpeg"
              />
              <Section
                title="Vente de Produits pour Chiens"
                content="Nous créerons une boutique en ligne où les utilisateurs pourront acheter des produits pour chiens tels que nourriture, jouets, colliers, laisses, etc. Nous mettrons en avant des promotions spéciales sur certains articles."
                imageUrl="/src/images/menu/box_02.jpeg"
              />
              <Section
                title="Localisation de Services"
                content="Nous développerons une application ou un site web pour aider les propriétaires de chiens à trouver des services locaux. Cela inclura des parcs pour chiens, des cafés accueillant les chiens, des hôtels acceptant les animaux, etc. Nous intégrerons une carte interactive pour afficher les emplacements."
                imageUrl="/src/images/menu/box_04.jpeg"
              />
              <Section
                title="Aide Administrative"
                content="Nous proposerons des services d’administration pour les propriétaires de chiens, tels que la gestion des dossiers médicaux, les rappels de vaccination et les réservations chez le vétérinaire. Nous aiderons les propriétaires à remplir les formalités administratives liées à la possession d’un chien (licences, enregistrements, etc.)."
                imageUrl="/src/images/menu/box_07.jpeg"
              />
              <Section
                title="Voyages pour Chiens"
                content="Nous organiserons des excursions et des voyages spécialement conçus pour les chiens et leurs propriétaires. Nous proposerons des destinations où les chiens sont les bienvenus, avec des hébergements acceptant les animaux et des activités en plein air."
                imageUrl="/src/images/menu/box_08.jpeg"
              />
            </div>
          </header>
        </div>
        <Footer />
      </HelmetProvider>
    </>
  );
}

export default About;
