import { GoogleLogin } from "@react-oauth/google";

function Logentrer() {
  const onSuccess = (res) => {
    console.log("Login Success:", res);
  };

  const onFailure = (res) => {
    console.log("Login Failed:", res);
  };

  return (
    <div className="loginentrer text-white pt-20 ml-10">
      <h1>Logentrer</h1>
      <GoogleLogin onSuccess={onSuccess} onError={onFailure} useOneTap />
    </div>
  );
}

export default Logentrer;
