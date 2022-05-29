import { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm({ onSubmit }) {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("email", email);
    onSubmit(email, password);
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
