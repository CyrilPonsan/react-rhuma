import { useState } from "react";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import RegisterAdressForm from "../../components/RegisterAdressForm/RegisterAdressForm";
import RegisterEmailForm from "../../components/RegisterEmailForm/RegisterEmailForm";
import { baseUrl } from "../../modules/data/baseUrl";

function Register() {
  const [email, setEmail] = useState("");

  const handleEmailRegister = (value) => {
    setEmail(value);
  };

  return (
    <main className="reg-main">
      {!email ? (
        <RegisterEmailForm onRegister={handleEmailRegister} />
      ) : (
        <RegisterAdressForm email={email} />
      )}
    </main>
  );
}

export default Register;
