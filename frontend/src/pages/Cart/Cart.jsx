import { Link, useNavigate } from "react-router-dom";
import { toTitleCase } from "../../modules/formatter";
import { setTotal } from "../../modules/sortArray";
import "./Cart.css";

function Cart({ cart, onOrderCart, onResetCart }) {
  const navigate = useNavigate();

  const handleClickOrder = () => {
    onOrderCart();
  };

  const handleClickReset = () => {
    onResetCart();
  };

  const handleCloseCart = () => {
    navigate("/");
  };

  return (
    <main>
      <div>
        {cart.length !== 0 ? (
          <h2>Contenu du panier :</h2>
        ) : (
          <h2>Panier vide</h2>
        )}
        <ul>
          {cart.map(({ nom, quantite, prix }, index) => {
            return (
              <li key={`${nom}-${index}`}>
                <div>
                  <span>
                    {toTitleCase(nom)} x {quantite}
                  </span>
                  <span>{(quantite * prix).toFixed(2)} €</span>
                </div>
              </li>
            );
          })}
        </ul>
        {cart.length !== 0 && (
          <div className="total">
            <h3>Total : </h3>
            <h3>{setTotal(cart).toFixed(2)} €</h3>
          </div>
        )}
        <div className="boutons">
          <div>
            <button className="button" onClick={handleCloseCart}>
              Retour
            </button>
            {cart.length !== 0 && (
              <>
                <button className="button" onClick={handleClickReset}>
                  &nbsp;Vider&nbsp;
                </button>
                <Link to="/order">
                  <button className="button">Commander</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
export default Cart;
