const AdministrationDog = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 dark:text-white">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Aide Administrative
        </h1>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-blue-500">
            <i className="fas fa-paw mr-2"></i>Procédures administratives
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-medium mb-2 text-blue-400">
                <i className="fas fa-id-card mr-2"></i>1. Identification et
                tatouage/micro-puce
              </h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Tatouage pour les chiens nés avant le 3 juillet 2011</li>
                <li>Micro-puce pour les chiens nés après le 3 juillet 2011</li>
                <li>Inscription au fichier I-CAD</li>
              </ul>

              <h3 className="text-xl font-medium mb-2 text-blue-400">
                <i className="fas fa-syringe mr-2"></i>2. Vaccination
                antirabique
              </h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Vaccination obligatoire contre la rage</li>
                <li>Validité d&#39;au moins 21 jours avant le départ</li>
                <li>Certificat de vaccination requis</li>
              </ul>

              <h3 className="text-xl font-medium mb-2 text-blue-400">
                <i className="fas fa-stethoscope mr-2"></i>3. Examen clinique
              </h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Visite vétérinaire obligatoire</li>
                <li>Certificat de bonne santé</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2 text-blue-400">
                <i className="fas fa-passport mr-2"></i>4. Demande du passeport
              </h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Auprès d&#39;un vétérinaire agréé</li>
                <li>Remplir un formulaire de demande</li>
                <li>Frais de délivrance possibles</li>
              </ul>

              <h3 className="text-xl font-medium mb-2 text-blue-400">
                <i className="fas fa-info-circle mr-2"></i>5. Informations à
                fournir
              </h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Nom et adresse du propriétaire</li>
                <li>Nom et race du chien</li>
                <li>Numéro d&#39;identification</li>
                <li>Date de naissance</li>
                <li>Date de la vaccination antirabique</li>
              </ul>

              <h3 className="text-xl font-medium mb-2 text-blue-400">
                <i className="fas fa-file-alt mr-2"></i>6. Documents à fournir
              </h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Certificat de vaccination antirabique</li>
                <li>Certificat de bonne santé</li>
                <li>Preuve d&#39;identification</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">
            <i className="fas fa-lightbulb mr-2"></i>Conseils supplémentaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src="https://univerdog.site/src/images/passport.png"
                alt="Chien avec passeport"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <ul className="list-disc pl-5">
                <li>
                  Vérifiez les exigences spécifiques du pays de destination
                </li>
                <li>
                  Consultez votre vétérinaire pour des conseils personnalisés
                </li>
              </ul>
            </div>
            <div>
              <img
                src="https://univerdog.site/src/images/prefecture.webp"
                alt="Chien en voyage"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <ul className="list-disc pl-5">
                <li>Prévoyez un temps d&#39;adaptation pour votre chien</li>
                <li>Assurez-vous que toutes les vaccinations sont à jour</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Pour plus d&#39;informations, n&#39;hésitez pas à contacter votre
            vétérinaire ou les autorités compétentes.
          </p>
        </div>
      </div>
    </>
  );
};

export default AdministrationDog;
