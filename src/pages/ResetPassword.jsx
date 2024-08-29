import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/password/reset", { token, password });
      alert("Mot de passe réinitialisé");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Entrez votre nouveau mot de passe"
        required
      />
      <button type="submit">Réinitialiser</button>
    </form>
  );
};

export default ResetPassword;
