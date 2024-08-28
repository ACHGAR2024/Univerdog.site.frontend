function Forgotpw() {
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
        <h2 className="text-white text-lg font-bold ">Mot de passe oublie</h2>

        <form className="bg-black shadow-md rounded px-4 pt-2 pb-2 mb-4 text-sm bg-opacity-60">
          <h3 className="  font-bold mb-2 text-xs text-jaune_univerdog_01">
            Veuillez saisir votre adresse e-mail ici pour recevoir un e-mail de
            réinitialisation de mot de passe.
          </h3>
          <label
            htmlFor="email_mot_de_passe_oublie"
            className="block  text-white text-base font-bold "
          >
            Email
          </label>
          <input
            id="email_mot_de_passe_oublie"
            type="email"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

export default Forgotpw;
