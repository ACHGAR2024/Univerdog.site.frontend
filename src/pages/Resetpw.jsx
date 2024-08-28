function Resetpw() {
  return (
    <header
      className="flex w-full flex-col h-screen justify-center items-center poetsen-one-regular"
      style={{
        backgroundImage: `url('/src/images/dog-forgotpw.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-xs">
        <h2 className="text-white text-lg font-bold ">
          Réinitialisation mot de passe
        </h2>

        <form className="bg-black shadow-md rounded px-4 pt-4 pb-4 mb-4 text-sm bg-opacity-60">
          <label
            htmlFor="email"
            className="block  text-white text-base font-bold "
          >
            Nouveau mot de passe
          </label>
          <input
            id="password_confirmation"
            type="password"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block mt-4 text-white text-base font-bold mb-2">
            Mot de passe de confirmation
          </label>
          <input
            id="password_confirmation"
            type="password"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />
          <div className="text-right">
            <button className="bg-orange-500 hover:bg-jaune_univerdog_01 hover:text-black text-white font-semibold mt-4 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              {" "}
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}

export default Resetpw;
