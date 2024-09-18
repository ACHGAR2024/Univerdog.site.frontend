import { useState } from "react";

function CookiePreferences() {
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
    essential: true, // Essential cookies can't be disabled
  });

  const handleToggle = (category) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    alert("Préférences sauvegardées !");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Gérer les préférences des cookies</h1>
      <div className="mb-4">
        <button  className="bg-blue-500 text-white py-2 px-4 rounded">
            <a href="/">
          <i className="fas fa-arrow-left"></i> Retour</a>
        </button>
      </div>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={preferences.analytics}
            onChange={() => handleToggle("analytics")}
          />
          Cookies d&#39;analyse
        </label>
      </div>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={preferences.marketing}
            onChange={() => handleToggle("marketing")}
          />
          Cookies marketing
        </label>
      </div>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={preferences.essential}
            disabled
          />
          Cookies essentiels (toujours activés)
        </label>
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleSavePreferences}
      >
        Sauvegarder les préférences
      </button>
    </div>
  );
}

export default CookiePreferences;
