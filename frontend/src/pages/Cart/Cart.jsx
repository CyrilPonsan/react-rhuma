import { useNavigate } from "react-router-dom";
import { toTitleCase } from "../../modules/formatter";
import "./Cart.css";

function Cart({ cart, total, onOrderCart, onResetCart }) {
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
    <>
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
            <h3>{total.toFixed(2)} €</h3>
          </div>
        )}
        <div className="boutons">
          <div>
            <button className="button" onClick={handleCloseCart}>
              Fermer
            </button>
            {cart.length !== 0 && (
              <>
                {" "}
                <button className="button" onClick={handleClickReset}>
                  &nbsp;Vider&nbsp;
                </button>
                <button className="button" onClick={handleClickOrder}>
                  Commander
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Cart;
