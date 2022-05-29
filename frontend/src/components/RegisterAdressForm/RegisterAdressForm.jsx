import { useState } from "react";
import { baseUrl } from "../../modules/data.js";

function RegisterAdressForm({ email }) {
  const [civilite, updateCivilite] = useState("");
  const [prenom, updatePrenom] = useState("");
  const [nom, updateNom] = useState("");
  const [adresse, updateAdresse] = useState("");
  const [complement, updateComplement] = useState("");
  const [codePostal, updateCodePostal] = useState("");
  const [ville, updateVille] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email tata", email);
    const newUser = {
      email: email,
      civilite: civilite,
      prenom: prenom,
      nom: nom,
      adresse: adresse,
      complement: complement,
      codePostal: codePostal,
      ville: ville,
    };
    const fd = new FormData();
    fd.append("data", JSON.stringify(newUser));
    const response = await (
      await fetch(`${baseUrl}register-adresse`, {
        method: "POST",
        body: fd,
      })
    ).json();
  };
  return (
    <section className="reg-section">
      <form className="user-form">
        <div>
          <label>
            Civilité
            <select
              value={civilite}
              onChange={(e) => {
                updateCivilite(e.target.value);
              }}
            >
              <option value="">---</option>
              <option value="mr">Mr</option>
              <option value="mme">Mme</option>
            </select>
          </label>
          <label>
            Nom
            <input
              type="text"
              value={nom}
              onChange={(e) => {
                updateNom(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Prénom
            <input
              type="text"
              value={prenom}
              onChange={(e) => {
                updatePrenom(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            adresse
            <textarea
              rows={3}
              value={adresse}
              onChange={(e) => {
                updateAdresse(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Complément d'adresse
            <textarea
              rows={3}
              value={complement}
              onChange={(e) => {
                updateComplement(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Code codePostal
            <input
              value={codePostal}
              onChange={(e) => {
                updateCodePostal(e.target.value);
              }}
            />
          </label>
          <label>
            ville
            <input
              type="texte"
              value={ville}
              onChange={(e) => {
                updateVille(e.target.value);
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

export default RegisterAdressForm;
