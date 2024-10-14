import { useState } from "react";
//import Notiflix from "notiflix";

const ConseilsIA = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(
    "La réponse de l’IA s’affichera ici après avoir posé votre question."
  );
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Remplace 'YOUR_API_KEY'
    const apiKey = "";
    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
      apiKey;
    const contextAndPrompt = `
      Vous êtes un assistant IA spécialisé dans le bien-être des chiens. 
      Votre rôle est de fournir des informations et des conseils uniquement sur les sujets liés aux chiens, 
      tels que la santé canine, l'alimentation, le comportement, l'exercice, le toilettage et les soins généraux. 
      Si une question ne concerne pas les chiens, veuillez poliment rediriger la conversation vers des sujets canins.

      Question de l'utilisateur : ${question}

      Répondez de manière concise et pertinente, en vous concentrant exclusivement sur les aspects liés aux chiens.
    `;
    const requestOptions = {
      method: "POST",

      mode: "cors",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: contextAndPrompt,
              },
            ],
          },
        ],
        safetySettings: [],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    };

    try {
      const apiResponse = await fetch(apiUrl, requestOptions);
      const data = await apiResponse.json();

      if (data && data.candidates && data.candidates.length > 0) {
        const textResponse = data.candidates[0].content.parts[0].text;
        setResponse(textResponse);
      } else {
        setResponse("La réponse de l’IA n’a pas pu être traitée.");
      }

      //(data);
    } catch (error) {
      console.error("Erreur lors de la requête à l’API :", error);
      setResponse("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 ml-10 flex items-center dark:text-white">
        <i className="fa-solid fa-robot w-6 h-6 mr-2 text-orange-500"></i>
        &nbsp; Conseils avec IA
      </h2>
      <div className="dashboard-card p-6 shadow-lg rounded-lg overflow-hidden transform  transition-transform duration-300 ease-in-out">
        <h3 className="text-md font-bold mb-4 flex items-center dark:text-black">
          <i className="fa-solid fa-question-circle mr-2"></i>
          Posez votre question à notre IA spécialisée
        </h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="text-xs w-full p-2 border rounded mb-2 dark:text-black"
            rows="4"
            placeholder="Exemple : Comment apprendre à mon chien à ne pas tirer en laisse ?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
            disabled={loading}
          >
            <i className="fa-solid fa-paper-plane "></i>
            <button
              type="submit"
              className="text-xs bg-blue-500 text-white px-2  rounded hover:bg-blue-600 flex items-center justify-center"
              disabled={loading}
              style={{
                pointerEvents: loading ? "none" : "auto",
                opacity: loading ? 0.5 : 1,
              }}
            >
              {loading ? (
                <div className="bg-orange-500 inline-block w-2 h-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
              ) : (
                "Obtenir un conseil"
              )}
            </button>
          </button>
          <button
            type="button"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded mt-2"
            onClick={() => setQuestion("")}
          >
            <i className="fa-solid fa-arrow-rotate-left mr-2"></i>
            Nouvelle question
          </button>
        </form>
        <div
          className={
            response ===
            "La réponse de l’IA s’affichera ici après avoir posé votre question."
              ? "mt-4 bg-slate-200 p-4 rounded-lg text-gray-700"
              : "mt-4 bg-red-200 p-4 rounded-lg text-gray-700"
          }
        >
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
          {/* Add whitespace-pre-line */}
        </div>
      </div>
      <div className="dashboard-card mt-6 p-6 shadow-lg rounded-lg overflow-hidden transform  transition-transform duration-300 ease-in-out">
        <h3 className="text-xl font-bold mb-4 flex items-center dark:text-black">
          <i className="fa-solid fa-star mr-2"></i>
          Conseils populaires
        </h3>
        <ul className="space-y-2">
          <li>
            <i className="fa-solid fa-chevron-right mr-2"></i>
            Comment habituer mon chiot à sa nouvelle maison ?
          </li>
          <li>
            <i className="fa-solid fa-chevron-right mr-2"></i>
            Quels sont les aliments dangereux pour les chiens ?
          </li>
          <li>
            <i className="fa-solid fa-chevron-right mr-2"></i>
            Comment préparer mon chien à l’arrivée d’un bébé ?
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConseilsIA;
