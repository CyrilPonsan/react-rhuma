import { useState } from "react";
import { baseUrl } from "../../modules/data.js";
import "./RegisterEmailForm.css";

function RegisterEmailForm({ onRegister }) {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [erreur, updateErreur] = useState(false);

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
    if (response.result) {
      onRegister(email);
      updateErreur(false);
    } else {
      updateErreur(true);
    }
  };

  return (
    <form className="email-form">
      <div>
        <label>
          Email
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
      {erreur && (
        <div>
          <p style={{ color: "red" }}>Email insdiponible</p>
        </div>
      )}
      <div>
        <span>
          <button type="submit" className="button" onClick={handleSubmit}>
            Envoyer
          </button>
        </span>
      </div>
    </form>
  );
}

export default RegisterEmailForm;
