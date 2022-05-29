import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import "./Account.css";
import { baseUrl } from "../../modules/data.js";
import Vente from "../../components/Vente/Vente";

function Account() {
  const auth = useAuth();
  const user = auth.user;
  const [ventes, setVentes] = useState([]);
  const [detailVente] = useState([]);
  const max = 10;
  const page = 0;

  useEffect(() => {
    fetch(`${baseUrl}client/getventes`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })
      .then((response) => response.json())
      .then(({ ventes }) => setVentes(ventes));
  }, []);
  return (
    <main className="acc-main">
      <section className="acc-section">
        <ul>
          <li>
            <h4>Historique</h4>
          </li>
          <li>
            <h4>Logins</h4>
          </li>
          <li>
            <h4>Adresse</h4>
          </li>
        </ul>
      </section>
      <section className="acc-section">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Articles</th>
              <th>Prix Total</th>
            </tr>
          </thead>
          <tbody>
            {ventes.map((vente, index) => {
              return (
                <tr key={`${index}-${vente.date}`}>
                  <Vente vente={vente} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default Account;
