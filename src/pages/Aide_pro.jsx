import { useEffect } from "react";
import { Link } from "react-router-dom";

const Aide_pro = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
      document
        .querySelectorAll(".animate-fadeIn")
        .forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      title: "1. Créez votre compte professionnel en 4 étapes après validation",
      content:
        "Inscrivez-vous normalement et demandez un compte professionnel sur UniverDog.site pour accéder à toutes les fonctionnalités.",
      icon: "🖥️",
    },
    {
      title: "2. Complétez votre profil",
      content:
        "Ajoutez vos informations professionnelles, vos spécialités et vos diplômes pour inspirer confiance.",
      icon: "📝",
    },
    {
      title: "3. Définissez vos disponibilités",
      content:
        "Configurez votre calendrier pour permettre aux clients de prendre rendez-vous facilement.",
      icon: "🗓️",
    },
    {
      title: "4. Ajoutez vos services",
      content:
        "Détaillez les services que vous proposez, avec leurs tarifs et descriptions.",
      icon: "🐾",
    },
    {
      title: "5. Gérez vos rendez-vous",
      content:
        "Utilisez le dashboard pour voir et gérer vos rendez-vous à venir.",
      icon: "📅",
    },
    {
      title: "6. Communiquez avec vos clients",
      content:
        "Utilisez la messagerie intégrée pour échanger avec vos clients avant et après les rendez-vous.",
      icon: "💬",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 mb-32 dark:text-gray-900 mt-20">
      <Link to="/dashboard">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4">
          <i className="fa-solid fa-arrow-left"></i> Retour
        </button>
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-50">
        Guide du Professionnel - UniverDog.site
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Bienvenue, professionnel canin !
          </h2>
          <p className="mb-6">
            Suivez ces étapes pour tirer le meilleur parti de notre plateforme
            et développer votre activité.
          </p>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 animate-fadeIn"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p>{step.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold mb-2">
            Besoin d&apos;aide supplémentaire ?
          </h3>
          <p>
            Notre équipe de support est là pour vous aider à chaque étape.
            N&apos;hésitez pas à nous contacter !
          </p>
          <a href="/contact" className="text-blue-500 hover:text-blue-600">
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Contacter le support
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Aide_pro;
