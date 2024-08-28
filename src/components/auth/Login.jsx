import { useForm } from "react-hook-form";
import axios from "../../config/axiosConfig";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [setLoginUrl] = useState(null);

  useEffect(() => {
    // Récupérer l'URL de connexion Google
    fetch("http://127.0.0.1:8000/api/auth/google", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          "Erreur lors de la récupération de l'URL de connexion Google"
        );
      })
      .then((data) => {
        setLoginUrl(data.url); // Mettre à jour l'URL de connexion Google
      })
      .catch((error) => console.error(error));
  }, [setLoginUrl]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
              Accept: "application/json",
            },
          }
        );

        const loginData = {
          email: res.data.email,
          google_id: res.data.id,
        };

        const apiResponse = await axios.post("/loginGoogle", loginData);
        const token = apiResponse.data.access_token;
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("token", token);

        navigate("/dashboard", { state: { user: res.data } });
        window.location.reload();
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Afficher un message d'erreur plus précis
          if (error) {
            setMessage(
              "Ce compte Google n'est pas associé à un compte sur notre plateforme."
            );
            navigate("/signin");
          }
        } else {
          console.error("Erreur lors de la connexion avec Google", error);
        }
      }
    },
    onError: (error) =>
      console.error("Erreur lors de la connexion Google :", error),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/login", data);
      localStorage.setItem("token", response.data.access_token);
      onLogin(response.data.access_token);
      setMessage("Utilisateur connecté avec succès !");
      //navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage(
          "Identifiants invalides. Veuillez vérifier votre adresse e-mail et votre mot de passe."
        );
      } else {
        setMessage("Échec de la connexion. Veuillez réessayer plus tard.");
      }
      console.error("Échec de la connexion", error);
    }
  };

  return (
    <header
      className="flex w-full flex-col h-screen justify-center items-center poetsen-one-regular bg-cover bg-no-repeat"
      style={{ backgroundImage: `url('/src/images/dog-about.webp')` }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center max-w-md mx-auto bg-black shadow-md rounded-md px-4 pt-4 pb-4 text-sm bg-opacity-60">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-200">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="fa fa-envelope-o fa-fw pr-1 dark:text-gray-900"></i>
                </span>
                <input
                  className="form-control pl-10 p-2 rounded-md w-full"
                  type="text"
                  placeholder="Adresse e-mail"
                  {...register("email", { required: true })}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-200">Mot de passe</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="fa fa-key fa-fw pr-1 dark:text-gray-900"></i>
                </span>
                <input
                  className="form-control pl-10 p-2 rounded-md w-full"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  {...register("password", { required: true })}
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
            </div>
            <div className="text-center mb-4">
              <Link
                className="text-gray-200 hover:text-orange_univerdog text-xs"
                to="/forgotpw"
              >
                Mot de passe oublié
              </Link>
            </div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              Se connecter
            </button>
            <div className="mt-3 text-sm text-center">
              <Link
                className="text-jaune_univerdog_01 hover:text-orange_univerdog font-bold"
                to="/register"
              >
                Inscription
              </Link>
            </div>
          </form>
          <div className="text-center mt-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
              onClick={() => login()}
            >
              Se connecter avec Google{" "}
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt="Google logo"
                width="20"
                height="20"
                className="inline-block ml-2"
              />
            </button>
            {message && <p className="text-red-500 mt-8">{message}</p>}
          </div>
          <div className="text-center mt-4">
            <p className="text-white text-xs">
              En vous connectant, vous acceptez nos{" "}
              <a
                href="/terms"
                className="text-orange_univerdog hover:text-jaune_univerdog_01"
              >
                Conditions d&#39;utilisation
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
      </div>
    </header>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
