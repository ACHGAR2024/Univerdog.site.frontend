import { useForm } from "react-hook-form";
import axios from "../../config/axiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [selectedRole, setSelectedRole] = useState("user"); // Default role
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirmationVisibility = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  const onSubmit = async (data) => {
    try {
      // Include the selected role in the data object
      data.role = selectedRole;

      const response = await axios.post("/register", data);
      localStorage.setItem("token", response.data.access_token);
      setMessage("Utilisateur enregistré avec succès !");
      setErrorMessage("");

      navigate("/login");
    } catch (error) {
      setMessage("");
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.role) {
          setErrorMessage("Le champ role est requis.");
        } else {
          setErrorMessage("L'inscription a échoué. Veuillez réessayer.");
        }
      } else {
        setErrorMessage("L'inscription a échoué. Veuillez réessayer.");
      }
      console.error("Il y a eu une erreur !", error);
    }
  };

  return (
    <header
      className="flex w-full flex-col h-screen justify-center items-center poetsen-one-regular bg-cover bg-no-repeat dark:bg-gray-900"
      style={{ backgroundImage: `url('/src/images/dog-inscription.jpg')` }}
    >
      <div className=" flex flex-col items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-96 max-w-md mx-auto bg-black shadow-md rounded-md px-4 pt-4 pb-4 text-sm bg-opacity-60 dark:bg-gray-800 dark:text-white"
        >
          <input
            name="name"
            type="text"
            {...register("name", { required: true })}
            placeholder="Nom"
            className="mb-4 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.name && (
            <span className="text-red-500 dark:text-red-400">
              Ce champ est requis
            </span>
          )}

          <div className="input-group mb-4 relative">
            <span className="input-group-addon absolute inset-y-0 left-0 flex items-center pl-3">
              <i className="fa fa-envelope-o fa-fw pr-1 dark:text-gray-900"></i>
            </span>
            <input
              name="email"
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="form-control pl-10 p-2 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 dark:text-red-400">
              Ce champ est requis
            </span>
          )}

          <div className="input-group mb-4 relative">
            <span className="input-group-addon absolute inset-y-0 left-0 flex items-center pl-3">
              <i className="fa fa-key fa-fw pr-1 dark:text-gray-900"></i>
            </span>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Mot de passe"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"
              title="8 caractères minimum, une majuscule, un caractère spécial, un chiffre et une lettre."
              className="form-control pl-10 p-2 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <i
                className={`fa ${
                  showPassword
                    ? "fa-eye-slash dark:text-gray-900"
                    : "fa-eye dark:text-gray-900"
                }`}
              ></i>
            </span>
          </div>
          {errors.password && (
            <span className="text-red-500 dark:text-red-400">
              Ce champ est requis
            </span>
          )}

          <div className="input-group mb-4 relative">
            <span className="input-group-addon absolute inset-y-0 left-0 flex items-center pl-3">
              <i className="fa fa-key fa-fw pr-1"></i>
            </span>
            <input
              name="password_confirmation"
              type={showPasswordConfirmation ? "text" : "password"}
              {...register("password_confirmation", { required: true })}
              placeholder="Confirmer le mot de passe"
              className="form-control pl-10 p-2 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={togglePasswordConfirmationVisibility}
            >
              <i
                className={`fa ${
                  showPasswordConfirmation ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </span>
          </div>
          {errors.password_confirmation && (
            <span className="text-red-500 dark:text-red-400">
              Ce champ est requis
            </span>
          )}

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-200 dark:text-white"
            >
              Rôle
            </label>
            <select
              id="role"
              name="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="user">Utilisateur</option>
              <option value="professionnel">Professionnel</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            S&#39;enregistrer
          </button>
          <Link to="/">
            <button
              type="button"
              className="mt-3 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              Retour
            </button>
          </Link>
          {message && (
            <p className="text-green-500 dark:text-green-400">{message}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 dark:text-red-400">{errorMessage}</p>
          )}
        </form>
      </div>
    </header>
  );
};

export default Register;
