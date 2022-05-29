import { useState } from "react";
import { Link } from "react-router-dom";
import { getToken, getUser } from "../../modules/fetchModule";

function LoginForm({ onSuccess }) {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await getToken([email, password]);
    console.log(response);
    const user = await getUser(response.token);
    onSuccess([response.token, user.user]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email :
            <input
              type="email"
              value={email}
              autoFocus
              required
              onChange={(e) => {
                updateEmail(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Password :
            <input
              type="password"
              value={password}
              required
              onChange={(e) => {
                updatePassword(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <span>
            <button className="button" type="submit">
              Envoyer
            </button>
          </span>
        </div>
      </form>
      <Link to="/register">
        <h4>Créer un compte gratuit</h4>
      </Link>
    </>
  );
}

export default LoginForm;
