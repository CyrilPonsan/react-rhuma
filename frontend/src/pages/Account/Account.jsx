import { useAuth } from "../../components/AuthProvider/AuthProvider";

function Account() {
  const auth = useAuth();
  const user = auth.user;
  return (
    <>
      <h1>Mon Compte</h1>
      <p>{user.prenom}</p>
      <p>{user.nom}</p>
      <p>{user.adresse}</p>
    </>
  );
}

export default Account;
