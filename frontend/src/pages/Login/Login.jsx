import { useAuth } from "../../components/AuthProvider/AuthProvider";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./Login.css";
import { getToken, getUser } from "../../modules/fetchModule";

function Login() {
  const auth = useAuth();

  const handleSubmit = async (email, password) => {
    const response = await getToken([email, password]);
    auth.handleLogin(response.token);
  };

  return (
    <main className="login-main">
      <LoginForm onSubmit={handleSubmit} />
    </main>
  );
}

export default Login;
