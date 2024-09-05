import { useState } from "react";
//import Notiflix from "notiflix";

const ConseilsIA = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(
    "La réponse de l’IA s’affichera ici après avoir posé votre question."
  );
  const [loading, setLoading] = useState(false); // État pour gérer le chargement
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Activer le chargement
    // Remplacez 'YOUR_API_KEY' par votre véritable clé d'API
    const apiKey = "AIzaSyAaLbczNysOPctRa4Xnhe9P72leOyMLpT0";
    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
      apiKey;

    const requestOptions = {
      method: "POST",
      // Le mode 'cors' permet d'envoyer des requ tes en mode Cross-Origin.
      // https://developer.mozilla.org/fr/docs/Web/HTTP/CORS
      mode: "cors",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: question }] }],
      }),
    };

    try {
      const apiResponse = await fetch(apiUrl, requestOptions);
      const data = await apiResponse.json();

      // Vérifier si la structure attendue est bien reçue
      if (data && data.candidates && data.candidates.length > 0) {
        const textResponse = data.candidates[0].content.parts[0].text; // Accéder au texte de la réponse
        setResponse(textResponse);
      } else {
        setResponse("La réponse de l’IA n’a pas pu être traitée.");
      }

      console.log(data);
    } catch (error) {
      console.error("Erreur lors de la requête à l’API :", error);
      setResponse("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false); // Désactiver le chargement
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 ml-10 flex items-center">
        <i className="fa-solid fa-robot w-6 h-6 mr-2 text-orange-500"></i>
        &nbsp; Conseils avec IA
      </h2>
      <div className="dashboard-card p-6 shadow-lg rounded-lg overflow-hidden transform  transition-transform duration-300 ease-in-out">
        <h3 className="text-xl font-bold mb-4 flex items-center dark:text-black">
          <i className="fa-solid fa-question-circle mr-2"></i>
          Posez votre question à notre IA spécialisée
        </h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border rounded mb-4 dark:text-black"
            rows="4"
            placeholder="Exemple : Comment apprendre à mon chien à ne pas tirer en laisse ?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
            disabled={loading} // Désactiver le bouton pendant le chargement
          >
            <i className="fa-solid fa-paper-plane mr-2"></i>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
              disabled={loading}
              style={{
                pointerEvents: loading ? "none" : "auto",
                opacity: loading ? 0.5 : 1,
              }}
            >
              {loading ? (
                <div className="bg-orange-500 inline-block w-4 h-4 border-b-2 border-gray-900 rounded-full animate-spin"></div>
              ) : (
                "Obtenir un conseil"
              )}
            </button>
          </button>
          <button
            type="button"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded mt-4"
            onClick={() => setQuestion("")}
          >
            <i className="fa-solid fa-arrow-rotate-left mr-2"></i>
            Nouvelle question
          </button>
        </form>
        <div className={response === "La réponse de l’IA s’affichera ici après avoir posé votre question." ? "mt-6 bg-slate-200 p-4 rounded-lg text-gray-700" : "mt-6 bg-red-200 p-4 rounded-lg text-gray-700"}>
          <h4 className="font-bold flex items-center mb-4">
            <i className="fa-solid fa-lightbulb mr-2 "></i>
            Réponse de l’IA :
          </h4>
          <p
            className="text-gray-600 whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: response.replace(/\*\*([\s\S]+?)\*\*/g, "<b>$1</b>"),
            }}
          ></p>
          {/* Ajout de whitespace-pre-line pour conserver la mise en forme */}
        </div>
      </div>
      <div className="dashboard-card mt-6 p-6 shadow-lg rounded-lg overflow-hidden transform  transition-transform duration-300 ease-in-out">
        <h3 className="text-xl font-bold mb-4 flex items-center dark:text-black">
          <i className="fa-solid fa-star mr-2"></i>
          Conseils populaires
        </h3>
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="text-blue-600 hover:underline flex items-center"
            >
              <i className="fa-solid fa-chevron-right mr-2"></i>
              Comment habituer mon chiot à sa nouvelle maison ?
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-blue-600 hover:underline flex items-center"
            >
              <i className="fa-solid fa-chevron-right mr-2"></i>
              Quels sont les aliments dangereux pour les chiens ?
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-blue-600 hover:underline flex items-center"
            >
              <i className="fa-solid fa-chevron-right mr-2"></i>
              Comment préparer mon chien à l’arrivée d’un bébé ?
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConseilsIA;
