import { Link } from "react-router-dom";

function Login() {
  const handeleSubmit = (e) => {
    e.preventDefault();
    console.log(new FormData(e.target));
  };

  return (
    <header
      className="flex w-full flex-col h-screen justify-center items-center poetsen-one-regular"
      style={{
        backgroundImage: `url('/src/images/dog-about.webp')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Container for the login form */}
      <div className="w-full max-w-xs">
        {/* Login form */}
        <form
          className="bg-black shadow-md rounded px-4 pt-2 pb-2 mb-4 text-sm bg-opacity-60"
          onSubmit={handeleSubmit}
        >
          {/* Email label and input */}
          <label
            htmlFor="email"
            className="block mt-4 text-white text-base font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />

          {/* Password label and input */}
          <label
            htmlFor="password"
            className="block mt-4 text-white text-xm font-bold mb-2"
          >
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            autoComplete="Mot de passe"
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />

          {/* Submit button */}
          <div className="text-right pt-4">
            <button
              type="submit"
              className="bg-orange_univerdog hover:bg-jaune_univerdog_01 hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
            >
              Connexion
            </button>
          </div>

          {/* Forgot password link */}
          <div className="text-center mt-4">
            <Link
              className="text-white hover:text-orange_univerdog text-xs"
              to="/forgotpw"
            >
              Mot de passe oublie
            </Link>
          </div>
        </form>

        {/* Google and Outlook login buttons */}
        <div className="flex items-center mt-4 text-xs">
          <button className="hover:bg-jaune_univerdog_01 bg-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 w-full flex items-center justify-center">
            <img
              src="/src/images/logo_google_48.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Connexion avec Google
          </button>
          <button className="hover:bg-jaune_univerdog_01 bg-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center">
            <img
              src="/src/images/Outlook_icon-48.png"
              alt="Outlook"
              className="w-6 h-6 mr-2"
            />
            Connexion avec Outlook
          </button>
        </div>
        {/* Inscription Link */}
        <div className="mt-3 text-sm text-center">
          <Link
            className="text-jaune_univerdog_01 hover:text-orange_univerdog font-bold"
            to="/inscription"
          >
            Inscription
          </Link>
        </div>

        {/* Charte section */}
        <div className="text-center mt-4">
          <p className="text-white text-xs">
            En vous connectant, vous acceptez nos{" "}
            <a
              href="/terms"
              className="text-orange_univerdog hover:text-jaune_univerdog_01"
            >
              Conditions d&apos;utilisation
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
      </div>
    </header>
  );
}

export default Login;
