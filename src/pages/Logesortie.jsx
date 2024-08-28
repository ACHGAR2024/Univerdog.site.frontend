import { useGoogleLogout } from "@react-oauth/google";

function Logesortie() {
  const clientId =
    "505686323657-h36l1ttme6v4rev761odsejfgovehm04.apps.googleusercontent.com";

  const onLogoutSuccess = () => {
    console.log("Logout Success");
  };

  const onFailure = () => {
    console.log("Logout Failed");
  };

  const logout = useGoogleLogout({
    onLogoutSuccess,
    onFailure,
    clientId,
  });

  return (
    <div className="loginentrer">
      <h1>Logesortie</h1>
      <button onClick={() => logout()} className="btn btn-primary">
        Se déconnecter
      </button>
    </div>
  );
}

export default Logesortie;
