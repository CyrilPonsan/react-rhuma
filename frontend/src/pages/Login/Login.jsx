import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";

function Login({ onLogin, isLogged, onUser }) {
  const navigate = useNavigate();

  const handleSuccess = (data) => {
    onLogin(data[0]);
    onUser(data[1]);
  };

  return (
    <>
      <h1>Login Page</h1>
      {!isLogged ? (
        <LoginForm onSuccess={handleSuccess} />
      ) : (
        <>
          <h2>Vous êtes déjà connecté</h2>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Retour
          </button>
        </>
      )}
    </>
  );
}

export default Login;
