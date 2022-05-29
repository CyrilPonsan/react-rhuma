import { useState } from "react";
import { baseUrl } from "../../modules/data.js";

function RegisterEmailForm({ onRegister }) {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("data", JSON.stringify([email, password]));
    const response = await (
      await fetch(`${baseUrl}register-user`, {
        method: "POST",
        body: fd,
      })
    ).json();
    onRegister(email);
  };

  return (
    <section className="reg-section">
      <form className="user-form">
        <div>
          <label>
            email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                updateEmail(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Mot de Passe
            <input
              type="password"
              value={password}
              onChange={(e) => {
                updatePassword(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <span>
            <button type="submit" className="button" onClick={handleSubmit}>
              Envoyer
            </button>
          </span>
        </div>
      </form>
    </section>
  );
}

export default RegisterEmailForm;
