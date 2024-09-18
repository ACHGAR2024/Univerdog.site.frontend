import { useEffect } from "react";
import { Link } from "react-router-dom";

const Aide = () => {
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

  const sections = [
    {
      title: "Bienvenue sur UniverDog.site !",
      content:
        "Nous sommes ravis de vous avoir parmi nous. Ce guide vous aidera à tirer le meilleur parti de notre plateforme pour gérer vos chiens rapidement et efficacement.",
      imageUrl:
        "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    },
    {
      title: "1. Créer votre compte",
      content:
        "La première étape pour devenir utilisateur sur UniverDog.site est de créer votre compte. C'est simple et rapide !",
      imageUrl:
        "https://www.google.com/account/about/static/passkey-illustration.svg",
      listItems: [
        'Cliquez sur "S\'inscrire" en haut à droite, ou utiliser la connexion Google',
        "Remplissez le formulaire",
        "Complétez votre profil",
      ],
    },
    {
      title: "2. Ajouter un chien",
      content:
        "Une fois votre compte créé, vous pouvez commencer à créer un fiche chien ou plusieurs :",
      imageUrl:
        "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      listItems: [
        "Cliquez sur 'Ajouter un chien'",
        "Remplissez le formulaire",
        "Ajoutez une photo du chien bien visible",
        "Ajoutez une description et des informations sur la santé du chien",
       

      ],
    },
    
    {
      title: "4. Gérer vos messages",
      content:
        "Une communication efficace est essentielle pour réussir opérations dans le site :",
      imageUrl:
        "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      listItems: [
        "Consultez régulièrement votre boîte de réception",
        "Répondez poliment et en détail",
        "Soyez ouvert à la négociation",
        "Proposez des horaires flexibles",
      ],
    },
    {
      title: "5. Trouver un professionnel",
      content: "Lorsque vous avez trouvé un professionnel, suivez ces étapes :",
      imageUrl:
        "https://centredubienetreanimal.fr/wp-content/uploads/2022/10/iStock-1085096412-1536x955.jpg",
      listItems: [
        "Cliquez sur voir profil",
        "Cliquez sur le bouton 'iténeraires ou prendre rendez-vous'",
        "Choisissez le lieu",
        "Cliquez sur le bouton 'Prise de rendez-vous'",
      ],
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
        Guide UniverDog.site
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden p-6 animate-fadeIn"
          >
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <p className="mb-4">{section.content}</p>
            {section.listItems && (
              <ul className="list-disc list-inside mb-4">
                {section.listItems.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            )}
            <img
              src={section.imageUrl}
              alt={section.title}
              className="w-full rounded-lg"
              width="300"
              height="200"
            />
          </div>
        ))}
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6 animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-4">Besoin d&#39;aide supplémentaire ?</h2>
          <p className="mb-4">
            Si vous avez d&#39;autres questions ou si vous rencontrez des
            difficultés, n&#39;hésitez pas à contacter notre service client. Nous
            sommes là pour vous aider à réussir sur UniverDog.site !
          </p>
          <img
            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
            alt="Support client"
            className="w-full rounded-lg mt-4"
            width="300"
            height="200"
          />
        </div>
      </div>
    </div>
  );
};

export default Aide;
