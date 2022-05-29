import { useState } from "react";
import RegisterAdressForm from "../../components/RegisterAdressForm/RegisterAdressForm";
import RegisterEmailForm from "../../components/RegisterEmailForm/RegisterEmailForm";

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
