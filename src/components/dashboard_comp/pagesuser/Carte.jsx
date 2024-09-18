import CartePlaces from "./CartePlaces";
import { Link } from "react-router-dom";

const Carte = () => {
  const apiKey = "5b3ce3597851110001cf62488ded642bf17349c1b111efaf140434f8"; // Assurez-vous que cette clé est valide

  return (
    <>
    <div  className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 mt-4"
       >
    {location.pathname !== "/dashboard" && (
        <Link to="/dashboard">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4">
            <i className="fa-solid fa-arrow-left"></i> Retour
          </button>
        </Link>
      )}
    <div>
    </div>  
      <CartePlaces apiKey={apiKey} />
    </div></>
  );
};

export default Carte;
