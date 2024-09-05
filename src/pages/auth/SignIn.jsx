import { useState, useEffect } from "react";

function SignIn() {
  const [loginUrl, setLoginUrl] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/auth/google", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => {
        setLoginUrl(data.url);
      })
      .catch((error) => console.error(error));
  }, []);

  // Handle redirection after successful login
  const handleRedirect = () => {
    fetch("http://127.0.0.1:8000/api/auth/callback", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.redirect_url) {
          window.location.href = data.redirect_url; // Redirect to the dashboard with the token
        }
      })
      .catch((error) => console.error(error));
  };

  return (

    <header
      className="flex w-full flex-col h-screen justify-center items-center poetsen-one-regular bg-cover bg-no-repeat"
      style={{ backgroundImage: `url('/src/images/dog-about.webp')` }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center max-w-md mx-auto bg-black shadow-md rounded-md px-4 pt-4 pb-4 text-sm bg-opacity-60">
  
    <div className="text-center p-28">
      {loginUrl != null && <a href={loginUrl}><button
              className="bg-gray-950 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
              
            >
              Inscription avec Google<img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt="Google logo"
                width="20"
                height="20"
                className="inline-block ml-2"
              />
            </button></a>}
      <br></br>
      <br></br><h1 className="text-white">Pour une meilleur expérience, Veuillez utiliser Google pour s&#39;inscrire</h1>
      <br></br>
      <div className="text-center mt-4">
            <p className="text-white text-xs">
              En vous connectant, vous acceptez nos{" "}
              <a
                href="/terms"
                className="text-orange_univerdog hover:text-jaune_univerdog_01"
              >
                Conditions d&#39;utilisation
              </a>{" "}
              et notre{" "}
              <a
                href="/privacy"
                className="text-orange_univerdog hover:text-jaune_univerdog_01"
              >
                Politique de confidentialité
              </a>
              .
            </p>
          </div>
      {/* Call this function after successful login to handle redirection */}
      <button onClick={handleRedirect}></button>
    </div>

        </div>
      </div>
    </header>
  );
}

export default SignIn;
