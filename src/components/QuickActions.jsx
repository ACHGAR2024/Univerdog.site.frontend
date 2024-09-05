const QuickActions = () => (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6 animate-slideIn">
      <h2 className="text-2xl font-bold mb-4">Actions rapides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <a
          href="/deposer_place"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center"
        >
          <i className="fa fa-plus-circle fa-fw pr-1"></i> Nouvelle place
        </a>
        <a
          href="/messages-management"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center"
        >
          <i className="fa fa-envelope fa-fw pr-1"></i> Voir les messages
        </a>
        <a
          href="/profil-user-update"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center"
        >
          <i className="fa fa-cog fa-fw pr-1"></i> Paramètres
        </a>
        <a
          href="/aide"
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-center"
        >
          <i className="fa fa-question-circle fa-fw pr-1"></i> Aide
        </a>
      </div>
    </div>
  );
  export default QuickActions;