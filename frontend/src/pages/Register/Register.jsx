import { useState } from "react";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import RegisterEmailForm from "../../components/RegisterEmailForm/RegisterEmailForm";
import { baseUrl } from "../../modules/data/baseUrl";

function Register() {
  const auth = useAuth();
  const [civilite, updateCivilite] = useState("");
  const [prenom, updatePrenom] = useState("");
  const [nom, updateNom] = useState("");
  const [adresse, updateAdresse] = useState("");
  const [complement, updateComplement] = useState("");
  const [codePostal, updateCodePostal] = useState("");
  const [ville, updateVille] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
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
    const response = await await fetch(`${baseUrl}register`, {
      method: "POST",
      body: fd,
    }).json();
  };

  return (
    <main className="reg-main">
      <RegisterEmailForm />
    </main>
  );
}

export default Register;
