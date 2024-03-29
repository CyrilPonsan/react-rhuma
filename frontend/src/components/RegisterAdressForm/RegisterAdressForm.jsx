import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../modules/data.js";
import "./RegisterAdressForm.css";

function RegisterAdressForm({ email }) {
  const [civilite, updateCivilite] = useState("");
  const [prenom, updatePrenom] = useState("");
  const [nom, updateNom] = useState("");
  const [adresse, updateAdresse] = useState("");
  const [complement, updateComplement] = useState("");
  const [codePostal, updateCodePostal] = useState("");
  const [ville, updateVille] = useState("");
  const [registerOk, setRegisterOk] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    setRegisterOk(response.result);
  };
  return (
    <>
      <section className="reg-section">
        <form className="adresse-form">
          <div>
            <label>
              Civilité :
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
          </div>
          <div>
            <label>
              Nom :
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
              Prénom :
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
              Adresse :
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
              Complément d'adresse :
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
              Code Postal :
              <input
                value={codePostal}
                onChange={(e) => {
                  updateCodePostal(e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label>
              Ville :
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
      {registerOk && (
        <section className="reg-section">
          <article className="reg-article">
            <h2>Compte enregistré, merci</h2>
            <div>
              <button
                className="button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Retour
              </button>
            </div>
          </article>
        </section>
      )}
    </>
  );
}

export default RegisterAdressForm;
