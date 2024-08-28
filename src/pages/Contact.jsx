function Contact() {
  return (
    <header
      className="flex w-full flex-col h-screen justify-center items-center poetsen-one-regular"
      style={{
        backgroundImage: `url('/src/images/dog-contact.webp')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Container for the contact form */}
      <div className="w-full max-w-sm">
        {" "}
        {/* Contact form title */}
        <h2 className="text-white text-lg font-bold mb-2">Contactez-nous</h2>
        {/* Contact form */}
        <form className="bg-black shadow-md rounded px-4 pt-2 pb-2 mb-4 text-sm bg-opacity-60">
          {/* Name label and input */}
          <label
            htmlFor="name"
            className="block mt-2 text-white text-xs font-bold mb-1"
          >
            Nom
          </label>
          <input
            id="name"
            type="text"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />

          {/* Email label and input */}
          <label
            htmlFor="email_contact"
            className="block mt-2 text-white text-xs font-bold mb-1"
          >
            Email
          </label>
          <input
            id="email_contact"
            type="email"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />

          {/* Subject label and input */}
          <label
            htmlFor="subject"
            className="block mt-2 text-white text-xs font-bold mb-1"
          >
            Sujet
          </label>
          <input
            id="subject"
            type="text"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />

          {/* Message label and textarea */}
          <label
            htmlFor="message"
            className="block mt-2 text-white text-xs font-bold mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            rows="4"
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          ></textarea>

          {/* Submit button */}
          <div className="text-right mt-2">
            <button
              type="submit"
              className="bg-orange_univerdog hover:bg-jaune_univerdog_01 hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Envoyer
            </button>
          </div>
        </form>
        {/* Alternative contact information */}
      </div>
    </header>
  );
}

export default Contact;
