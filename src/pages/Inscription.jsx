function Inscription() {
  return (
    <header
      className="flex w-full flex-col h-screen justify-center items-center poetsen-one-regular"
      style={{
        backgroundImage: `url('/src/images/dog-inscription.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Container for the login form */}

      <div className="w-full max-w-xs">
        <h2 className="text-white text-lg font-bold mb-2">Inscription</h2>
        <form className="bg-black shadow-md rounded px-4 pt-2 pb-2 mb-4 text-sm bg-opacity-60">
          {/* Name label and input */}
          <label
            htmlFor="name_inscription"
            className="block mt-0 text-white text-base font-bold"
          >
            Nom
          </label>
          <input
            id="name_inscription"
            type="text"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />

          {/* Email label and input */}
          <label
            htmlFor="email"
            className="block mt-4 text-white text-base font-bold "
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />

          {/* Password label and input */}
          <label
            htmlFor="password"
            className="block mt-4 text-white text-base font-bold "
          >
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />

          {/* Phone label and input */}
          <label
            htmlFor="phone"
            className="block mt-4 text-white text-base font-bold "
          >
            Téléphone
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />

          {/* Submit button */}
          <div className="text-right pt-4">
            <button
              type="submit"
              className="bg-orange_univerdog hover:bg-jaune_univerdog_01 hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            >
              Inscription
            </button>
          </div>
        </form>
        {/* Charte section */}
        <div className="text-center mt-4">
          <p className="text-white text-xs">
            En vous inscrivant, vous acceptez nos{" "}
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

export default Inscription;
