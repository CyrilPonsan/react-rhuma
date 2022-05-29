import LoginForm from "../../components/LoginForm/LoginForm";
import "./Login.css";

function Login({ onLogin, onUser }) {
  const handleSuccess = (data) => {
    onLogin(data[0]);
    onUser(data[1]);
  };

  return (
    <main className="login-main">
      <LoginForm onSuccess={handleSuccess} />
    </main>
  );
}

export default Login;
