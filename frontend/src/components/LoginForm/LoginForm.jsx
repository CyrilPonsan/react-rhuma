import { useState } from "react";
import { getToken, getUser } from "../../modules/fetchModule";

function LoginForm({ onSuccess }) {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.length !== 0 && password.length !== 0) {
      const response = await getToken([email, password]);
      console.log(response);
      const user = await getUser(response.token);
      onSuccess([response.token, user.user]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email :
        <input
          type="email"
          value={email}
          onChange={(e) => {
            updateEmail(e.target.value);
          }}
        />
      </label>
      <label>
        Password :
        <input
          type="password"
          value={password}
          onChange={(e) => {
            updatePassword(e.target.value);
          }}
        />
      </label>
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default LoginForm;
