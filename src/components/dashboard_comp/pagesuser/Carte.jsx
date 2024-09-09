import CartePlaces from "./CartePlaces";

const Carte = () => {
  const apiKey = "5b3ce3597851110001cf62488ded642bf17349c1b111efaf140434f8"; // Assurez-vous que cette clé est valide

  return (
    <div>
      
      <CartePlaces apiKey={apiKey} />
    </div>
  );
};

export default Carte;
