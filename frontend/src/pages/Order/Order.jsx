import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toTitleCase } from "../../modules/formatter";
import { setTotal } from "../../modules/sortArray";
import { baseUrl } from "../../modules/data";
import "./Order.css";
import { useAuth } from "../../components/AuthProvider/AuthProvider";

function Order({ cart, user, onOrder }) {
  const [hasOrdered, updateHasOrdered] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleOrder = async () => {
    if (cart.length > 0) {
      console.log(auth.token);
      const data = new FormData();
      data.append("client", 1);
      data.append("cart", JSON.stringify(cart));
      const result = await (
        await fetch(`${baseUrl}client/setvente`, {
          method: "POST",
          body: data,
          headers: { Authorization: `Bearer ${auth.token}` },
        })
      ).json();
      onOrder();
      updateHasOrdered(true);
    } else {
      alert("Votre panier est vide");
    }
  };

  const handleRetour = () => {
    navigate("/");
  };

  return (
    <main className="order-main">
      {!hasOrdered ? (
        <section className="order-section">
          <article className="order-article">
            <h4>Adresse de livraison :</h4>
            <span>
              {user.civilite && <h3>{toTitleCase(`${user.civilite}`)}</h3>}
              <h3>{toTitleCase(`${user.prenom} ${user.nom}`)}</h3>
            </span>
            <span>
              <h3>{toTitleCase(user.adresse)}</h3>
            </span>
            <span>
              <h3>{user.CodePostal}</h3>
              <h3>{toTitleCase(user.ville)}</h3>
            </span>
          </article>
          <article className="order-article">
            <h4>Montant :</h4>
            <span>
              <h3>{setTotal(cart).toFixed(2)} €</h3>
            </span>
          </article>
          <article className="order-article">
            <span>
              <button className="button" onClick={handleOrder}>
                Confirmer
              </button>
            </span>
          </article>
        </section>
      ) : (
        <section className="order-section">
          <article className="order-article-panier-vide">
            <h2>Merci pour votre achat !</h2>
          </article>
          <article className="order-article-panier-vide">
            <span>
              <button className="button" onClick={handleRetour}>
                Retour
              </button>
            </span>
          </article>
        </section>
      )}
    </main>
  );
}

export default Order;
